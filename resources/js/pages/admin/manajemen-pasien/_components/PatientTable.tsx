import * as React from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

export type StatusGizi = '0–11 Bulan' | 'Normal' | 'Stunting' | 'Stunting Berat';

export type PatientRow = {
    id: string;
    namaPasien: string;
    jenisKelamin: 'Laki-laki' | 'Perempuan';
    umur: string;
    usiaBulan: number;
    tanggalPemeriksaanTerakhir: string;
    statusGizi: StatusGizi;
};

const statusPill: Record<StatusGizi, { badge: string }> = {
    '0–11 Bulan': { badge: 'bg-sky-100 text-sky-800 border-sky-200' },
    Normal: { badge: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    Stunting: { badge: 'bg-amber-100 text-amber-800 border-amber-200' },
    'Stunting Berat': { badge: 'bg-red-100 text-red-800 border-red-200' },
};

function StatusBadge({ status }: { status: StatusGizi }) {
    const config = statusPill[status] || { badge: 'bg-slate-100 text-slate-800 border-slate-200' };
    
    return (
        <Badge
            variant="outline"
            className={cn('rounded-full px-2.5 py-1 text-xs font-medium', config.badge)}
        >
            {status || 'Unknown'}
        </Badge>
    );
}

export default function PatientTable({
    rows,
    page,
    pageCount,
    from,
    to,
    total,
    pageSize,
    onPrev,
    onNext,
    onOpenDetail,
    onDelete,
}: {
    rows: PatientRow[];
    page: number;
    pageCount: number;
    from: number;
    to: number;
    total: number;
    pageSize: number;
    onPrev: () => void;
    onNext: () => void;
    onOpenDetail: (row: PatientRow) => void;
    onDelete: (row: PatientRow) => void;
}) {
    const rowHeightClassName = 'h-[60px]';

    return (
        <>
            <div className="mt-4 rounded-lg border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/30">
                            <TableHead className="px-4 text-xs font-semibold uppercase text-muted-foreground">
                                Nama Pasien
                            </TableHead>
                            <TableHead className="px-4 text-xs font-semibold uppercase text-muted-foreground">
                                Jenis Kelamin
                            </TableHead>
                            <TableHead className="px-4 text-xs font-semibold uppercase text-muted-foreground">
                                Umur
                            </TableHead>
                            <TableHead className="px-4 text-xs font-semibold uppercase text-muted-foreground">
                                Pemeriksaan Terakhir
                            </TableHead>
                            <TableHead className="px-4 text-xs font-semibold uppercase text-muted-foreground">
                                Status Gizi
                            </TableHead>
                            <TableHead className="px-4 text-right text-xs font-semibold uppercase text-muted-foreground">
                                Aksi
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.length === 0 ? (
                            <TableRow className={rowHeightClassName}>
                                <TableCell colSpan={6} className="px-4 py-8 text-center text-sm text-muted-foreground">
                                    Tidak ada data yang cocok.
                                </TableCell>
                            </TableRow>
                        ) : (
                            <>
                                {rows.map((p) => (
                                    <TableRow
                                        key={p.id}
                                        className={cn(rowHeightClassName, 'hover:bg-muted/20')}
                                    >
                                        <TableCell className="px-4">
                                            <Button
                                                type="button"
                                                variant="link"
                                                className="h-auto p-0 text-left font-semibold text-foreground underline-offset-4 hover:underline"
                                                onClick={() => onOpenDetail(p)}
                                            >
                                                {p.namaPasien}
                                            </Button>
                                        </TableCell>
                                        <TableCell className="px-4 text-muted-foreground">{p.jenisKelamin}</TableCell>
                                        <TableCell className="px-4 text-muted-foreground">{p.umur}</TableCell>
                                        <TableCell className="px-4 text-muted-foreground">
                                            {p.tanggalPemeriksaanTerakhir}
                                        </TableCell>
                                        <TableCell className="px-4">
                                            <StatusBadge status={p.statusGizi} />
                                        </TableCell>
                                        <TableCell className="px-4 text-right">
                                            <div className="inline-flex flex-wrap items-center justify-end gap-2">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 rounded-md"
                                                    onClick={() => onOpenDetail(p)}
                                                >
                                                    Detail
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 rounded-md border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                                    onClick={() => onDelete(p)}
                                                >
                                                    Hapus
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}

                                {Array.from({ length: pageSize - rows.length }).map((_, idx) => (
                                    <TableRow
                                        key={`empty-${idx}`}
                                        className={cn(rowHeightClassName, 'hover:bg-transparent')}
                                    >
                                        <TableCell colSpan={6} className="px-4">
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
                    Menampilkan {from}-{to} dari {total} pasien
                </span>

                <div className="flex items-center justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        onClick={onPrev}
                        disabled={page <= 1}
                        aria-label="Halaman sebelumnya"
                    >
                        <ChevronLeft />
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        onClick={onNext}
                        disabled={page >= pageCount}
                        aria-label="Halaman berikutnya"
                    >
                        <ChevronRight />
                    </Button>
                </div>
            </div>
        </>
    );
}

