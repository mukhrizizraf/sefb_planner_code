/* ============================================================================
   ui.js — shared WatchHouse UI layer
   • inline SVG icon set (no icon-font dependency)
   • page chrome (nav active state, mobile menu, theme toggle)
   • selectors (program / track / English pathway / foreign language)
   • shared renders used across pages: hero stats, classification, degree
     progress, milestone, badges, GPA table, audit, take-note alerts, charts
   Every render guards on its own target element so it is safe to run on any page.
============================================================================ */

/* ─────────────────────── INLINE SVG ICONS ─────────────────────── */
const ICONS = {
  overview:'<path d="M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z"/>',
  planner:'<path d="M7 2v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7Zm12 17H5V9h14v10Z"/>',
  analytics:'<path d="M4 20h16v2H2V2h2v18Zm3-3v-7h3v7H7Zm5 0V7h3v10h-3Zm5 0v-4h3v4h-3Z"/>',
  audit:'<path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2Z"/>',
  settings:'<path d="M19.1 12.9c0-.3.1-.6.1-.9s0-.6-.1-.9l2-1.6-2-3.4-2.4 1a7 7 0 0 0-1.5-.9L14.9 3h-4l-.4 2.3c-.5.2-1 .5-1.5.9l-2.4-1-2 3.4 2 1.6c0 .3-.1.6-.1.9s0 .6.1.9l-2 1.6 2 3.4 2.4-1c.5.4 1 .7 1.5.9l.4 2.3h4l.4-2.3c.5-.2 1-.5 1.5-.9l2.4 1 2-3.4-2-1.6ZM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7Z"/>',
  menu:'<path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z"/>',
  close:'<path d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3 1.4 1.4Z"/>',
  add:'<path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6Z"/>',
  download:'<path d="M12 16 6 10l1.4-1.4L11 12.2V3h2v9.2l3.6-3.6L18 10l-6 6Zm-7 4v-2h14v2H5Z"/>',
  reset:'<path d="M12 5V1L7 6l5 5V7a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8Z"/>',
  light:'<path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0-5h0v3m0 14v3M4.2 4.2l2.1 2.1m11.4 11.4 2.1 2.1M2 12h3m14 0h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>',
  dark:'<path d="M12 3a9 9 0 1 0 9 9c0-.5 0-.9-.1-1.4A6.5 6.5 0 0 1 12.4 3 9 9 0 0 0 12 3Z"/>',
  chevron:'<path d="m9 6 6 6-6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  arch:'<path d="M12 2 3 9v13h6v-7h6v7h6V9l-9-7Z"/>',
  trophy:'<path d="M18 2H6v2H2v4a4 4 0 0 0 4 4 6 6 0 0 0 5 4v2H8v2h8v-2h-3v-2a6 6 0 0 0 5-4 4 4 0 0 0 4-4V4h-4V2ZM4 8V6h2v4a2 2 0 0 1-2-2Zm16 0a2 2 0 0 1-2 2V6h2v2Z"/>',
  book:'<path d="M4 3h11a3 3 0 0 1 3 3v15H7a3 3 0 0 1-3-3V3Zm2 2v13a1 1 0 0 0 1 1h9V6a1 1 0 0 0-1-1H6Z"/>',
  search:'<path d="M21.7 20.3 17 15.6A8 8 0 1 0 15.6 17l4.7 4.7 1.4-1.4ZM4 10a6 6 0 1 1 12 0 6 6 0 0 1-12 0Z"/>',
  warn:'<path d="M12 2 1 21h22L12 2Zm0 5 7.5 13h-15L12 7Zm-1 4v4h2v-4h-2Zm0 6v2h2v-2h-2Z"/>',
  person:'<path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-5 0-9 2.5-9 6v2h18v-2c0-3.5-4-6-9-6Z"/>',
  cap:'<path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3ZM5 13.2V17c0 1.7 3.1 3 7 3s7-1.3 7-3v-3.8l-7 3.8-7-3.6Z"/>',
  help:'<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm-1-5h2v2h-2v-2Zm1.9-8.6c-1.9-.4-3.6.7-4 2.3l1.9.5c.2-.7.9-1.1 1.6-1 .7.1 1.1.7 1 1.3-.1.5-.5.8-1.1 1.2-.8.5-1.3 1.1-1.3 2.3h2c0-.6.2-.9.9-1.4.8-.5 1.5-1.2 1.6-2.3.1-1.4-.9-2.7-2.6-3.1Z"/>',
  courselist:'<path d="M4 4h16v2H4V4Zm0 5h16v2H4V9Zm0 5h16v2H4v-2Zm0 5h10v2H4v-2Z"/>'
};
function icon(name, cls){
  return `<svg class="ic${cls?' '+cls:''}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]||''}</svg>`;
}
/* fill any <span data-icon="x"> placeholders in static markup */
function hydrateIcons(root){
  (root||document).querySelectorAll("[data-icon]").forEach(el=>{
    if(el.dataset.iconDone) return;
    el.innerHTML = icon(el.dataset.icon);
    el.dataset.iconDone = "1";
  });
}

