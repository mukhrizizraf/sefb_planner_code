/* ============================================================================
   calculators.js — standalone GPA + CGPA projection tools (Analytics page)
   Independent of the saved plan; pure what-if calculators.
============================================================================ */

let gpaCalc = [{cr:3,grade:""},{cr:3,grade:""},{cr:3,grade:""}];

function gpaCalcRender(){
  const wrap=$("gpaCalcRows"); if(!wrap) return;
  wrap.innerHTML=gpaCalc.map((row,i)=>`
    <div class="calc-row">
      <div class="calc-cr"><input type="number" min="1" max="8" value="${row.cr}" oninput="gpaCalcSet(${i},'cr',this.value)" aria-label="Credits for course ${i+1}"><span>cr</span></div>
      <select onchange="gpaCalcSet(${i},'grade',this.value)" aria-label="Grade for course ${i+1}">
        <option value="">— grade —</option>
        ${GRADES.map(g=>`<option value="${g.g}" ${row.grade===g.g?'selected':''}>${g.g} · ${g.p.toFixed(2)} · ${g.s}</option>`).join("")}
      </select>
      <button class="row-x" onclick="gpaCalcRemove(${i})" title="Remove" aria-label="Remove course ${i+1}">${icon("close")}</button>
    </div>`).join("");
  let totCr=0,totP=0,count=0;
  gpaCalc.forEach(r=>{ const p=gp(r.grade), cr=Number(r.cr)||0; if(p===null||!cr) return; totCr+=cr; totP+=p*cr; count++; });
  const gpa=totCr?totP/totCr:0;
  const set=(id,v)=>{ const e=$(id); if(e) e.textContent=v; };
  set("gpaCalcResult", gpa.toFixed(2));
  set("gpaCalcCr", totCr);
  set("gpaCalcCount", count);
  const s=$("gpaCalcStatus");
  if(s){
    if(!count){ s.textContent="—"; s.dataset.tier=""; }
    else if(gpa>=DEANS_LIST){ s.textContent="Dean's List"; s.dataset.tier="first"; }
    else if(gpa>=3.0){ s.textContent="Distinction"; s.dataset.tier="upper"; }
    else if(gpa>=2.0){ s.textContent="Pass"; s.dataset.tier="lower"; }
    else{ s.textContent="Below 2.00"; s.dataset.tier="fail"; }
  }
}
function gpaCalcSet(i,k,v){ if(gpaCalc[i]){ gpaCalc[i][k]=v; gpaCalcRender(); } }
function gpaCalcAdd(){ gpaCalc.push({cr:3,grade:""}); gpaCalcRender(); }
function gpaCalcRemove(i){ gpaCalc.splice(i,1); if(!gpaCalc.length) gpaCalc=[{cr:3,grade:""}]; gpaCalcRender(); }
function gpaCalcReset(){ gpaCalc=[{cr:3,grade:""},{cr:3,grade:""},{cr:3,grade:""}]; gpaCalcRender(); }

let cgpaCalcRows=[{cr:3,grade:""},{cr:3,grade:""},{cr:3,grade:""}];

function cgpaCalcRender(){
  const wrap=$("cgpaCalcRows"); if(!wrap) return;
  wrap.innerHTML=cgpaCalcRows.map((row,i)=>`
    <div class="calc-row">
      <div class="calc-cr"><input type="number" min="1" max="8" value="${row.cr}" oninput="cgpaCalcSetRow(${i},'cr',this.value)" aria-label="Credits for semester ${i+1}"><span>cr</span></div>
      <select onchange="cgpaCalcSetRow(${i},'grade',this.value)" aria-label="GPA grade for semester ${i+1}">
        <option value="">— grade —</option>
        ${GRADES.map(g=>`<option value="${g.g}" ${row.grade===g.g?'selected':''}>${g.g} · ${g.p.toFixed(2)} · ${g.s}</option>`).join("")}
      </select>
      <button class="row-x" onclick="cgpaCalcRemoveRow(${i})" title="Remove" aria-label="Remove semester ${i+1}">${icon("close")}</button>
    </div>`).join("");
  let semCr=0,semP=0;
  cgpaCalcRows.forEach(r=>{ const p=gp(r.grade), cr=Number(r.cr)||0; if(p===null||!cr) return; semCr+=cr; semP+=p*cr; });
  const semGPA=semCr?semP/semCr:0;
  const prior=Math.max(0,Math.min(4,parseFloat(($("cgpaPriorVal")||{}).value)||0));
  const priorCr=Math.max(0,parseFloat(($("cgpaPriorCr")||{}).value)||0);
  const totalCr=priorCr+semCr;
  const newCGPA=totalCr?(prior*priorCr+semP)/totalCr:0;
  const set=(id,v)=>{ const e=$(id); if(e) e.textContent=v; };
  set("cgpaCalcSem", semGPA.toFixed(2));
  set("cgpaCalcNew", newCGPA.toFixed(2));
  set("cgpaCalcTotal", totalCr);
  const s=$("cgpaCalcStatus");
  if(s){
    if(!semCr&&!priorCr){ s.textContent="Enter values to project"; s.dataset.tier=""; }
    else if(newCGPA>=DEANS_LIST){ s.textContent="Dean's List standing"; s.dataset.tier="first"; }
    else if(newCGPA>=3.0){ s.textContent="Strong standing"; s.dataset.tier="upper"; }
    else if(newCGPA>=2.0){ s.textContent="Good standing"; s.dataset.tier="lower"; }
    else{ s.textContent="Probation risk (< 2.00)"; s.dataset.tier="fail"; }
  }
}
function cgpaCalcSetRow(i,k,v){ if(cgpaCalcRows[i]){ cgpaCalcRows[i][k]=v; cgpaCalcRender(); } }
function cgpaCalcAdd(){ cgpaCalcRows.push({cr:3,grade:""}); cgpaCalcRender(); }
function cgpaCalcRemoveRow(i){ cgpaCalcRows.splice(i,1); if(!cgpaCalcRows.length) cgpaCalcRows=[{cr:3,grade:""}]; cgpaCalcRender(); }
function cgpaCalcReset(){ cgpaCalcRows=[{cr:3,grade:""},{cr:3,grade:""},{cr:3,grade:""}]; const a=$("cgpaPriorVal"),b=$("cgpaPriorCr"); if(a)a.value=""; if(b)b.value=""; cgpaCalcRender(); }
