import * as React from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import PatientFilter, { type FilterOption, type RiskStatus } from '@/pages/admin/manajemen-pasien/_components/PatientFilter';
import PatientTable, { type PatientRow } from '@/pages/admin/manajemen-pasien/_components/PatientTable';
import ManajemenPasienCreate from '@/pages/admin/manajemen-pasien/Create';
import ManajemenPasienShow from '@/pages/admin/manajemen-pasien/[id]/Show';

type NestedRoute =
    | { name: 'index' }
    | { name: 'create' }
    | { name: 'show'; id: string };

const patientsSeed: PatientRow[] = [
    { uid: '#B-1042', namaBalita: 'Budi Santoso', namaIbu: 'Siti Aminah', usia: '18 Bulan', status: 'Stunting' },
    { uid: '#B-1043', namaBalita: 'Aisyah Putri', namaIbu: 'Dewi Lestari', usia: '24 Bulan', status: 'Gizi Baik' },
    { uid: '#B-1044', namaBalita: 'Raka Pratama', namaIbu: 'Neneng Hasanah', usia: '12 Bulan', status: 'Risiko Tinggi' },
    { uid: '#B-1045', namaBalita: 'Kirana Ayu', namaIbu: 'Fitriani', usia: '9 Bulan', status: 'Gizi Baik' },
    { uid: '#B-1046', namaBalita: 'Dimas Saputra', namaIbu: 'Ratna Sari', usia: '30 Bulan', status: 'Stunting' },
    { uid: '#B-1047', namaBalita: 'Nadia Safitri', namaIbu: 'Lina Marlina', usia: '20 Bulan', status: 'Gizi Baik' },
    { uid: '#B-1048', namaBalita: 'Fajar Hidayat', namaIbu: 'Rina Wulandari', usia: '14 Bulan', status: 'Risiko Tinggi' },
    { uid: '#B-1049', namaBalita: 'Zahra Nabila', namaIbu: 'Sari Puspita', usia: '26 Bulan', status: 'Gizi Baik' },
];

const card3dClassName =
    'relative overflow-hidden transition-all duration-200 ease-out will-change-transform ' +
    'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 hover:ring-1 hover:ring-foreground/10 ' +
    'before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-0 before:transition-opacity ' +
    'hover:before:opacity-100 dark:before:from-white/10';

export default function ManajemenPasienPage() {
    const [route, setRoute] = React.useState<NestedRoute>({ name: 'index' });
    const [query, setQuery] = React.useState('');
    const [filter, setFilter] = React.useState<FilterOption>('Semua');
    const [page, setPage] = React.useState(1);

    const pageSize = 5;

    const filtered = React.useMemo(() => {
        const q = query.trim().toLowerCase();

        return patientsSeed.filter((p) => {
            const matchesQuery =
                q.length === 0 ||
                p.uid.toLowerCase().includes(q) ||
                p.namaBalita.toLowerCase().includes(q) ||
                p.namaIbu.toLowerCase().includes(q);

            const matchesFilter = filter === 'Semua' ? true : p.status === (filter as RiskStatus);

            return matchesQuery && matchesFilter;
        });
    }, [query, filter]);

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

    if (route.name === 'create') {
        return (
            <ManajemenPasienCreate onCancel={() => setRoute({ name: 'index' })} onDone={() => setRoute({ name: 'index' })} />
        );
    }

    if (route.name === 'show') {
        return <ManajemenPasienShow id={route.id} onBack={() => setRoute({ name: 'index' })} />;
    }

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Manajemen Pasien</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Kelola data balita dan riwayat pemeriksaan klinis.
                </p>
            </div>

            <Card className={cn(card3dClassName, 'bg-white')}>
                <CardContent className="p-4 md:p-5">
                    <PatientFilter
                        query={query}
                        filter={filter}
                        onQueryChange={setQuery}
                        onFilterChange={setFilter}
                    />

                    <PatientTable
                        rows={rows}
                        page={page}
                        pageCount={pageCount}
                        from={from}
                        to={to}
                        total={filtered.length}
                        pageSize={pageSize}
                        onPrev={() => setPage((p) => Math.max(1, p - 1))}
                        onNext={() => setPage((p) => Math.min(pageCount, p + 1))}
                        onOpenDetail={(uid) => setRoute({ name: 'show', id: uid })}
                    />
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button
                    type="button"
                    className={cn(
                        'h-10 rounded-lg px-4 shadow-sm transition-all duration-200 ease-out will-change-transform',
                        'hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10',
                        'focus-visible:ring-2 focus-visible:ring-ring/50',
                    )}
                    onClick={() => setRoute({ name: 'create' })}
                >
                    <Plus className="mr-2 size-4" />
                    Pemeriksaan Baru
                </Button>
            </div>
        </div>
    );
}
