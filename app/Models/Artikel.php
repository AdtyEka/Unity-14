<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Artikel extends Model
{
    protected $fillable = [
        'judul',
        'slug',
        'deskripsi',
        'kategori',
        'tags',
        'penulis',
        'gambar',
        'content',
        'sections',
        'published_at',
    ];

    protected $casts = [
        'tags' => 'array',
        'content' => 'array',
        'sections' => 'array',
        'published_at' => 'datetime',
    ];
}
