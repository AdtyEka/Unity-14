import * as React from 'react';
import {
    ArrowLeft,
    BadgeCheck,
    Building2,
    CalendarClock,
    IdCard,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    User2,
} from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type UserDetail = {
    initials: string;
    name: string;
    nik: string;
    role: string;
    fasyankes: string;
    wilayah: string;
    status: 'Aktif' | 'Nonaktif';
    email: string;
    phone: string;
    joinedAt: string;
};

const userDetails: Record<string, UserDetail> = {
    '3271012345678901': {
        initials: 'SN',
        name: 'Siti Nurhaliza, A.Md.Keb',
        nik: '3271012345678901',
        role: 'Bidan',
        fasyankes: 'Puskesmas Melati',
        wilayah: 'Kec. Sukamaju',
        status: 'Aktif',
        email: 'siti.nurhaliza@puskesmasmelati.id',
        phone: '0812-3456-7890',
        joinedAt: '12 Januari 2024',
    },
    '3271098765432109': {
        initials: 'BW',
        name: 'Budi Wibowo, S.KM',
        nik: '3271098765432109',
        role: 'Admin Puskesmas',
        fasyankes: 'Puskesmas Melati',
        wilayah: 'Kec. Sukamaju',
        status: 'Aktif',
        email: 'budi.wibowo@puskesmasmelati.id',
        phone: '0813-9876-5432',
        joinedAt: '08 Februari 2024',
    },
    '3271055566677788': {
        initials: 'RR',
        name: 'Rina Rosdiana, A.Md.Keb',
        nik: '3271055566677788',
        role: 'Bidan',
        fasyankes: 'Puskesmas Mawar',
        wilayah: 'Kec. Sukajaya',
        status: 'Nonaktif',
        email: 'rina.rosdiana@puskesmasmawar.id',
        phone: '0812-7788-9900',
        joinedAt: '22 Maret 2024',
    },
    '3271011122233344': {
        initials: 'AS',
        name: 'dr. Ahmad Santoso',
        nik: '3271011122233344',
        role: 'Admin Dinas',
        fasyankes: 'Dinas Kesehatan',
        wilayah: 'Kab. Bandung',
        status: 'Aktif',
        email: 'ahmad.santoso@dinkes.go.id',
        phone: '0811-2222-3334',
        joinedAt: '05 April 2024',
    },
    '3271044455566677': {
        initials: 'DP',
        name: 'Dewi Prameswari, A.Md.Keb',
        nik: '3271044455566677',
        role: 'Bidan',
        fasyankes: 'Puskesmas Anggrek',
        wilayah: 'Kec. Sukamukti',
        status: 'Aktif',
        email: 'dewi.prameswari@puskesmasanggrek.id',
        phone: '0812-4445-5566',
        joinedAt: '19 Mei 2024',
    },
    '3271077711122233': {
        initials: 'FN',
        name: 'Fauzan Nurhadi, S.KM',
        nik: '3271077711122233',
        role: 'Admin Puskesmas',
        fasyankes: 'Puskesmas Anggrek',
        wilayah: 'Kec. Sukamukti',
        status: 'Aktif',
        email: 'fauzan.nurhadi@puskesmasanggrek.id',
        phone: '0813-7771-1222',
        joinedAt: '27 Juni 2024',
    },
};

function DetailItem({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
    value: string;
}) {
    return (
        <div className="flex min-w-0 items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
            <div className="shrink-0 rounded-lg bg-white p-2 text-emerald-700 shadow-sm ring-1 ring-emerald-100">
                <Icon className="size-4" />
            </div>
            <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
                <p className="mt-1 text-sm font-semibold text-foreground break-words [overflow-wrap:anywhere]">{value}</p>
            </div>
        </div>
    );
}

