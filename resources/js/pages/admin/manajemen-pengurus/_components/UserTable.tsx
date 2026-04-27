import * as React from 'react';
import { MoreVertical } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type { UserRole, UserStatus } from '@/pages/admin/manajemen-pengurus/_components/UserFilters';

export type UserRow = {
    initials: string;
    name: string;
    nik: string;
    role: UserRole;
    fasyankes: string;
    wilayah: string;
    status: UserStatus;
};

const rolePill: Record<UserRole, string> = {
    Bidan: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Admin Puskesmas': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Admin Dinas': 'bg-muted text-foreground border-border',
};

const statusPill: Record<UserStatus, string> = {
    Aktif: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Nonaktif: 'bg-muted text-muted-foreground border-border',
};

function RoleBadge({ role }: { role: UserRole }) {
    return (
        <Badge variant="outline" className={cn('rounded-full px-2.5 py-1 text-xs font-medium', rolePill[role])}>
            {role}
        </Badge>
    );
}

function StatusBadge({ status }: { status: UserStatus }) {
    return (
        <Badge
            variant="outline"
            className={cn('rounded-full px-2.5 py-1 text-xs font-medium', statusPill[status])}
        >
            {status}
        </Badge>
    );
}

export default function UserTable({
    rows,
    page,
    pageCount,
    from,
    to,
    total,
    pageSize,
    onPrevPage,
    onNextPage,
    onSetPage,
    onOpenShow,
    onOpenEdit,
}: {
    rows: UserRow[];
    page: number;
    pageCount: number;
    from: number;
    to: number;
    total: number;
    pageSize: number;
    onPrevPage: () => void;
    onNextPage: () => void;
    onSetPage: (value: number) => void;
    onOpenShow: (id: string) => void;
    onOpenEdit: (id: string) => void;
}) {
    const rowHeightClassName = 'h-[60px]';

    return (
        <>
            <div className="mt-4 rounded-lg border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/30">
                            <TableHead className="px-4 text-xs font-semibold text-muted-foreground">
                                Nama &amp; NIK
                            </TableHead>
                            <TableHead className="px-4 text-xs font-semibold text-muted-foreground">
                                Peran
                            </TableHead>
                            <TableHead className="px-4 text-xs font-semibold text-muted-foreground">
                                Fasyankes (Puskesmas)
                            </TableHead>
                            <TableHead className="px-4 text-xs font-semibold text-muted-foreground">
                                Status
                            </TableHead>
                            <TableHead className="px-4 text-right text-xs font-semibold text-muted-foreground">
                                Aksi
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.length === 0 ? (
                            <TableRow className={rowHeightClassName}>
                                <TableCell
                                    colSpan={5}
                                    className="px-4 py-8 text-center text-sm text-muted-foreground"
                                >
                                    Tidak ada data yang cocok.
                                </TableCell>
                            </TableRow>
                        ) : (
                            <>
                                {rows.map((u) => (
                                    <TableRow
                                        key={u.nik}
                                        className={cn(rowHeightClassName, 'hover:bg-muted/20')}
                                    >
                                        <TableCell className="px-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="bg-emerald-100">
                                                    <AvatarFallback className="bg-emerald-100 font-semibold text-emerald-900">
                                                        {u.initials}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="min-w-0">
                                                    <p className="truncate font-semibold">{u.name}</p>
                                                    <p className="text-xs text-muted-foreground">{u.nik}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-4">
                                            <RoleBadge role={u.role} />
                                        </TableCell>
                                        <TableCell className="px-4">
                                            <div className="min-w-0">
                                                <p className="truncate font-medium">{u.fasyankes}</p>
                                                <p className="text-xs text-muted-foreground">{u.wilayah}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-4">
                                            <StatusBadge status={u.status} />
                                        </TableCell>
                                        <TableCell className="px-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon-sm"
                                                        aria-label="Aksi"
                                                    >
                                                        <MoreVertical />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="min-w-36">
                                                    <DropdownMenuItem onSelect={() => onOpenShow(u.nik)}>
                                                        Lihat Detail
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => onOpenEdit(u.nik)}>
                                                        Ubah Akses
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem variant="destructive" onSelect={() => {}}>
                                                        Nonaktifkan
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}

                                {Array.from({ length: pageSize - rows.length }).map((_, idx) => (
                                    <TableRow
                                        key={`empty-${idx}`}
                                        className={cn(rowHeightClassName, 'hover:bg-transparent')}
                                    >
                                        <TableCell colSpan={5} className="px-4">
                                            <span className="sr-only">Empty row</span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-3 flex flex-col gap-2 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
                <span>
                    Menampilkan {from}-{to} dari {total} pengguna
                </span>

                <div className="flex items-center justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        onClick={onPrevPage}
                        disabled={page <= 1}
                        aria-label="Halaman sebelumnya"
                    >
                        ‹
                    </Button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: pageCount }).slice(0, 5).map((_, idx) => {
                            const p = idx + 1;
                            const active = p === page;
                            return (
                                <Button
                                    key={p}
                                    type="button"
                                    variant={active ? 'secondary' : 'outline'}
                                    size="icon-sm"
                                    onClick={() => onSetPage(p)}
                                    className={cn(active && 'bg-emerald-600 text-white border-emerald-600')}
                                    aria-label={`Halaman ${p}`}
                                >
                                    {p}
                                </Button>
                            );
                        })}
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        onClick={onNextPage}
                        disabled={page >= pageCount}
                        aria-label="Halaman berikutnya"
                    >
                        ›
                    </Button>
                </div>
            </div>
        </>
    );
}

