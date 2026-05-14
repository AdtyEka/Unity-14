import { router, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    CalendarDays,
    CircleAlert,
    Dot,
    Info,
    LoaderCircle,
    Printer,
    Send,
    SquarePen,
    UserRound,
    Plus,
    Trash2,
    AlertTriangle,
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import * as React from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
    
} from '@/components/ui/chart';
import type {ChartConfig} from '@/components/ui/chart';
import { Input } from '@/components/ui/input';
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

const categoryStyles: Record<string, string> = {
    'Rujukan Medis': 'border-red-200 bg-red-50',
    'Edukasi PMBA': 'border-emerald-200 bg-emerald-50',
    'Perbaikan Gizi': 'border-amber-200 bg-amber-50',
    'Pemantauan Pertumbuhan': 'border-slate-200 bg-slate-50',
    'Sanitasi dan Kebersihan': 'border-blue-200 bg-blue-50',
    'Konseling Orang Tua': 'border-purple-200 bg-purple-50',
    'Jadwal Kontrol': 'border-indigo-200 bg-indigo-50',
    'Pencegahan Infeksi': 'border-orange-200 bg-orange-50',
    'Imunisasi': 'border-cyan-200 bg-cyan-50',
    'Asupan Protein': 'border-teal-200 bg-teal-50',
};

