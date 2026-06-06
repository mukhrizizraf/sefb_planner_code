/* ============================================================================
   planner.js — semester grid, course placement, drag-and-drop, PDF export
   Renders the WatchHouse editorial semester stack. The add-course dropdown
   preserves the original grouped logic (component optgroups, D-track and
   F-field sub-sections, placement/lock hints) so every enforcement rule holds.
============================================================================ */

/* CAT_LABEL now lives in core-engine.js (shared with the Course List page). */

/* Category colour legend — only shows the categories this programme actually uses. */
function renderCatLegend(){
  const host=$("catLegend"); if(!host) return;
  const p=PROGRAMS[state.programId]; if(!p){ host.innerHTML=""; return; }
  const cats=[...new Set(p.courses.map(c=>c.cat))].sort();
  host.innerHTML=cats.map(cat=>
    `<span class="cat-legend-item" style="--c:var(--cat-${cat})"><span class="cat-swatch"></span><b>${cat}</b> ${catName(cat,p)}</span>`
  ).join("");
}

function renderSemesters(){
  const host=$("semesters"); if(!host) return;
  const p=PROGRAMS[state.programId];
  const {per}=computeGPA();
  const perBySem={}; per.forEach(r=>perBySem[r.s]=r);
  host.innerHTML="";
  const n=totalSems();

  /* first semester with no grades = "current" accent */
  let currentSem=0;
  for(let s=1;s<=n;s++){ if((state.plan[s]||[]).some(it=>!it.grade)){ currentSem=s; break; } }

  for(let s=1;s<=n;s++){
    const items=state.plan[s]||[];
    const cr=items.reduce((t,it)=>t+(getCourse(it.code)?.cr||0),0);
    let cls=""; if(cr===0) cls=""; else if(cr<MIN_CR) cls="warn"; else if(cr>MAX_CR) cls="bad"; else cls="ok";
    const isShort=p.shortSems&&p.shortSems.includes(s);
    const isExtra=s>p.semCount;
    const r=perBySem[s];
    const termGpa=(r&&r.gpa!==null)?r.gpa.toFixed(2):"—";
    const sess=state.semSession[s]||"";

    const card=document.createElement("div");
    card.className="sem-card"+(isExtra?" is-extra":"")+(s===currentSem?" is-current":"");
    card.dataset.sem=s;
    const sessOpts=UUM_SESSIONS.map(c=>`<option value="${c}"${sess===c?" selected":""}>${c}</option>`).join("");
    const pct=Math.min(100,(cr/MAX_CR)*100);

    card.innerHTML=`
      <div class="sem-head">
        <div class="sem-head-left">
          <span class="sem-eyebrow">${sess?sessionToTerm(sess):(isExtra?"EXTENSION TERM":"UNSCHEDULED")}</span>
          <h3 class="sem-title">${isExtra?"Extension "+s:"Semester "+s}${s===currentSem?' <span class="sem-now">Current</span>':""}</h3>
        </div>
        <div class="sem-head-right">
          ${items.length?`<button class="btn-deans sem-head-deans" onclick="simulateDeansList(${s})"><span class="deans-full">🎉 Simulate a Dean's List semester for me!</span><span class="deans-short">🎉 Dean's List</span></button>`:""}
          <select class="sem-session" title="Academic session" aria-label="Academic session for ${isExtra?'extension '+s:'semester '+s}" onchange="setSemSession(${s},this.value)">
            <option value="">Session…</option>${sessOpts}
          </select>
          <div class="sem-gpa">
            <span class="sem-gpa-lbl">TERM GPA</span>
            <span class="sem-gpa-val">${termGpa}</span>
          </div>
        </div>
      </div>
      <div class="sem-courses"></div>
      <div class="sem-add">
        <select id="addSel-${s}" aria-label="Add course to semester ${s}"><option value="">+ Add course to this semester…</option></select>
        <button class="btn-outline sm" onclick="addCourse(${s})">${icon("add")} Add</button>
      </div>
      <div class="sem-foot">
        <div class="sem-foot-row">
          <span class="sem-foot-lbl">TOTAL CREDITS</span>
          <span class="sem-foot-val ${cls}">${cr} / ${MAX_CR}</span>
        </div>
        <div class="sem-foot-track"><div class="sem-foot-fill ${cls}" style="width:${pct}%"></div></div>
      </div>`;

    const list=card.querySelector(".sem-courses");
    if(!items.length){
      list.innerHTML=`<div class="sem-empty">No courses yet — add from the dropdown below.</div>`;
    }
    items.forEach((it,idx)=>{
      const cc=getCourse(it.code); if(!cc) return;
      const pr=isPrereqsMet(it.code,s);
      const row=document.createElement("div");
      row.className="course-row cat-"+cc.cat+(pr.ok?"":" is-locked");
      row.draggable=true;
      row.dataset.code=cc.code; row.dataset.sem=s; row.dataset.idx=idx;
      row.title=pr.ok?`${cc.en} — Prereq: ${cc.pre.length?cc.pre.join(", "):"None"}`:"Locked: missing "+pr.missing.join(", ");
      const failed=it.grade && FAIL_GRADES.has(it.grade);
      row.innerHTML=`
        <span class="course-cat" aria-hidden="true"></span>
        <span class="course-code">${cc.code}</span>
        <div class="course-body">
          <div class="course-name">${cc.en}${pr.ok?"":' <span class="lock-pill">Locked</span>'}${failed?' <span class="lock-pill warn">Retake</span>':""}</div>
          <div class="course-meta">${cc.ms} · <span class="cat-name" style="--c:var(--cat-${cc.cat})"><span class="cat-dot"></span>${cc.cat}. ${catName(cc.cat,p)}</span></div>
        </div>
        <div class="course-tail">
          <span class="course-cr">${cc.cr} cr</span>
          <select class="grade-sel" onchange="setGrade(${s},${idx},this.value)" onclick="event.stopPropagation()" title="Grade" aria-label="Grade for ${cc.code} ${cc.en}">
            <option value="">—</option>
            ${GRADES.map(g=>`<option value="${g.g}" ${it.grade===g.g?'selected':''}>${g.g}</option>`).join("")}
          </select>
          <button class="row-x" onclick="event.stopPropagation();removeCourse(${s},${idx})" title="Remove" aria-label="Remove ${cc.code} ${cc.en}">${icon("close")}</button>
        </div>`;
      list.appendChild(row);
    });

    host.appendChild(card);
    buildAddDropdown(card.querySelector(`#addSel-${s}`), s);
  }

  /* extension controls */
  const ctrl=document.createElement("div");
  ctrl.className="sem-extra-ctrl";
  ctrl.innerHTML=`
    <button class="btn-outline sm" onclick="addExtraSemester()">${icon("add")} Add Semester</button>
    ${(state.extraSems||0)>0?`<button class="btn-ghost sm danger" onclick="removeExtraSemester()">Remove Extension</button>`:""}`;
  host.appendChild(ctrl);

  attachDragHandlers();
}

