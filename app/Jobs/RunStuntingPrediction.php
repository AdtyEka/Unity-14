<?php

namespace App\Jobs;

use App\Models\HasilPrediksi;
use App\Models\Pemeriksaan;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class RunStuntingPrediction implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public Pemeriksaan $pemeriksaan)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $pasien = $this->pemeriksaan->pasien;

        // 1. Hitung usia bayi dalam bulan
        $tanggalLahir = Carbon::parse($pasien->tanggal_lahir);
        $tanggalPemeriksaan = Carbon::parse($this->pemeriksaan->tanggal_pemeriksaan);
        $usiaBulan = (int) $tanggalLahir->diffInMonths($tanggalPemeriksaan);

        // 2. Jika usia < 12 atau > 60 bulan — jangan hit API
        if ($usiaBulan < 12 || $usiaBulan > 60) {
            Log::info("Prediction skipped for Pasien ID: {$pasien->id} (Usia: {$usiaBulan} bulan)");

            return;
        }

        // 3. Encode jenis_kelamin: Laki-laki → 1, Perempuan → 2
        $jenisKelamin = $pasien->jenis_kelamin === 'Laki-laki' ? 1 : 2;

        // 4. Hit API ML menggunakan Laravel HTTP Client
        try {
            $response = Http::baseUrl(config('services.ml_service.base_url'))
                ->timeout(15)
                ->post('/api/v1/predict', [
                    'jenis_kelamin' => $jenisKelamin,
                    'umur_bulan' => $usiaBulan,
                    'tinggi_cm' => (float) $this->pemeriksaan->tinggi_badan,
                    'berat_kg' => (float) $this->pemeriksaan->berat_badan,
                ]);

            if ($response->successful()) {
                $data = $response->json();

                // 5. Simpan ke tabel hasil_prediksis
                HasilPrediksi::create([
                    'pemeriksaan_id' => $this->pemeriksaan->id,
                    'prediction' => $data['prediction'],
                    'prediction_label' => $data['prediction_label'],
                    'z_score' => $data['z_score'],
                    'confidence' => $data['confidence'],
                    'shap_jenis_kelamin' => $data['shap_values']['jenis_kelamin'],
                    'shap_umur_bulan' => $data['shap_values']['umur_bulan'],
                    'shap_tinggi_cm' => $data['shap_values']['tinggi_cm'],
                    'shap_berat_kg' => $data['shap_values']['berat_kg'],
                ]);

                Log::info("Prediction successful for Pemeriksaan ID: {$this->pemeriksaan->id}");
            } else {
                Log::error("ML Service error for Pemeriksaan ID: {$this->pemeriksaan->id}", [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
            }
        } catch (\Exception $e) {
            Log::error("Failed to hit ML Service for Pemeriksaan ID: {$this->pemeriksaan->id}", [
                'error' => $e->getMessage(),
            ]);
        }
    }
}
