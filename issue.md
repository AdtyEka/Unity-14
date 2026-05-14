# Issue: Migrasi Artikel ke Database & CRUD Admin

## Deskripsi Fitur
Mengubah sistem artikel yang saat ini masih hardcoded (`articles.ts`) menjadi dinamis menggunakan database, lengkap dengan fitur manajemen (CRUD) di dashboard admin.

## Tugas Utama

### 1. Database & Model
- Buat model dan migration `Artikel` dengan field: `judul`, `slug` (unique), `deskripsi`, `kategori`, `tags` (json), `penulis`, `gambar`, `content` (json/text), dan `published_at`.
- Buat **Seeder** untuk memindahkan data dari `resources/js/data/articles.ts` ke table `articles`. 
- *Catatan: Jika gambar tidak ditemukan, gunakan placeholder dari Unsplash atau path lokal.*

### 2. CRUD Admin
- Buat `ArtikelController` di `app/Http/Controllers/Admin` (Gunakan `PengurusController` sebagai referensi).
- Buat view CRUD di `resources/js/pages/admin/artikel` (Gunakan `manajemen-pengurus` sebagai referensi UI).
- Daftarkan menu "Manajemen Artikel" di `app-sidebar.tsx` dan `admin/page.tsx`.

### 3. Route & Halaman Publik
- Ubah route statis di `web.php` menjadi dinamis:
    ```php
    Route::get('/artikel', [ArtikelController::class, 'index'])->name('artikel');
    Route::get('/artikel/{slug}', [ArtikelController::class, 'show'])->name('artikel.show');
    ```
- Update komponen `resources/js/pages/artikel/page.tsx` dan `[slug]/page.tsx` agar menerima data dari props backend (Inertia).

## Petunjuk Implementasi
- Pastikan **slug** di-generate otomatis dari judul.
- Gunakan komponen UI yang sudah ada (shadcn/ui) untuk konsistensi.
- Pastikan relasi data (jika ada) ditangani dengan benar.
- Jangan menghapus file `articles.ts` sebelum migrasi data di seeder selesai dipastikan berhasil.

---
*Status: Open*
*Priority: Medium*
