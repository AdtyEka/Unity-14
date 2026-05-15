import * as React from 'react';

import { cn } from '@/lib/utils';

type RiskLevel = 'Stunting Berat' | 'Stunting' | 'Normal';

const statusStyle: Record<RiskLevel | string, { bg: string; text: string }> = {
    Normal: { bg: 'bg-emerald-100', text: 'text-emerald-800' },
    Stunting: { bg: 'bg-amber-100', text: 'text-amber-800' },
    'Stunting Berat': { bg: 'bg-red-100', text: 'text-red-800' },
    '0-11 Bulan': { bg: 'bg-blue-100', text: 'text-blue-800' },
};

export default function StatusBadge({ status }: { status: RiskLevel | string }) {
    const s = statusStyle[status as RiskLevel] || statusStyle.Normal;
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                s.bg,
                s.text,
            )}
        >
            {status}
        </span>
    );
}

