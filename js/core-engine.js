/* ============================================================================
   core-engine.js — SEFB Degree Planner engine (WatchHouse edition)
   State, persistence, prerequisite engine, GPA/CGPA computation, theming,
   shared actions and modal helpers. Pure logic is preserved verbatim from the
   original SEFB_Dashboard.html (every "hiccup" fix intact); only the theming
   layer was swapped from the 8-theme picker to a WatchHouse light/dark toggle.
   Loaded on every page, after data.js.
============================================================================ */

const $ = id => document.getElementById(id);

/* Safe global dispatch — call a render fn only if it exists on this page. */
function safe(name, ...args){
  const f = window[name];
  if(typeof f === "function"){ try{ return f(...args); }catch(e){ console.warn(name, e); } }
}

/* ============================================================================
   CONSTANTS
============================================================================ */
const STORAGE_KEY = "sefb_planner_v2";
const UUM_SESSIONS = ["A231","A232","A241","A242","A251","A252","A261","A262","A271","A272","A281","A282"];
const MIN_CR = 12, MAX_CR = 20;
const DEANS_LIST = 3.67;
const PASS_THRESHOLD = 2.00;
const FAIL_GRADES = new Set(["C-","D+","D","F"]);

/* English-pathway course sets (LAMPIRAN A). */
const PATHWAY_COURSES = {
  L1: new Set(["MPB1013","MPB2013","MPB3013"]),
  L2: new Set(["MPB2013","MPB3013"]),
  L3: new Set(["MPB3013","SBLEK3023","SBLEK3033","SBLEK3043","SBLEK3053"]),
  EX: new Set([])
};
const PATH_LABELS = {
  L1:"Path 1 · 9 cr (MUET 1.0–2.5)",
  L2:"Path 2 · 6 cr (MUET 3.0–3.5)",
  L3:"Path 3 · 6 cr (MUET 4.0–4.5)",
  EX:"Exempted (MUET 5.0+)"
};
const LANG_LABELS = {
  MAN:"Mandarin", ARA:"Arabic", JPN:"Japanese",
  FRA:"French", KOR:"Korean", OTH:"Other Foreign Language"
};
const LANG_FAMILY_DIGIT = {MAN:"5", ARA:"2", JPN:"3", FRA:"4", KOR:"6"};

/* ============================================================================
   STATE & PERSISTENCE
============================================================================ */
let state = {
  programId:"BFIN", trackId:"INV",
  plan:{}, theme:"light",
  pathId:"L2",
  langId:"MAN",
  extraSems:0
};

function totalSems(){ const p=PROGRAMS[state.programId]; return (p?.semCount||8) + (state.extraSems||0); }
function emptyPlan(){ const p={}; const n=totalSems(); for(let i=1;i<=n;i++) p[i]=[]; return p; }
function saveState(){
  state.lastSaved = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  safe("renderHeroStats");
}
function relativeTime(ts){
  if(!ts) return "never";
  const diff = Math.floor((Date.now() - ts)/1000);
  if(diff < 5)      return "just now";
  if(diff < 60)     return diff + "s ago";
  if(diff < 3600)   return Math.floor(diff/60)  + " min ago";
  if(diff < 86400)  return Math.floor(diff/3600)+ " hr ago";
  return Math.floor(diff/86400) + " days ago";
}
function loadState(){
  try{
    const r=localStorage.getItem(STORAGE_KEY);
    if(r){ const s=JSON.parse(r); if(s&&s.programId&&s.plan){ state=Object.assign(state,s); }}
  }catch(e){}
  if(!state.plan||!Object.keys(state.plan).length) state.plan=emptyPlan();
  /* Theme is now binary: light / dark. Coerce any legacy theme name to light. */
  if(state.theme!=="dark" && state.theme!=="light") state.theme="light";
  if(!state.pathId) state.pathId="L2";
  if(!state.langId) state.langId="MAN";
  if(typeof state.extraSems!=="number") state.extraSems=0;
  if(!state.lastSaved) state.lastSaved=Date.now();
  if(!Array.isArray(state.dismissedAlerts)) state.dismissedAlerts=[];
  if(typeof state.alertsMuted!=="boolean") state.alertsMuted=false;
  if(!state.semSession||typeof state.semSession!=="object"||Array.isArray(state.semSession)) state.semSession={};
  applyTheme(state.theme);
}

