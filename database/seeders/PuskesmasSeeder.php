<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PuskesmasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Puskesmas::create([
            'nama_puskesmas' => 'Puskesmas Kecamatan Melati',
            'kode_fasyankes' => 'P3173050101',
            'jenis_puskesmas' => 'Non-Rawat Inap',
            'alamat_lengkap' => 'Jl. Bunga Rampai No. 45, Kelurahan Mawar, Kecamatan Melati, Kota Jakarta Barat, 11460',
            'no_telepon' => '(021) 567-8910',
            'email' => 'info@pkm-melati.go.id',
        ]);
    }
}
