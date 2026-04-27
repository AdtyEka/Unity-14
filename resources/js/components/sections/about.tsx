import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0, y = 20, duration = 0.6) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay, ease: EASE },
});

export default function About() {
    return (
        <section className="w-full flex justify-center px-6 md:px-12 lg:px-20 py-20">
            <motion.div
                {...fadeUp(0.1, 20, 0.7)}
                className="w-full max-w-3xl rounded-2xl p-8 md:p-12 text-center"
                style={{
                    background: 'rgba(255,255,255,0.4)',
                    border: '1px solid rgba(255,255,255,0.5)',
                    boxShadow: 'var(--shadow-dashboard)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                }}
            >
                {/* Tagline */}
                <motion.span
                    {...fadeUp(0.15, 12, 0.5)}
                    className="text-muted-foreground mb-4 inline-block text-xs font-semibold uppercase tracking-widest"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    Tentang Kami
                </motion.span>

                {/* Heading */}
                <motion.h2
                    {...fadeUp(0.2, 16, 0.6)}
                    className="text-foreground text-3xl leading-tight tracking-tight md:text-4xl"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    Teknologi cerdas untuk masa depan
                    <br />
                    <em>tumbuh kembang anak</em> yang lebih baik
                </motion.h2>

                {/* Divider */}
                <motion.div
                    {...fadeUp(0.25, 0, 0.5)}
                    className="mx-auto my-6 h-px w-16"
                    style={{ background: 'rgba(0,0,0,0.12)' }}
                />

                {/* Body paragraphs */}
                <div
                    className="text-muted-foreground flex flex-col gap-4 text-base leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    <motion.p {...fadeUp(0.3, 12, 0.6)}>
                        NA Team Stunting adalah aplikasi berbasis web yang dirancang untuk membantu tenaga kesehatan dan orang tua
                        dalam mendeteksi risiko stunting pada anak sejak dini. Dengan menggunakan analisis data pertumbuhan secara
                        otomatis, sistem kami mampu menentukan apakah seorang anak berada dalam kondisi stunting, berisiko, atau
                        tumbuh normal.
                    </motion.p>

                    <motion.p {...fadeUp(0.38, 12, 0.6)}>
                        Lebih dari sekadar deteksi, platform ini juga memberikan rekomendasi MPASI (Makanan Pendamping ASI) yang
                        dipersonalisasi berdasarkan kondisi dan usia anak — membantu orang tua mengambil langkah nyata dalam
                        mendukung tumbuh kembang optimal sejak 1.000 hari pertama kehidupan.
                    </motion.p>

                    <motion.p {...fadeUp(0.46, 12, 0.6)}>
                        Kami percaya bahwa setiap anak berhak mendapatkan pemantauan kesehatan yang cerdas, mudah diakses, dan
                        berbasis bukti ilmiah — di mana pun mereka berada.
                    </motion.p>
                </div>

                {/* Mission tagline */}
                <motion.p
                    {...fadeUp(0.55, 10, 0.6)}
                    className="text-foreground/70 mt-8 text-sm font-medium italic"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    "Dari data menjadi tindakan — demi generasi Indonesia yang lebih sehat."
                </motion.p>
            </motion.div>
        </section>
    );
}
