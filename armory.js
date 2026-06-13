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

/* Language composition per unit (real languages; percentages are seeded-random
   placeholders — swap with real numbers later in LANGS_BY_ID/makeLangs). */
const LANGS_BY_ID = {
  '01':['Python','Jupyter'], '02':['Python','SQL','Docker'], '03':['Python','Jupyter'],
  '04':['TypeScript','JavaScript','CSS'], '05':['Python','Shell','Docker'], '06':['JavaScript','HTML','CSS'],
  '07':['TypeScript','CSS','HTML'], '08':['Python','TypeScript'],
  '09':['Python'], '10':['JavaScript','CSS','HTML'],
};
function makeLangs(id){
  const names = LANGS_BY_ID[id] || ['Python'];
  let seed = parseInt(id,10)*13+7;
  const rnd = ()=>{ seed=(seed*9301+49297)%233280; return seed/233280; };
  const w = names.map(()=>0.35+rnd());
  const sum = w.reduce((a,b)=>a+b,0);
  const pct = w.map(x=>Math.round(x/sum*100));
  pct[0] += 100 - pct.reduce((a,b)=>a+b,0);          // normalize to exactly 100
  return names.map((name,i)=>({name,pct:pct[i]})).sort((a,b)=>b.pct-a.pct);
}

/* Real portfolio data (from projects.json) on the 10 calibrated arc positions.
   Schema: unit (codename) · class (designation) · accent · stats {pwr,spd,def}.
   z rises with how far FORWARD a unit sits so bigger front units overlap the smaller
   ones receding into the hall. All share the placeholder PNG until the unique
   robot-XX.png renders exist. Unit codenames are theatrical single words (LANTERN,
   SENTINEL…) while `name` stays the real project title. Order: 7 live first, the 3
   coming_soon units (ORACLE, CIPHER, AEGIS) are pinned LAST so they read as locked. */
