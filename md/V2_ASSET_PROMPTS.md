# 🎨 V2 — ASSET PROMPTS (Gemini + Whisk) — Copyright-safe, Warm palette
> Tool: **Gemini** (gambar) + **Whisk/Google Labs** (video). Palette: **semua TETAP GELAP. Ruangan = cool/dark + spotlight fokus; glow robot = WARM amber/putih (sumber cahaya & bintangnya)** — kontras kayak mobil mewah reveal di garasi gelap. ❌ NO flood-terang, ❌ NO orange-rata, ❌ NO cyan. Robot: rugged mech (Real-Steel-vibe) tanpa nyebut IP.

## 🛡️ ATURAN AMAN (semua prompt)
❌ JANGAN tulis: Real Steel, Zeus, Iron Man, Stark, Jarvis, Mark-[angka], arc reactor, repulsor, nama film/karakter.
✅ Padanan aman: `rugged humanoid combat mech` · `matte black armor plating` · `exposed hydraulic joints & pistons` · `glowing eye slits` · `glowing chest core` · `display alcoves` · `armory exhibition hall`.
Tambahin di tiap prompt: `Avoid: text, logos, watermark, weapons, real human face, cyan, teal, blue tint.`

---

## 🔑 ASSET 1 — Master Skeleton (1 robot patokan) · Gemini · 2:3
> Bikin SATU robot dulu → jadi referensi konsistensi buat 10 robot + buat video.
```
Full-body front view of a rugged humanoid combat mech suit. Heavy industrial design,
matte black armor plating, exposed mechanical joints and hydraulic pistons, broad
shoulders. A softly glowing warm-white chest core and glowing warm amber eye slits.
Standing straight at attention, symmetric neutral pose, arms at sides, facing the camera
directly. Dramatic dark studio background with warm rim light. Highly detailed metal
texture, subtle scratches and panel lines, photorealistic, octane render. Full body
head-to-toe, centered. 2:3.
Avoid: text, logos, watermark, weapons, real human face, multiple figures, cyan, teal, blue tint.
```
→ Simpan: **`master-skeleton.jpg`**. (Pilih hasil yang proporsinya paling "standar/representatif".)

---

## 🌑 ASSET 2 — Dark Hall + Ghost Robots (frame awal video) · Gemini · 16:9
> Ini jadi gambar input buat Whisk (titik mulai Video 1).
```
Wide cinematic interior of a dark futuristic armory exhibition hall. A symmetrical ring
of ten tall display alcoves lines the curved wall; inside each stands a rugged humanoid
combat mech in near-total darkness. The mechs are visible ONLY by faint warm-white
glowing eye slits and chest cores tracing their silhouettes — no armor color, no external
light. Dark glossy reflective floor, volumetric haze, deep shadows, moody. Photorealistic. 16:9.
Avoid: bright light, text, logos, watermark, weapons, people, cyan, teal, blue, daylight.
```
→ Simpan: **`hall-dark.jpg`**.

---

## 🎬 ASSET 3 — Video 1 "The Awakening" · Whisk/Google Labs
> Input image: `hall-dark.jpg`. Whisk/Veo cenderung nambah gerak kamera → tekankan STATIC.
```
Static locked camera, the camera does not move at all. A dark futuristic armory hall with
ten humanoid mech suits in display alcoves. The scene starts in near-total darkness. Slowly
the mechs power on — their eyes and chest cores glow WARM amber/white — and a focused
cool-white spotlight ignites over each alcove, creating dramatic pools of light. The room
STAYS DARK and moody (no flood lighting); volumetric haze catches the beams; the wet
reflective floor mirrors the glow. Cinematic, high contrast, like a luxury car reveal in a
dark garage. Seamless. No camera movement, no zoom, no pan. No orange flood, no cyan.
```
Setting: **camera = static/locked**, motion = low, durasi 5–8s.
> ⚠️ **Jujur:** dapetin dark→light mulus dari tool gratis itu bagian tersusah. 2 fallback:
> - **Plan B (paling ringan, NO video):** generate **2 still** (`hall-dark.jpg` + `hall-bright.jpg`, perspektif sama) → scroll cuma **crossfade opacity** dark→bright via GSAP. Gak perlu video sama sekali, paling enteng & anti-glitch.
> - **Plan C:** render statis di CapCut/CapCut, animasiin **brightness keyframe** gelap→terang. 100% kontrol.

