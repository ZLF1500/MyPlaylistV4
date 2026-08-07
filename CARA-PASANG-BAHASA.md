# Fitur Pilihan Bahasa — Cara Pasang

## Yang ditambahkan
- `src/i18n/` — sistem bahasa baru:
  - `locales/en.js, id.js, ms.js, ja.js, zh.js, ko.js, ar.js` — dictionary manual, natural, instan (tanpa reload).
  - `languages.js` — daftar 7 bahasa inti + daftar bahasa lain (Spanyol, Prancis, dll).
  - `LanguageContext.jsx` — context React (`useLanguage()` hook, fungsi `t(key)`).
- `src/components/LanguageSwitcher.jsx` — dropdown bahasa baru (menggantikan div statis "🇮🇩 Indonesia" di sidebar).
- `src/styles/i18n.css` — style dropdown + dukungan RTL (Arab) + rapiin widget Google Translate.

## Cara kerja
- **7 bahasa inti** (EN/ID/MS/JA/ZH/KO/AR): ganti bahasa **instan**, tanpa reload, teksnya aku tulis manual — jadi natural, bukan hasil mesin.
- **Bahasa lain** (Spanyol, Prancis, Rusia, Hindi, dll — ada di submenu "Other languages"): pakai **Google Translate widget** yang jalan di background, otomatis translate seluruh halaman. Ini butuh koneksi internet & akan reload halaman sekali saat dipilih.
- Default: **English**, tersimpan otomatis di browser (localStorage), jadi kalau user balik lagi bahasa pilihannya diingat.
- Bahasa Arab otomatis bikin layout jadi RTL (kanan-ke-kiri).

## Cara pasang di project kamu
1. Timpa seluruh isi folder `src/` project kamu dengan folder `src/` di zip ini (semua file lama yang nggak berubah ikut disalin juga, jadi aman ditimpa semua).
2. Timpa `index.html` di root project kamu (nambah script Google Translate + `lang="en"`).
3. Tidak ada dependency baru di `package.json` — semua pakai `lucide-react` yang udah ada.
4. `npm run dev` seperti biasa.

## Kalau mau nambah bahasa baru nanti
1. Bikin file baru `src/i18n/locales/xx.js` (copy dari `en.js`, terjemahin semua value-nya).
2. Import & daftarin di `src/i18n/languages.js`:
   ```js
   import xx from "./locales/xx.js";
   export const locales = { en, id, ms, ja, zh, ko, ar, xx };
   export const coreLanguages = [ ...yang lama..., { code: "xx", label: "Nama Bahasa", flag: "🏳️" } ];
   ```
   Selesai — otomatis muncul di dropdown.

## Catatan penting
- Sengaja **tidak** pakai Google Translate untuk 7 bahasa utama, karena project ini React (SPA) yang sering ganti halaman tanpa reload — Google Translate kadang konflik sama React kalau dipaksa translate live pas komponen lagi berubah (bisa nge-crash). Dictionary manual jauh lebih stabil untuk itu.
- Ada 1 bug kecil di kode lama yang ikut kefix: kartu "Favorit Saya" di Home dulu ngecek `f.title === "Favorit Saya"` buat trigger heart-burst — kalau judulnya udah diterjemahkan ke bahasa lain, pengecekan itu bakal gagal. Sekarang diganti pakai key internal (`f.key === "myFavorites"`) yang nggak ikut berubah walau bahasa ganti.