/* ============================================================================
   THEMING — WatchHouse light / dark
============================================================================ */
function applyTheme(mode){
  if(mode!=="dark" && mode!=="light") mode="light";
  document.body.classList.toggle("dark-mode",  mode==="dark");
  document.body.classList.toggle("light-mode", mode==="light");
  /* keep any theme toggles in sync (inline-SVG icon, no icon font) */
  document.querySelectorAll("[data-theme-toggle]").forEach(btn=>{
    const ic = btn.querySelector("[data-theme-ic]");
    if(ic && typeof icon==="function") ic.innerHTML = icon(mode==="dark" ? "light" : "dark");
    btn.setAttribute("aria-label", mode==="dark" ? "Switch to light mode" : "Switch to dark mode");
  });
}
function toggleTheme(){
  state.theme = state.theme==="dark" ? "light" : "dark";
  applyTheme(state.theme);
  saveState();
  safe("redrawCharts");
}

/* ============================================================================
   PREREQUISITE ENGINE
============================================================================ */
function getCourse(code){ return PROGRAMS[state.programId].courses.find(c=>c.code===code); }
function creditsBefore(s){ let t=0; for(let i=1;i<s;i++) for(const it of (state.plan[i]||[])){const c=getCourse(it.code); if(c) t+=c.cr;} return t; }

function isPrereqsMet(code, semester){
  const c=getCourse(code); if(!c) return {ok:true,missing:[]};
  const missing=[];
  const pathwayAllowed = PATHWAY_COURSES[state.pathId] || new Set();
  for(const pre of (c.pre||[])){
    const preCourse = getCourse(pre);
    if(preCourse && preCourse.cat==="B" && preCourse.pathway && !pathwayAllowed.has(pre)){
      continue;
    }
    let foundItem=null;
    for(let s=1;s<semester;s++){
      const it=(state.plan[s]||[]).find(x=>x.code===pre);
      if(it){ foundItem=it; break; }
    }
    if(!foundItem){ missing.push(pre); continue; }
    if(foundItem.grade && FAIL_GRADES.has(foundItem.grade)){
      missing.push(`${pre} (failed: ${foundItem.grade})`);
    }
  }
  if(c.minCr){ const have=creditsBefore(semester); if(have<c.minCr) missing.push(`${c.minCr}cr min (have ${have})`); }
  if(c.all){ const have=creditsBefore(semester); const p=PROGRAMS[state.programId]; if(have<p.total-c.cr) missing.push(`finish other courses first`);}
  if(c.offer && c.offer!=="both"){
    const isOdd = semester % 2 === 1;
    const wantOdd = c.offer==="odd";
    if(isOdd!==wantOdd) missing.push(`offered ${c.offer} semesters only`);
  }
  return {ok:missing.length===0, missing};
}

function availableFor(s){
  const p=PROGRAMS[state.programId];
  const placed=new Set(); Object.values(state.plan).forEach(a=>a.forEach(it=>placed.add(it.code)));
  return p.courses.filter(c=>{
    if(placed.has(c.code)) return false;
    if(c.cat==="D" && c.track && state.trackId && c.track!==state.trackId) return false;
    return true;
  });
}

/* ============================================================================
   GPA / CGPA
============================================================================ */
function gp(g){ const x=GRADES.find(y=>y.g===g); return x?x.p:null; }
function computeGPA(){
  let cumP=0, cumC=0;
  const per=[];
  const n=totalSems();
  for(let s=1;s<=n;s++){
    let sp=0, sc=0;
    for(const it of (state.plan[s]||[])){
      const c=getCourse(it.code); if(!c||!it.grade) continue;
      const p=gp(it.grade); if(p===null) continue;
      sp+=p*c.cr; sc+=c.cr;
    }
    cumP+=sp; cumC+=sc;
    per.push({s,cr:sc, gpa:sc?sp/sc:null, cgpa:cumC?cumP/cumC:null});
  }
  return {per, cgpa:cumC?cumP/cumC:0};
}

