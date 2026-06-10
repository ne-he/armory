# 🛰️ THE GHOST ARMORY — Master Blueprint v2
> Konsep matang yang nyatuin dua ide: **Page 1 = scroll cinematic (gelap→nyala, video di-scrub)** + **Page 2 = Hybrid Composite (robot PNG interaktif di atas video/still)**. Supersede eksplorasi di `jarvis_hall/00–05`. Stack: **vanilla HTML/CSS/JS + GSAP ScrollTrigger** (ringan, gak WebGL → gak ngelag).

---

## ⭐ NORTH STAR (1 kalimat)
Visitor buka layar gelap, ada Nehemiah (partikel hologram) sendirian; saat scroll, ruangan "menyala" mengungkap 10 robot di display case; Nehemiah memudar ("the creator steps back, the work speaks"), lalu tiap robot bisa di-hover & diklik buat liat projek.

## 🎨 AESTHETIC LOCK
Semua **TETAP GELAP & dramatis** dari awal sampai akhir. "Nyala" ≠ ruangan terang — "nyala" = robot power-on, **spotlight fokus** turun per alcove (pools of light in darkness). **Robot = sumber cahaya**: glow WARM amber/putih dari mata/core/seam, melawan ruangan cool-dark. Kontras dingin-ruangan vs hangat-robot = signature look (kayak mobil mewah reveal di garasi gelap). ❌ Bukan ruangan flood-terang · ❌ bukan orange-rata · ❌ bukan cyan.

---

## 🎬 THE JOURNEY (3 fase, 1 scroll)
| Fase | Scroll | Yang terjadi | Visual |
|---|---|---|---|
| **1. Dark Stage** | 0–40% | Layar gelap. Nehemiah (partikel) glow di tengah, idle breathing, hoverable ("About Me"). Robot = bayangan samar. Hint "Scroll to Activate". | Hampir hitam total |
| **2. Awakening** | 40–80% | Scroll men-scrub Video 1: cahaya naik, lampu display case nyala satu-satu, robot muncul sebagai **rangka cahaya (ghost)**. Nehemiah mulai glitch → dissolve (partikel explode keluar). | Gelap → terang |
| **3. Arsenal** | 80–100% + settle | **Match-cut**: crossfade ke latar terang + 10 **Robot PNG full-color** fade-in (staggered) di posisi display case. Nehemiah hilang. Hover → glow + judul projek. Klik → panel detail. | Terang penuh, interaktif |

---

## 🧱 ARSITEKTUR LAYER (z-index per fase)
```
FASE 1–2 (Page 1)                       FASE 3 (Page 2)
z0  Video 1 (scrub gelap→terang)        z0  Latar terang (still/loop) + CSS ambient
z1  Nehemiah particle (idle→dissolve)   z1  Robot PNG 01–10 (absolute, match posisi)
z2  Vignette overlay (90%→0%)           z2  Glow per-robot (muncul saat hover)
z3  UI hint ("Scroll to Activate")      z3  UI projek (judul, panel detail)
                                        z4  Cursor reticle (opsional)
```
**Prinsip Layer Cake tetap berlaku:** robot = element DOM sendiri (PNG), BUKAN ke-bake di video → makanya bisa di-hover/klik native (gak butuh Raycaster, gak butuh 3D).

---

## 🔬 TEKNIK INTI
1. **Video scrubbing (GSAP ScrollTrigger):** `currentTime` video diikat ke scroll, `pin:true`, `scrub:0.5`. ✅ Doc-mu udah bener: **pakai MP4 di-scrub, JANGAN 150 JPG** (memory bloat, mobile crash).
2. **Preload wajib:** Video 1 harus `preload="auto"` & ke-buffer penuh sebelum scrub, kalau enggak patah-patah. → makanya ada **loading screen "System Booting"** buat nyamarin preload.
3. **Match-cut (titik 80%):** robot di Video 1 cuma "ghost outline" (gak detail) → pas crossfade ke PNG detail, mata gak nuntut presisi → kerasa "power-up", bukan "ganti gambar". Smart.
4. **Robot PNG positioning:** koordinat `%` hardcoded match display case. Ukur di Figma/Photoshop dari frame video.
5. **Particle dissolve:** tsParticles "explode" radial keluar > fade biasa. Lebih sinematik.

---

