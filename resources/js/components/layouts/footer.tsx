import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0, y = 20, duration = 0.6) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay, ease: EASE },
});

const CREATORS = [
    { name: 'Aditya Eka Narayan', href: 'https://portal.dinus.ac.id/show/MTUwMDY4ODI2NjJiZGI3MjIzNWMxMTMzZmI1MDk3NzUtOTUyNDMtMTI5MDU0Mzc3MDE0MjA2NjExMg~~' },
    { name: 'Muhammad Nafhis Fadhil', href: 'https://portal.dinus.ac.id/show/NTQwN2JiNGVkNzYyOWY1MTM5ZTg3ZTYzODI0NzE1YWUtOTQ3MTktMjQ1MTI3MzM0MzgwMzcwOTcwMA~~' },
    { name: 'Nabil Hibban Hardian', href: 'https://portal.dinus.ac.id/show/MTI5YjhkMjA5ZWZlZmNhYWE4NTI5NDIxNGM2MmFlMmMtOTUyNzYtMzI4MDYyODQyODA0NjM3MjI1Ng~~' },
];

const FOOTER_LINKS = [
    {
        title: 'Navigasi',
        links: [
            { label: 'Home', href: '/' },
            { label: 'Layanan', href: '/layanan' },
            { label: 'MPASI', href: '/mpasi' },
            { label: 'Artikel', href: '/artikel' },
        ],
    },
    {
        title: 'Fitur',
        links: [
            { label: 'Deteksi dini stunting', href: '/layanan' },
            { label: 'Pemantauan pertumbuhan', href: '/layanan' },
            { label: 'Rekomendasi MPASI', href: '/mpasi' },
            { label: 'Edukasi orang tua', href: '/artikel' },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="w-full px-6 py-16 pb-6 md:px-12 lg:px-20">
            <motion.div
                {...fadeUp(0.1, 20, 0.7)}
                className="w-full rounded-2xl p-6 md:p-10"
                style={{
                    background: 'rgba(255,255,255,0.4)',
                    border: '1px solid rgba(255,255,255,0.5)',
                    boxShadow: 'var(--shadow-dashboard)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                }}
            >
                <div className="grid gap-10 md:grid-cols-12 md:gap-8">
                    {/* Brand + description */}
                    <div className="md:col-span-4">
                        <motion.div {...fadeUp(0.15, 16, 0.6)}>
                            <div
                                className="inline-flex items-center gap-3 rounded-2xl px-4 py-3"
                                style={{
                                    background: 'rgba(255,255,255,0.65)',
                                    border: '1px solid rgba(255,255,255,0.78)',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                                    backdropFilter: 'blur(22px)',
                                    WebkitBackdropFilter: 'blur(22px)',
                                }}
                            >
                                <img
                                    src="/assets/images/login/Icon%20Dashboard.webp"
                                    alt="NA Team"
                                    className="h-9 w-9"
                                />
                                <div className="flex flex-col leading-[1.05]">
                                    <span
                                        className="text-black text-sm font-semibold tracking-tight"
                                        style={{ fontFamily: 'var(--font-body)' }}
                                    >
                                        NA Team
                                    </span>
                                    <span
                                        className="text-black text-2xl font-semibold tracking-tight"
                                        style={{ fontFamily: 'var(--font-display)' }}
                                    >
                                        Unity Stunting
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.p
                            {...fadeUp(0.22, 12, 0.6)}
                            className="mt-4 max-w-sm text-sm leading-relaxed text-black"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            Platform untuk membantu deteksi dini risiko stunting, pemantauan pertumbuhan, serta rekomendasi MPASI
                            berbasis data agar setiap anak mendapat dukungan terbaik di 1.000 hari pertama kehidupan.
                        </motion.p>

                        <motion.div {...fadeUp(0.3, 10, 0.6)} className="mt-5 flex flex-wrap items-center gap-3">
                            <span
                                className="inline-flex items-center rounded-full px-3 py-1 text-xs text-black"
                                style={{
                                    background: 'rgba(0,0,0,0.06)',
                                    border: '1px solid rgba(0,0,0,0.08)',
                                    fontFamily: 'var(--font-body)',
                                }}
                            >
                                Bahasa: Indonesia
                            </span>
                            <span
                                className="inline-flex items-center rounded-full px-3 py-1 text-xs text-black"
                                style={{
                                    background: 'rgba(0,0,0,0.06)',
                                    border: '1px solid rgba(0,0,0,0.08)',
                                    fontFamily: 'var(--font-body)',
                                }}
                            >
                                Berbasis bukti • Ramah posyandu
                            </span>
                        </motion.div>
                    </div>

                    {/* Link columns */}
                    <div className="md:col-span-8">
                        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
                            {FOOTER_LINKS.map((group, gi) => (
                                <motion.div key={group.title} {...fadeUp(0.18 + gi * 0.08, 14, 0.6)}>
                                    <div
                                        className="text-foreground text-sm font-semibold"
                                        style={{ fontFamily: 'var(--font-body)' }}
                                    >
                                        {group.title}
                                    </div>
                                    <div className="mt-4 flex flex-col gap-2">
                                        {group.links.map((item) => (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                className="text-sm text-black transition-colors duration-150 hover:text-black/70"
                                                style={{ fontFamily: 'var(--font-body)' }}
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}

                            <motion.div {...fadeUp(0.42, 14, 0.6)}>
                                <div
                                    className="text-foreground text-sm font-semibold"
                                    style={{ fontFamily: 'var(--font-body)' }}
                                >
                                    Tim
                                </div>
                                <div className="mt-4 flex flex-col gap-2">
                                    {CREATORS.map((creator) => (
                                        <a
                                            key={creator.name}
                                            href={creator.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-sm text-black transition-colors duration-150 hover:text-black/70"
                                            style={{ fontFamily: 'var(--font-body)' }}
                                        >
                                            {creator.name}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Bottom row */}
                <motion.div {...fadeUp(0.55, 10, 0.6)} className="mt-10">
                    <div className="h-px w-full" style={{ background: 'rgba(0,0,0,0.12)' }} />
                    <div className="mt-6 flex flex-col gap-3 text-xs md:flex-row md:items-center md:justify-between">
                        <p className="text-black" style={{ fontFamily: 'var(--font-body)' }}>
                            © 2026 NA Team. Unity Stunting — semua hak dilindungi.
                        </p>
                        <p className="text-black" style={{ fontFamily: 'var(--font-body)' }}>
                            "Dari data menjadi tindakan — demi generasi Indonesia yang lebih sehat."
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </footer>
    );
}
