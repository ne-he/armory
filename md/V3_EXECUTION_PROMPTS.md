# 🚀 V3 — WHISK FROM-SCRATCH PIPELINE (semua aset dari nol di Whisk)
> Kenapa semua di Whisk: video Whisk cuma mau jalan kalau gambarnya lahir di Whisk sendiri (import dari luar = ke-flag). Jadi: **generate semua gambar DI Whisk → pakai ulang sebagai referensi (slot SUBJECT/SCENE) biar konsisten → baru animate.**
> Art direction (patokan dari folder `generated/`): ruangan **selalu gelap & moody**, robot = **sumber cahaya** (mata + core dada + seam nyala **warm amber**), spotlight fokus per alcove, **asap dari grate lantai tengah**, lantai basah reflektif. "Mercedes nyalain lampu di garasi gelap." ❌ no flood terang, ❌ no orange-rata, ❌ no cyan (tema ruangan).

---

# PART A — GAMBAR (urut, jangan loncat)

## A1 — MASTER ROBOT (kunci konsistensi — bikin ini DULUAN)
> Dipakai sebagai **SUBJECT reference** di semua langkah lain. Pilih 1 hasil terbaik.
```
Full-body front view of a towering humanoid robot figure with rugged matte black metal
plating and exposed mechanical joints. Warm amber light glows from its eye visor, a round
chest core, and thin seams across the plating. Standing perfectly straight, symmetrical,
arms at sides, facing the camera. Dark studio backdrop, warm rim light, photorealistic,
highly detailed, full body head-to-toe, centered. No text, no watermark, no weapons.
```
→ Simpan: **`A1-master.jpg`**

## A2 — HALL GELAP + ROBOT (START FRAME Page 1) · 16:9
> Pakai **A1 di slot SUBJECT**, prompt ini sebagai scene. Vibe = `blm_nyala.png`-mu.
```
A vast dark circular exhibition hall. Tall display alcoves line the curved wall, each
holding the same towering robot figure standing still in near-total darkness — visible
only by faint warm amber glows from their eyes and chest cores. Dark glossy reflective
floor with faint warm reflections, a metal vent grate at the center of the floor, thin
haze, deep black shadows. Cinematic, moody, photorealistic. No text, no watermark.
```
→ Simpan: **`A2-hall-dark.jpg`** ← start frame video scrub

## A3 — HALL "POWERED ON" BER-AURA (END FRAME Page 1) · 16:9
> Lanjutin/edit dari A2 (refine di Whisk, jangan bikin scene baru). Vibe = `nyalaa.png` yang gahar.
```
Keep the exact same hall, camera angle, and robot positions. The robots are now fully
powered on: fierce warm amber light burns from their eyes, chest cores, and body seams,
casting a glowing halo out of each alcove onto the walls and floor. A focused cool-white
spotlight beam shines down on each alcove. Smoke rises slowly from the central floor
grate. The room itself STAYS DARK and ominous — high contrast, deep blacks, pools of
light only. Wet reflective floor mirrors the glow. Cinematic, intimidating, photorealistic.
No sunlight, no bright ceiling light, no text, no watermark.
```
→ Simpan: **`A3-hall-aura.jpg`** ← end frame scrub + start frame idle

## A4 — HALL KOSONG (BACKGROUND Page 2) · 16:9
> Edit dari A3: robot dihilangin, suasana dipertahanin. Buat latar tempat PNG interaktif berdiri.
```
Keep the exact same hall, camera, lighting, and atmosphere — but all the alcoves are now
EMPTY, the robot figures are gone. Keep the spotlight beams, the warm glow inside each
alcove, the smoke from the central floor grate, and the wet reflective floor. The room
stays dark, cinematic, photorealistic. No text, no watermark.
```
→ Simpan: **`A4-hall-empty.jpg`**

