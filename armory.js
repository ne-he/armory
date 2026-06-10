/* ============================================================
   ARMORY HALL — engine stub (data + render + interactions)
   ============================================================ */

/* Shared mech silhouette (swap .robot-body background-image with a real PNG later) */
const MECH_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 240'%3E%3Cg fill='black'%3E%3Crect x='66' y='0' width='3' height='10'/%3E%3Crect x='72' y='2' width='2' height='8'/%3E%3Cpath d='M58 8 L82 8 L88 22 L84 40 L74 46 L66 46 L56 40 L52 22 Z'/%3E%3Crect x='60' y='42' width='20' height='9'/%3E%3Crect x='12' y='50' width='28' height='26' rx='8'/%3E%3Crect x='100' y='50' width='28' height='26' rx='8'/%3E%3Cpath d='M42 56 L98 56 L88 122 L80 150 L60 150 L52 122 Z'/%3E%3Crect x='16' y='74' width='16' height='42' rx='7'/%3E%3Crect x='108' y='74' width='16' height='42' rx='7'/%3E%3Crect x='14' y='116' width='18' height='40' rx='5'/%3E%3Crect x='108' y='116' width='18' height='40' rx='5'/%3E%3Crect x='50' y='148' width='40' height='16' rx='3'/%3E%3Crect x='52' y='160' width='16' height='48' rx='5'/%3E%3Crect x='72' y='160' width='16' height='48' rx='5'/%3E%3Crect x='48' y='204' width='22' height='36' rx='4'/%3E%3Crect x='70' y='204' width='22' height='36' rx='4'/%3E%3C/g%3E%3C/svg%3E\")";
document.documentElement.style.setProperty('--mech', MECH_SVG);

/* ---- PROJECTS ----
   Placeholder art: every unit uses the transparent-cut robot (swap per-unit later).
   x = left%, y = bottom%, w = width(vw), z = depth. frames_2 ends on an EMPTY hall + 3
   hero robots dead-centre, so the 10 units line up as a STRAIGHT front rank (uniform size
   & height, evenly spaced) standing in front of that trio. Fine-tune live with ?calibrate. */
