import * as React from 'react';

import { cn } from '@/lib/utils';

export default function TypeOption({
    active,
    title,
    subtitle,
    onClick,
}: {
    active: boolean;
    title: string;
    subtitle: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                'rounded-xl border p-3 text-left transition-colors',
                active ? 'border-emerald-600 bg-emerald-50/50' : 'bg-white hover:bg-muted/20',
            )}
        >
            <p className="text-sm font-semibold">{title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        </button>
    );
}