/* ─────────────────────── PAGE CHROME ─────────────────────── */
function initChrome(){
  hydrateIcons();
  const page = document.body.dataset.page || "";
  document.querySelectorAll("[data-nav]").forEach(a=>{
    a.classList.toggle("active", a.dataset.nav===page);
  });
  document.querySelectorAll("[data-theme-toggle]").forEach(b=>b.addEventListener("click", toggleTheme));
  const mb=$("menuBtn"), drawer=$("mobileDrawer");
  if(mb && drawer){
    mb.addEventListener("click", ()=>document.body.classList.toggle("drawer-open"));
    drawer.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>document.body.classList.remove("drawer-open")));
  }
  applyTheme(state.theme);
  setTimeout(()=>{ initReveal(); countUpOnReveal(); }, 0);  // after first renderAll so values exist
}

/* Scroll-reveal: fade + slide-up major content blocks as they enter the viewport.
   Adds the .reveal class only to below-fold blocks (no flash for above-fold content),
   and skips entirely under prefers-reduced-motion. */
let _revealDone=false;
function initReveal(){
  if(_revealDone) return; _revealDone=true;
  if(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if(!("IntersectionObserver" in window)) return;
  const blocks=document.querySelectorAll("main .section, .split-media, .help-step, .help-bonus");
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("reveal-in"); io.unobserve(e.target); } });
  }, {threshold:0.1, rootMargin:"0px 0px -6% 0px"});
  const vh=window.innerHeight||800;
  blocks.forEach((el)=>{
    if(el.getBoundingClientRect().top < vh*0.88) return;  // already visible — leave it
    el.classList.add("reveal"); io.observe(el);
  });
}

/* Count a number element up from 0 to its rendered value, once, when it first reveals. */
function countUpOnReveal(){
  if(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if(!("IntersectionObserver" in window) || typeof animateNumber!=="function") return;
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const el=e.target; io.unobserve(el);
      const raw=(el.textContent||"").trim();
      const m=raw.match(/-?\d+(\.\d+)?/); if(!m) return;
      const target=parseFloat(m[0]);
      const dec=(m[0].split(".")[1]||"").length;
      const pre=raw.slice(0,m.index), suf=raw.slice(m.index+m[0].length);
      el.textContent=(0).toFixed(dec);          // reset so animateNumber counts up from 0
      animateNumber(el, target, dec, 1000);
      if(pre||suf) setTimeout(()=>{ el.textContent=pre+target.toFixed(dec)+suf; }, 1050);
    });
  }, {threshold:0.4});
  document.querySelectorAll("[data-countup]").forEach(el=>io.observe(el));
}