/* UUM 4-tier classification. Colours map onto the WatchHouse palette:
   First Class = amber-glow accent · others = ink tones · fail = error red. */
function classOf4(g){
  if(g>=3.67) return {label:"First Class Honours",   tier:"first", color:"#c0894a"};
  if(g>=3.00) return {label:"Second Class Upper",    tier:"upper", color:"#1d1b18"};
  if(g>=2.00) return {label:"Second Class Lower",    tier:"lower", color:"#696561"};
  return            {label:"Below Standing",         tier:"fail",  color:"#ba1a1a"};
}
const _RING_MEDALS = {first:"●", upper:"●", lower:"●", fail:"○"};

/* total placed credits (any course in the plan, graded or not) */
function plannedCredits(){
  let t=0;
  for(const arr of Object.values(state.plan)) for(const it of arr){
    const c=getCourse(it.code); if(c) t+=c.cr;
  }
  return t;
}
/* total PASSED credits (graded with a non-failing grade) — used for graduation eligibility */
function passedCredits(){
  let t=0;
  for(const arr of Object.values(state.plan)) for(const it of arr){
    const c=getCourse(it.code); if(!c) continue;
    if(it.grade && !FAIL_GRADES.has(it.grade)) t+=c.cr;
  }
  return t;
}
/* credits per component letter.
   done    = placed (graded or not) — for planner progress bars
   passed  = graded with a passing grade — for graduation eligibility
   planned = placed but no grade yet */
function componentTotals(){
  const p=PROGRAMS[state.programId];
  const byCat={};
  p.components.forEach(comp=>byCat[comp.l]={req:comp.req,done:0,passed:0,planned:0,en:comp.en,ms:comp.ms,l:comp.l});
  Object.values(state.plan).forEach(a=>a.forEach(it=>{
    const c=getCourse(it.code); if(!c) return;
    if(!byCat[c.cat]) return;
    byCat[c.cat].done+=c.cr;
    if(it.grade && !FAIL_GRADES.has(it.grade)) byCat[c.cat].passed+=c.cr;
    else byCat[c.cat].planned+=c.cr;
  }));
  return byCat;
}

/* ============================================================================
   FOREIGN-LANGUAGE SUBSTITUTION (Hiccup 1) — verbatim logic
============================================================================ */
function substituteLangCourses(fromLang, toLang){
  if(!fromLang || !toLang || fromLang === toLang) return;
  const p = PROGRAMS[state.programId];

  if(fromLang === "OTH"){
    const toD = LANG_FAMILY_DIGIT[toLang];
    if(!toD) return;
    const re = /^FOREIGN([123])013$/;
    Object.keys(state.plan).forEach(s=>{
      state.plan[s] = (state.plan[s]||[]).map(it=>{
        const m = it.code.match(re);
        if(m){ const nc=`SBLFK${m[1]}0${toD}3`; if(p.courses.find(c=>c.code===nc)) return {...it, code:nc}; }
        return it;
      });
    });
    return;
  }
  if(toLang === "OTH"){
    const fromD = LANG_FAMILY_DIGIT[fromLang];
    if(!fromD) return;
    const re = new RegExp(`^SBLFK([123])0${fromD}3$`);
    Object.keys(state.plan).forEach(s=>{
      state.plan[s] = (state.plan[s]||[]).map(it=>{
        const m = it.code.match(re);
        if(m){ const nc=`FOREIGN${m[1]}013`; if(p.courses.find(c=>c.code===nc)) return {...it, code:nc}; }
        return it;
      });
    });
    return;
  }
  const fromD = LANG_FAMILY_DIGIT[fromLang];
  const toD = LANG_FAMILY_DIGIT[toLang];
  if(!fromD || !toD) return;
  const re = new RegExp(`^SBLFK([123])0${fromD}3$`);
  Object.keys(state.plan).forEach(s=>{
    state.plan[s] = (state.plan[s]||[]).map(it=>{
      const m = it.code.match(re);
      if(m){ const nc=`SBLFK${m[1]}0${toD}3`; if(p.courses.find(c=>c.code===nc)) return {...it, code:nc}; }
      return it;
    });
  });
}

