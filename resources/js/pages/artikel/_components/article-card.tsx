import * as React from 'react';
import { Link } from '@inertiajs/react';
import type { Article } from '@/data/articles';

// ─── Glass Card ───────────────────────────────────────────────────────────────

function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={`rounded-2xl transition-all duration-200 ease-out hover:-translate-y-0.5 ${className}`}
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

// ─── Badge Kategori ───────────────────────────────────────────────────────────

export function KategoriBadge({ label }: { label: string }) {
    return (
        <span
            className="inline-flex w-fit self-start items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
            style={{
                fontFamily: 'var(--font-body)',
                background: 'rgba(16,185,129,0.15)',
                border: '1px solid rgba(16,185,129,0.35)',
                color: 'rgb(6,95,70)',
            }}
        >
            {label}
        </span>
    );
}

// ─── Featured Card (kiri, gambar besar) ──────────────────────────────────────

export function FeaturedCard({ artikel }: { artikel: Article }) {
    return (
        <Link href={`/artikel/${artikel.slug}`} className="block h-full">
            <GlassCard className="overflow-hidden h-full flex flex-col cursor-pointer">
                <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                        src={artikel.gambar}
                        alt={artikel.judul}
                        className="h-72 w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                        <KategoriBadge label={artikel.kategori} />
                    </div>
                </div>

                <div
                    className="flex flex-1 flex-col justify-between p-5"
                    style={{
                        background: 'rgba(255,255,255,0.35)',
                        backdropFilter: 'blur(8px)',
                    }}
                >
                    <div>
                        <h2
                            className="text-lg font-semibold text-foreground leading-snug"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            {artikel.judul}
                        </h2>
                        <p
                            className="mt-2 text-sm text-foreground/65 leading-relaxed line-clamp-3"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            {artikel.deskripsi}
                        </p>
                    </div>
                    <p
                        className="mt-4 text-xs font-medium text-foreground/50"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        {artikel.penulis}
                    </p>
                </div>
            </GlassCard>
        </Link>
    );
}

// ─── Side Item (kanan, thumbnail kiri + teks kanan) ──────────────────────────

export function SideArtikelItem({ artikel }: { artikel: Article }) {
    return (
        <Link href={`/artikel/${artikel.slug}`} className="block flex-1">
            <GlassCard className="flex flex-1 overflow-hidden cursor-pointer h-full">
                <div className="w-28 shrink-0 overflow-hidden rounded-l-2xl">
                    <img
                        src={artikel.gambar}
                        alt={artikel.judul}
                        className="h-full w-full object-cover"
                        style={{ minHeight: 100 }}
                    />
                </div>

                <div className="flex flex-1 flex-col justify-center gap-1.5 px-4 py-3">
                    <KategoriBadge label={artikel.kategori} />
                    <h3
                        className="text-sm font-semibold text-foreground leading-snug line-clamp-2"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        {artikel.judul}
                    </h3>
                    <p
                        className="text-xs text-foreground/50"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        Dibuat oleh: {artikel.penulis}
                    </p>
                </div>
            </GlassCard>
        </Link>
    );
}

// ─── Trending Grid Card ───────────────────────────────────────────────────────

export function TrendingCard({ artikel }: { artikel: Article }) {
    return (
        <Link href={`/artikel/${artikel.slug}`} className="block h-full">
            <GlassCard className="overflow-hidden flex flex-col cursor-pointer h-full">
                <div className="overflow-hidden rounded-t-2xl">
                    <img
                        src={artikel.gambar}
                        alt={artikel.judul}
                        className="h-44 w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                    <h3
                        className="text-sm font-semibold text-foreground leading-snug line-clamp-3"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        {artikel.judul}
                    </h3>
                    <p
                        className="mt-auto text-xs text-foreground/50"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        {artikel.penulis}
                    </p>
                </div>
            </GlassCard>
        </Link>
    );
}