const ROBOT_IMG = 'generated/robot2_clear.png';
const PROJECTS = [
  { id:'01', name:'PULSE',   type:'Realtime Engine',  accent:'#f4a93a', x:'6%',    y:'8%', w:'11.5vw', z:4, status:'active',
    summary:'Live event heartbeat.', tech:['WebSocket','Redis','Go'],
    description:'A realtime presence + signaling layer that keeps thousands of clients in sync with sub-100ms latency. Built for live ops dashboards where every second counts.',
    stats:{Creativity:72,Technical:94,Impact:80}, links:{live:'#',code:'#'} },
  { id:'02', name:'WARDEN',  type:'Security Suite',    accent:'#ffb454', x:'15.8%', y:'8%', w:'11.5vw', z:4, status:'active',
    summary:'Threat perimeter.', tech:['Rust','eBPF','Zero-Trust'],
    description:'An adaptive policy engine that watches the perimeter and quarantines anomalies before they spread. Designed around zero-trust primitives.',
    stats:{Creativity:64,Technical:90,Impact:88}, links:{live:'#',code:'#'} },
  { id:'03', name:'ORACLE',  type:'Forecast Model',    accent:'#ffc56b', x:'25.6%', y:'8%', w:'11.5vw', z:4, status:'active',
    summary:'Predictive insight.', tech:['Python','PyTorch','Airflow'],
    description:'A probabilistic forecasting pipeline turning noisy signals into clear horizons. Ships calibrated confidence bands, not just point guesses.',
    stats:{Creativity:80,Technical:86,Impact:84}, links:{live:'#',code:'#'} },
  { id:'04', name:'ATLAS',   type:'Infra Platform',    accent:'#ffd9a0', x:'35.3%', y:'8%', w:'11.5vw', z:4, status:'active',
    summary:'Carries the world.', tech:['K8s','Terraform','Go'],
    description:'The backbone platform every other unit deploys onto — self-healing infra with one-command provisioning and ruthless cost guardrails.',
    stats:{Creativity:68,Technical:96,Impact:92}, links:{live:'#',code:'#'} },
  { id:'05', name:'NOVA',    type:'Design System',     accent:'#ffc56b', x:'45.1%', y:'8%', w:'11.5vw', z:4, status:'active',
    summary:'A new star of UI.', tech:['React','Tokens','Figma'],
    description:'A token-driven design system with zero-runtime theming. One source of truth across web, mobile, and embedded surfaces.',
    stats:{Creativity:92,Technical:78,Impact:82}, links:{live:'#',code:'#'} },
  { id:'06', name:'RAVEN',   type:'Data Pipeline',     accent:'#ffb454', x:'54.9%', y:'8%', w:'11.5vw', z:4, status:'active',
    summary:'Sees everything.', tech:['Kafka','Spark','dbt'],
    description:'A streaming ETL fabric that ingests, cleans, and serves petabyte-scale data with lineage tracked end to end.',
    stats:{Creativity:60,Technical:92,Impact:79}, links:{live:'#',code:'#'} },
  { id:'07', name:'EMBER',   type:'Creative Tool',     accent:'#f4a93a', x:'64.7%', y:'8%', w:'11.5vw', z:4, status:'active',
    summary:'Sparks ideas.', tech:['WebGL','Canvas','TS'],
    description:'A generative art toolkit for live performances — shader graphs you can patch in real time with a MIDI controller.',
    stats:{Creativity:96,Technical:74,Impact:70}, links:{live:'#',code:'#'} },
  { id:'08', name:'TITAN',   type:'Game Engine',       accent:'#ffd9a0', x:'74.4%', y:'8%', w:'11.5vw', z:4, status:'coming_soon',
    summary:'Classified build.', tech:['C++','Vulkan'],
    description:'A from-scratch ECS game engine. Currently sealed in the vault — declassified soon.',
    stats:{Creativity:88,Technical:90,Impact:0}, links:{} },
  { id:'09', name:'HALO',    type:'AR Interface',      accent:'#ffc56b', x:'84.2%', y:'8%', w:'11.5vw', z:4, status:'coming_soon',
    summary:'Classified build.', tech:['ARKit','Swift'],
    description:'Spatial UI experiments for heads-up workflows. Field trials underway.',
    stats:{Creativity:90,Technical:80,Impact:0}, links:{} },
  { id:'10', name:'SPECTER', type:'Stealth Ops',       accent:'#ffb454', x:'94%',   y:'8%', w:'11.5vw', z:4, status:'coming_soon',
    summary:'Classified build.', tech:['Tor','Crypto'],
    description:'A privacy-first comms layer. Details remain dark until launch.',
    stats:{Creativity:84,Technical:88,Impact:0}, links:{} },
].map(p => ({ ...p, image: ROBOT_IMG }));

/* ---- render robots ---- */
const arsenal = document.querySelector('.arsenal');
const unitRail = document.querySelector('.unit-nav-rail');

PROJECTS.forEach(p=>{
  const locked = p.status === 'coming_soon';
  const r = document.createElement('div');
  r.className = 'robot' + (locked ? ' is-locked' : '') + (p.image ? ' has-img' : '');
  r.dataset.id = p.id;
  r.style.cssText = `--x:${p.x};--y:${p.y};--w:${p.w};--z:${p.z};--glow:${p.accent}`;
  r.innerHTML = `
    <div class="robot-tooltip"><b>${p.name}</b><span>${p.type}</span><i></i></div>
    <div class="robot-figure">
      <div class="robot-body" ${p.image?`style="background-image:url('${p.image}');background-size:contain;background-repeat:no-repeat;background-position:center"`:''}></div>
      <div class="robot-eyes"><i></i><i></i></div>
      <div class="robot-core"></div>
      ${locked?'<div class="robot-lock">LOCKED</div>':''}
    </div>
    <div class="robot-shadow"></div>`;
  if(!locked) r.addEventListener('click', ()=>openPanel(p.id));
  arsenal.appendChild(r);

  /* unit-nav entry */
  const u = document.createElement('button');
  u.className = 'unit' + (locked ? ' is-locked' : '');
  u.dataset.id = p.id;
  u.innerHTML = `<span class="unit-id">${p.id}</span>
    <span class="unit-name">${p.name}</span>
    <span class="unit-type">${locked?'CLASSIFIED':p.type}</span>`;
  u.addEventListener('mouseenter', ()=>highlight(p.id,true));
  u.addEventListener('mouseleave', ()=>highlight(p.id,false));
  if(!locked) u.addEventListener('click', ()=>openPanel(p.id));
  unitRail.appendChild(u);
});

