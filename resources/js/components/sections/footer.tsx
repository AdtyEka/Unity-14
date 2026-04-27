import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0, y = 20, duration = 0.6) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay, ease: EASE },
});

const CREATORS = [
    { name: 'Aditya Eka Narayan', href: '#' },
    { name: 'Muhammad Nafhis Fadhil', href: '#' },
    { name: 'Nabil Hibban Hardian', href: '#' },
];

export default function Footer() {
    return (
        <footer className="w-full flex justify-center px-6 md:px-12 lg:px-20 py-16 pb-24">
            <motion.div
                {...fadeUp(0.1, 20, 0.7)}
                className="w-full max-w-4xl rounded-2xl p-6 md:p-10 text-center"
                style={{
                    background: 'rgba(255,255,255,0.4)',
                    border: '1px solid rgba(255,255,255,0.5)',
                    boxShadow: 'var(--shadow-dashboard)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                }}
            >
                {/* Heading */}
                <motion.h2
                    {...fadeUp(0.15, 16, 0.6)}
                    className="text-foreground text-3xl tracking-tight md:text-4xl"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    Dibuat Oleh
                </motion.h2>

                {/* Divider */}
                <motion.div
                    {...fadeUp(0.2, 0, 0.5)}
                    className="mx-auto my-6 h-px w-12"
                    style={{ background: 'rgba(0,0,0,0.12)' }}
                />

                {/* Creator list */}
                <motion.div
                    {...fadeUp(0.25, 12, 0.6)}
                    className="flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-8"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    {CREATORS.map((creator, i) => (
                        <motion.a
                            key={creator.name}
                            href={creator.href}
                            {...fadeUp(0.28 + i * 0.08, 10, 0.55)}
                            className="text-foreground/80 hover:text-foreground relative text-base font-medium transition-colors duration-150 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 hover:after:scale-x-100"
                        >
                            {creator.name}
                        </motion.a>
                    ))}
                </motion.div>

                {/* Copyright */}
                <motion.p
                    {...fadeUp(0.52, 8, 0.5)}
                    className="text-muted-foreground mt-8 text-xs"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    © 2026 NA Team. All rights reserved.
                </motion.p>
            </motion.div>
        </footer>
    );
}
