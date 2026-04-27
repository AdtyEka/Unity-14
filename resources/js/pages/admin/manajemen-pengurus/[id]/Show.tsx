import * as React from 'react';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ManajemenPengurusShow({
    id,
    onBack,
}: {
    id: string;
    onBack: () => void;
}) {
    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">Manajemen Pengguna</p>
                    <h1 className="text-2xl font-bold tracking-tight">Detail Pengguna</h1>
                </div>
                <Button type="button" variant="outline" onClick={onBack}>
                    <ArrowLeft className="mr-2 size-4" />
                    Kembali
                </Button>
            </div>

            <Card className="bg-white">
                <CardContent className="p-4 md:p-5">
                    <p className="text-sm text-muted-foreground">Halaman detail pengguna untuk ID: {id}</p>
                </CardContent>
            </Card>
        </div>
    );
}

