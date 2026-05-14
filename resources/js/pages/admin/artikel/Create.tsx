import * as React from 'react';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import { useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface CreateProps {
    data?: any;
    onBack: () => void;
}

const card3dClassName =
    'relative overflow-hidden transition-all duration-200 ease-out will-change-transform ' +
    'before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-0 before:transition-opacity ' +
    'dark:before:from-white/10';

export default function ArtikelCreate({ data, onBack }: CreateProps) {
    const { data: formData, setData, post, processing, errors, reset } = useForm({
        judul: data?.judul || '',
        deskripsi: data?.deskripsi || '',
        kategori: data?.kategori || '',
        penulis: data?.penulis || 'Admin',
        gambar: null as File | null,
        published_at: data?.published_at ? new Date(data.published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        content: data?.content ? JSON.stringify(data.content, null, 2) : '',
        sections: data?.sections ? JSON.stringify(data.sections, null, 2) : '',
        _method: data ? 'PUT' : 'POST',
    });

    const [preview, setPreview] = React.useState<string | null>(
        data?.gambar ? (data.gambar.startsWith('http') ? data.gambar : `/storage/${data.gambar}`) : null
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('gambar', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Parse JSON content/sections back to objects if they are valid JSON
        const preparedData = { ...formData };
        try {
            if (formData.content) preparedData.content = JSON.parse(formData.content);
            if (formData.sections) preparedData.sections = JSON.parse(formData.sections);
        } catch (e) {
            alert('Format JSON pada Content atau Sections tidak valid.');
            return;
        }

        if (data) {
            post(`/admin/artikel/${data.id}`, {
                onSuccess: () => {
                    onBack();
                },
            });
        } else {
            post('/admin/artikel', {
                onSuccess: () => {
                    onBack();
                    reset();
                },
            });
        }
    };

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={onBack} className="rounded-xl bg-white/50 hover:bg-white shadow-sm ring-1 ring-black/5">
                    <ArrowLeft className="size-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        {data ? 'Edit Artikel' : 'Tambah Artikel Baru'}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {data ? 'Perbarui informasi artikel Anda.' : 'Buat artikel edukasi baru untuk masyarakat.'}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <Card className={cn(card3dClassName, 'bg-white')}>
                        <CardHeader>
                            <CardTitle>Informasi Utama</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="judul">Judul Artikel</Label>
                                <Input
                                    id="judul"
                                    value={formData.judul}
                                    onChange={(e) => setData('judul', e.target.value)}
                                    placeholder="Masukkan judul artikel"
                                    className="h-11 rounded-xl border-white/40 bg-white/50 focus:bg-white"
                                />
                                {errors.judul && <p className="text-xs text-destructive">{errors.judul}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="deskripsi">Deskripsi Singkat</Label>
                                <Textarea
                                    id="deskripsi"
                                    value={formData.deskripsi}
                                    onChange={(e) => setData('deskripsi', e.target.value)}
                                    placeholder="Ringkasan isi artikel..."
                                    className="min-h-[100px] rounded-xl border-white/40 bg-white/50 focus:bg-white"
                                />
                                {errors.deskripsi && <p className="text-xs text-destructive">{errors.deskripsi}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="kategori">Kategori</Label>
                                    <Input
                                        id="kategori"
                                        value={formData.kategori}
                                        onChange={(e) => setData('kategori', e.target.value)}
                                        placeholder="Contoh: Nutrisi"
                                        className="h-11 rounded-xl border-white/40 bg-white/50 focus:bg-white"
                                    />
                                    {errors.kategori && <p className="text-xs text-destructive">{errors.kategori}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="penulis">Penulis</Label>
                                    <Input
                                        id="penulis"
                                        value={formData.penulis}
                                        onChange={(e) => setData('penulis', e.target.value)}
                                        placeholder="Nama penulis"
                                        className="h-11 rounded-xl border-white/40 bg-white/50 focus:bg-white"
                                    />
                                    {errors.penulis && <p className="text-xs text-destructive">{errors.penulis}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className={cn(card3dClassName, 'bg-white')}>
                        <CardHeader>
                            <CardTitle>Konten Terstruktur (JSON)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="content">Content Block (JSON)</Label>
                                <Textarea
                                    id="content"
                                    value={formData.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    placeholder='[{"type": "paragraph", "text": "..."}]'
                                    className="min-h-[150px] font-mono text-xs rounded-xl border-white/40 bg-white/50 focus:bg-white"
                                />
                                {errors.content && <p className="text-xs text-destructive">{errors.content}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sections">Sections (JSON)</Label>
                                <Textarea
                                    id="sections"
                                    value={formData.sections}
                                    onChange={(e) => setData('sections', e.target.value)}
                                    placeholder='[{"subtitle": "...", "items": [...]}]'
                                    className="min-h-[150px] font-mono text-xs rounded-xl border-white/40 bg-white/50 focus:bg-white"
                                />
                                {errors.sections && <p className="text-xs text-destructive">{errors.sections}</p>}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-col gap-6">
                    <Card className={cn(card3dClassName, 'bg-white')}>
                        <CardHeader>
                            <CardTitle>Gambar Utama</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div
                                className={cn(
                                    'group relative aspect-video cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-white/40 bg-white/50 transition-all hover:bg-white',
                                    preview ? 'border-none ring-1 ring-black/5' : ''
                                )}
                                onClick={() => document.getElementById('gambar-input')?.click()}
                            >
                                {preview ? (
                                    <>
                                        <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                            <Upload className="text-white" />
                                        </div>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute right-2 top-2 size-8 rounded-lg shadow-lg"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setPreview(null);
                                                setData('gambar', null);
                                            }}
                                        >
                                            <X className="size-4" />
                                        </Button>
                                    </>
                                ) : (
                                    <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
                                        <Upload className="size-8" />
                                        <p className="text-sm font-medium">Unggah Gambar</p>
                                        <p className="text-[10px]">JPG, PNG, WebP up to 2MB</p>
                                    </div>
                                )}
                                <input
                                    id="gambar-input"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </div>
                            {errors.gambar && <p className="text-xs text-destructive text-center">{errors.gambar}</p>}
                        </CardContent>
                    </Card>

                    <Card className={cn(card3dClassName, 'bg-white')}>
                        <CardHeader>
                            <CardTitle>Pengaturan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="published_at">Tanggal Publikasi</Label>
                                <Input
                                    id="published_at"
                                    type="date"
                                    value={formData.published_at}
                                    onChange={(e) => setData('published_at', e.target.value)}
                                    className="h-11 rounded-xl border-white/40 bg-white/50 focus:bg-white"
                                />
                                {errors.published_at && <p className="text-xs text-destructive">{errors.published_at}</p>}
                            </div>

                            <Button type="submit" disabled={processing} className="w-full h-11 rounded-xl shadow-lg shadow-primary/20">
                                <Save className="mr-2 size-4" />
                                {data ? 'Simpan Perubahan' : 'Simpan Artikel'}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </div>
    );
}
