<?php

namespace Database\Seeders;

use App\Models\Pengurus;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PengurusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['name' => 'Siti Nurhaliza, A.Md.Keb', 'nik' => '3271012345678901', 'role' => 'Bidan', 'status' => 'Aktif'],
            ['name' => 'Budi Wibowo, S.KM', 'nik' => '3271098765432109', 'role' => 'Admin Puskesmas', 'status' => 'Aktif'],
            ['name' => 'Rina Rosdiana, A.Md.Keb', 'nik' => '3271055566677788', 'role' => 'Bidan', 'status' => 'Nonaktif'],
            ['name' => 'dr. Ahmad Santoso', 'nik' => '3271011122233344', 'role' => 'Admin Dinas', 'status' => 'Aktif'],
            ['name' => 'Dewi Prameswari, A.Md.Keb', 'nik' => '3271044455566677', 'role' => 'Bidan', 'status' => 'Aktif'],
            ['name' => 'Fauzan Nurhadi, S.KM', 'nik' => '3271077711122233', 'role' => 'Admin Puskesmas', 'status' => 'Aktif'],
        ];

        foreach ($data as $item) {
            $email = strtolower(str_replace([' ', ',', '.'], '', explode(' ', $item['name'])[0])).'@example.com';

            // Avoid duplicate email if seeded twice
            $user = User::firstOrCreate(
                ['email' => $email],
                [
                    'name' => $item['name'],
                    'password' => Hash::make('password'),
                    'role' => 'admin',
                ]
            );

            Pengurus::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'nik' => $item['nik'],
                    'role_detail' => $item['role'],
                    'status' => $item['status'],
                ]
            );
        }
    }
}
