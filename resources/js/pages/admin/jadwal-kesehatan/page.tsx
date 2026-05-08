import * as React from 'react';
import { Bell, CalendarCheck, CheckCheck, Clock } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import ScheduleFilter, { type FilterStatus } from './_components/ScheduleFilter';
import ScheduleTable, { type ScheduleRow } from './_components/ScheduleTable';

const card3dClassName =
    'relative overflow-hidden transition-all duration-200 ease-out will-change-transform ' +
    'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 hover:ring-1 hover:ring-foreground/10 ' +
    'before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-0 before:transition-opacity ' +
    'hover:before:opacity-100 dark:before:from-white/10';

const schedulesSeed: ScheduleRow[] = [
    {
        uid: '#B-1042',
        namaBalita: 'Budi Santoso',
        namaIbu: 'Siti Aminah',
        noWhatsapp: '6281234567890',
        usia: '18 Bulan',
        status: 'Stunting Berat',
        tanggalPemeriksaan: '1 Apr 2026',
        jadwalBerikutnya: '1 Mei 2026',
        sudahDiingatkan: false,
    },
    {
        uid: '#B-1043',
        namaBalita: 'Aisyah Putri',
        namaIbu: 'Dewi Lestari',
        noWhatsapp: '6282345678901',
        usia: '24 Bulan',
        status: 'Normal',
        tanggalPemeriksaan: '3 Apr 2026',
        jadwalBerikutnya: '3 Mei 2026',
        sudahDiingatkan: true,
    },
    {
        uid: '#B-1044',
        namaBalita: 'Raka Pratama',
        namaIbu: 'Neneng Hasanah',
        noWhatsapp: '6283456789012',
        usia: '12 Bulan',
        status: 'Stunting Ringan',
        tanggalPemeriksaan: '5 Apr 2026',
        jadwalBerikutnya: '5 Mei 2026',
        sudahDiingatkan: false,
    },
    {
        uid: '#B-1045',
        namaBalita: 'Kirana Ayu',
        namaIbu: 'Fitriani',
        noWhatsapp: '6284567890123',
        usia: '9 Bulan',
        status: '0–11 Bulan',
        tanggalPemeriksaan: '7 Apr 2026',
        jadwalBerikutnya: '7 Mei 2026',
        sudahDiingatkan: false,
    },
    {
        uid: '#B-1046',
        namaBalita: 'Dimas Saputra',
        namaIbu: 'Ratna Sari',
        noWhatsapp: '6285678901234',
        usia: '30 Bulan',
        status: 'Stunting Berat',
        tanggalPemeriksaan: '9 Apr 2026',
        jadwalBerikutnya: '9 Mei 2026',
        sudahDiingatkan: false,
    },
    {
        uid: '#B-1047',
        namaBalita: 'Nadia Safitri',
        namaIbu: 'Lina Marlina',
        noWhatsapp: '6286789012345',
        usia: '20 Bulan',
        status: 'Normal',
        tanggalPemeriksaan: '10 Apr 2026',
        jadwalBerikutnya: '10 Mei 2026',
        sudahDiingatkan: true,
    },
    {
        uid: '#B-1048',
        namaBalita: 'Fajar Hidayat',
        namaIbu: 'Rina Wulandari',
        noWhatsapp: '6287890123456',
        usia: '14 Bulan',
        status: 'Stunting Ringan',
        tanggalPemeriksaan: '12 Apr 2026',
        jadwalBerikutnya: '12 Mei 2026',
        sudahDiingatkan: false,
    },
    {
        uid: '#B-1049',
        namaBalita: 'Zahra Nabila',
        namaIbu: 'Sari Puspita',
        noWhatsapp: '6288901234567',
        usia: '26 Bulan',
        status: 'Normal',
        tanggalPemeriksaan: '14 Apr 2026',
        jadwalBerikutnya: '14 Mei 2026',
        sudahDiingatkan: false,
    },
];

