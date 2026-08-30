# Redesign Portfolio — Editorial Direction

## Konteks

Portfolio ini dibangun dengan Next.js, terdiri dari halaman: **Home, Pengalaman, Proyek, Sertifikat, Blog, Course, Kontak**.

Desain saat ini bertema dark space dengan gradient warna-warni di teks hero, kartu ber-glow neon, dan ikon tech stack warna-warni. Desain ini terasa ramai dan generik (mirip template portfolio developer pada umumnya).

Tujuan redesign: mengganti seluruh tampilan ke arah **editorial-serius** — tenang, presisi, seperti profil di majalah bisnis (gaya McKinsey Insights / HBR), bukan landing page SaaS. Ini harus mencerminkan identitas ganda saya: HR Supervisor (Compensation & Benefits, HRIS) dengan 9 tahun pengalaman, sekaligus Full Stack Developer.

Terapkan design system di bawah ini **secara konsisten ke semua halaman**, bukan cuma home.

---

## Design tokens

### Warna

```
--bg: #1B1C1E        /* charcoal, latar utama */
--bg-elevated: #202124
--text-primary: #EDEBE4   /* off-white hangat */
--text-secondary: #A5A39A
--text-muted: #6B6A64
--border: #2E2F31
--accent: #A2895B    /* bronze pudar — SATU-SATUNYA warna aksen di seluruh web */
```

Aturan ketat: **jangan tambah warna aksen lain**. Tidak ada gradient, tidak ada glow/shadow neon, tidak ada warna berbeda per section. Semua section berbagi palet yang sama persis.

Jika situs sebelumnya punya light mode, buat versi light dengan logika yang sama: bg terang hangat (mis. `#F4F3EF`), text gelap (`#1B1C1E`), accent bronze tetap sama (`#8A6F3F` sedikit digelapkan untuk kontras).

### Tipografi

- Display/heading: **Fraunces** (serif, variable font, opsz axis) — dipakai untuk semua `h1`–`h3`, pull quote, dan angka statistik.
- Body/UI: **Inter** — dipakai untuk paragraf, nav, tombol, label.
- Gunakan italic Fraunces untuk memberi penekanan pada 1 kata kunci di tiap headline (bukan bold, bukan warna berbeda-beda per huruf).
- Load via `next/font/google`, bukan `@import` di CSS.

### Spacing dan struktur

- Container max-width-5xl , center, padding horizontal `40px` (`24px` di mobile).
- Section padding vertikal: `96px` desktop, `56px` mobile.
- Setiap section pakai pola dua kolom: kolom kiri sempit (`role-tag` — label kecil uppercase + border-left bronze), kolom kanan konten utama. Di mobile, stack jadi satu kolom.
- Pemisah antar-elemen pakai garis tipis `1px solid var(--border)`, bukan card dengan shadow/glow.

---

## Komponen yang perlu dibuat (reusable)

Buat di `components/editorial/`:

1. **`SectionHeader`** — props: `tag` (label kecil), `title` (bisa mengandung satu span italic beraksen). Layout dua kolom seperti dijelaskan di atas.
2. **`RoleTag`** — label uppercase kecil dengan border-left bronze, dipakai berulang di setiap section.
3. **`NumberedList`** — daftar item dengan nomor italic serif (01, 02, dst), dipisah garis horizontal. Ganti semua "feature card" dan grid ikon lama dengan ini.
4. **`PullQuote`** — kutipan besar italic serif dengan tanda kutip beraksen bronze, dipakai untuk motto/testimoni.
5. **`StatRow`** — baris angka statistik sederhana (angka besar serif + label kecil di bawah), ganti "metric card" lama.
6. **`Nav`** — nama di kiri (serif kecil), menu di kanan (sans, spasi lebar), tanpa background solid, cuma border-bottom tipis saat scroll.

