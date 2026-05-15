import * as React from 'react';
import { ArrowLeft, Save, ShieldCheck } from 'lucide-react';
import { useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type UserRole = 'Bidan' | 'Admin Puskesmas' | 'Admin Dinas' | 'Kader';

const roleOptions: UserRole[] = ['Bidan', 'Admin Puskesmas', 'Admin Dinas', 'Kader'];

function RoleDropdown({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button type="button" variant="outline" className="mt-2 h-10 w-full justify-between rounded-lg">
                    <span className={cn('truncate text-left')}>{value}</span>
                    <span className="ml-2 text-muted-foreground">▾</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-56">
                {roleOptions.map((role) => (
                    <DropdownMenuItem key={role} onSelect={() => onChange(role)}>
                        {role}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default function ManajemenPengurusEdit({
    data,
    onBack,
}: {
    data: any;
    onBack: () => void;
}) {
    if (!data) return null;

    const { data: formData, setData, put, processing, errors } = useForm({
        name: data.user.name,
        email: data.user.email,
        nik: data.nik,
        role_detail: data.role_detail,
        status: data.status,
        password: '', // Optional for update
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/pengurus/${data.id}`, {
            onSuccess: () => onBack(),
        });
    };

    return (
        <form onSubmit={submit} className="flex flex-col gap-6 p-4 md:p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">Manajemen Pengguna</p>
                    <h1 className="text-2xl font-bold tracking-tight">Edit Akses Pengguna</h1>
                </div>
                <Button type="button" variant="outline" onClick={onBack}>
                    <ArrowLeft className="mr-2 size-4" />
                    Kembali
                </Button>
            </div>

            <Card className="bg-white">
                <CardContent className="space-y-4 p-4 md:p-5">
                    <p className="text-sm text-muted-foreground">ID Pengguna: {data.id}</p>
                    
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium">Nama Lengkap</label>
                            <Input 
                                className={cn("mt-2 h-10", errors.name && "border-destructive")} 
                                value={formData.name} 
                                onChange={(e) => setData('name', e.target.value)} 
                            />
                            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                        </div>
                        
                        <div>
                            <label className="text-sm font-medium">NIK</label>
                            <Input 
                                className={cn("mt-2 h-10", errors.nik && "border-destructive")} 
                                value={formData.nik} 
                                onChange={(e) => setData('nik', e.target.value)} 
                            />
                            {errors.nik && <p className="mt-1 text-xs text-destructive">{errors.nik}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <Input 
                                className={cn("mt-2 h-10", errors.email && "border-destructive")} 
                                value={formData.email} 
                                onChange={(e) => setData('email', e.target.value)} 
                            />
                            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium">Status</label>
                            <div className="mt-2">
                                <select
                                    className={cn(
                                        "h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                                        errors.status && "border-destructive"
                                    )}
                                    value={formData.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                >
                                    <option value="Aktif">Aktif</option>
                                    <option value="Nonaktif">Nonaktif</option>
                                </select>
                            </div>
                            {errors.status && <p className="mt-1 text-xs text-destructive">{errors.status}</p>}
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium">
                                <ShieldCheck className="size-4 text-emerald-700" />
                                Peran Sistem
                            </label>
                            <RoleDropdown value={formData.role_detail} onChange={(v) => setData('role_detail', v)} />
                            {errors.role_detail && <p className="mt-1 text-xs text-destructive">{errors.role_detail}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium">Password Baru (Kosongkan jika tidak diubah)</label>
                            <Input 
                                className={cn("mt-2 h-10", errors.password && "border-destructive")} 
                                type="password"
                                value={formData.password} 
                                onChange={(e) => setData('password', e.target.value)} 
                            />
                            {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 size-4" />
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}

