import * as React from 'react';
import {
    ArrowLeft,
    CalendarDays,
    CircleAlert,
    Dot,
    Printer,
    Send,
    SquarePen,
    UserRound,
} from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

const card3dClassName =
    'relative overflow-hidden transition-all duration-200 ease-out will-change-transform ' +
    'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 hover:ring-1 hover:ring-foreground/10 ' +
    'before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-0 before:transition-opacity ' +
    'hover:before:opacity-100 dark:before:from-white/10';

const kontribusiUtama = [
    { label: 'Tinggi Badan (Z-score -2.8)', value: 34, color: 'bg-red-500' },
    { label: 'Riwayat Diare (Berulang)', value: 22, color: 'bg-orange-500' },
    { label: 'Asupan Protein (Kurang)', value: 14, color: 'bg-amber-500' },
];

const rekomendasi = [
    {
        title: 'Rujukan FKTL Segera',
        description: 'Z-score Tinggi/Umur sangat rendah (-2.8) disertai riwayat klinis yang memburuk.',
        className: 'border-red-200 bg-red-50',
    },
    {
        title: 'Edukasi PMBA Intensif',
        description: 'Fokus pada asupan protein hewani ganda dan perbaikan sanitasi air minum.',
        className: 'border-emerald-200 bg-emerald-50',
    },
    {
        title: 'Jadwal Pantau Ketat',
        description: 'Lakukan pengukuran antropometri setiap 2 minggu selama 2 bulan ke depan.',
        className: 'border-slate-200 bg-slate-50',
    },
];

const growthChartData = [
    { month: 'Jan', zscore: -2.1 },
    { month: 'Feb', zscore: -2.2 },
    { month: 'Mar', zscore: -2.4 },
    { month: 'Apr', zscore: -2.5 },
    { month: 'Mei', zscore: -2.7 },
    { month: 'Jun', zscore: -2.8 },
];

const growthChartConfig = {
    zscore: {
        label: 'Tinggi Z-Score',
        color: '#dc2626',
    },
} satisfies ChartConfig;

const riwayatPemeriksaan = [
    { tanggal: '15 Apr 2024', usia: '18 bln', bb: '9.2', tb: '74.5', zscore: '-2.8', status: 'Tinggi' as const },
    { tanggal: '12 Mar 2024', usia: '17 bln', bb: '9.0', tb: '74.0', zscore: '-2.4', status: 'Sedang' as const },
    { tanggal: '10 Feb 2024', usia: '16 bln', bb: '8.8', tb: '73.2', zscore: '-2.1', status: 'Sedang' as const },
];

function RiskBadge({ status }: { status: 'Tinggi' | 'Sedang' | 'Normal' }) {
    if (status === 'Tinggi') {
        return <Badge className="rounded-full bg-red-100 text-red-800 hover:bg-red-100">Tinggi</Badge>;
    }

    if (status === 'Sedang') {
        return <Badge className="rounded-full bg-amber-100 text-amber-800 hover:bg-amber-100">Sedang</Badge>;
    }

    return <Badge className="rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Normal</Badge>;
}