Referensi visual lengkap ada di 4 file mockup HTML terlampir (hero, services, tech stack, about) — pakai itu sebagai acuan struktur dan hierarki, bukan untuk di-copy-paste HTML-nya mentah-mentah (perlu dikonversi ke komponen React/Tailwind sesuai stack proyek).

---

## Penerapan per halaman

### Home

- **Hero**: headline serif besar dengan satu kata italic beraksen (bukan lagi "Halo, saya Faqih" dengan gradient rainbow). Kolom kiri: role tag + deskripsi singkat + `StatRow` vertikal. Kolom kanan: headline + lead paragraph + signature line (garis + nama italic) + dua tombol teks minimal (bukan tombol solid ber-shadow).
- **Apa yang Saya Kerjakan**: ganti 4 kartu neon jadi `NumberedList` (01–04).
- **Apa yang Saya Gunakan**: ganti grid logo (yang saat ini ada duplikat) jadi daftar teks dikelompokkan per kategori (Frontend / Backend and data / HR and produktivitas) — tanpa ikon.
- **Siapa Saya**: `SectionHeader` + body text + `PullQuote` untuk motto + `StatRow` di bawah. Foto tetap ada tapi ganti crop oval-asimetris jadi persegi/rounded tipis (`border-radius: 2px`), tanpa elemen dekoratif melayang di sekitarnya.
- **Testimoni**: pertahankan carousel tapi ganti card jadi tanpa border neon — cukup border tipis `var(--border)`, quote pakai `PullQuote` style.
- **GitHub contribution graph**: pertahankan fungsinya, tapi ganti warna hijau terang jadi gradasi dari `var(--border)` ke `var(--accent)` (monokromatik bronze), bukan hijau GitHub default.
- **Footer/CTA**: tombol "Hubungi Saya" jadi teks dengan underline bronze saat hover, bukan tombol dengan border glow.

### Pengalaman

- Timeline pengalaman kerja pakai pola `NumberedList` yang sama seperti section layanan — setiap posisi/perusahaan jadi satu item bernomor dengan garis pemisah.

### Proyek

- Grid/list proyek: setiap proyek jadi baris dengan judul serif + deskripsi singkat + tag teknologi sebagai teks kecil (bukan badge warna-warni), dipisah garis horizontal — konsisten dengan `NumberedList`.

### Sertifikat

- Sama seperti Proyek: daftar bernomor atau tabel sederhana (nama sertifikat, penerbit, tahun) dengan tipografi konsisten, bukan grid kartu.

### Blog

- List artikel: judul serif, tanggal dan kategori sebagai teks kecil `text-muted`, tanpa thumbnail besar bergaya card — cukup garis pemisah antar-artikel, mirip daftar isi majalah.

### Course

- Sama pola dengan Proyek/Sertifikat.

### Kontak

- Form sederhana, input dengan underline saja (bukan box dengan border penuh), tombol submit teks dengan underline bronze.

---

## Yang harus dihindari

- Jangan pakai gradient di teks atau background mana pun.
- Jangan pakai box-shadow atau glow/neon effect.
- Jangan pakai lebih dari satu warna aksen di seluruh situs.
- Jangan pakai numbered marker (01/02) di section yang isinya bukan urutan/proses asli — hanya untuk daftar item (services, pengalaman, proyek) yang memang berupa daftar.
- Pertahankan responsivitas: dua kolom jadi satu kolom di breakpoint mobile, ukuran font headline diturunkan proporsional.

## Urutan pengerjaan yang disarankan

1. Setup font (Fraunces + Inter) dan CSS variables/Tailwind theme tokens.
2. Bangun komponen reusable di atas.
3. Redesign Home dulu (paling banyak section, jadi acuan pola untuk halaman lain).
4. Terapkan pola yang sama ke Pengalaman, Proyek, Sertifikat, Course, Blog, Kontak.
5. Cek konsistensi lintas halaman: spacing, warna, tipografi harus identik di semua tempat.
