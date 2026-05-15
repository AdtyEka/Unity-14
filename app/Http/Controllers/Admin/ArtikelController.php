<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Artikel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ArtikelController extends Controller
{
    public function index(Request $request)
    {
        $query = Artikel::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                    ->orWhere('deskripsi', 'like', "%{$search}%")
                    ->orWhere('kategori', 'like', "%{$search}%");
            });
        }

        $artikels = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('admin/page', [
            'artikels' => $artikels,
            'filters' => $request->only(['search']),
            'activeSection' => 'manajemen-artikel',
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'kategori' => 'nullable|string|max:255',
            'tags' => 'nullable|array',
            'penulis' => 'nullable|string|max:255',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'content' => 'nullable|array',
            'content.*.type' => 'required_with:content|string|in:paragraph,heading,subheading,list',
            'content.*.text' => 'required_if:content.*.type,paragraph,heading,subheading|string',
            'content.*.items' => 'required_if:content.*.type,list|array',
            'sections' => 'nullable|array',
            'sections.*.subtitle' => 'required_with:sections|string',
            'sections.*.items' => 'required_with:sections|array',
            'sections.*.items.*.label' => 'required_with:sections|string',
            'sections.*.items.*.points' => 'required_with:sections|array',
            'published_at' => 'nullable|date',
        ]);

        $data = $validated;
        $data['slug'] = Str::slug($validated['judul']);

        if ($request->hasFile('gambar')) {
            $data['gambar'] = $request->file('gambar')->store('artikel', 'public');
        }

        Artikel::create($data);

        return back()->with('success', 'Artikel berhasil ditambahkan.');
    }

    public function update(Request $request, Artikel $artikel): RedirectResponse
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'kategori' => 'nullable|string|max:255',
            'tags' => 'nullable|array',
            'penulis' => 'nullable|string|max:255',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'content' => 'nullable|array',
            'content.*.type' => 'required_with:content|string|in:paragraph,heading,subheading,list',
            'content.*.text' => 'required_if:content.*.type,paragraph,heading,subheading|string',
            'content.*.items' => 'required_if:content.*.type,list|array',
            'sections' => 'nullable|array',
            'sections.*.subtitle' => 'required_with:sections|string',
            'sections.*.items' => 'required_with:sections|array',
            'sections.*.items.*.label' => 'required_with:sections|string',
            'sections.*.items.*.points' => 'required_with:sections|array',
            'published_at' => 'nullable|date',
        ]);

        $data = $validated;
        $data['slug'] = Str::slug($validated['judul']);

        if ($request->hasFile('gambar')) {
            if ($artikel->gambar && ! str_starts_with($artikel->gambar, 'http')) {
                Storage::disk('public')->delete($artikel->gambar);
            }
            $data['gambar'] = $request->file('gambar')->store('artikel', 'public');
        }

        $artikel->update($data);

        return back()->with('success', 'Artikel berhasil diperbarui.');
    }

    public function destroy(Artikel $artikel): RedirectResponse
    {
        if ($artikel->gambar && ! str_starts_with($artikel->gambar, 'http')) {
            Storage::disk('public')->delete($artikel->gambar);
        }

        $artikel->delete();

        return back()->with('success', 'Artikel berhasil dihapus.');
    }
}
