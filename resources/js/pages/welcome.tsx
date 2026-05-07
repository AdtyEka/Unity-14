import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/layouts/footer';
import MarketingLayout from '@/components/layouts/navbar';
import { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
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
            {/* Global background — fixed to viewport, never scrolls */}
            <div
                aria-hidden="true"
                className="fixed inset-0 -z-10 bg-cover bg-center"
                style={{ backgroundImage: 'url(/assets/images/landing-page/Bg-Landing.webp)' }}
            />

            {/* Cinematic overlay — fixed, sits just above video */}
            <div
                className="fixed inset-0 z-[-9]"
            />

            {/* Scrollable content — all sections share the same video frame */}
            <div className="relative z-10">
                <MarketingLayout>
                    <Hero />
                    <About />
                    <CTA />
                    <Footer />
                </MarketingLayout>
            </div>
        </div>
    );
}