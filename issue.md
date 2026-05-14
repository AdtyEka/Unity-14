# Issue: Fitur Rekomendasi AI Berdasarkan Hasil Prediksi

## Deskripsi Singkat
Kita perlu menambahkan sistem untuk membuat rekomendasi intervensi/tindakan secara otomatis berdasarkan hasil prediksi AI dan data SHAP values. Rekomendasi ini akan di-generate menggunakan layanan AI eksternal dan hasilnya akan disimpan ke dalam database untuk dikaitkan dengan data pemeriksaan pasien.

## Kriteria Penerimaan (Acceptance Criteria)

1. **Skema Database & Model**
   - Buat tabel (migration) dan Model baru untuk menyimpan data rekomendasi.
   - Tabel ini harus memiliki relasi `BelongsTo` (foreign key) ke tabel `pemeriksaan`.

2. **Integrasi AI Eksternal**
   - Buat Service Class khusus untuk menangani request ke layanan AI eksternal (`base-prompt.ai`).
   - Siapkan prompt dengan menggabungkan data SHAP dan format instruksi dari file `prompt-rekomendasi.txt`.
   - Implementasikan *error handling* yang baik (seperti *timeout* dan *retry mechanism*) ketika memanggil API eksternal.

3. **Modifikasi Job Prediksi (`RunStuntingPredictionJob`)**
   - Update `RunStuntingPredictionJob` yang sudah ada.
   - Trigger pembuatan rekomendasi **hanya setelah** proses prediksi utama dan kalkulasi SHAP selesai dilakukan dengan sukses.
   - *Best Practice*: Dispatch proses pemanggilan AI rekomendasi ini sebagai Job Queue baru (misal: `GenerateRecommendationJob`) agar tidak memblokir atau memperlama eksekusi `RunStuntingPredictionJob`.

4. **Penyimpanan Data**
   - Tangkap *response* teks dari AI eksternal dan simpan ke tabel rekomendasi yang sudah dibuat pada poin 1.

## Panduan Pengerjaan
- **High-Level Design**: Hindari menumpuk logika pemanggilan API di dalam Job. Gunakan Service Class terpisah untuk integrasi API.
- **Reliability**: Pastikan kegagalan pada saat generate rekomendasi (misal API eksternal down) tidak membatalkan atau merusak data hasil prediksi utama yang sudah berhasil disimpan.
- Ikuti standar *best practice* Laravel dan konvensi kode yang sudah ada di proyek ini.
