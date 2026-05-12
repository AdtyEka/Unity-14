<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jobs\RunStuntingPrediction;
use App\Models\Pasien;
use App\Models\Pemeriksaan;
use Illuminate\Http\Request;

class PemeriksaanController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Pasien $pasien)
    {
        $validated = $request->validate([
            'tanggal_pemeriksaan' => 'required|date',
            'tinggi_badan' => 'required|numeric|min:0',
            'berat_badan' => 'required|numeric|min:0',
        ]);

        $pemeriksaan = $pasien->pemeriksaans()->create($validated);

        RunStuntingPrediction::dispatch($pemeriksaan->load('pasien'))->onQueue('predictions');

        return redirect()->back()->with('success', 'Pemeriksaan berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pasien $pasien, Pemeriksaan $pemeriksaan)
    {
        $validated = $request->validate([
            'tanggal_pemeriksaan' => 'required|date',
            'tinggi_badan' => 'required|numeric|min:0',
            'berat_badan' => 'required|numeric|min:0',
        ]);

        $pemeriksaan->update($validated);

        // Hapus hasil prediksi lama jika ada
        $pemeriksaan->hasilPrediksi()->delete();

        // Dispatch ulang prediksi
        RunStuntingPrediction::dispatch($pemeriksaan->load('pasien'))->onQueue('predictions');

        return redirect()->back()->with('success', 'Pemeriksaan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource in storage.
     */
    public function destroy(Pasien $pasien, Pemeriksaan $pemeriksaan)
    {
        $pemeriksaan->delete();

        return redirect()->back()->with('success', 'Pemeriksaan berhasil dihapus.');
    }
}
