import * as React from 'react';
import { useForm } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import JamLayananController from '@/actions/App/Http/Controllers/Admin/JamLayananController';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type JamLayananRow = {
    id?: number;
    hari: string;
    jam: string;
    status: 'Buka' | 'Tutup';
};

interface JamLayananModalProps {
    puskesmasId: number;
    initialData: JamLayananRow[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function JamLayananModal({ puskesmasId, initialData, open, onOpenChange }: JamLayananModalProps) {
    const { data, setData, post, processing, reset, errors } = useForm({
        jam_layanans: initialData.length > 0 ? [...initialData] : [{ hari: '', jam: '', status: 'Buka' as const }],
    });

    React.useEffect(() => {
        if (open) {
            setData('jam_layanans', initialData.length > 0 ? [...initialData] : [{ hari: '', jam: '', status: 'Buka' as const }]);
        }
    }, [open, initialData]);

    const handleAddRow = () => {
        setData('jam_layanans', [...data.jam_layanans, { hari: '', jam: '', status: 'Buka' }]);
    };

    const handleRemoveRow = (index: number) => {
        const newData = [...data.jam_layanans];
        newData.splice(index, 1);
        setData('jam_layanans', newData);
    };

    const handleChange = (index: number, field: keyof JamLayananRow, value: string) => {
        const newData = [...data.jam_layanans];
        newData[index] = { ...newData[index], [field]: value };
        setData('jam_layanans', newData);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(JamLayananController.updateBatch.url({ puskesmas: puskesmasId }), {
            preserveScroll: true,
            onSuccess: () => {
                onOpenChange(false);
                alert('Jam Layanan berhasil diperbarui.');
            },
            onError: (err) => {
                console.error(err);
                alert('Gagal menyimpan jam layanan. Periksa inputan Anda.');
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <form onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle>Ubah Jam Layanan</DialogTitle>
                        <DialogDescription>
                            Perbarui jadwal buka dan tutup Puskesmas.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4 space-y-4">
                        {data.jam_layanans.map((row, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <Input
                                    placeholder="Hari (Contoh: Senin - Kamis)"
                                    value={row.hari}
                                    onChange={(e) => handleChange(index, 'hari', e.target.value)}
                                    className="flex-1"
                                    required
                                />
                                <Input
                                    placeholder="Jam (Contoh: 07:30 - 16:00 WIB)"
                                    value={row.jam}
                                    onChange={(e) => handleChange(index, 'jam', e.target.value)}
                                    className="flex-1"
                                    required
                                />
                                <Select
                                    value={row.status}
                                    onValueChange={(val) => handleChange(index, 'status', val)}
                                >
                                    <SelectTrigger className="w-[110px]">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Buka">Buka</SelectItem>
                                        <SelectItem value="Tutup">Tutup</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveRow(index)}
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                >
                                    <Trash2 className="size-4" />
                                </Button>
                            </div>
                        ))}

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full border-dashed"
                            onClick={handleAddRow}
                        >
                            <Plus className="mr-2 size-4" />
                            Tambah Baris
                        </Button>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={processing}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={processing}>
                            Simpan Perubahan
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