## A5 — 11 ROBOT SOLO (buat PNG interaktif) · 2:3 / portrait
> Pakai **A1 di slot SUBJECT** tiap generate (biar 11-nya sebentuk). Ganti `{ACCENT}` per unit. Pose HARUS sama semua.
```
The same robot figure, full-body front view, standing straight at attention, facing the
camera, symmetrical, arms at sides. Powered on: {ACCENT} light glows from its eyes, chest
core, and body seams. Plain flat dark grey studio background, even soft lighting,
photorealistic, highly detailed, full body centered with margin. No text, no watermark,
no weapons, no extra figures.
```
| Unit | `{ACCENT}` |
|---|---|
| 01 CRIMSON | crimson red |
| 02 AZURE | deep blue |
| 03 GOLD | bright gold |
| 04 VIOLET | violet |
| 05 EMERALD | emerald green |
| 06 ORANGE | bright orange |
| 07 WHITE | warm white |
| 08 SILVER | silver-white |
| 09 MAGENTA | magenta |
| 10 CYAN | cyan |
| 11 PRIME | intense amber-orange, the most ornate and heroic of all |
→ removebg tiap hasil → **`robot-01.png` … `robot-11.png`**

---

# PART B — VIDEO (Whisk Animate; input = gambar PART A)
> Setting selalu: **camera static/locked, motion LOW, durasi maksimal**. Kalau tool-mu nerima END frame juga (mis. Flow): start=A2, end=A3 buat V1.

## V1 — "POWER-UP" (video yang di-scrub scroll) · input: A2
```
Static locked camera, no camera movement, no zoom, no pan. The dark hall slowly powers
on: warm amber light gradually ignites in the robots' eyes, chest cores, and body seams,
growing into a fierce glowing aura around each alcove; focused spotlights fade in from
above one by one; smoke begins to rise from the central floor grate; the wet floor
brightens with warm reflections. The robots stay completely still — only light, glow,
and smoke change. The room stays dark and moody. Slow, smooth, continuous, cinematic,
no flicker.
```
→ Simpan: **`V1-powerup.mp4`**

## V2 — "IDLE LOOP" (background hidup Page 2) · input: A3 (atau A4)
```
Static locked camera, no movement. The hall is alive and breathing: the warm glow pulses
gently, spotlight haze drifts slowly, smoke rises from the central floor grate, faint
dust particles float through the light beams, soft reflections shimmer on the wet floor.
Everything stays in place — only atmosphere moves. Seamless ambient loop, slow, smooth,
cinematic, no flicker.
```
→ Simpan: **`V2-idle.mp4`**

## V3 — "ERUPTION" (transisi penutup Page 1 → Page 2) · input: A3 · opsional
```
Static locked camera. A surge of warm golden light blooms from the central floor grate
and thick smoke rises rapidly, filling the whole frame until the screen is completely
covered in glowing warm haze. Dramatic, smooth, cinematic, no strobing.
```
→ Simpan: **`V3-eruption.mp4`** (kalau gagal/aneh: skip — transisi bisa dibikin CSS flash+fog, udah dispec di build prompt)

---

# PART C — RAKIT & TARO FILE
1. **V1 (+V3 kalau ada)** gabung urut di CapCut → export MP4 → ezgif → **JPG frames ~180–240**, lebar 1280–1600px, q70–80, **total ≲12MB** → rename `frame_001.jpg…` → **`/public/frames/`**
2. **V2-idle.mp4** kompres (<3MB) → **`/public/video/`**
3. **A4** → **`/public/room/roster-bg.jpg`** (fallback kalau V2 gak dipakai)
4. **robot-01..11.png** → **`/public/suits/`**
5. Isi **`projects.json`** (draft udah ada di `V2_port/projects.json`)
6. Paste **`md/V3_PROMPT_CLAUDE_CODE.md`** ke Claude Code → build

### ✅ Checklist urut
- [ ] A1 master → [ ] A2 dark → [ ] A3 aura → [ ] A4 empty → [ ] A5 ×11
- [ ] V1 power-up → [ ] V2 idle → [ ] (V3 eruption)
- [ ] Frames + PNG + json ke folder → [ ] Gas Claude Code