export default function JadwalKesehatanPage() {
    const [schedules, setSchedules] = React.useState<ScheduleRow[]>(schedulesSeed);
    const [query, setQuery] = React.useState('');
    const [filter, setFilter] = React.useState<FilterStatus>('Semua');
    const [page, setPage] = React.useState(1);

    const pageSize = 5;

    const filtered = React.useMemo(() => {
        const q = query.trim().toLowerCase();

        return schedules.filter((row) => {
            const matchesQuery =
                q.length === 0 ||
                row.namaBalita.toLowerCase().includes(q) ||
                row.namaIbu.toLowerCase().includes(q);

            const matchesFilter = filter === 'Semua' || row.status === filter;

            return matchesQuery && matchesFilter;
        });
    }, [schedules, query, filter]);

    const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));

    React.useEffect(() => {
        setPage(1);
    }, [query, filter]);

    const rows = React.useMemo(() => {
        const start = (page - 1) * pageSize;
        return filtered.slice(start, start + pageSize);
    }, [filtered, page]);

    const from = filtered.length === 0 ? 0 : (page - 1) * pageSize + 1;
    const to = Math.min(filtered.length, page * pageSize);

    const totalPasien = schedules.length;
    const sudahDiingatkan = schedules.filter((r) => r.sudahDiingatkan).length;
    const belumDiingatkan = totalPasien - sudahDiingatkan;
    const jadwalBulanIni = schedules.filter((r) =>
        r.jadwalBerikutnya.includes('Mei 2026'),
    ).length;

    const handleMarkReminded = React.useCallback((uid: string) => {
        setSchedules((prev) =>
            prev.map((r) => (r.uid === uid ? { ...r, sudahDiingatkan: true } : r)),
        );
    }, []);

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Jadwal Kesehatan</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Pantau pasien yang perlu pemeriksaan ulang dan kirim pengingat via WhatsApp.
                </p>
            </div>

            {/* KPI Cards */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card className={cn(card3dClassName, 'border-l-4 border-l-primary bg-white')}>
                    <CardContent className="py-5">
                        <div className="flex items-start justify-between">
                            <span className="text-sm text-muted-foreground">Total Jadwal Kontrol</span>
                            <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                <CalendarCheck className="size-5" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-4xl font-bold">{totalPasien}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                {jadwalBulanIni} jadwal bulan ini
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className={cn(card3dClassName, 'border-l-4 border-l-amber-500 bg-white')}>
                    <CardContent className="py-5">
                        <div className="flex items-start justify-between">
                            <span className="text-sm text-muted-foreground">Belum Diingatkan</span>
                            <div className="rounded-lg bg-amber-100 p-2 text-amber-700">
                                <Bell className="size-5" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-4xl font-bold text-amber-600">{belumDiingatkan}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Perlu dikirim pengingat WhatsApp
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className={cn(card3dClassName, 'border-l-4 border-l-emerald-500 bg-white')}>
                    <CardContent className="py-5">
                        <div className="flex items-start justify-between">
                            <span className="text-sm text-muted-foreground">Sudah Diingatkan</span>
                            <div className="rounded-lg bg-emerald-100 p-2 text-emerald-700">
                                <CheckCheck className="size-5" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-4xl font-bold text-emerald-600">{sudahDiingatkan}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Pengingat sudah terkirim
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Jadwal Bulan Depan Banner */}
            <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3.5 text-sm text-blue-800">
                <Clock className="mt-0.5 size-4 shrink-0 text-blue-600" />
                <p>
                    <span className="font-semibold">Pengingat otomatis:</span> Pasien yang sudah melakukan pemeriksaan bulan ini akan otomatis dijadwalkan ulang ke bulan berikutnya. Klik tombol{' '}
                    <span className="font-semibold">WhatsApp</span> di setiap baris untuk mengirim notifikasi kepada orang tua/wali.
                </p>
            </div>

            {/* Table Card */}
            <Card className={cn(card3dClassName, 'bg-white')}>
                <CardContent className="flex flex-col gap-4 p-4 md:p-5">
                    <ScheduleFilter
                        query={query}
                        filter={filter}
                        onQueryChange={setQuery}
                        onFilterChange={setFilter}
                    />

                    <ScheduleTable
                        rows={rows}
                        page={page}
                        pageCount={pageCount}
                        from={from}
                        to={to}
                        total={filtered.length}
                        onPrev={() => setPage((p) => Math.max(1, p - 1))}
                        onNext={() => setPage((p) => Math.min(pageCount, p + 1))}
                        onMarkReminded={handleMarkReminded}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
