<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Posyandu;
use App\Models\Puskesmas;
use Illuminate\Http\RedirectResponse;

class PosyanduController extends Controller
{
    public function store(Request $request, Puskesmas $puskesmas): RedirectResponse
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'populasi_balita' => 'required|integer|min:0',
        ]);

        $puskesmas->posyandus()->create($validated);

        return back()->with('success', 'Wilayah Posyandu berhasil ditambahkan.');
    }

    public function update(Request $request, Puskesmas $puskesmas, Posyandu $posyandu): RedirectResponse
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'populasi_balita' => 'required|integer|min:0',
        ]);

        $posyandu->update($validated);

        return back()->with('success', 'Wilayah Posyandu berhasil diperbarui.');
    }

    public function destroy(Puskesmas $puskesmas, Posyandu $posyandu): RedirectResponse
    {
        $posyandu->delete();

        return back()->with('success', 'Wilayah Posyandu berhasil dihapus.');
    }
}
