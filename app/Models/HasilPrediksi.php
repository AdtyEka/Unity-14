<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HasilPrediksi extends Model
{
    protected $fillable = [
        'pemeriksaan_id',
        'prediction',
        'prediction_label',
        'z_score',
        'confidence',
        'shap_jenis_kelamin',
        'shap_umur_bulan',
        'shap_tinggi_cm',
        'shap_berat_kg',
    ];

    /**
     * Get the pemeriksaan that owns the hasil prediksi.
     */
    public function pemeriksaan(): BelongsTo
    {
        return $this->belongsTo(Pemeriksaan::class);
    }
}