const PROJECTS = [
  { id:'01', unit:'LANTERN', name:'Waste Detection — CNN & Grad-CAM', type:'Deep Learning / Explainable AI', class:'Luminary', accent:'#e0a93a',
    x:'8%', y:'30%', w:'13vw', z:10, status:'live',
    summary:'Notebook to production: 90.3% accuracy, explained.', tech:['TensorFlow/Keras','MobileNetV2','Grad-CAM','FastAPI','PyTest'],
    description:`Waste image classification on TrashNet refactored from a Jupyter notebook into a modular, config-driven, tested Python project. MobileNetV2 transfer learning hits 90.3% validation accuracy (baseline CNN: 54.5%), Grad-CAM highlights what the model actually looks at, and a FastAPI service + CLI make it usable beyond the notebook.`,
    stats:{pwr:84,spd:78,def:86}, links:{live:'',code:'https://github.com/ne-he/Deep_Learning_imageclassif'} },
  { id:'02', unit:'KEYSTONE', name:'Feature Shopz — Feature Store', type:'Data Engineering / MLOps', class:'Guardian', accent:'#2e6fe0',
    x:'18%', y:'31%', w:'11.5vw', z:8, status:'live',
    summary:'Production-grade feature store, end to end.', tech:['Python','PostgreSQL','Redis','FastAPI','Streamlit','Evidently','Docker'],
    description:`E-commerce feature store that ingests transaction data, computes 20+ user-level features in batch, stores them in PostgreSQL (offline) + Redis (online), and serves them through a low-latency FastAPI. A Streamlit dashboard with Evidently watches freshness and drift. All four milestones (ingestion → monitoring) shipped.`,
    stats:{pwr:90,spd:70,def:85}, links:{live:'',code:'https://github.com/ne-he/Feature_shopz'} },
  { id:'03', unit:'SENTINEL', name:'URL Detector — Threat Classifier', type:'Machine Learning / Security', class:'Warden', accent:'#36c2a8',
    x:'27%', y:'32%', w:'9.5vw', z:6, status:'live',
    summary:'Sniffs out malicious URLs before they bite.', tech:['Python','scikit-learn','Pandas','Feature Engineering'],
    description:`A machine-learning classifier that flags malicious and phishing URLs from lexical and host-based signals — URL length, token patterns, suspicious characters, and domain features — turning a raw link into a clear safe / unsafe verdict.`,
    stats:{pwr:82,spd:80,def:88}, links:{live:'',code:'https://github.com/ne-he/URL_Detection'} },
  { id:'04', unit:'MNEMONIC', name:'Web Portfolio — RAG Chatbot', type:'GenAI / RAG', class:'Mirror', accent:'#c9ced6',
    x:'35%', y:'32%', w:'9vw', z:5, status:'live',
    summary:'A portfolio that answers back — RAG over everything Nehemiah.', tech:['Next.js','Gemini API','Supabase pgvector','RAG'],
    description:`Personal site where a RAG chatbot is the core: a Gemini LLM + embeddings over a curated markdown knowledge base (Supabase pgvector), serving cited, hallucination-gated answers about projects, skills, and journey.`,
    stats:{pwr:92,spd:60,def:70}, links:{live:'',code:'https://github.com/ne-he/web_portofolio_RAG'} },
  { id:'05', unit:'AUGUR', name:'Phone Addiction Predictor v2', type:'ML Engineering / Production — Flagship', class:'Prime', accent:'#ff7a1a',
    x:'43%', y:'32%', w:'10vw', z:9, status:'live',
    summary:'The flagship: one preprocessing core, zero skew, deployed.', tech:['CatBoost','FastAPI','Streamlit','SHAP','Docker','GitHub Actions','HuggingFace'],
    description:`Production-ready rewrite of a smartphone-addiction-level regressor (CatBoost, scale 1–10). One shared Preprocessor class is the single source of truth for training, the FastAPI service, and the Streamlit demo — eliminating training/serving skew by design. Ships with SHAP explanations, tests, CI, Docker, and a live HuggingFace Space deployment.`,
    stats:{pwr:88,spd:75,def:92}, links:{live:'',code:'https://github.com/ne-he/Addictv2'} },
  { id:'06', unit:'CADENCE', name:'To-Do List Organizer', type:'Productivity Web App', class:'Forge', accent:'#e8742c',
    x:'52%', y:'31%', w:'8.8vw', z:4, status:'live',
    summary:'One dashboard for the whole day.', tech:['HTML/CSS/JS','Kiro AI'],
    description:`A clean productivity dashboard combining a live clock with greeting, a focus timer, a to-do list, and quick links in one interface. Built as a Software Engineering mini project with an AI-assisted (Kiro) workflow — fast to ship, simple to use.`,
    stats:{pwr:50,spd:95,def:55}, links:{live:'',code:'https://github.com/ne-he/Partai_Wilhelmus'} },
  { id:'07', unit:'HAVOC', name:'Clash of Bangs', type:'Interactive Web / HCI Lab', class:'Striker', accent:'#e0312e',
    x:'60%', y:'31%', w:'9vw', z:3, status:'live',
    summary:'A Human-Computer Interaction lab, built to bang.', tech:['TypeScript','Express 5','PostgreSQL','Drizzle','Zod','OpenAPI'],
    description:`Final project for a Human-Computer Interaction lab, built as a TypeScript monorepo: an Express 5 API with PostgreSQL + Drizzle ORM, Zod validation everywhere, and Orval generating typed API hooks straight from the OpenAPI spec — so frontend and backend can never drift apart.`,
    stats:{pwr:74,spd:82,def:70}, links:{live:'',code:'https://github.com/ne-he/hci_lab'} },
  { id:'08', unit:'ORACLE', name:'RAG Chatbot — Business', type:'GenAI / RAG — In Development', class:'Sage', accent:'#9b7be0',
    x:'68%', y:'34%', w:'8vw', z:2, status:'coming_soon',
    summary:'A business-grade RAG assistant. Under construction.', tech:['RAG','LLM','Vector DB'],
    description:`A business-focused Retrieval-Augmented Generation assistant — grounding answers in a company's own documents and knowledge base. Currently in active development.`,
    stats:{pwr:0,spd:0,def:0}, links:{} },
  { id:'09', unit:'CIPHER', name:'Classified', type:'Coming Soon', class:'Unknown', accent:'#8a8276',
    x:'78%', y:'33%', w:'8.5vw', z:1, status:'coming_soon',
    summary:'Sealed until launch.', tech:[],
    description:`The next unit in the lineup — sealed until it ships.`,
    stats:{pwr:0,spd:0,def:0}, links:{} },
  { id:'10', unit:'AEGIS', name:"Nemi's Garage", type:'Creative Web / You Are Here', class:'Chaos', accent:'#d8419b',
    x:'90%', y:'30%', w:'10vw', z:7, status:'coming_soon',
    summary:'The hall you are standing in right now.', tech:['Canvas','Frame-Scrub','Vanilla JS'],
    description:`This very site: a cinematic two-act portfolio where a dark hall powers on as you scroll and its units step out to present each project. Canvas frame-scrubbing and a character-select arsenal. Under construction — you're watching it being built.`,
    stats:{pwr:0,spd:0,def:0}, links:{} },
/* To show a project-page screenshot in the dossier, add `preview:'path/to/shot.png'`
   to any project above — it renders in the panel preview slot automatically. */
].map(p => ({ ...p, image: ROBOT_IMG, langs: makeLangs(p.id) }));

