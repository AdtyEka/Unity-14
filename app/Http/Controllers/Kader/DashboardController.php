<?php

namespace App\Http\Controllers\Kader;

use App\Http\Controllers\Controller;
use App\Models\Pasien;
use App\Models\Pemeriksaan;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $totalPasien = Pasien::count();

        // Latest status for each patient (excluding 0-11 months for these categories)
        $latestPemeriksaans = Pemeriksaan::with(['hasilPrediksi', 'pasien'])
            ->whereIn('id', function ($query) {
                $query->selectRaw('max(id)')
                    ->from('pemeriksaans')
                    ->whereIn('tanggal_pemeriksaan', function ($sub) {
                        $sub->selectRaw('max(tanggal_pemeriksaan)')
                            ->from('pemeriksaans')
                            ->groupBy('pasien_id');
                    })
                    ->groupBy('pasien_id');
            })->get();

        $stats = [
            'total' => $totalPasien,
            'normal' => $latestPemeriksaans->filter(fn ($p) => $p->pasien->usiaBulan() >= 12 && optional($p->hasilPrediksi)->prediction_label === 'Normal')->count(),
            'stunting' => $latestPemeriksaans->filter(fn ($p) => $p->pasien->usiaBulan() >= 12 && optional($p->hasilPrediksi)->prediction_label === 'Stunted')->count(),
            'stunting_berat' => $latestPemeriksaans->filter(fn ($p) => $p->pasien->usiaBulan() >= 12 && optional($p->hasilPrediksi)->prediction_label === 'Severely Stunted')->count(),
            'bayi_baru_lahir' => Pasien::where('tanggal_lahir', '>', now()->subMonths(12))->count(),
        ];

        // Trend data (last 12 months)
        $months = [];
        for ($i = 11; $i >= 0; $i--) {
            $months[] = now()->subMonths($i)->format('Y-m');
        }

        $trendData = [];
        foreach ($months as $month) {
            $start = Carbon::parse($month)->startOfMonth();
            $end = Carbon::parse($month)->endOfMonth();

            $monthExams = Pemeriksaan::with(['hasilPrediksi', 'pasien'])
                ->whereBetween('tanggal_pemeriksaan', [$start, $end])
                ->get()
                ->filter(fn ($p) => $p->pasien->usiaBulan() >= 12);

            $trendData[] = [
                'bulan' => Carbon::parse($month)->translatedFormat('M Y'),
                'normal' => $monthExams->filter(fn ($p) => optional($p->hasilPrediksi)->prediction_label === 'Normal')->count(),
                'risiko' => $monthExams->filter(fn ($p) => optional($p->hasilPrediksi)->prediction_label === 'Stunted')->count(),
                'stunting' => $monthExams->filter(fn ($p) => optional($p->hasilPrediksi)->prediction_label === 'Severely Stunted')->count(),
            ];
        }

        // Recent activities
        $activities = Pemeriksaan::with(['pasien', 'hasilPrediksi'])
            ->orderBy('tanggal_pemeriksaan', 'desc')
            ->limit(5)
            ->get()
            ->map(fn ($p) => [
                'id' => $p->id,
                'name' => $p->pasien->nama_bayi,
                'initials' => collect(explode(' ', $p->pasien->nama_bayi))
                    ->take(2)
                    ->map(fn ($n) => strtoupper(substr($n, 0, 1)))
                    ->implode(''),
                'age' => $p->pasien->usiaBulan().' Bulan',
                'date' => $p->tanggal_pemeriksaan->translatedFormat('d M Y'),
                'status' => $p->pasien->usiaBulan() < 12 ? '0-11 Bulan' : $this->mapLabel($p->hasilPrediksi?->prediction_label),
            ]);

        // Upcoming schedules (1 month after last exam)
        $schedules = $latestPemeriksaans->take(3)->map(fn ($p) => [
            'id' => $p->pasien->id,
            'month' => $p->tanggal_pemeriksaan->copy()->addMonth()->translatedFormat('M'),
            'day' => $p->tanggal_pemeriksaan->copy()->addMonth()->format('d'),
            'name' => $p->pasien->nama_bayi,
            'risk' => $p->pasien->usiaBulan() < 12 ? '0-11 Bulan' : $this->mapLabel($p->hasilPrediksi?->prediction_label),
            'time' => '09:00 WIB',
        ]);

        return Inertia::render('kader/page', [
            'stats' => $stats,
            'trendData' => $trendData,
            'activities' => $activities,
            'schedules' => $schedules,
            'activeSection' => 'dashboard',
        ]);
    }

    private function mapLabel(?string $label): string
    {
        return match ($label) {
            'Normal' => 'Normal',
            'Stunted' => 'Stunting',
            'Severely Stunted' => 'Stunting Berat',
            default => 'Normal',
        };
    }
}
