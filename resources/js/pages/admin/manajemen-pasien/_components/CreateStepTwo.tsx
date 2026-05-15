import { AlertTriangle, ArrowLeft, Calendar, Check, ClipboardList, Info, LoaderCircle } from 'lucide-react';
import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const card3dClassName =
    'relative overflow-hidden transition-all duration-200 ease-out will-change-transform ' +
    'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 hover:ring-1 hover:ring-foreground/10 ' +
    'before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-0 before:transition-opacity ' +
    'hover:before:opacity-100 dark:before:from-white/10';

function Stepper({ prediksiMl }: { prediksiMl: boolean }) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-lg border bg-muted/10 px-4 py-3">
            <div className="flex items-center gap-3">
                <span
                    className={cn(
                        'inline-flex size-7 items-center justify-center rounded-full text-sm font-semibold text-white',
                        prediksiMl ? 'bg-emerald-600' : 'bg-slate-600',
                    )}
                >
                    2
                </span>
                <div>
                    <p className="text-sm font-semibold leading-none">Pemeriksaan Baru — Langkah 2</p>
                    <p className="mt-1 text-xs text-muted-foreground">Langkah 2 dari 2</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant="outline" className="rounded-full bg-white">
                    {prediksiMl ? 'Variabel AI' : 'Dokumentasi'}
                </Badge>
                <div className="h-2 w-44 rounded-full bg-muted/40">
                    <div className={cn('h-2 w-full rounded-full', prediksiMl ? 'bg-emerald-600' : 'bg-slate-500')} />
                </div>
            </div>
        </div>
    );
}

function InfoBox({ children }: { children: React.ReactNode }) {
    return (
        <div className="mt-4 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            <Info className="mt-0.5 size-4 text-emerald-700" />
            <div className="leading-relaxed">{children}</div>
        </div>
    );
}

function WarningBox({ children }: { children: React.ReactNode }) {
    return (
        <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-700" />
            <div className="leading-relaxed">{children}</div>
        </div>
    );
}

