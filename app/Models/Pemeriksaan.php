<?php

namespace App\Models;

use Database\Factories\PemeriksaanFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Pemeriksaan extends Model
{
    /** @use HasFactory<PemeriksaanFactory> */
    use HasFactory;

    protected $fillable = [
        'pasien_id',
        'tanggal_pemeriksaan',
        'tinggi_badan',
        'berat_badan',
    ];

    protected $casts = [
        'tanggal_pemeriksaan' => 'date',
        'tinggi_badan' => 'decimal:2',
        'berat_badan' => 'decimal:2',
    ];

    /**
     * Get the hasil prediksi associated with the pemeriksaan.
     */
    public function hasilPrediksi(): HasOne
    {
        return $this->hasOne(HasilPrediksi::class);
    }

    /**
     * Get the pasien that owns the pemeriksaan.
     */
    public function pasien(): BelongsTo
    {
        return $this->belongsTo(Pasien::class);
    }
}
