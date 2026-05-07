import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function ConfirmDialog({
    open,
    title,
    description,
    confirmText = 'Lanjutkan',
    cancelText = 'Batal',
    confirmVariant = 'default',
    onConfirm,
    onOpenChange,
}: {
    open: boolean;
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    confirmVariant?: 'default' | 'destructive';
    onConfirm: () => void;
    onOpenChange: (open: boolean) => void;
}) {
    const cancelRef = React.useRef<HTMLButtonElement | null>(null);

    React.useEffect(() => {
        if (!open) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onOpenChange(false);
            }
        };

        window.addEventListener('keydown', onKeyDown);
        queueMicrotask(() => cancelRef.current?.focus());

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [open, onOpenChange]);

    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50">
            <button
                type="button"
                className="absolute inset-0 cursor-default bg-black/40"
                aria-label="Tutup dialog"
                onClick={() => onOpenChange(false)}
            />

            <div className="relative flex h-full w-full items-center justify-center p-4">
                <Card
                    className={cn(
                        'w-full max-w-md bg-white shadow-xl shadow-black/10',
                        'animate-in fade-in zoom-in-95 duration-200',
                    )}
                >
                    <CardContent className="p-5">
                        <div>
                            <p className="text-base font-semibold tracking-tight">{title}</p>
                            {description ? (
                                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                            ) : null}
                        </div>

                        <div className="mt-5 flex items-center justify-end gap-2">
                            <Button
                                ref={cancelRef}
                                type="button"
                                variant="outline"
                                className="h-10 rounded-lg px-4"
                                onClick={() => onOpenChange(false)}
                            >
                                {cancelText}
                            </Button>
                            <Button
                                type="button"
                                variant={confirmVariant}
                                className="h-10 rounded-lg px-4"
                                onClick={() => {
                                    onOpenChange(false);
                                    onConfirm();
                                }}
                            >
                                {confirmText}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