/* ─────────────────────── SELECTORS ─────────────────────── */
function renderProgramSelect(){
  const sel=$("programSelect"); if(!sel) return;
  sel.innerHTML="";
  Object.values(PROGRAMS).forEach(p=>{
    const o=document.createElement("option");
    o.value=p.id; o.textContent=`${p.short} — ${p.nameEn}`;
    sel.appendChild(o);
  });
  sel.value=state.programId;
  sel.onchange=()=>{
    state.programId=sel.value;
    const p=PROGRAMS[sel.value];
    state.trackId=(p.tracks&&p.tracks[0]?.id)||"";
    state.fieldId=(p.fFields&&p.fFields[0]?.id)||"";
    state.plan=emptyPlan();
    saveState(); renderAll();
    toast(`Switched to ${p.short}.`);
  };
}
function renderTrackSelect(){
  const sel=$("trackSelect"), wrap=$("trackField"); if(!sel||!wrap) return;
  const p=PROGRAMS[state.programId];
  if(!p.tracks||!p.tracks.length){ wrap.style.display="none"; return; }
  wrap.style.display="";
  sel.innerHTML="";
  p.tracks.forEach(t=>{ const o=document.createElement("option"); o.value=t.id; o.textContent=`${t.en} — ${t.ms}`; sel.appendChild(o); });
  if(!state.trackId) state.trackId=p.tracks[0].id;
  sel.value=state.trackId;
  sel.onchange=()=>{ state.trackId=sel.value; saveState(); renderAll(); };
}
/* Field-elective selector — mirrors the track selector, for programmes with fFields (e.g. BECONS). */
function renderFieldSelect(){
  const sel=$("fieldSelect"), wrap=$("fieldField"); if(!sel||!wrap) return;
  const p=PROGRAMS[state.programId];
  if(!p.fFields||!p.fFields.length){ wrap.style.display="none"; return; }
  wrap.style.display="";
  sel.innerHTML="";
  p.fFields.forEach(f=>{ const o=document.createElement("option"); o.value=f.id; o.textContent=`${f.en} — ${f.ms}`; sel.appendChild(o); });
  if(!state.fieldId || !p.fFields.some(f=>f.id===state.fieldId)) state.fieldId=p.fFields[0].id;
  sel.value=state.fieldId;
  sel.onchange=()=>{ state.fieldId=sel.value; saveState(); renderAll(); };
}
function renderPathSelect(){
  const sel=$("pathSelect"), wrap=$("pathField"); if(!sel||!wrap) return;
  const p=PROGRAMS[state.programId];
  const has=p.courses.some(c=>c.cat==="B" && c.pathway);
  if(!has){ wrap.style.display="none"; return; }
  wrap.style.display="";
  sel.innerHTML="";
  ["L1","L2","L3","EX"].forEach(k=>{ const o=document.createElement("option"); o.value=k; o.textContent=PATH_LABELS[k]; sel.appendChild(o); });
  sel.value=state.pathId||"L2";
  sel.onchange=()=>{ state.pathId=sel.value; saveState(); renderAll(); };
}
function renderLangSelect(){
  const sel=$("langSelect"), wrap=$("langField");
  const sel2=$("langSelectSpecific"), wrap2=$("langField2");
  if(!sel||!wrap||!sel2||!wrap2) return;
  const p=PROGRAMS[state.programId];
  const has=p.courses.some(c=>c.lang);
  if(!has){ wrap.style.display="none"; wrap2.style.display="none"; return; }
  wrap.style.display="";
  sel.innerHTML='<option value="MAN">Mandarin</option><option value="NONMAN">Other language…</option>';
  sel2.innerHTML="";
  ["ARA","JPN","FRA","KOR","OTH"].forEach(k=>{ const o=document.createElement("option"); o.value=k; o.textContent=LANG_LABELS[k]; sel2.appendChild(o); });
  const isMan=(state.langId||"MAN")==="MAN";
  sel.value=isMan?"MAN":"NONMAN";
  wrap2.style.display=isMan?"none":"";
  if(!isMan) sel2.value=state.langId;
  sel.onchange=()=>{
    if(sel.value==="MAN"){ substituteLangCourses(state.langId,"MAN"); state.langId="MAN"; }
    else{ const t=(state.langId&&state.langId!=="MAN")?state.langId:(sel2.value||"ARA"); substituteLangCourses(state.langId,t); state.langId=t; }
    saveState(); renderAll();
  };
  sel2.onchange=()=>{ substituteLangCourses(state.langId,sel2.value); state.langId=sel2.value; saveState(); renderAll(); };
}