function ErrorBox({ title, errors, onAction, actionLabel }: { title: string; errors: string[]; onAction: () => void; actionLabel: string }) {
    return (
        <div className="mt-4 flex flex-col gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
                <div className="flex-1">
                    <p className="font-semibold">{title}</p>
                    <ul className="mt-1 list-inside list-disc space-y-0.5 opacity-90">
                        {errors.map((err, i) => (
                            <li key={i}>{err}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="mt-1 flex justify-end">
                <Button 
                    variant="link" 
                    size="sm" 
                    className="h-auto p-0 text-destructive underline decoration-destructive/30 underline-offset-4 hover:decoration-destructive" 
                    onClick={onAction}
                >
                    {actionLabel}
                </Button>
            </div>
        </div>
    );
}

export default function CreateStepTwo({
    usiaBulan,
    prediksiMl,
    mode = 'new',
    onBack,
    onCancel,
    onSubmit,
    antropometri,
    onAntropometriChange,
    processing,
    errors,
}: {
    /** Usia dari tanggal lahir langkah 1; `null` jika tanggal belum valid. */
    usiaBulan: number | null;
    /** `true` hanya untuk rentang 12–60 bulan (prediksi ML dijalankan). */
    prediksiMl: boolean;
    /** `existing` untuk pasien lama (langsung antropometri). */
    mode?: 'new' | 'existing';
    onBack: () => void;
    onCancel: () => void;
    onSubmit: () => void;
    antropometri?: {
        tanggal_pemeriksaan: string;
        tinggi_badan: string;
        berat_badan: string;
    };
    onAntropometriChange?: (next: {
        tanggal_pemeriksaan: string;
        tinggi_badan: string;
        berat_badan: string;
    }) => void;
    processing?: boolean;
    errors?: Record<string, string>;
}) {
    const [localTanggal, setLocalTanggal] = React.useState(() => {
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    });
    const [localTinggi, setLocalTinggi] = React.useState('');
    const [localBerat, setLocalBerat] = React.useState('');

    const tanggalPemeriksaan = antropometri?.tanggal_pemeriksaan ?? localTanggal;
    const tinggiBadan = antropometri?.tinggi_badan ?? localTinggi;
    const beratBadan = antropometri?.berat_badan ?? localBerat;

    const setTanggalPemeriksaan = (val: string) => {
        if (onAntropometriChange && antropometri) {
            onAntropometriChange({ ...antropometri, tanggal_pemeriksaan: val });
        } else {
            setLocalTanggal(val);
        }
    };

    const setTinggiBadan = (val: string) => {
        if (onAntropometriChange && antropometri) {
            onAntropometriChange({ ...antropometri, tinggi_badan: val });
        } else {
            setLocalTinggi(val);
        }
    };

    const setBeratBadan = (val: string) => {
        if (onAntropometriChange && antropometri) {
            onAntropometriChange({ ...antropometri, berat_badan: val });
        } else {
            setLocalBerat(val);
        }
    };

    const diBawahSatuTahun = usiaBulan !== null && usiaBulan < 12;
    const diAtasLimaTahun = usiaBulan !== null && usiaBulan > 60;
    const labelPanjangTinggi = diBawahSatuTahun ? 'Panjang / tinggi badan' : 'Tinggi badan';
    const deskripsiUsia =
        usiaBulan === null
            ? null
            : `${usiaBulan} bulan (${Math.floor(usiaBulan / 12)} th ${usiaBulan % 12} bln)`;

    const step1Fields = ['nama_bayi', 'tanggal_lahir', 'jenis_kelamin', 'nama_ibu', 'nik_ibu', 'nama_ayah', 'nomor_hp'];
    const step1Errors = Object.keys(errors || {})
        .filter(key => step1Fields.includes(key))
        .map(key => errors![key]);

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    {mode === 'existing' ? 'Pemeriksaan Antropometri' : 'Pemeriksaan Baru — Langkah 2'}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    {mode === 'existing' ? (
                        <>
                            Lengkapi tinggi/panjang dan berat badan sesuai pengukuran hari ini. Data identitas pasien
                            menggunakan data sebelumnya. {prediksiMl ? 'Prediksi ML tersedia untuk usia 1–5 tahun.' : null}
                        </>
                    ) : prediksiMl ? (
                        <>
                            Masukkan panjang/tinggi dan berat badan sesuai pengukuran saat ini. Model ML prediksi stunting
                            tersedia untuk usia <span className="font-medium text-foreground">1–5 tahun</span> (12–60
                            bulan).
                        </>
                    ) : diBawahSatuTahun ? (
                        <>
                            Untuk usia <span className="font-medium text-foreground">di bawah 1 tahun</span> tidak ada
                            model ML di sistem ini. Langkah ini hanya untuk{' '}
                            <span className="font-medium text-foreground">mencatat antropometri</span> (panjang/tinggi
                            dan berat); penilaian risiko mengacu pada{' '}
                            <span className="font-medium text-foreground">kurva pertumbuhan WHO</span> di detail pasien.
                        </>
                    ) : !diBawahSatuTahun && usiaBulan !== null ? (
                        <>
                            Prediksi ML hanya untuk usia 12–60 bulan. Untuk usia ini Anda tetap dapat menyimpan data
                            pengukuran; interpretasi mengacu pada kriteria klinis dan kurva WHO.
                        </>
                    ) : usiaBulan === null ? (
                        <>
                            Lengkapi tanggal lahir di langkah 1 agar sistem dapat menentukan apakah prediksi ML tersedia
                            (12–60 bulan). Sementara ini Anda dapat menyimpan pengukuran sebagai dokumentasi.
                        </>
                    ) : null}
                </p>
                {deskripsiUsia !== null && (
                    <p className="mt-1 text-xs text-muted-foreground">Usia saat pemeriksaan: {deskripsiUsia}</p>
                )}
            </div>

            <Card className={cn(card3dClassName, 'bg-white')}>
                <CardContent className="p-4 md:p-5">
                    {mode === 'new' ? <Stepper prediksiMl={prediksiMl} /> : null}

                    {step1Errors.length > 0 && mode === 'new' && (
                        <ErrorBox 
                            title="Terjadi kesalahan pada Langkah 1:" 
                            errors={step1Errors} 
                            onAction={onBack}
                            actionLabel="Kembali ke Langkah 1 untuk memperbaikinya"
                        />
                    )}

                    {diBawahSatuTahun && (
                        <WarningBox>
                            <span className="font-medium">Tidak ada prediksi ML untuk 0–11 bulan.</span> Pengukuran
                            biasanya panjang badan (telentang). Setelah menyimpan, gunakan{' '}
                            <span className="font-medium">Z-score WHO</span> dan protokol posyandu — bukan skor AI.
                        </WarningBox>
                    )}
                    {diAtasLimaTahun && !diBawahSatuTahun && (
                        <WarningBox>
                            <span className="font-medium">Usia di luar 1–5 tahun.</span> Prediksi ML tidak dijalankan.
                            Data antropometri tetap tersimpan untuk rekam medis.
                        </WarningBox>
                    )}
                    {prediksiMl && (
                        <InfoBox>
                            Lengkapi <span className="font-medium">tinggi badan</span> dan{' '}
                            <span className="font-medium">berat badan</span> sesuai pengukuran hari ini untuk analisis
                            ML.
                        </InfoBox>
                    )}
                    {!prediksiMl && !diBawahSatuTahun && usiaBulan !== null && (
                        <InfoBox>
                            Lengkapi <span className="font-medium">tinggi badan</span> dan{' '}
                            <span className="font-medium">berat badan</span> untuk dokumentasi pemeriksaan.
                        </InfoBox>
                    )}
                    {!prediksiMl && usiaBulan === null && (
                        <InfoBox>
                            Isi <span className="font-medium">tinggi/panjang</span> dan{' '}
                            <span className="font-medium">berat badan</span> jika tersedia, lalu simpan ke detail pasien.
                        </InfoBox>
                    )}

                    <div className="mt-5 rounded-lg border bg-white">
                        <div className="flex items-center gap-2 px-4 py-3">
                            <div className="size-2 rounded-full bg-emerald-600" />
                            <p className="text-sm font-semibold">Data antropometri</p>
                        </div>
                        <div className="border-t p-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <label className="text-sm font-medium" htmlFor="tanggal-pemeriksaan">
                                        Tanggal pemeriksaan
                                    </label>
                                    <div className="relative mt-2">
                                        <Calendar className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="tanggal-pemeriksaan"
                                            className={cn("h-10 pl-9", errors?.tanggal_pemeriksaan && "border-destructive")}
                                            type="date"
                                            value={tanggalPemeriksaan}
                                            onChange={(e) => setTanggalPemeriksaan(e.target.value)}
                                        />
                                    </div>
                                    {errors?.tanggal_pemeriksaan && <p className="mt-1 text-xs text-destructive">{errors.tanggal_pemeriksaan}</p>}
                                </div>
                                <div>
                                    <label className="text-sm font-medium" htmlFor="tinggi-badan">
                                        {labelPanjangTinggi}
                                    </label>
                                    <div className="relative mt-2">
                                        <Input
                                            id="tinggi-badan"
                                            className={cn("h-10 pr-12", errors?.tinggi_badan && "border-destructive")}
                                            placeholder="0.0"
                                            inputMode="decimal"
                                            value={tinggiBadan}
                                            onChange={(e) => setTinggiBadan(e.target.value)}
                                        />
                                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                                            cm
                                        </span>
                                    </div>
                                    {errors?.tinggi_badan && <p className="mt-1 text-xs text-destructive">{errors.tinggi_badan}</p>}
                                </div>
                                <div>
                                    <label className="text-sm font-medium" htmlFor="berat-badan">
                                        Berat badan
                                    </label>
                                    <div className="relative mt-2">
                                        <Input
                                            id="berat-badan"
                                            className={cn("h-10 pr-12", errors?.berat_badan && "border-destructive")}
                                            placeholder="0.0"
                                            inputMode="decimal"
                                            value={beratBadan}
                                            onChange={(e) => setBeratBadan(e.target.value)}
                                        />
                                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                                            kg
                                        </span>
                                    </div>
                                    {errors?.berat_badan && <p className="mt-1 text-xs text-destructive">{errors.berat_badan}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <Button type="button" variant="outline" className="h-10 rounded-lg px-5" onClick={onBack}>
                            <ArrowLeft className="mr-2 size-4" />
                            {mode === 'existing' ? 'Kembali ke daftar pasien' : 'Kembali ke Langkah 1'}
                        </Button>
                        <div className="flex items-center gap-2">
                            <Button type="button" variant="outline" className="h-10 rounded-lg px-5" onClick={onCancel} disabled={processing}>
                                Batal
                            </Button>
                            <Button type="button" className="h-10 rounded-lg px-5" onClick={onSubmit} disabled={processing}>
                                {processing ? (
                                    <LoaderCircle className="mr-2 size-4 animate-spin" />
                                ) : null}
                                {prediksiMl ? (
                                    <>
                                        Analisis Risiko Stunting <Check className="ml-2 size-4" />
                                    </>
                                ) : (
                                    <>
                                        Simpan dan buka detail <ClipboardList className="ml-2 size-4" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
