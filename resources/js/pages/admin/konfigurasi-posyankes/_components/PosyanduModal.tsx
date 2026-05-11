import * as React from 'react';
import { useForm } from '@inertiajs/react';
import PosyanduController from '@/actions/App/Http/Controllers/Admin/PosyanduController';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Posyandu = {
    id?: number;
    nama: string;
    populasi_balita: number;
};

interface PosyanduModalProps {
    puskesmasId: number;
    posyandu?: Posyandu;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function PosyanduModal({ puskesmasId, posyandu, open, onOpenChange }: PosyanduModalProps) {
    const isEdit = !!posyandu;

    const { data, setData, post, patch, processing, reset, errors } = useForm({
        nama: '',
        populasi_balita: 0,
    });

    React.useEffect(() => {
        if (open) {
            setData({
                nama: posyandu?.nama || '',
                populasi_balita: posyandu?.populasi_balita || 0,
            });
        } else {
            reset();
        }
    }, [open, posyandu]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isEdit && posyandu.id) {
            patch(PosyanduController.update.url({ puskesmas: puskesmasId, posyandu: posyandu.id }), {
                preserveScroll: true,
                onSuccess: () => {
                    onOpenChange(false);
                    alert('Wilayah Posyandu berhasil diperbarui.');
                },
            });
        } else {
            post(PosyanduController.store.url({ puskesmas: puskesmasId }), {
                preserveScroll: true,
                onSuccess: () => {
                    onOpenChange(false);
                    alert('Wilayah Posyandu berhasil ditambahkan.');
                },
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle>{isEdit ? 'Ubah Wilayah Posyandu' : 'Tambah Wilayah Posyandu'}</DialogTitle>
                        <DialogDescription>
                            Isi nama wilayah dan perkiraan jumlah balita.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Nama Kelurahan/Posyandu</label>
                            <Input
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                                placeholder="Contoh: Kelurahan Mawar"
                                required
                            />
                            {errors.nama && <p className="text-xs text-destructive">{errors.nama}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Populasi Balita</label>
                            <Input
                                type="number"
                                min="0"
                                value={data.populasi_balita}
                                onChange={(e) => setData('populasi_balita', parseInt(e.target.value) || 0)}
                                required
                            />
                            {errors.populasi_balita && <p className="text-xs text-destructive">{errors.populasi_balita}</p>}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={processing}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={processing}>
                            Simpan
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
