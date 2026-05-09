<?php

namespace App\Models;

use Database\Factories\PengurusFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pengurus extends Model
{
    /** @use HasFactory<PengurusFactory> */
    use HasFactory;

    protected $table = 'pengurus';

    protected $fillable = [
        'user_id',
        'nik',
        'role_detail',
        'status',
    ];

    /**
     * Get the user that owns the pengurus profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
