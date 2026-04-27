import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type JenisPuskesmas = 'Rawat Inap' | 'Non-Rawat Inap';

export default function JenisPuskesmasDropdown({
    value,
    onChange,
}: {
    value: JenisPuskesmas;
    onChange: (value: JenisPuskesmas) => void;
}) {
    const options: JenisPuskesmas[] = ['Non-Rawat Inap', 'Rawat Inap'];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className="h-10 w-full justify-between rounded-lg"
                >
                    <span className="truncate">{value}</span>
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