/* ---- render robots ---- */
const arsenal = document.querySelector('.arsenal');
const unitRail = document.querySelector('.unit-nav-rail');

PROJECTS.forEach(p=>{
  const locked = p.status === 'coming_soon';
  const r = document.createElement('div');
  r.className = 'robot' + (locked ? ' is-locked' : '') + (p.image ? ' has-img' : '');
  r.dataset.id = p.id;
  r.style.cssText = `--x:${p.x};--y:${p.y};--w:${p.w};--z:${p.z}`;
  r.innerHTML = `
    <div class="robot-figure">
      <div class="robot-body" ${p.image?`style="background-image:url('${p.image}');background-size:contain;background-repeat:no-repeat;background-position:center"`:''}></div>
      <div class="robot-eyes"><i></i><i></i></div>
      <div class="robot-core"></div>
      ${locked?'<div class="robot-lock">COMING SOON</div>':''}
    </div>
    <div class="robot-shadow"></div>`;
  r.addEventListener('click', ()=>rosterClick(p.id, locked, r));
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
  if(!locked) u.addEventListener('click', ()=>{
    if(inArsenal){ const _i=PROJECTS.indexOf(p); if(_i>=0) stepRosterTo(_i); }
    else openPanel(p.id);
  });
  unitRail.appendChild(u);
});

function highlight(id,on){
  if(inArsenal) return;
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
  panel.querySelector('.panel-desig').textContent = `${p.unit} · ${(p.class||'').toUpperCase()} CLASS`;
  panel.querySelector('.panel-status').innerHTML = p.status==='coming_soon'
    ? '◇ STATUS — CLASSIFIED' : '● STATUS — DEPLOYED';
  panel.querySelector('.panel-brief').textContent = p.description;
  /* project-page preview slot (set p.preview to a screenshot URL to fill it) */
  const shot = panel.querySelector('.pi-shot');
  const ph   = panel.querySelector('.pi-placeholder');
  if(p.preview){ shot.src=p.preview; shot.style.display='block'; if(ph) ph.style.display='none'; }
  else { shot.removeAttribute('src'); shot.style.display='none'; if(ph) ph.style.display='flex'; }
  /* chips */
  panel.querySelector('.chips').innerHTML = p.tech.map(t=>`<span class="chip">${t}</span>`).join('');
  /* languages (percentages = placeholder until real numbers go into LANGS_BY_ID) */
  panel.querySelector('.stats').innerHTML = (p.langs||[]).map(l=>`
    <div class="stat"><span class="stat-k">${l.name}</span>
    <span class="stat-bar"><i style="--v:0%" data-v="${l.pct}%"></i></span>
    <span class="stat-v">${l.pct}%</span></div>`).join('');
  /* links */
  const L=[]; if(p.links.live) L.push(`<a class="btn-link" href="${p.links.live}" target="_blank" rel="noopener">View Live ↗</a>`);
  if(p.links.code) L.push(`<a class="btn-link ghost" href="${p.links.code}" target="_blank" rel="noopener">Source ↗</a>`);
  panel.querySelector('.panel-links').innerHTML = L.join('') || `<span class="btn-link ghost" style="pointer-events:none">${p.status==='coming_soon'?'Declassified Soon':'Links Coming Soon'}</span>`;
  scrim.classList.add('is-open'); panel.classList.add('is-open');
  requestAnimationFrame(()=>setTimeout(()=>panel.querySelectorAll('.stat-bar i').forEach(b=>b.style.width=b.dataset.v),120));
}
function closePanel(){ scrim.classList.remove('is-open'); panel.classList.remove('is-open'); }
scrim.addEventListener('click', closePanel);
panel.querySelector('.panel-back').addEventListener('click', closePanel);
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closePanel(); });