/* Build the grouped add-course <select> (ported enforcement logic). */
function buildAddDropdown(addSel, s){
  if(!addSel) return;
  const p=PROGRAMS[state.programId];
  const placementMap={};
  Object.entries(state.plan).forEach(([k,items])=>{ items.forEach(it=>{ placementMap[it.code]={sem:+k,grade:it.grade||""}; }); });
  const byCat={};
  p.courses.forEach(cc=>{
    if(cc.cat==="D" && cc.lang && cc.lang!==state.langId) return;
    (byCat[cc.cat]=byCat[cc.cat]||[]).push(cc);
  });
  const mkOpt=(cc)=>{
    const info=placementMap[cc.code];
    const o=document.createElement("option");
    if(info!=null){
      const failed=info.grade && FAIL_GRADES.has(info.grade);
      if(failed){ o.value=cc.code; o.textContent=`↻ Retake (failed Sem ${info.sem}) · ${cc.code} · ${cc.en} (${cc.cr}cr)`; }
      else{ o.disabled=true; o.textContent=`✓ Sem ${info.sem} · ${cc.code} · ${cc.en} (${cc.cr}cr)`; }
    } else {
      const pr=isPrereqsMet(cc.code,s);
      o.value=cc.code;
      let hint="";
      if(!pr.ok){
        if(pr.missing.some(m=>m.includes("offered odd")))       hint="● Odd sems (1·3·5·7) only · ";
        else if(pr.missing.some(m=>m.includes("offered even"))) hint="● Even sems (2·4·6) only · ";
        else if(pr.missing.some(m=>m.includes("failed")))       hint="✕ Prereq failed · ";
        else                                                     hint="🔒 ";
      }
      o.textContent=`${hint}${cc.code} · ${cc.en} (${cc.cr}cr)`;
    }
    return o;
  };
  p.components.forEach(comp=>{
    const list=byCat[comp.l]||[];
    if(comp.l==="D" && p.tracks && p.tracks.length && list.some(c=>c.track)){
      let committed=null;
      for(const [,semItems] of Object.entries(state.plan)){ for(const it of semItems){ const cc=p.courses.find(c=>c.code===it.code); if(cc&&cc.cat==="D"&&cc.track){committed=cc.track;break;} } if(committed) break; }
      const hdr=document.createElement("optgroup");
      hdr.label=`── D. ${comp.en.toUpperCase()} — choose ONE specialization (${comp.req} cr) ──`;
      const ho=document.createElement("option"); ho.disabled=true;
      ho.textContent=committed?`  Committed: ${p.tracks.find(t=>t.id===committed)?.en||committed}`:`  Pick one field and follow it through`;
      hdr.appendChild(ho); addSel.appendChild(hdr);
      p.tracks.forEach((t,i)=>{
        const locked=committed&&committed!==t.id;
        const tl=list.filter(c=>c.track===t.id).sort((a,b)=>a.code.localeCompare(b.code));
        const grp=document.createElement("optgroup");
        grp.label=locked?`D${i+1}. ${t.en} (locked)`:`D${i+1}. ${t.en} — ${t.ms}`;
        if(!tl.length){ const o=document.createElement("option"); o.disabled=true; o.textContent="   (none)"; grp.appendChild(o); }
        else if(locked){ tl.forEach(cc=>{ const o=document.createElement("option"); o.disabled=true; o.textContent=`⛔ ${cc.code} · ${cc.en}`; grp.appendChild(o); }); }
        else tl.forEach(cc=>grp.appendChild(mkOpt(cc)));
        addSel.appendChild(grp);
      });
      return;
    }
    if(comp.l==="F" && p.fFields && p.fFields.length && list.some(c=>c.field)){
      let committed=null;
      for(const [,semItems] of Object.entries(state.plan)){ for(const it of semItems){ const cc=p.courses.find(c=>c.code===it.code); if(cc&&cc.cat==="F"&&cc.field){committed=cc.field;break;} } if(committed) break; }
      const hdr=document.createElement("optgroup");
      hdr.label=`── F. ${comp.en.toUpperCase()} — choose ONE field (${comp.req} cr) ──`;
      const ho=document.createElement("option"); ho.disabled=true;
      ho.textContent=committed?`  Committed: ${p.fFields.find(f=>f.id===committed)?.en||committed}`:`  Pick one field, complete six courses`;
      hdr.appendChild(ho); addSel.appendChild(hdr);
      p.fFields.forEach((f,i)=>{
        const locked=committed&&committed!==f.id;
        const fl=list.filter(c=>c.field===f.id).sort((a,b)=>a.code.localeCompare(b.code));
        const grp=document.createElement("optgroup");
        grp.label=locked?`F${i+1}. ${f.en} (locked)`:`F${i+1}. ${f.en} — ${f.ms}`;
        if(!fl.length){ const o=document.createElement("option"); o.disabled=true; o.textContent="   (none)"; grp.appendChild(o); }
        else if(locked){ fl.forEach(cc=>{ const o=document.createElement("option"); o.disabled=true; o.textContent=`⛔ ${cc.code} · ${cc.en}`; grp.appendChild(o); }); }
        else fl.forEach(cc=>grp.appendChild(mkOpt(cc)));
        addSel.appendChild(grp);
      });
      return;
    }
    const grp=document.createElement("optgroup");
    grp.label=`${comp.l}. ${comp.en}`;
    if(!list.length){ const o=document.createElement("option"); o.disabled=true; o.textContent="   (none)"; grp.appendChild(o); }
    else list.sort((a,b)=>a.code.localeCompare(b.code)).forEach(cc=>grp.appendChild(mkOpt(cc)));
    addSel.appendChild(grp);
  });
}

