<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Puskesmas extends Model
{
    protected $fillable = [
        'nama_puskesmas',
        'kode_fasyankes',
        'jenis_puskesmas',
        'alamat_lengkap',
        'no_telepon',
        'email',
        'latitude',
        'longitude',
        'radius',
    ];

    public function jamLayanans()
    {
        return $this->hasMany(JamLayanan::class);
    }

    public function posyandus()
    {
        return $this->hasMany(Posyandu::class);
    }
}
