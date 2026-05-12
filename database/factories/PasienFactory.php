<?php

namespace Database\Factories;

use App\Models\Pasien;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Pasien>
 */
class PasienFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama_bayi' => fake()->name(),
            'tanggal_lahir' => fake()->dateTimeBetween('-60 months', 'now')->format('Y-m-d'),
            'jenis_kelamin' => fake()->randomElement(['Laki-laki', 'Perempuan']),
            'nama_ibu' => fake()->name('female'),
            'nik_ibu' => fake()->unique()->numerify('################'),
            'nama_ayah' => fake()->name('male'),
            'nomor_hp' => fake()->numerify('8##########'),
        ];
    }
}
