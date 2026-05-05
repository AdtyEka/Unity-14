import * as React from 'react';
import { Clock, Hospital, Map, PencilLine, Plus, Save } from 'lucide-react';

import MapWilayahPuskesmas from '@/pages/admin/konfigurasi-posyankes/_components/MapWilayahPuskesmas';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import JenisPuskesmasDropdown, {
    type JenisPuskesmas,
} from '@/pages/admin/konfigurasi-posyankes/_components/JenisPuskesmasDropdown';
import SectionTitle from '@/pages/admin/konfigurasi-posyankes/_components/SectionTitle';
import StatusChip from '@/pages/admin/konfigurasi-posyankes/_components/StatusChip';
import { cn } from '@/lib/utils';

type JamLayananRow = {
    hari: string;
    jam: string;
    status: 'Buka' | 'Tutup';
};

type KelurahanRow = {
    nama: string;
    populasiBalita: number;
};

const card3dClassName =
    'relative overflow-hidden transition-all duration-200 ease-out will-change-transform ' +
    'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 hover:ring-1 hover:ring-foreground/10 ' +
    'before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-0 before:transition-opacity ' +
    'hover:before:opacity-100 dark:before:from-white/10';

const jamLayananSeed: JamLayananRow[] = [
    { hari: 'Senin - Kamis', jam: '07:30 - 16:00 WIB', status: 'Buka' },
    { hari: 'Jumat', jam: '07:30 - 16:30 WIB', status: 'Buka' },
    { hari: 'Sabtu', jam: '08:00 - 12:00 WIB', status: 'Buka' },
];

const kelurahanSeed: KelurahanRow[] = [
    { nama: 'Kelurahan Mawar', populasiBalita: 1240 },
    { nama: 'Kelurahan Melati', populasiBalita: 980 },
    { nama: 'Kelurahan Anggrek', populasiBalita: 850 },
];

export default function KonfigurasiPosyankesPage() {
    const [jenis, setJenis] = React.useState<JenisPuskesmas>('Non-Rawat Inap');

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Konfigurasi Fasyankes</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Kelola profil, jam layanan, dan wilayah cakupan Puskesmas Anda.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="flex flex-col gap-4 lg:col-span-2">
                    <Card className={cn(card3dClassName, 'bg-white')}>
                        <CardContent className="p-4 md:p-5">
                            <SectionTitle icon={<Hospital className="size-4" />} title="Profil Puskesmas" />
                            <Separator className="my-4" />

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <p className="text-xs font-medium text-muted-foreground">Nama Puskesmas</p>
                                    <Input
                                        defaultValue="Puskesmas Kecamatan Melati"
                                        className="h-10 rounded-lg"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <p className="text-xs font-medium text-muted-foreground">Kode Fasyankes</p>
                                    <Input defaultValue="P3173050101" className="h-10 rounded-lg" />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <p className="text-xs font-medium text-muted-foreground">Jenis Puskesmas</p>
                                    <JenisPuskesmasDropdown value={jenis} onChange={setJenis} />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <p className="text-xs font-medium text-muted-foreground">Alamat Lengkap</p>
                                    <div className="rounded-lg border bg-muted/10 p-3 text-sm text-muted-foreground">
                                        Jl. Bunga Rampai No. 45, Kelurahan Mawar, Kecamatan Melati, Kota Jakarta Barat, 11460
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-xs font-medium text-muted-foreground">Nomor Telepon</p>
                                    <Input defaultValue="(021) 567-8910" className="h-10 rounded-lg" />
                                </div>

                                <div className="space-y-2">
                                    <p className="text-xs font-medium text-muted-foreground">Email Klinik</p>
                                    <Input defaultValue="info@pkm-melati.go.id" className="h-10 rounded-lg" />
                                </div>
                            </div>

                            <div className="mt-5 flex flex-col-reverse gap-2 md:flex-row md:justify-end">
                                <Button type="button" variant="outline" className="h-10 rounded-lg px-4">
                                    Batal
                                </Button>
                                <Button type="button" className="h-10 rounded-lg px-4">
                                    <Save className="mr-2 size-4" />
                                    Simpan Profil
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className={cn(card3dClassName, 'bg-white')}>
                        <CardContent className="p-4 md:p-5">
                            <SectionTitle
                                icon={<Clock className="size-4" />}
                                title="Jam Layanan"
                                right={
                                    <Button type="button" variant="ghost" size="sm" className="h-9 rounded-lg">
                                        <PencilLine className="mr-2 size-4" />
                                        Ubah
                                    </Button>
                                }
                            />
                            <Separator className="my-4" />

                            <div className="space-y-3">
                                {jamLayananSeed.map((row) => (
                                    <div
                                        key={row.hari}
                                        className="flex items-center justify-between gap-3 rounded-xl border bg-muted/10 px-4 py-3"
                                    >
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold">{row.hari}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <p className="text-xs text-muted-foreground">{row.jam}</p>
                                            <StatusChip status={row.status} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-col gap-4">
                    <Card className={cn(card3dClassName, 'bg-white')}>
                        <CardContent className="p-4 md:p-5">
                            <SectionTitle icon={<Map className="size-4" />} title="Pemetaan Wilayah" />
                            <Separator className="my-4" />

                            <p className="text-sm text-muted-foreground">
                                Daftar desa/kelurahan yang masuk dalam wilayah cakupan surveilans Stunting Sentinel untuk
                                Puskesmas ini.
                            </p>

                            <div className="mt-4 overflow-hidden rounded-xl border">
                                <MapWilayahPuskesmas />
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-xs font-semibold text-muted-foreground">
                                    Cakupan Kelurahan ({kelurahanSeed.length})
                                </p>
                                <Button type="button" variant="ghost" size="sm" className="h-9 rounded-lg">
                                    <Plus className="mr-2 size-4" />
                                    Tambah
                                </Button>
                            </div>

                            <div className="mt-3 space-y-2">
                                {kelurahanSeed.map((k) => (
                                    <div
                                        key={k.nama}
                                        className="flex items-center justify-between gap-3 rounded-xl border bg-white px-3 py-3"
                                    >
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold">{k.nama}</p>
                                            <p className="text-xs text-muted-foreground">
                                                Populasi Balita: {k.populasiBalita.toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                        <Button type="button" variant="ghost" size="icon-sm" aria-label="Aksi">
                                            <MoreVerticalIcon />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function MoreVerticalIcon() {
    return (
        <span className="inline-flex size-4 items-center justify-center text-muted-foreground">
            ⋮
        </span>
    );
}

