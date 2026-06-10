# ⚙️ V3 — BUILD PROMPT for CLAUDE CODE ("Hall of Armor")
> Paste seluruh file ini ke Claude Code (Antigravity). Konteks penuh: `md/V3_HALL_BLUEPRINT.md`. Rangka lama dari fase design: `Armory Hall.html` + `armory.css` + `armory.js` (pakai sebagai referensi look/HUD — boleh refactor).

---

**ROLE:** Senior creative front-end engineer. Build a two-act cinematic portfolio, vanilla **HTML/CSS/JS + GSAP ScrollTrigger + tsParticles** (no framework, no WebGL). Static-deployable (Vercel/Netlify). Target 60fps.

**ASSETS:**
- `/public/frames/frame_001.jpg … frame_NNN.jpg` (~180–240 frames, dark→eruption) — Page 1 scrub.
- `/public/room/roster-bg.jpg` — Page 2 background (bright empty alcoves).
- `/public/suits/robot-01..11.png` (alpha, uniform pose) — Page 2 roster.
- `/public/portrait/nehemiah.png` — center particle figure.
- `/public/data/projects.json` — 11 units: `{id, unit, class, accent, name, type, image, summary, description, tech[], stats{pwr,spd,def}, links{live,repo}, screenshots[], status}`.
- Placeholders if anything missing — never block.

**THEME:** room = dark + warm amber/gold (NO cyan/teal room theme; per-unit accent colors come from `projects.json`). Typography: characterful (display + body + mono for HUD) — avoid Inter/Roboto/Orbitron/Space Grotesk. Reuse the HUD/wordmark style from the old skeleton.

---

## ACT 1 — "THE UNLEASHING" (pinned scroll-scrub)
1. **Canvas frame-scrub:** preload ALL frames during `#loader` (real progress %), draw to one `<canvas>` (`drawImage`, cover-fit). NEVER 200 `<img>` in DOM.
```js
const tl = gsap.timeline({ scrollTrigger:{ trigger:".stage", start:"top top",
  end:"+=1800", pin:true, scrub:0.5 }});
tl.to(state,{ f:FRAME_COUNT-1, ease:"none", onUpdate:()=>draw(Math.round(state.f)) },0);
```
2. **Center particle figure (tsParticles):** built from `nehemiah.png`, warm-white/amber, idle breathing; hover → name/"About Me". **Dissolve** (radial burst + fade) at ~60% scroll. Reduce particle count on mobile.
3. **UI:** "SCROLL TO ACTIVATE" hint (fades on first scroll), vignette eases out as light rises.
4. End of scrub (screen = warm haze) → trigger **TRANSITION**.

## TRANSITION — "DEPLOYING UNITS" (~1.5s)
- Cinematic interstitial, NOT a generic spinner: mono flavor text cycling ("DEPLOYING UNITS…", "CALIBRATING ARSENAL…"), small progress, ember particles, warm bloom flash in/out.
- Under the hood: **preload all Act 2 assets** (roster-bg + 11 PNGs) before revealing Act 2.
- After it, release the pin → user lands in Act 2 (normal page flow; scrolling back up may reverse-scrub or jump back — your call, keep it non-janky).

## ACT 2 — "THE ROSTER" (character-select carousel)
1. **Backdrop:** `roster-bg.jpg` full-bleed + CSS ambient overlays (drifting steam, dust motes, subtle light flicker, vignette).
2. **Carousel (CSS 3D, no WebGL):** 11 `.unit` items on an arc. Container has `perspective`; each item transformed by distance-from-center `d`:
   `translateX(d * spacing) translateZ(-|d| * depth) rotateY(d * -18deg) scale(1 - |d|*0.13)` + `brightness(1 - |d|*0.25)` + `blur(|d| * 1.2px)`. Center unit: spotlight cone + floor reflection (CSS) + accent glow.
3. **Physics:** drag (pointer events), swipe, wheel, arrow keys → velocity + inertia, **snap** to nearest unit with slight overshoot bounce (GSAP `back.out`). Default centered unit = PRIME (11).
4. **Hover/focus (center or any unit):** accent-color glow, unit name + class tag, **stat bars** PWR/SPD/DEF animating to value, small preview thumbnail. Touch: labels always visible; tap = center it, tap again = open.
5. **Click center unit → "VS-SCREEN" detail:** unit zooms/slides left, dossier panel expands right: type tag, MODEL DESIGNATION (project name), BRIEFING, LOADOUT (tech chips), STATS, links (LIVE/REPO), screenshots slot, "◀ RETURN TO ROSTER". `Esc` closes; focus-trapped; real selectable text.
6. `status:"coming_soon"` → dark silhouette + "LOCKED", not openable.
7. **Unit-nav strip** (01…11) syncs with carousel; click = snap to that unit.

## CROSS-CUTTING (required)
- **Mobile:** Act 1 scrub with fewer frames (sample every 2nd–3rd) or fallback crossfade frame_001→last; Act 2 swipe-native carousel; big tap targets.
- **`prefers-reduced-motion`:** skip scrub & transition → straight to Act 2 static; plus an accessible plain HTML project list (SEO/recruiter-friendly).
- **Perf:** frames total ≲12MB; transform/opacity-only animations; `will-change` on carousel items; pause rAF when `document.hidden`; cap DPR; lazy-decode PNGs.
- **No WebGL fallback needed** (no WebGL used). If JS fails, show the plain project list.
- **Copyright:** never render Iron Man/Jarvis/Stark/Marvel/Real Steel anywhere (UI, code, comments).

## DEFINITION OF DONE
- Act 1 scrubs butter-smooth (no stutter), particle dissolve lands at ~60%, eruption covers screen.
- Transition plays once, preloads Act 2, never shows a blank frame.
- Roster: drag/swipe/wheel/keys + snap-bounce all work; hover stats animate; VS-screen opens/closes clean; PRIME featured by default; LOCKED units render.
- Mobile + reduced-motion + perf budget verified. Deployed-ready static build.

**Work in this order, confirm each before next:** (1) Act-1 scrub engine → (2) particle + dissolve → (3) transition → (4) carousel + physics → (5) hover/stats → (6) VS-screen → (7) mobile/a11y/perf polish.
