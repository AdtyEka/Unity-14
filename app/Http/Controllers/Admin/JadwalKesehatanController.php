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

                $pasien->status_gizi = $pasien->pemeriksaanTerakhir && $pasien->pemeriksaanTerakhir->hasilPrediksi
                    ? $pasien->pemeriksaanTerakhir->hasilPrediksi->prediction_label
                    : 'Belum Ada Data';

                return $pasien;
            });

        // dd($pasiens);

        return Inertia::render('admin/page', [
            'pasiens' => $pasiens,
            'activeSection' => 'jadwal-kesehatan',
        ]);
    }
}
