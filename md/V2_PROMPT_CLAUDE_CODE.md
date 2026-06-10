# ⚙️ V2 — PROMPT for CLAUDE CODE (Engine + Effects)
> Tahap 2: ambil rangka statis dari Claude design + aset, lalu pasang SEMUA efek & interaksi. Paste ke Claude Code di Antigravity. Konteks: `V2_MASTER_BLUEPRINT.md`, hooks di `V2_PROMPT_CLAUDE_DESIGN.md`.

---

**ROLE:** You are a senior creative front-end engineer. You receive a static visual skeleton (HTML/CSS with the hook contract below) and asset files. Wire the **cinematic scroll choreography + all interactions**, hit a strict performance budget, and keep it deployable as a static site.

**STACK:** vanilla JS + **GSAP + ScrollTrigger** + **tsParticles**. No framework. Self-contained → deploy to Vercel/Netlify.

**HOOK CONTRACT (rely on these from the design skeleton):**
`.stage[data-phase]` · `.layer-bg-dark` · `.layer-bg-bright` · `#userParticle` · `.user-hint` · `.arsenal` · `.robot[data-id]` (pos via `--x --y --w`) · `.robot-tooltip` · `.hud` · `.unit-nav` · `.panel.is-open` · `.reticle` · `#loader`.

**ASSETS:**
- **Page-1 reveal = a JPG FRAME SEQUENCE** (dark→lit) at `/public/frames/ezgif-frame-001.jpg … ezgif-frame-180.jpg` (180 frames, ~66KB each; use the clean numbered set, ignore any `-hash` duplicate copies).
- `/public/suits/robot-01..10.png` (alpha) · `/public/portrait/nehemiah.png` · `/public/data/projects.json`.
- (`hall-dark.jpg` / `hall-bright.jpg` = frame 1 & frame 180; keep as a lightweight mobile fallback.)
- Use placeholders if missing — never block.

---

## 1) SCROLL CHOREOGRAPHY (3 phases, one pinned stage)
**Page-1 reveal = IMAGE-SEQUENCE SCRUB (Apple-style):** draw a 180-frame JPG sequence
(dark→lit) onto a single `<canvas id="revealCanvas">` (replace the `.layer-bg-*` img layers
with this canvas), frame index driven by scroll. Pin `.stage`, map scroll to a GSAP timeline.
**NEVER put 180 `<img>` in the DOM — preload into an array during `#loader`, draw to canvas.**
```js
gsap.registerPlugin(ScrollTrigger);
const FRAME_COUNT = 180, frames = [];
for (let i=1;i<=FRAME_COUNT;i++){ const im=new Image(); im.src=`/frames/ezgif-frame-${String(i).padStart(3,'0')}.jpg`; frames.push(im); }
const canvas = document.querySelector("#revealCanvas"), ctx = canvas.getContext("2d");
const draw = i => { const im=frames[i]; if(im && im.complete) ctx.drawImage(im,0,0,canvas.width,canvas.height); };
const state = { f: 0 };
const tl = gsap.timeline({ scrollTrigger:{ trigger:".stage", start:"top top", end:"+=1600",
    pin:true, scrub:0.5, onUpdate:s=>stage.dataset.progress=s.progress.toFixed(2) }});
// PHASE 1→2: scrub the frame sequence dark→lit across the whole scroll
tl.to(state, { f: FRAME_COUNT-1, ease:"none", onUpdate:()=>draw(Math.round(state.f)) }, 0)
  .to(".layer-vignette", { opacity: 0, ease: "none" }, 0)
// USER dissolve ~60–70%
  .to("#userParticle", { opacity: 0, scale: 1.15, duration: 0.15, onStart: explodeParticles }, 0.6)
// PHASE 3 reveal ~80%: robots fade in staggered, enable interaction
  .add(activateArsenal, 0.8);
```
- Frames: `/public/frames/ezgif-frame-001.jpg … 180.jpg` (clean numbered set; ignore `-hash` dupes). Compress so total ≲ ~10MB.
- `activateArsenal()` = staggered `gsap.to(".robot",{opacity:1,stagger:0.08})` + add `.interactive` (enable pointer events).
- **Mobile fallback:** if 180 frames too heavy, sample every 3rd frame (~60), or crossfade just frame-001 → frame-180.

## 2) PARTICLE FIGURE (tsParticles)
- Build the center figure from `nehemiah.png` (sample to points) OR a tsParticles emitter; warm-white/amber, soft idle "breathing" (slow scale/opacity oscillation).
- `explodeParticles()` = particles burst radially outward + fade (more cinematic than a plain fade). Hover (phase 1 only) → show name/"About Me".
- Mobile → reduce particle count (perf).

## 3) ROBOT POSITIONING + CALIBRATION
- Position each `.robot` via CSS vars `--x/--y/--w` (%). 
- **Build a dev calibration mode** (`?calibrate`): make robots draggable/resizable, log the `--x/--y/--w` values to console so you can dial in placement over `hall-bright` quickly, then hardcode into `projects.json`.

## 4) INTERACTIONS (Phase 3)
- **Hover:** scale up + warm glow + `.robot-tooltip` (name + type); dim/desaturate siblings (spotlight). `.reticle` → `.lock-on`.
- **Click:** robot "steps forward" (scale/translate) → open `.panel.is-open` (dossier) with that project's data; dim hall. `◀ RETURN TO HALL` + `Esc` closes; focus-trap the panel.
- Build dossier content from `projects.json` (incl. STATS bars). `status:"coming_soon"` → locked, no panel.

## 5) LOADING + PRELOAD
- Show `#loader` ("SYSTEM BOOTING") until critical assets (stills/video/PNGs) are loaded; animate a real progress %; then reveal Phase 1. Never a blank flash.

## 6) MOBILE
- Scroll-scrub is janky on touch → on mobile: play the awakening once on first interaction (or tap-to-activate), then Arsenal = **horizontal swipe carousel**; tap = open dossier; unit labels always visible (no hover).

## 7) AUDIO (optional, off by default)
- Browsers block autoplay audio → start only after first user interaction; provide a "🔊" toggle. Layers: low hum (P1) → rising power-up (P2) → ambient lab (P3); soft UI beep on hover.

## 8) ACCESSIBILITY / REDUCED-MOTION
- `prefers-reduced-motion` → skip scrub/dissolve, jump straight to the lit Arsenal; render an accessible HTML list of projects (also SEO/recruiter-ATS friendly). Panel = focusable DOM, real selectable text.

## 9) PERFORMANCE BUDGET (enforce)
- Frame sequence: preload ALL frames during `#loader` (draw to canvas, never DOM imgs); compress JPGs (resize ~1280–1600px, quality ~70–80, total ≲ ~10MB); on mobile sample fewer frames.
- `gsap.ticker`/`will-change` on animated layers; animate transform/opacity only (no layout thrash). Cap particle count; lazy-load PNGs; `ScrollTrigger.refresh()` on resize; pause heavy loops when `document.hidden`. Target **60fps**.

## ✅ DEFINITION OF DONE (per milestone)
- **M2:** scroll smoothly scrubs the 180-frame sequence dark→lit on canvas (no stutter) + particle figure dissolves at ~65%; vignette clears.
- **M3:** at ~80% the 10 robots fade in at correct positions, hover-glow + tooltip work, click opens the dossier; `Esc`/return works.
- **M4:** loader + mobile carousel + reduced-motion + audio toggle all work; 60fps; deployed.

## DO-NOT
❌ Don't bake interactive/text content into images/video. ❌ No blank blocking screen. ❌ No janky scroll-jacking that traps the user. ❌ Don't break the design skeleton's hook contract — extend it.