/* read-only context chips (planner hero / overview / audit) */
function syncContextBar(){
  const p=PROGRAMS[state.programId];
  const set=(id,val)=>{ const e=$(id); if(e) e.textContent=val; };
  set("ctxProgram", p.short);
  const t=p.tracks&&p.tracks.find(x=>x.id===state.trackId);
  const ct=$("ctxTrackField");
  if(ct) ct.style.display = (p.tracks&&p.tracks.length)?"":"none";
  set("ctxTrack", t?t.en:"—");
  const cp=$("ctxPathField");
  const hasPath=p.courses.some(c=>c.cat==="B"&&c.pathway);
  if(cp) cp.style.display=hasPath?"":"none";
  set("ctxPath",(PATH_LABELS[state.pathId]||"").split(" ·")[0]);
  const cl=$("ctxLangField");
  const hasLang=p.courses.some(c=>c.lang);
  if(cl) cl.style.display=hasLang?"":"none";
  set("ctxLang", LANG_LABELS[state.langId]||"—");
  document.querySelectorAll("[data-program-name]").forEach(e=>e.textContent=p.nameEn);
}

/* ─────────────────────── HERO / TOPBAR STATS ─────────────────────── */
function renderHeroStats(){
  const p=PROGRAMS[state.programId];
  const totalCr=plannedCredits();
  const set=(id,v)=>{ const e=$(id); if(e) e.textContent=v; };
  set("hsCredits", `${totalCr} / ${p.total}`);
  set("hsSems", totalSems());
  set("hsLastEdit", relativeTime(state.lastSaved));
}

/* ─────────────────────── CLASSIFICATION + STAT CARDS ─────────────────────── */
function renderClassification(){
  if(!$("standingClass") && !$("statCredits") && !$("cgpaRingCanvas")) return;
  const {cgpa,per}=computeGPA();
  const cl=classOf4(cgpa);
  const set=(id,v)=>{ const e=$(id); if(e) e.textContent=v; };
  const sc=$("standingClass");
  if(sc){ sc.textContent=cgpa>0?cl.label:"Awaiting Grades"; sc.dataset.tier=cl.tier; }
  const sd=$("standingDesc");
  if(sd){
    if(cgpa<=0) sd.textContent="Add grades to your planned courses to see your standing and trajectory.";
    else if(cgpa>=DEANS_LIST) sd.textContent="You are on track for First Class Honours. Keep this trajectory to the finish line.";
    else sd.textContent="A steady, considered trajectory. Keep building credits with strong grades to climb the next tier.";
  }
  /* count graded courses (any grade, including failed — for the "papers attempted" view)
     but deduplicated so a retake only counts as one course entry */
  const smap=_courseStatusMap();
  let graded=0;
  for(const {status} of smap.values()) if(status!=='planned') graded++;
  const earned=passedCredits();
  const inProgress=plannedCredits()-earned; // placed but no grade yet (deduped, no failed)
  animateNumber($("statCredits"), earned, 0, 600);
  animateNumber($("statGraded"), graded, 0, 600);
  animateNumber($("statGradedCr"), inProgress, 0, 600);
}