/* Event delegation: listeners bind ONCE to the persistent #semesters host and
   survive innerHTML rebuilds, so renderSemesters() no longer re-attaches a
   handler to every row/card on each render. */
let _dragDelegated=false;
function attachDragHandlers(){
  const host=$("semesters"); if(!host || _dragDelegated) return;
  _dragDelegated=true;

  host.addEventListener("dragstart",e=>{
    const el=e.target.closest(".course-row"); if(!el) return;
    el.classList.add("dragging");
    e.dataTransfer.setData("text/plain",JSON.stringify({sem:el.dataset.sem,idx:el.dataset.idx,code:el.dataset.code}));
    e.dataTransfer.effectAllowed="move";
  });
  host.addEventListener("dragend",e=>{
    const el=e.target.closest(".course-row"); if(el) el.classList.remove("dragging");
  });
  host.addEventListener("dragover",e=>{
    const card=e.target.closest(".sem-card"); if(!card) return;
    e.preventDefault(); card.classList.add("drop-target");
  });
  host.addEventListener("dragleave",e=>{
    const card=e.target.closest(".sem-card"); if(!card) return;
    if(!card.contains(e.relatedTarget)) card.classList.remove("drop-target");
  });
  host.addEventListener("drop",e=>{
    const card=e.target.closest(".sem-card"); if(!card) return;
    e.preventDefault(); card.classList.remove("drop-target");
    let data; try{ data=JSON.parse(e.dataTransfer.getData("text/plain")); }catch(_){ return; }
    const fromSem=+data.sem, fromIdx=+data.idx, toSem=+card.dataset.sem;
    if(fromSem===toSem) return;
    const item=state.plan[fromSem][fromIdx];
    if(!item) return;
    state.plan[fromSem].splice(fromIdx,1);
    state.plan[toSem].push(item);
    saveState(); renderAll();
  });
}

