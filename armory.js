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

/* Real language composition per unit — pulled from each GitHub repo's /languages
   API (bytes → %), top languages rounded to sum 100. web_portofolio_RAG (04) is
   private (404) so its split is an estimate; coming-soon units are placeholders. */
const LANGS_BY_ID = {
  '01':[['Python',90],['Jupyter',10]],
  '02':[['Python',69],['HTML',30],['Dockerfile',1]],
  '03':[['TypeScript',87],['Jupyter',10],['CSS',2],['Python',1]],
  '04':[['TypeScript',78],['CSS',14],['JavaScript',8]],
  '05':[['Python',93],['HTML',6],['Dockerfile',1]],
  '06':[['Jupyter',96],['JavaScript',3],['Python',1]],
  '07':[['TypeScript',69],['JavaScript',27],['PLpgSQL',3],['CSS',1]],
  '08':[['TypeScript',70],['HTML',15],['CSS',11],['JavaScript',4]],
  '09':[['Classified',100]],
  '10':[['Classified',100]],
};
function makeLangs(id){ return (LANGS_BY_ID[id]||[]).map(([name,pct])=>({name,pct})); }

/* Robot designation = "MARK <roman>" by slot order (the only name shown). */
const ROMAN = ['','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
function markName(idx){ return 'MARK ' + (ROMAN[idx+1] || String(idx+1)); }

/* Real portfolio data (from projects.json) on the 10 calibrated arc positions.
   Schema: unit (codename) · class (designation) · accent · stats {pwr,spd,def}.
   z rises with how far FORWARD a unit sits so bigger front units overlap the smaller
   ones receding into the hall. All share the placeholder PNG until the unique
   robot-XX.png renders exist. Unit codenames are theatrical single words (LANTERN,
   SENTINEL…) while `name` stays the real project title. Order: 8 live first, the 2
   coming_soon units (CIPHER, AEGIS) are pinned LAST so they read as locked. */
const PROJECTS = [
  { id:'01', unit:'LANTERN', name:'Waste Image Classifier with Grad-CAM', type:'Deep Learning / Computer Vision', class:'Luminary', accent:'#e0a93a',
    x:'8%', y:'30%', w:'13vw', z:10, status:'live',
    summary:'Sorts waste images, explained with Grad-CAM.', tech:['TensorFlow/Keras','MobileNetV2','Grad-CAM','FastAPI','PyTest'],
    description:`A deep-learning model that sorts waste images, with Grad-CAM heat-maps that make every prediction explainable instead of a black box. It refactors a Jupyter notebook into a modular, tested Python project served behind a FastAPI endpoint.`,
    stats:{pwr:84,spd:78,def:86}, links:{live:'https://deep-learning-imageclassif.vercel.app/',code:'https://github.com/ne-he/Deep_Learning_imageclassif'} },
  { id:'02', unit:'KEYSTONE', name:'Feature Shops', type:'Data Engineering / MLOps', class:'Guardian', accent:'#2e6fe0',
    x:'18%', y:'31%', w:'11.5vw', z:8, status:'live',
    summary:'Production-grade feature serving for e-commerce.', tech:['Python','PostgreSQL','Redis','FastAPI','Streamlit','Evidently','Docker'],
    description:`A production-grade ML feature serving system for e-commerce, computing 23 user-level features from raw transaction data. A dual-store architecture (PostgreSQL for offline training, Redis for low-latency online serving) is exposed through a FastAPI REST API with automatic fallback and daily batch orchestration, drift detection with Evidently, and a Streamlit monitoring dashboard. Shipped with 174 tests and 95% coverage, deployed live on Hugging Face Spaces.`,
    stats:{pwr:90,spd:70,def:85}, links:{live:'https://huggingface.co/spaces/ne-he/feature-store-mvp',code:'https://github.com/ne-he/Feature_shopz'} },
  { id:'03', unit:'SENTINEL', name:'Phishing URL Detector', type:'Deep Learning / Security', class:'Warden', accent:'#36c2a8',
    x:'27%', y:'32%', w:'9.5vw', z:6, status:'live',
    summary:'Flags phishing links with a confidence score.', tech:['Python','Deep Learning','FastAPI','Pandas'],
    description:`A deep-learning backend that inspects a link and flags whether it is phishing or not, returning a confidence percentage alongside the model accuracy.`,
    stats:{pwr:82,spd:80,def:88}, links:{live:'https://hci-update.vercel.app/',code:'https://github.com/ne-he/URL_Detection'} },
  { id:'04', unit:'MNEMONIC', name:'Personal Resume Chatbot', type:'GenAI / RAG', class:'Mirror', accent:'#c9ced6',
    x:'35%', y:'32%', w:'9vw', z:5, status:'live',
    summary:'A conversational about-me, powered by RAG.', tech:['Next.js','Gemini API','Supabase pgvector','RAG'],
    description:`An AI assistant that answers questions about me, a conversational about-me rather than a commercial bot. It runs on a retrieval-augmented (RAG) pipeline (a large language model plus embeddings and a vector database) with a live, queryable demo.`,
    stats:{pwr:92,spd:60,def:70}, links:{live:'https://web-portofolio-rag.vercel.app/',code:'https://github.com/ne-he/web_portofolio_RAG'} },
  { id:'05', unit:'ORACLE', name:'Finance Analyst', type:'GenAI / Financial RAG', class:'Sage', accent:'#9b7be0',
    x:'43%', y:'32%', w:'10vw', z:9, status:'live',
    summary:'RAG over SEC 10-K filings, cited and gated against fabrication.', tech:['Python','Gemini','FastAPI','BM25','NumPy','Supabase pgvector'],
    description:`A production-grade RAG system that answers questions about public companies strictly from their SEC 10-K filings, with section-level citations (e.g. Item 1A Risk Factors) and a strict anti-fabrication gate that replies "not found in the filings" instead of inventing a number. It uses section-aware 10-K chunking, hybrid retrieval (dense Gemini embeddings plus BM25) fused with Reciprocal Rank Fusion, and company/year metadata filtering. On a 947-chunk corpus (NVDA, AAPL, MSFT) it measured 100% retrieval hit-rate at 6 and 100% out-of-scope gate accuracy with a golden-set eval harness.`,
    stats:{pwr:0,spd:0,def:0}, links:{live:'',code:'https://github.com/ne-he/RAG_businessAnalysis_assist'} },
  { id:'06', unit:'AUGUR', name:'Addiction Prediction', type:'ML Engineering / Production', class:'Prime', accent:'#ff7a1a',
    x:'52%', y:'31%', w:'8.8vw', z:4, status:'live',
    summary:'End-to-end pipeline for phone-addiction level.', tech:['CatBoost','FastAPI','Streamlit','SHAP','Docker','GitHub Actions','HuggingFace'],
    description:`An end-to-end training pipeline (preprocessing, augmentation, evaluation) that predicts a person's level of phone addiction, served with a shared preprocessing core so the model behaves the same in training and in production.`,
    stats:{pwr:88,spd:75,def:92}, links:{live:'https://addictv2.vercel.app/',code:'https://github.com/ne-he/Addictv2'} },
  { id:'07', unit:'CADENCE', name:"Family's Web", type:'Full-stack Web App', class:'Forge', accent:'#e8742c',
    x:'60%', y:'31%', w:'9vw', z:3, status:'live',
    summary:'A family web app, all in one dashboard.', tech:['TypeScript','JavaScript','PostgreSQL'],
    description:`A family web app that brings tasks, reminders, and shared information together in one clean dashboard.`,
    stats:{pwr:50,spd:95,def:55}, links:{live:'https://partai-wilhelmus.vercel.app/',code:'https://github.com/ne-he/Partai_Wilhelmus'} },
  { id:'08', unit:'HAVOC', name:'Clash of Bangs', type:'Interactive Web / HCI Lab', class:'Striker', accent:'#e0312e',
    x:'68%', y:'34%', w:'8vw', z:2, status:'live',
    summary:'An HCI lab final, built to bang.', tech:['TypeScript','Express 5','PostgreSQL','Drizzle','Zod','OpenAPI'],
    description:`Final project for a Human-Computer Interaction lab, built as a TypeScript monorepo with an Express 5 API, PostgreSQL + Drizzle ORM, Zod validation, and Orval generating typed API hooks from the OpenAPI spec so the frontend and backend can never drift apart.`,
    stats:{pwr:74,spd:82,def:70}, links:{live:'https://web-hci-final-clash-of-bang.vercel.app/',code:'https://github.com/ne-he/hci_lab'} },
  { id:'09', unit:'CIPHER', name:'Agentic AI', type:'Autonomous Agents', class:'Unknown', accent:'#8a8276',
    x:'78%', y:'33%', w:'8.5vw', z:1, status:'coming_soon',
    summary:'An autonomous agentic system. Coming soon.', tech:[],
    description:`An autonomous agentic system. Coming soon.`,
    stats:{pwr:0,spd:0,def:0}, links:{} },
  { id:'10', unit:'AEGIS', name:'Classified', type:'Coming Soon', class:'Unknown', accent:'#8a8276',
    x:'90%', y:'30%', w:'10vw', z:7, status:'coming_soon',
    summary:'Sealed until launch.', tech:[],
    description:`Sealed until launch.`,
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
  const idx = PROJECTS.indexOf(p);
  panel.style.setProperty('--glow', '#f4a93a');                        // amber — keep the panel cohesive (no per-unit blue)
  panel.querySelector('.panel-type').textContent = p.type;
  panel.querySelector('.panel-name').textContent = p.name;
  panel.querySelector('.panel-desig').innerHTML = markName(idx);       // single name: MARK <roman>
  panel.querySelector('.panel-status').textContent = p.status==='coming_soon'
    ? 'COMING SOON' : 'STATUS DEPLOYED';
  panel.querySelector('.panel-brief').textContent = p.description;
  /* video-demo (set p.demo to a YouTube URL → hover plays it inline, muted) */
  const demo = panel.querySelector('.panel-demo');
  if(demo){
    const ytId = p.demo ? parseYouTube(p.demo) : null;
    demo.classList.toggle('has-video', !!ytId);
    demo.classList.toggle('is-disabled', !p.demo);
    demo.dataset.yt = ytId || '';
    demo.dataset.demo = p.demo || '';
    demo.querySelector('.pd-frame').innerHTML = '';                 // stop any previous clip
    demo.querySelector('.pd-label').textContent = p.demo ? 'Watch Demo' : 'Demo (Coming Soon)';
    demo.querySelector('.pd-poster').style.backgroundImage =
      ytId ? `url('https://img.youtube.com/vi/${ytId}/hqdefault.jpg')` : '';
  }
  /* chips */
  panel.querySelector('.chips').innerHTML = p.tech.map(t=>`<span class="chip">${t}</span>`).join('');
  /* languages — real %s from the repo's GitHub /languages */
  panel.querySelector('.stats').innerHTML = (p.langs||[]).map(l=>`
    <div class="stat"><span class="stat-k">${l.name}</span>
    <span class="stat-bar"><i style="--v:0%" data-v="${l.pct}%"></i></span>
    <span class="stat-v">${l.pct}%</span></div>`).join('');
  /* links — always show both; disabled until a URL exists */
  const live = p.links && p.links.live, code = p.links && p.links.code;
  const L = [
    live ? `<a class="btn-link" href="${live}" target="_blank" rel="noopener">Visit Web ↗</a>`
         : `<span class="btn-link is-disabled">Visit Web (Soon)</span>`,
    code ? `<a class="btn-link ghost" href="${code}" target="_blank" rel="noopener">Source ↗</a>`
         : `<span class="btn-link ghost is-disabled">Source (Soon)</span>`,
  ];
  panel.querySelector('.panel-links').innerHTML = L.join('');
  document.body.classList.add('is-dossier');                 // robot slides left + stays lit, panel = right half
  updateCenterHint();                                        // hide the blinking hint while reading
  scrim.classList.add('is-open'); panel.classList.add('is-open');
  requestAnimationFrame(()=>setTimeout(()=>panel.querySelectorAll('.stat-bar i').forEach(b=>b.style.width=b.dataset.v),120));
}
function closePanel(){
  scrim.classList.remove('is-open'); panel.classList.remove('is-open');
  document.body.classList.remove('is-dossier');
  updateCenterHint();
}
scrim.addEventListener('click', closePanel);
panel.querySelector('.panel-back').addEventListener('click', closePanel);
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closePanel(); });

