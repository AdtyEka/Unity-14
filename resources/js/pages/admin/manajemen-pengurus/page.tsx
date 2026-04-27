import * as React from 'react';
import { UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import UserFilters, {
    type RoleFilter,
    type StatusFilter,
    type UserRole,
} from '@/pages/admin/manajemen-pengurus/_components/UserFilters';
import UserTable, { type UserRow } from '@/pages/admin/manajemen-pengurus/_components/UserTable';
import ManajemenPengurusCreate from '@/pages/admin/manajemen-pengurus/Create';
import ManajemenPengurusEdit from '@/pages/admin/manajemen-pengurus/[id]/Edit';
import ManajemenPengurusShow from '@/pages/admin/manajemen-pengurus/[id]/Show';
import { cn } from '@/lib/utils';

type NestedRoute =
    | { name: 'index' }
    | { name: 'create' }
    | { name: 'show'; id: string }
    | { name: 'edit'; id: string };

const usersSeed: UserRow[] = [
    { initials: 'SN', name: 'Siti Nurhaliza, A.Md.Keb', nik: '3271012345678901', role: 'Bidan', fasyankes: 'Puskesmas Melati', wilayah: 'Kec. Sukamaju', status: 'Aktif' },
    { initials: 'BW', name: 'Budi Wibowo, S.KM', nik: '3271098765432109', role: 'Admin Puskesmas', fasyankes: 'Puskesmas Melati', wilayah: 'Kec. Sukamaju', status: 'Aktif' },
    { initials: 'RR', name: 'Rina Rosdiana, A.Md.Keb', nik: '3271055566677788', role: 'Bidan', fasyankes: 'Puskesmas Mawar', wilayah: 'Kec. Sukajaya', status: 'Nonaktif' },
    { initials: 'AS', name: 'dr. Ahmad Santoso', nik: '3271011122233344', role: 'Admin Dinas', fasyankes: 'Dinas Kesehatan', wilayah: 'Kab. Bandung', status: 'Aktif' },
    { initials: 'DP', name: 'Dewi Prameswari, A.Md.Keb', nik: '3271044455566677', role: 'Bidan', fasyankes: 'Puskesmas Anggrek', wilayah: 'Kec. Sukamukti', status: 'Aktif' },
    { initials: 'FN', name: 'Fauzan Nurhadi, S.KM', nik: '3271077711122233', role: 'Admin Puskesmas', fasyankes: 'Puskesmas Anggrek', wilayah: 'Kec. Sukamukti', status: 'Aktif' },
];

const card3dClassName =
    'relative overflow-hidden transition-all duration-200 ease-out will-change-transform ' +
    'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 hover:ring-1 hover:ring-foreground/10 ' +
    'before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-0 before:transition-opacity ' +
    'hover:before:opacity-100 dark:before:from-white/10';

export default function ManajemenPengurusPage() {
    const [route, setRoute] = React.useState<NestedRoute>({ name: 'index' });
    const [query, setQuery] = React.useState('');
    const [role, setRole] = React.useState<RoleFilter>('Semua Peran');
    const [status, setStatus] = React.useState<StatusFilter>('Semua Status');
    const [page, setPage] = React.useState(1);

    const pageSize = 5;

    const filtered = React.useMemo(() => {
        const q = query.trim().toLowerCase();
        return usersSeed.filter((u) => {
            const matchesQuery = q.length === 0 || u.name.toLowerCase().includes(q) || u.nik.toLowerCase().includes(q);
            const matchesRole = role === 'Semua Peran' ? true : u.role === (role as UserRole);
            const matchesStatus = status === 'Semua Status' ? true : u.status === status;
            return matchesQuery && matchesRole && matchesStatus;
        });
    }, [query, role, status]);

    const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));

    React.useEffect(() => {
        setPage(1);
    }, [query, role, status]);

    const rows = React.useMemo(() => {
        const start = (page - 1) * pageSize;
        return filtered.slice(start, start + pageSize);
    }, [filtered, page]);

    const from = filtered.length === 0 ? 0 : (page - 1) * pageSize + 1;
    const to = Math.min(filtered.length, page * pageSize);

    if (route.name === 'create') {
        return <ManajemenPengurusCreate onBack={() => setRoute({ name: 'index' })} />;
    }

    if (route.name === 'show') {
        return <ManajemenPengurusShow id={route.id} onBack={() => setRoute({ name: 'index' })} />;
    }

    if (route.name === 'edit') {
        return <ManajemenPengurusEdit id={route.id} onBack={() => setRoute({ name: 'index' })} />;
    }

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Manajemen Pengguna</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Kelola akses bidan dan admin fasyankes.
                    </p>
                </div>

                <Button type="button" className="h-10 rounded-lg px-4" onClick={() => setRoute({ name: 'create' })}>
                    <UserPlus className="mr-2 size-4" />
                    Tambah Pengguna Baru
                </Button>
            </div>

            <Card className={cn(card3dClassName, 'bg-white')}>
                <CardContent className="p-4 md:p-5">
                    <UserFilters
                        query={query}
                        role={role}
                        status={status}
                        onQueryChange={setQuery}
                        onRoleChange={setRole}
                        onStatusChange={setStatus}
                    />

                    <UserTable
                        rows={rows}
                        page={page}
                        pageCount={pageCount}
                        from={from}
                        to={to}
                        total={filtered.length}
                        pageSize={pageSize}
                        onPrevPage={() => setPage((p) => Math.max(1, p - 1))}
                        onNextPage={() => setPage((p) => Math.min(pageCount, p + 1))}
                        onSetPage={setPage}
                        onOpenShow={(id) => setRoute({ name: 'show', id })}
                        onOpenEdit={(id) => setRoute({ name: 'edit', id })}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