function highlight(id,on){
  const r = arsenal.querySelector(`.robot[data-id="${id}"]`);
  const u = unitRail.querySelector(`.unit[data-id="${id}"]`);
  if(u) u.classList.toggle('is-active',on);
  if(r){ r.style.filter = on?'none':''; r.style.transform = on?'translateX(-50%) translateY(-2%) scale(1.06)':''; r.style.zIndex = on?30:''; }
}

/* ---- dossier panel ---- */
const scrim = document.querySelector('.panel-scrim');
const panel = document.querySelector('.panel');
function openPanel(id){
  const p = PROJECTS.find(x=>x.id===id); if(!p) return;
  panel.style.setProperty('--glow', p.accent);
  panel.querySelector('.panel-type').textContent = p.type;
  panel.querySelector('.panel-name').textContent = p.name;
  panel.querySelector('.panel-desig').textContent = `MODEL DESIGNATION — UNIT ${p.id}`;
  panel.querySelector('.panel-status').innerHTML = p.status==='coming_soon'
    ? '◇ STATUS — CLASSIFIED' : '● STATUS — DEPLOYED';
  panel.querySelector('.panel-brief').textContent = p.description;
  panel.querySelector('.pi-fig').style.setProperty('--glow', p.accent);
  if(p.image){ const fig=panel.querySelector('.pi-fig');
    fig.style.background=`url('${p.image}') bottom center/contain no-repeat`;
    fig.style.webkitMask='none'; fig.style.mask='none';     // show the real PNG, not the mech silhouette
  }
  /* chips */
  panel.querySelector('.chips').innerHTML = p.tech.map(t=>`<span class="chip">${t}</span>`).join('');
  /* stats */
  panel.querySelector('.stats').innerHTML = Object.entries(p.stats).map(([k,v])=>`
    <div class="stat"><span class="stat-k">${k}</span>
    <span class="stat-bar"><i style="--v:0%" data-v="${v}%"></i></span>
    <span class="stat-v">${v?String(v).padStart(2,'0'):'--'}</span></div>`).join('');
  /* links */
  const L=[]; if(p.links.live) L.push(`<a class="btn-link" href="${p.links.live}" target="_blank" rel="noopener">View Live ↗</a>`);
  if(p.links.code) L.push(`<a class="btn-link ghost" href="${p.links.code}" target="_blank" rel="noopener">Source ↗</a>`);
  panel.querySelector('.panel-links').innerHTML = L.join('') || '<span class="btn-link ghost" style="pointer-events:none">Declassified Soon</span>';
  scrim.classList.add('is-open'); panel.classList.add('is-open');
  requestAnimationFrame(()=>setTimeout(()=>panel.querySelectorAll('.stat-bar i').forEach(b=>b.style.width=b.dataset.v),120));
}
function closePanel(){ scrim.classList.remove('is-open'); panel.classList.remove('is-open'); }
scrim.addEventListener('click', closePanel);
panel.querySelector('.panel-back').addEventListener('click', closePanel);
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closePanel(); });

/* ============================================================
   PAGE-1 REVEAL ENGINE — newgif JPG sequence (240 frames, dark→lit EMPTY hall)
   scrubbed on <canvas> via GSAP ScrollTrigger (pin .stage, scrub:0.5). The PNG
   arsenal stays fully hidden through the whole scrub; only when it finishes does
   a short cinematic beat (bloom flash + SYSTEM ONLINE) reveal Page 2 — idle.mp4
   loop fades in over the held last frame + 10 PNG robots fade in staggered and
   become interactive. No GSAP (offline) → manual sticky scroll driver fallback.
   ============================================================ */
const stage  = document.querySelector('.stage');
const track  = document.querySelector('.scroll-track');
const idleV  = document.getElementById('idle');
const canvas = document.getElementById('revealCanvas');
const ctx    = canvas.getContext('2d');
const arsenalEl = document.querySelector('.arsenal');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const calibrating = new URLSearchParams(location.search).has('calibrate');

