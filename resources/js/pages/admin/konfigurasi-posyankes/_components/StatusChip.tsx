import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function StatusChip({ status }: { status: 'Buka' | 'Tutup' }) {
    const className =
        status === 'Buka'
            ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
            : 'bg-muted text-muted-foreground border-border';

    return (
        <Badge variant="outline" className={cn('rounded-full px-2.5 py-1 text-xs font-medium', className)}>
            {status}
        </Badge>
    );
}

