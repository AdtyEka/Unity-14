import * as React from 'react';
import { ArrowLeft, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function ManajemenPasienEdit({
    id,
    onBack,
}: {
    id: string;
    onBack: () => void;
}) {
    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Edit Pasien</h1>
                    <p className="mt-1 text-sm text-muted-foreground">UID: {id}</p>
                </div>
                <Button type="button" variant="outline" className="h-10 rounded-lg" onClick={onBack}>
                    <ArrowLeft className="mr-2 size-4" />
                    Kembali
                </Button>
            </div>

            <Card className="bg-white">
                <CardContent className="space-y-4 p-4 md:p-5">
                    <div>
                        <label className="text-sm font-medium">Nama Balita</label>
                        <Input className="mt-2 h-10" placeholder="Masukkan nama balita" />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Nama Ibu</label>
                        <Input className="mt-2 h-10" placeholder="Masukkan nama ibu" />
                    </div>
                    <div className="flex justify-end">
                        <Button type="button" className="h-10 rounded-lg px-5">
                            <Save className="mr-2 size-4" />
                            Simpan Perubahan
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

