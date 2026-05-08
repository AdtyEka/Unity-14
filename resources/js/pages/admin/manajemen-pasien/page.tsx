import { LoaderCircle, Plus, UsersRound } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import ManajemenPasienShow from '@/pages/admin/manajemen-pasien/[id]/Show';
import CreateStepTwo from '@/pages/admin/manajemen-pasien/_components/CreateStepTwo';
import PatientFilter from '@/pages/admin/manajemen-pasien/_components/PatientFilter';
import type { FilterOption } from '@/pages/admin/manajemen-pasien/_components/PatientFilter';
import PatientTable from '@/pages/admin/manajemen-pasien/_components/PatientTable';
import type { PatientRow } from '@/pages/admin/manajemen-pasien/_components/PatientTable';
import ManajemenPasienCreate from '@/pages/admin/manajemen-pasien/Create';

type NestedRoute =
    | { name: 'index' }
    | { name: 'transition-create' }
    | { name: 'create' }
    | { name: 'anthropometri'; patient: PatientRow }
    | { name: 'show'; id: string; tanpaPrediksiMl?: boolean };

const patientsSeed: PatientRow[] = [
    {
        id: 'P-1042',
        namaPasien: 'Budi Santoso',
        jenisKelamin: 'Laki-laki',
        umur: '18 bulan',
        usiaBulan: 18,
        tanggalPemeriksaanTerakhir: '15 Apr 2024',
        statusGizi: 'Stunting',
    },
    {
        id: 'P-1043',
        namaPasien: 'Aisyah Putri',
        jenisKelamin: 'Perempuan',
        umur: '24 bulan',
        usiaBulan: 24,
        tanggalPemeriksaanTerakhir: '03 Mei 2024',
        statusGizi: 'Gizi Baik',
    },
    {
        id: 'P-1044',
        namaPasien: 'Raka Pratama',
        jenisKelamin: 'Laki-laki',
        umur: '12 bulan',
        usiaBulan: 12,
        tanggalPemeriksaanTerakhir: '21 Mar 2024',
        statusGizi: 'Risiko Tinggi',
    },
    {
        id: 'P-1045',
        namaPasien: 'Kirana Ayu',
        jenisKelamin: 'Perempuan',
        umur: '9 bulan',
        usiaBulan: 9,
        tanggalPemeriksaanTerakhir: '12 Apr 2024',
        statusGizi: '0–11 Bulan',
    },
    {
        id: 'P-1046',
        namaPasien: 'Dimas Saputra',
        jenisKelamin: 'Laki-laki',
        umur: '30 bulan',
        usiaBulan: 30,
        tanggalPemeriksaanTerakhir: '08 Feb 2024',
        statusGizi: 'Stunting',
    },
];

const card3dClassName =
    'relative overflow-hidden transition-all duration-200 ease-out will-change-transform ' +
    'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 hover:ring-1 hover:ring-foreground/10 ' +
    'before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-0 before:transition-opacity ' +
    'hover:before:opacity-100 dark:before:from-white/10';

