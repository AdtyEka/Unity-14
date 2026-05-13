# Issue: Implementasi Fitur Ekspor Data Admin

## Deskripsi Singkat
Implementasikan fitur ekspor data laporan (Mingguan, Bulanan, Tahunan) berdasarkan tampilan UI yang sudah ada di `resources/js/pages/admin/ekspor/page.tsx`. Pemrosesan unduhan laporan harus berjalan di background menggunakan Laravel Worker, dan riwayat laporan disimpan di database.

## Kebutuhan Fitur (Requirements)

### 1. Perubahan UI (Frontend - React/Inertia)
File target: `resources/js/pages/admin/ekspor/page.tsx`
- **Hapus Cakupan Wilayah**: Hilangkan seluruh elemen UI (termasuk label dan tombol) yang berkaitan dengan "Cakupan Wilayah / Fasyankes".
- **Logika Filter Tanggal (Date Constraint)**: 
  Implementasikan validasi/batasan pada input "Dari Tanggal" dan "Sampai Tanggal" berdasarkan "Jenis Laporan" yang dipilih secara dinamis:
  - **Mingguan**: Rentang pilihan tanggal (Dari hingga Sampai) maksimal adalah 7 hari.
  - **Bulanan**: Rentang pilihan tanggal maksimal adalah 1 bulan (atau implementasikan input bulan).
  - **Tahunan**: Rentang pilihan tanggal maksimal adalah 1 tahun (atau implementasikan input tahun).
  *(Saran: Cegah user agar tidak bisa men-submit form jika rentang tanggal melebihi batas).*
- **Integrasi Form & Daftar Laporan**: 
  - Gunakan helper form Inertia atau action untuk mengirim payload request saat tombol "Buat Laporan" diklik.
  - Ganti *dummy data* (`recentSeed`) pada panel "Laporan Terakhir" dengan data riwayat ekspor yang aktual (didapatkan dari props backend).
  - Tombol download pada daftar laporan harus bisa mengunduh file yang sudah selesai di-generate.

### 2. Backend (Laravel - Controller, Route, Job, Model)
- **Route**:
  - Buat route `GET` untuk menampilkan halaman ekspor (dan memuat data laporan terakhir).
  - Buat route `POST` untuk menerima *request* ekspor data baru.
- **Controller (`AdminExportController`)**:
  - Validasi *request* rentang tanggal sesuai dengan jenis laporan di sisi backend.
  - Saat ada permintaan ekspor, simpan data *request* tersebut ke dalam tabel riwayat dengan status `pending`, kemudian *dispatch job* ke worker.
- **Database & Model (misal: `ExportRequest`)**:
  - Buat migration dan model untuk tabel penyimpanan riwayat unduhan dengan field seperti `user_id`, `tipe_laporan`, `format`, `start_date`, `end_date`, `status` (`pending`, `processing`, `completed`, `failed`), dan `file_path`.
- **Background Processing (Laravel Job)**:
  - Buat Laravel Job (misal: `ProcessExportJob`).
  - Job bertugas mengambil data dari database sesuai rentang tanggal, menghasilkan file laporan (PDF, XLSX, CSV), lalu menyimpannya ke disk (`storage`).
  - Setelah berhasil, *update* status pada tabel riwayat menjadi `completed` beserta *path* lokasi filenya.

### 3. Penyesuaian Navigasi Sidebar
- Temukan komponen layout sidebar yang bersangkutan.
- Pastikan menu "Ekspor" menunjuk ke route yang baru dibuat menggunakan URL routing yang benar (misalnya via `wayfinder` atau route Laravel yang sudah dibuat), dan *active state* menyala ketika berada di halaman tersebut.

## Kriteria Penerimaan (Acceptance Criteria)
- [ ] Bagian "Cakupan Wilayah" berhasil dihapus dari UI.
- [ ] Input tanggal hanya bisa diisi sesuai dengan batasan Jenis Laporan (Mingguan, Bulanan, Tahunan).
- [ ] Form ekspor berhasil mengirimkan *request* ke backend dan me-*return* status tanpa *blocking* (karena diproses di *background*).
- [ ] Proses *export* dokumen berjalan dengan Laravel Worker dan tercatat di database.
- [ ] Data "Laporan Terakhir" menampilkan antrean dan file yang bisa diunduh oleh user dengan tepat.
- [ ] Sidebar menavigasikan user ke halaman ekspor tanpa error.
