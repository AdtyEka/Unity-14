<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Puskesmas;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class PuskesmasController extends Controller
{
    public function index(): Response
    {
        $puskesmas = Puskesmas::with(['jamLayanans', 'posyandus'])->firstOrFail();

        return Inertia::render('admin/page', [
            'puskesmas' => $puskesmas,
            'activeSection' => 'konfigurasi-posyandu',
        ]);
    }

    public function update(Request $request, Puskesmas $puskesmas): RedirectResponse
    {
        $validated = $request->validate([
            'nama_puskesmas' => 'required|string|max:255',
            'kode_fasyankes' => 'required|string|max:255',
            'jenis_puskesmas' => 'required|string|max:255',
            'alamat_lengkap' => 'required|string',
            'no_telepon' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'radius' => 'required|integer|min:0',
        ]);

        $puskesmas->update($validated);

        return back()->with('success', 'Profil Puskesmas berhasil diperbarui.');
    }
}
