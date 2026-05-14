import * as React from 'react';
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye } from 'lucide-react';
import { router, usePage } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import ArtikelCreate from './Create';

interface PageProps {
    artikels: {
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
    };
}

type NestedRoute =
    | { name: 'index' }
    | { name: 'create' }
    | { name: 'edit'; data: any };

const card3dClassName =
    'relative overflow-hidden transition-all duration-200 ease-out will-change-transform ' +
    'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 hover:ring-1 hover:ring-foreground/10 ' +
    'before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-0 before:transition-opacity ' +
    'hover:before:opacity-100 dark:before:from-white/10';

export default function ManajemenArtikelPage() {
    const { artikels, filters } = usePage<PageProps>().props;
    const [route, setRoute] = React.useState<NestedRoute>({ name: 'index' });
    const [query, setQuery] = React.useState(filters.search || '');

    const handleSearch = React.useCallback(() => {
        router.get(
            '/admin/artikel',
            { search: query },
            { preserveState: true, replace: true }
        );
    }, [query]);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            if (query !== (filters.search || '')) {
                handleSearch();
            }
        }, 300);
        return () => clearTimeout(timeout);
    }, [query, handleSearch, filters]);

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
            router.delete(`/admin/artikel/${id}`, {
                preserveState: true,
            });
        }
    };

    if (route.name === 'create') {
        return <ArtikelCreate onBack={() => setRoute({ name: 'index' })} />;
    }

    if (route.name === 'edit') {
        return <ArtikelCreate data={route.data} onBack={() => setRoute({ name: 'index' })} />;
    }

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Manajemen Artikel</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Kelola konten edukasi dan informasi kesehatan.
                    </p>
                </div>

                <Button type="button" className="h-10 rounded-lg px-4" onClick={() => setRoute({ name: 'create' })}>
                    <Plus className="mr-2 size-4" />
                    Tambah Artikel
                </Button>
            </div>

            <Card className={cn(card3dClassName, 'bg-white')}>
                <CardContent className="p-4 md:p-5">
                    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Cari artikel..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="h-10 pl-9 rounded-xl border-white/40 bg-white/50 focus:bg-white focus:ring-primary/20"
                            />
                        </div>
                    </div>

                    <div className="rounded-xl border border-white/40 bg-white/30">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="w-[100px]">Gambar</TableHead>
                                    <TableHead>Judul</TableHead>
                                    <TableHead>Kategori</TableHead>
                                    <TableHead>Penulis</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead className="w-[80px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {artikels.data.map((artikel) => (
                                    <TableRow key={artikel.id} className="group transition-colors hover:bg-white/40">
                                        <TableCell>
                                            <div className="h-12 w-16 overflow-hidden rounded-lg bg-muted">
                                                {artikel.gambar ? (
                                                    <img
                                                        src={artikel.gambar.startsWith('http') ? artikel.gambar : `/storage/${artikel.gambar}`}
                                                        alt={artikel.judul}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
                                                        No Img
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">{artikel.judul}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="rounded-md font-normal">
                                                {artikel.kategori}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{artikel.penulis}</TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {new Date(artikel.published_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="size-8 rounded-lg opacity-0 group-hover:opacity-100">
                                                        <MoreHorizontal className="size-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-40 rounded-xl">
                                                    <DropdownMenuItem onClick={() => window.open(`/artikel/${artikel.slug}`, '_blank')}>
                                                        <Eye className="mr-2 size-4" /> Lihat
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => setRoute({ name: 'edit', data: artikel })}>
                                                        <Pencil className="mr-2 size-4" /> Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDelete(artikel.id)} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                                                        <Trash2 className="mr-2 size-4" /> Hapus
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {artikels.total > artikels.per_page && (
                        <div className="mt-6 flex items-center justify-between px-2">
                            <p className="text-sm text-muted-foreground">
                                Menampilkan {artikels.from} - {artikels.to} dari {artikels.total} artikel
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={artikels.current_page === 1}
                                    onClick={() => router.get('/admin/artikel', { page: artikels.current_page - 1, search: query }, { preserveState: true })}
                                    className="rounded-lg h-9"
                                >
                                    Sebelumnya
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={artikels.current_page === artikels.last_page}
                                    onClick={() => router.get('/admin/artikel', { page: artikels.current_page + 1, search: query }, { preserveState: true })}
                                    className="rounded-lg h-9"
                                >
                                    Berikutnya
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
