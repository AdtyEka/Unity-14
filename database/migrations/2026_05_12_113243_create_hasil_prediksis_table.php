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
        Schema::create('hasil_prediksis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pemeriksaan_id')->constrained('pemeriksaans')->onDelete('cascade');
            $table->tinyInteger('prediction');
            $table->string('prediction_label');
            $table->decimal('z_score', 5, 3);
            $table->decimal('confidence', 8, 6);
            $table->decimal('shap_jenis_kelamin', 10, 6);
            $table->decimal('shap_umur_bulan', 10, 6);
            $table->decimal('shap_tinggi_cm', 10, 6);
            $table->decimal('shap_berat_kg', 10, 6);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hasil_prediksis');
    }
};