/* ─────────────────────── DEGREE PROGRESS (components) ─────────────────────── */
function renderDegreeProgress(){
  const cont=$("degreeProgress");
  const p=PROGRAMS[state.programId];
  const byCat=componentTotals();
  const earned=passedCredits(), inProg=plannedCredits()-earned, target=p.total;
  const pct=Math.min(100, Math.round((earned/target)*100));
  const set=(id,v)=>{ const e=$(id); if(e) e.textContent=v; };
  set("overallCredits", `${earned} / ${target} CREDITS`);
  set("overallPct", `${pct}% COMPLETE`);
  const ob=$("overallBar"); if(ob) ob.style.width=pct+"%";
  const noteEl=$("overallNote");
  if(noteEl) noteEl.textContent=inProg>0?`+${inProg} cr in progress (not yet graded)`:`Based on graded results only`;
  if(!cont) return;
  cont.innerHTML="";
  Object.values(byCat).forEach(info=>{
    const passPct=Math.min(100,(info.passed/info.req)*100);
    const planPct=Math.min(100-passPct,(info.planned/info.req)*100);
    const done=info.passed>=info.req;
    const inProgLabel=info.planned>0?` <span class="pr-inprog">+${info.planned} pending</span>`:"";
    const row=document.createElement("div");
    row.className="progress-row"+(done?" is-done":"");
    row.innerHTML=`
      <div class="progress-row-head">
        <span class="pr-label">${info.l}. ${info.en}</span>
        <span class="pr-val">${info.passed} / ${info.req}${inProgLabel}</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style="width:${passPct}%"></div>
        <div class="progress-fill is-planned" style="position:absolute;left:${passPct}%;width:${planPct}%"></div>
      </div>`;
    cont.appendChild(row);
  });
}

/* ─────────────────────── MILESTONE (estimated graduation) ─────────────────────── */
function renderMilestone(){
  const el=$("milestoneValue"); if(!el) return;
  const p=PROGRAMS[state.programId];
  /* last semester that has a session set, else last semester with courses */
  let lastSession="", lastSem=0;
  for(let s=1;s<=totalSems();s++){
    if((state.plan[s]||[]).length) lastSem=s;
    if(state.semSession[s]) lastSession=state.semSession[s];
  }
  const total=plannedCredits();
  const pct=Math.min(100, Math.round((total/p.total)*100));
  el.textContent = lastSession ? sessionToTerm(lastSession) : `Semester ${p.semCount}`;
  const sub=$("milestoneSub");
  if(sub) sub.textContent = `${pct}% of the degree mapped`;
}
function sessionToTerm(code){
  /* UUM session code: A + YY + S  →  "A241" = 2024/25 · Term 1 */
  const m=code.match(/^A(\d{2})(\d)$/);
  if(!m) return code;
  const yy=2000+(+m[1]);
  return `${yy}/${String((yy+1)%100).padStart(2,"0")} · Term ${m[2]}`;
}

/* ─────────────────────── BADGES ─────────────────────── */
function renderBadges(){
  const wrap=$("badges"); if(!wrap) return;
  const p=PROGRAMS[state.programId];
  const {per,cgpa}=computeGPA();
  const total=plannedCredits(), target=p.total;
  const badges=[];
  if(total>=25)         badges.push({i:"book",   t:"First Year Cleared"});
  if(total>=target*0.5) badges.push({i:"arch",   t:"Halfway There"});
  if(total>=target*0.9) badges.push({i:"arch",   t:"Final Approach"});
  if(total>=target)     badges.push({i:"trophy", t:"Full Credit Load", gold:true});
  if(cgpa>=DEANS_LIST)  badges.push({i:"trophy", t:"Dean's List", gold:true});
  else if(cgpa>=3.0)    badges.push({i:"trophy", t:"Strong Standing"});
  const deans=per.filter(r=>r.gpa!==null && r.gpa>=DEANS_LIST).length;
  if(deans>=2)          badges.push({i:"trophy", t:`${deans}× Dean's List`, gold:true});
  if(per.filter(r=>r.cr>0).length>=4) badges.push({i:"book", t:"Steady Planner"});
  if(!badges.length) badges.push({i:"arch", t:"Begin your portfolio"});
  wrap.innerHTML=badges.map(b=>`
    <div class="badge${b.gold?' is-gold':''}">
      <span class="badge-ic">${icon(b.i)}</span>
      <span class="badge-label">${b.t}</span>
    </div>`).join("");
}

