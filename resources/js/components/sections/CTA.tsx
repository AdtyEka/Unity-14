import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';

// ─── Data ────────────────────────────────────────────────────────────────────

const SLIDES = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1581093804475-577d72e35330?w=900&q=80',
        label: 'Pemantauan Posyandu',
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80',
        label: 'Konsultasi Gizi',
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=900&q=80',
        label: 'Pencatatan Data Anak',
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=900&q=80',
        label: 'Deteksi Dini Stunting',
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=900&q=80',
        label: 'Edukasi Orang Tua',
    },
];

const VISIBLE = 3;
const GAP = 16;
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const MAX_INDEX = SLIDES.length - VISIBLE;

const fadeUp = (delay = 0, y = 20, duration = 0.6) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay, ease: EASE },
});

// ─── Multi-card Carousel ──────────────────────────────────────────────────────

function Carousel() {
    const [current, setCurrent] = useState(0);
    const [cardWidth, setCardWidth] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const updateCardWidth = useCallback(() => {
        if (trackRef.current) {
            const containerWidth = trackRef.current.offsetWidth;
            setCardWidth((containerWidth - GAP * (VISIBLE - 1)) / VISIBLE);
        }
    }, []);

    useEffect(() => {
        updateCardWidth();
        window.addEventListener('resize', updateCardWidth);
        return () => window.removeEventListener('resize', updateCardWidth);
    }, [updateCardWidth]);

    const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);
    const next = useCallback(() => setCurrent((c) => Math.min(MAX_INDEX, c + 1)), []);

    // Autoplay
    useEffect(() => {
        timerRef.current = setTimeout(() => {
            setCurrent((c) => (c >= MAX_INDEX ? 0 : c + 1));
        }, 4000);
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [current]);

    const trackOffset = -(current * (cardWidth + GAP));

    return (
        <div className="flex flex-col gap-4">
            {/* Header row: title left, arrows right */}
            <div className="flex items-center justify-between">
                <span
                    className="text-foreground text-sm font-semibold"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    Kegiatan Kami
                </span>
                <div className="flex items-center gap-2">
                    <button
                        onClick={prev}
                        disabled={current === 0}
                        aria-label="Sebelumnya"
                        className="flex h-8 w-8 items-center justify-center rounded-full transition-opacity disabled:opacity-30"
                        style={{
                            background: 'rgba(0,0,0,0.08)',
                            border: '1px solid rgba(0,0,0,0.1)',
                        }}
                    >
                        <ChevronLeft className="text-foreground h-4 w-4" />
                    </button>
                    <button
                        onClick={next}
                        disabled={current >= MAX_INDEX}
                        aria-label="Berikutnya"
                        className="flex h-8 w-8 items-center justify-center rounded-full transition-opacity disabled:opacity-30"
                        style={{
                            background: 'rgba(0,0,0,0.08)',
                            border: '1px solid rgba(0,0,0,0.1)',
                        }}
                    >
                        <ChevronRight className="text-foreground h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Track */}
            <div ref={trackRef} className="overflow-hidden">
                <motion.div
                    className="flex"
                    style={{ gap: GAP }}
                    animate={{ x: cardWidth > 0 ? trackOffset : 0 }}
                    transition={{ duration: 0.55, ease: EASE }}
                >
                    {SLIDES.map((slide) => (
                        <div
                            key={slide.id}
                            className="relative shrink-0 overflow-hidden rounded-2xl"
                            style={{
                                width: cardWidth > 0 ? cardWidth : `calc((100% - ${GAP * (VISIBLE - 1)}px) / ${VISIBLE})`,
                                aspectRatio: '3/4',
                            }}
                        >
                            <img
                                src={slide.src}
                                alt={slide.label}
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                            {/* Bottom label */}
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-4 py-4">
                                <span
                                    className="block text-sm font-medium text-white leading-snug"
                                    style={{ fontFamily: 'var(--font-body)' }}
                                >
                                    {slide.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

// ─── CTA Section ─────────────────────────────────────────────────────────────

export default function CTA() {
    return (
        <section className="w-full flex justify-center px-6 md:px-12 lg:px-20 py-20">
            <motion.div
                {...fadeUp(0.1, 20, 0.7)}
                className="w-full max-w-5xl rounded-2xl p-6 md:p-10"
                style={{
                    background: 'rgba(255,255,255,0.4)',
                    border: '1px solid rgba(255,255,255,0.5)',
                    boxShadow: 'var(--shadow-dashboard)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                }}
            >
                {/* Header */}
                <div className="mb-8 flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
                    <div className="flex flex-col gap-2">
                        <motion.span
                            {...fadeUp(0.15, 10, 0.5)}
                            className="text-muted-foreground text-xs font-semibold uppercase tracking-widest"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            Lihat Dampak Nyata
                        </motion.span>
                        <motion.h2
                            {...fadeUp(0.2, 16, 0.6)}
                            className="text-foreground text-3xl leading-tight tracking-tight md:text-4xl"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            Dari Data Menjadi
                            <br />
                            <em>Aksi Nyata</em> di Lapangan
                        </motion.h2>
                        <motion.p
                            {...fadeUp(0.28, 12, 0.6)}
                            className="text-muted-foreground max-w-md text-sm leading-relaxed md:text-base"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            Platform kami telah membantu ratusan tenaga kesehatan dan orang tua memantau tumbuh kembang anak secara real-time dan berbasis data.
                        </motion.p>
                    </div>

                    <motion.div {...fadeUp(0.35, 12, 0.6)} className="shrink-0">
                        <Button
                            className="rounded-full px-6 py-5 text-sm font-medium bg-black text-white hover:bg-black/90"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            Mulai Pantau Tumbuh Kembang Anak
                        </Button>
                    </motion.div>
                </div>

                {/* Carousel */}
                <motion.div {...fadeUp(0.45, 16, 0.7)}>
                    <Carousel />
                </motion.div>
            </motion.div>
        </section>
    );
}
