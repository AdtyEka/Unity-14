import * as React from 'react';
import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

export type UserRole = 'Bidan' | 'Admin Puskesmas' | 'Admin Dinas';
export type UserStatus = 'Aktif' | 'Nonaktif';
export type RoleFilter = 'Semua Peran' | UserRole;
export type StatusFilter = 'Semua Status' | UserStatus;

const roleOptions: RoleFilter[] = ['Semua Peran', 'Bidan', 'Admin Puskesmas', 'Admin Dinas'];
const statusOptions: StatusFilter[] = ['Semua Status', 'Aktif', 'Nonaktif'];

function FilterDropdown<T extends string>({
    value,
    options,
    onChange,
}: {
    value: T;
    options: readonly T[];
    onChange: (value: T) => void;
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-10 w-full justify-between rounded-lg md:w-40"
                >
                    <span className="truncate">{value}</span>
                    <span className="ml-2 text-muted-foreground">▾</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-40">
                {options.map((opt) => (
                    <DropdownMenuItem key={opt} onSelect={() => onChange(opt)}>
                        {opt}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default function UserFilters({
    query,
    role,
    status,
    onQueryChange,
    onRoleChange,
    onStatusChange,
}: {
    query: string;
    role: RoleFilter;
    status: StatusFilter;
    onQueryChange: (value: string) => void;
    onRoleChange: (value: RoleFilter) => void;
    onStatusChange: (value: StatusFilter) => void;
}) {
    return (
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative w-full md:flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    placeholder="Cari nama atau NIK pengguna..."
                    className="h-10 pl-9"
                />
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <FilterDropdown value={role} options={roleOptions} onChange={onRoleChange} />
                <FilterDropdown value={status} options={statusOptions} onChange={onStatusChange} />
            </div>
        </div>
    );
}

