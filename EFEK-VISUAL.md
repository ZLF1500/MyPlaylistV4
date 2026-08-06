# Efek Visual yang Ditambahkan

3 dari 5 source kamu udah diadaptasi ke tema warna Miku (teal `--accent`,
mint `--accent2`, pink `--berry`) dan disambungkan ke `App.jsx`. Ada
panel pengaturan (ikon ⚙️ di sebelah tombol tema, kanan atas) buat
nyalain/matiin tiap efek — pilihanmu disimpan otomatis di browser.

**Neon Cursor & Glowing Tubes Cursor udah dicabut** — dua-duanya efek
WebGL yang lumayan berat (render scene 3D full-screen tiap gerakan
mouse), dan kerasa nge-lag. Kalau suatu saat kamu mau versi yang lebih
ringan (misalnya cuma trail titik-titik sederhana pakai CSS/canvas 2D
tanpa Three.js), bilang aja — itu jauh lebih murah buat browser.

## 1. Electric Border → kartu "Koleksi Unggulan"
File: `src/effects/ElectricBorder.jsx`
Border listrik animasi dari source aslinya (SVG turbulence filter),
warnanya ikut warna masing-masing kartu (`--accent`/`--berry`/`--accent2`).
Toggle: **"Electric border di kartu unggulan"**.

## 2. Glowing Tab Navigation → filter bar (Semua/Top/Daily/Playlist dst.)
File: `src/effects/useGlowTabs.js`
Pil glow yang meluncur ngikutin tab aktif, warnanya teal. Toggle:
**"Glowing tab navigasi"**.

## 3. Heart & Star Animation → burst pas klik "Lagu Favorit" / "Favorit Saya"
File: `src/effects/useHeartBurst.js`

Source aslinya scene Three.js fullscreen ±10.000 partikel + bloom +
panel kontrol sendiri (didesain jadi background, bukan reaksi klik).
Disederhanakan jadi canvas 2D ringan yang tetap "meledakkan" hati +
bintang glow warna Miku di titik klik — ringan dan nggak tabrakan sama
particle field yang udah ada.

## Cara pasang
1. Timpa `src/App.jsx` kamu dengan yang di zip ini.
2. Copy folder `src/effects/` ke project kamu (isinya cuma 3 file sekarang).
3. Tidak ada dependency baru di `package.json`.
4. `npm run dev` seperti biasa.
