<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mpasi_videos', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->text('deskripsi')->nullable();
            $table->string('kategori'); // 6-9 Bulan, 9-12 Bulan, 12-24 Bulan
            $table->json('tags')->nullable();
            $table->string('durasi')->nullable();
            $table->string('path_video');
            $table->string('thumbnail_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mpasi_videos');
    }
};
