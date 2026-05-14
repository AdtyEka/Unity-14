<?php

use App\Models\Artikel;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('admin can create article with structured content', function () {
    $admin = User::factory()->create(['role' => 'admin']);

    $content = [
        ['type' => 'heading', 'text' => 'Judul Section'],
        ['type' => 'paragraph', 'text' => 'Ini adalah paragraf.'],
        ['type' => 'list', 'items' => ['Item 1', 'Item 2']],
    ];

    $sections = [
        [
            'subtitle' => 'Saran Nutrisi',
            'items' => [
                ['label' => 'Karbohidrat', 'points' => ['Nasi', 'Roti']],
            ],
        ],
    ];

    $response = $this->actingAs($admin)
        ->post(route('admin.artikel.store'), [
            'judul' => 'Artikel Baru',
            'deskripsi' => 'Deskripsi artikel',
            'kategori' => 'Nutrisi',
            'penulis' => 'Admin',
            'content' => $content,
            'sections' => $sections,
            'published_at' => now()->toDateString(),
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('artikels', [
        'judul' => 'Artikel Baru',
    ]);

    $artikel = Artikel::first();
    expect($artikel->content)->toBe($content);
    expect($artikel->sections)->toBe($sections);
});

test('admin can update article with structured content', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $artikel = Artikel::create([
        'judul' => 'Artikel Lama',
        'slug' => 'artikel-lama',
        'content' => [],
        'sections' => [],
    ]);

    $newContent = [
        ['type' => 'paragraph', 'text' => 'Konten baru'],
    ];

    $response = $this->actingAs($admin)
        ->put(route('admin.artikel.update', $artikel), [
            'judul' => 'Artikel Updated',
            'content' => $newContent,
            'sections' => [],
        ]);

    $response->assertRedirect();
    $artikel->refresh();
    expect($artikel->judul)->toBe('Artikel Updated');
    expect($artikel->content)->toBe($newContent);
});
