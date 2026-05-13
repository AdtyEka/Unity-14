import * as React from 'react';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type HealthStatus = '0–11 Bulan' | 'Normal' | 'Stunting Ringan' | 'Stunting Berat';

export type ScheduleRow = {
    uid: string;
    namaBalita: string;
    namaIbu: string;
    noWhatsapp: string;
    usia: string;
    status: HealthStatus;
    tanggalPemeriksaan: string;
    jadwalBerikutnya: string;
    sudahDiingatkan: boolean;
};

const statusVariant: Record<HealthStatus, string> = {
    '0–11 Bulan': 'bg-sky-100 text-sky-800 border-sky-200',
    Normal: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Stunting Ringan': 'bg-amber-100 text-amber-800 border-amber-200',
    'Stunting Berat': 'bg-red-100 text-red-800 border-red-200',
};
const MAX_VISIBLE_ROWS = 5;

function buildWaMessage(row: ScheduleRow): string {
    const msg = [
        `Yth. Ibu ${row.namaIbu},`,
        ``,
        `Kami dari Posyandu mengingatkan bahwa putra/putri Anda *${row.namaBalita}* (${row.usia}) perlu melakukan pemeriksaan kesehatan kembali pada:`,
        `📅 *${row.jadwalBerikutnya}*`,
        ``,
        `Mohon hadir tepat waktu. Terima kasih atas perhatian dan kerjasamanya.`,
        ``,
        `Salam sehat,`,
        `Tim Posyandu`,
    ].join('\n');

    let phone = row.noWhatsapp.replace(/\D/g, '');
    if (phone.startsWith('0')) {
        phone = '62' + phone.substring(1);
    } else if (!phone.startsWith('62')) {
        phone = '62' + phone;
    }

    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

interface ScheduleTableProps {
    rows: ScheduleRow[];
    page: number;
    pageCount: number;
    from: number;
    to: number;
    total: number;
    onPrev: () => void;
    onNext: () => void;
    onMarkReminded: (uid: string) => void;
}

export default function ScheduleTable({
    rows,
    page,
    pageCount,
    from,
    to,
    total,
    onPrev,
    onNext,
    onMarkReminded,
}: ScheduleTableProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b bg-muted/40">
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Pasien
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Usia
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Terakhir Periksa
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Jadwal Berikutnya
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Pengingat
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {rows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="py-10 text-center text-sm text-muted-foreground"
                                >
                                    Tidak ada data yang cocok dengan pencarian.
                                </td>
                            </tr>
                        ) : (
                            <>
                                {rows.map((row) => (
                                    <tr
                                        key={row.uid}
                                        className="transition-colors hover:bg-muted/20"
                                    >
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                                                    {row.namaBalita
                                                        .split(' ')
                                                        .slice(0, 2)
                                                        .map((w) => w[0])
                                                        .join('')}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-medium leading-snug">
                                                        {row.namaBalita}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Ibu: {row.namaIbu}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {row.usia}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge
                                                variant="outline"
                                                className={cn(
                                                    'text-xs font-medium',
                                                    statusVariant[row.status],
                                                )}
                                            >
                                                {row.status}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {row.tanggalPemeriksaan}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                                                {row.jadwalBerikutnya}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex justify-center">
                                                {row.sudahDiingatkan ? (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                                                        ✓ Terkirim
                                                    </span>
                                                ) : (
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-8 gap-1.5 border-green-300 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                                                        onClick={() => {
                                                            window.open(buildWaMessage(row), '_blank');
                                                            onMarkReminded(row.uid);
                                                        }}
                                                    >
                                                        <MessageCircle className="size-3.5" />
                                                        WhatsApp
                                                    </Button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {Array.from({
                                    length: Math.max(0, MAX_VISIBLE_ROWS - rows.length),
                                }).map((_, index) => (
                                    <tr key={`placeholder-${index}`} aria-hidden="true">
                                        <td colSpan={6} className="h-[62px] px-4 py-3" />
                                    </tr>
                                ))}
                            </>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                    {total === 0
                        ? 'Tidak ada data'
                        : `Menampilkan ${from}–${to} dari ${total} pasien`}
                </span>
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={onPrev}
                        disabled={page <= 1}
                        className="rounded-md border p-1.5 transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
                    >
                        <ChevronLeft className="size-4" />
                    </button>
                    <span className="px-2 text-xs">
                        {page} / {pageCount}
                    </span>
                    <button
                        type="button"
                        onClick={onNext}
                        disabled={page >= pageCount}
                        className="rounded-md border p-1.5 transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
                    >
                        <ChevronRight className="size-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
