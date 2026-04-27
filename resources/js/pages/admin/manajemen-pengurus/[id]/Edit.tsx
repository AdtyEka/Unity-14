import * as React from 'react';
import { ArrowLeft, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function ManajemenPengurusEdit({
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
                    <h1 className="text-2xl font-bold tracking-tight">Edit Akses Pengguna</h1>
                </div>
                <Button type="button" variant="outline" onClick={onBack}>
                    <ArrowLeft className="mr-2 size-4" />
                    Kembali
                </Button>
            </div>

            <Card className="bg-white">
                <CardContent className="space-y-4 p-4 md:p-5">
                    <p className="text-sm text-muted-foreground">ID Pengguna: {id}</p>
                    <div>
                        <label className="text-sm font-medium">Nama Lengkap</label>
                        <Input className="mt-2 h-10" defaultValue="Siti Nurhaliza, A.Md.Keb" />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Nomor HP</label>
                        <Input className="mt-2 h-10" defaultValue="08123456789" />
                    </div>
                    <div className="flex justify-end">
                        <Button type="button">
                            <Save className="mr-2 size-4" />
                            Simpan Perubahan
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