/* idle.mp4 only covers the canvas once it truly decodes (else the lit empty-hall
   last frame stays visible — no blank-dark cover on Safari/headless) */
if(idleV) idleV.addEventListener('loadeddata', ()=>document.body.classList.add('idle-ok'), {once:true});

const progressDots = document.querySelector('.progress');
for(let i=0;i<3;i++){ progressDots.appendChild(document.createElement('i')); }
const dots = progressDots.querySelectorAll('i');

let onPreloadProgress = null, onPreloadComplete = null, loaderFired = false;
function fireLoaderDone(){ if(loaderFired) return; loaderFired = true; if(onPreloadComplete) onPreloadComplete(); }

/* ---------- newgif frame sequence (240 frames, dark→lit EMPTY hall) scrubbed on canvas ---------- */
const FRAME_FIRST = 1, FRAME_LAST = 240;
const FRAME_PATH = n => `public/newgif/ezgif-frame-${String(n).padStart(3,'0')}.jpg`;
const frames = []; let validFrames = [], lastIdx = -1, canvasReady = false;
function drawCover(img){
  if(!img || !img.naturalWidth) return;
  const cw=canvas.width, ch=canvas.height, iw=img.naturalWidth, ih=img.naturalHeight;
  const s=Math.max(cw/iw,ch/ih), w=iw*s, h=ih*s;
  ctx.drawImage(img,(cw-w)/2,(ch-h)/2,w,h);
}
function drawFrameAt(p){
  if(!validFrames.length) return;
  const idx = Math.round(Math.min(1,Math.max(0,p))*(validFrames.length-1));
  if(idx===lastIdx) return; lastIdx=idx; drawCover(validFrames[idx]);
}
function resizeCanvas(){
  const dpr = Math.min(window.devicePixelRatio||1, 2);
  canvas.width  = Math.round(window.innerWidth *dpr);
  canvas.height = Math.round(window.innerHeight*dpr);
  lastIdx = -1; drawFrameAt(currentP);
}
function loadSingleFrame(n){           // light path for reduced-motion / calibrate
  resizeCanvas();
  const im=new Image();
  im.onload = im.onerror = () => {
    if(im.naturalWidth){ frames[n]=im; validFrames=[im]; canvasReady=true;
      document.body.classList.add('frames-ready'); lastIdx=-1; drawCover(im); }
    fireLoaderDone();
  };
  im.src = FRAME_PATH(n);
  window.addEventListener('resize', resizeCanvas);
}
function preloadFrames(){
  const total = FRAME_LAST-FRAME_FIRST+1; let done=0, finished=false;
  const settle = () => { done++; if(onPreloadProgress) onPreloadProgress(done/total); if(done>=total) finish(); };
  function finish(){
    if(finished) return; finished=true;
    validFrames = frames.filter(Boolean);
    canvasReady = validFrames.length>0;
    if(canvasReady){ document.body.classList.add('frames-ready'); resizeCanvas(); drawFrameAt(currentP); }
    fireLoaderDone();
  }
  for(let n=FRAME_FIRST;n<=FRAME_LAST;n++){
    const im=new Image(); im.onload=()=>{frames[n]=im;settle();}; im.onerror=settle; im.src=FRAME_PATH(n);
  }
  setTimeout(finish, 15000);
}

/* ---------- scrub source = newgif on canvas ---------- */
let currentP = 0, booted = false;
function startCanvas(){
  if(booted) return; booted = true;
  resizeCanvas(); preloadFrames();
  window.addEventListener('resize', resizeCanvas);
}

/* ---------- shared scrub application ---------- */
function applyScrub(p){
  currentP = p;
  drawFrameAt(p);
  const ph = p>0.62?3 : p>0.22?2 : 1;        // atmosphere phase (beam/scan/vignette CSS)
  stage.dataset.phase = ph;
  dots.forEach((d,i)=>d.classList.toggle('on', i===ph-1));
  if(p>0.86) enterArsenal(); else if(p<0.80) exitArsenal();   // gate with hysteresis
}

