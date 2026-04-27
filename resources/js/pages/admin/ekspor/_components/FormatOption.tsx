import * as React from 'react';

import { cn } from '@/lib/utils';

export default function FormatOption({
    active,
    title,
    icon,
    onClick,
}: {
    active: boolean;
    title: string;
    icon: React.ReactNode;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                'flex items-center gap-2 rounded-xl border p-3 text-left transition-colors',
                active ? 'border-emerald-600 bg-emerald-50/50' : 'bg-white hover:bg-muted/20',
            )}
        >
            <span className="inline-flex size-5 items-center justify-center text-muted-foreground">
                {icon}
            </span>
            <span className="text-sm font-semibold">{title}</span>
        </button>
    );
}

