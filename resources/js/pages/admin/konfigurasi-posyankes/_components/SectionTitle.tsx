import * as React from 'react';

export default function SectionTitle({
    icon,
    title,
    right,
}: {
    icon: React.ReactNode;
    title: string;
    right?: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
                <div className="text-emerald-700 [&>svg]:size-5">{icon}</div>
                <h2 className="text-base font-semibold text-foreground">{title}</h2>
            </div>
            {right}
        </div>
    );
}