/* ---------- cinematic beat + Page-2 reveal ---------- */
let inArsenal = false, beatTimers = [];
function enterArsenal(){
  if(inArsenal) return; inArsenal = true;
  beatTimers.forEach(clearTimeout); beatTimers = [];
  stage.classList.add('is-flash');                       // bloom flash + SYSTEM ONLINE
  if(idleV && idleV.play) idleV.play().catch(()=>{});
  beatTimers.push(setTimeout(()=>{
    stage.classList.add('is-arsenal');                   // idle video + title + nav fade in
    [...arsenalEl.querySelectorAll('.robot')].forEach((r,i)=>{
      r.style.transitionDelay = (i*0.07)+'s'; r.classList.add('on');   // staggered PNG fade-in
    });
  }, 560));
  beatTimers.push(setTimeout(()=>{ stage.classList.remove('is-flash'); }, 1450));
}
function exitArsenal(){
  if(!inArsenal) return; inArsenal = false;
  beatTimers.forEach(clearTimeout); beatTimers = [];
  stage.classList.remove('is-arsenal','is-flash');
  arsenalEl.querySelectorAll('.robot').forEach(r=>{ r.style.transitionDelay='0s'; r.classList.remove('on'); });
  if(idleV && idleV.pause) idleV.pause();
}

/* ---------- scroll engine: GSAP pin scrub, or manual sticky fallback ---------- */
function initScroll(){
  if(window.gsap && window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger:'.stage', start:'top top', end:'+=2400', pin:true, scrub:0.5,
      onUpdate:s=>applyScrub(s.progress)
    });
    ScrollTrigger.refresh();
  } else {
    stage.style.position='sticky'; stage.style.top='0';
    track.style.height='340vh';
    const read = () => { const total = track.offsetHeight - window.innerHeight;
      applyScrub(total>0 ? Math.min(1,Math.max(0,-track.getBoundingClientRect().top/total)) : 0); };
    window.addEventListener('scroll', read, {passive:true});
    window.addEventListener('resize', read);
    read();
  }
  applyScrub(currentP);
}

/* ---------- boot ---------- */
if(reduceMotion || calibrating){
  loadSingleFrame(FRAME_LAST);               // static lit empty hall (Page-2 reference)
} else {
  startCanvas();                             // preload newgif → scrub on canvas
}

/* ---- reticle (off during calibrate so the real cursor is visible) ---- */
const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
if(fine && !calibrating){
  document.body.classList.add('has-reticle');
  const ret = document.querySelector('.reticle');
  let rx=innerWidth/2, ry=innerHeight/2, cx=rx, cy=ry;
  document.addEventListener('mousemove', e=>{ rx=e.clientX; ry=e.clientY; });
  (function loop(){ cx+=(rx-cx)*.22; cy+=(ry-cy)*.22;
    ret.style.transform=`translate(${cx}px,${cy}px) translate(-50%,-50%)`; requestAnimationFrame(loop); })();
  document.addEventListener('mouseover', e=>{
    ret.classList.toggle('lock-on', !!e.target.closest('.robot:not(.is-locked), .unit:not(.is-locked), a, button')); });
}

/* ---- loader (driven by REAL frame preload progress) ---- */
const loader = document.getElementById('loader');
const ldBar = loader.querySelector('.ld-bar i');
const ldPct = loader.querySelector('.ld-pct');
const ldStatus = loader.querySelector('.ld-status');
const steps = ['SYSTEM BOOTING','CALIBRATING OPTICS','POWERING ALCOVES','UNITS ONLINE'];

let realPct = 0, shownPct = 0, complete = false;
onPreloadProgress = pr => { realPct = Math.min(99, pr*100); };
onPreloadComplete = () => { realPct = 100; complete = true; };

function closeLoader(){
  loader.classList.add('is-done');
  document.body.classList.remove('is-loading');
  if(calibrating){
    drawFrameAt(1); stage.classList.add('is-arsenal');
    arsenalEl.querySelectorAll('.robot').forEach(r=>r.classList.add('on'));
  } else if(reduceMotion){
    drawFrameAt(1); enterArsenal();          // skip the scrub, jump to the lit arsenal
  } else {
    initScroll();                            // start the pinned video/canvas scrub
  }
}
const li = setInterval(()=>{
  // ease the shown bar toward the real load %, but always creep so it never stalls visually
  shownPct += Math.max((realPct - shownPct) * 0.18, complete ? 2.2 : 0.4);
  shownPct = Math.min(shownPct, 100);
  ldBar.style.width = shownPct+'%';
  ldPct.textContent = String(Math.floor(shownPct)).padStart(3,'0')+'%';
  ldStatus.textContent = steps[Math.min(steps.length-1, Math.floor(shownPct/26))];
  if(complete && shownPct >= 99.5){
    clearInterval(li);
    ldBar.style.width='100%'; ldPct.textContent='100%';
    setTimeout(closeLoader, 480);
  }
}, 60);