export default function ManajemenPasienShow({
    id,
    onBack,
}: {
    id: string;
    onBack: () => void;
}) {
    const [isEditingIdentity, setIsEditingIdentity] = React.useState(false);
    const [patientIdentity, setPatientIdentity] = React.useState({
        namaBayi: 'Muhammad Rizky',
        namaIbu: 'Siti Rahmawati',
        namaAyah: 'Ahmad Fauzi',
        nomorTelepon: '08123456789',
    });
    const [draftIdentity, setDraftIdentity] = React.useState(patientIdentity);

    const startEditIdentity = () => {
        setDraftIdentity(patientIdentity);
        setIsEditingIdentity(true);
    };

    const cancelEditIdentity = () => {
        setDraftIdentity(patientIdentity);
        setIsEditingIdentity(false);
    };

    const saveEditIdentity = () => {
        setPatientIdentity(draftIdentity);
        setIsEditingIdentity(false);
    };

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-sm text-muted-foreground">Manajemen Pasien</p>
                    <h1 className="text-2xl font-bold tracking-tight">Detail Pasien</h1>
                </div>
                <Button type="button" variant="outline" onClick={onBack}>
                    <ArrowLeft className="mr-2 size-4" />
                    Kembali
                </Button>
            </div>

            <Card className={cn(card3dClassName, 'bg-white')}>
                <CardContent className="p-4 md:p-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex size-14 items-center justify-center rounded-full bg-muted text-xl font-bold text-foreground">
                                MR
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">{patientIdentity.namaBayi}</h2>
                                <Badge className="mt-1 rounded-full bg-red-100 text-red-800 hover:bg-red-100">
                                    RISIKO TINGGI
                                </Badge>
                                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                    <span className="inline-flex items-center gap-1.5">
                                        <CircleAlert className="size-4" />
                                        {id}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5">
                                        <UserRound className="size-4" />
                                        Laki-laki
                                    </span>
                                    <span className="inline-flex items-center gap-1.5">
                                        <CalendarDays className="size-4" />
                                        18 Bulan
                                    </span>
                                </div>
                                <div className="mt-2 grid gap-1 text-sm text-muted-foreground">
                                    <p>
                                        Nama Ibu: <span className="font-medium text-foreground">{patientIdentity.namaIbu}</span>
                                    </p>
                                    <p>
                                        Nama Ayah: <span className="font-medium text-foreground">{patientIdentity.namaAyah}</span>
                                    </p>
                                    <p>
                                        Nomor Telpon: <span className="font-medium text-foreground">{patientIdentity.nomorTelepon}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <Button type="button" variant="outline">
                                <Printer className="mr-2 size-4" />
                                Cetak Laporan
                            </Button>
                            <Button type="button" variant="outline">
                                <Send className="mr-2 size-4" />
                                Kirim via WhatsApp
                            </Button>
                            <Button type="button" onClick={startEditIdentity}>
                                <SquarePen className="mr-2 size-4" />
                                Edit
                            </Button>
                        </div>
                    </div>

                    {isEditingIdentity ? (
                        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50/30 p-4">
                            <p className="mb-3 text-sm font-semibold text-emerald-800">Edit Data Identitas Pasien</p>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                <div>
                                    <label className="text-sm font-medium">Nama Bayi</label>
                                    <Input
                                        className="mt-1 h-10 bg-white"
                                        value={draftIdentity.namaBayi}
                                        onChange={(e) =>
                                            setDraftIdentity((prev) => ({ ...prev, namaBayi: e.target.value }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Nomor Telpon</label>
                                    <Input
                                        className="mt-1 h-10 bg-white"
                                        value={draftIdentity.nomorTelepon}
                                        onChange={(e) =>
                                            setDraftIdentity((prev) => ({ ...prev, nomorTelepon: e.target.value }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Nama Ibu</label>
                                    <Input
                                        className="mt-1 h-10 bg-white"
                                        value={draftIdentity.namaIbu}
                                        onChange={(e) =>
                                            setDraftIdentity((prev) => ({ ...prev, namaIbu: e.target.value }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Nama Ayah</label>
                                    <Input
                                        className="mt-1 h-10 bg-white"
                                        value={draftIdentity.namaAyah}
                                        onChange={(e) =>
                                            setDraftIdentity((prev) => ({ ...prev, namaAyah: e.target.value }))
                                        }
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-end gap-2">
                                <Button type="button" variant="outline" onClick={cancelEditIdentity}>
                                    Batal
                                </Button>
                                <Button type="button" onClick={saveEditIdentity}>
                                    Simpan
                                </Button>
                            </div>
                        </div>
                    ) : null}
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                <Card className={cn(card3dClassName, 'bg-white xl:col-span-1')}>
                    <CardContent className="p-0">
                        <div className="rounded-t-xl border-b bg-red-50 p-4">
                            <p className="text-sm font-semibold text-red-900">Analisis Risiko AI</p>
                            <div className="mt-2 flex items-end gap-2">
                                <span className="text-5xl font-black text-red-700">82%</span>
                                <span className="mb-1 text-sm text-red-800">
                                    Probabilitas stunting
                                    <br />
                                    dalam 3 bulan
                                </span>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-sm font-semibold text-foreground">Faktor Kontribusi Utama (SHAP)</p>
                            <div className="mt-3 space-y-3">
                                {kontribusiUtama.map((item) => (
                                    <div key={item.label}>
                                        <div className="mb-1 flex items-center justify-between text-xs">
                                            <span className="text-muted-foreground">{item.label}</span>
                                            <span className="font-semibold text-red-700">+{item.value}%</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-muted">
                                            <div
                                                className={cn('h-2 rounded-full', item.color)}
                                                style={{ width: `${item.value}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className={cn(card3dClassName, 'bg-white xl:col-span-2')}>
                    <CardContent className="p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-lg font-semibold">Kurva Pertumbuhan WHO</p>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="rounded-full bg-emerald-50 text-emerald-700">
                                    Tinggi/Umur
                                </Badge>
                                <Badge variant="outline" className="rounded-full">
                                    Berat/Umur
                                </Badge>
                            </div>
                        </div>
                        <ChartContainer
                            config={growthChartConfig}
                            className="h-[240px] w-full overflow-hidden rounded-lg border bg-gradient-to-b from-amber-50 to-white p-2"
                        >
                            <LineChart
                                accessibilityLayer
                                data={growthChartData}
                                margin={{ left: 12, right: 12, top: 8 }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                />
                                <YAxis
                                    dataKey="zscore"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    domain={[-3.2, -1.8]}
                                    tickFormatter={(value) => value.toFixed(1)}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="line" />}
                                />
                                <Line
                                    dataKey="zscore"
                                    type="natural"
                                    stroke="var(--color-zscore)"
                                    strokeWidth={2.5}
                                    dot={{ fill: 'var(--color-zscore)', r: 3 }}
                                    activeDot={{ r: 5 }}
                                />
                                <ChartLegend content={<ChartLegendContent />} />
                            </LineChart>
                        </ChartContainer>
                        <div className="mt-2 flex items-center justify-end text-xs text-muted-foreground">
                            <Dot className="size-4 text-red-600" />
                            Z-Score mendekati -3 menandakan risiko makin tinggi
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                <Card className={cn(card3dClassName, 'bg-white xl:col-span-1')}>
                    <CardContent className="p-4">
                        <p className="text-lg font-semibold">Rekomendasi Klinis</p>
                        <div className="mt-4 space-y-3">
                            {rekomendasi.map((item) => (
                                <div key={item.title} className={cn('rounded-lg border p-3', item.className)}>
                                    <p className="text-sm font-semibold">{item.title}</p>
                                    <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className={cn(card3dClassName, 'bg-white xl:col-span-2')}>
                    <CardContent className="p-4">
                        <div className="mb-3 flex items-center justify-between">
                            <p className="text-lg font-semibold">Riwayat Pemeriksaan</p>
                            <Button type="button" variant="ghost" size="sm">
                                Lihat Semua
                            </Button>
                        </div>
                        <div className="overflow-hidden rounded-lg border">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30">
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead>Usia</TableHead>
                                        <TableHead>BB (kg)</TableHead>
                                        <TableHead>TB (cm)</TableHead>
                                        <TableHead>Z-Score (TB/U)</TableHead>
                                        <TableHead>Status Risiko</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {riwayatPemeriksaan.map((row) => (
                                        <TableRow key={row.tanggal}>
                                            <TableCell>{row.tanggal}</TableCell>
                                            <TableCell>{row.usia}</TableCell>
                                            <TableCell>{row.bb}</TableCell>
                                            <TableCell>{row.tb}</TableCell>
                                            <TableCell className="font-semibold text-red-700">{row.zscore}</TableCell>
                                            <TableCell>
                                                <RiskBadge status={row.status} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

