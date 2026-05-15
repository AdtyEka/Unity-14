<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pasien;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JadwalKesehatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $pasiens = Pasien::with(['pemeriksaanTerakhir.hasilPrediksi'])
            ->whereHas('pemeriksaans', function ($query) {
                $query->where('tanggal_pemeriksaan', '>=', now()->subMonth());
            })
            ->orWhereDoesntHave('pemeriksaans')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($pasien) {
                if ($pasien->pemeriksaanTerakhir) {
                    $nextSchedule = $pasien->pemeriksaanTerakhir->tanggal_pemeriksaan->copy()->addMonth();
                } else {
                    $nextSchedule = now()->addDay();
                }

                $pasien->tanggal_jadwal_selanjutnya = $nextSchedule->translatedFormat('j F Y');
                $pasien->usia_bulan = $pasien->usiaBulan();

                $pasien->status_gizi = $pasien->usia_bulan < 12
                    ? '0–11 Bulan'
                    : ($pasien->pemeriksaanTerakhir && $pasien->pemeriksaanTerakhir->hasilPrediksi
                        ? $pasien->pemeriksaanTerakhir->hasilPrediksi->prediction_label
                        : 'Belum Ada Data');

                // logic sudah diingatkan: jika terakhir diingatkan di bulan yang sama dengan sekarang
                // dan setelah pemeriksaan terakhir (jika ada)
                $pasien->sudah_diingatkan = false;
                if ($pasien->terakhir_diingatkan_at) {
                    $isCurrentMonth = $pasien->terakhir_diingatkan_at->isCurrentMonth();
                    $isAfterLastPemeriksaan = true;
                    if ($pasien->pemeriksaanTerakhir) {
                        $isAfterLastPemeriksaan = $pasien->terakhir_diingatkan_at->gt($pasien->pemeriksaanTerakhir->tanggal_pemeriksaan);
                    }
                    $pasien->sudah_diingatkan = $isCurrentMonth && $isAfterLastPemeriksaan;
                }

                return $pasien;
            });

        return Inertia::render('admin/page', [
            'pasiens' => $pasiens,
            'activeSection' => 'jadwal-kesehatan',
        ]);
    }

    public function markReminded(Pasien $pasien)
    {
        $pasien->update([
            'terakhir_diingatkan_at' => now(),
        ]);

        return back()->with('success', 'Pengingat berhasil dikirim.');
    }
}