/* ============================================================
   ROSTER STEP-NAV (V4)
   3-slot: prev (dim) · center (lit) · next (dim)
   Arrow/keyboard/swipe = one step only. Locked unit = shake deny.
   ============================================================ */
let rosterIdx = 0;
let rosterStepping = false;

/* Inject roster chrome into stage */
const rosterPrevBtn = document.createElement('button');
rosterPrevBtn.className = 'roster-arrow is-prev';
rosterPrevBtn.setAttribute('aria-label', 'Previous unit');
rosterPrevBtn.innerHTML = '&#8592;';
const rosterNextBtn = document.createElement('button');
rosterNextBtn.className = 'roster-arrow is-next';
rosterNextBtn.setAttribute('aria-label', 'Next unit');
rosterNextBtn.innerHTML = '&#8594;';
const rosterLabelEl = document.createElement('div');
rosterLabelEl.className = 'roster-label';
rosterLabelEl.innerHTML = '<span class="rl-counter"></span><span class="rl-title"></span><span class="rl-name"></span>';
const rosterTicksEl = document.createElement('div');
rosterTicksEl.className = 'roster-ticks';
PROJECTS.forEach(()=>{ const t=document.createElement('span'); t.className='rtick'; rosterTicksEl.appendChild(t); });
const stageEl = document.querySelector('.stage');
stageEl.appendChild(rosterPrevBtn);
stageEl.appendChild(rosterNextBtn);
stageEl.appendChild(rosterLabelEl);
stageEl.appendChild(rosterTicksEl);

function renderRoster(idx){
  const total = PROJECTS.length;
  /* role by offset so off-screen units park on the CORRECT side (no gray ghost
     sliding through center): exiting-left → far-pre (parks left), etc. */
  arsenalEl.querySelectorAll('.robot').forEach((r,i)=>{
    const off = i - idx;
    r.dataset.rosterRole = off===0?'ctr' : off===-1?'pre' : off===1?'nxt'
                         : off<0?'far-pre':'far-nxt';
  });
  const p = PROJECTS[idx];
  const locked = p.status === 'coming_soon';
  const rlc = rosterLabelEl.querySelector('.rl-counter');
  const rlt = rosterLabelEl.querySelector('.rl-title');
  const rln = rosterLabelEl.querySelector('.rl-name');
  if(rlc) rlc.textContent = `${p.id} / ${String(total).padStart(2,'0')}`;
  if(rlt) rlt.textContent = p.name;                       // real project name (the hero line)
  if(rln) rln.textContent = locked ? '◇ COMING SOON' : `${p.unit}  ·  ${p.class}`;
  rosterLabelEl.classList.toggle('is-locked', locked);
  /* arrows: hide at edges (arrow at 01 → prev hidden; at last → next hidden) */
  rosterPrevBtn.setAttribute('aria-hidden', String(idx===0));
  rosterNextBtn.setAttribute('aria-hidden', String(idx===total-1));
  /* ticks */
  rosterTicksEl.querySelectorAll('.rtick').forEach((t,i)=>t.classList.toggle('is-active',i===idx));
  /* unit-nav sync */
  unitRail.querySelectorAll('.unit').forEach((u,i)=>u.classList.toggle('is-active',i===idx));
}

function stepRoster(dir){
  if(rosterStepping) return;
  const next=rosterIdx+dir;
  if(next<0||next>=PROJECTS.length) return;
  rosterStepping=true; rosterIdx=next; renderRoster(rosterIdx);
  setTimeout(()=>{ rosterStepping=false; },620);
}

function stepRosterTo(idx){
  if(idx<0||idx>=PROJECTS.length||rosterStepping) return;
  rosterStepping=true; rosterIdx=idx; renderRoster(idx);
  setTimeout(()=>{ rosterStepping=false; },620);
}

function rosterClick(id,locked,el){
  if(!inArsenal) return;
  const role=el.dataset.rosterRole;
  if(role==='pre'){ stepRoster(-1); return; }
  if(role==='nxt'){ stepRoster(1);  return; }
  if(role!=='ctr') return;
  if(locked){
    el.classList.add('is-denied');
    setTimeout(()=>el.classList.remove('is-denied'),480);
    return;
  }
  openPanel(id);
}

