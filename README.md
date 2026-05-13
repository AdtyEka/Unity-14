# Panduan Instalasi Docker & Konfigurasi

Project ini menggunakan **Docker Compose** terpusat untuk menjalankan **Laravel App**, **Queue Worker**, **MySQL Database**, dan **ML Service** secara bersamaan.

## Prasyarat
- [Docker](https://docs.docker.com/get-docker/) terinstal di mesin Anda.
- [Docker Compose](https://docs.docker.com/compose/install/) terinstal.

## 1. Persiapan Environment
File `docker-compose.yml` utama dirancang untuk environment production di mana port tidak diekspos langsung ke host (agar bisa berjalan dengan aman di balik proxy). Oleh karena itu, kita membutuhkan file tambahan untuk pengaturan environment lokal.

1. Buat file `.env.docker` dengan menyalin file contoh yang telah disediakan:
   ```bash
   cp .env.docker.example .env.docker
   ```
2. Buat file `docker-compose.override.yml` untuk mode development (berfungsi untuk mengekspos port aplikasi ke laptop Anda):
   ```bash
   cp docker-compose.override.yml.example docker-compose.override.yml
   ```
   *Secara default, override ini akan membuka akses aplikasi web di port `8000`, ML service di `8080`, dan Database di `3306` atau `3309` sesuai konfigurasi.*

## 2. Menjalankan Aplikasi
Setelah environment siap, Anda dapat mulai membangun dan menjalankan semua service docker:

```bash
# Menjalankan container (tambahkan --build jika baru pertama kali, arsitektur berubah, atau ada pembaruan package)
docker-compose up -d --build
```

### 3. Migrasi Database (Pertama Kali Saja)
Setelah container berhasil berjalan, database MySQL masih dalam keadaan kosong. Jalankan perintah migrasi tabel di dalam container aplikasi:
```bash
docker-compose exec app php artisan migrate
```
Jika Anda membutuhkan data awal (dummy), tambahkan parameter seed:
```bash
docker-compose exec app php artisan migrate --seed
```

### 4. Mengakses Aplikasi
- **Aplikasi Web**: Buka `http://localhost:8000` di browser komputer Anda.
- **ML Service**: Dapat diakses di `http://localhost:8080`.

---

## Aturan Konfigurasi Penting

1. **Host Database (.env.docker)**: Jangan gunakan `127.0.0.1` atau `localhost` sebagai `DB_HOST`. Karena berjalan di network Docker, gunakan hostname `db`.
2. **ML Service URL (.env.docker)**: Untuk komunikasi internal antar container (Laravel ke ML Service), wajib menggunakan hostname container. Pastikan memiliki baris ini:
   `ML_SERVICE_BASE_URL=http://unity_ml_service:8080`
3. **Persistensi Data (Volume)**: Direktori database dan source code telah di-mount. Perubahan kode Anda di luar Docker akan langsung terbaca ke dalam container. Data MySQL pun tidak akan terhapus apabila Anda mematikan container (`docker-compose down`).
4. **Queue Worker**: Background job untuk Queue di-handle oleh container tersendiri (`unity_worker`). Jika Anda mengubah baris kode yang dieksekusi oleh Job (seperti `RunStuntingPrediction`), worker harus dimuat ulang:
   ```bash
   docker-compose restart worker
   ```
5. **Abaikan File di Git**: File konfigurasi environment utama `.env.docker` dan pengaturan port lokal `docker-compose.override.yml` telah dimasukkan ke dalam `.gitignore` sehingga pengaturan personal Anda tidak ikut masuk ke *version control*.
