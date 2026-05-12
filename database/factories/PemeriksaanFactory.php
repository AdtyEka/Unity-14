<?php

namespace Database\Factories;

use App\Models\Pemeriksaan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Pemeriksaan>
 */
class PemeriksaanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tanggal_pemeriksaan' => fake()->dateTimeBetween('-1 month', 'now')->format('Y-m-d'),
            'tinggi_badan' => fake()->randomFloat(2, 45, 120),
            'berat_badan' => fake()->randomFloat(2, 2.5, 30),
        ];
    }
}
