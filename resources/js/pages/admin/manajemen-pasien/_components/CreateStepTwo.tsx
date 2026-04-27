import * as React from 'react';
import { ArrowLeft, Check, Info } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const card3dClassName =
    'relative overflow-hidden transition-all duration-200 ease-out will-change-transform ' +
    'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 hover:ring-1 hover:ring-foreground/10 ' +
    'before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-0 before:transition-opacity ' +
    'hover:before:opacity-100 dark:before:from-white/10';

function SelectField({
    value,
    onChange,
    placeholder,
    options,
}: {
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    options: string[];
}) {
    return (
        <select
            className={cn(
                'h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs',
                'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
            )}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="">{placeholder}</option>
            {options.map((opt) => (
                <option key={opt} value={opt}>
                    {opt}
                </option>
            ))}
        </select>
    );
}

function Stepper({ variant }: { variant: 'under-2' | 'over-2' }) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-lg border bg-muted/10 px-4 py-3">
            <div className="flex items-center gap-3">
                <span className="inline-flex size-7 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
                    2
                </span>
                <div>
                    <p className="text-sm font-semibold leading-none">
                        Pemeriksaan Baru — Langkah 2 {variant === 'under-2' ? '(Data Lengkap)' : '(Anak ≥ 2 Tahun)'}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">Langkah 2 dari 2</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant="outline" className="rounded-full bg-white">
                    Variabel AI
                </Badge>
                <div className="h-2 w-44 rounded-full bg-muted/40">
                    <div className="h-2 w-full rounded-full bg-emerald-600" />
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

function CardSection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="mt-5 rounded-lg border bg-white">
            <div className="flex items-center gap-2 px-4 py-3">
                <div className="size-2 rounded-full bg-emerald-600" />
                <p className="text-sm font-semibold">{title}</p>
            </div>
            <Separator />
            <div className="p-4">{children}</div>
        </div>
    );
}

function Under2Form() {
    const [pendidikanIbu, setPendidikanIbu] = React.useState('');
    const [pendidikanAyah, setPendidikanAyah] = React.useState('');
    const [fasilitasToilet, setFasilitasToilet] = React.useState('');
    const [pengelolaanSampah, setPengelolaanSampah] = React.useState('');

    const pendidikanOptions = ['SD', 'SMP', 'SMA', 'Diploma/Sarjana', 'Pascasarjana', 'Tidak Sekolah'];
    const toiletOptions = ['Jamban Sehat', 'Jamban Bersama', 'Tidak Ada', 'Lainnya'];
    const sampahOptions = ['Diangkut petugas', 'Dibakar', 'Ditimbun', 'Dibuang sembarangan', 'Lainnya'];

    return (
        <>
            <InfoBox>
                <span className="font-medium">8 variabel</span> berikut digunakan oleh AI untuk menghitung risiko
                stunting bayi.
            </InfoBox>

            <CardSection title="Data Kelahiran">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="text-sm font-medium">Berat Badan Lahir</label>
                        <div className="relative mt-2">
                            <Input className="h-10 pr-12" placeholder="Masukkan berat lahir" inputMode="decimal" />
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                                kg
                            </span>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Panjang Badan Lahir</label>
                        <div className="relative mt-2">
                            <Input className="h-10 pr-12" placeholder="Masukkan panjang lahir" inputMode="decimal" />
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                                cm
                            </span>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Tinggi Badan Ibu</label>
                        <div className="relative mt-2">
                            <Input className="h-10 pr-12" placeholder="Masukkan tinggi ibu" inputMode="decimal" />
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                                cm
                            </span>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Pendidikan Ibu</label>
                        <div className="mt-2">
                            <SelectField
                                value={pendidikanIbu}
                                onChange={setPendidikanIbu}
                                placeholder="Pilih tingkat pendidikan"
                                options={pendidikanOptions}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Tinggi Badan Ayah</label>
                        <div className="relative mt-2">
                            <Input className="h-10 pr-12" placeholder="Masukkan tinggi ayah" inputMode="decimal" />
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                                cm
                            </span>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Pendidikan Ayah</label>
                        <div className="mt-2">
                            <SelectField
                                value={pendidikanAyah}
                                onChange={setPendidikanAyah}
                                placeholder="Pilih tingkat pendidikan"
                                options={pendidikanOptions}
                            />
                        </div>
                    </div>
                </div>
            </CardSection>

            <CardSection title="Kondisi Lingkungan Rumah">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="text-sm font-medium">Fasilitas Toilet</label>
                        <div className="mt-2">
                            <SelectField
                                value={fasilitasToilet}
                                onChange={setFasilitasToilet}
                                placeholder="Pilih jenis fasilitas toilet"
                                options={toiletOptions}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Pengelolaan Sampah</label>
                        <div className="mt-2">
                            <SelectField
                                value={pengelolaanSampah}
                                onChange={setPengelolaanSampah}
                                placeholder="Pilih metode pengelolaan sampah"
                                options={sampahOptions}
                            />
                        </div>
                    </div>
                </div>
            </CardSection>
        </>
    );
}

function Over2Form() {
    return (
        <>
            <div className="mt-4 rounded-lg border bg-muted/10 px-4 py-3 text-sm text-muted-foreground">
                Untuk anak di atas 2 tahun, cukup masukkan data pertumbuhan dasar.
            </div>
            <CardSection title="Pemeriksaan Pasien (Anak ≥ 2 Tahun)">
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="text-sm font-medium">Berat badan saat ini</label>
                        <div className="relative mt-2">
                            <Input className="h-10 pr-12" placeholder="0.0" inputMode="decimal" />
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                                kg
                            </span>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Tinggi badan saat ini</label>
                        <div className="relative mt-2">
                            <Input className="h-10 pr-12" placeholder="0.0" inputMode="decimal" />
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                                cm
                            </span>
                        </div>
                    </div>
                </div>
            </CardSection>
        </>
    );
}

export default function CreateStepTwo({
    variant,
    onBack,
    onCancel,
    onSubmit,
}: {
    variant: 'under-2' | 'over-2';
    onBack: () => void;
    onCancel: () => void;
    onSubmit: () => void;
}) {
    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    Pemeriksaan Baru — Langkah 2 {variant === 'under-2' ? '(Data Lengkap)' : '(Anak ≥ 2 Tahun)'}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Silakan lengkapi data variabel risiko berikut untuk menghitung probabilitas stunting menggunakan model AI.
                </p>
            </div>

            <Card className={cn(card3dClassName, 'bg-white')}>
                <CardContent className="p-4 md:p-5">
                    <Stepper variant={variant} />
                    {variant === 'under-2' ? <Under2Form /> : <Over2Form />}
                    <div className="mt-6 flex items-center justify-between">
                        <Button type="button" variant="outline" className="h-10 rounded-lg px-5" onClick={onBack}>
                            <ArrowLeft className="mr-2 size-4" />
                            Kembali ke Langkah 1
                        </Button>
                        <div className="flex items-center gap-2">
                            <Button type="button" variant="outline" className="h-10 rounded-lg px-5" onClick={onCancel}>
                                Batal
                            </Button>
                            <Button type="button" className="h-10 rounded-lg px-5" onClick={onSubmit}>
                                Analisis Risiko Stunting <Check className="ml-2 size-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

