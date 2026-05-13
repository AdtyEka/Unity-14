import * as React from 'react';
import { Calendar, Download, FileSpreadsheet, FileText, Filter, Play, RefreshCw, Loader2 } from 'lucide-react';
import { useForm, usePage } from '@inertiajs/react';

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
    color: 'red' | 'green' | 'blue';
    status: string;
    file_path: string | null;
};

const card3dClassName =
    'relative overflow-hidden transition-all duration-200 ease-out will-change-transform ' +
    'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 hover:ring-1 hover:ring-foreground/10 ' +
    'before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-0 before:transition-opacity ' +
    'hover:before:opacity-100 dark:before:from-white/10';

export default function EksporPage() {
    const { recentReports } = usePage<any>().props;

    const { data, setData, post, processing, errors } = useForm({
        type: 'Mingguan' as ReportType,
        format: 'pdf' as DownloadFormat,
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date().toISOString().split('T')[0],
    });

    const setType = (type: ReportType) => setData('type', type);
    const setFormat = (format: DownloadFormat) => setData('format', format);

    const getMaxEndDate = () => {
        if (!data.start_date) return undefined;
        const start = new Date(data.start_date);
        let maxDate = new Date(start);
        if (data.type === 'Mingguan') {
            maxDate.setDate(start.getDate() + 7);
        } else if (data.type === 'Bulanan') {
            maxDate.setMonth(start.getMonth() + 1);
        } else if (data.type === 'Tahunan') {
            maxDate.setFullYear(start.getFullYear() + 1);
        }
        return maxDate.toISOString().split('T')[0];
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/ekspor', {
            onSuccess: () => alert('Permintaan ekspor berhasil dibuat dan sedang diproses di background.'),
        });
    };

    return (
        <form onSubmit={submit} className="flex flex-col gap-6 p-4 md:p-6">
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
                                        active={data.type === 'Mingguan'}
                                        title="Mingguan"
                                        subtitle="Ringkasan 7 hari terakhir"
                                        onClick={() => setType('Mingguan')}
                                    />
                                    <TypeOption
                                        active={data.type === 'Bulanan'}
                                        title="Bulanan"
                                        subtitle="Agregat data bulanan"
                                        onClick={() => setType('Bulanan')}
                                    />
                                    <TypeOption
                                        active={data.type === 'Tahunan'}
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
                                            type="date"
                                            value={data.start_date}
                                            onChange={(e) => setData('start_date', e.target.value)}
                                            className="h-10 rounded-lg pl-9 w-full"
                                            required
                                        />
                                    </div>
                                    {errors.start_date && <p className="text-xs text-red-500">{errors.start_date}</p>}
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-medium text-muted-foreground">Sampai Tanggal</p>
                                    <div className="relative">
                                        <Calendar className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            type="date"
                                            value={data.end_date}
                                            min={data.start_date}
                                            max={getMaxEndDate()}
                                            onChange={(e) => setData('end_date', e.target.value)}
                                            className="h-10 rounded-lg pl-9 w-full"
                                            required
                                        />
                                    </div>
                                    {errors.end_date && <p className="text-xs text-red-500">{errors.end_date}</p>}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="text-xs font-medium text-muted-foreground">Format Unduhan</p>
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                    <FormatOption
                                        active={data.format === 'pdf'}
                                        title="PDF Document"
                                        icon={<FileText className="size-4 text-red-600" />}
                                        onClick={() => setFormat('pdf')}
                                    />
                                    <FormatOption
                                        active={data.format === 'xlsx'}
                                        title="Excel (.xlsx)"
                                        icon={<FileSpreadsheet className="size-4 text-emerald-600" />}
                                        onClick={() => setFormat('xlsx')}
                                    />
                                    <FormatOption
                                        active={data.format === 'csv'}
                                        title="CSV Data"
                                        icon={<Badge variant="outline" className="h-5 rounded-md">CSV</Badge>}
                                        onClick={() => setFormat('csv')}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col-reverse gap-2 md:flex-row md:justify-end">
                            <Button type="button" variant="outline" className="h-10 rounded-lg px-4" onClick={() => window.location.reload()}>
                                <RefreshCw className="mr-2 size-4" />
                                Segarkan Data
                            </Button>
                            <Button type="submit" disabled={processing} className="h-10 rounded-lg px-4">
                                {processing ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Play className="mr-2 size-4" />}
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
                            {recentReports?.map((r: RecentReport) => (
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
                                                    : r.color === 'green'
                                                    ? 'bg-emerald-50 text-emerald-700'
                                                    : 'bg-blue-50 text-blue-700',
                                            )}
                                        >
                                            <FileText className="size-4" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold">{r.title}</p>
                                            <p className="text-xs text-muted-foreground">{r.subtitle} - <span className="capitalize">{r.status}</span></p>
                                        </div>
                                    </div>

                                    {r.status === 'completed' && r.file_path && (
                                        <Button type="button" variant="ghost" size="icon-sm" aria-label="Unduh" onClick={() => window.open(r.file_path!, '_blank')}>
                                            <Download />
                                        </Button>
                                    )}
                                    {(r.status === 'pending' || r.status === 'processing') && (
                                        <Loader2 className="size-4 animate-spin text-muted-foreground" />
                                    )}
                                </div>
                            ))}
                            {(!recentReports || recentReports.length === 0) && (
                                <p className="text-sm text-center text-muted-foreground py-4">Belum ada riwayat ekspor laporan.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </form>
    );
}