/* ─────────────────────── GPA TABLE + TREND (analytics) ─────────────────────── */
function renderGpaTable(){
  const tb=$("gpaTable"); if(!tb) return;
  const {per}=computeGPA();
  tb.innerHTML="";
  let any=false; const trend=[];
  per.forEach(r=>{
    if(r.cr===0) return; any=true;
    if(r.cgpa!==null) trend.push(r.cgpa);
    const deans=r.gpa!==null && r.gpa>=DEANS_LIST;
    tb.innerHTML+=`<tr class="${deans?'is-deans':''}">
      <td>Sem ${r.s}</td><td>${r.cr}</td>
      <td class="num">${r.gpa!==null?r.gpa.toFixed(2):'—'}</td>
      <td class="num">${r.cgpa!==null?r.cgpa.toFixed(2):'—'}</td>
    </tr>`;
  });
  if(!any){ tb.innerHTML=`<tr><td colspan="4" class="empty">Add grades to see GPA per semester.</td></tr>`; }
  const sp=$("trendSparkline");
  if(sp) sp.innerHTML = trend.length>=2 ? buildSparkline(trend) : `<span class="muted">Needs 2+ graded semesters</span>`;
}

/* ─────────────────────── CHARTS TRIGGER ─────────────────────── */
function renderCharts(){
  if(!$("cgpaRingCanvas") && !$("semBarCanvas")) return;
  const {per,cgpa}=computeGPA();
  if($("cgpaRingCanvas")) animateRingGauge(cgpa);
  if($("semBarCanvas"))   drawSemBarChart(per);
}

/* ─────────────────────── DEGREE AUDIT ─────────────────────── */
function renderAudit(){
  const cont=$("auditComponents"); if(!cont && !$("auditStatusTitle")) return;
  const p=PROGRAMS[state.programId];
  const {cgpa}=computeGPA();
  const byCat=componentTotals();
  const totalPassed=passedCredits(), totalPlaced=plannedCredits(), target=p.total;

  /* Eligibility uses PASSED credits only — a course must have a real passing grade */
  const checks=[];
  Object.values(byCat).forEach(info=>{
    const ok=info.passed>=info.req;
    checks.push({
      ok, label:`${info.l}. ${info.en}`,
      passed:info.passed, placed:info.done, req:info.req, ms:info.ms,
      v:`${info.passed} / ${info.req} cr passed`
    });
  });
  checks.push({ok:totalPassed>=target, label:"Total Credits", v:`${totalPassed} / ${target} cr passed`, passed:totalPassed, placed:totalPlaced, req:target});
  checks.push({ok:cgpa>=PASS_THRESHOLD, label:"Minimum CGPA 2.00", v:cgpa.toFixed(2), passed:cgpa, placed:cgpa, req:PASS_THRESHOLD});

  const metCount=checks.filter(c=>c.ok).length;
  const allOk=metCount===checks.length;
  const completion=Math.round((metCount/checks.length)*100);

  const set=(id,v)=>{ const e=$(id); if(e) e.textContent=v; };
  set("auditStatusTitle", allOk?"Eligible to Graduate":"Not Yet Eligible");
  set("auditStatusSub", allOk
    ? `All credits graded and passed · Final CGPA ${cgpa.toFixed(2)} · ${cgpa>=DEANS_LIST?"First Class Honours":cgpa>=3.00?"Second Class Upper":cgpa>=2.00?"Second Class Lower":"Conditional"}`
    : `${checks.length-metCount} requirement${checks.length-metCount===1?"":"s"} remaining · ${totalPlaced-totalPassed} cr placed but not yet graded`);
  set("auditCompletionPct", completion+"%");
  const statusEl=$("auditStatus"); if(statusEl) statusEl.dataset.ok=allOk?"1":"0";

  if(cont){
    cont.innerHTML="";
    checks.forEach(c=>{
      const passedPct=Math.min(100,(c.passed/c.req)*100);
      const placedPct=Math.min(100,(c.placed/c.req)*100);
      const ungraded=Math.max(0,placedPct-passedPct);
      let tag, tagCls;
      if(c.ok){ tag="Met"; tagCls="is-ok"; }
      else if(c.placed>=c.req){ tag="Grading pending"; tagCls="is-pending-grade"; }
      else if(c.placed>0){ tag="In progress"; tagCls="is-pending"; }
      else { tag="Not started"; tagCls="is-pending"; }
      const row=document.createElement("div");
      row.className="audit-row "+tagCls;
      row.innerHTML=`
        <div class="audit-row-main">
          <div class="audit-row-label">${c.label}</div>
          ${c.ms?`<div class="audit-row-sub">${c.ms}`+
            (c.placed>c.passed?` · <em>${c.placed-Math.max(0,c.passed)} cr placed, awaiting grades</em>`:``)+`</div>`:""}
        </div>
        <div class="audit-row-meta">
          <div class="audit-track">
            <div class="audit-fill" style="width:${passedPct}%"></div>
            <div class="audit-fill is-planned" style="width:${ungraded}%;left:${passedPct}%"></div>
          </div>
          <span class="audit-val">${c.v}</span>
          <span class="audit-tag">${tag}</span>
        </div>`;
      cont.appendChild(row);
    });
  }
}

