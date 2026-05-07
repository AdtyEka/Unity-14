import * as React from 'react';
import { Clock, Hospital, Map } from 'lucide-react';
import MarketingLayout from '@/components/layouts/navbar';

// ─── Types ───────────────────────────────────────────────────────────────────

type JenisPuskesmas = 'Rawat Inap' | 'Non-Rawat Inap';

type JamLayananRow = {
    hari: string;
    jam: string;
    status: 'Buka' | 'Tutup';
};

type KelurahanRow = {
    nama: string;
    populasiBalita: number;
};

// ─── Seed Data ───────────────────────────────────────────────────────────────

const jamLayananSeed: JamLayananRow[] = [
    { hari: 'Senin - Kamis', jam: '07:30 - 16:00 WIB', status: 'Buka' },
    { hari: 'Jumat', jam: '07:30 - 16:30 WIB', status: 'Buka' },
    { hari: 'Sabtu', jam: '08:00 - 12:00 WIB', status: 'Buka' },
];

const kelurahanSeed: KelurahanRow[] = [
    { nama: 'Kelurahan Mawar', populasiBalita: 1240 },
    { nama: 'Kelurahan Melati', populasiBalita: 980 },
    { nama: 'Kelurahan Anggrek', populasiBalita: 850 },
];

// ─── Glass Card ──────────────────────────────────────────────────────────────

