<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PosyanduSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $puskesmas = \App\Models\Puskesmas::first();

        $data = [
            ['nama' => 'Kelurahan Mawar', 'populasi_balita' => 1240],
            ['nama' => 'Kelurahan Melati', 'populasi_balita' => 980],
            ['nama' => 'Kelurahan Anggrek', 'populasi_balita' => 850],
        ];

        foreach ($data as $item) {
            $puskesmas->posyandus()->create($item);
        }
    }
}
