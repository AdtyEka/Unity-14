import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export type VideoCategory = '6-9 Bulan' | '9-12 Bulan' | '12-24 Bulan';

export default function CategoryDropdown({
    value,
    onChange,
}: {
    value: VideoCategory | '';
    onChange: (value: VideoCategory) => void;
}) {
    const options: VideoCategory[] = ['6-9 Bulan', '9-12 Bulan', '12-24 Bulan'];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className="h-10 w-full justify-between rounded-lg"
                >
                    <span className={cn('truncate', !value && 'text-muted-foreground')}>
                        {value || 'Pilih kategori...'}
                    </span>
                    <span className="ml-2 text-muted-foreground">▾</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-48">
                {options.map((opt) => (
                    <DropdownMenuItem key={opt} onSelect={() => onChange(opt)}>
                        {opt}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

