/* ============================================================================
   charts.js — WatchHouse-themed canvas visualisations
   • CGPA ring gauge (elegant editorial full-circle ring)
   • Per-semester GPA bar chart (charcoal bars, amber Dean's line)
   • CGPA trend sparkline (inline SVG)
   All HiDPI/DPR-sharp, light/dark aware. No external dependencies.
============================================================================ */

const SERIF = "'Hoefler Text','Georgia','Times New Roman',serif";
const SANS  = "system-ui,-apple-system,'Segoe UI',sans-serif";

/* palette pulled from CSS so canvas matches the page exactly */
function _pal(){
  const dark = document.body.classList.contains("dark-mode");
  return {
    dark,
    ink:    dark ? "#f5f0ea" : "#1d1b18",
    sub:    dark ? "rgba(245,240,234,.62)" : "rgba(105,101,97,.95)",
    track:  dark ? "rgba(245,240,234,.13)" : "rgba(105,101,97,.18)",
    amber:  "#c0894a",
    amberB: dark ? "#d8a463" : "#b07a3f",
    err:    "#ba1a1a",
    grid:   dark ? "rgba(245,240,234,.10)" : "rgba(29,27,24,.10)",
    barTop: dark ? "#e6e2dc" : "#1d1b18",
    barBot: dark ? "#bdb8b1" : "#3a3733"
  };
}
/* Arc colour matches the UUM classification legend (same hex as the legend dots). */
function _arcColor(cgpa, p){
  if(cgpa<=0)   return p.track;     // no grades yet → neutral track
  if(cgpa<2.0)  return '#a8443a';   // Fail
  if(cgpa<3.0)  return '#3f7d5a';   // Lower 2nd
  if(cgpa<3.67) return '#3a6ea5';   // Upper 2nd
  return '#b07a3f';                 // First Class
}

/* ─────────────────────── CGPA RING GAUGE ─────────────────────── */
let _ringAnimVal=0,_ringAnimTarget=0,_ringAnimRAF=null;

function _drawRingGauge(cgpa){
  const canvas=$("cgpaRingCanvas"); if(!canvas) return;
  const dpr=window.devicePixelRatio||1;
  const S=440;
  if(canvas._dpr!==dpr){ canvas.width=S*dpr; canvas.height=S*dpr; canvas._dpr=dpr; }
  const ctx=canvas.getContext("2d");
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.imageSmoothingQuality="high";
  ctx.clearRect(0,0,S,S);

  const p=_pal();
  const CX=S/2, CY=S/2, R=160, SW=14;
  const START=-Math.PI/2;                 // 12 o'clock
  const frac=Math.max(0,Math.min(1,cgpa/4));
  const END=START+frac*Math.PI*2;
  /* full-circle track */
  ctx.beginPath(); ctx.arc(CX,CY,R,0,Math.PI*2);
  ctx.strokeStyle=p.track; ctx.lineWidth=SW; ctx.stroke();

  /* progress arc — drawn in UUM classification zones (same hex as the legend) so as it
     animates up it sweeps red → green → blue → gold according to the (current) CGPA. */
  if(frac>0.001){
    const ZONES=[
      {to:2.0,  c:'#a8443a'},  // Fail
      {to:3.0,  c:'#3f7d5a'},  // Lower 2nd
      {to:3.67, c:'#3a6ea5'},  // Upper 2nd
      {to:4.0,  c:'#b07a3f'}   // First Class
    ];
    ctx.save();
    ctx.lineWidth=SW; ctx.lineCap="butt";
    let from=0;
    for(const z of ZONES){
      const segEnd=Math.min(cgpa, z.to);
      if(segEnd<=from){ from=z.to; continue; }
      const a0=START+(from/4)*Math.PI*2, a1=START+(segEnd/4)*Math.PI*2;
      const fc=(z.to===4.0);
      ctx.shadowColor=z.c; ctx.shadowBlur=fc?(p.dark?42:24):(p.dark?12:7);
      ctx.strokeStyle=z.c;
      ctx.beginPath(); ctx.arc(CX,CY,R,a0,a1); ctx.stroke();
      from=z.to;
      if(segEnd>=cgpa) break;
    }
    /* rounded leading tip (current zone) + rounded start dome (Fail red) */
    ctx.shadowBlur=0; ctx.lineCap="round";
    ctx.strokeStyle=_arcColor(cgpa,p);
    ctx.beginPath(); ctx.arc(CX,CY,R, END-0.0001, END); ctx.stroke();
    ctx.strokeStyle=ZONES[0].c;
    ctx.beginPath(); ctx.arc(CX,CY,R, START, START+0.0001); ctx.stroke();
    ctx.restore();
  }

  /* Dean's List marker (3.67) — small tick on the ring */
  {
    const a=START+(3.67/4)*Math.PI*2;
    ctx.save();
    ctx.strokeStyle=p.amber; ctx.lineWidth=2.5;
    ctx.beginPath();
    ctx.moveTo(CX+Math.cos(a)*(R-SW/2-3), CY+Math.sin(a)*(R-SW/2-3));
    ctx.lineTo(CX+Math.cos(a)*(R+SW/2+3), CY+Math.sin(a)*(R+SW/2+3));
    ctx.stroke();
    ctx.restore();
  }

  /* centre value (serif) */
  ctx.fillStyle=p.ink;
  ctx.font=`400 92px ${SERIF}`;
  ctx.textAlign="center"; ctx.textBaseline="middle";
  ctx.fillText(cgpa.toFixed(2), CX, CY-6);

  /* caption */
  ctx.fillStyle=p.sub;
  ctx.font=`600 13px ${SANS}`;
  ctx.save();
  ctx.translate(CX, CY+46);
  ctx.fillText("C G P A   I N D E X", 0, 0);
  ctx.restore();

  /* DOM labels */
  const t=_ringAnimTarget||cgpa;
  const fcl=classOf4(t);
  const rcEl=$("cgpaRingClass"), rmEl=$("cgpaRingMotiv");
  if(rcEl){
    if(t<=0){ rcEl.textContent="Awaiting Grades"; rcEl.dataset.tier=""; }
    else{ rcEl.textContent=fcl.label; rcEl.dataset.tier=fcl.tier; }
  }
  if(rmEl){
    if(t<=0){ rmEl.textContent="Add grades to begin"; }
    else if(t>=3.67){ rmEl.textContent=""; }
    else{
      const nxt=[{v:3.67,n:"First Class"},{v:3.0,n:"Second Upper"},{v:2.0,n:"Second Lower"}].find(x=>x.v>t);
      rmEl.textContent = nxt ? `+${(nxt.v-t).toFixed(2)} to ${nxt.n}` : "";
    }
  }
}
function animateRingGauge(target){
  _ringAnimTarget=target;
  if(_ringAnimRAF) cancelAnimationFrame(_ringAnimRAF);
  if(target===0){ _ringAnimVal=0; _drawRingGauge(0); return; }
  (function tick(){
    _ringAnimVal+=(_ringAnimTarget-_ringAnimVal)*0.08;
    if(Math.abs(_ringAnimTarget-_ringAnimVal)<0.004) _ringAnimVal=_ringAnimTarget;
    _drawRingGauge(_ringAnimVal);
    if(_ringAnimVal<_ringAnimTarget) _ringAnimRAF=requestAnimationFrame(tick);
    else _ringAnimRAF=null;
  })();
}

