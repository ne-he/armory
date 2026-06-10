# 🚀 V3 — EXECUTION PROMPTS (urut langkah, tinggal copy-paste)
> Semua prompt copyright-safe + tema dark-warm-amber. Video & start-frame-nya di-generate **di dalam Whisk** (temuanmu: import dari Gemini = ke-flag). Robot PNG boleh di Gemini.

---

## 🟢 STEP 1 — Start Frame Beat 1 (image, DI WHISK) · 16:9
> Frame awal video: hall gelap + figur glow samar. (Versi Whisk dari gambar gelapmu.)
```
Wide cinematic interior of a dark futuristic hall. A symmetrical ring of tall display
alcoves along a curved wall, each holding a standing humanoid figure in near-darkness —
visible only by a faint warm amber chest light and dim eye glow. Dark glossy reflective
floor with faint warm reflections, thin fog on the floor, deep black shadows, volumetric
haze, moody, photorealistic. 16:9.
Avoid: bright light, daylight, text, logos, watermark, weapons, cyan, teal.
```
→ Simpan: `whisk-dark.jpg` (ini start frame Beat 1 + acuan semua beat).

## 🟢 STEP 2 — VIDEO Beat 1 "Living Cases" (3–5s)
> Input: `whisk-dark.jpg`. Camera static, motion LOW.
```
Static locked camera, no camera movement, no zoom, no pan. The dark hall is alive: the
warm amber chest lights on the figures pulse rhythmically, the alcove lamps flicker
softly, steam rises slowly from floor vents, thin fog drifts across the reflective floor.
The figures stay completely still; only light and atmosphere move. Cinematic, moody,
smooth, seamless loop, no flicker artifacts.
```

## 🟢 STEP 3 — VIDEO Beat 2 "Convergence" (3–5s)
> Input: **screenshot frame TERAKHIR Beat 1** (biar nyambung). Camera static, motion LOW.
```
Static locked camera, no camera movement. Same dark hall. All overhead spotlights slowly
swing and converge toward the center of the floor; the center floor begins to glow with
rising warm amber light and faint glowing cracks; steam bursts gently from the vents; the
figures stay still in their alcoves. Dramatic, cinematic, smooth gradual motion, no flicker.
```

## 🟢 STEP 4 — VIDEO Beat 3 "Eruption" (2–4s)
> Input: screenshot frame terakhir Beat 2. Camera static, motion MEDIUM boleh.
```
Static locked camera, no camera movement. A surge of warm golden light erupts from the
center of the floor and thick dark smoke rises rapidly, filling the entire frame until the
screen is completely covered in glowing warm haze. Dramatic, cinematic, smooth, no strobing.
```

## 🟡 STEP 5 — (Opsional, max 2x) Path B "One Step Forward"
> Input: `whisk-dark.jpg`. Kalau 2x gagal/morph → SKIP, lanjut Path A.
```
Static locked camera, no camera movement. The standing figures slowly take ONE single step
forward out of their alcoves into the light, then stand perfectly still. Slow, smooth,
synchronized, no other movement, warm amber lighting, cinematic, no morphing, no flicker.
```

## 🟢 STEP 6 — Gabung & Export JPG Sequence
1. Gabung Beat 1→2→3 di CapCut (urut, tanpa transisi tambahan — biar nyambung raw).
2. Export MP4 → ezgif/ffmpeg → **JPG frames**: target **~180–240 frame total**, lebar 1280–1600px, quality 70–80, **total ≲ 12MB**.
3. Rename rapi: `frame_001.jpg` … `frame_240.jpg` → taro `/public/frames/`.

---

## 🟢 STEP 7 — Background Page 2 (image, terang & KOSONG) · 16:9
> Di Whisk juga. Ini latar roster — cases kosong = "mereka udah keluar".
```
Wide cinematic interior of a futuristic hall after activation: the tall display alcoves
along the curved wall are now EMPTY and warmly backlit with amber light, soft spotlight
cones from above, thin steam drifting from floor vents, dark glossy reflective floor with
warm reflections, light haze, the room stays dark and moody with warm pools of light,
photorealistic. 16:9.
Avoid: figures, robots, people, daylight, flat bright lighting, text, watermark, cyan, teal.
```
→ Simpan: `roster-bg.jpg` → `/public/room/`.

## 🟢 STEP 8 — 11 Robot PNG (di Gemini, pakai `kerangka.png` sebagai referensi) · 2:3
> Upload master skeleton (kerangka) tiap generate biar 11-nya sebentuk. Pose SERAGAM.
```
Using the same mech design as the reference image: full-body front view of a rugged
humanoid mech figure, matte black armor plating, exposed mechanical joints, ACTIVATED mode
with {ACCENT} glowing accents along the seams and a glowing {ACCENT} chest core and eye
slits. {DETAIL}. Standing straight at attention, weight on both feet, symmetrical, facing
camera. Warm cinematic studio rim light, photorealistic, highly detailed, isolated on a
flat matte neutral grey background, full body head-to-toe, centered. 2:3.
Avoid: text, labels, captions, UI, logos, watermark, weapons, real human face, extra figures.
```
| Unit | `{ACCENT}` | `{DETAIL}` |
|---|---|---|
| 01 CRIMSON · Striker | crimson red | slim agile frame, sharp angular plating |
| 02 AZURE · Guardian | deep electric blue | broad heavy shoulder plating, fortified chest |
| 03 GOLD · Luminary | bright gold | elegant polished trim, regal proportions |
| 04 VIOLET · Phantom | violet | sleek stealth profile, narrow visor |
| 05 EMERALD · Sage | emerald green | engraved circuit-line patterns on the plating |
| 06 ORANGE · Forge | bright orange | industrial build, exposed hydraulic pistons |
| 07 WHITE · Pure | warm white | clean minimal smooth plating |
| 08 SILVER · Mirror | silver chrome | reflective polished panels |
| 09 MAGENTA · Chaos | magenta | asymmetric experimental plating details |
| 10 CYAN · Aqua | cyan | layered vents, fluid curved plating |
| 11 PRIME · Featured | amber-to-red gradient | the most ornate heroic armor, richest detail, slightly larger presence |

→ removebg → `robot-01.png` … `robot-11.png` → `/public/suits/`.

---

## ✅ STEP 9 — Isi `projects.json` (draft udah dibikinin di `V2_port/projects.json`)
Isi nama projek asli + deskripsi + tech + links + stats per unit. `coming_soon` buat slot kosong.

## ▶️ STEP 10 — Briefing Claude Code
Paste `md/V3_PROMPT_CLAUDE_CODE.md` ke Claude Code di Antigravity (drop aset Step 6–9 ke folder dulu).

---

### Checklist cepat
- [ ] S1 `whisk-dark.jpg` → [ ] S2 Beat1 → [ ] S3 Beat2 → [ ] S4 Beat3 → [ ] (S5 Path B 2x max)
- [ ] S6 JPG sequence ≲12MB di `/public/frames/`
- [ ] S7 `roster-bg.jpg` → [ ] S8 11 PNG → [ ] S9 projects.json → [ ] S10 ke Claude Code