---

## 💡 ASSET 4 — Latar Page 2 (SPOTLIT, bukan flood) · Gemini · 16:9
> Buat naro robot PNG. Perspektif SAMA `hall-dark.jpg`. Tetap GELAP — yang nyala cuma spotlight per alcove.
```
Wide cinematic interior of a dark futuristic armory hall. The room STAYS MOSTLY DARK, cool
and moody. A symmetrical ring of ten tall display alcoves along a curved wall; each alcove
is lit by a single focused cool-white spotlight from above, creating dramatic pools of
light in deep darkness, while a WARM amber glow emanates from within each alcove (as if the
exhibit emits its own light). Empty alcoves (no robots). Volumetric haze catches the beams;
dark glossy wet-look reflective floor mirrors the glow. High contrast, deep black shadows,
premium cinematic mood — like a luxury car reveal emerging from a dark garage. Photorealistic. 16:9.
Avoid: flat even lighting, flooded bright room, orange color wash, daylight, robots, figures, people, text, logos, watermark, cyan, teal.
```
→ Simpan: **`hall-spotlit.jpg`**. (Atau pakai freeze frame terakhir Video 1.)

---

## 🤖 ASSET 5 — 10 Robot PNG (full-color, interaktif) · Gemini · 2:3
> **Trik konsistensi:** kasih `master-skeleton.jpg` sebagai gambar referensi ke Gemini tiap generate, biar 10 robot sebentuk. Prompt:
```
Using the same mech design as the reference image: full-body front view of a rugged
humanoid combat mech, matte black armor plating, exposed hydraulic joints, ACTIVATED mode
with brighter glowing warm amber/gold accents along the seams, glowing warm-white chest
core and eye slits. {IDENTITY}. Standing straight at attention, facing camera, symmetric.
Bright warm cinematic lighting, rim light, highly detailed, photorealistic, octane render.
Isolated on a flat matte neutral grey background, full body, centered. 2:3.
Avoid: text, labels, captions, UI, logos, watermark, weapons, real human face, cyan, teal, blue tint.
```
→ Generate 10×, ganti `{IDENTITY}` biar tiap robot beda (tetap warm, beda BENTUK & detail):

| Unit | Projek (arketipe) | `{IDENTITY}` |
|---|---|---|
| 01 PULSE | Data/Analytics | slim agile frame, fine engraved circuit lines |
| 02 AETHER | Machine Learning | sleek aerodynamic plating, layered shoulder vents |
| 03 VANTA | Web/Frontend | sharp angular minimalist armor |
| 04 HELIX | Mobile App | compact rounded plating, twin forearm modules |
| 05 COBALT | Data Viz | translucent chest panel revealing inner amber glow |
| 06 NIMBUS | Cloud/DevOps | bulky heavy-duty frame, large back vents |
| 07 QUASAR | NLP/Chatbot | smooth helmeted head with glowing band |
| 08 ONYX | Computer Vision | a single prominent glowing optical lens on the visor |
| 09 LUMEN | Automation | utilitarian exposed mechanical frame |
| 10 SPECTER | Flagship/Capstone | the most ornate & heroic, richest detail |

→ Remove background (Photoroom/remove.bg) → simpan `robot-01.png` … `robot-10.png`.

---

## 📋 Catatan eksekusi
- Gemini: pilih aspect ratio di UI (2:3 buat robot, 16:9 buat hall). Generate 3–4 variasi, pilih terbaik.
- Konsistensi 10 robot = WAJIB pakai master-skeleton sebagai referensi tiap prompt.
- Tool video gratis lain (kalau Whisk kurang nurut): **Kling free tier, Pika free tier, Hailuo/MiniMax**. Tapi inget — **Plan B (2 still + CSS crossfade) seringkali HASIL TERBAIK & paling ringan** buat efek dark→light ini.
- Simpan semua di `/public/` (`/suits/`, `/room/`, `/video/`).
