import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
import type { RiskStatus } from '@/pages/admin/manajemen-pasien/_components/PatientFilter';

export type PatientRow = {
    uid: string;
    namaBalita: string;
    namaIbu: string;
    usia: string;
    status: RiskStatus;
};

const statusPill: Record<RiskStatus, { badge: string }> = {
    Stunting: { badge: 'bg-red-100 text-red-800 border-red-200' },
    'Risiko Tinggi': { badge: 'bg-amber-100 text-amber-800 border-amber-200' },
    'Gizi Baik': { badge: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
};

function RiskBadge({ status }: { status: RiskStatus }) {
    return (
        <Badge
            variant="outline"
            className={cn('rounded-full px-2.5 py-1 text-xs font-medium', statusPill[status].badge)}
        >
            {status}
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
    onOpenDetail: (uid: string) => void;
}) {
    const rowHeightClassName = 'h-[60px]';

    return (
        <>
            <div className="mt-4 rounded-lg border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/30">
                            <TableHead className="px-4 text-xs font-semibold uppercase text-muted-foreground">
                                UID Bayi
                            </TableHead>
                            <TableHead className="px-4 text-xs font-semibold uppercase text-muted-foreground">
                                Nama Balita
                            </TableHead>
                            <TableHead className="px-4 text-xs font-semibold uppercase text-muted-foreground">
                                Nama Ibu
                            </TableHead>
                            <TableHead className="px-4 text-xs font-semibold uppercase text-muted-foreground">
                                Usia
                            </TableHead>
                            <TableHead className="px-4 text-xs font-semibold uppercase text-muted-foreground">
                                Status Risiko
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
                                        key={p.uid}
                                        className={cn(rowHeightClassName, 'hover:bg-muted/20')}
                                    >
                                        <TableCell className="px-4 font-medium text-muted-foreground">
                                            {p.uid}
                                        </TableCell>
                                        <TableCell className="px-4 font-semibold">{p.namaBalita}</TableCell>
                                        <TableCell className="px-4 text-muted-foreground">{p.namaIbu}</TableCell>
                                        <TableCell className="px-4 text-muted-foreground">{p.usia}</TableCell>
                                        <TableCell className="px-4">
                                            <RiskBadge status={p.status} />
                                        </TableCell>
                                        <TableCell className="px-4 text-right">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                className="h-8 rounded-md"
                                                onClick={() => onOpenDetail(p.uid)}
                                            >
                                                Detail
                                            </Button>
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

