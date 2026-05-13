<?php

namespace App\Jobs;

use App\Models\ExportRequest;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProcessExportJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public ExportRequest $exportRequest
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            $this->exportRequest->update(['status' => 'processing']);

            // Get data
            $pemeriksaans = \App\Models\Pemeriksaan::with(['pasien', 'hasilPrediksi'])
                ->whereBetween('tanggal_pemeriksaan', [
                    $this->exportRequest->start_date,
                    $this->exportRequest->end_date
                ])
                ->orderBy('tanggal_pemeriksaan')
                ->get();

            $format = $this->exportRequest->format;
            $filename = 'exports/'.Str::uuid().'.'.$format;
            $path = storage_path('app/public/' . $filename);
            
            // Ensure directory exists
            if (!file_exists(dirname($path))) {
                mkdir(dirname($path), 0755, true);
            }

            if ($format === 'pdf') {
                $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('exports.laporan', [
                    'pemeriksaans' => $pemeriksaans,
                    'exportRequest' => $this->exportRequest
                ]);
                $pdf->save($path);
            } else {
                $spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
                $sheet = $spreadsheet->getActiveSheet();
                
                // Set Header
                $headers = ['No', 'Tanggal', 'Nama Pasien', 'NIK Ibu', 'Umur (Bulan)', 'BB (kg)', 'TB (cm)', 'Z-Score', 'Status Stunting'];
                $col = 'A';
                foreach ($headers as $header) {
                    $sheet->setCellValue($col . '1', $header);
                    $col++;
                }

                // Set Data
                $row = 2;
                foreach ($pemeriksaans as $index => $pem) {
                    $umur = $pem->pasien ? (int) \Carbon\Carbon::parse($pem->pasien->tanggal_lahir)->diffInMonths($pem->tanggal_pemeriksaan) : '-';
                    
                    $sheet->setCellValue('A'.$row, $index + 1);
                    $sheet->setCellValue('B'.$row, $pem->tanggal_pemeriksaan->format('Y-m-d'));
                    $sheet->setCellValue('C'.$row, $pem->pasien?->nama_bayi ?? '-');
                    $sheet->setCellValueExplicit('D'.$row, $pem->pasien?->nik_ibu ?? '-', \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING);
                    $sheet->setCellValue('E'.$row, $umur);
                    $sheet->setCellValue('F'.$row, $pem->berat_badan);
                    $sheet->setCellValue('G'.$row, $pem->tinggi_badan);
                    $sheet->setCellValue('H'.$row, $pem->hasilPrediksi?->z_score ?? '-');
                    $sheet->setCellValue('I'.$row, $pem->hasilPrediksi?->prediction_label ?? '-');
                    $row++;
                }

                if ($format === 'xlsx') {
                    $writer = new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($spreadsheet);
                    $writer->save($path);
                } elseif ($format === 'csv') {
                    $writer = new \PhpOffice\PhpSpreadsheet\Writer\Csv($spreadsheet);
                    $writer->save($path);
                }
            }

            $this->exportRequest->update([
                'status' => 'completed',
                'file_path' => $filename,
            ]);

        } catch (\Exception $e) {
            $this->exportRequest->update(['status' => 'failed']);
            throw $e;
        }
    }
}
