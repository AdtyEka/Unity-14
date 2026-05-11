import * as React from 'react';
import { Clock, Hospital, Map, PencilLine, Plus, Save } from 'lucide-react';

import MapWilayahPuskesmas from '@/pages/admin/konfigurasi-posyankes/_components/MapWilayahPuskesmas';
import JamLayananModal from '@/pages/admin/konfigurasi-posyankes/_components/JamLayananModal';
import PosyanduModal from '@/pages/admin/konfigurasi-posyankes/_components/PosyanduModal';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import JenisPuskesmasDropdown, {
    type JenisPuskesmas,
} from '@/pages/admin/konfigurasi-posyankes/_components/JenisPuskesmasDropdown';
import SectionTitle from '@/pages/admin/konfigurasi-posyankes/_components/SectionTitle';
import StatusChip from '@/pages/admin/konfigurasi-posyankes/_components/StatusChip';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';

import PuskesmasController from '@/actions/App/Http/Controllers/Admin/PuskesmasController';
import PosyanduController from '@/actions/App/Http/Controllers/Admin/PosyanduController';

type JamLayananRow = {
    hari: string;
    jam: string;
    status: 'Buka' | 'Tutup';
};

type KelurahanRow = {
    id: number;
    nama: string;
    populasi_balita: number;
};

const card3dClassName =
    'relative overflow-hidden transition-all duration-200 ease-out will-change-transform ' +
    'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 hover:ring-1 hover:ring-foreground/10 ' +
    'before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-0 before:transition-opacity ' +
    'hover:before:opacity-100 dark:before:from-white/10';

import { useForm, usePage } from '@inertiajs/react';

type Puskesmas = {
    id: number;
    nama_puskesmas: string;
    kode_fasyankes: string;
    jenis_puskesmas: JenisPuskesmas;
    alamat_lengkap: string;
    no_telepon: string;
    email: string;
    latitude?: number;
    longitude?: number;
    jam_layanans: JamLayananRow[];
    posyandus: KelurahanRow[];
};

