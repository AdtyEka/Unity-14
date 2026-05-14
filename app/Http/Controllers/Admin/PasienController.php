<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jobs\RunStuntingPrediction;
use App\Models\Pasien;
use App\Services\AiValidationService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class PasienController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Pasien::with('pemeriksaanTerakhir.hasilPrediksi');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama_bayi', 'like', "%{$search}%")
                    ->orWhere('nik_ibu', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status_gizi') && $request->status_gizi !== 'Semua') {
            $status = $request->status_gizi;
            $query->where(function ($q) use ($status) {
                // Check latest examination status
                $q->whereHas('pemeriksaanTerakhir.hasilPrediksi', function ($sub) use ($status) {
                    $sub->where('prediction_label', $status);
                });

                // Fallback for patients without examinations based on age
                if ($status === '0–11 Bulan') {
                    $q->orWhere(function ($sub) {
                        $sub->where('tanggal_lahir', '>', now()->subMonths(12))
                            ->doesntHave('pemeriksaans');
                    });
                } elseif ($status === 'Normal') {
                    $q->orWhere(function ($sub) {
                        $sub->where('tanggal_lahir', '<=', now()->subMonths(12))
                            ->doesntHave('pemeriksaans');
                    });
                }
            });
        }

        $pasiens = $query->latest()->paginate(10)->withQueryString();

        $pasiens->getCollection()->transform(function ($p) {
            $usiaBulan = $p->usiaBulan();
            $statusGizi = $p->pemeriksaanTerakhir && $p->pemeriksaanTerakhir->hasilPrediksi
                ? $p->pemeriksaanTerakhir->hasilPrediksi->prediction_label
                : 'Belum Ada Data';

            return [
                'id' => $p->id,
                'namaPasien' => $p->nama_bayi,
                'jenisKelamin' => $p->jenis_kelamin,
                'umur' => "{$usiaBulan} bulan",
                'usiaBulan' => $usiaBulan,
                'tanggalPemeriksaanTerakhir' => $p->pemeriksaanTerakhir
                    ? Carbon::parse($p->pemeriksaanTerakhir->tanggal_pemeriksaan)->format('d M Y')
                    : '-',
                'statusGizi' => $statusGizi,
                // Data identitas lengkap untuk detail/edit
                'namaIbu' => $p->nama_ibu,
                'nikIbu' => $p->nik_ibu,
                'namaAyah' => $p->nama_ayah,
                'nomorHp' => $p->nomor_hp,
                'tanggalLahir' => $p->tanggal_lahir,
            ];
        });

        return Inertia::render('admin/page', [
            'pasiens' => $pasiens,
            'filters' => $request->only(['search', 'status_gizi']),
            'activeSection' => 'manajemen-pasien',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pasien $pasien)
    {
        $pasien->load(['pemeriksaans' => function ($q) {
            $q->with(['hasilPrediksi', 'rekomendasi'])->latest('tanggal_pemeriksaan');
        }]);

        $usiaBulan = $pasien->usiaBulan();

        return Inertia::render('admin/page', [
            'activeSection' => 'manajemen-pasien',
            'pasien' => [
                'id' => $pasien->id,
                'namaBayi' => $pasien->nama_bayi,
                'jenisKelamin' => $pasien->jenis_kelamin,
                'usiaBulan' => $usiaBulan,
                'umur' => "{$usiaBulan} bulan",
                'namaIbu' => $pasien->nama_ibu,
                'nikIbu' => $pasien->nik_ibu,
                'namaAyah' => $pasien->nama_ayah,
                'nomorHp' => $pasien->nomor_hp,
                'tanggalLahir' => $pasien->tanggal_lahir,
                'riwayatPemeriksaan' => $pasien->pemeriksaans->map(function ($p) use ($pasien) {
                    $prediksi = $p->hasilPrediksi;
                    $rekomendasi = $p->rekomendasi;

                    return [
                        'id' => $p->id,
                        'tanggal' => Carbon::parse($p->tanggal_pemeriksaan)->format('d M Y'),
                        'tanggalRaw' => $p->tanggal_pemeriksaan->format('Y-m-d'),
                        'usia' => (int) Carbon::parse($pasien->tanggal_lahir)->diffInMonths($p->tanggal_pemeriksaan).' bln',
                        'bb' => (string) $p->berat_badan,
                        'tb' => (string) $p->tinggi_badan,
                        'zscore' => $prediksi ? (string) $prediksi->z_score : '-',
                        'status' => $prediksi ? $prediksi->prediction_label : 'Menunggu prediksi',
                        'confidence' => $prediksi ? round($prediksi->confidence * 100, 1).'%' : null,
                        'rekomendasi' => $rekomendasi ? $rekomendasi->rekomendasi : null,
                        'shap' => $prediksi ? [
                            'jenis_kelamin' => $prediksi->shap_jenis_kelamin,
                            'umur_bulan' => $prediksi->shap_umur_bulan,
                            'tinggi_cm' => $prediksi->shap_tinggi_cm,
                            'berat_kg' => $prediksi->shap_berat_kg,
                        ] : null,
                    ];
                }),
            ],
            'tanpaPrediksiMl' => ! ($usiaBulan >= 12 && $usiaBulan <= 60),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, AiValidationService $aiValidation)
    {
        $validated = $request->validate([
            'nama_bayi' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
            'nama_ibu' => 'required|string|max:255',
            'nik_ibu' => 'required|digits:16|unique:pasiens,nik_ibu',
            'nama_ayah' => 'nullable|string|max:255',
            'nomor_hp' => 'nullable|string|max:20',
            // Opsional data pemeriksaan pertama
            'tanggal_pemeriksaan' => 'nullable|date',
            'tinggi_badan' => 'nullable|numeric|min:0',
            'berat_badan' => 'nullable|numeric|min:0',
        ]);

        if ($request->filled(['tinggi_badan', 'berat_badan'])) {
            $usiaBulan = (int) Carbon::parse($request->tanggal_lahir)->diffInMonths($request->tanggal_pemeriksaan ?? now());
            $aiResult = $aiValidation->validate([
                'jenis_kelamin' => $request->jenis_kelamin,
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
        }

        $pasien = Pasien::create($validated);

        if ($request->filled(['tinggi_badan', 'berat_badan'])) {
            $pemeriksaan = $pasien->pemeriksaans()->create([
                'tanggal_pemeriksaan' => $request->tanggal_pemeriksaan ?? now(),
                'tinggi_badan' => $request->tinggi_badan,
                'berat_badan' => $request->berat_badan,
            ]);

            RunStuntingPrediction::dispatch($pemeriksaan->load('pasien'))->onQueue('predictions');
        }

        return redirect()->back()->with('success', 'Pasien berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pasien $pasien)
    {
        $validated = $request->validate([
            'nama_bayi' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
            'nama_ibu' => 'required|string|max:255',
            'nik_ibu' => 'required|digits:16|unique:pasiens,nik_ibu,'.$pasien->id,
            'nama_ayah' => 'nullable|string|max:255',
            'nomor_hp' => 'nullable|string|max:20',
        ]);

        $pasien->update($validated);

        return redirect()->back()->with('success', 'Data pasien berhasil diperbarui.');
    }

    /**
     * Remove the specified resource in storage.
     */
    public function destroy(Pasien $pasien)
    {
        $pasien->delete();

        return redirect()->back()->with('success', 'Pasien berhasil dihapus.');
    }
}
