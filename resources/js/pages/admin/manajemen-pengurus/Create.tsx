import * as React from 'react';
import { ChevronRight, Lock, User, UserCog } from 'lucide-react';
import { useForm } from '@inertiajs/react';

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
    error,
}: {
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    options: string[];
    error?: string;
}) {
    return (
        <div className="flex flex-col gap-1">
            <select
                className={cn(
                    "h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                    error && "border-destructive focus-visible:ring-destructive/50"
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
            {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
    );
}

export default function ManajemenPengurusCreate({
    onBack,
}: {
    onBack: () => void;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        nik: '',
        email: '',
        role_detail: '',
        password: '',
        password_confirmation: '',
        status: 'Aktif',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/pengurus', {
            onSuccess: () => {
                reset();
                onBack();
            },
        });
    };

    return (
        <form onSubmit={submit} className="flex flex-col gap-6 p-4 md:p-6">
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
                                <Input
                                    className={cn("mt-2 h-10", errors.name && "border-destructive")}
                                    placeholder="Masukkan nama lengkap beserta gelar"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="text-sm font-medium">Nomor Induk Kependudukan (NIK)</label>
                                <Input
                                    className={cn("mt-2 h-10", errors.nik && "border-destructive")}
                                    placeholder="16 digit NIK"
                                    value={data.nik}
                                    onChange={(e) => setData('nik', e.target.value)}
                                />
                                {errors.nik && <p className="mt-1 text-xs text-destructive">{errors.nik}</p>}
                            </div>
                            <div>
                                <label className="text-sm font-medium">Status</label>
                                <div className="mt-2">
                                    <SelectField
                                        value={data.status}
                                        onChange={(v) => setData('status', v)}
                                        placeholder="Pilih Status"
                                        options={['Aktif', 'Nonaktif']}
                                        error={errors.status}
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium">Alamat Email</label>
                                <Input
                                    className={cn("mt-2 h-10", errors.email && "border-destructive")}
                                    type="email"
                                    placeholder="nama@email.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
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
                                        value={data.role_detail}
                                        onChange={(v) => setData('role_detail', v)}
                                        placeholder="Pilih Peran"
                                        options={['Bidan', 'Admin Puskesmas', 'Admin Dinas', 'Kader']}
                                        error={errors.role_detail}
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
                                <Input
                                    className={cn("mt-2 h-10", errors.password && "border-destructive")}
                                    type="password"
                                    placeholder="Minimal 8 karakter"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password}</p>}
                            </div>
                            <div>
                                <label className="text-sm font-medium">Konfirmasi Password</label>
                                <Input
                                    className="mt-2 h-10"
                                    type="password"
                                    placeholder="Ulangi password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex items-center justify-between">
                <Button type="button" variant="outline" className="h-10 rounded-lg px-5" onClick={onBack}>
                    Batal
                </Button>
                <Button type="submit" className="h-10 rounded-lg px-5" disabled={processing}>
                    {processing ? 'Menyimpan...' : 'Simpan Pengguna'} <ChevronRight className="ml-2 size-4" />
                </Button>
            </div>
        </form>
    );
}

