import * as React from 'react';
import { Link } from '@inertiajs/react';
import { getArticleBySlug } from '@/data/articles';
import { KategoriBadge } from '../_components/article-card';

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
    slug: string;
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ArtikelDetailPage({ slug }: Props) {
    const artikel = getArticleBySlug(slug);

    return (
        <div className="no-scrollbar relative min-h-screen w-full overflow-x-hidden">
            {/* Background Video */}
            <video
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="fixed inset-0 -z-10 h-full w-full object-cover"
            />

            <div className="fixed inset-0 -z-10" />

            <div className="relative z-10">
                <main className="mx-auto w-full max-w-3xl px-4 pt-10 pb-24 md:px-10 lg:px-0">

                    {/* ── Tombol Kembali ───────────────────────────────── */}
                    <Link
                        href="/artikel"
                        className="inline-flex items-center gap-1.5 text-sm text-foreground/60 hover:text-foreground transition-colors mb-8"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m12 19-7-7 7-7" />
                            <path d="M19 12H5" />
                        </svg>
                        Kembali
                    </Link>

                    {!artikel ? <NotFound /> : <ArticleContent artikel={artikel} />}
                </main>
            </div>
        </div>
    );
}

// ─── Article Content ──────────────────────────────────────────────────────────

function ArticleContent({ artikel }: { artikel: NonNullable<ReturnType<typeof getArticleBySlug>> }) {
    return (
        <article>
            {/* ── Judul & Deskripsi (header ringkas) ───────────────── */}
            <div className="mb-6 text-center">
                <h1
                    className="text-2xl font-bold text-foreground leading-snug md:text-3xl"
                    style={{ fontFamily: 'var(--font-heading)' }}
                >
                    {artikel.judul}
                </h1>
                <p
                    className="mt-3 text-sm text-foreground/60 leading-relaxed max-w-2xl mx-auto"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    {artikel.deskripsi}
                </p>
            </div>

            {/* ── Gambar Hero ──────────────────────────────────────── */}
            <div className="mb-8 overflow-hidden rounded-2xl shadow-lg">
                <img
                    src={artikel.gambar}
                    alt={artikel.judul}
                    className="w-full h-72 object-cover md:h-96"
                />
            </div>

            {/* ── Meta & Tags ──────────────────────────────────────── */}
            <div
                className="mb-8 rounded-2xl px-6 py-5"
                style={{
                    background: 'rgba(255,255,255,0.62)',
                    backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.78), rgba(255,255,255,0.46))',
                    border: '1px solid rgba(255,255,255,0.70)',
                    boxShadow: 'var(--shadow-dashboard)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                }}
            >
                {/* Meta info */}
                <div
                    className="flex items-center gap-4 text-xs text-foreground/50 mb-4"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    <span className="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                            <line x1="16" x2="16" y1="2" y2="6" />
                            <line x1="8" x2="8" y1="2" y2="6" />
                            <line x1="3" x2="21" y1="10" y2="10" />
                        </svg>
                        {artikel.publishedAt}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {artikel.readTime}
                    </span>
                </div>

                {/* Judul lengkap */}
                <h2
                    className="text-xl font-bold text-foreground leading-snug mb-3"
                    style={{ fontFamily: 'var(--font-heading)' }}
                >
                    {artikel.judul}
                </h2>

                {/* Deskripsi */}
                <p
                    className="text-sm text-foreground/65 leading-relaxed mb-4"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    {artikel.deskripsi}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {artikel.tags.map((tag) => (
                        <KategoriBadge key={tag} label={tag} />
                    ))}
                </div>
            </div>

            {/* ── Konten Artikel ───────────────────────────────────── */}
            <div
                className="rounded-2xl px-6 py-7 space-y-2"
                style={{
                    background: 'rgba(255,255,255,0.62)',
                    backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.78), rgba(255,255,255,0.46))',
                    border: '1px solid rgba(255,255,255,0.70)',
                    boxShadow: 'var(--shadow-dashboard)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                }}
            >
                {artikel.content?.length ? (
                    <ContentBlocks artikel={artikel} />
                ) : (
                    <SectionsBlocks artikel={artikel} />
                )}
            </div>
        </article>
    );
}

function ContentBlocks({ artikel }: { artikel: NonNullable<ReturnType<typeof getArticleBySlug>> }) {
    return (
        <div className="space-y-3">
            {artikel.content?.map((block, index) => {
                if (block.type === 'heading') {
                    return (
                        <React.Fragment key={index}>
                            {index !== 0 && <div className="my-5 h-px w-full bg-foreground/10" />}
                            <h3
                                className="text-base font-bold text-foreground"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                {block.text}
                            </h3>
                        </React.Fragment>
                    );
                }

                if (block.type === 'subheading') {
                    return (
                        <p
                            key={index}
                            className="text-sm font-semibold text-foreground/80"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            {block.text}
                        </p>
                    );
                }

                if (block.type === 'list') {
                    return (
                        <ul key={index} className="list-disc list-inside space-y-1 pl-1">
                            {block.items.map((item, i) => (
                                <li
                                    key={i}
                                    className="text-sm text-foreground/70 leading-relaxed"
                                    style={{ fontFamily: 'var(--font-body)' }}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    );
                }

                return (
                    <p
                        key={index}
                        className="text-sm text-foreground/80 leading-relaxed"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        {block.text}
                    </p>
                );
            })}
        </div>
    );
}

function SectionsBlocks({ artikel }: { artikel: NonNullable<ReturnType<typeof getArticleBySlug>> }) {
    return (
        <>
            {artikel.sections.map((section, i) => (
                <div key={i}>
                    <div className="my-5 h-px w-full bg-foreground/10" />

                    <h3
                        className="text-base font-bold text-foreground mb-4"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        {section.subtitle}
                    </h3>

                    <div className="space-y-3">
                        {section.items.map((item, j) => (
                            <div key={j}>
                                <p
                                    className="text-sm font-semibold text-foreground/80 mb-1"
                                    style={{ fontFamily: 'var(--font-body)' }}
                                >
                                    {item.label}:
                                </p>
                                <ul className="list-disc list-inside space-y-1 pl-1">
                                    {item.points.map((point, k) => (
                                        <li
                                            key={k}
                                            className="text-sm text-foreground/70 leading-relaxed"
                                            style={{ fontFamily: 'var(--font-body)' }}
                                        >
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
}

// ─── Not Found ────────────────────────────────────────────────────────────────

function NotFound() {
    return (
        <div className="text-center py-20">
            <p
                className="text-lg text-foreground/60"
                style={{ fontFamily: 'var(--font-body)' }}
            >
                Artikel tidak ditemukan.
            </p>
        </div>
    );
}