export default function KonfigurasiPosyankesPage() {
    const { puskesmas } = usePage<{ puskesmas: Puskesmas }>().props;

    const { data, setData, patch, processing, reset } = useForm({
        nama_puskesmas: puskesmas.nama_puskesmas,
        kode_fasyankes: puskesmas.kode_fasyankes,
        jenis_puskesmas: puskesmas.jenis_puskesmas,
        alamat_lengkap: puskesmas.alamat_lengkap,
        no_telepon: puskesmas.no_telepon,
        email: puskesmas.email,
        latitude: puskesmas.latitude,
        longitude: puskesmas.longitude,
    });

    const { errors } = usePage<any>().props;

    React.useEffect(() => {
        reset({
            nama_puskesmas: puskesmas.nama_puskesmas,
            kode_fasyankes: puskesmas.kode_fasyankes,
            jenis_puskesmas: puskesmas.jenis_puskesmas,
            alamat_lengkap: puskesmas.alamat_lengkap,
            no_telepon: puskesmas.no_telepon,
            email: puskesmas.email,
            latitude: puskesmas.latitude ? Number(puskesmas.latitude) : null,
            longitude: puskesmas.longitude ? Number(puskesmas.longitude) : null,
        });
    }, [puskesmas]);

    const [jamLayananModalOpen, setJamLayananModalOpen] = React.useState(false);
    const [posyanduModal, setPosyanduModal] = React.useState<{ open: boolean; posyandu?: KelurahanRow & { id?: number } }>({ open: false });
    const [deleteConfirm, setDeleteConfirm] = React.useState<{ open: boolean; id?: number }>({ open: false });

    const submitProfil = (e: React.FormEvent) => {
        e.preventDefault();
        patch(PuskesmasController.update.url(puskesmas.id), {
            preserveScroll: true,
            onSuccess: () => {
                alert('Profil Puskesmas berhasil diperbarui.');
            },
        });
    };

    const handleDeletePosyandu = () => {
        if (deleteConfirm.id) {
            router.delete(PosyanduController.destroy.url({ puskesmas: puskesmas.id, posyandu: deleteConfirm.id }), {
                preserveScroll: true,
                onSuccess: () => {
                    setDeleteConfirm({ open: false });
                    alert('Wilayah Posyandu berhasil dihapus.');
                },
            });
        }
    };

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
                        <form onSubmit={submitProfil}>
                            <CardContent className="p-4 md:p-5">
                                <SectionTitle icon={<Hospital className="size-4" />} title="Profil Puskesmas" />
                                <Separator className="my-4" />

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <p className="text-xs font-medium text-muted-foreground">Nama Puskesmas</p>
                                        <Input
                                            value={data.nama_puskesmas}
                                            onChange={(e) => setData('nama_puskesmas', e.target.value)}
                                            className="h-10 rounded-lg"
                                        />
                                        {errors.nama_puskesmas && <p className="text-xs text-destructive">{errors.nama_puskesmas}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-xs font-medium text-muted-foreground">Kode Fasyankes</p>
                                        <Input
                                            value={data.kode_fasyankes}
                                            onChange={(e) => setData('kode_fasyankes', e.target.value)}
                                            className="h-10 rounded-lg"
                                        />
                                        {errors.kode_fasyankes && <p className="text-xs text-destructive">{errors.kode_fasyankes}</p>}
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <p className="text-xs font-medium text-muted-foreground">Jenis Puskesmas</p>
                                        <JenisPuskesmasDropdown
                                            value={data.jenis_puskesmas}
                                            onChange={(val) => setData('jenis_puskesmas', val)}
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <p className="text-xs font-medium text-muted-foreground">Alamat Lengkap</p>
                                        <Input
                                            value={data.alamat_lengkap}
                                            onChange={(e) => setData('alamat_lengkap', e.target.value)}
                                            className="h-10 rounded-lg"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-xs font-medium text-muted-foreground">Nomor Telepon</p>
                                        <Input
                                            value={data.no_telepon}
                                            onChange={(e) => setData('no_telepon', e.target.value)}
                                            className="h-10 rounded-lg"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-xs font-medium text-muted-foreground">Email Klinik</p>
                                        <Input
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="h-10 rounded-lg"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-xs font-medium text-muted-foreground">Latitude</p>
                                        <Input
                                            type="number"
                                            step="any"
                                            value={data.latitude || ''}
                                            onChange={(e) => setData('latitude', parseFloat(e.target.value) || null)}
                                            className="h-10 rounded-lg"
                                            placeholder="-6.175"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-xs font-medium text-muted-foreground">Longitude</p>
                                        <Input
                                            type="number"
                                            step="any"
                                            value={data.longitude || ''}
                                            onChange={(e) => setData('longitude', parseFloat(e.target.value) || null)}
                                            className="h-10 rounded-lg"
                                            placeholder="106.865"
                                        />
                                    </div>
                                </div>

                                <div className="mt-5 flex flex-col-reverse gap-2 md:flex-row md:justify-end">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-10 rounded-lg px-4"
                                        onClick={() => reset()}
                                        disabled={processing}
                                    >
                                        Batal
                                    </Button>
                                    <Button type="submit" className="h-10 rounded-lg px-4" disabled={processing}>
                                        <Save className="mr-2 size-4" />
                                        Simpan Profil
                                    </Button>
                                </div>
                            </CardContent>
                        </form>
                    </Card>

                    <Card className={cn(card3dClassName, 'bg-white')}>
                        <CardContent className="p-4 md:p-5">
                            <SectionTitle
                                icon={<Clock className="size-4" />}
                                title="Jam Layanan"
                                right={
                                    <Button type="button" variant="ghost" size="sm" className="h-9 rounded-lg" onClick={() => setJamLayananModalOpen(true)}>
                                        <PencilLine className="mr-2 size-4" />
                                        Ubah
                                    </Button>
                                }
                            />
                            <Separator className="my-4" />

                            <div className="space-y-3">
                                {puskesmas.jam_layanans.map((row, idx) => (
                                    <div
                                        key={idx}
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
                                <MapWilayahPuskesmas 
                                    name={puskesmas.nama_puskesmas}
                                    address={puskesmas.alamat_lengkap}
                                    latitude={puskesmas.latitude}
                                    longitude={puskesmas.longitude}
                                />
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-xs font-semibold text-muted-foreground">
                                    Cakupan Kelurahan ({puskesmas.posyandus.length})
                                </p>
                                <Button type="button" variant="ghost" size="sm" className="h-9 rounded-lg" onClick={() => setPosyanduModal({ open: true })}>
                                    <Plus className="mr-2 size-4" />
                                    Tambah
                                </Button>
                            </div>

                            <div className="mt-3 space-y-2">
                                {puskesmas.posyandus.map((k, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between gap-3 rounded-xl border bg-white px-3 py-3"
                                    >
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold">{k.nama}</p>
                                            <p className="text-xs text-muted-foreground">
                                                Populasi Balita: {k.populasi_balita.toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button type="button" variant="ghost" size="icon-sm" aria-label="Aksi">
                                                    <MoreVerticalIcon />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => setPosyanduModal({ open: true, posyandu: k })}>
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-destructive focus:text-destructive"
                                                    onClick={() => setDeleteConfirm({ open: true, id: k.id })}
                                                >
                                                    Hapus
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <JamLayananModal
                puskesmasId={puskesmas.id}
                initialData={puskesmas.jam_layanans}
                open={jamLayananModalOpen}
                onOpenChange={setJamLayananModalOpen}
            />

            <PosyanduModal
                puskesmasId={puskesmas.id}
                posyandu={posyanduModal.posyandu as any}
                open={posyanduModal.open}
                onOpenChange={(open) => setPosyanduModal({ open })}
            />

            <ConfirmDialog
                open={deleteConfirm.open}
                onOpenChange={(open) => setDeleteConfirm({ open })}
                title="Hapus Wilayah Posyandu"
                description="Apakah Anda yakin ingin menghapus wilayah ini? Data tidak dapat dikembalikan."
                confirmText="Hapus"
                confirmVariant="destructive"
                onConfirm={handleDeletePosyandu}
            />
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

