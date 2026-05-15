<?php

namespace App\Jobs;

use App\Models\Pemeriksaan;
use App\Models\RekomendasiPemeriksaan;
use App\Services\AiRecommendationService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class GenerateRecommendationJob implements ShouldQueue
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
    public function handle(AiRecommendationService $aiService): void
    {
        $hasilPrediksi = $this->pemeriksaan->hasilPrediksi;

        if (! $hasilPrediksi) {
            Log::warning("Cannot generate recommendation: No prediction result for Pemeriksaan ID: {$this->pemeriksaan->id}");

            return;
        }

        $inputData = [
            'jenis_kelamin' => $this->pemeriksaan->pasien->jenis_kelamin,
            'usia_bulan' => (int) Carbon::parse($this->pemeriksaan->pasien->tanggal_lahir)->diffInMonths(Carbon::parse($this->pemeriksaan->tanggal_pemeriksaan)),
            'tinggi_cm' => $this->pemeriksaan->tinggi_badan,
            'berat_kg' => $this->pemeriksaan->berat_badan,
            'label_prediksi' => $hasilPrediksi->prediction_label,
            'confidence' => $hasilPrediksi->confidence,
            'z_score' => $hasilPrediksi->z_score,
            'shap_values' => [
                'jenis_kelamin' => $hasilPrediksi->shap_jenis_kelamin,
                'umur_bulan' => $hasilPrediksi->shap_umur_bulan,
                'tinggi_cm' => $hasilPrediksi->shap_tinggi_cm,
                'berat_kg' => $hasilPrediksi->shap_berat_kg,
            ],
        ];

        $rekomendasi = $aiService->generate($inputData);

        if ($rekomendasi) {
            RekomendasiPemeriksaan::updateOrCreate(
                ['pemeriksaan_id' => $this->pemeriksaan->id],
                ['rekomendasi' => $rekomendasi]
            );

            Log::info("Recommendation generated for Pemeriksaan ID: {$this->pemeriksaan->id}");
        }
    }
}
