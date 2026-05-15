<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jobs\ProcessExportJob;
use App\Models\ExportRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Validation\ValidationException;

class AdminExportController extends Controller
{
    public function index(Request $request)
    {
        $reports = ExportRequest::where('user_id', $request->user()->id)
            ->latest()
            ->get()
            ->map(function ($report) {
                return [
                    'id' => $report->id,
                    'title' => "Laporan {$report->jenis_laporan} ({$report->format})",
                    'subtitle' => $report->created_at->diffForHumans(),
                    'color' => $report->status === 'completed' ? 'green' : ($report->status === 'failed' ? 'red' : 'blue'),
                    'status' => $report->status,
                    'file_path' => $report->file_path ? asset('storage/'.$report->file_path) : null,
                ];
            });

        return inertia('admin/page', [
            'recentReports' => $reports,
            'activeSection' => 'ekspor',
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => ['required', 'in:Mingguan,Bulanan,Tahunan'],
            'format' => ['required', 'in:pdf,xlsx,csv'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
        ]);

        $startDate = Carbon::parse($validated['start_date']);
        $endDate = Carbon::parse($validated['end_date']);

        if ($validated['type'] === 'Mingguan') {
            if ($startDate->diffInDays($endDate) > 7) {
                throw ValidationException::withMessages(['end_date' => 'Rentang tanggal untuk laporan mingguan maksimal 7 hari.']);
            }
        } elseif ($validated['type'] === 'Bulanan') {
            if ($startDate->diffInDays($endDate) > 31) {
                throw ValidationException::withMessages(['end_date' => 'Rentang tanggal untuk laporan bulanan maksimal 31 hari.']);
            }
        } elseif ($validated['type'] === 'Tahunan') {
            if ($startDate->diffInDays($endDate) > 366) {
                throw ValidationException::withMessages(['end_date' => 'Rentang tanggal untuk laporan tahunan maksimal 1 tahun.']);
            }
        }

        $exportRequest = ExportRequest::create([
            'user_id' => $request->user()->id,
            'jenis_laporan' => $validated['type'],
            'format' => $validated['format'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'status' => 'pending',
        ]);

        ProcessExportJob::dispatch($exportRequest);

        return redirect()->back()->with('success', 'Permintaan ekspor berhasil dibuat dan sedang diproses di background.');
    }
}