/* safety: never let a stalled source trap the loader */
setTimeout(()=>{ if(!complete){ realPct = 100; complete = true; } }, 12000);

/* ============================================================
   DEV CALIBRATION MODE  (open with ?calibrate)
   Drag a robot to reposition · scroll-wheel over it to resize ·
   press C to dump every unit's --x/--y/--w to the console so the
   placeholder arc can be replaced with dialled-in values.
   ============================================================ */
if(calibrating){
  /* lit arsenal state (frame + is-arsenal + robots) is set by closeLoader's calibrate branch */
  const tag = document.createElement('div');
  tag.style.cssText='position:fixed;left:12px;bottom:12px;z-index:200;font:11px/1.5 monospace;'+
    'color:#ffc56b;background:rgba(0,0,0,.7);padding:8px 12px;border:1px solid rgba(244,169,58,.4);pointer-events:none';
  tag.textContent='CALIBRATE — drag to move · wheel to resize · press C to copy values';
  document.body.appendChild(tag);

  /* selectable output box (so values can be copied without opening devtools) */
  const out = document.createElement('textarea');
  out.readOnly = true;
  out.style.cssText='position:fixed;right:12px;bottom:12px;width:320px;height:170px;z-index:201;'+
    'font:11px/1.5 monospace;color:#ffd9a0;background:rgba(0,0,0,.85);border:1px solid rgba(244,169,58,.5);'+
    'padding:8px;display:none;resize:none';
  document.body.appendChild(out);

  /* swallow clicks during calibrate (capture phase) so dragging never opens the dossier panel */
  arsenal.addEventListener('click', e=>{ e.stopPropagation(); e.preventDefault(); }, true);

  let active=null, sx=0, sy=0, ox=0, oy=0;
  arsenal.querySelectorAll('.robot').forEach(r=>{
    r.style.cursor='grab';
    r.addEventListener('pointerdown', e=>{
      active=r; r.setPointerCapture(e.pointerId);
      sx=e.clientX; sy=e.clientY;
      ox=parseFloat(getComputedStyle(r).getPropertyValue('--x'));
      oy=parseFloat(getComputedStyle(r).getPropertyValue('--y'));
      e.preventDefault();
    });
    r.addEventListener('pointermove', e=>{
      if(active!==r) return;
      const nx = ox + (e.clientX-sx)/window.innerWidth*100;
      const ny = oy - (e.clientY-sy)/window.innerHeight*100;   // bottom-anchored
      r.style.setProperty('--x', nx.toFixed(1)+'%');
      r.style.setProperty('--y', ny.toFixed(1)+'%');
    });
    r.addEventListener('pointerup', ()=>{ active=null; });
    r.addEventListener('wheel', e=>{
      e.preventDefault();
      const cur=parseFloat(getComputedStyle(r).getPropertyValue('--w'));
      r.style.setProperty('--w', Math.max(4,(cur - Math.sign(e.deltaY)*0.4)).toFixed(1)+'vw');
    }, {passive:false});
  });
  addEventListener('keydown', e=>{
    if(e.key.toLowerCase()!=='c') return;
    const dump = [...arsenal.querySelectorAll('.robot')].map(r=>{
      const s=getComputedStyle(r);
      return `${r.dataset.id}: x:'${s.getPropertyValue('--x').trim()}', y:'${s.getPropertyValue('--y').trim()}', w:'${s.getPropertyValue('--w').trim()}'`;
    }).join('\n');
    console.log('%c— ARMORY CALIBRATION —\n'+dump, 'color:#ffc56b');
    out.value = dump; out.style.display='block'; out.focus(); out.select();   // ready to Ctrl+C
  });
}
