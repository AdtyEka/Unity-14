import * as React from 'react';
import { ArrowLeft, Save, Upload, X, Plus, Trash2, ChevronUp, ChevronDown, Type, List, Heading1, Heading2, AlignLeft } from 'lucide-react';
import { useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

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
        content: (data?.content || []) as any[],
        sections: (data?.sections || []) as any[],
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

    // --- Content Block Helpers ---
    const addContentBlock = (type: 'paragraph' | 'heading' | 'subheading' | 'list') => {
        const newBlock = type === 'list' 
            ? { type, items: [''] } 
            : { type, text: '' };
        setData('content', [...formData.content, newBlock]);
    };

    const updateContentBlock = (index: number, value: any) => {
        const newContent = [...formData.content];
        newContent[index] = { ...newContent[index], ...value };
        setData('content', newContent);
    };

    const removeContentBlock = (index: number) => {
        setData('content', formData.content.filter((_, i) => i !== index));
    };

    const moveContentBlock = (index: number, direction: 'up' | 'down') => {
        const newContent = [...formData.content];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex >= 0 && newIndex < newContent.length) {
            [newContent[index], newContent[newIndex]] = [newContent[newIndex], newContent[index]];
            setData('content', newContent);
        }
    };

    // --- Section Helpers ---
    const addSection = () => {
        setData('sections', [...formData.sections, { subtitle: '', items: [{ label: '', points: [''] }] }]);
    };

    const updateSection = (index: number, value: any) => {
        const newSections = [...formData.sections];
        newSections[index] = { ...newSections[index], ...value };
        setData('sections', newSections);
    };

    const removeSection = (index: number) => {
        setData('sections', formData.sections.filter((_, i) => i !== index));
    };

    const addSectionItem = (sectionIndex: number) => {
        const newSections = [...formData.sections];
        newSections[sectionIndex].items.push({ label: '', points: [''] });
        setData('sections', newSections);
    };

    const updateSectionItem = (sectionIndex: number, itemIndex: number, value: any) => {
        const newSections = [...formData.sections];
        newSections[sectionIndex].items[itemIndex] = { ...newSections[sectionIndex].items[itemIndex], ...value };
        setData('sections', newSections);
    };

    const removeSectionItem = (sectionIndex: number, itemIndex: number) => {
        const newSections = [...formData.sections];
        newSections[sectionIndex].items = newSections[sectionIndex].items.filter((_, i: number) => i !== itemIndex);
        setData('sections', newSections);
    };

    const addPoint = (sectionIndex: number, itemIndex: number) => {
        const newSections = [...formData.sections];
        newSections[sectionIndex].items[itemIndex].points.push('');
        setData('sections', newSections);
    };

    const updatePoint = (sectionIndex: number, itemIndex: number, pointIndex: number, value: string) => {
        const newSections = [...formData.sections];
        newSections[sectionIndex].items[itemIndex].points[pointIndex] = value;
        setData('sections', newSections);
    };

    const removePoint = (sectionIndex: number, itemIndex: number, pointIndex: number) => {
        const newSections = [...formData.sections];
        newSections[sectionIndex].items[itemIndex].points = newSections[sectionIndex].items[itemIndex].points.filter((_, i: number) => i !== pointIndex);
        setData('sections', newSections);
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
                    {/* --- Informasi Utama --- */}
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

                    {/* --- Content Blocks Builder --- */}
                    <Card className={cn(card3dClassName, 'bg-white')}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle>Konten Artikel (Blocks)</CardTitle>
                            <div className="flex gap-2">
                                <Button type="button" variant="outline" size="sm" onClick={() => addContentBlock('heading')} className="h-8 rounded-lg text-[10px]">
                                    <Heading1 className="mr-1 size-3" /> Heading
                                </Button>
                                <Button type="button" variant="outline" size="sm" onClick={() => addContentBlock('subheading')} className="h-8 rounded-lg text-[10px]">
                                    <Heading2 className="mr-1 size-3" /> Sub
                                </Button>
                                <Button type="button" variant="outline" size="sm" onClick={() => addContentBlock('paragraph')} className="h-8 rounded-lg text-[10px]">
                                    <AlignLeft className="mr-1 size-3" /> Paragraph
                                </Button>
                                <Button type="button" variant="outline" size="sm" onClick={() => addContentBlock('list')} className="h-8 rounded-lg text-[10px]">
                                    <List className="mr-1 size-3" /> List
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {formData.content.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground border-2 border-dashed rounded-2xl">
                                    <Type className="size-8 mb-2 opacity-20" />
                                    <p className="text-sm">Belum ada blok konten. Tambahkan di atas.</p>
                                </div>
                            )}
                            {formData.content.map((block, index) => (
                                <div key={index} className="group relative flex flex-col gap-3 p-4 rounded-2xl border bg-white/50 transition-all hover:bg-white hover:shadow-md">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">
                                                Block #{index + 1} - {block.type}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button type="button" variant="ghost" size="icon" className="size-7 rounded-lg" onClick={() => moveContentBlock(index, 'up')} disabled={index === 0}>
                                                <ChevronUp className="size-3" />
                                            </Button>
                                            <Button type="button" variant="ghost" size="icon" className="size-7 rounded-lg" onClick={() => moveContentBlock(index, 'down')} disabled={index === formData.content.length - 1}>
                                                <ChevronDown className="size-3" />
                                            </Button>
                                            <Button type="button" variant="ghost" size="icon" className="size-7 rounded-lg text-destructive hover:bg-destructive/10" onClick={() => removeContentBlock(index)}>
                                                <Trash2 className="size-3" />
                                            </Button>
                                        </div>
                                    </div>

                                    {block.type === 'list' ? (
                                        <div className="space-y-2">
                                            {block.items.map((item: string, i: number) => (
                                                <div key={i} className="flex gap-2">
                                                    <Input
                                                        value={item}
                                                        onChange={(e) => {
                                                            const newItems = [...block.items];
                                                            newItems[i] = e.target.value;
                                                            updateContentBlock(index, { items: newItems });
                                                        }}
                                                        placeholder={`Item ${i + 1}`}
                                                        className="h-9 rounded-lg"
                                                    />
                                                    <Button type="button" variant="ghost" size="icon" className="size-9 rounded-lg" onClick={() => {
                                                        const newItems = block.items.filter((_: any, idx: number) => idx !== i);
                                                        updateContentBlock(index, { items: newItems });
                                                    }}>
                                                        <X className="size-3" />
                                                    </Button>
                                                </div>
                                            ))}
                                            <Button type="button" variant="ghost" size="sm" className="h-8 w-full rounded-lg border-dashed border-2" onClick={() => {
                                                updateContentBlock(index, { items: [...block.items, ''] });
                                            }}>
                                                <Plus className="mr-1 size-3" /> Tambah Item
                                            </Button>
                                        </div>
                                    ) : (
                                        <Textarea
                                            value={block.text}
                                            onChange={(e) => updateContentBlock(index, { text: e.target.value })}
                                            placeholder={`Masukkan ${block.type}...`}
                                            className={cn(
                                                "min-h-[80px] rounded-xl border-white/40 bg-white/50 focus:bg-white",
                                                block.type === 'heading' && "font-bold text-lg",
                                                block.type === 'subheading' && "font-semibold text-base"
                                            )}
                                        />
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* --- Sections Builder --- */}
                    <Card className={cn(card3dClassName, 'bg-white')}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle>Saran & Rekomendasi (Sections)</CardTitle>
                            <Button type="button" variant="outline" size="sm" onClick={addSection} className="h-8 rounded-lg text-xs">
                                <Plus className="mr-1 size-3" /> Tambah Section
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {formData.sections.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground border-2 border-dashed rounded-2xl">
                                    <List className="size-8 mb-2 opacity-20" />
                                    <p className="text-sm">Belum ada section. Tambahkan jika diperlukan.</p>
                                </div>
                            )}
                            {formData.sections.map((section: any, sIdx: number) => (
                                <div key={sIdx} className="p-4 rounded-2xl border bg-white/50 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Input
                                            value={section.subtitle}
                                            onChange={(e) => updateSection(sIdx, { subtitle: e.target.value })}
                                            placeholder="Sub-judul Section (e.g. Saran Nutrisi)"
                                            className="h-10 font-bold rounded-xl border-none bg-transparent focus-visible:ring-0 px-0 text-lg"
                                        />
                                        <Button type="button" variant="ghost" size="icon" className="size-8 rounded-lg text-destructive hover:bg-destructive/10" onClick={() => removeSection(sIdx)}>
                                            <Trash2 className="size-4" />
                                        </Button>
                                    </div>
                                    <Separator className="bg-black/5" />
                                    
                                    <div className="space-y-4">
                                        {section.items.map((item: any, iIdx: number) => (
                                            <div key={iIdx} className="pl-4 border-l-2 border-primary/20 space-y-2">
                                                <div className="flex items-center justify-between gap-4">
                                                    <Input
                                                        value={item.label}
                                                        onChange={(e) => updateSectionItem(sIdx, iIdx, { label: e.target.value })}
                                                        placeholder="Label (e.g. Karbohidrat)"
                                                        className="h-9 font-semibold rounded-lg"
                                                    />
                                                    <Button type="button" variant="ghost" size="icon" className="size-8 rounded-lg text-destructive/50 hover:text-destructive" onClick={() => removeSectionItem(sIdx, iIdx)}>
                                                        <X className="size-4" />
                                                    </Button>
                                                </div>
                                                <div className="space-y-2">
                                                    {item.points.map((point: string, pIdx: number) => (
                                                        <div key={pIdx} className="flex gap-2">
                                                            <Input
                                                                value={point}
                                                                onChange={(e) => updatePoint(sIdx, iIdx, pIdx, e.target.value)}
                                                                placeholder="Point deskripsi..."
                                                                className="h-8 rounded-lg text-sm"
                                                            />
                                                            <Button type="button" variant="ghost" size="icon" className="size-8 rounded-lg" onClick={() => removePoint(sIdx, iIdx, pIdx)}>
                                                                <X className="size-3" />
                                                            </Button>
                                                        </div>
                                                    ))}
                                                    <Button type="button" variant="ghost" size="sm" className="h-7 text-[10px] rounded-lg" onClick={() => addPoint(sIdx, iIdx)}>
                                                        <Plus className="mr-1 size-3" /> Tambah Point
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                        <Button type="button" variant="ghost" size="sm" className="w-full h-9 rounded-xl border-dashed border-2" onClick={() => addSectionItem(sIdx)}>
                                            <Plus className="mr-1 size-3" /> Tambah Item Ke Section
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-col gap-6">
                    {/* --- Gambar Utama --- */}
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

                    {/* --- Pengaturan --- */}
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
