<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RekomendasiPemeriksaan extends Model
{
    protected $fillable = [
        'pemeriksaan_id',
        'rekomendasi',
    ];

    protected $casts = [
        'rekomendasi' => 'array',
    ];

    public function pemeriksaan()
    {
        return $this->belongsTo(Pemeriksaan::class);
    }
}
