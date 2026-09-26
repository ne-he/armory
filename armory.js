/* ============================================================
   ARMORY HALL: engine stub (data + render + interactions)
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

/* Real language composition per unit: pulled from each GitHub repo's /languages
   API (bytes → %), top languages rounded to sum 100 (re-pulled 26 Sep 2026 for 01, 03,
   04, 13 and 14). Coming-soon units are placeholders. */
const LANGS_BY_ID = {
  '01':[['HTML',53],['Python',32],['JavaScript',11],['Jupyter',3],['Dockerfile',1]],
  '02':[['Python',69],['HTML',30],['Dockerfile',1]],
  '03':[['TypeScript',68],['Python',23],['Jupyter',7],['CSS',2]],
  '04':[['TypeScript',79],['HTML',14],['CSS',6],['PLpgSQL',1]],
  '05':[['TypeScript',96],['CSS',2],['PLpgSQL',2]],
  '06':[['Swift',100]],
  '07':[['Jupyter',96],['JavaScript',3],['Python',1]],
  '08':[['TypeScript',69],['JavaScript',27],['PLpgSQL',3],['CSS',1]],
  '09':[['TypeScript',70],['HTML',15],['CSS',11],['JavaScript',4]],
  '10':[['Python',86],['TypeScript',12],['Dockerfile',2]],
  '11':[['Python',66],['TypeScript',14],['HTML',10],['JavaScript',10]],
  '12':[['TypeScript',98],['CSS',1],['HTML',1]],
  '13':[['TypeScript',74],['Python',15],['CSS',8],['HTML',3]],
  '14':[['TypeScript',60],['Python',32],['Jupyter',5],['CSS',2],['JavaScript',1]],
};
function makeLangs(id){ return (LANGS_BY_ID[id]||[]).map(([name,pct])=>({name,pct})); }

/* Robot designation = "MARK <roman>" by slot order (the only name shown). */
const ROMAN = ['','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV'];
function markName(idx){ return 'MARK ' + (ROMAN[idx+1] || String(idx+1)); }

/* Real portfolio data on the calibrated arc positions.
   Schema: unit (codename) · class (designation) · accent · stats {pwr,spd,def}.
   z rises with how far FORWARD a unit sits so bigger front units overlap the smaller
   ones receding into the hall. All share the placeholder PNG until the unique
   robot-XX.png renders exist. Unit codenames are theatrical single words (LANTERN,
   SENTINEL…) while `name` stays the real project title. 14 units, all live. 13 and 14
   (LEDGER, CHORUS) are smaller builds, so they sit at the end of the roster on purpose.
   A coming_soon unit still renders locked. A unit with no live URL can set
   `links.note` to say why instead of a vague "Soon". */
