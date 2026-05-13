<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Ekspor Data</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
        }
        h2 {
            text-align: center;
            margin-bottom: 5px;
        }
        p {
            text-align: center;
            margin-top: 0;
            color: #555;
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
    </style>
</head>
<body>

    <h2>Laporan {{ $exportRequest->jenis_laporan }}</h2>
    <p>Periode: {{ \Carbon\Carbon::parse($exportRequest->start_date)->format('d M Y') }} - {{ \Carbon\Carbon::parse($exportRequest->end_date)->format('d M Y') }}</p>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Tanggal</th>
                <th>Nama Pasien</th>
                <th>Umur (Bln)</th>
                <th>BB (kg)</th>
                <th>TB (cm)</th>
                <th>Z-Score</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @forelse($pemeriksaans as $index => $pem)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $pem->tanggal_pemeriksaan->format('d M Y') }}</td>
                <td>{{ $pem->pasien?->nama_bayi ?? '-' }}</td>
                <td>{{ $pem->pasien ? (int) \Carbon\Carbon::parse($pem->pasien->tanggal_lahir)->diffInMonths($pem->tanggal_pemeriksaan) : '-' }}</td>
                <td>{{ $pem->berat_badan }}</td>
                <td>{{ $pem->tinggi_badan }}</td>
                <td>{{ $pem->hasilPrediksi?->z_score ?? '-' }}</td>
                <td>{{ $pem->hasilPrediksi?->prediction_label ?? '-' }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="8" style="text-align: center;">Tidak ada data pemeriksaan pada periode ini.</td>
            </tr>
            @endforelse
        </tbody>
    </table>

</body>
</html>
