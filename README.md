# crootss themes

Tema siap pakai untuk [crootss](https://github.com/crootss/crootss). Slide-nya HTML yang sama, gayanya cukup diganti dengan satu baris CSS.

Dokumentasi: https://crootss.if.co.id/docs/tema/

| Tema | Gaya | Cocok untuk | Inspirasi tren Canva 2026 |
| :-- | :-- | :-- | :-- |
| `poster` | Blok warna penuh, grotesk tebal raksasa, stiker, tekstur kertas | Peluncuran, kelas, pitch yang hidup | Block Party, Zinegeist |
| `gelap` | Panggung gelap, sorot lampu, neon lime/magenta, label monospace | Talk teknis, demo produk | Drama Club, Prompt Playground |
| `minimal` | Serif editorial, ruang lega, garis rambut, aksen terakota | Kuliah, riset, laporan | Opt-Out Era, Explorecore |

## Pakai

Muat tema **setelah** `crootss.min.css`. Font Google ikut dimuat otomatis.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/crootss/crootss@v0.3.0/crootss.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/crootss/themes@v0.3.0/poster.min.css">
<script type="module" src="https://cdn.jsdelivr.net/gh/crootss/crootss@v0.3.0/croot.min.js"></script>
```

Ganti `poster` dengan `gelap` atau `minimal`. Selalu pin versi (lihat [Releases](https://github.com/crootss/themes/releases)), jangan `@latest`.

## Markup

Semua tema memakai class yang sama, jadi berganti tema tidak perlu mengubah HTML.

```html
<section class="croot-node slide t-3 split" data-croot-step="2" data-croot-x="2000" data-croot-ry="-35">
  <div>
    <p class="eyebrow"><b>01</b> Bab</p>
    <h2>Judul slide.</h2>
    <p class="sub">Penjelasan singkat.</p>
  </div>
  <div class="panel"><pre><code>…</code></pre></div>
</section>
```

Slide berukuran 1280×720 (16:9) di desktop dan 720×1280 (9:16) di layar ≤640px.

| Class | Fungsi |
| :-- | :-- |
| `slide` | Wajib di setiap slide (bersama `croot-node`). `tall` = lebih tinggi (900px / 1800px di ponsel). |
| `t-1` … `t-8` | Warna permukaan slide atau kartu. Tiap tema punya 8 warna sendiri. |
| `cover` | Sampul: judul `h1` raksasa + dekorasi. |
| `split` | Dua kolom: teks dan panel/kode. |
| `center` | Satu pernyataan besar di tengah. |
| `cols` | Kolom sejajar (2–4 `div`). |
| `eyebrow` | Label bab, nomor di dalam `<b>`. |
| `lead`, `sub`, `hl` | Teks pengantar besar, teks pendukung, sorotan warna aksen. |
| `big`, `mega` | Angka/kata raksasa. |
| `panel`, `paper` | Kotak kode atau kutipan; `paper` bergaya khas tiap tema. |
| `btn`, `btn ghost`, `tag`, `sticker`, `key` | Tombol, label, stiker miring, tombol keyboard besar. |
| `card`, `window` | Node anak 1280×720 yang bisa di-zoom; `window` dengan bilah jendela (`<p class="chrome"><i></i><i></i><i></i></p>`). |
| `hud`, `hud-btn`, `hud-pos` | Bilah navigasi melayang (opsional). |
| `hud-idle` | Pada `hud`: sembunyikan bilah saat penonton diam (dipasang JS-mu; contoh di `demo/main.js`). |

Posisi node anak sebaiknya ditulis di CSS sebagai custom property supaya bisa berbeda di ponsel:

```css
#kartu-1 { --croot-x: -410; --croot-y: 150; --croot-scale: .28; }
@media (max-width: 640px) {
  #kartu-1 { --croot-x: 0; --croot-y: -90; --croot-scale: .36; }
}
```

Kalau kamu mengatur sendiri ukuran teks raksasa, kalikan dengan `--th-wide` supaya tetap muat di tema berfont lebar: `font-size: calc(240px * var(--th-wide));`.

## Diagram dan animasi

Big picture presentasi biasanya berupa diagram. Semua komponen berikut murni CSS, memakai warna tema, dan tanpa JavaScript tambahan.

| Class | Fungsi |
| :-- | :-- |
| `dg` | Pada `<svg>`: wadah diagram bebas (concept map, system context, rich picture). |
| `dg-edge` (+`dotted`/`dashed`) | Garis/panah `<path>`; jarak titik lewat `--dg-gap`. |
| `dg-box`, `dg-label`, `dg-head` | Kotak, label pil (`<g>` berisi `<rect>` + `<text>`), isi `<marker>` mata panah. |
| `bmc` + `bmc-kp`…`bmc-rv` | Business Model Canvas: 9 blok node anak yang bisa di-zoom, posisinya sudah diatur (desktop dan ponsel). |
| `flow`, `timeline` | Pada `<ol>`: alur berpanah, garis waktu. |
| `a-draw`, `a-flow`, `a-in`, `a-float`, `a-spin`, `a-pulse`, `a-blink` | Animasi yang hanya berjalan di node aktif (`a-draw` butuh `pathLength="1"`). |

Contoh lengkap ada di `demo/` (slide Diagram, Business Model Canvas, Alur dan waktu) dan di https://crootss.if.co.id/docs/big-picture/.

## Gerak

Hanya slide aktif yang bergerak: isinya masuk bergiliran tepat sebelum kamera tiba, lalu `sticker`, `key`, dan dekorasi tema bergerak pelan selama slide tampil. Animasi memakai properti `translate`/`rotate`/`scale` (bukan `transform`) dan mati otomatis bila sistem meminta "kurangi gerakan". Keyframes `th-in`, `th-float`, `th-spin`, `th-wobble`, dan `th-blink` boleh dipakai ulang, misalnya `.croot-active .logo { animation: th-float 6s ease-in-out infinite; }`.

Tanpa JavaScript, semua slide tampil sebagai dokumen biasa yang tetap terbaca.

## Membuat tema baru

1. Salin salah satu tema, misalnya `minimal.css`, dengan nama baru.
2. Isi token `--th-*` di `:root`: warna halaman, font, 8 warna permukaan (`--th-s1` … `--th-s8` beserta `--th-on-*`), panel, tombol, dan aksen. Untuk font display yang lebar, turunkan `--th-wide` (default `1`).
3. Tambahkan dekorasi khas lewat `::before` / `::after` pada `.cover`, `.center`, dan seterusnya.
4. Cek di `demo/` untuk desktop dan ponsel (±390px).

Layout bersama ada di `base.css`. Ubah file itu hanya untuk hal yang berlaku di semua tema.

## Demo lokal

ES module tidak bisa dimuat dari `file://`. Dari root repo jalankan `python3 -m http.server 8080`, lalu buka `http://localhost:8080/demo/`. Tombol tema ada di bilah bawah, atau pakai `?tema=gelap`.

## Rilis

Otomatis. Setiap push ke `main` yang mengubah file `*.css` membuat tag dan GitHub Release (lihat `.github/workflows/release.yml`). Naik versi mengikuti pesan commit: `feat:` → minor, `feat!:` / `BREAKING CHANGE` → major, lainnya → patch. Bisa dipaksa dengan `#minor` / `#major`.

jsDelivr menyajikan `*.min.css` yang di-minify otomatis dari file di tag; `base.css` dimuat lewat `@import` relatif. Release juga menyertakan bundel satu file per tema untuk diunduh.

## Lisensi

GPL-3.0. Lihat `LICENSE`.
