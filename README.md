# ZLF Music — Miku Edition

## Cara jalanin
1. `npm install`
2. `npm run dev`
3. Buka http://localhost:5173

## Nambahin sticker Miku kamu
Lihat `public/assets/README.txt`.

## Struktur
`App.jsx` yang tadinya 1000+ baris sekarang dipecah per tanggung jawab:

```
src/
├── main.jsx              entry point, load app.css
├── App.jsx                orchestrator: state + susun layout
├── theme.js                token warna dark/light
├── data/
│   ├── library.js          ID lagu/playlist/artis/album (Spotify)
│   └── stickers.js          posisi & file sticker Miku
├── hooks/
│   ├── useFxSettings.js     toggle efek visual, disimpan ke localStorage
│   └── useNavStack.js       history back/forward buat topbar
├── components/
│   ├── Sidebar.jsx
│   ├── TopBar.jsx           hamburger/back/forward/fx/toggle tema
│   ├── FxPanel.jsx          dropdown pengaturan efek visual
│   ├── Footer.jsx
│   ├── NowPlayingBar.jsx    player bar bawah, gak ke-unmount pas pindah halaman
│   ├── Equalizer.jsx        dekorasi bar equalizer di hero
│   ├── MikuStickers.jsx     sticker yang gonta-ganti tiap 5 detik
│   ├── ParticleField.jsx    partikel bokeh + debu di background
│   └── FloatingNotes.jsx    ikon not/daun bawang yang mengambang
├── pages/
│   ├── HomePage.jsx          hero, stat, koleksi unggulan
│   └── CollectionPage.jsx    halaman Lagu Favorit / Playlist / Artis & Album
├── styles/
│   └── app.css               semua CSS (dulunya inline <style> di App.jsx)
└── effects/                  3 efek visual (electric border, glow tab, heart burst)
    ├── ElectricBorder.jsx
    ├── GlowNav.jsx
    └── useHeartBurst.js
```

`index.html` — Tailwind CDN + Google Fonts. `public/assets/` — taro sticker PNG di sini.
