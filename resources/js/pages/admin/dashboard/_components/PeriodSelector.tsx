import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const periodOptions = ['7 Hari', '30 Hari', 'Kustom'] as const;
export type PeriodOption = (typeof periodOptions)[number];

const card3dClassName =
    'relative overflow-hidden transition-all duration-200 ease-out will-change-transform ' +
    'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 hover:ring-1 hover:ring-foreground/10 ' +
    'before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-0 before:transition-opacity ' +
    'hover:before:opacity-100 dark:before:from-white/10';

export default function PeriodSelector({
    activePeriod,
    onPeriodChange,
}: {
    activePeriod: PeriodOption;
    onPeriodChange: (value: PeriodOption) => void;
}) {
    return (
        <div className="flex items-center gap-1 rounded-lg border bg-card p-1 shadow-xs">
            {periodOptions.map((opt) => (
                <button
                    key={opt}
                    type="button"
                    onClick={() => onPeriodChange(opt)}
                    className={cn(
                        'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                        activePeriod === opt
                            ? 'bg-muted text-foreground'
                            : 'text-muted-foreground hover:bg-muted/50',
                    )}
                >
                    {opt}
                </button>
            ))}
        </div>
    );
}

export function CustomRangePanel({
    months,
    customFrom,
    customTo,
    onCustomFromChange,
    onCustomToChange,
    onResetCustom,
    onApplyCustom,
}: {
    months: string[];
    customFrom: string;
    customTo: string;
    onCustomFromChange: (value: string) => void;
    onCustomToChange: (value: string) => void;
    onResetCustom: () => void;
    onApplyCustom: () => void;
}) {
    return (
        <Card className={cn(card3dClassName, 'bg-white')}>
            <CardContent className="p-4">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_auto_auto] md:items-end">
                    <div>
                        <label className="text-xs font-medium text-muted-foreground">Dari Bulan</label>
                        <select
                            value={customFrom}
                            onChange={(e) => onCustomFromChange(e.target.value)}
                            className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                        >
                            {months.map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-xs font-medium text-muted-foreground">Sampai Bulan</label>
                        <select
                            value={customTo}
                            onChange={(e) => onCustomToChange(e.target.value)}
                            className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                        >
                            {months.map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Button type="button" variant="outline" onClick={onResetCustom}>
                        Reset
                    </Button>
                    <Button type="button" onClick={onApplyCustom}>
                        Terapkan
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

