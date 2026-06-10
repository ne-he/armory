# ⚡ V3 — "HALL OF ARMOR" Final Blueprint (Unleashing + Roster)
> Supersede V2 buat flow & Page 2. Page 1 = "THE UNLEASHING" (JPG sequence scrub), Page 2 = "THE ROSTER" (character-select carousel). Tema tetap: **dark + warm amber aura** (accent warna per-robot boleh beda — itu identitas unit, bukan tema ruangan).

---

## 🎬 PAGE 1 — "THE UNLEASHING" (scroll-scrub JPG sequence)

### Narasi yang diinginkan
11 robot di display cases → keluar → ke tengah → berbaris → transisi → Page 2 roster.

### ⚠️ REALITA TEKNIS (penting)
AI video **gak bisa** ngontrol 11 figur berjalan koheren (morph/artefak hampir pasti — udah dicatat juga di blueprint Dark Convergence lama). Maka ada 2 jalur:

**PATH A — "Masked Unleashing" (RELIABLE, jalur utama):**
Gerakan "keluar & berbaris" gak pernah difilmkan — **ditutup ledakan energi/fog**, dan pas kebuka robot udah berbaris (di Page 2). Otak penonton ngisi sendiri ("mereka keluar pas ketutup asap"). Teknik klasik film.
```
Beat 1 (0–50% scroll): LIVING CASES — robot di cases hidup: chest core pulse,
        lampu case flicker, steam dari vent lantai, fog tipis. (loop-able)
Beat 2 (50–80%): CONVERGENCE — spotlight geser fokus ke tengah, lantai tengah
        mulai glow + retakan energi warm, steam burst.
Beat 3 (80–100%): ERUPTION — ledakan cahaya amber + fog gelap naik nutup SELURUH
        layar (cases + tengah ketutup semua) → layar jadi "void" hangat.
   → di sinilah transisi loading masuk, lalu Page 2 roster reveal.
```
- Tiap beat = klip video pendek terpisah (3–5s, kamera static) → disambung → export jadi JPG sequence. Lebih gampang dapet 3 klip pendek bagus daripada 1 klip panjang kompleks.

**PATH B — "True Walk" (STRETCH, coba 1–2x aja):**
Tetep coba generate "robots step forward out of their cases" di Whisk/Kling — KALAU dapet klip ajaib yang mulus, tinggal slot in (pipeline sama: JPG sequence). Kalau gagal 2x → stop, pakai Path A. **Jangan burn waktu di sini.**
- Tips realistis: minta **1 langkah maju aja** (bukan jalan jauh + formasi) — "the figures take one slow step forward out of their alcoves, then stand still". 1 langkah masih sering selamat; jalan + formasi = hampir pasti gagal.

### Prompt video (copyright-safe, warm, Whisk-friendly — generate start frame di Whisk juga)
**Beat 1 — Living Cases:**
```
Static locked camera, no camera movement. A dark hall with tall display alcoves along a
curved wall, standing figures inside. The scene is alive: warm amber chest-lights pulse
rhythmically, alcove lamps flicker softly, steam rises from floor vents, thin fog drifts
across the reflective floor. The figures stay still; only light and atmosphere move.
Cinematic, moody, seamless loop, no flicker artifacts.
```
**Beat 2 — Convergence:**
```
Same scene, static camera. All overhead spotlights slowly swing and converge toward the
center of the floor; the center floor begins to glow with warm amber light and faint
cracks of light; steam bursts gently from the vents. The figures stay still. Dramatic,
cinematic, smooth gradual motion.
```
**Beat 3 — Eruption (cover):**
```
Same scene, static camera. A surge of warm golden light erupts from the center floor and
thick dark smoke rises rapidly, filling the entire frame until the screen is fully covered
in glowing warm haze. Dramatic, cinematic, smooth, no strobing.
```
(❌ jangan pakai: robot/mech/armor/reactor/horror/cyan arcs — pemicu filter + nabrak tema warm.)

### Teknis Page 1
- Export gabungan klip → **~180–240 frame** JPG (1280–1600px, q70–80, total ≲ 12MB). Lebih dari 300 = berat, jangan.
- Render: `<canvas>` + preload semua frame pas loader + GSAP ScrollTrigger scrub (spec & snippet udah di `V2_PROMPT_CLAUDE_CODE.md`).
- User particle (Nehemiah) di tengah: idle breathing → **dissolve** di Beat 2 (~60%) sebelum eruption.

---

