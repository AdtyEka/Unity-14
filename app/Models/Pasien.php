<?php

namespace App\Models;

use Database\Factories\PasienFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Carbon;

class Pasien extends Model
{
    /** @use HasFactory<PasienFactory> */
    use HasFactory, HasUlids;

    protected $fillable = [
        'nama_bayi',
        'tanggal_lahir',
        'jenis_kelamin',
        'nama_ibu',
        'nik_ibu',
        'nama_ayah',
        'nomor_hp',
    ];

    /**
     * Get the pemeriksaans for the pasien.
     */
    public function pemeriksaans(): HasMany
    {
        return $this->hasMany(Pemeriksaan::class);
    }

    /**
     * Get the latest pemeriksaan for the pasien.
     */
    public function pemeriksaanTerakhir(): HasOne
    {
        return $this->hasOne(Pemeriksaan::class)->latestOfMany('tanggal_pemeriksaan');
    }

    /**
     * Calculate age in months.
     */
    public function usiaBulan(): int
    {
        return (int) Carbon::parse($this->tanggal_lahir)->diffInMonths(now());
    }
}
