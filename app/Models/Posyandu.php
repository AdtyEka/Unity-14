<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Posyandu extends Model
{
    protected $fillable = [
        'puskesmas_id',
        'nama',
        'populasi_balita',
    ];

    public function puskesmas()
    {
        return $this->belongsTo(Puskesmas::class);
    }
}