## ⏳ TRANSISI — "DEPLOYING UNITS" (~1.5s)
- Trigger: scrub selesai (layar full fog/glow).
- Visual: flavor text mono ("DEPLOYING UNITS…", "CALIBRATING ARSENAL…") + progress kecil + ember particles. BUKAN spinner generik.
- Fungsi tersembunyi: **preload semua aset Page 2** (11 PNG + bg + idle layer).
- `prefers-reduced-motion`: skip scrub → langsung ke Page 2.

---

## 🎮 PAGE 2 — "THE ROSTER" (character-select carousel)

### Layout
- Background = ruangan armory **kosong & terang warm** (pakai frame akhir/relight; cases kosong keliatan = "mereka udah keluar" → nyambung sama narasi Unleashing ✅) + overlay steam/dust CSS.
- **Carousel 3D arc**: 11 robot PNG dalam kurva; tengah = besar/terang/fokus; samping = makin kecil + blur + gelap + `rotateY` (perspektif).
- CSS: `perspective` di container; per-item `translateX/Z + rotateY + scale + brightness/blur` dihitung dari jarak-ke-tengah. Center item dapet spotlight beam + reflection di lantai.

### Interaksi
| Input | Aksi |
|---|---|
| Drag / swipe / wheel / arrow keys | Geser carousel (inertia + **snap** ke unit terdekat, overshoot bounce dikit) |
| Hover (desktop) / focus | Glow warna class + nama + class + **stat bars** (PWR/SPD/DEF) + thumbnail preview |
| Klik / Enter / tap unit tengah | **"VS-screen" expand**: robot zoom + panel detail full (dossier: briefing, loadout/tech, stats, links, screenshots) |
| Esc / RETURN | Balik ke roster |
- Mobile: swipe native, unit label selalu tampil, tap sekali = fokus, tap lagi = detail.
- Keyboard accessible + focus ring jelas.

### Class system (11 unit) — data-driven dari `projects.json`
| # | Nama | Accent | Class | Catatan |
|---|---|---|---|---|
| 01 | CRIMSON | merah | Striker | |
| 02 | AZURE | biru | Guardian | |
| 03 | GOLD | emas | Luminary | |
| 04 | VIOLET | ungu | Phantom | |
| 05 | EMERALD | hijau | Sage | |
| 06 | ORANGE | oranye | Forge | |
| 07 | WHITE | putih | Pure | |
| 08 | SILVER | perak | Mirror | |
| 09 | MAGENTA | magenta | Chaos | |
| 10 | CYAN | cyan | Aqua | accent unit doang — tema ruangan tetap warm |
| 11 | PRIME | gradient amber-merah | Prime | **featured/capstone, default center** |
- Schema tambah: `class`, `accent`, `stats:{pwr,spd,def}`, `screenshots[]`. `status:"coming_soon"` → siluet gelap + "LOCKED".
- Stats = mapping nyata: PWR=kompleksitas teknis, SPD=kecepatan delivery, DEF=robustness/testing (biar gak asal angka).

### Robot PNG (11) — prompt aman
```
Full body front view of a rugged humanoid mech figure, matte black armor plating, exposed
mechanical joints, {ACCENT} glowing accents along the seams and a glowing {ACCENT} chest
core, standing straight at attention, weight on both feet, symmetrical, facing camera,
bright warm studio rim light, photorealistic, highly detailed, isolated on flat neutral
grey background, full body centered. 2:3.
Avoid: text, labels, watermark, weapons, real human face, extra figures.
```
→ ganti `{ACCENT}` per unit (tabel di atas). Pose HARUS seragam. Removebg → `robot-01..11.png`.

---

## 🗺️ ROADMAP EKSEKUSI (urutan, tiap step ada output)
```
M1 — ASET P1: Beat 1→3 video (Path A) + coba Path B 1-2x → export JPG sequence
M2 — ASET P2: bg kosong terang + 11 robot PNG (pose seragam) + projects.json (class+stats)
M3 — BUILD P1: canvas scrub + particle dissolve + transisi "DEPLOYING UNITS"
M4 — BUILD P2: carousel 3D (snap+inertia) + hover stats + VS-screen detail
M5 — POLISH: mobile, keyboard, reduced-motion, perf (≲12MB frames, lazy PNG), deploy
```
Kerja paralel boleh: M1–M2 (generate) bareng M3–M4 (build pakai placeholder).

## ✅ Keputusan yang udah di-lock
- Path A = jalur utama; Path B cuma stretch (max 2 percobaan).
- 11 unit (PRIME featured). Tema ruangan warm; accent per-unit bebas warna.
- Transisi loading 1.5s = penutup jahitan + preloader.
- Page 1 = JPG sequence di canvas (bukan video element, bukan 300 frame).
