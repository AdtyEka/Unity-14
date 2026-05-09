<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JamLayanan extends Model
{
    protected $fillable = [
        'puskesmas_id',
        'hari',
        'jam',
        'status',
    ];

    public function puskesmas()
    {
        return $this->belongsTo(Puskesmas::class);
    }
}
