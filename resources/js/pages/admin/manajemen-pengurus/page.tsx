import * as React from 'react';
import { UserPlus } from 'lucide-react';
import { router, usePage } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import UserFilters, {
    type RoleFilter,
    type StatusFilter,
} from '@/pages/admin/manajemen-pengurus/_components/UserFilters';
import UserTable, { type UserRow } from '@/pages/admin/manajemen-pengurus/_components/UserTable';
import ManajemenPengurusCreate from '@/pages/admin/manajemen-pengurus/Create';
import ManajemenPengurusEdit from '@/pages/admin/manajemen-pengurus/[id]/Edit';
import ManajemenPengurusShow from '@/pages/admin/manajemen-pengurus/[id]/Show';
import { cn } from '@/lib/utils';

type NestedRoute =
    | { name: 'index' }
    | { name: 'create' }
    | { name: 'show'; id: number }
    | { name: 'edit'; id: number };

interface PageProps {
    pengurus: {
        data: any[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
        per_page: number;
    };
    filters: {
        search?: string;
        role?: string;
        status?: string;
    };
}

const card3dClassName =
    'relative overflow-hidden transition-all duration-200 ease-out will-change-transform ' +
    'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 hover:ring-1 hover:ring-foreground/10 ' +
    'before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-0 before:transition-opacity ' +
    'hover:before:opacity-100 dark:before:from-white/10';

export default function ManajemenPengurusPage() {
    const { pengurus, filters } = usePage<PageProps>().props;
    const [route, setRoute] = React.useState<NestedRoute>({ name: 'index' });

    // Local state for filters to avoid UI lag, but sync with props
    const [query, setQuery] = React.useState(filters.search || '');
    const [role, setRole] = React.useState<RoleFilter>((filters.role as RoleFilter) || 'Semua Peran');
    const [status, setStatus] = React.useState<StatusFilter>((filters.status as StatusFilter) || 'Semua Status');

    const handleSearch = React.useCallback(() => {
        router.get(
            '/admin/pengurus',
            { search: query, role, status },
            { preserveState: true, replace: true }
        );
    }, [query, role, status]);

    // Debounced search could be better, but for now let's just trigger on change or enter
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            if (query !== (filters.search || '') || role !== (filters.role || 'Semua Peran') || status !== (filters.status || 'Semua Status')) {
                handleSearch();
            }
        }, 300);
        return () => clearTimeout(timeout);
    }, [query, role, status, handleSearch, filters]);

    const rows: UserRow[] = React.useMemo(() => {
        return pengurus.data.map((p) => ({
            id: p.id,
            name: p.user.name,
            initials: p.user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase(),
            nik: p.nik,
            role: p.role_detail,
            status: p.status,
        }));
    }, [pengurus.data]);

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus pengurus ini? Akun user terkait juga akan dihapus.')) {
            router.delete(`/admin/pengurus/${id}`, {
                preserveState: true,
                onSuccess: () => {
                    // Success notification handled by flash if implemented
                },
            });
        }
    };

    if (route.name === 'create') {
        return <ManajemenPengurusCreate onBack={() => setRoute({ name: 'index' })} />;
    }

    if (route.name === 'show') {
        const selected = pengurus.data.find((p) => p.id === route.id);
        return <ManajemenPengurusShow data={selected} onBack={() => setRoute({ name: 'index' })} />;
    }

    if (route.name === 'edit') {
        const selected = pengurus.data.find((p) => p.id === route.id);
        return <ManajemenPengurusEdit data={selected} onBack={() => setRoute({ name: 'index' })} />;
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
                        page={pengurus.current_page}
                        pageCount={pengurus.last_page}
                        from={pengurus.from}
                        to={pengurus.to}
                        total={pengurus.total}
                        pageSize={pengurus.per_page}
                        onPrevPage={() => router.get('/admin/pengurus', { page: pengurus.current_page - 1, search: query, role, status }, { preserveState: true })}
                        onNextPage={() => router.get('/admin/pengurus', { page: pengurus.current_page + 1, search: query, role, status }, { preserveState: true })}
                        onSetPage={(p) => router.get('/admin/pengurus', { page: p, search: query, role, status }, { preserveState: true })}
                        onOpenShow={(id) => setRoute({ name: 'show', id: Number(id) })}
                        onOpenEdit={(id) => setRoute({ name: 'edit', id: Number(id) })}
                        onOpenDelete={handleDelete}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
