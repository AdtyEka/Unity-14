import * as React from 'react';
import { MoreVertical, Search, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import CategoryDropdown, {
    type VideoCategory,
} from '@/pages/admin/mpasi/_components/CategoryDropdown';
import Tag from '@/pages/admin/mpasi/_components/Tag';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type VideoItem = {
    id: string;
    title: string;
    description: string;
    duration: string;
    tags: string[];
};

const card3dClassName =
    'relative overflow-hidden transition-all duration-200 ease-out will-change-transform ' +
    'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 hover:ring-1 hover:ring-foreground/10 ' +
    'before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-0 before:transition-opacity ' +
    'hover:before:opacity-100 dark:before:from-white/10';

const videosSeed: VideoItem[] = [
    {
        id: 'v-1',
        title: 'Bubur Tim Ati Ayam',
        description:
            'Panduan praktis membuat bubur tim ati ayam yang kaya zat besi untuk mencegah anemia.',
        duration: '05:30',
        tags: ['6-9 Bulan', 'Tinggi Zat Besi'],
    },
    {
        id: 'v-2',
        title: 'Puree Sayuran Hijau',
        description:
            'Cara mudah menyiapkan puree brokoli dan bayam dengan tekstur yang tepat untuk awal MPASI.',
        duration: '04:15',
        tags: ['6 Bulan', 'Sayuran'],
    },
];

export default function MpasiPage() {
    const [search, setSearch] = React.useState('');
    const [category, setCategory] = React.useState<VideoCategory | ''>('');
    const [title, setTitle] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const filtered = React.useMemo(() => {
        const q = search.trim().toLowerCase();
        if (q.length === 0) {
            return videosSeed;
        }
        return videosSeed.filter(
            (v) =>
                v.title.toLowerCase().includes(q) ||
                v.description.toLowerCase().includes(q) ||
                v.tags.some((t) => t.toLowerCase().includes(q)),
        );
    }, [search]);

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Manajemen MPASI</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Kelola video edukasi dan panduan pembuatan MPASI.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="flex flex-col gap-4 lg:col-span-2">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <p className="text-sm font-semibold text-foreground">Pustaka Video</p>
                        <div className="relative w-full md:max-w-xs">
                            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari video..."
                                className="h-10 rounded-lg pl-9"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {filtered.map((v) => (
                            <Card key={v.id} className={cn(card3dClassName, 'gap-0 bg-white py-0')}>
                                <CardContent className="p-0">
                                    <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-black/90">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="flex size-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                                                <div className="h-0 w-0 translate-x-[1px] border-y-[10px] border-y-transparent border-l-[16px] border-l-white/85" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-1 text-[11px] font-medium text-white">
                                            {v.duration}
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold">{v.title}</p>
                                                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                                                    {v.description}
                                                </p>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon-sm"
                                                        className="-mr-2"
                                                        aria-label="Aksi video"
                                                    >
                                                        <MoreVertical />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="min-w-36">
                                                    <DropdownMenuItem onSelect={() => {}}>
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem variant="destructive" onSelect={() => {}}>
                                                        Hapus
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>

                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {v.tags.map((t) => (
                                                <Tag key={t}>{t}</Tag>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <Card className={cn(card3dClassName, 'bg-white')}>
                    <CardContent className="p-4 md:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <div className="text-emerald-700 [&>svg]:size-5">
                                    <Upload className="size-5" />
                                </div>
                                <h2 className="text-base font-semibold text-foreground">
                                    Upload Video
                                </h2>
                            </div>
                        </div>

                        <Separator className="my-4" />

                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className={cn(
                                'w-full rounded-xl border border-dashed bg-muted/10 px-4 py-6 text-left transition-colors',
                                'hover:bg-muted/20',
                            )}
                        >
                            <div className="flex flex-col items-center gap-2 text-center">
                                <div className="flex size-10 items-center justify-center rounded-xl bg-muted/30 text-muted-foreground">
                                    <Upload className="size-5" />
                                </div>
                                <p className="text-sm font-semibold text-foreground">
                                    Tarik &amp; lepas video ke sini
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    atau klik untuk memilih file (MP4, Max 500MB)
                                </p>
                            </div>
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="video/mp4,video/*"
                            className="hidden"
                            onChange={() => {}}
                        />

                        <div className="mt-4 space-y-4">
                            <div className="space-y-2">
                                <p className="text-xs font-medium text-muted-foreground">Judul Video</p>
                                <Input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Masukkan judul..."
                                    className="h-10 rounded-lg"
                                />
                            </div>

                            <div className="space-y-2">
                                <p className="text-xs font-medium text-muted-foreground">Deskripsi Video</p>
                                <textarea
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    placeholder="Tulis deskripsi singkat..."
                                    className={cn(
                                        'min-h-[92px] w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none',
                                        'placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
                                    )}
                                />
                            </div>

                            <div className="space-y-2">
                                <p className="text-xs font-medium text-muted-foreground">Kategori Umur</p>
                                <CategoryDropdown value={category} onChange={setCategory} />
                            </div>
                        </div>

                        <div className="mt-5 flex gap-2">
                            <Button type="button" variant="outline" className="h-10 flex-1 rounded-lg">
                                Batal
                            </Button>
                            <Button type="button" className="h-10 flex-1 rounded-lg">
                                Simpan
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

