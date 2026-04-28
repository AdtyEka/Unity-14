import * as React from 'react';
import { Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';

function Navbar() {
    return (
        <div className="relative z-20 px-4 pt-4 md:px-10 lg:px-16">
            <div
                className="mx-auto w-full max-w-6xl rounded-2xl"
                style={{
                    background: 'rgba(255,255,255,0.4)',
                    border: '1px solid rgba(255,255,255,0.5)',
                    boxShadow: 'var(--shadow-dashboard)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                }}
            >
                <nav
                    className="flex items-center justify-between px-4 py-4 md:px-6"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    <div className="flex items-center gap-2">
                        <img
                            src="/assets/images/login/Icon%20Dashboard.webp"
                            alt="NA Team"
                            className="h-7 w-7"
                        />
                        <span className="text-foreground text-xl font-semibold tracking-tight">NA Team</span>
                    </div>

                    <div className="hidden items-center gap-8 md:flex">
                        {[
                            { label: 'Home', href: '/' },
                            { label: 'Layanan', href: '/layanan' },
                            { label: 'MPASI', href: '/mpasi' },
                            { label: 'Artikel', href: '/artikel' },
                        ].map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <Button
                        className="rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/90"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        Get started
                    </Button>
                </nav>
            </div>
        </div>
    );
}

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}

