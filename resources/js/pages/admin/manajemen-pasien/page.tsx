import { router, usePage } from '@inertiajs/react';
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
    const { pasiens, filters, pasien, tanpaPrediksiMl: propTanpaMl } = usePage<any>().props;
    const [route, setRoute] = React.useState<NestedRoute>(pasien ? { name: 'show', id: pasien.id } : { name: 'index' });
    const [query, setQuery] = React.useState(filters?.search || '');
    const [filter, setFilter] = React.useState<FilterOption>(filters?.status_gizi || 'Semua');
    const [confirmOpen, setConfirmOpen] = React.useState(false);

    const parseStatusGizi = (status: string): StatusGizi => {
        if (!status) return 'Normal';
        if (status === 'Severely Stunted') return 'Stunting Berat';
        if (status === 'Stunted') return 'Stunting';
        if (status === 'Normal') return 'Normal';
        return status as StatusGizi;
    };

    const rows: PatientRow[] = (pasiens?.data || []).map((p: any) => ({
        id: p.id,
        namaPasien: p.namaPasien,
        jenisKelamin: p.jenisKelamin,
        umur: p.umur,
        usiaBulan: p.usiaBulan,
        tanggalPemeriksaanTerakhir: p.tanggalPemeriksaanTerakhir,
        statusGizi: parseStatusGizi(p.statusGizi),
    }));

    const handleSearch = React.useCallback(
        (q: string, f: FilterOption) => {
            router.get(
                '/admin/pasien',
                { search: q, status_gizi: f },
                { preserveState: true, replace: true }
            );
        },
        []
    );

    const onQueryChange = (q: string) => {
        setQuery(q);
        handleSearch(q, filter);
    };

    const onFilterChange = (f: FilterOption) => {
        setFilter(f);
        handleSearch(query, f);
    };

    const onPrev = () => {
        if (pasiens?.prev_page_url) {
            router.get(pasiens.prev_page_url, {}, { preserveState: true });
        }
    };

    const onNext = () => {
        if (pasiens?.next_page_url) {
            router.get(pasiens.next_page_url, {}, { preserveState: true });
        }
    };

    const handleDelete = (row: PatientRow) => {
        if (confirm(`Apakah Anda yakin ingin menghapus data pasien ${row.namaPasien}? Semua data pemeriksaan terkait juga akan dihapus.`)) {
            router.delete(`/admin/pasien/${row.id}`, {
                preserveState: true,
                onSuccess: () => {
                    // Success handled by flash
                }
            });
        }
    };

    React.useEffect(() => {
        if (pasien) {
            setRoute({ name: 'show', id: pasien.id });
        } else {
            setRoute({ name: 'index' });
        }
    }, [pasien]);

    if (route.name === 'create') {
        return (
            <ManajemenPasienCreate
                onCancel={() => setRoute({ name: 'index' })}
                onDone={(pasienId, { prediksiMl }) => {
                    router.get(`/admin/pasien/${pasienId}`);
                }}
            />
        );
    }

    if (route.name === 'show' && pasien) {
        return (
            <ManajemenPasienShow
                pasien={pasien}
                tanpaPrediksiMl={propTanpaMl === true}
                onBack={() => {
                    setRoute({ name: 'index' });
                    router.get('/admin/pasien');
                }}
            />
        );
    }

    if (route.name === 'transition-create') {
        return (
            <TransitionCreate onDone={() => setRoute({ name: 'create' })} onCancel={() => setRoute({ name: 'index' })} />
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
                        onQueryChange={onQueryChange}
                        onFilterChange={onFilterChange}
                    />

                    {pasiens?.data?.length === 0 && !query && filter === 'Semua' ? (
                        <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center">
                            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                                <Plus className="size-6 text-muted-foreground" />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold">Belum ada data pasien</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Mulai dengan menambahkan pemeriksaan pasien baru.
                            </p>
                            <Button
                                type="button"
                                variant="outline"
                                className="mt-4"
                                onClick={() => setConfirmOpen(true)}
                            >
                                Tambah Pasien
                            </Button>
                        </div>
                    ) : (
                        <PatientTable
                            rows={rows}
                            page={pasiens?.current_page || 1}
                            pageCount={pasiens?.last_page || 1}
                            from={pasiens?.from || 0}
                            to={pasiens?.to || 0}
                            total={pasiens?.total || 0}
                            pageSize={pasiens?.per_page || 10}
                            onPrev={onPrev}
                            onNext={onNext}
                            onOpenDetail={(row) => router.get(`/admin/pasien/${row.id}`)}
                            onDelete={handleDelete}
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
