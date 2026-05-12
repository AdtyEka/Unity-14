import { AlertTriangle, Calendar, ChevronRight, User, Users } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { usiaBulanDariTanggalLahir } from '@/pages/admin/manajemen-pasien/_utils/usia-bulan';

const card3dClassName =
    'relative overflow-hidden transition-all duration-200 ease-out will-change-transform ' +
    'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 hover:ring-1 hover:ring-foreground/10 ' +
    'before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-0 before:transition-opacity ' +
    'hover:before:opacity-100 dark:before:from-white/10';

type JenisKelamin = 'Laki-laki' | 'Perempuan';

export default function CreateStepOne({
    onCancel,
    onNext,
    value,
    onChange,
    errors,
}: {
    onCancel: () => void;
    onNext: () => void;
    value: {
        namaBayi: string;
        tanggalLahir: string;
        jenisKelamin: JenisKelamin;
        namaIbu: string;
        nikIbu: string;
        namaAyah: string;
        nomorHp: string;
    };
    onChange: (next: {
        namaBayi: string;
        tanggalLahir: string;
        jenisKelamin: JenisKelamin;
        namaIbu: string;
        nikIbu: string;
        namaAyah: string;
        nomorHp: string;
    }) => void;
    errors?: Record<string, string>;
}) {
    const jenisKelamin = value.jenisKelamin;
    const setJenisKelamin = (jk: JenisKelamin) => onChange({ ...value, jenisKelamin: jk });
    const usiaBulan = usiaBulanDariTanggalLahir(value.tanggalLahir);
    const diBawahSatuTahun = usiaBulan !== null && usiaBulan < 12;
    const diAtasLimaTahun = usiaBulan !== null && usiaBulan > 60;

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Pemeriksaan Pasien Baru</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Silakan lengkapi data identitas bayi dan orang tua. Prediksi AI di langkah berikutnya optimal untuk
                    balita <span className="font-medium text-foreground">1–5 tahun</span> (12–60 bulan).
                </p>
            </div>

            <Card className={cn(card3dClassName, 'bg-white')}>
                <CardContent className="p-4 md:p-5">
                    <div className="flex items-center justify-between gap-4 rounded-lg border bg-muted/10 px-4 py-3">
                        <div className="flex items-center gap-3">
                            <span className="inline-flex size-7 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
                                1
                            </span>
                            <div>
                                <p className="text-sm font-semibold leading-none">Data Identitas</p>
                                <p className="mt-1 text-xs text-muted-foreground">Langkah 1 dari 2</p>
                            </div>
                        </div>
                        <div className="h-2 w-44 rounded-full bg-muted/40">
                            <div className="h-2 w-1/2 rounded-full bg-emerald-600" />
                        </div>
                    </div>

                    <div className="mt-5 rounded-lg border bg-white">
                        <div className="flex items-center gap-2 px-4 py-3">
                            <User className="size-4 text-emerald-700" />
                            <p className="text-sm font-semibold">Data Bayi</p>
                        </div>
                        <Separator />

                        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium">
                                    Nama Lengkap Bayi <span className="text-destructive">*</span>
                                </label>
                                <Input
                                    className={cn("mt-2 h-10", errors?.nama_bayi && "border-destructive")}
                                    placeholder="Masukkan nama lengkap sesuai akta"
                                    value={value.namaBayi}
                                    onChange={(e) => onChange({ ...value, namaBayi: e.target.value })}
                                />
                                {errors?.nama_bayi && <p className="mt-1 text-xs text-destructive">{errors.nama_bayi}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-medium">
                                    Tanggal Lahir <span className="text-destructive">*</span>
                                </label>
                                <div className="relative mt-2">
                                    <Calendar className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        className={cn("h-10 pl-9", errors?.tanggal_lahir && "border-destructive")}
                                        type="date"
                                        value={value.tanggalLahir}
                                        onChange={(e) => onChange({ ...value, tanggalLahir: e.target.value })}
                                    />
                                </div>
                                {errors?.tanggal_lahir && <p className="mt-1 text-xs text-destructive">{errors.tanggal_lahir}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-medium">
                                    Jenis Kelamin <span className="text-destructive">*</span>
                                </label>
                                <div className="mt-2 grid grid-cols-2 gap-2">
                                    <Button
                                        type="button"
                                        variant={jenisKelamin === 'Laki-laki' ? 'secondary' : 'outline'}
                                        className={cn(
                                            'h-10 justify-center',
                                            jenisKelamin === 'Laki-laki' && 'bg-muted text-foreground',
                                            errors?.jenis_kelamin && "border-destructive text-destructive"
                                        )}
                                        onClick={() => setJenisKelamin('Laki-laki')}
                                    >
                                        Laki-laki
                                    </Button>
                                    <Button
                                        type="button"
                                        variant={jenisKelamin === 'Perempuan' ? 'secondary' : 'outline'}
                                        className={cn(
                                            'h-10 justify-center',
                                            jenisKelamin === 'Perempuan' && 'bg-muted text-foreground',
                                            errors?.jenis_kelamin && "border-destructive text-destructive"
                                        )}
                                        onClick={() => setJenisKelamin('Perempuan')}
                                    >
                                        Perempuan
                                    </Button>
                                </div>
                                {errors?.jenis_kelamin && <p className="mt-1 text-xs text-destructive">{errors.jenis_kelamin}</p>}
                            </div>
                        </div>

                        {(diBawahSatuTahun || diAtasLimaTahun) && (
                            <div className="flex items-start gap-3 border-t bg-amber-50/80 px-4 py-3 text-sm text-amber-950">
                                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-700" />
                                <div className="leading-relaxed">
                                    {diBawahSatuTahun && (
                                        <>
                                            <span className="font-medium">Usia belum 1 tahun.</span> Di langkah berikutnya
                                            tidak ada prediksi ML — hanya pencatatan panjang/tinggi dan berat badan.
                                            Penilaian mengacu pada <span className="font-medium">kurva WHO</span> di halaman
                                            detail.
                                        </>
                                    )}
                                    {diAtasLimaTahun && !diBawahSatuTahun && (
                                        <>
                                            <span className="font-medium">Usia di atas 5 tahun.</span> Model prediksi
                                            mengacu pada balita 1–5 tahun; hasil analisis mungkin kurang representatif.
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-5 rounded-lg border bg-white">
                        <div className="flex items-center gap-2 px-4 py-3">
                            <Users className="size-4 text-emerald-700" />
                            <p className="text-sm font-semibold">Data Orang Tua / Wali</p>
                        </div>
                        <Separator />

                        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
                            <div>
                                <label className="text-sm font-medium">
                                    Nama Ibu Kandung <span className="text-destructive">*</span>
                                </label>
                                <Input
                                    className={cn("mt-2 h-10", errors?.nama_ibu && "border-destructive")}
                                    placeholder="Masukkan nama ibu"
                                    value={value.namaIbu}
                                    onChange={(e) => onChange({ ...value, namaIbu: e.target.value })}
                                />
                                {errors?.nama_ibu && <p className="mt-1 text-xs text-destructive">{errors.nama_ibu}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-medium">
                                    NIK Ibu <span className="text-destructive">*</span>
                                </label>
                                <Input
                                    className={cn("mt-2 h-10", errors?.nik_ibu && "border-destructive")}
                                    inputMode="numeric"
                                    placeholder="16 digit NIK"
                                    value={value.nikIbu}
                                    onChange={(e) => onChange({ ...value, nikIbu: e.target.value })}
                                />
                                {errors?.nik_ibu && <p className="mt-1 text-xs text-destructive">{errors.nik_ibu}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-medium">Nama Ayah (Opsional)</label>
                                <Input
                                    className={cn("mt-2 h-10", errors?.nama_ayah && "border-destructive")}
                                    placeholder="Masukkan nama ayah"
                                    value={value.namaAyah}
                                    onChange={(e) => onChange({ ...value, namaAyah: e.target.value })}
                                />
                                {errors?.nama_ayah && <p className="mt-1 text-xs text-destructive">{errors.nama_ayah}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-medium">Nomor HP yang dapat dihubungi</label>
                                <div className="mt-2 flex gap-2">
                                    <Input className="h-10 w-20" value="+62" readOnly />
                                    <Input
                                        className={cn("h-10 flex-1", errors?.nomor_hp && "border-destructive")}
                                        inputMode="tel"
                                        placeholder="8123456789"
                                        value={value.nomorHp}
                                        onChange={(e) => onChange({ ...value, nomorHp: e.target.value })}
                                    />
                                </div>
                                {errors?.nomor_hp && <p className="mt-1 text-xs text-destructive">{errors.nomor_hp}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <Button type="button" variant="outline" className="h-10 rounded-lg px-5" onClick={onCancel}>
                            Batal
                        </Button>

                        <Button type="button" className="h-10 rounded-lg px-5" onClick={onNext}>
                            Lanjutkan ke Langkah 2 <ChevronRight className="ml-2 size-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