/* ---- video-demo: hover-to-play (YouTube embed loaded only on hover = zero
   page-load weight); click opens the full video in a new tab ---- */
function parseYouTube(u){
  const m = String(u).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  return m ? m[1] : null;
}
const demoBox = panel.querySelector('.panel-demo');
if(demoBox){
  const frame = demoBox.querySelector('.pd-frame');
  demoBox.addEventListener('mouseenter', ()=>{
    const id = demoBox.dataset.yt; if(!id || frame.querySelector('iframe')) return;
    frame.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&modestbranding=1&rel=0&playsinline=1" allow="autoplay; encrypted-media" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
  });
  demoBox.addEventListener('mouseleave', ()=>{ frame.innerHTML = ''; });   // stop playback
  demoBox.addEventListener('click', ()=>{ const u = demoBox.dataset.demo; if(u) window.open(u,'_blank','noopener'); });
}

/* title "power on" — hovering the marquee dims the whole hall and glory-glitches
   the title so only it stays lit */
const hallTitleEl = document.querySelector('.hall-title');
if(hallTitleEl){
  hallTitleEl.addEventListener('mouseenter', ()=>document.body.classList.add('title-glow'));
  hallTitleEl.addEventListener('mouseleave', ()=>document.body.classList.remove('title-glow'));
}

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
const centerHintEl = document.createElement('div');
centerHintEl.className = 'center-hint';
centerHintEl.textContent = 'Click for details';
const stageEl = document.querySelector('.stage');
stageEl.appendChild(rosterPrevBtn);
stageEl.appendChild(rosterNextBtn);
stageEl.appendChild(rosterLabelEl);
stageEl.appendChild(rosterTicksEl);
stageEl.appendChild(centerHintEl);

/* "Click for details" blinks above the head — only once the unit has settled in
   the centre (hidden while sliding) and only for live (clickable) units. */
let hintTimer = null;
function updateCenterHint(){
  clearTimeout(hintTimer);
  centerHintEl.classList.remove('show');
  const p = PROJECTS[rosterIdx];
  if(!inArsenal || !p || p.status==='coming_soon' || document.body.classList.contains('is-dossier')) return;
  hintTimer = setTimeout(()=>{
    if(!rosterStepping && !document.body.classList.contains('is-dossier')) centerHintEl.classList.add('show');
  }, 660);
}

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
  if(rln) rln.innerHTML = locked ? 'COMING SOON' : markName(idx);   // single name: MARK <roman>
  rosterLabelEl.classList.toggle('is-locked', locked);
  updateCenterHint();
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
  cycleTransition(['LOADING']);
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
    centerHintEl.classList.remove('show');       // don't let the hint blink on Page 1
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
const steps = ['LOADING'];

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