function TransitionCreate({
    onDone,
    onCancel,
}: {
    onDone: () => void;
    onCancel: () => void;
}) {
    React.useEffect(() => {
        const t = window.setTimeout(onDone, 900);
        return () => window.clearTimeout(t);
    }, [onDone]);

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <Card className={cn(card3dClassName, 'bg-white')}>
                <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
                        <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                            <LoaderCircle className="size-6 animate-spin" />
                        </div>
                        <div>
                            <p className="text-lg font-semibold tracking-tight">Menyiapkan pemeriksaan baru…</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Membuka form identitas pasien untuk pemeriksaan antropometri.
                            </p>
                        </div>
                        <Button type="button" variant="outline" className="h-10 rounded-lg px-5" onClick={onCancel}>
                            Batalkan
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function TableSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <div className="mt-4 rounded-lg border bg-white">
            <div className="border-b bg-muted/10 px-4 py-3">
                <Skeleton className="h-4 w-44" />
            </div>
            <div className="divide-y">
                {Array.from({ length: rows }).map((_, idx) => (
                    <div key={idx} className="flex items-center gap-4 px-4 py-4">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <div className="ml-auto">
                            <Skeleton className="h-8 w-44" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function ManajemenPasienPage() {
    const [route, setRoute] = React.useState<NestedRoute>({ name: 'index' });
    const [query, setQuery] = React.useState('');
    const [page, setPage] = React.useState(1);
    const [filter, setFilter] = React.useState<FilterOption>('Semua');
    const [isLoading, setIsLoading] = React.useState(true);
    const [confirmOpen, setConfirmOpen] = React.useState(false);

    const pageSize = 5;

    React.useEffect(() => {
        const t = window.setTimeout(() => setIsLoading(false), 700);
        return () => window.clearTimeout(t);
    }, []);

    const filtered = React.useMemo(() => {
        const q = query.trim().toLowerCase();

        return patientsSeed.filter((p) => {
            const matchesFilter = filter === 'Semua' ? true : p.statusGizi === filter;
            if (q.length === 0) {
                return matchesFilter;
            }

            return matchesFilter && p.namaPasien.toLowerCase().includes(q);
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
            <ManajemenPasienCreate
                onCancel={() => setRoute({ name: 'index' })}
                onDone={(pasienId, { prediksiMl }) =>
                    setRoute({
                        name: 'show',
                        id: pasienId,
                        ...(!prediksiMl ? { tanpaPrediksiMl: true } : {}),
                    })
                }
            />
        );
    }

    if (route.name === 'transition-create') {
        return (
            <TransitionCreate onDone={() => setRoute({ name: 'create' })} onCancel={() => setRoute({ name: 'index' })} />
        );
    }

    if (route.name === 'anthropometri') {
        const usiaBulan = route.patient.usiaBulan;
        const prediksiMl = usiaBulan >= 12 && usiaBulan <= 60;

        return (
            <CreateStepTwo
                mode="existing"
                usiaBulan={usiaBulan}
                prediksiMl={prediksiMl}
                onBack={() => setRoute({ name: 'index' })}
                onCancel={() => setRoute({ name: 'index' })}
                onSubmit={() =>
                    setRoute({
                        name: 'show',
                        id: route.patient.id,
                        ...(!prediksiMl ? { tanpaPrediksiMl: true } : {}),
                    })
                }
            />
        );
    }

    if (route.name === 'show') {
        return (
            <ManajemenPasienShow
                id={route.id}
                tanpaPrediksiMl={route.tanpaPrediksiMl === true}
                onBack={() => setRoute({ name: 'index' })}
            />
        );
    }

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Data Pemeriksaan Pasien</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Pilih pasien yang sudah pernah diperiksa atau buat pemeriksaan baru.
                    </p>
                </div>

                <Button
                    type="button"
                    className={cn(
                        'h-10 rounded-lg bg-emerald-600 px-4 text-white shadow-sm',
                        'hover:bg-emerald-700',
                        'focus-visible:ring-2 focus-visible:ring-emerald-500/40',
                    )}
                    onClick={() => setConfirmOpen(true)}
                >
                    <Plus className="mr-2 size-4" />
                    Pemeriksaan Baru
                </Button>
            </div>

            <Card className={cn(card3dClassName, 'bg-white')}>
                <CardContent className="p-4 md:p-5">
                    <PatientFilter
                        query={query}
                        filter={filter}
                        onQueryChange={setQuery}
                        onFilterChange={setFilter}
                    />

                    {isLoading ? (
                        <TableSkeleton rows={pageSize} />
                    ) : filtered.length === 0 && patientsSeed.length === 0 ? (
                        <div className="mt-4 rounded-lg border bg-white px-6 py-12 text-center">
                            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                                <UsersRound className="size-6" />
                            </div>
                            <p className="mt-4 text-base font-semibold">Belum ada data pasien</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Buat pemeriksaan baru untuk mulai mencatat antropometri.
                            </p>
                            <Button
                                type="button"
                                className="mt-5 h-10 rounded-lg bg-emerald-600 px-4 text-white hover:bg-emerald-700"
                                onClick={() => setConfirmOpen(true)}
                            >
                                <Plus className="mr-2 size-4" />
                                Pemeriksaan Baru
                            </Button>
                        </div>
                    ) : (
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
                            onOpenDetail={(row) => setRoute({ name: 'show', id: row.id })}
                            onContinue={(row) => setRoute({ name: 'anthropometri', patient: row })}
                        />
                    )}
                </CardContent>
            </Card>

            <ConfirmDialog
                open={confirmOpen}
                onOpenChange={setConfirmOpen}
                title="Buat pemeriksaan baru?"
                description="Anda akan diarahkan ke form identitas pasien baru sebelum mengisi antropometri."
                confirmText="Ya, buat baru"
                cancelText="Batal"
                onConfirm={() => setRoute({ name: 'transition-create' })}
            />
        </div>
    );
}
