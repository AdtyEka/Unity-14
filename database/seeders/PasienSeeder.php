<?php

namespace Database\Seeders;

use App\Models\Pasien;
use App\Models\Pemeriksaan;
use Illuminate\Database\Seeder;

class PasienSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Pasien::factory()
            ->count(15)
            ->create()
            ->each(function ($pasien) {
                Pemeriksaan::factory()
                    ->count(rand(1, 3))
                    ->create(['pasien_id' => $pasien->id]);
            });
    }
}
