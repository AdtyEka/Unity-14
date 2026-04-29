import * as React from 'react';
import { Link } from '@inertiajs/react';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from '@/components/ui/sheet';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Layanan', href: '/layanan' },
    { label: 'MPASI', href: '/mpasi' },
    { label: 'Artikel', href: '/artikel' },
];

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
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <img
                            src="/assets/images/login/Icon%20Dashboard.webp"
                            alt="NA Team"
                            className="h-7 w-7"
                        />
                        <span className="text-foreground text-xl font-semibold tracking-tight">NA Team</span>
                    </div>

                    {/* Desktop links */}
                    <div className="hidden items-center gap-8 md:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <Button
                        asChild
                        className="hidden rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/90 md:inline-flex"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        <Link href="/login">Get started</Link>
                    </Button>

                    {/* Mobile burger */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                                aria-label="Buka menu"
                            >
                                <Menu className="size-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-72 p-0">
                            <SheetHeader className="border-b px-5 py-5">
                                <div className="flex items-center gap-2">
                                    <img
                                        src="/assets/images/login/Icon%20Dashboard.webp"
                                        alt="NA Team"
                                        className="h-7 w-7"
                                    />
                                    <SheetTitle className="text-xl font-semibold tracking-tight">
                                        NA Team
                                    </SheetTitle>
                                </div>
                            </SheetHeader>

                            <nav className="flex flex-col gap-1 px-3 py-4">
                                {navLinks.map((link) => (
                                    <SheetClose asChild key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-foreground hover:bg-muted rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </SheetClose>
                                ))}
                            </nav>

                            <div className="border-t px-5 py-5">
                                <SheetClose asChild>
                                    <Button
                                        asChild
                                        className="w-full rounded-full bg-black text-sm font-medium text-white hover:bg-black/90"
                                    >
                                        <Link href="/login">Get started</Link>
                                    </Button>
                                </SheetClose>
                            </div>
                        </SheetContent>
                    </Sheet>
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

