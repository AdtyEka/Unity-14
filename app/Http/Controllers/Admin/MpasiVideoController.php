<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MpasiVideo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class MpasiVideoController extends Controller
{
    public function index(Request $request)
    {
        $query = MpasiVideo::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                    ->orWhere('deskripsi', 'like', "%{$search}%");
            });
        }

        $videos = $query->latest()->get();

        return Inertia::render('admin/page', [
            'videos' => $videos,
            'filters' => $request->only(['search']),
            'activeSection' => 'mpasi',
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'kategori' => 'required|string|in:6-9 Bulan,9-12 Bulan,12-24 Bulan',
            'tags' => 'nullable|array',
            'video' => 'required|file|mimes:mp4,webm,ogg|max:512000', // 500MB
        ]);

        $path = $request->file('video')->store('mpasi', 'public');

        MpasiVideo::create([
            'judul' => $validated['judul'],
            'deskripsi' => $validated['deskripsi'],
            'kategori' => $validated['kategori'],
            'tags' => $validated['tags'] ?? [],
            'path_video' => $path,
            'durasi' => '00:00', // Default, should be calculated if possible
        ]);

        return back()->with('success', 'Video MPASI berhasil ditambahkan.');
    }

    public function update(Request $request, MpasiVideo $mpasiVideo): RedirectResponse
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'kategori' => 'required|string|in:6-9 Bulan,9-12 Bulan,12-24 Bulan',
            'tags' => 'nullable|array',
            'video' => 'nullable|file|mimes:mp4,webm,ogg|max:512000',
        ]);

        $data = [
            'judul' => $validated['judul'],
            'deskripsi' => $validated['deskripsi'],
            'kategori' => $validated['kategori'],
            'tags' => $validated['tags'] ?? [],
        ];

        if ($request->hasFile('video')) {
            // Delete old video
            if ($mpasiVideo->path_video) {
                Storage::disk('public')->delete($mpasiVideo->path_video);
            }
            $data['path_video'] = $request->file('video')->store('mpasi', 'public');
        }

        $mpasiVideo->update($data);

        return back()->with('success', 'Video MPASI berhasil diperbarui.');
    }

    public function destroy(MpasiVideo $mpasiVideo): RedirectResponse
    {
        if ($mpasiVideo->path_video) {
            Storage::disk('public')->delete($mpasiVideo->path_video);
        }

        $mpasiVideo->delete();

        return back()->with('success', 'Video MPASI berhasil dihapus.');
    }
}
