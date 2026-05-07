import * as React from 'react';
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

export default function PatientFilter({
    query,
    onQueryChange,
}: {
    query: string;
    onQueryChange: (value: string) => void;
}) {
    return (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    placeholder="Cari nama pasien..."
                    className="h-10 pl-9"
                />
            </div>
        </div>
    );
}