function GlassCard({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`rounded-2xl p-5 transition-all duration-200 ease-out hover:-translate-y-0.5 ${className}`}
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

// ─── Section Title ────────────────────────────────────────────────────────────

function SectionTitle({
    icon,
    title,
    right,
}: {
    icon: React.ReactNode;
    title: string;
    right?: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
                <div className="text-emerald-700">{icon}</div>
                <h2
                    className="text-lg font-semibold text-foreground"
                    style={{ fontFamily: 'var(--font-heading)' }}
                >
                    {title}
                </h2>
            </div>
            {right}
        </div>
    );
}

// ─── Status Chip ─────────────────────────────────────────────────────────────

function StatusChip({ status }: { status: 'Buka' | 'Tutup' }) {
    const cls =
        status === 'Buka'
            ? 'bg-emerald-100/80 text-emerald-800 border-emerald-200'
            : 'bg-white/55 text-foreground/70 border-white/40';
    return (
        <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${cls}`}
            style={{ fontFamily: 'var(--font-body)' }}
        >
            {status}
        </span>
    );
}

// ─── Glass Input ─────────────────────────────────────────────────────────────

function GlassInput({
    defaultValue,
    placeholder,
}: {
    defaultValue?: string;
    placeholder?: string;
}) {
    return (
        <input
            readOnly
            defaultValue={defaultValue}
            placeholder={placeholder}
            className="h-10 w-full cursor-default rounded-xl border border-white/55 bg-white/45 px-3 text-sm text-foreground placeholder:text-foreground/50 outline-none ring-0 transition-all focus:border-white/55 focus:bg-white/45 focus:ring-0"
            style={{ fontFamily: 'var(--font-body)', backdropFilter: 'blur(8px)' }}
        />
    );
}

// ─── Glass Button ─────────────────────────────────────────────────────────────

function GlassButton({
    children,
    variant = 'default',
    onClick,
    className = '',
}: {
    children: React.ReactNode;
    variant?: 'default' | 'outline' | 'ghost';
    onClick?: () => void;
    className?: string;
}) {
    const base =
        'inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-150 cursor-pointer select-none';

    const variants = {
        default:
            'bg-emerald-600/90 text-white hover:bg-emerald-700/90 border border-emerald-500/50 shadow-sm',
        outline:
            'bg-white/30 text-foreground border border-white/50 hover:bg-white/50 backdrop-blur-sm',
        ghost: 'bg-transparent text-foreground/70 hover:bg-white/30 border border-transparent hover:border-white/30',
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={`${base} ${variants[variant]} ${className}`}
            style={{ fontFamily: 'var(--font-body)' }}
        >
            {children}
        </button>
    );
}

// ─── Divider ─────────────────────────────────────────────────────────────────

function GlassDivider() {
    return <div className="my-4 h-px w-full bg-white/30" />;
}

// ─── Dropdown ─────────────────────────────────────────────────────────────────

function JenisPuskesmasSelect({
    value,
    onChange,
}: {
    value: JenisPuskesmas;
    onChange: (v: JenisPuskesmas) => void;
}) {
    return (
        <div className="relative">
            <select
                disabled
                value={value}
                onChange={(e) => onChange(e.target.value as JenisPuskesmas)}
                className="h-10 w-full cursor-default appearance-none rounded-xl border border-white/55 bg-white/45 px-3 pr-8 text-sm text-foreground opacity-100 outline-none ring-0 transition-all focus:border-white/55 focus:bg-white/45 focus:ring-0"
                style={{ fontFamily: 'var(--font-body)', backdropFilter: 'blur(8px)' }}
            >
                <option value="Non-Rawat Inap">Non-Rawat Inap</option>
                <option value="Rawat Inap">Rawat Inap</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
                ▾
            </span>
        </div>
    );
}

// ─── Profil Puskesmas Card ────────────────────────────────────────────────────

function ProfilPuskesmasCard() {
    const [jenis, setJenis] = React.useState<JenisPuskesmas>('Non-Rawat Inap');

    return (
        <GlassCard>
            <SectionTitle icon={<Hospital className="size-5" />} title="Profil Puskesmas" />
            <GlassDivider />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                    <p
                        className="text-xs font-medium text-foreground/70"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        Nama Puskesmas
                    </p>
                    <GlassInput defaultValue="Puskesmas Kecamatan Melati" />
                </div>

                <div className="space-y-1.5">
                    <p
                        className="text-xs font-medium text-foreground/70"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        Kode Fasyankes
                    </p>
                    <GlassInput defaultValue="P3173050101" />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                    <p
                        className="text-xs font-medium text-foreground/70"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        Jenis Puskesmas
                    </p>
                    <JenisPuskesmasSelect value={jenis} onChange={setJenis} />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                    <p
                        className="text-xs font-medium text-foreground/70"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        Alamat Lengkap
                    </p>
                    <div
                        className="rounded-xl border border-white/45 bg-white/40 px-3 py-2.5 text-sm text-foreground/70"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        Jl. Bunga Rampai No. 45, Kelurahan Mawar, Kecamatan Melati, Kota Jakarta
                        Barat, 11460
                    </div>
                </div>

                <div className="space-y-1.5">
                    <p
                        className="text-xs font-medium text-foreground/70"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        Nomor Telepon
                    </p>
                    <GlassInput defaultValue="(021) 567-8910" />
                </div>

                <div className="space-y-1.5">
                    <p
                        className="text-xs font-medium text-foreground/70"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        Email Klinik
                    </p>
                    <GlassInput defaultValue="info@pkm-melati.go.id" />
                </div>
            </div>
        </GlassCard>
    );
}

// ─── Jam Layanan Card ─────────────────────────────────────────────────────────

function JamLayananCard() {
    return (
        <GlassCard>
            <SectionTitle
                icon={<Clock className="size-5" />}
                title="Jam Layanan"
            />
            <GlassDivider />

            <div className="space-y-2.5">
                {jamLayananSeed.map((row) => (
                    <div
                        key={row.hari}
                        className="flex items-center justify-between gap-3 rounded-xl border border-white/45 bg-white/35 px-4 py-3 transition-colors hover:bg-white/45"
                    >
                        <p
                            className="text-sm font-semibold text-foreground"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            {row.hari}
                        </p>
                        <div className="flex items-center gap-3">
                            <p
                                className="text-xs text-foreground/60"
                                style={{ fontFamily: 'var(--font-body)' }}
                            >
                                {row.jam}
                            </p>
                            <StatusChip status={row.status} />
                        </div>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
}

// ─── Pemetaan Wilayah Card ────────────────────────────────────────────────────

function PemetaanWilayahCard() {
    return (
        <GlassCard>
            <SectionTitle icon={<Map className="size-5" />} title="Pemetaan Wilayah" />
            <GlassDivider />

            <p
                className="text-sm text-foreground/70 leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}
            >
                Daftar desa/kelurahan yang masuk dalam wilayah cakupan surveilans Stunting Sentinel
                untuk Puskesmas ini.
            </p>

            {/* Map Placeholder */}
            <div
                className="mt-4 overflow-hidden rounded-xl border border-white/30"
                style={{ background: 'rgba(255,255,255,0.2)' }}
            >
                <div className="relative h-40 w-full bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.25),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(15,23,42,0.08),transparent_60%)]">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <GlassButton variant="outline">Lihat Peta Besar</GlassButton>
                    </div>
                </div>
            </div>

            {/* Kelurahan Header */}
            <div className="mt-4 flex items-center justify-between">
                <p
                    className="text-xs font-semibold text-foreground/70"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    Cakupan Kelurahan ({kelurahanSeed.length})
                </p>
            </div>

            {/* Kelurahan List */}
            <div className="mt-2 space-y-2">
                {kelurahanSeed.map((k) => (
                    <div
                        key={k.nama}
                        className="flex items-center justify-between gap-3 rounded-xl border border-white/45 bg-white/40 px-3 py-3 transition-colors hover:bg-white/55"
                    >
                        <div className="min-w-0">
                            <p
                                className="truncate text-sm font-semibold text-foreground"
                                style={{ fontFamily: 'var(--font-body)' }}
                            >
                                {k.nama}
                            </p>
                            <p
                                className="text-xs text-foreground/60"
                                style={{ fontFamily: 'var(--font-body)' }}
                            >
                                Populasi Balita: {k.populasiBalita.toLocaleString('id-ID')}
                            </p>
                        </div>
                        <button
                            type="button"
                            className="inline-flex size-7 items-center justify-center rounded-lg text-foreground/55 transition-colors hover:bg-white/55 hover:text-foreground"
                            aria-label="Aksi"
                        >
                            ⋮
                        </button>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
}

// ─── Page Header ──────────────────────────────────────────────────────────────

function PageHeader() {
    return (
        <div className="mb-6">
            <h1
                className="text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
            >
                Konfigurasi Fasyankes
            </h1>
            <p
                className="mt-3 text-base text-black md:text-lg"
                style={{ fontFamily: 'var(--font-body)' }}
            >
                Kelola profil, jam layanan, dan wilayah cakupan Puskesmas Anda.
            </p>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LayananPage() {
    React.useEffect(() => {
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
            {/* Background Image */}
            <div
                aria-hidden="true"
                className="fixed inset-0 -z-10 bg-cover bg-center"
                style={{ backgroundImage: 'url(/assets/images/landing-page/Bg-Landing.webp)' }}
            />

            {/* Overlay */}
            <div className="fixed inset-0 -z-9" />

            {/* Content */}
            <div className="relative z-10">
                <MarketingLayout>
                    <main className="mx-auto w-full max-w-6xl px-4 pt-10 pb-20 md:px-10 lg:px-0 mt-20">
                        <PageHeader />

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 ">
                            {/* Left column */}
                            <div className="flex flex-col gap-4 lg:col-span-2">
                                <ProfilPuskesmasCard />
                                <JamLayananCard />
                            </div>

                            {/* Right column */}
                            <div className="flex flex-col gap-4">
                                <PemetaanWilayahCard />
                            </div>
                        </div>
                    </main>
                </MarketingLayout>
            </div>
        </div>
    );
}