const rekomendasiTanpaMl = [
    {
        title: 'Pertumbuhan menurut WHO',
        description:
            'Plotting Z-score panjang/tinggi dan berat badan pada kurva WHO sesuai usia. Diskusikan tren dengan tenaga kesehatan.',
        className: 'border-emerald-200 bg-emerald-50',
    },
    {
        title: 'ASI & MPASI / gizi',
        description: 'Pastikan ASI eksklusif sesuai usia dan transisi MPASI yang cukup energi-protein.',
        className: 'border-slate-200 bg-slate-50',
    },
    {
        title: 'Jadwal posyandu',
        description: 'Lanjutkan pemantauan rutin sesuai jadwal posyandu atau poli anak.',
        className: 'border-slate-200 bg-slate-50',
    },
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

function RiskBadge({ status }: { status: string }) {
    if (status === 'Severely Stunted' || status === 'Stunting Berat' || status === 'Tinggi') {
        return <Badge className="rounded-full bg-red-100 text-red-800 hover:bg-red-100">Stunting Berat</Badge>;
    }

    if (status === 'Stunted' || status === 'Stunting' || status === 'Stunting Ringan' || status === 'Sedang') {
        return <Badge className="rounded-full bg-amber-100 text-amber-800 hover:bg-amber-100">Stunting</Badge>;
    }

    if (status === 'Normal') {
        return <Badge className="rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Normal</Badge>;
    }

    return <Badge variant="outline" className="rounded-full bg-slate-50 text-slate-500">{status}</Badge>;
}

export default function ManajemenPasienShow({
    pasien,
    tanpaPrediksiMl = false,
    baseUrl = '/admin/pasien',
    onBack,
}: {
    pasien: any;
    /** Dari pemeriksaan baru di luar rentang model ML (mis. 0–11 bulan). */
    tanpaPrediksiMl?: boolean;
    baseUrl?: string;
    onBack: () => void;
}) {
    const [isEditingIdentity, setIsEditingIdentity] = React.useState(false);
    const { data, setData, patch, processing, reset } = useForm({
        nama_bayi: pasien.namaBayi || '',
        nama_ibu: pasien.namaIbu || '',
        nama_ayah: pasien.namaAyah || '',
        nomor_hp: pasien.nomorHp || '',
        nik_ibu: pasien.nikIbu || '',
        tanggal_lahir: pasien.tanggalLahir || '',
        jenis_kelamin: pasien.jenisKelamin || 'Laki-laki',
    });

    const startEditIdentity = () => {
        reset();
        setIsEditingIdentity(true);
    };

    const cancelEditIdentity = () => {
        setIsEditingIdentity(false);
    };

    const saveEditIdentity = () => {
        patch(`${baseUrl}/${pasien.id}`, {
            onSuccess: () => setIsEditingIdentity(false),
        });
    };

    // Pemeriksaan CRUD State
    const [isPemeriksaanDialogOpen, setIsPemeriksaanDialogOpen] = React.useState(false);
    const [pemeriksaanMode, setPemeriksaanMode] = React.useState<'add' | 'edit'>('add');
    const [selectedPemeriksaan, setSelectedPemeriksaan] = React.useState<any>(null);

    const pemeriksaanForm = useForm({
        tanggal_pemeriksaan: new Date().toISOString().split('T')[0],
        tinggi_badan: '',
        berat_badan: '',
    });

    const openAddPemeriksaan = () => {
        setPemeriksaanMode('add');
        setSelectedPemeriksaan(null);
        pemeriksaanForm.reset({
            tanggal_pemeriksaan: new Date().toISOString().split('T')[0],
            tinggi_badan: '',
            berat_badan: '',
        });
        setIsPemeriksaanDialogOpen(true);
    };

    const openEditPemeriksaan = (p: any) => {
        setPemeriksaanMode('edit');
        setSelectedPemeriksaan(p);
        pemeriksaanForm.setData({
            tanggal_pemeriksaan: p.tanggalRaw,
            tinggi_badan: p.tb,
            berat_badan: p.bb,
        });
        setIsPemeriksaanDialogOpen(true);
    };

    const submitPemeriksaan = () => {
        if (pemeriksaanMode === 'add') {
            pemeriksaanForm.post(`${baseUrl}/${pasien.id}/pemeriksaan`, {
                onSuccess: () => {
                    setIsPemeriksaanDialogOpen(false);
                    pemeriksaanForm.reset();
                },
            });
        } else {
            pemeriksaanForm.patch(`${baseUrl}/${pasien.id}/pemeriksaan/${selectedPemeriksaan.id}`, {
                onSuccess: () => {
                    setIsPemeriksaanDialogOpen(false);
                    pemeriksaanForm.reset();
                },
            });
        }
    };

    const deletePemeriksaan = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus data pemeriksaan ini?')) {
            router.delete(`${baseUrl}/${pasien.id}/pemeriksaan/${id}`);
        }
    };

    // Duplicate month check
    const isDuplicateMonth = React.useMemo(() => {
        if (!pemeriksaanForm.data.tanggal_pemeriksaan) return false;
        
        const currentMonthYear = pemeriksaanForm.data.tanggal_pemeriksaan.substring(0, 7); // YYYY-MM
        return pasien.riwayatPemeriksaan.some((p: any) => {
            // If editing, don't flag the same record as duplicate
            if (pemeriksaanMode === 'edit' && p.id === selectedPemeriksaan?.id) return false;
            return p.tanggalRaw.substring(0, 7) === currentMonthYear;
        });
    }, [pemeriksaanForm.data.tanggal_pemeriksaan, pasien.riwayatPemeriksaan, pemeriksaanMode, selectedPemeriksaan]);

    // Derive data from history
    const latestPemeriksaan = pasien.riwayatPemeriksaan?.[0];
    
    const dynamicKontribusi = React.useMemo(() => {
        if (!latestPemeriksaan?.shap) return kontribusiUtama;
        
        const shap = latestPemeriksaan.shap;
        return [
            { label: 'Tinggi Badan', value: Math.abs(shap.tinggi_cm * 10), color: shap.tinggi_cm > 0 ? 'bg-emerald-500' : 'bg-red-500' },
            { label: 'Berat Badan', value: Math.abs(shap.berat_kg * 10), color: shap.berat_kg > 0 ? 'bg-emerald-500' : 'bg-red-500' },
            { label: 'Umur', value: Math.abs(shap.umur_bulan * 10), color: shap.umur_bulan > 0 ? 'bg-emerald-500' : 'bg-red-500' },
            { label: 'Jenis Kelamin', value: Math.abs(shap.jenis_kelamin * 10), color: shap.jenis_kelamin > 0 ? 'bg-emerald-500' : 'bg-red-500' },
        ].sort((a, b) => b.value - a.value).slice(0, 3);
    }, [latestPemeriksaan]);

    const dynamicRekomendasi = React.useMemo(() => {
        // Cari pemeriksaan terbaru yang memiliki rekomendasi
        const pemeriksaanWithRekomendasi = pasien.riwayatPemeriksaan?.find((p: any) => p.rekomendasi);

        if (!pemeriksaanWithRekomendasi) {
            return [];
        }

        return pemeriksaanWithRekomendasi.rekomendasi.map((item: any) => ({
            title: item.title,
            description: item.description,
            className: categoryStyles[item.category] || 'border-slate-200 bg-slate-50',
        }));
    }, [pasien.riwayatPemeriksaan]);

    const dynamicGrowthData = React.useMemo(() => {
        return [...pasien.riwayatPemeriksaan]
            .reverse()
            .filter((p: any) => p.zscore !== '-')
            .map((p: any) => ({
                month: p.tanggal.split(' ')[1],
                zscore: parseFloat(p.zscore)
            }));
    }, [pasien.riwayatPemeriksaan]);

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-sm text-muted-foreground">Manajemen Pasien</p>
                    <h1 className="text-2xl font-bold tracking-tight">Detail Pasien</h1>
                </div>
                <Button type="button" variant="outline" onClick={() => router.get(baseUrl)}>
                    <ArrowLeft className="mr-2 size-4" />
                    Kembali
                </Button>
            </div>

            {tanpaPrediksiMl ? (
                <div className="flex items-start gap-3 rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-950">
                    <Info className="mt-0.5 size-4 shrink-0 text-sky-700" />
                    <p className="leading-relaxed">
                        <span className="font-medium">Pemeriksaan tersimpan tanpa prediksi ML.</span> Untuk usia di luar
                        rentang model (1–5 tahun) atau bayi di bawah 1 tahun, gunakan interpretasi{' '}
                        <span className="font-medium">kurva pertumbuhan WHO</span> dan penilaian klinis — bukan skor
                        probabilitas AI.
                    </p>
                </div>
            ) : null}

            <Card className={cn(card3dClassName, 'bg-white')}>
                <CardContent className="p-4 md:p-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex size-14 items-center justify-center rounded-full bg-muted text-xl font-bold text-foreground">
                                {pasien.namaBayi.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">{pasien.namaBayi}</h2>
                                {tanpaPrediksiMl ? (
                                    <Badge className="mt-1 rounded-full bg-sky-100 text-sky-800 hover:bg-sky-100">
                                        Pencatatan antropometri
                                    </Badge>
                                ) : latestPemeriksaan?.status === 'Normal' ? (
                                    <Badge className="mt-1 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                                        RISIKO RENDAH
                                    </Badge>
                                ) : latestPemeriksaan?.status === 'Menunggu prediksi' ? (
                                    <Badge className="mt-1 rounded-full bg-slate-100 text-slate-600 animate-pulse">
                                        SEDANG DIPROSES
                                    </Badge>
                                ) : (
                                    <Badge className="mt-1 rounded-full bg-red-100 text-red-800 hover:bg-red-100">
                                        RISIKO TINGGI
                                    </Badge>
                                )}
                                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                    <span className="inline-flex items-center gap-1.5">
                                        <CircleAlert className="size-4" />
                                        {pasien.id}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5">
                                        <UserRound className="size-4" />
                                        {pasien.jenisKelamin}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5">
                                        <CalendarDays className="size-4" />
                                        {pasien.umur}
                                    </span>
                                </div>
                                <div className="mt-2 grid gap-1 text-sm text-muted-foreground">
                                    <p>
                                        Nama Ibu: <span className="font-medium text-foreground">{pasien.namaIbu}</span>
                                    </p>
                                    <p>
                                        Nama Ayah: <span className="font-medium text-foreground">{pasien.namaAyah || '-'}</span>
                                    </p>
                                    <p>
                                        Nomor Telpon: <span className="font-medium text-foreground">{pasien.nomorHp || '-'}</span>
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
                            <Button type="button" onClick={startEditIdentity} disabled={processing}>
                                <SquarePen className="mr-2 size-4" />
                                Edit
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                onClick={() => {
                                    if (confirm(`Apakah Anda yakin ingin menghapus data pasien ${pasien.namaBayi}? Semua data pemeriksaan terkait juga akan dihapus.`)) {
                                        router.delete(`${baseUrl}/${pasien.id}`);
                                    }
                                }}
                                disabled={processing}
                            >
                                Hapus Pasien
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
                                        value={data.nama_bayi}
                                        onChange={(e) =>
                                            setData('nama_bayi', e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Nomor Telpon</label>
                                    <Input
                                        className="mt-1 h-10 bg-white"
                                        value={data.nomor_hp}
                                        onChange={(e) =>
                                            setData('nomor_hp', e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Nama Ibu</label>
                                    <Input
                                        className="mt-1 h-10 bg-white"
                                        value={data.nama_ibu}
                                        onChange={(e) =>
                                            setData('nama_ibu', e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Nama Ayah</label>
                                    <Input
                                        className="mt-1 h-10 bg-white"
                                        value={data.nama_ayah}
                                        onChange={(e) =>
                                            setData('nama_ayah', e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-end gap-2">
                                <Button type="button" variant="outline" onClick={cancelEditIdentity} disabled={processing}>
                                    Batal
                                </Button>
                                <Button type="button" onClick={saveEditIdentity} disabled={processing}>
                                    {processing ? <LoaderCircle className="mr-2 size-4 animate-spin" /> : null}
                                    Simpan
                                </Button>
                            </div>
                        </div>
                    ) : null}
                </CardContent>
            </Card>

            {!tanpaPrediksiMl ? (
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                    <Card className={cn(card3dClassName, 'gap-0 py-0 bg-white xl:col-span-1')}>
                        <CardContent className="p-0">
                            <div className={cn("rounded-t-xl border-b p-4", latestPemeriksaan?.status === 'Normal' ? "bg-emerald-50" : "bg-red-50")}>
                                <p className={cn("text-sm font-semibold", latestPemeriksaan?.status === 'Normal' ? "text-emerald-900" : "text-red-900")}>Analisis Risiko AI</p>
                                <div className="mt-2 flex items-end gap-2">
                                    <span className={cn("text-5xl font-black", latestPemeriksaan?.status === 'Normal' ? "text-emerald-700" : "text-red-700")}>
                                        {latestPemeriksaan?.confidence || '-%'}
                                    </span>
                                    <span className={cn("mb-1 text-sm", latestPemeriksaan?.status === 'Normal' ? "text-emerald-800" : "text-red-800")}>
                                        {latestPemeriksaan?.status === 'Menunggu prediksi' ? 'Sedang menghitung...' : 'Probabilitas status'}
                                        <br />
                                        {latestPemeriksaan?.status === 'Menunggu prediksi' ? 'antrian queue' : 'berdasarkan model'}
                                    </span>
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-sm font-semibold text-foreground">Faktor Kontribusi Utama (SHAP)</p>
                                <div className="mt-3 space-y-3">
                                    {latestPemeriksaan?.status === 'Menunggu prediksi' ? (
                                        <div className="flex flex-col items-center justify-center py-6 text-center">
                                            <LoaderCircle className="size-8 animate-spin text-muted-foreground" />
                                            <p className="mt-2 text-xs text-muted-foreground">Menunggu data prediksi...</p>
                                        </div>
                                    ) : (
                                        dynamicKontribusi.map((item) => (
                                            <div key={item.label}>
                                                <div className="mb-1 flex items-center justify-between text-xs">
                                                    <span className="text-muted-foreground">{item.label}</span>
                                                    <span className={cn("font-semibold", item.color.replace('bg-', 'text-'))}>
                                                        {item.color === 'bg-red-500' ? '-' : '+'}{(item.value / 10).toFixed(2)}
                                                    </span>
                                                </div>
                                                <div className="h-2 rounded-full bg-muted">
                                                    <div
                                                        className={cn('h-2 rounded-full', item.color)}
                                                        style={{ width: `${Math.min(item.value * 2, 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    )}
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
                                    data={dynamicGrowthData}
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
                                        domain={['auto', 'auto']}
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
            ) : null}

            <div className={cn('grid grid-cols-1 gap-4', tanpaPrediksiMl ? 'xl:grid-cols-1' : 'xl:grid-cols-3')}>
                {!tanpaPrediksiMl ? (
                    <Card className={cn(card3dClassName, 'bg-white xl:col-span-1')}>
                        <CardContent className="p-4">
                            <p className="text-lg font-semibold">Rekomendasi Klinis</p>
                            <div className="mt-4 space-y-3">
                                {dynamicRekomendasi.length > 0 ? (
                                    dynamicRekomendasi.map((item: any) => (
                                        <div key={item.title} className={cn('rounded-lg border p-3', item.className)}>
                                            <p className="text-sm font-semibold">{item.title}</p>
                                            <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-8 text-center">
                                        <p className="text-sm font-medium text-muted-foreground">Belum ada rekomendasi</p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            Rekomendasi akan muncul setelah pemeriksaan diproses oleh AI.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ) : null}

                <Card className={cn(card3dClassName, 'bg-white', tanpaPrediksiMl ? 'xl:col-span-1' : 'xl:col-span-2')}>
                    <CardContent className="p-4">
                        <div className="mb-3 flex items-center justify-between">
                            <p className="text-lg font-semibold">
                                {tanpaPrediksiMl ? 'Catatan Antropometri' : 'Riwayat Pemeriksaan'}
                            </p>
                            <div className="flex items-center gap-2">
                                <Button type="button" size="sm" onClick={openAddPemeriksaan}>
                                    <Plus className="mr-2 size-4" />
                                    Tambah Pemeriksaan
                                </Button>
                                <Button type="button" variant="ghost" size="sm">
                                    Lihat Semua
                                </Button>
                            </div>
                        </div>
                        <div className="overflow-hidden rounded-lg border">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30">
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead>Usia</TableHead>
                                        <TableHead>BB (kg)</TableHead>
                                        <TableHead>TB (cm)</TableHead>
                                        {!tanpaPrediksiMl ? <TableHead>Z-Score (TB/U)</TableHead> : null}
                                        {!tanpaPrediksiMl ? <TableHead>Status Risiko</TableHead> : null}
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pasien.riwayatPemeriksaan.map((row: any) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.tanggal}</TableCell>
                                            <TableCell>{row.usia}</TableCell>
                                            <TableCell>{row.bb}</TableCell>
                                            <TableCell>{row.tb}</TableCell>
                                            {!tanpaPrediksiMl ? (
                                                <TableCell className={cn("font-semibold", parseFloat(row.zscore) < -2 ? "text-red-700" : "text-emerald-700")}>{row.zscore}</TableCell>
                                            ) : null}
                                            {!tanpaPrediksiMl ? (
                                                <TableCell>
                                                    <RiskBadge status={row.status} />
                                                </TableCell>
                                            ) : null}
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="size-8"
                                                        onClick={() => openEditPemeriksaan(row)}
                                                    >
                                                        <SquarePen className="size-4" />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="size-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                                        onClick={() => deletePemeriksaan(row.id)}
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Dialog Tambah/Edit Pemeriksaan */}
            <Dialog open={isPemeriksaanDialogOpen} onOpenChange={setIsPemeriksaanDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            {pemeriksaanMode === 'add' ? 'Tambah Pemeriksaan' : 'Edit Pemeriksaan'}
                        </DialogTitle>
                        <DialogDescription>
                            Masukkan data antropometri terbaru untuk pasien {pasien.namaBayi}.
                        </DialogDescription>
                    </DialogHeader>

                    {isDuplicateMonth && (
                        <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-950">
                            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-700" />
                            <p>
                                <span className="font-semibold text-amber-900">⚠️ Peringatan:</span> Sudah ada pemeriksaan pada bulan ini ({new Date(pemeriksaanForm.data.tanggal_pemeriksaan).toLocaleString('id-ID', { month: 'long', year: 'numeric' })}). Apakah Anda yakin ingin membuat pemeriksaan lagi?
                            </p>
                        </div>
                    )}

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="tanggal">Tanggal Pemeriksaan</Label>
                            <Input
                                id="tanggal"
                                type="date"
                                value={pemeriksaanForm.data.tanggal_pemeriksaan}
                                onChange={(e) => pemeriksaanForm.setData('tanggal_pemeriksaan', e.target.value)}
                                className={cn(pemeriksaanForm.errors.tanggal_pemeriksaan && "border-destructive")}
                            />
                            {pemeriksaanForm.errors.tanggal_pemeriksaan && (
                                <p className="text-xs text-destructive">{pemeriksaanForm.errors.tanggal_pemeriksaan}</p>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="bb">Berat Badan (kg)</Label>
                                <Input
                                    id="bb"
                                    type="number"
                                    step="0.1"
                                    placeholder="Contoh: 8.5"
                                    value={pemeriksaanForm.data.berat_badan}
                                    onChange={(e) => pemeriksaanForm.setData('berat_badan', e.target.value)}
                                    className={cn(pemeriksaanForm.errors.berat_badan && "border-destructive")}
                                />
                                {pemeriksaanForm.errors.berat_badan && (
                                    <p className="text-xs text-destructive">{pemeriksaanForm.errors.berat_badan}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="tb">Tinggi Badan (cm)</Label>
                                <Input
                                    id="tb"
                                    type="number"
                                    step="0.1"
                                    placeholder="Contoh: 75.0"
                                    value={pemeriksaanForm.data.tinggi_badan}
                                    onChange={(e) => pemeriksaanForm.setData('tinggi_badan', e.target.value)}
                                    className={cn(pemeriksaanForm.errors.tinggi_badan && "border-destructive")}
                                />
                                {pemeriksaanForm.errors.tinggi_badan && (
                                    <p className="text-xs text-destructive">{pemeriksaanForm.errors.tinggi_badan}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsPemeriksaanDialogOpen(false)} disabled={pemeriksaanForm.processing}>
                            Batal
                        </Button>
                        <Button type="button" onClick={submitPemeriksaan} disabled={pemeriksaanForm.processing}>
                            {pemeriksaanForm.processing && <LoaderCircle className="mr-2 size-4 animate-spin" />}
                            Simpan Pemeriksaan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

