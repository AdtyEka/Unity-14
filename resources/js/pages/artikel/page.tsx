import * as React from 'react';
import MarketingLayout from '@/components/layouts/navbar';
import { articles } from '@/data/articles';
import { FeaturedCard, SideArtikelItem, TrendingCard } from './_components/article-card';

const featuredArtikel = articles[0];
const sideArtikelList = articles.slice(1, 4);
const trendingList = articles.slice(1);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ArtikelPage() {
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

                        {/* ── Hero Section: 50/50 ──────────────────────────── */}
                        <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
                            {/* Featured — kiri */}
                            <FeaturedCard artikel={featuredArtikel} />

                            {/* Side list — kanan, 3 item vertikal sama tinggi */}
                            <div className="flex h-full flex-col gap-3">
                                {sideArtikelList.map((a) => (
                                    <SideArtikelItem key={a.id} artikel={a} />
                                ))}
                            </div>
                        </div>

                        {/* ── Trending Section ─────────────────────────────── */}
                        <div className="mt-8">
                            {/* Header: judul kiri + deskripsi kanan */}
                            <div
                                className="flex flex-col gap-3 rounded-2xl px-5 py-4 md:flex-row md:items-center md:justify-between"
                                style={{
                                    background: 'rgba(255,255,255,0.55)',
                                    backgroundImage:
                                        'linear-gradient(135deg, rgba(255,255,255,0.70), rgba(255,255,255,0.36))',
                                    border: '1px solid rgba(255,255,255,0.68)',
                                    backdropFilter: 'blur(20px)',
                                    WebkitBackdropFilter: 'blur(20px)',
                                    boxShadow: 'var(--shadow-dashboard)',
                                }}
                            >
                                <h2
                                    className="text-xl font-semibold text-foreground shrink-0"
                                    style={{ fontFamily: 'var(--font-heading)' }}
                                >
                                    Tranding Artikel
                                </h2>
                                <p
                                    className="max-w-sm text-sm text-foreground/60 leading-relaxed"
                                    style={{ fontFamily: 'var(--font-body)' }}
                                >
                                    Selamat datang di Galeri Kami, tempat di mana kami membagikan
                                    dokumentasi kegiatan yang telah dilakukan di Desa Gemawang.
                                    Melalui foto-foto ini.
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="my-4 h-px w-full bg-white/35" />

                            {/* Grid 3-kolom */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {trendingList.map((a) => (
                                    <TrendingCard key={a.id} artikel={a} />
                                ))}
                            </div>
                        </div>
                    </main>
                </MarketingLayout>
            </div>
        </div>
    );
}
