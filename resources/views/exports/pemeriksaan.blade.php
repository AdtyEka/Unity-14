<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Pemeriksaan Pasien</title>
    <style>
        body {
            font-family: sans-serif;
            font-size: 12px;
            color: #333;
            line-height: 1.5;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
        }
        .header h1 {
            margin: 0;
            font-size: 18px;
            text-transform: uppercase;
        }
        .header p {
            margin: 5px 0 0;
            font-size: 12px;
            color: #666;
        }
        .section {
            margin-bottom: 20px;
        }
        .section-title {
            font-weight: bold;
            font-size: 14px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
            margin-bottom: 10px;
            color: #059669;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table th, table td {
            text-align: left;
            padding: 8px;
            border: 1px solid #ddd;
        }
        table th {
            bg-color: #f9fafb;
            font-weight: bold;
        }
        .badge {
            padding: 2px 8px;
            border-radius: 9999px;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
        }
        .badge-danger { background-color: #fee2e2; color: #991b1b; }
        .badge-warning { background-color: #fef3c7; color: #92400e; }
        .badge-success { background-color: #d1fae5; color: #065f46; }
        .badge-info { background-color: #e0f2fe; color: #075985; }
        
        .footer {
            margin-top: 50px;
            text-align: right;
            font-size: 10px;
            color: #999;
        }
        .signature {
            margin-top: 30px;
            text-align: right;
        }
        .signature-line {
            margin-top: 60px;
            border-top: 1px solid #333;
            display: inline-block;
            width: 200px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Laporan Pemeriksaan Pasien</h1>
        <p>Sistem Pemantauan Gizi Balita - Posyandu/Puskesmas</p>
    </div>

    <div class="section">
        <div class="section-title">Informasi Pasien</div>
        <table>
            <tr>
                <th width="30%">Nama Bayi</th>
                <td>{{ $pasien->nama_bayi }}</td>
            </tr>
            <tr>
                <th>ID Pasien</th>
                <td>{{ $pasien->id }}</td>
            </tr>
            <tr>
                <th>Jenis Kelamin</th>
                <td>{{ $pasien->jenis_kelamin }}</td>
            </tr>
            <tr>
                <th>Tanggal Lahir</th>
                <td>{{ $pasien->tanggal_lahir->format('d F Y') }}</td>
            </tr>
            <tr>
                <th>Nama Ibu</th>
                <td>{{ $pasien->nama_ibu }}</td>
            </tr>
            <tr>
                <th>NIK Ibu</th>
                <td>{{ $pasien->nik_ibu }}</td>
            </tr>
            <tr>
                <th>Nomor HP</th>
                <td>{{ $pasien->nomor_hp ?? '-' }}</td>
            </tr>
        </table>
    </div>

    <div class="section">
        <div class="section-title">Hasil Pemeriksaan Terakhir</div>
        @if($pemeriksaan)
            <table>
                <tr>
                    <th width="30%">Tanggal Pemeriksaan</th>
                    <td>{{ $pemeriksaan->tanggal_pemeriksaan->format('d F Y') }}</td>
                </tr>
                <tr>
                    <th>Usia Saat Periksa</th>
                    <td>{{ $pasien->usiaBulan($pemeriksaan->tanggal_pemeriksaan) }} bulan</td>
                </tr>
                <tr>
                    <th>Tinggi Badan</th>
                    <td>{{ $pemeriksaan->tinggi_badan }} cm</td>
                </tr>
                <tr>
                    <th>Berat Badan</th>
                    <td>{{ $pemeriksaan->berat_badan }} kg</td>
                </tr>
                @if($pemeriksaan->hasilPrediksi)
                    <tr>
                        <th>Z-Score (TB/U)</th>
                        <td>{{ $pemeriksaan->hasilPrediksi->z_score }}</td>
                    </tr>
                    <tr>
                        <th>Status Risiko AI</th>
                        <td>
                            @php
                                $status = $pemeriksaan->hasilPrediksi->prediction_label;
                                $class = 'badge-info';
                                if($status == 'Severely Stunted' || $status == 'Stunting Berat') $class = 'badge-danger';
                                elseif($status == 'Stunted' || $status == 'Stunting') $class = 'badge-warning';
                                elseif($status == 'Normal') $class = 'badge-success';
                                
                                $statusLabel = $status;
                                if($status == 'Severely Stunted') $statusLabel = 'Stunting Berat';
                                elseif($status == 'Stunted') $statusLabel = 'Stunting';
                            @endphp
                            <span class="badge {{ $class }}">{{ $statusLabel }}</span>
                        </td>
                    </tr>
                    <tr>
                        <th>Probabilitas</th>
                        <td>{{ round($pemeriksaan->hasilPrediksi->confidence * 100, 1) }}%</td>
                    </tr>
                @endif
            </table>
        @else
            <p>Belum ada data pemeriksaan.</p>
        @endif
    </div>

    @if($pemeriksaan && $pemeriksaan->rekomendasi && count($pemeriksaan->rekomendasi) > 0)
        <div class="section">
            <div class="section-title">Rekomendasi Klinis</div>
            @foreach($pemeriksaan->rekomendasi as $item)
                <div style="margin-bottom: 10px; padding: 10px; border: 1px solid #eee; border-radius: 5px;">
                    <strong style="display: block; margin-bottom: 3px;">{{ $item['title'] }}</strong>
                    <span style="font-size: 11px; color: #666;">{{ $item['description'] }}</span>
                </div>
            @endforeach
        </div>
    @endif

    <div class="signature">
        <p>Dicetak pada: {{ now()->format('d/m/Y H:i') }}</p>
        <div style="margin-top: 40px;">
            <p>Petugas Kesehatan,</p>
            <div class="signature-line"></div>
        </div>
    </div>

    <div class="footer">
        Laporan ini dihasilkan secara otomatis oleh Sistem Pemantauan Gizi.
    </div>
</body>
</html>
