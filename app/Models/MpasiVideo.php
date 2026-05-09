<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MpasiVideo extends Model
{
    use HasFactory;

    protected $fillable = [
        'judul',
        'deskripsi',
        'kategori',
        'tags',
        'durasi',
        'path_video',
        'thumbnail_path',
    ];

    protected $casts = [
        'tags' => 'array',
    ];

    protected $appends = ['video_url'];

    protected function videoUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->path_video ? Storage::url($this->path_video) : null,
        );
    }
}