rosterPrevBtn.addEventListener('click',()=>stepRoster(-1));
rosterNextBtn.addEventListener('click',()=>stepRoster(1));

document.addEventListener('keydown',e=>{
  if(!inArsenal||panel.classList.contains('is-open')) return;
  if(e.key==='ArrowLeft'){ e.preventDefault(); stepRoster(-1); }
  if(e.key==='ArrowRight'){ e.preventDefault(); stepRoster(1); }
});

let swipeX=null;
arsenal.addEventListener('touchstart',e=>{ swipeX=e.touches[0].clientX; },{passive:true});
arsenal.addEventListener('touchend',e=>{
  if(swipeX===null) return;
  const dx=e.changedTouches[0].clientX-swipeX; swipeX=null;
  if(Math.abs(dx)>44) stepRoster(dx<0?1:-1);
});

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

/* ---------- Page-1 → Page-2 state (one-way) ---------- */
let committed = false, inArsenal = false, scrubActive = false, beatTimers = [];
const COMMIT_AT = 0.965;                        // scroll this far → lock into Page 2 (no scroll-back)
const TR_SWAP = 520, TR_END = 1340;             // loading-beat timing: cover swaps content / cover lifts

function revealRobots(){
  rosterIdx = 0;
  renderRoster(0);
  arsenalEl.querySelectorAll('.robot').forEach(r=>{ r.style.transitionDelay='0s'; r.classList.add('on'); });
}
function clearRobots(){
  arsenalEl.querySelectorAll('.robot').forEach(r=>{
    r.style.transitionDelay='0s'; r.classList.remove('on'); r.dataset.rosterRole='';
  });
}

/* ---------- transition flavor text (V3 "DEPLOYING UNITS" beat — cycles, not a static spinner) ---------- */
const trLabel = document.querySelector('.tr-label');
let trTimer = null;
function cycleTransition(phrases){
  if(!trLabel) return;
  let i = 0; trLabel.textContent = phrases[0];
  clearInterval(trTimer);
  trTimer = setInterval(()=>{ i = (i+1)%phrases.length; trLabel.textContent = phrases[i]; }, 430);
}
function stopTransitionText(){ clearInterval(trTimer); trTimer = null; }

/* ---------- shared scrub application (Page 1) ---------- */
function applyScrub(p){
  if(committed) return;                         // Page 2 is locked — ignore any stray scroll
  currentP = p;
  drawFrameAt(p);
  const ph = p>0.62?3 : p>0.22?2 : 1;           // atmosphere phase (beam/scan/vignette CSS)
  stage.dataset.phase = ph;
  dots.forEach((d,i)=>d.classList.toggle('on', i===ph-1));
  if(p>=COMMIT_AT) commitToArsenal();           // reached the end → cross over into Page 2
}

/* ---------- scroll to the end → loading beat → LOCK into the lit Arsenal ---------- */
function commitToArsenal(){
  if(committed) return; committed = true; inArsenal = true; scrubActive = false;
  beatTimers.forEach(clearTimeout); beatTimers = [];
  drawFrameAt(1);                               // hold the lit empty hall behind the cover
  document.body.classList.add('is-transition'); // dark loading cover fades in
  cycleTransition(['DEPLOYING UNITS','CALIBRATING ARSENAL','SPINNING UP CORES','UNITS ONLINE']);
  beatTimers.push(setTimeout(()=>{
    document.body.classList.remove('is-scrubbing');
    document.body.classList.add('is-locked');   // kill scroll + pin the stage to the viewport
    window.scrollTo(0,0);
    stage.dataset.phase = 3;
    stage.classList.add('is-arsenal');          // idle video + title + nav + power-down button
    if(idleV && idleV.play) idleV.play().catch(()=>{});
    revealRobots();
  }, TR_SWAP));
  beatTimers.push(setTimeout(()=>{ document.body.classList.remove('is-transition'); stopTransitionText(); }, TR_END));
}

