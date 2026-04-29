import * as React from 'react';
import { ArrowLeft, Save, ShieldCheck } from 'lucide-react';

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

const userDetails = {
    '3271012345678901': {
        name: 'Siti Nurhaliza, A.Md.Keb',
        phone: '08123456789',
        role: 'Bidan' as UserRole,
    },
    '3271098765432109': {
        name: 'Budi Wibowo, S.KM',
        phone: '081398765432',
        role: 'Admin Puskesmas' as UserRole,
    },
    '3271055566677788': {
        name: 'Rina Rosdiana, A.Md.Keb',
        phone: '081277889900',
        role: 'Bidan' as UserRole,
    },
};

function RoleDropdown({
    value,
    onChange,
}: {
    value: UserRole;
    onChange: (value: UserRole) => void;
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
    id,
    onBack,
}: {
    id: string;
    onBack: () => void;
}) {
    const user = userDetails[id as keyof typeof userDetails] ?? {
        name: 'Pengguna',
        phone: '',
        role: 'Bidan' as UserRole,
    };

    const [name, setName] = React.useState(user.name);
    const [phone, setPhone] = React.useState(user.phone);
    const [role, setRole] = React.useState<UserRole>(user.role);

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
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
                    <p className="text-sm text-muted-foreground">ID Pengguna: {id}</p>
                    <div>
                        <label className="text-sm font-medium">Nama Lengkap</label>
                        <Input className="mt-2 h-10" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Nomor HP</label>
                        <Input className="mt-2 h-10" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium">
                            <ShieldCheck className="size-4 text-emerald-700" />
                            Peran Sistem
                        </label>
                        <RoleDropdown value={role} onChange={setRole} />
                    </div>
                    <div className="flex justify-end">
                        <Button type="button">
                            <Save className="mr-2 size-4" />
                            Simpan Perubahan
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