/* ============================================================================
   SHARED ACTIONS
============================================================================ */
function loadRecommended(){
  const p=PROGRAMS[state.programId];
  const rec=p.recommended && p.recommended[state.trackId||""];
  if(!rec){ toast("No recommended plan available for this program."); return; }
  showConfirm("Replace your current plan with the official recommended plan?", ()=>{
    state.plan=emptyPlan();
    Object.entries(rec).forEach(([s,codes])=>{ state.plan[s]=codes.map(c=>({code:c,grade:""})); });
    if(state.langId && state.langId !== "MAN"){ substituteLangCourses("MAN", state.langId); }
    saveState(); renderAll();
    toast("Recommended plan loaded.");
  });
}
function resetPlan(){
  showConfirm("Reset your plan? This cannot be undone.", ()=>{
    state.plan=emptyPlan(); saveState(); renderAll();
    toast("Plan reset.");
  });
}
function addExtraSemester(){
  state.extraSems = (state.extraSems||0) + 1;
  const newIdx = totalSems();
  state.plan[newIdx] = state.plan[newIdx] || [];
  saveState(); renderAll();
}
function removeExtraSemester(){
  const n = totalSems();
  if((state.extraSems||0) <= 0) return;
  if((state.plan[n]||[]).length){
    showConfirm(`Semester ${n} contains ${state.plan[n].length} course(s). Remove anyway?`, ()=>{
      delete state.plan[n]; state.extraSems--; saveState(); renderAll();
    });
    return;
  }
  delete state.plan[n]; state.extraSems--; saveState(); renderAll();
}

/* ============================================================================
   MODALS / CONFIRM / TOAST
============================================================================ */
function openModal(title, html){
  const m=$("modal"); if(!m) return;
  $("modalTitle").innerHTML = title + '<button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>';
  $("modalBody").innerHTML = html;
  m.classList.add("active");
}
function closeModal(){ const m=$("modal"); if(m) m.classList.remove("active"); }

let _confirmCallback=null;
function showConfirm(msg, onOk){
  const d=$("confirmDialog");
  if(!d){ if(window.confirm(msg)) onOk&&onOk(); return; }
  $("confirmMsg").textContent=msg;
  d.classList.add("active");
  _confirmCallback=onOk;
}
function confirmResolve(ok){
  const d=$("confirmDialog"); if(d) d.classList.remove("active");
  if(ok && _confirmCallback) _confirmCallback();
  _confirmCallback=null;
}

let _toastTimer=null;
function toast(msg){
  let t=$("toast");
  if(!t){
    t=document.createElement("div"); t.id="toast"; t.className="toast";
    document.body.appendChild(t);
  }
  t.textContent=msg;
  t.classList.add("show");
  clearTimeout(_toastTimer);
  _toastTimer=setTimeout(()=>t.classList.remove("show"), 2600);
}

/* ============================================================================
   RENDER DISPATCH — calls every render that exists on the current page.
   Each render guards on its own target element, so missing ones are skipped.
============================================================================ */
function renderAll(){
  ["renderProgramSelect","renderTrackSelect","renderPathSelect","renderLangSelect",
   "syncContextBar","renderSemesters","renderHeroStats","renderClassification",
   "renderDegreeProgress","renderMilestone","renderBadges","renderGpaTable",
   "renderAudit","renderAlerts","renderCharts"].forEach(n=>safe(n));
}
