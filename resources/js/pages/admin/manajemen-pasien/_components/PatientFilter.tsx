import * as React from 'react';
import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export type RiskStatus = 'Stunting' | 'Risiko Tinggi' | 'Gizi Baik';
export type FilterOption = 'Semua' | RiskStatus;

const filterOptions: FilterOption[] = ['Semua', 'Stunting', 'Risiko Tinggi', 'Gizi Baik'];

export default function PatientFilter({
    query,
    filter,
    onQueryChange,
    onFilterChange,
}: {
    query: string;
    filter: FilterOption;
    onQueryChange: (value: string) => void;
    onFilterChange: (value: FilterOption) => void;
}) {
    return (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    placeholder="Cari Nama Bayi, UID, atau Nama Ibu..."
                    className="h-10 pl-9"
                />
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Filter Risiko:</span>
                {filterOptions.map((opt) => {
                    const active = filter === opt;
                    return (
                        <Button
                            key={opt}
                            type="button"
                            variant={active ? 'secondary' : 'outline'}
                            size="sm"
                            onClick={() => onFilterChange(opt)}
                            className={cn(
                                'rounded-full',
                                active && 'bg-muted text-foreground',
                                opt === 'Stunting' && active && 'bg-red-100 text-red-900 border-red-200',
                                opt === 'Risiko Tinggi' && active && 'bg-amber-100 text-amber-900 border-amber-200',
                                opt === 'Gizi Baik' && active && 'bg-emerald-100 text-emerald-900 border-emerald-200',
                            )}
                        >
                            {opt}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}

