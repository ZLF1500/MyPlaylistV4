Save file sticker kamu sendiri di sini (bukan hasil crop dari fan art orang
lain ya — pakai gambar yang bener-bener kamu buat/punya hak pakainya) dengan
nama persis seperti ini, biar posisinya otomatis pas:

  miku-hearts-leek.png     -> pose paling "iconic", ditaro deket judul hero
  miku-shy.png             -> pose close-up malu-malu, kecil, deket header
  miku-lemon.png           -> pose makan lemon, ditaro rendah deket stat card
  miku-hug-plush.png       -> pose meluk boneka, di tengah deket featured
  miku-shy-bigpose.png     -> pose paling gede, jadi anchor di bagian bawah
  miku-sleepy.png          -> pose duduk santai, deket footer

Lalu di src/App.jsx, cari komponen MikuStickers, ganti:
  <Sparkles size={18} />
  <span>{s.file}</span>

jadi:
  <img src={`/assets/${s.file}`} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
