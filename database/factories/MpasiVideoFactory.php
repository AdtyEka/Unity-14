<?php

namespace Database\Factories;

use App\Models\MpasiVideo;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<MpasiVideo>
 */
class MpasiVideoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'judul' => $this->faker->sentence(3),
            'deskripsi' => $this->faker->paragraph,
            'kategori' => $this->faker->randomElement(['6-9 Bulan', '9-12 Bulan', '12-24 Bulan']),
            'tags' => $this->faker->words(3),
            'durasi' => $this->faker->time('i:s'),
            'path_video' => 'mpasi/sample.mp4',
            'thumbnail_path' => null,
        ];
    }
}
