import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/layouts/footer';
import MarketingLayout from '@/components/layouts/navbar';

export default function Home() {
    return (
        <div className="no-scrollbar relative h-screen w-full overflow-x-hidden overflow-y-auto">
            {/* Global video background — fixed to viewport, never scrolls */}
            <video
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="fixed inset-0 -z-10 h-full w-full object-cover"
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