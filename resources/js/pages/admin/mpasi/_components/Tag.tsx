import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function Tag({ children }: { children: string }) {
    const isGreen =
        children.toLowerCase().includes('sayur') ||
        children.toLowerCase().includes('zat besi') ||
        children.toLowerCase().includes('bulan');

    return (
        <Badge
            variant="outline"
            className={cn(
                'rounded-full px-2 py-0.5 text-[11px] font-medium',
                isGreen
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                    : 'border-border bg-muted/30 text-muted-foreground',
            )}
        >
            {children}
        </Badge>
    );
}

