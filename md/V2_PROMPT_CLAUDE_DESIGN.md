# 🎨 V2 — PROMPT for CLAUDE DESIGN (Static Visual Skeleton)
> Tahap 1: bikin RANGKA VISUAL yang cakep (look, layout, tipografi, komponen) dalam state statis. JANGAN wire scroll/animasi dulu — itu jatahnya Claude Code. Paste semua ke Claude design. Konteks: `V2_MASTER_BLUEPRINT.md`.

---

**ROLE:** You are a senior creative front-end designer with an exceptional eye. Build the **static visual skeleton** of a cinematic portfolio called **"ARMORY HALL"** — pure HTML/CSS (minimal JS). Your job = make it look premium and memorable in every phase state. The scroll choreography & interactions will be wired LATER by another engineer — you only build the markup, styling, and the visual states (via CSS classes), plus clean hooks.

**THE PIECE (2 phases on one pinned stage):**
- **Phase 1 — Dark Stage:** near-black screen. Center = a glowing humanoid **particle figure** (the owner) with a soft "breathing" glow. Faint robot silhouettes in wall alcoves behind. A subtle hint: "SCROLL TO ACTIVATE".
- **Phase 3 — Arsenal:** the same hall now **brightly lit (warm)**, 10 **robot figures** standing in display alcoves on a gentle arc. HUD overlay. Hovering a robot glows it + shows its name; clicking opens a **dossier** panel.
(Phase 2 is the transition — Claude Code handles it. You just provide the start/end visual states.)

**BUILD ALL LAYERS, controllable by a `data-phase` attribute on `.stage`** so we can preview each state (e.g. `.stage[data-phase="1"]` vs `[data-phase="3"]`). Use this exact hook contract:
```
.stage                         pinned full-viewport container (set data-phase here)
.layer.layer-bg-dark           dark hall background (img)
.layer.layer-bg-bright         bright warm hall background (img) — hidden in phase 1
#userParticle                  center particle figure container (canvas goes inside later)
.user-hint                     "SCROLL TO ACTIVATE"
.arsenal                       robot layer (hidden in phase 1)
.robot[data-id="01".."10"]     each robot <img>; position via CSS vars --x --y --w
.robot-tooltip                 hover label (name + type)
.hud                           top overlay: wordmark + status readouts
.unit-nav                      bottom unit list (01 PULSE … 10 SPECTER)
.panel                         detail dossier (default hidden; opens with .is-open)
.reticle                       custom cursor element
#loader                        "SYSTEM BOOTING" loading screen
```

**VISUAL DIRECTION (be bold — own this):**
- **Palette:** everything stays **DARK & cinematic** throughout. Room = near-black / cool-neutral with **focused spotlights** (pools of light in deep darkness). The **robots are the warm light source** (amber/white glow on eyes/core/seams) → cool-dark room vs warm-robot contrast = the signature look (like a luxury car revealed in a dark garage). ❌ NO flood-bright room, ❌ NO orange wash, ❌ NO cyan/teal theme. CSS vars (`--bg`, `--spot`, `--amber`, `--warm`, `--text`).
- **Mood:** rugged-but-refined sci-fi armory (think gritty mech hall, not clean Apple store). Robots are rugged matte-black mechs with warm glowing eyes/chest.
- **TYPOGRAPHY (current versions felt too rigid):** pick a **characterful, elegant, modern** pairing — NOT blocky/rigid. ❌ Avoid Inter, Roboto, Arial, system-ui, Orbitron, Space Grotesk. ✅ Directions (you choose): display = Clash Display / Unbounded / Syne / Bricolage Grotesque; body = General Sans / Satoshi / Hanken Grotesk; mono = JetBrains Mono / Geist Mono (for HUD readouts). Load via Google Fonts / Fontshare. Make the "ARMORY HALL" wordmark feel designed.
- **Atmosphere:** film grain/noise overlay, vignette, a soft warm volumetric light beam on the center platform, faint scanlines on HUD, soft contact shadow under each figure (nothing floats).

**COMPONENTS TO DESIGN:**
1. **#loader** — "SYSTEM BOOTING" screen: animated progress/percent, on-brand, warm. (Static design; engine hides it later.)
2. **Phase 1** — center particle figure (use a tasteful glowing humanoid silhouette placeholder for now), warm glow, "SCROLL TO ACTIVATE" hint with a subtle down-indicator, faint alcove silhouettes behind.
3. **Phase 3 / Arsenal** — bright warm hall bg; 10 `.robot` slots on a gentle foreground arc (center largest, edges smaller + softer = depth); grounded with contact shadow. Placeholder = sleek warm-tinted humanoid silhouette per unit (NOT a plain person/toilet icon).
4. **HUD** — top-left wordmark "ARMORY HALL"; top-right status readouts (mono: e.g. `SYSTEM ONLINE`, `UNITS 10`, `SYNC ⟨clock⟩`); bottom `.unit-nav` strip (01 PULSE … 10 SPECTER).
5. **Hover state (CSS only)** — `.robot:hover` → scale up + warm glow (drop-shadow/radial) + `.robot-tooltip` shows name+type; siblings dim/desaturate (spotlight feel).
6. **.panel (dossier / spec-sheet, HUD-styled)** — slide-in from right over a blurred backdrop. Fields: type tag, MODEL DESIGNATION (= project name), BRIEFING (description), LOADOUT (tech chips), STATS bars (e.g. Creativity / Technical / Impact), STATUS + links, image slot, "◀ RETURN TO HALL".
7. **.reticle** — custom crosshair/reticle cursor; a `.lock-on` variant (e.g. corner brackets) for when hovering a robot.

**DATA-DRIVEN:** render robots + panel from a `PROJECTS` array (you may stub it):
`{ id, name, type, accent, image, summary, description, tech:[], stats:{}, links:{}, status }`. `status:"coming_soon"` → dimmed/locked slot. Swapping placeholders for real PNGs (`/public/suits/robot-01.png`) must be trivial — just set `image`.

**RESPONSIVE:** design a mobile intent too — HUD compresses, robots become a horizontal scroller/carousel, labels always visible (no hover dependency), big tap targets.

**DELIVERABLE:** a polished static skeleton; toggling `data-phase` on `.stage` shows a beautiful Phase-1 and Phase-3 state. Clean, semantic markup with the exact hooks above so the engine plugs in cleanly.

**DO-NOT:** ❌ no cyan/teal theme · ❌ no rigid/generic fonts · ❌ no generic AI aesthetic · ❌ don't wire scroll/GSAP yet (states only) · ❌ don't bake text into images · ❌ no plain person/toilet placeholder icons.