## 🎨 ASET PRODUKSI (lihat `V2_ASSET_PROMPTS.md` buat prompt final)
| Aset | Format | Jml | Spec |
|---|---|---|---|
| Video 1 "Awakening" | MP4 | 1 | 5–8s, **kamera STATIC mutlak**, gelap→terang, robot sebagai ghost-light |
| Latar Page 2 | Still/MP4 | 1 | Sama persis perspektif frame akhir Video 1, terang, **tanpa robot** (atau siluet) |
| Nehemiah particle | tsParticles | 1 | Dari fotomu (reuse teknik `hoverpart`), glow, hoverable, bisa dissolve |
| Robot PNG | PNG transparan | 10 | Full-color, pose identik (standing, facing camera), match lighting latar |
| Robot glow map | PNG/CSS | 10 | Opsional — buat efek nyala saat hover (bisa CSS murni) |

---

## ⚠️ GAP YANG GUE ISI (rekomendasi gue) + yang perlu LO putusin

**✅ FILL 1 — Copyright (KRITIS):** Doc-mu nyebut "Real Steel", "Zeus", "Iron Man", "Mark-IV", "arc reactor", "Jarvis" — itu **semua bermasalah** (generator bisa nolak/legal). Gue ganti ke deskriptor aman:
> `rugged humanoid combat mech` · `matte black armor plating with exposed hydraulic joints` · `glowing eye slits + glowing chest core` · `sleek powered-armor styling`. (Vibe Real-Steel×Iron-Man kena, tanpa nyebut IP.)

**✅ FILL 2 — Hapus risiko match-cut (SIMPLIFIKASI):** Daripada 2 video yang harus match pixel-perfect (rawan glitch), **Page 2 pakai STILL = frame akhir Video 1** (terang, tanpa robot) + ambient CSS/canvas (debu, flicker). **Gak perlu Video 2, gak ada risiko jump.** Lebih ringan & aman. (Video 2 jadi opsional kalau mau ekstra hidup.)

**✅ FILL 3 — Mobile:** scroll-scrub kadang janky di HP. Fallback: di mobile, awakening auto-play sekali (atau tap-to-activate), lalu arsenal = **swipe carousel** + tap buka detail. Label nama selalu tampil (no hover).

**✅ FILL 4 — Audio:** browser blok autoplay audio. Audio (hum/power-up/sfx) cuma nyala **setelah klik pertama** + ada toggle "🔊 sound". 

**✅ FILL 5 — Accessibility/reduced-motion:** `prefers-reduced-motion` → skip scrub, langsung tampil arsenal terang + list projek HTML (juga bagus buat SEO/ATS recruiter).

**✅ FILL 6 — Konten bawah arsenal:** default = arsenal jadi hero; di bawahnya (scroll lanjut) opsional **About + Contact** ringkas. Bisa ditambah belakangan.

**❓ DECISION (gue tanya di chat):** (1) tool generate image & video yang lo punya, (2) palette "dark→light"-nya warna apa (lo bilang "jangan cyan"), (3) konfirmasi vibe robot. Ini nge-gate semua generate, makanya gue tanya dulu.

---

## 🗺️ ROADMAP (4 milestone, tiap milestone = hasil keliatan)
```
📌 THE GHOST ARMORY
├── M1: ASET — master-skeleton → Video 1 (awakening) → 10 robot PNG → particle setup
│   ✅ Done when: punya 1 video gelap→terang + 10 PNG transparan + particle jalan
├── M2: PAGE 1 ENGINE — GSAP scrub video + particle idle + dissolve + vignette
│   ✅ Done when: scroll nge-scrub video mulus + Nehemiah dissolve di 70%
├── M3: ARSENAL — match-cut ke still + 10 PNG fade-in + hover glow + klik panel detail
│   ✅ Done when: 10 robot hoverable + panel projek kebuka, gak ngambang
└── M4: POLISH — loading "booting", mobile carousel, audio toggle, reduced-motion, perf, deploy
    ✅ Done when: mulus di HP + ke-deploy publik
```

---

## 🧠 IDE TAMBAHAN (dari doc-mu — gue setujui, masuk M4)
- **Holographic cursor**: reticle yang "lock-on" pas hover robot.
- **Project = "Spec Sheet"**: panel detail bergaya HUD (nama projek = "model designation", tech stack = "components", screenshot = "schematics", + stat bar). Keren & on-theme. *(Hindari "Mark-IV" → pakai kode unitmu: PULSE, AETHER, dst.)*
- **Power-up sound**: hum (fase 1) → pitch naik (fase 2) → ambient lab (fase 3). Setelah interaksi user.

---

## 🛠️ STACK & DEPLOY
- **Build:** vanilla HTML/CSS/JS + **GSAP** (+ ScrollTrigger) + **tsParticles**. Self-contained, gak perlu framework.
- **Data:** `projects.json` (schema: `{id,name,type,accent,image,summary,description,tech[],links{},status}`).
- **Tempat ngoding:** Antigravity + Claude Code (bukan artifact sandbox — biar gak lag pas test video).
- **Deploy:** static → Vercel/Netlify (drag & drop folder).