/* ─────────────────────── SEMESTER BAR CHART ─────────────────────── */
let _lastPerData=[], _barRAF=null, _barAnimT=1;

function _animateBars(){
  if(_barRAF) cancelAnimationFrame(_barRAF);
  _barAnimT=0;
  const noMotion=window.matchMedia&&window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  if(noMotion){ _barAnimT=1; drawSemBarChart(); return; }
  const start=performance.now(), dur=700;
  (function tick(now){
    _barAnimT=Math.min(1,(now-start)/dur);
    const e=1-Math.pow(1-_barAnimT,3);  // ease-out-cubic
    _drawBarsFrame(e);
    if(_barAnimT<1) _barRAF=requestAnimationFrame(tick); else _barRAF=null;
  })(start);
}

function drawSemBarChart(perSemData){
  if(perSemData){ _lastPerData=perSemData; _animateBars(); return; }
  _drawBarsFrame(_barAnimT);
}

function _drawBarsFrame(t){
  const canvas=$("semBarCanvas"); if(!canvas) return;
  const data=(_lastPerData||[]).filter(r=>r.cr>0);
  const wrap=$("semBarWrap");
  if(!data.length){ canvas.style.height="0"; if(wrap) wrap.classList.add("is-empty"); return; }
  if(wrap) wrap.classList.remove("is-empty");

  const CW=Math.round(canvas.offsetWidth||canvas.parentElement?.clientWidth||0);
  if(CW<30){ setTimeout(()=>drawSemBarChart(),40); return; }
  const CH=270, dpr=window.devicePixelRatio||1;
  canvas.style.width=CW+"px"; canvas.style.height=CH+"px";
  if(canvas.width!==CW*dpr||canvas.height!==CH*dpr){ canvas.width=CW*dpr; canvas.height=CH*dpr; }
  const ctx=canvas.getContext("2d");
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.imageSmoothingQuality="high";
  ctx.clearRect(0,0,CW,CH);

  const p=_pal();
  const MT=34,MB=52,ML=44,MR=14,PW=CW-ML-MR,PH=CH-MT-MB;
  const yPx=v=>Math.round(MT+PH-(v/4)*PH)+0.5;
  const xPx=i=>Math.round(ML+(PW/data.length)*(i+0.5));
  const BW=Math.min(46,(PW/data.length)*0.52);

  /* grid + y labels */
  [0,1,2,3,4].forEach(v=>{
    const y=yPx(v);
    ctx.strokeStyle=p.grid; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(ML,y); ctx.lineTo(ML+PW,y); ctx.stroke();
    ctx.fillStyle=p.sub; ctx.font=`600 12px ${SANS}`;
    ctx.textAlign="right"; ctx.textBaseline="middle";
    ctx.fillText(v.toFixed(0), ML-10, y);
  });

  /* Dean's List dashed line */
  const dlY=yPx(3.67);
  ctx.save();
  ctx.strokeStyle=p.amber; ctx.lineWidth=1.6; ctx.setLineDash([5,5]);
  ctx.beginPath(); ctx.moveTo(ML,dlY); ctx.lineTo(ML+PW,dlY); ctx.stroke();
  ctx.restore();
  ctx.fillStyle=p.amberB; ctx.font=`700 11px ${SANS}`;
  ctx.textAlign="left"; ctx.textBaseline="middle";
  ctx.fillText("3.67", ML+4, dlY-9);

  /* bars */
  data.forEach((r,i)=>{
    const cx=xPx(i), bx=Math.round(cx-BW/2), yBaseline=MT+PH;
    if(r.gpa===null){
      const bh=Math.round(PH*0.05*t); const by=yBaseline-bh;
      ctx.fillStyle=p.track; ctx.fillRect(bx,by,BW,bh);
    } else {
      const fullBh=Math.round(yBaseline-yPx(r.gpa)+0.5);
      const bh=Math.round(fullBh*t); const by=yBaseline-bh;
      const rr=t===1?Math.min(4,BW/4):0;
      const isDeans=r.gpa>=DEANS_LIST, isFail=r.gpa<2.0;
      const top=isFail?p.err:(isDeans?p.amberB:p.barTop);
      const bot=isFail?p.err:(isDeans?p.amber:p.barBot);
      const g=ctx.createLinearGradient(bx,by,bx,by+bh);
      g.addColorStop(0,top); g.addColorStop(1,bot);
      ctx.fillStyle=g;
      ctx.beginPath();
      if(rr>0){
        ctx.moveTo(bx,by+bh); ctx.lineTo(bx,by+rr);
        ctx.arcTo(bx,by,bx+rr,by,rr); ctx.lineTo(bx+BW-rr,by);
        ctx.arcTo(bx+BW,by,bx+BW,by+rr,rr); ctx.lineTo(bx+BW,by+bh);
      } else { ctx.rect(bx,by,BW,bh); }
      ctx.closePath(); ctx.fill();
      /* value label — only show when mostly grown */
      if(t>0.7){
        ctx.globalAlpha=Math.min(1,(t-0.7)/0.3);
        ctx.fillStyle=p.ink; ctx.font=`700 13px ${SANS}`;
        ctx.textAlign="center"; ctx.textBaseline="alphabetic";
        ctx.fillText(r.gpa.toFixed(2), cx, yBaseline-bh-7);
        ctx.globalAlpha=1;
      }
    }
    /* x label */
    ctx.fillStyle=p.sub; ctx.font=`600 12px ${SANS}`;
    ctx.textAlign="center"; ctx.textBaseline="alphabetic";
    ctx.fillText("Sem "+r.s, cx, CH-MB+22);
  });

  /* L axes */
  ctx.strokeStyle=p.track; ctx.lineWidth=1.4;
  ctx.beginPath();
  ctx.moveTo(ML,MT); ctx.lineTo(ML,MT+PH); ctx.lineTo(ML+PW,MT+PH);
  ctx.stroke();
}