/* ─────────────────────── TAKE-NOTE ALERTS (planner) ─────────────────────── */
function alertHash(msg){ let h=0; for(let i=0;i<msg.length;i++) h=((h<<5)-h+msg.charCodeAt(i))|0; return h.toString(36); }
function dismissAlert(hash){
  state.dismissedAlerts=state.dismissedAlerts||[];
  if(!state.dismissedAlerts.includes(hash)) state.dismissedAlerts.push(hash);
  saveState(); renderAlerts();
}
function toggleAlertsMute(){
  state.alertsMuted=!state.alertsMuted;
  if(!state.alertsMuted) state.dismissedAlerts=[];
  saveState(); renderAlerts();
}
function renderAlerts(){
  const a=$("alerts"), panel=$("takeNotePanel"), countEl=$("takeNoteCount"), muteBtn=$("takeNoteMute");
  if(!panel) return;
  state.dismissedAlerts=state.dismissedAlerts||[];
  const issues=[]; const p=PROGRAMS[state.programId];
  for(let s=1;s<=totalSems();s++){
    const items=state.plan[s]||[];
    const cr=items.reduce((t,it)=>t+(getCourse(it.code)?.cr||0),0);
    if(cr>0 && cr<MIN_CR && !(p.shortSems||[]).includes(s))
      issues.push({lvl:"warn",msg:`Semester ${s}: ${cr} cr — below recommended minimum (${MIN_CR})`});
    if(cr>MAX_CR)
      issues.push({lvl:"bad",msg:`Semester ${s}: ${cr} cr — over maximum (${MAX_CR})`});
    for(const it of items){
      const pr=isPrereqsMet(it.code,s);
      if(!pr.ok) issues.push({lvl:"bad",msg:`${it.code} (Sem ${s}): missing ${pr.missing.join(", ")}`});
      if(it.grade && FAIL_GRADES.has(it.grade)){
        // Suppress if the course was already retaken with a passing grade in a later semester.
        let retaken=false;
        for(let s2=s+1;s2<=totalSems();s2++){
          if((state.plan[s2]||[]).some(x=>x.code===it.code && x.grade && !FAIL_GRADES.has(x.grade))){ retaken=true; break; }
        }
        if(!retaken) issues.push({lvl:"warn",msg:`${it.code} (Sem ${s}): ${it.grade} — retake required (UUM rule c)`});
      }
    }
  }
  const visible=issues.filter(i=>!state.dismissedAlerts.includes(alertHash(i.msg)));
  panel.style.display=""; /* always visible */
  if(state.alertsMuted){
    panel.classList.remove("has-alerts"); panel.classList.add("muted");
    if(countEl) countEl.textContent=issues.length||"";
    if(muteBtn) muteBtn.textContent="Unmute";
    if(a) a.innerHTML=`<div class="alert-clear muted-msg">Alerts muted — ${issues.length?issues.length+" issue"+(issues.length>1?"s":"")+" hidden":"no issues"}.</div>`;
    return;
  }
  panel.classList.remove("muted");
  if(muteBtn) muteBtn.textContent="Mute";
  if(!visible.length){
    panel.classList.remove("has-alerts");
    if(countEl) countEl.textContent="";
    if(a) a.innerHTML=`<div class="alert-clear">✓ No prerequisite or credit issues found.</div>`;
    return;
  }
  panel.classList.add("has-alerts");
  if(countEl) countEl.textContent=visible.length;
  if(a) a.innerHTML=visible.slice(0,8).map(i=>{
    const h=alertHash(i.msg);
    return `<div class="alert ${i.lvl==='bad'?'is-bad':'is-warn'}">
      <span class="alert-msg">${i.msg}</span>
      <button class="alert-x" onclick="dismissAlert('${h}')" aria-label="Dismiss">${icon('close')}</button>
    </div>`;
  }).join("");
}