function addCourse(s){ const sel=$(`addSel-${s}`); if(!sel||!sel.value) return; state.plan[s].push({code:sel.value,grade:""}); saveState(); renderAll(); }
function removeCourse(s,i){ state.plan[s].splice(i,1); saveState(); renderAll(); }
function setSemSession(s,v){ state.semSession[s]=v; saveState(); safe("renderSemesters"); safe("renderMilestone"); }
function setGrade(s,i,g){ state.plan[s][i].grade=g; saveState(); renderAll(); }

/* search box (planner) — jumps the matching course's add option into focus */
function plannerSearch(q){
  q=(q||"").trim().toLowerCase();
  const box=$("searchResults"); if(!box) return;
  if(!q){ box.innerHTML=""; box.classList.remove("open"); return; }
  const p=PROGRAMS[state.programId];
  const hits=p.courses.filter(c=>{
    if(c.cat==="D" && c.lang && c.lang!==state.langId) return false;  // hide non-selected language family (match the add-course dropdown)
    return c.code.toLowerCase().includes(q)||c.en.toLowerCase().includes(q)||c.ms.toLowerCase().includes(q);
  }).slice(0,8);
  box.classList.add("open");
  box.innerHTML=hits.length?hits.map(c=>`<div class="search-hit"><span class="sh-code">${c.code}</span><span class="sh-name">${c.en}</span><span class="sh-cr">${c.cr}cr</span></div>`).join("")
    :`<div class="search-empty">No course matches “${q}”.</div>`;
}

