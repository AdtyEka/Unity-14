import * as React from 'react';
import { Calendar, Download, FileSpreadsheet, FileText, Filter, Play, RefreshCw } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import FormatOption from '@/pages/admin/ekspor/_components/FormatOption';
import TypeOption from '@/pages/admin/ekspor/_components/TypeOption';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type ReportType = 'Mingguan' | 'Bulanan' | 'Tahunan';
type DownloadFormat = 'pdf' | 'xlsx' | 'csv';

type RecentReport = {
    id: string;
    title: string;
    subtitle: string;
    color: 'red' | 'green';
};

const card3dClassName =
    'relative overflow-hidden transition-all duration-200 ease-out will-change-transform ' +
    'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 hover:ring-1 hover:ring-foreground/10 ' +
    'before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-0 before:transition-opacity ' +
    'hover:before:opacity-100 dark:before:from-white/10';

const recentSeed: RecentReport[] = [
    {
        id: 'r-1',
        title: 'Laporan Bulanan Surveilans Gizi ...',
        subtitle: 'Hari ini, 09:41',
        color: 'red',
    },
    {
        id: 'r-2',
        title: 'Data Mentah Antropometri - ...',
        subtitle: 'Kemarin, 14:20',
        color: 'green',
    },
    {
        id: 'r-3',
        title: 'Laporan Rujukan Pasien Stunting...',
        subtitle: '12 Agt 2024',
        color: 'red',
    },
];

export default function EksporPage() {
    const [type, setType] = React.useState<ReportType>('Mingguan');
    const [format, setFormat] = React.useState<DownloadFormat>('pdf');

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Ekspor Laporan</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Unduh data surveilans dan riwayat klinis untuk pelaporan.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <Card className={cn(card3dClassName, 'bg-white lg:col-span-2')}>
                    <CardContent className="p-4 md:p-5">
                        <div className="flex items-center gap-2">
                            <div className="text-emerald-700 [&>svg]:size-5">
                                <Filter className="size-5" />
                            </div>
                            <h2 className="text-base font-semibold text-foreground">
                                Konfigurasi Parameter Laporan
                            </h2>
                        </div>

                        <Separator className="my-4" />

                        <div className="space-y-5">
                            <div className="space-y-3">
                                <p className="text-xs font-medium text-muted-foreground">Jenis Laporan</p>
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                    <TypeOption
                                        active={type === 'Mingguan'}
                                        title="Mingguan"
                                        subtitle="Ringkasan 7 hari terakhir"
                                        onClick={() => setType('Mingguan')}
                                    />
                                    <TypeOption
                                        active={type === 'Bulanan'}
                                        title="Bulanan"
                                        subtitle="Agregat data bulanan"
                                        onClick={() => setType('Bulanan')}
                                    />
                                    <TypeOption
                                        active={type === 'Tahunan'}
                                        title="Tahunan"
                                        subtitle="Evaluasi program tahunan"
                                        onClick={() => setType('Tahunan')}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <p className="text-xs font-medium text-muted-foreground">Dari Tanggal</p>
                                    <div className="relative">
                                        <Calendar className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            defaultValue="08/01/2024"
                                            className="h-10 rounded-lg pl-9"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-medium text-muted-foreground">Sampai Tanggal</p>
                                    <div className="relative">
                                        <Calendar className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            defaultValue="08/31/2024"
                                            className="h-10 rounded-lg pl-9"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-xs font-medium text-muted-foreground">
                                    Cakupan Wilayah / Fasyankes
                                </p>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-10 w-full justify-between rounded-lg"
                                >
                                    <span className="truncate text-sm">
                                        Semua Wilayah Bina (Kec. Melati)
                                    </span>
                                    <span className="text-muted-foreground">▾</span>
                                </Button>
                            </div>

                            <div className="space-y-3">
                                <p className="text-xs font-medium text-muted-foreground">Format Unduhan</p>
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                    <FormatOption
                                        active={format === 'pdf'}
                                        title="PDF Document"
                                        icon={<FileText className="size-4 text-red-600" />}
                                        onClick={() => setFormat('pdf')}
                                    />
                                    <FormatOption
                                        active={format === 'xlsx'}
                                        title="Excel (.xlsx)"
                                        icon={<FileSpreadsheet className="size-4 text-emerald-600" />}
                                        onClick={() => setFormat('xlsx')}
                                    />
                                    <FormatOption
                                        active={format === 'csv'}
                                        title="CSV Data"
                                        icon={<Badge variant="outline" className="h-5 rounded-md">CSV</Badge>}
                                        onClick={() => setFormat('csv')}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col-reverse gap-2 md:flex-row md:justify-end">
                            <Button type="button" variant="outline" className="h-10 rounded-lg px-4">
                                <RefreshCw className="mr-2 size-4" />
                                Pratinjau
                            </Button>
                            <Button type="button" className="h-10 rounded-lg px-4">
                                <Play className="mr-2 size-4" />
                                Buat Laporan
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className={cn(card3dClassName, 'bg-white')}>
                    <CardContent className="p-4 md:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <div className="text-emerald-700 [&>svg]:size-5">
                                    <Download className="size-5" />
                                </div>
                                <h2 className="text-base font-semibold text-foreground">
                                    Laporan Terakhir
                                </h2>
                            </div>
                            <Button type="button" variant="ghost" size="sm" className="h-9 rounded-lg">
                                Lihat Semua
                            </Button>
                        </div>

                        <Separator className="my-4" />

                        <div className="space-y-2.5">
                            {recentSeed.map((r) => (
                                <div
                                    key={r.id}
                                    className="flex items-center justify-between gap-3 rounded-xl border bg-white px-3 py-3"
                                >
                                    <div className="flex min-w-0 items-center gap-3">
                                        <div
                                            className={cn(
                                                'flex size-9 items-center justify-center rounded-lg',
                                                r.color === 'red'
                                                    ? 'bg-red-50 text-red-700'
                                                    : 'bg-emerald-50 text-emerald-700',
                                            )}
                                        >
                                            <FileText className="size-4" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold">{r.title}</p>
                                            <p className="text-xs text-muted-foreground">{r.subtitle}</p>
                                        </div>
                                    </div>

                                    <Button type="button" variant="ghost" size="icon-sm" aria-label="Unduh">
                                        <Download />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

