import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

import { Button } from '@/components/ui/button';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0, y = 16, duration = 0.6) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay, ease: EASE },
});

function DashboardPreview() {
    return (
        <motion.div {...fadeUp(0.5, 30, 0.8)} className="mt-8 w-full max-w-5xl pointer-events-none select-none">
            <div
                className="overflow-hidden rounded-2xl p-3 md:p-4"
                style={{
                    background: 'rgba(255,255,255,0.4)',
                    border: '1px solid rgba(255,255,255,0.5)',
                    boxShadow: 'var(--shadow-dashboard)',
                }}
            >
                <img
                    src="/assets/images/hero/Hero%20Dashboard.webp"
                    alt="Hero Dashboard"
                    className="w-full rounded-xl"
                />
            </div>
        </motion.div>
    );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

export default function Hero() {
    return (
        <div className="flex min-h-screen flex-col bg-transparent">
            {/* Hero section — fills remaining height */}
            <section className="relative flex flex-1 flex-col items-center px-6 pt-12 pb-20">

                {/* Overlay to keep text readable */}
                <div className="absolute inset-0 z-0" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center w-full">
                    {/* 2. Headline */}
                    <motion.h1
                        {...fadeUp(0.1, 16, 0.6)}
                        className="text-foreground max-w-xl text-center text-5xl leading-[0.95] tracking-tight md:text-6xl lg:text-[5rem] mt-10"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Masa Depan Deteksi Cerdas Stunting
                    </motion.h1>

                    {/* 3. Subheadline */}
                    <motion.p
                        {...fadeUp(0.2, 16, 0.6)}
                        className="text-muted-foreground mt-4 max-w-[700px] text-center text-base leading-relaxed md:text-lg"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        Otomatiskan pemantauan tumbuh kembang anak dengan sistem cerdas yang menganalisis, memprediksi, dan memberi rekomendasi MPASI agar anak tumbuh optimal.
                    </motion.p>

                    {/* 4. CTA Buttons */}
                    <motion.div {...fadeUp(0.3, 16, 0.6)} className="mt-5 flex items-center gap-3">
                        <Button
                            className="rounded-full px-6 py-5 text-sm font-medium bg-black text-white hover:bg-black/90"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            Book a demo
                        </Button>

                        <button
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-background transition-colors hover:bg-white/80"
                            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
                            aria-label="Watch demo video"
                        >
                            <Play className="text-foreground h-4 w-4 fill-current" />
                        </button>
                    </motion.div>

                    {/* 5. Dashboard Preview */}
                    <DashboardPreview />
                </div>
            </section>
        </div>
    );
}