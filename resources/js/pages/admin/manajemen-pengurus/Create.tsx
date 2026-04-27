import * as React from 'react';
import { ChevronRight, Lock, User, UserCog } from 'lucide-react';

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
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
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

export default function ManajemenPengurusCreate({
    onBack,
}: {
    onBack: () => void;
}) {
    const [role, setRole] = React.useState('');
    const [fasyankes, setFasyankes] = React.useState('');

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <div>
                <p className="text-sm text-muted-foreground">Pengguna &gt; Tambah Baru</p>
                <h1 className="text-2xl font-bold tracking-tight">Tambah Pengguna Baru</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Masukkan detail informasi untuk mendaftarkan staf medis atau administrator baru ke dalam sistem.
                </p>
            </div>

            <Card className={cn(card3dClassName, 'bg-white')}>
                <CardContent className="p-0">
                    <div className="px-4 py-4 md:px-5">
                        <div className="flex items-center gap-2">
                            <User className="size-4 text-emerald-700" />
                            <p className="text-sm font-semibold">Informasi Pribadi</p>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium">Nama Lengkap</label>
                                <Input className="mt-2 h-10" placeholder="Masukkan nama lengkap beserta gelar" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Nomor Induk Kependudukan (NIK)</label>
                                <Input className="mt-2 h-10" placeholder="16 digit NIK" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Nomor HP</label>
                                <Input className="mt-2 h-10" placeholder="Contoh: 08123456789" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium">Alamat Email</label>
                                <Input className="mt-2 h-10" type="email" placeholder="nama@email.com" />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="px-4 py-4 md:px-5">
                        <div className="flex items-center gap-2">
                            <UserCog className="size-4 text-emerald-700" />
                            <p className="text-sm font-semibold">Akses &amp; Peran</p>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="text-sm font-medium">Peran Sistem</label>
                                <div className="mt-2">
                                    <SelectField
                                        value={role}
                                        onChange={setRole}
                                        placeholder="Pilih Peran"
                                        options={['Bidan', 'Admin Puskesmas', 'Admin Dinas']}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Penugasan Fasyankes</label>
                                <div className="mt-2">
                                    <SelectField
                                        value={fasyankes}
                                        onChange={setFasyankes}
                                        placeholder="Pilih Fasyankes"
                                        options={['Puskesmas Melati', 'Puskesmas Mawar', 'Puskesmas Anggrek']}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="px-4 py-4 md:px-5">
                        <div className="flex items-center gap-2">
                            <Lock className="size-4 text-emerald-700" />
                            <p className="text-sm font-semibold">Keamanan</p>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="text-sm font-medium">Password Sementara</label>
                                <Input className="mt-2 h-10" type="password" placeholder="Minimal 8 karakter" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Konfirmasi Password</label>
                                <Input className="mt-2 h-10" type="password" placeholder="Ulangi password" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex items-center justify-between">
                <Button type="button" variant="outline" className="h-10 rounded-lg px-5" onClick={onBack}>
                    Batal
                </Button>
                <Button type="button" className="h-10 rounded-lg px-5" onClick={onBack}>
                    Simpan Pengguna <ChevronRight className="ml-2 size-4" />
                </Button>
            </div>
        </div>
    );
}