/* ─────────────────────── COURSE LIST (reference table) ─────────────────────── */
function renderCourseList(){
  const host=$("courseListBody"); if(!host) return;
  const p=PROGRAMS[state.programId]; if(!p) return;
  const q=((($("courseSearch")||{}).value)||"").trim().toLowerCase();
  // mirror the Planner's availableFor() filtering: show only the chosen specialization
  // track's D-cat courses, and only the chosen foreign-language family.
  let list=p.courses.filter(c=>{
    if(c.cat==="D" && c.lang  && c.lang  !== state.langId)  return false;  // language family
    if(c.cat==="D" && c.track && state.trackId && c.track !== state.trackId) return false;  // specialization track
    if(c.cat==="F" && c.field && state.fieldId && c.field !== state.fieldId) return false;  // field elective
    return true;
  });
  if(q){
    list=list.filter(c=>
      c.code.toLowerCase().includes(q) ||
      (c.en||"").toLowerCase().includes(q) ||
      (c.ms||"").toLowerCase().includes(q) ||
      String(c.cat||"").toLowerCase().includes(q) ||
      catName(c.cat,p).toLowerCase().includes(q) ||
      (c.pre||[]).join(" ").toLowerCase().includes(q)
    );
  }
  const cnt=$("courseListCount"); if(cnt) cnt.textContent=list.length;
  if(!list.length){ host.innerHTML=`<tr><td colspan="5" class="cl-empty">No courses match “${q}”.</td></tr>`; return; }
  // Free-Elective field label (mirrors the planner's "choose ONE field" grouping for F-cat)
  const fieldNote=c=>{
    if(c.cat!=="F" || !c.field || !(p.fFields&&p.fFields.length)) return "";
    const f=p.fFields.find(x=>x.id===c.field);
    return f?`<div class="cl-field">Elective field · ${f.en}</div>`:"";
  };
  host.innerHTML=list.map(c=>`
    <tr>
      <td class="cl-code">${c.code}</td>
      <td><div class="cl-en">${c.en}</div><div class="cl-ms">${c.ms}</div>${fieldNote(c)}</td>
      <td><span class="cl-cat" style="--c:var(--cat-${c.cat})" title="${catName(c.cat,p)}">${c.cat}</span></td>
      <td class="cl-cr">${c.cr}</td>
      <td class="cl-pre">${(c.pre&&c.pre.length)?c.pre.join(", "):"None"}</td>
    </tr>`).join("");
}

/* Overview hero stat tiles — programmes, total courses mapped, live CGPA projection. */
function renderHeroTiles(){
  if(!$("heroTiles")) return;
  const prog=$("heroProgrammes"); if(prog) prog.textContent=String(Object.keys(PROGRAMS).length);
  const courses=$("heroCourses");
  if(courses){ const n=Object.values(PROGRAMS).reduce((a,p)=>a+(p.courses?p.courses.length:0),0); courses.textContent=n+"+"; }
  const cg=$("heroCgpa");
  if(cg){ const {cgpa}=computeGPA(); cg.textContent=(cgpa||0).toFixed(2); }
}