/* ---------- power-down button → loading beat → back to the dark, un-lit hall ---------- */
function returnHome(){
  if(!committed) return;
  beatTimers.forEach(clearTimeout); beatTimers = [];
  document.body.classList.add('is-transition'); // cover the swap back
  cycleTransition(['POWERING DOWN','SUITS TO STANDBY','HALL DARK']);
  beatTimers.push(setTimeout(()=>{
    stage.classList.remove('is-arsenal','is-flash');
    clearRobots();
    if(idleV){ try{ idleV.pause(); idleV.currentTime = 0; }catch(_){} }
    document.body.classList.remove('is-locked');
    document.body.classList.add('is-scrubbing'); // restore the tall scrub track
    committed = false; inArsenal = false;
    currentP = 0; lastIdx = -1;
    stage.dataset.phase = 1;
    dots.forEach((d,i)=>d.classList.toggle('on', i===0));
    window.scrollTo(0,0);
    scrubActive = true;
    drawFrameAt(0);                             // back to the dark first frame
  }, TR_SWAP));
  beatTimers.push(setTimeout(()=>{ document.body.classList.remove('is-transition'); stopTransitionText(); }, TR_END));
}

/* ---------- scroll engine: manual sticky driver (full control for the one-way flow) ---------- */
function onScrollDrive(){
  if(!scrubActive || committed) return;
  const total = track.offsetHeight - window.innerHeight;
  const p = total>0 ? Math.min(1,Math.max(0,-track.getBoundingClientRect().top/total)) : 0;
  applyScrub(p);
}
window.addEventListener('scroll', onScrollDrive, {passive:true});
window.addEventListener('resize', onScrollDrive);

function initScroll(){
  document.body.classList.add('is-scrubbing');  // CSS gives the track its 340vh of scroll room
  scrubActive = true;
  window.scrollTo(0,0);
  applyScrub(0);
}

/* ---------- boot ---------- */
if(reduceMotion || calibrating){
  if(calibrating) document.body.classList.add('is-calibrate');
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
    drawFrameAt(1); stage.dataset.phase=3; stage.classList.add('is-arsenal');
    arsenalEl.querySelectorAll('.robot').forEach(r=>r.classList.add('on'));
  } else if(reduceMotion){
    drawFrameAt(1); stage.dataset.phase=3;
    document.body.classList.add('is-locked');     // static lit arsenal, no scroll
    stage.classList.add('is-arsenal'); committed=true; inArsenal=true;
    if(idleV && idleV.play) idleV.play().catch(()=>{});
    revealRobots();
  } else {
    initScroll();                                 // start the manual Page-1 scrub
  }
}
/* power-down button (Page 2 → dark hall); hidden where there's no scrub to return to */
const homeBtn = document.querySelector('.home-btn');
if(homeBtn){
  if(reduceMotion || calibrating) homeBtn.style.display='none';
  else homeBtn.addEventListener('click', returnHome);
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

  /* window-level drag — robust: no setPointerCapture quirks, keeps tracking even if the
     cursor briefly leaves the robot box mid-drag. pointerdown arms it, window move/up drive it. */
  let active=null, sx=0, sy=0, ox=0, oy=0;
  arsenal.querySelectorAll('.robot').forEach(r=>{
    r.style.cursor='grab';
    r.addEventListener('pointerdown', e=>{
      active=r; r.style.cursor='grabbing'; r.style.zIndex='999';
      sx=e.clientX; sy=e.clientY;
      ox=parseFloat(getComputedStyle(r).getPropertyValue('--x'))||0;
      oy=parseFloat(getComputedStyle(r).getPropertyValue('--y'))||0;
      e.preventDefault(); e.stopPropagation();
    });
    r.addEventListener('wheel', e=>{
      e.preventDefault();
      const cur=parseFloat(getComputedStyle(r).getPropertyValue('--w'))||11.5;
      r.style.setProperty('--w', Math.max(4,(cur - Math.sign(e.deltaY)*0.4)).toFixed(1)+'vw');
    }, {passive:false});
  });
  window.addEventListener('pointermove', e=>{
    if(!active) return;
    const nx = ox + (e.clientX-sx)/window.innerWidth*100;
    const ny = oy - (e.clientY-sy)/window.innerHeight*100;     // bottom-anchored
    active.style.setProperty('--x', nx.toFixed(1)+'%');
    active.style.setProperty('--y', ny.toFixed(1)+'%');
  });
  window.addEventListener('pointerup', ()=>{ if(active){ active.style.cursor='grab'; active=null; } });
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
