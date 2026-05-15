<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jobs\RunStuntingPrediction;
use App\Models\Pasien;
use App\Models\Pemeriksaan;
use App\Services\AiValidationService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class PemeriksaanController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Pasien $pasien, AiValidationService $aiValidation)
    {
        $validated = $request->validate([
            'tanggal_pemeriksaan' => 'required|date',
            'tinggi_badan' => 'required|numeric|min:0',
            'berat_badan' => 'required|numeric|min:0',
        ]);

        $usiaBulan = (int) Carbon::parse($pasien->tanggal_lahir)->diffInMonths(Carbon::parse($request->tanggal_pemeriksaan));

        $aiResult = $aiValidation->validate([
            'jenis_kelamin' => $pasien->jenis_kelamin,
            'umur_bulan' => $usiaBulan,
            'tinggi_cm' => (float) $request->tinggi_badan,
            'berat_kg' => (float) $request->berat_badan,
        ]);

        if ($aiResult && ! $aiResult['valid']) {
            return redirect()->back()->withErrors(array_filter([
                'tinggi_badan' => $aiResult['tinggi_valid'] === false ? $aiResult['pesan'][0] : null,
                'berat_badan' => $aiResult['berat_valid'] === false ? end($aiResult['pesan']) : null,
            ]))->withInput();
        }

        $pemeriksaan = $pasien->pemeriksaans()->create($validated);

        RunStuntingPrediction::dispatch($pemeriksaan->load('pasien'))->onQueue('predictions');

        return redirect()->back()->with('success', 'Pemeriksaan berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pasien $pasien, Pemeriksaan $pemeriksaan, AiValidationService $aiValidation)
    {
        $validated = $request->validate([
            'tanggal_pemeriksaan' => 'required|date',
            'tinggi_badan' => 'required|numeric|min:0',
            'berat_badan' => 'required|numeric|min:0',
        ]);

        $usiaBulan = (int) Carbon::parse($pasien->tanggal_lahir)->diffInMonths(Carbon::parse($request->tanggal_pemeriksaan));

        $aiResult = $aiValidation->validate([
            'jenis_kelamin' => $pasien->jenis_kelamin,
            'umur_bulan' => $usiaBulan,
            'tinggi_cm' => (float) $request->tinggi_badan,
            'berat_kg' => (float) $request->berat_badan,
        ]);

        if ($aiResult && ! $aiResult['valid']) {
            return redirect()->back()->withErrors(array_filter([
                'tinggi_badan' => $aiResult['tinggi_valid'] === false ? $aiResult['pesan'][0] : null,
                'berat_badan' => $aiResult['berat_valid'] === false ? end($aiResult['pesan']) : null,
            ]))->withInput();
        }

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

    /**
     * Download report for the latest examination.
     */
    public function downloadReport(Pasien $pasien)
    {
        $pemeriksaan = $pasien->pemeriksaans()->with(['hasilPrediksi'])->latest('tanggal_pemeriksaan')->first();

        $pdf = Pdf::loadView('exports.pemeriksaan', [
            'pasien' => $pasien,
            'pemeriksaan' => $pemeriksaan,
        ]);

        return $pdf->download("Laporan_Pemeriksaan_{$pasien->nama_bayi}_{$pasien->id}.pdf");
    }
}