export default function ManajemenPengurusShow({
    id,
    onBack,
}: {
    id: string;
    onBack: () => void;
}) {
    const user = userDetails[id] ?? {
        initials: 'PG',
        name: 'Pengguna Tidak Ditemukan',
        nik: id,
        role: 'Belum tersedia',
        fasyankes: '-',
        wilayah: '-',
        status: 'Nonaktif' as const,
        email: '-',
        phone: '-',
        joinedAt: '-',
    };

    const statusClassName =
        user.status === 'Aktif'
            ? 'border-emerald-200 bg-emerald-100 text-emerald-800'
            : 'border-slate-200 bg-slate-100 text-slate-700';

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">Manajemen Pengguna</p>
                    <h1 className="text-2xl font-bold tracking-tight">Detail Pengguna</h1>
                    <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                        Tinjau identitas, hak akses, dan informasi penempatan pengguna secara ringkas.
                    </p>
                </div>
                <Button type="button" variant="outline" onClick={onBack} className="w-full md:w-auto">
                    <ArrowLeft className="mr-2 size-4" />
                    Kembali
                </Button>
            </div>

            <Card className="border-emerald-100 bg-white shadow-sm">
                <CardContent className="p-4 md:p-5">
                    <div className="rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-lime-500 px-6 py-6 text-white">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-start gap-4">
                                <Avatar size="lg" className="size-16 bg-white/15 ring-2 ring-white/20">
                                    <AvatarFallback className="bg-white/10 text-lg font-semibold text-white">
                                        {user.initials}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-white/80">Profil Pengguna</p>
                                        <h2 className="text-2xl font-semibold tracking-tight">{user.name}</h2>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2">
                                        <Badge className="border-white/20 bg-white/15 text-white hover:bg-white/15">
                                            <ShieldCheck className="size-3.5" />
                                            {user.role}
                                        </Badge>
                                        <Badge className="border-white/20 bg-white/15 text-white hover:bg-white/15">
                                            <Building2 className="size-3.5" />
                                            {user.fasyankes}
                                        </Badge>
                                        <Badge className="border-white/20 bg-white/15 text-white hover:bg-white/15">
                                            <MapPin className="size-3.5" />
                                            {user.wilayah}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:min-w-[360px]">
                                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                                    <p className="text-xs uppercase tracking-[0.16em] text-white/75">Status</p>
                                    <p className="mt-2 text-lg font-semibold break-words [overflow-wrap:anywhere]">{user.status}</p>
                                </div>
                                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                                    <p className="text-xs uppercase tracking-[0.16em] text-white/75">NIK</p>
                                    <p className="mt-2 text-lg font-semibold break-words [overflow-wrap:anywhere]">{user.nik}</p>
                                </div>
                                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                                    <p className="text-xs uppercase tracking-[0.16em] text-white/75">Bergabung</p>
                                    <p className="mt-2 text-lg font-semibold break-words [overflow-wrap:anywhere]">{user.joinedAt}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6 pt-6 lg:grid-cols-[1.35fr_0.95fr]">
                        <Card className="border-emerald-100 bg-white shadow-none">
                            <CardHeader className="border-b border-emerald-100 bg-emerald-50/60">
                                <CardTitle>Informasi Utama</CardTitle>
                                <CardDescription>Data identitas dan kontak utama pengguna.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4 pt-6 md:grid-cols-2">
                                <DetailItem icon={User2} label="Nama Lengkap" value={user.name} />
                                <DetailItem icon={IdCard} label="NIK" value={user.nik} />
                                <DetailItem icon={Mail} label="Email" value={user.email} />
                                <DetailItem icon={Phone} label="Nomor Telepon" value={user.phone} />
                            </CardContent>
                        </Card>

                        <div className="flex flex-col gap-6">
                            <Card className="border-emerald-100 bg-white shadow-none">
                                <CardHeader className="border-b border-emerald-100 bg-emerald-50/60">
                                    <CardTitle>Status Akun</CardTitle>
                                    <CardDescription>Ringkasan akses dan kondisi akun saat ini.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-6">
                                    <div className="flex items-center justify-between rounded-xl border border-border bg-muted/20 p-4">
                                        <div>
                                            <p className="text-sm font-medium">Status Pengguna</p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                Menentukan apakah pengguna dapat mengakses sistem.
                                            </p>
                                        </div>
                                        <Badge variant="outline" className={statusClassName}>
                                            <BadgeCheck className="size-3.5" />
                                            {user.status}
                                        </Badge>
                                    </div>

                                    <div className="space-y-3 rounded-xl border border-border bg-muted/20 p-4">
                                        <div className="flex items-center gap-2 text-sm font-medium">
                                            <ShieldCheck className="size-4 text-emerald-700" />
                                            Peran dan Penempatan
                                        </div>
                                        <Separator />
                                        <div className="space-y-3 text-sm">
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="text-muted-foreground">Peran</span>
                                                <span className="font-semibold">{user.role}</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="text-muted-foreground">Fasyankes</span>
                                                <span className="text-right font-semibold">{user.fasyankes}</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="text-muted-foreground">Wilayah</span>
                                                <span className="text-right font-semibold">{user.wilayah}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-emerald-100 bg-white shadow-none">
                                <CardHeader className="border-b border-emerald-100 bg-emerald-50/60">
                                    <CardTitle>Catatan Sistem</CardTitle>
                                    <CardDescription>Informasi administratif untuk pemantauan akun.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-6">
                                    <div className="flex items-start gap-3 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/50 p-4">
                                        <CalendarClock className="mt-0.5 size-4 text-emerald-700" />
                                        <div>
                                            <p className="font-medium text-foreground">Tanggal bergabung</p>
                                            <p className="mt-1 text-sm text-muted-foreground">{user.joinedAt}</p>
                                        </div>
                                    </div>
                                    <div className="rounded-xl border border-dashed border-border bg-muted/20 p-4 text-sm text-muted-foreground">
                                        Halaman ini dapat dikembangkan lebih lanjut untuk menampilkan riwayat login,
                                        aktivitas terbaru, atau log perubahan hak akses pengguna.
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