/* ─────────────────────── PDF EXPORT ─────────────────────── */
function exportPDF(){
  const p=PROGRAMS[state.programId];
  const {cgpa,per}=computeGPA();
  const perBySem={}; per.forEach(r=>perBySem[r.s]=r);
  let total=plannedCredits();
  let track="";
  if(p.tracks&&p.tracks.length){ const t=p.tracks.find(t=>t.id===state.trackId); if(t) track=`${t.en} (${t.ms})`; }
  const pathLabel=PATH_LABELS[state.pathId]||"";
  const cl=classOf4(cgpa);

  let semsHtml="";
  for(let s=1;s<=totalSems();s++){
    const items=state.plan[s]||[]; if(!items.length) continue;
    const cr=items.reduce((t,it)=>t+(getCourse(it.code)?.cr||0),0);
    const r=perBySem[s]; const semGpa=(r&&r.gpa!==null)?r.gpa.toFixed(2):"—";
    let rows="";
    items.forEach((it,i)=>{
      const c=getCourse(it.code); if(!c) return;
      rows+=`<tr style="background:${i%2?'#fff':'#f8f3ed'}">
        <td style="padding:5px 8px;font-size:11px;color:#696561">${c.code}</td>
        <td style="padding:5px 8px;font-size:11.5px">${c.en}<br><span style="font-size:10px;color:#a59f98">${c.ms}</span></td>
        <td style="padding:5px 8px;text-align:center;font-size:11px">${c.cat}</td>
        <td style="padding:5px 8px;text-align:center;font-size:11.5px">${c.cr}</td>
        <td style="padding:5px 8px;text-align:center;font-size:12px;font-weight:700;color:${it.grade?'#1d1b18':'#cfc4c5'}">${it.grade||"—"}</td>
      </tr>`;
    });
    semsHtml+=`<div style="margin-bottom:18px;page-break-inside:avoid">
      <div style="background:#1d1b18;color:#fef9f3;padding:8px 14px;display:flex;justify-content:space-between;align-items:center">
        <span style="font-weight:700;font-size:12px;letter-spacing:.12em;text-transform:uppercase">Semester ${s}</span>
        <span style="font-size:11px;opacity:.85">${cr} credits · GPA ${semGpa}</span>
      </div>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e6e2dc;border-top:none">
        <thead><tr style="background:#f2ede7">
          ${["Code","Course","Cat","Cr","Grade"].map(h=>`<th style="padding:6px 8px;font-size:9.5px;color:#696561;text-align:${h==='Course'||h==='Code'?'left':'center'};font-weight:700;letter-spacing:.08em;text-transform:uppercase">${h}</th>`).join("")}
        </tr></thead><tbody>${rows}</tbody></table></div>`;
  }

  const html=`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Degree Plan — ${p.id}</title>
  <style>*{margin:0;padding:0;box-sizing:border-box}
  body{font-family:Georgia,'Times New Roman',serif;color:#1d1b18;background:#fff;padding:32px 36px}
  @media print{body{padding:16px 20px}@page{margin:12mm 14mm;size:A4}}</style></head><body>
  <div style="border-bottom:2px solid #1d1b18;padding-bottom:14px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:flex-start">
    <div>
      <div style="font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#696561;margin-bottom:4px">Universiti Utara Malaysia · SEFB</div>
      <h1 style="font-size:20px;font-weight:700;line-height:1.2">${p.fullName}</h1>
      ${track?`<div style="font-size:12px;color:#696561;margin-top:4px;font-family:system-ui,sans-serif">Specialization: ${track}</div>`:""}
      ${pathLabel?`<div style="font-size:12px;color:#696561;font-family:system-ui,sans-serif">English Pathway: ${pathLabel}</div>`:""}
    </div>
    <div style="text-align:right;flex-shrink:0;margin-left:24px">
      <div style="font-size:30px;font-weight:700;color:${cl.color}">${cgpa.toFixed(2)}</div>
      <div style="font-size:10px;font-weight:700;color:${cl.color};letter-spacing:.08em;text-transform:uppercase;font-family:system-ui,sans-serif">${cl.label}</div>
      <div style="font-size:11px;color:#696561;margin-top:4px;font-family:system-ui,sans-serif">${total} / ${p.total} credits</div>
    </div>
  </div>
  ${semsHtml}
  <div style="border-top:1px solid #e6e2dc;padding-top:12px;margin-top:8px;font-size:10px;color:#a59f98;display:flex;justify-content:space-between;font-family:system-ui,sans-serif">
    <span>Source: SEFB 251 Panduan Akademik · Grading per UUM rules</span>
    <span>Generated ${new Date().toLocaleDateString('en-MY',{day:'2-digit',month:'short',year:'numeric'})}</span>
  </div></body></html>`;

  const old=$("_pdfFrame"); if(old) old.remove();
  const fr=document.createElement("iframe");
  fr.id="_pdfFrame";
  fr.style.cssText="position:fixed;inset:0;width:0;height:0;border:none;visibility:hidden";
  document.body.appendChild(fr);
  fr.contentDocument.open(); fr.contentDocument.write(html); fr.contentDocument.close();
  fr.contentWindow.onafterprint=()=>fr.remove();
  setTimeout(()=>{ fr.contentWindow.focus(); fr.contentWindow.print(); }, 350);
}
