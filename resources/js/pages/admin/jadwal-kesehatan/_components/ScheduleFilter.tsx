import * as React from 'react';
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

export type FilterStatus = 'Semua' | '0–11 Bulan' | 'Normal' | 'Stunting' | 'Stunting Berat';

const statusOptions: FilterStatus[] = ['Semua', '0–11 Bulan', 'Normal', 'Stunting', 'Stunting Berat'];

interface ScheduleFilterProps {
    query: string;
    filter: FilterStatus;
    onQueryChange: (value: string) => void;
    onFilterChange: (value: FilterStatus) => void;
}

export default function ScheduleFilter({
    query,
    filter,
    onQueryChange,
    onFilterChange,
}: ScheduleFilterProps) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-sm flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Cari nama balita atau ibu..."
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    className="pl-9"
                />
            </div>

            <div className="flex flex-wrap gap-2">
                {statusOptions.map((opt) => (
                    <button
                        key={opt}
                        type="button"
                        onClick={() => onFilterChange(opt)}
                        className={[
                            'rounded-full border px-3.5 py-1 text-xs font-medium transition-colors',
                            filter === opt
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-border bg-white text-muted-foreground hover:border-primary/40 hover:text-primary',
                        ].join(' ')}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}
