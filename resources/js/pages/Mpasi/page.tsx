import * as React from 'react';
import { ChefHat } from 'lucide-react';
import MarketingLayout from '@/components/layouts/navbar';

type TagKategori = 'Semua' | '6 - 8 bulan' | '9 - 11 bulan' | '12 - 23 bulan';

const TAG_KATEGORI: TagKategori[] = ['Semua', '6 - 8 bulan', '9 - 11 bulan', '12 - 23 bulan'];

type MpasiVideoProp = {
    id: number;
    judul: string;
    deskripsi: string;
    kategori: string;
    tags: string[];
    durasi: string;
    path_video: string;
    thumbnail_path: string;
    video_url: string;
};

// ─── Shared Glass Primitives ──────────────────────────────────────────────────

function GlassCard({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`rounded-2xl p-6 ${className}`}
            style={{
                background: 'rgba(255,255,255,0.62)',
                backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.78), rgba(255,255,255,0.46))',
                border: '1px solid rgba(255,255,255,0.70)',
                boxShadow: 'var(--shadow-dashboard)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
            }}
        >
            {children}
        </div>
    );
}

function GlassSurface({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`rounded-2xl p-5 ${className}`}
            style={{
                background: 'rgba(255,255,255,0.48)',
                backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.32))',
                border: '1px solid rgba(255,255,255,0.60)',
                boxShadow: 'var(--shadow-dashboard)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
            }}
        >
            {children}
        </div>
    );
}

// ─── Tags Filter ──────────────────────────────────────────────────────────────

function TagsFilter({
    active,
    onChange,
}: {
    active: TagKategori;
    onChange: (t: TagKategori) => void;
}) {
    return (
        <div className="flex flex-wrap gap-2">
            {TAG_KATEGORI.map((tag) => {
                const isActive = tag === active;
                return (
                    <button
                        key={tag}
                        type="button"
                        onClick={() => onChange(tag)}
                        className="rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-150 select-none"
                        style={{
                            fontFamily: 'var(--font-body)',
                            background: isActive
                                ? 'rgba(16,185,129,0.85)'
                                : 'rgba(255,255,255,0.55)',
                            border: isActive
                                ? '1px solid rgba(16,185,129,0.60)'
                                : '1px solid rgba(255,255,255,0.65)',
                            color: isActive ? '#fff' : 'var(--foreground)',
                            backdropFilter: 'blur(8px)',
                            boxShadow: isActive
                                ? '0 2px 12px rgba(16,185,129,0.25)'
                                : '0 1px 4px rgba(0,0,0,0.05)',
                        }}
                    >
                        {tag}
                    </button>
                );
            })}
        </div>
    );
}

// ─── Resep Section ────────────────────────────────────────────────────────────

function ResepSection({ videos }: { videos: MpasiVideoProp[] }) {
    const [activeTag, setActiveTag] = React.useState<TagKategori>('Semua');

    const filteredVideos = React.useMemo(() => {
        if (activeTag === 'Semua') {
            return videos;
        }
        return videos.filter((v) => v.kategori === activeTag);
    }, [activeTag, videos]);

    return (
        <GlassSurface>
            {/* Tags Categories heading dengan border aksen kiri */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-1 self-stretch rounded-full bg-emerald-500 min-h-[1.5rem]" />
                <h3
                    className="text-base font-semibold text-foreground"
                    style={{ fontFamily: 'var(--font-heading)' }}
                >
                    Tags Categories
                </h3>
            </div>

            <TagsFilter active={activeTag} onChange={setActiveTag} />

            {/* Video List */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.length > 0 ? (
                    filteredVideos.map((video) => (
                        <div key={video.id} className="group flex flex-col gap-3">
                            <div className="relative aspect-video overflow-hidden rounded-xl border border-white/40 bg-white/20 shadow-sm transition-all hover:shadow-md">
                                <img
                                    src={video.thumbnail_path || '/assets/images/placeholder-mpasi.jpg'}
                                    alt={video.judul}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 bg-black/20">
                                    <a
                                        href={video.video_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full bg-white/90 p-3 text-emerald-600 shadow-xl backdrop-blur-sm transition-transform active:scale-90"
                                    >
                                        <svg className="size-6 fill-current" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </a>
                                </div>
                                {video.durasi && (
                                    <span className="absolute bottom-2 right-2 rounded-lg bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                                        {video.durasi}
                                    </span>
                                )}
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-foreground line-clamp-1">
                                    {video.judul}
                                </h4>
                                <p className="text-xs text-foreground/60 line-clamp-2 mt-1">
                                    {video.deskripsi}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p
                        className="text-sm text-foreground/60 py-10 text-center col-span-full"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        Resep makanan untuk kategori ini belum ada
                    </p>
                )}
            </div>
        </GlassSurface>
    );
}

// ─── Galeri Deskripsi ─────────────────────────────────────────────────────────

// ─── Snack MPASI Section ──────────────────────────────────────────────────────

function SnackMpasiSection() {
    return null; // Combined with ResepSection for now as they use the same data source
}

// ─── Page Header ──────────────────────────────────────────────────────────────

function PageHeader() {
    return (
        <div className="mb-8">
            <h1
                className="text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
            >
                Semua Tentang Asupan
            </h1>
            <p
                className="mt-3 max-w-md text-base text-black leading-relaxed md:text-lg"
                style={{ fontFamily: 'var(--font-body)' }}
            >
                Jelajahi berbagai jenis makanan seperti sarapan, makan siang, dan lebih banyak
                lagi untuk menemukan resep lezat dan ide untuk setiap waktu sepanjang hari untuk
                anak Anda.
            </p>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MpasiPage({ videos }: { videos: MpasiVideoProp[] }) {
    React.useEffect(() => {
        const html = document.documentElement;
        const body = document.body;

        html.classList.add('no-scrollbar');
        body.classList.add('no-scrollbar', 'overflow-hidden');

        return () => {
            html.classList.remove('no-scrollbar');
            body.classList.remove('no-scrollbar', 'overflow-hidden');
        };
    }, []);

    return (
        <div className="no-scrollbar relative h-screen w-full overflow-x-hidden overflow-y-auto">
            {/* Background Image */}
            <div
                aria-hidden="true"
                className="fixed inset-0 -z-10 bg-cover bg-center"
                style={{ backgroundImage: 'url(/assets/images/landing-page/Bg-Landing.webp)' }}
            />

            {/* Overlay */}
            <div className="fixed inset-0 -z-9" />

            {/* Content */}
            <div className="relative z-10">
                <MarketingLayout>
                    <main className="mx-auto w-full max-w-6xl px-4 pt-10 pb-20 md:px-10 lg:px-0 mt-20">
                        {/* Header: plain di atas video, tanpa card */}
                        <PageHeader />

                        {/* Top grid: Resep Tags (kiri 2/3) — standalone, tanpa galeri di atas */}
                        <ResepSection videos={videos} />
                    </main>
                </MarketingLayout>
            </div>
        </div>
    );
}
