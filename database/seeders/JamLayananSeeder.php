<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JamLayananSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $puskesmas = \App\Models\Puskesmas::first();

        $data = [
            ['hari' => 'Senin - Kamis', 'jam' => '07:30 - 16:00 WIB', 'status' => 'Buka'],
            ['hari' => 'Jumat', 'jam' => '07:30 - 16:30 WIB', 'status' => 'Buka'],
            ['hari' => 'Sabtu', 'jam' => '08:00 - 12:00 WIB', 'status' => 'Buka'],
        ];

        foreach ($data as $item) {
            $puskesmas->jamLayanans()->create($item);
        }
    }
}
