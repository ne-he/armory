# ⚙️ V4 — BUILD PROMPT for CLAUDE CODE (Roster Step-Nav + Particle Intro)
> Paste seluruh file ini ke Claude Code di Antigravity. Repo: `github.com/ne-he/armory` (v3 sudah di branch sendiri). **Buat branch baru `v4` dari v3.** V4 = 3 perubahan terarah di atas engine v3 yang sudah jalan — JANGAN rebuild dari nol.

---

**ROLE:** Senior creative front-end engineer. The v3 engine works (loader → canvas frame-scrub → flash transition → Page 2 robots → dossier panel). Apply exactly the 3 changes below with production-quality code. Everything not mentioned here **stays as-is**.

---

## CHANGE 1 — PAGE 2 "THE ROSTER" → STEP NAVIGATION (replaces the current robot rank/grid)

**Layout (3 slots only, center stage):**
```
   [⬅️]   ( prev: small, POWERED OFF )   [ CURRENT: LARGE, POWERED ON ]   ( next: small, POWERED OFF )   [➡️]
```
- **Center** = selected unit: large (~38–45vh tall), fully lit — warm glow, idle float, soft floor reflection/contact shadow.
- **Left/Right previews** = adjacent units only: small (~55% of center), **visually "off"**: heavily dimmed, desaturated/near-silhouette, slight blur, no glow, pushed slightly back (scale/translate). They are *teasers*, not buttons (optional: clicking a preview = same as pressing that side's arrow — never skips more than one).
- **Arrows:** `⬅️` hidden when current = first unit; `➡️` hidden when current = last unit. Step-by-step ONLY — no skipping, no free drag.
- **Under center unit:** unit number + name + class (e.g. `02 / 11 — AZURE · Guardian`). A thin progress rail of 11 ticks is fine; ticks are **indicators only, not clickable**.

**Step transition (GSAP, ~0.5–0.7s, on-theme "power transfer"):**
1. Center unit powers DOWN (glow fades, desaturate) while sliding to the side slot (shrinks).
2. Incoming unit slides to center while powering ON — glow ignites (eyes/core flare), scale up.
3. New far preview fades in; arrows update. Debounce input during transition.

**Initial state:** unit 01 centered (powered on), 02 as right preview, no left preview, `⬅️` hidden.
*(Optional flag: start on the `featured` unit instead — build it data-driven, default to 01 as requested.)*

**Hover center unit (desktop):** warm theme glow intensifies + project title + animated stat bars (PWR/SPD/DEF). Touch: title + stats always visible for the center unit.

**Click center unit:** open the existing **dossier panel as an OVERLAY** (no page navigation) with that unit's data from `projects.json`. `Esc`/Return closes back to roster, position preserved.

**Locked units (`status:"coming_soon"`):** still occupy their slot in the sequence; centered = dark silhouette + "LOCKED", hover shows nothing extra, click does NOT open the panel (small shake/denied beep-style feedback is fine).

**Inputs:** arrows (click/tap), keyboard `←`/`→`, mobile horizontal swipe = exactly one step. All debounced.

**Background:** the idle video (`idle.mp4` if present, else the lit still) **blurred + darkened** (CSS `filter: blur(6–10px) brightness(0.4–0.55)` or pre-blurred layer) + vignette. Non-interactive, pure ambience. Keep the CSS smoke/dust overlays.

## CHANGE 2 — HOVER/GLOW COLOR = ONE THEME COLOR ONLY
All 11 units share the same PNG, so per-unit accent glows look wrong. **Replace every per-unit accent glow/hover (robots, tooltips, roster glow) with the single theme warm amber** (use the existing `--warm`/amber CSS var). Per-unit `accent` may remain ONLY as a tiny class-tag color inside the dossier panel — nowhere else. No rainbow hovers.

## CHANGE 3 — PAGE 1: PARTICLE PORTRAIT + MORPHING PARTICLE TEXT
Reference implementations (READ THESE, port the technique — do not iframe/copy wholesale):
- `reference/particle_portrait_nehemiah.html` — 2D canvas portrait particles: samples a transparent PNG into colored particles with spring physics; particles **scatter from the cursor** and spring back.
- `reference/text_hover.html` — particle TEXT that **morphs between phrases** by lerping each particle to new sampled target positions on click.
- Asset: `public/portrait/nehemiah.png` (transparent body cutout).

**Build into Page 1 (the pinned stage):**
1. **Portrait:** render Nehemiah's body as a particle figure, positioned standing **on the central floor grate** (where the smoke rises) — scale so he reads as standing IN the hall (feet at the grate, ~40–50vh tall). Warm-tinted particles + soft contact shadow + subtle warm rim glow so he blends with the scene. Cursor hover scatters particles (port the spring physics). Gentle idle "breathing" drift.
2. **Particle text** (above/in front of him, one line, warm-white particles), morph sequence — use these EXACT strings:
   - State 1: `Hello, Welcome to Nehemiah's project hall.` — with a small static hint below: `click to continue`
   - On click (anywhere on stage): morph → `Have a nice visit` — hold ~1.6s, then auto-morph →
   - State 3: `Please scroll to activate` (persists; this REPLACES the old "SCROLL TO ACTIVATE" hint element — remove/merge the old one so there aren't two hints).
   - Morph = particles lerp/spring to the new text's sampled positions (like the reference), ~0.8–1.2s, slight scatter burst at the start of each morph. Clicks during a morph are ignored. After state 3, further clicks do nothing.
3. **Scroll behavior:** scrolling is never blocked (text is guidance, not a gate). During the scrub, portrait + text dissolve/scatter-out at ~55–65% progress (keep/reuse the existing dissolve timing). If the user scrolls before clicking, jump the text straight to state 3 behavior (dissolve normally).
4. **Performance:** ONE shared canvas + rAF for portrait+text if practical; cap total particles (~8–12k desktop), reduce ~50% on mobile; `prefers-reduced-motion` → static portrait image + plain text crossfade (no particle sim); pause sim when `document.hidden`.

## ASSET PREP (do first)
- Copy `porto/hoverpart/image-removebg-preview.png` → `public/portrait/nehemiah.png`.
- Copy `porto/hoverpart/particle_portrait_nehemiah (1).html` and `text_hover.html` → `reference/` in the repo (read-only reference).
- `projects.json` (real data, 11 units) already exists — the roster must read names/class/stats/status from it. No hardcoded copies.

## DO-NOT
- ❌ Don't touch: loader, frame-scrub engine, flash transition, dossier panel internals, mobile fallbacks — beyond what Changes 1–3 require.
- ❌ No drag/momentum carousel on the roster (step-nav only). ❌ No per-unit hover colors. ❌ No double hint texts on Page 1. ❌ No blocking scroll.

## DEFINITION OF DONE
- Roster: 01 starts centered; arrows step one-by-one with the power-down/power-up transition; edge arrows hide; keyboard + swipe work; locked units render correctly; click-center opens dossier overlay and returns cleanly.
- All robot glows/hovers = single warm theme color.
- Page 1: particle Nehemiah stands at the grate, scatters on hover; text morphs `Hello…` → (click) `Have a nice visit` → (auto) `Please scroll to activate`; old hint removed; dissolve on scrub still works.
- 60fps desktop, smooth mobile, reduced-motion fallback, no console errors. Committed on branch `v4`.

**Work order:** (0) branch `v4` + asset prep → (1) Change 2 (quick) → (2) Change 1 roster → (3) Change 3 particles → (4) polish/perf pass → verify DoD.