/* ─────────────────────── CGPA TREND SPARKLINE ─────────────────────── */
function buildSparkline(values){
  if(!values.length) return "";
  const w=120,h=34,pad=3, min=0, max=4;
  const X=i=>pad+(w-2*pad)*(i/Math.max(1,values.length-1));
  const Y=v=>h-pad-(h-2*pad)*((v-min)/(max-min));
  const pts=values.map((v,i)=>`${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(" ");
  const last=values[values.length-1];
  const col=last>=DEANS_LIST?"#b07a3f":(last>=2?"#696561":"#ba1a1a");
  return `<svg viewBox="0 0 ${w} ${h}" class="sparkline" preserveAspectRatio="none">
    <polyline points="${pts}" fill="none" stroke="${col}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${X(values.length-1).toFixed(1)}" cy="${Y(last).toFixed(1)}" r="2.6" fill="${col}"/>
  </svg>`;
}

/* ─────────────────────── ANIMATED COUNT-UP ─────────────────────── */
function animateNumber(el, target, decimals=0, duration=600){
  if(!el) return;
  const startVal=parseFloat(el.textContent)||0;
  const start=performance.now();
  (function frame(t){
    const k=Math.min(1,(t-start)/duration);
    const eased=1-Math.pow(1-k,3);
    el.textContent=(startVal+(target-startVal)*eased).toFixed(decimals);
    if(k<1) requestAnimationFrame(frame);
    else el.textContent=target.toFixed(decimals);
  })(start);
}

/* redraw on theme toggle / resize */
function redrawCharts(){
  if($("cgpaRingCanvas")) _drawRingGauge(_ringAnimTarget||_ringAnimVal);
  if($("semBarCanvas"))   drawSemBarChart();
}
window.addEventListener("resize", ()=>{ clearTimeout(window._rcz); window._rcz=setTimeout(redrawCharts,150); });