const PROJECTS = [
  { id:'01', unit:'LANTERN', name:'Waste Image Classifier with Grad-CAM', type:'Deep Learning / Computer Vision', class:'Luminary', accent:'#e0a93a',
    x:'8%', y:'30%', w:'13vw', z:10, status:'live',
    summary:'Three CNNs benchmarked on waste photos, the winner explained with Grad-CAM.', tech:['PyTorch','ResNet50','EfficientNet-B0','MobileNetV2','Grad-CAM','FastAPI','Hugging Face Spaces'],
    description:`Three ImageNet-pretrained CNNs (ResNet50, EfficientNet-B0 and MobileNetV2) benchmarked on TrashNet, six waste classes and 2,527 images, under one identical 70/15/15 split with an imbalance-aware pipeline (weighted sampling, label smoothing) and a soft-voting ensemble on top. On the untouched test set ResNet50 won at 91.6% accuracy with a macro AUC of 0.99, ahead of the ensemble (91.0%), MobileNetV2 (84.2%) and EfficientNet-B0 (80.5%). ResNet50 serves the live NemVision demo, where Grad-CAM heat-maps show what the model looked at instead of a black-box label.`,
    stats:{pwr:84,spd:78,def:86}, links:{live:'https://deep-learning-imageclassif.vercel.app/',code:'https://github.com/ne-he/Deep_Learning_imageclassif'} },
  { id:'02', unit:'KEYSTONE', name:'Feature Store MVP', type:'Data Engineering / MLOps', class:'Guardian', accent:'#2e6fe0',
    x:'18%', y:'31%', w:'11.5vw', z:8, status:'live',
    summary:'Production-grade feature serving for e-commerce.', tech:['Python','PostgreSQL','Redis','FastAPI','Streamlit','Evidently','Docker'],
    description:`A production-grade ML feature serving system for e-commerce, computing 23 user-level features from raw transaction data. A dual-store architecture (PostgreSQL for offline training, Redis for low-latency online serving) is exposed through a FastAPI REST API with automatic fallback and daily batch orchestration, drift detection with Evidently, and a Streamlit monitoring dashboard. Shipped with 174 tests and 95% coverage, deployed live on Hugging Face Spaces.`,
    stats:{pwr:90,spd:70,def:85}, links:{live:'https://ne-he-feature-store-mvp.hf.space/',code:'https://github.com/ne-he/Feature_shopz'} },
  { id:'03', unit:'SENTINEL', name:'PhishGuard v2', type:'Deep Learning / Security', class:'Warden', accent:'#36c2a8',
    x:'27%', y:'32%', w:'9.5vw', z:6, status:'live',
    summary:'Flags phishing links, and tells you which layer made the call.', tech:['Python','sentence-transformers','Keras','FastAPI','React','PyTest'],
    description:`Paste a link and get a verdict in about a second, judged from the address alone. A live phishing blocklist runs first, then a curated allowlist, and only then the model: the URL embedded with all-MiniLM-L6-v2, joined with 20 hand-built lexical features and scored by a small dense network. On a 1,000-URL holdout that never entered training it reaches 95.7% accuracy and 95.8% recall, and the known failure modes are published next to the numbers. v2 is a solo rebuild of a group coursework v1 that had real defects, so it ships strict URL validation, a health endpoint that admits when the model failed to load, 37 tests, and a regression test that locks the label orientation so a retrain cannot silently swap what "phishing" means.`,
    stats:{pwr:82,spd:80,def:88}, links:{live:'https://url-detection-one.vercel.app/',code:'https://github.com/ne-he/URL_Detection'} },
  { id:'04', unit:'MNEMONIC', name:'Ask Nemi', type:'GenAI / RAG', class:'Mirror', accent:'#c9ced6',
    x:'35%', y:'32%', w:'9vw', z:5, status:'live',
    summary:'A resume you talk to instead of read.', tech:['Next.js','TypeScript','Gemini API','Supabase pgvector','Vercel'],
    description:`A chatbot that answers questions about me, in Indonesian or English, from a knowledge base I curate myself. Gemini embeddings (768-dim) live in Supabase pgvector, retrieval is hybrid, and a confidence gate drops weak matches so the bot falls back honestly instead of inventing facts. Answers stream token by token, a per-visitor daily cap keeps the free tier alive, and the same backend runs the chat inside ICEBERG.`,
    stats:{pwr:92,spd:60,def:70}, links:{live:'https://web-portofolio-rag.vercel.app/',code:'https://github.com/ne-he/web_portofolio_RAG'} },
  { id:'05', unit:'ORACLE', name:'FinSight v2', type:'GenAI / Financial RAG', class:'Sage', accent:'#9b7be0',
    x:'43%', y:'32%', w:'10vw', z:9, status:'live',
    summary:'Answers from SEC 10-K filings only, and shows you the passage behind every claim.', tech:['Next.js','TypeScript','Gemini','Supabase pgvector','Postgres full-text','Vitest','GitHub Actions'],
    description:`Ask what a public company said about its risks, segments or revenue drivers and get an answer built only from its SEC 10-K, cited down to the section, or an honest refusal when the filing does not support one. v2 is a full rewrite of the original Python system as one Next.js app on Vercel, with Supabase for sign-in, history and vector search. Retrieval is hybrid (vectors plus Postgres full-text, fused with Reciprocal Rank Fusion) with company and fiscal-year filters inside the ranking, and a question that names several companies gets one search per company so a comparison never comes back with only one side. The refusal gate sits at 0.66, the midpoint of the measured gap between answerable and out-of-scope questions. On 936 chunks (NVDA, AAPL, MSFT) and a 22-question golden set: hit-rate@6 18/18, out-of-scope refusals 4/4, zero false refusals. The screen is an evidence desk: every citation is a button that opens the source passage beside the answer.`,
    stats:{pwr:0,spd:0,def:0}, links:{live:'https://finsight-v2-nine.vercel.app/',code:'https://github.com/ne-he/finsight-v2'} },
  { id:'06', unit:'SCRIBE', name:'SimpleNotes', type:'Mobile / iOS', class:'Phantom', accent:'#8b4fd8',
    x:'50%', y:'32%', w:'9vw', z:6, status:'live',
    summary:'iOS notes with a test-driven, protocol-oriented core.', tech:['Swift','SwiftUI','XCTest','GitHub Actions','MVVM'],
    description:`An iOS notes app built with SwiftUI. Add, edit, search, filter, sort, pin, share, and undo-delete notes. What makes it special is the build, not the features. The core logic is fully decoupled from the UI into a pure-Swift SimpleNotesCore layer, so it is genuinely unit-tested (about 25 tests), persistence sits behind a protocol (easy to swap for iCloud or a database later), and CI runs the tests on every push. A test-driven, protocol-oriented MVVM architecture rather than a tutorial project.`,
    stats:{pwr:0,spd:0,def:0}, links:{live:'',note:'iOS app, no web demo',code:'https://github.com/ne-he/swift_UI_notes'} },
  { id:'07', unit:'AUGUR', name:'Phone Addiction Predictor v2', type:'ML Engineering / Production', class:'Prime', accent:'#ff7a1a',
    x:'58%', y:'31%', w:'8.8vw', z:5, status:'live',
    summary:'Scores phone addiction from 1 to 10 after 19 short questions.', tech:['CatBoost','FastAPI','Streamlit','SHAP','Docker','GitHub Actions','HuggingFace'],
    description:`A CatBoost regressor that scores smartphone addiction from 1 to 10 after 19 short questions, then names the factors pushing the score up. One shared Preprocessor class is the single source of truth for training, the FastAPI service and the demo, so training and serving cannot drift apart. Ships with SHAP explanations, tests, CI and Docker, and the model card flags its 0.95 R² as an artifact of synthetic data rather than clinical validity.`,
    stats:{pwr:88,spd:75,def:92}, links:{live:'https://addictv2.vercel.app/',code:'https://github.com/ne-he/Addictv2'} },
  { id:'08', unit:'CADENCE', name:'Family Task Board', type:'Full-stack Web App', class:'Forge', accent:'#e8742c',
    x:'66%', y:'31%', w:'9vw', z:4, status:'live',
    summary:'A shared task board built for my own household.', tech:['Next.js','TypeScript','Supabase','Supabase Realtime','PostgreSQL'],
    description:`A shared to-do app for one family, built for my own household rather than for a grade. Every member gets a private board, plus a common board where tasks are dragged onto whoever takes them, with threaded comments and live updates through Supabase Realtime. It is deployed and in daily use, so the real boards sit behind a login, and visitors get a read-only spectate mode with sample data that never touches the database.`,
    stats:{pwr:50,spd:95,def:55}, links:{live:'https://partai-wilhelmus.vercel.app/spectate',code:'https://github.com/ne-he/Partai_Wilhelmus'} },
  { id:'09', unit:'HAVOC', name:'Clash of BaNG', type:'Interactive Web / HCI Lab', class:'Striker', accent:'#e0312e',
    x:'74%', y:'34%', w:'8vw', z:3, status:'live',
    summary:'An HCI lab final, built to bang.', tech:['TypeScript','Express 5','PostgreSQL','Drizzle','Zod','OpenAPI'],
    description:`Final project for a Human-Computer Interaction lab, built as a TypeScript monorepo with an Express 5 API, PostgreSQL + Drizzle ORM, Zod validation, and Orval generating typed API hooks from the OpenAPI spec so the frontend and backend can never drift apart.`,
    stats:{pwr:74,spd:82,def:70}, links:{live:'https://web-hci-final-clash-of-bang.vercel.app/',code:'https://github.com/ne-he/hci_lab'} },
  { id:'10', unit:'VANGUARD', name:'PULSE / Live Air-Quality ML', type:'MLOps / Streaming ML', class:'Herald', accent:'#37b6c9',
    x:'82%', y:'33%', w:'8.5vw', z:2, status:'live',
    summary:'Streaming ML that learns per-event and retrains itself after drift.', tech:['Python','river','Redis Streams','FastAPI','WebSockets','Evidently','Gemini','Docker'],
    description:`A real-time air-quality system for Jakarta built around what happens AFTER a model deploys. It streams sensor and weather data through Redis Streams into an online model that updates on every single event (river's learn_one), forecasts PM2.5 with an uncertainty band, and flags anomaly spikes. When the data drifts it retrains itself, versions the new model, and auto-writes a fresh model card, while a Gemini agent turns each spike into a plain-language incident card. The full stack is four Dockerized services, and a one-command local demo runs the whole loop in a single process with no Redis server, no Docker and no API keys. There is no public deploy, on purpose: it is built to be run, not hosted.`,
    stats:{pwr:84,spd:78,def:75}, links:{live:'',note:'Local demo, by design',code:'https://github.com/ne-he/pulse'} },
  { id:'11', unit:'AEGIS', name:'VERDICT ANALYST', type:'Agentic AI / Causal Analytics', class:'Arbiter', accent:'#6c5ce7',
    x:'90%', y:'31%', w:'9vw', z:1, status:'live',
    summary:'An analyst agent that verifies its own answers from the outside.', tech:['Python','FastAPI','Gemini','Docker sandbox','DuckDB','Next.js','Hugging Face Spaces'],
    description:`A data-analyst agent built on the assumption that an agent's answer is not correct until something outside it checks. It writes and runs its own code inside a locked Docker sandbox (no network, non-root, resource-capped), then recomputes every descriptive number a second independent way (pandas in the sandbox versus DuckDB SQL) so the confidence score is measured rather than claimed. Causal questions are never answered by the language model at all: an intent classifier routes them to a deterministic statistics engine (Welch/z-test, confidence intervals, CUPED, power/MDE, SRM) that has to pass recover-the-ground-truth tests on synthetic data, and any number in the written narrative that does not appear in the engine output gets the narrative replaced by a deterministic template.`,
    stats:{pwr:94,spd:66,def:90}, links:{live:'https://agentic-verdict-sand.vercel.app/',code:'https://github.com/ne-he/agentic_verdict'} },
  { id:'12', unit:'VESPER', name:'KENNETH', type:'Product / Mobile Web App', class:'Pathfinder', accent:'#10b981',
    x:'96%', y:'30%', w:'9vw', z:1, status:'live',
    summary:'Check how full a Jakarta car park is before you leave home.', tech:['React 19','TypeScript','Vite','Tailwind CSS','MapLibre','three.js','Firebase','PWA'],
    description:`A mobile web app that shows how full Jakarta car parks are before you leave home, how long the gate queue is, and which nearby place still has space. Google Maps stops at the building entrance, KENNETH starts there. It covers 20 malls and BINUS campuses, books a 15-minute priority entry window, the building's own valet and EV chargers, and routes you to the least busy gate in-app, Google Maps or Waze. Built for the BINUS Venture Creation course: the team set the product decisions and the business case, I built the app. Occupancy, queues and prices come from a deterministic simulation engine, and every location says so. Personal data stays on the phone. A separate partner dashboard shows building managers the visitors they lost and where those visitors went.`,
    stats:{pwr:0,spd:0,def:0}, links:{live:'https://kenneth-park.web.app/',code:'https://github.com/ne-he/kenneth'} },
  { id:'13', unit:'LEDGER', name:'E-Commerce Sales Analysis', type:'Data Analysis / BI', class:'Scout', accent:'#3fb27f',
    x:'98%', y:'30%', w:'9vw', z:1, status:'live',
    summary:'20,848 orders read for three decisions an owner actually has to make.', tech:['Python','pandas','TypeScript','React','Recharts','Vite'],
    description:`20,848 marketplace orders read for three decisions an owner actually has to make: which products deserve budget, which regions are failing, and where margin leaks. The highest-volume product turns out not to be the revenue driver, cancellation tracks geography rather than the COD payment method it usually gets blamed on, and shipping subsidy compounds the loss in the same provinces that cancel most. The harder half was the data: eleven order-status variants normalised so valid orders were not discarded, two missing months marked as gaps instead of zeroes, and multi-category orders split proportionally so revenue is never double counted.`,
    stats:{pwr:0,spd:0,def:0}, links:{live:'https://dashboard-nehemiah.vercel.app/',code:'https://github.com/ne-he/nemi-dashboard'} },
  { id:'14', unit:'CHORUS', name:'Suara Rakyat', type:'NLP / Sentiment Analysis', class:'Envoy', accent:'#ce1126',
    x:'99%', y:'30%', w:'9vw', z:1, status:'live',
    summary:'Reads the tone of citizen reviews of Indonesian public-service apps.', tech:['Python','scikit-learn','pandas','IndoBERTweet','Next.js','TypeScript'],
    description:`A Software Engineering course team project that reads the tone of 617,722 citizen reviews of six Indonesian public-service apps, from the IGAR dataset. Three classical models score every review you type, with a Linear SVM as the default at a test macro-F1 of 0.668, and a fine-tuned IndoBERTweet is reported beside them as the comparison at 0.692. The dataset hides a trap: 38% of its rows are exact duplicates, so the split is made per unique text to keep test reviews out of training. The web shows the evidence for each model and can check up to 1,000 reviews at once.`,
    stats:{pwr:0,spd:0,def:0}, links:{live:'https://suara-rakyat-xi.vercel.app/',code:'https://github.com/ne-he/suara-rakyat'} },
/* To show a project-page screenshot in the dossier, add `preview:'path/to/shot.png'`
   to any project above: it renders in the panel preview slot automatically. */
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
  panel.style.setProperty('--glow', '#f4a93a');                        // amber: keep the panel cohesive (no per-unit blue)
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
  /* languages: real %s from the repo's GitHub /languages */
  panel.querySelector('.stats').innerHTML = (p.langs||[]).map(l=>`
    <div class="stat"><span class="stat-k">${l.name}</span>
    <span class="stat-bar"><i style="--v:0%" data-v="${l.pct}%"></i></span>
    <span class="stat-v">${l.pct}%</span></div>`).join('');
  /* links: always show both; disabled until a URL exists */
  const live = p.links && p.links.live, code = p.links && p.links.code;
  const L = [
    live ? `<a class="btn-link" href="${live}" target="_blank" rel="noopener">Visit Web ↗</a>`
         : `<span class="btn-link is-disabled">${(p.links && p.links.note) || 'Visit Web (Soon)'}</span>`,
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

/* title "power on": hovering the marquee dims the whole hall and glory-glitches
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

/* "Click for details" blinks above the head: only once the unit has settled in
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
   PAGE-1 REVEAL ENGINE: newgif JPG sequence (240 frames, dark→lit EMPTY hall)
   scrubbed on <canvas> via GSAP ScrollTrigger (pin .stage, scrub:0.5). The PNG
   arsenal stays fully hidden through the whole scrub; only when it finishes does
   a short cinematic beat (bloom flash + SYSTEM ONLINE) reveal Page 2: idle.mp4
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
   last frame stays visible: no blank-dark cover on Safari/headless) */
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

/* ---------- transition flavor text (V3 "DEPLOYING UNITS" beat: cycles, not a static spinner) ---------- */
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
  if(committed) return;                         // Page 2 is locked: ignore any stray scroll
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
  tag.textContent='CALIBRATE: drag to move · wheel to resize · press C to copy values';
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

  /* window-level drag: robust: no setPointerCapture quirks, keeps tracking even if the
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
    console.log('%c[ ARMORY CALIBRATION ]\n'+dump, 'color:#ffc56b');
    out.value = dump; out.style.display='block'; out.focus(); out.select();   // ready to Ctrl+C
  });
}
