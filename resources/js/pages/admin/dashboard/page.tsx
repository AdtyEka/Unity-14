import * as React from 'react';
import { AlertTriangle, Clock, Info, MoreVertical, TrendingUp, Users } from 'lucide-react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    Cell,
    Label,
    Pie,
    PieChart,
    XAxis,
} from 'recharts';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart';
import PeriodSelector, {
    CustomRangePanel,
    type PeriodOption,
} from '@/pages/admin/dashboard/_components/PeriodSelector';
import StatusBadge from '@/pages/admin/dashboard/_components/StatusBadge';
import { cn } from '@/lib/utils';

const trendData = [
    { bulan: 'Jan', normal: 40, risiko: 50, stunting: 15 },
    { bulan: 'Feb', normal: 65, risiko: 55, stunting: 18 },
    { bulan: 'Mar', normal: 75, risiko: 52, stunting: 16 },
    { bulan: 'Apr', normal: 85, risiko: 58, stunting: 14 },
    { bulan: 'Mei', normal: 100, risiko: 65, stunting: 12 },
    { bulan: 'Jun', normal: 116, risiko: 89, stunting: 42 },
];

const trendConfig = {
    normal: { label: 'Normal', color: '#10B981' },
    risiko: { label: 'Stunting Ringan', color: '#F59E0B' },
    stunting: { label: 'Stunting Berat', color: '#BA1A1A' },
} satisfies ChartConfig;

const distribusiData = [
    { status: 'Normal', value: 116, fill: '#10B981' },
    { status: 'Stunting Ringan', value: 89, fill: '#F59E0B' },
    { status: 'Stunting Berat', value: 42, fill: '#BA1A1A' },
];

const distribusiConfig = {
    value: { label: 'Pasien' },
    Normal: { label: 'Normal', color: '#10B981' },
    'Stunting Ringan': { label: 'Stunting Ringan', color: '#F59E0B' },
    'Stunting Berat': { label: 'Stunting Berat', color: '#BA1A1A' },
} satisfies ChartConfig;

const activities = [
    { initials: 'AM', name: 'Ananda Malik', age: '24 Bulan', date: '12 Okt 2024', status: 'Stunting Berat' as const },
    { initials: 'BP', name: 'Budi Pratama', age: '18 Bulan', date: '12 Okt 2024', status: 'Stunting Ringan' as const },
    { initials: 'CS', name: 'Citra Sari', age: '36 Bulan', date: '11 Okt 2024', status: 'Normal' as const },
    { initials: 'DW', name: 'Dian Wati', age: '12 Bulan', date: '10 Okt 2024', status: 'Stunting Berat' as const },
];

const schedules = [
    { month: 'Okt', day: 14, name: 'Fatimah Zahra', risk: 'Stunting Berat' as const, time: '09:00 WIB' },
    { month: 'Okt', day: 15, name: 'Bintang Putra', risk: 'Stunting Berat' as const, time: '10:30 WIB' },
    { month: 'Okt', day: 15, name: 'Aisyah Putri', risk: 'Stunting Berat' as const, time: '13:00 WIB' },
];

const card3dClassName =
    'relative overflow-hidden transition-all duration-200 ease-out will-change-transform ' +
    'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 hover:ring-1 hover:ring-foreground/10 ' +
    'before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-0 before:transition-opacity ' +
    'hover:before:opacity-100 dark:before:from-white/10';

export default function DashboardPage() {
    const [activePeriod, setActivePeriod] = React.useState<PeriodOption>('7 Hari');
    const [customFrom, setCustomFrom] = React.useState('Jan');
    const [customTo, setCustomTo] = React.useState('Jun');
    const [appliedCustomRange, setAppliedCustomRange] = React.useState<{ from: string; to: string } | null>(null);

    const months = React.useMemo(() => trendData.map((item) => item.bulan), []);

    const scopedTrendData = React.useMemo(() => {
        if (activePeriod === '7 Hari') {
            return trendData.slice(-2);
        }

        if (activePeriod === '30 Hari') {
            return trendData.slice(-4);
        }

        if (!appliedCustomRange) {
            return trendData;
        }

        const fromIdx = trendData.findIndex((item) => item.bulan === appliedCustomRange.from);
        const toIdx = trendData.findIndex((item) => item.bulan === appliedCustomRange.to);

        if (fromIdx < 0 || toIdx < 0) {
            return trendData;
        }

        const start = Math.min(fromIdx, toIdx);
        const end = Math.max(fromIdx, toIdx);

        return trendData.slice(start, end + 1);
    }, [activePeriod, appliedCustomRange]);

    const latestSnapshot = scopedTrendData[scopedTrendData.length - 1] ?? trendData[trendData.length - 1];
    const totalPasien = latestSnapshot.normal + latestSnapshot.risiko + latestSnapshot.stunting;

    const scopedDistribusiData = React.useMemo(
        () => [
            { status: 'Normal', value: latestSnapshot.normal, fill: '#10B981' },
            { status: 'Stunting Ringan', value: latestSnapshot.risiko, fill: '#F59E0B' },
            { status: 'Stunting Berat', value: latestSnapshot.stunting, fill: '#BA1A1A' },
        ],
        [latestSnapshot],
    );

    const handlePeriodChange = (opt: PeriodOption) => {
        setActivePeriod(opt);
        if (opt !== 'Kustom') {
            setAppliedCustomRange(null);
        }
    };

    const applyCustomRange = () => {
        setAppliedCustomRange({ from: customFrom, to: customTo });
    };

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Ringkasan Dashboard</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Pantau indikator klinis utama dan tren risiko pasien.
                    </p>
                </div>
                <PeriodSelector
                    activePeriod={activePeriod}
                    onPeriodChange={handlePeriodChange}
                />
            </div>

            {activePeriod === 'Kustom' ? (
                <CustomRangePanel
                    months={months}
                    customFrom={customFrom}
                    customTo={customTo}
                    onCustomFromChange={setCustomFrom}
                    onCustomToChange={setCustomTo}
                    onResetCustom={() => setAppliedCustomRange(null)}
                    onApplyCustom={applyCustomRange}
                />
            ) : null}

            {/* KPI Cards */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card className={card3dClassName}>
                    <CardContent className="py-5">
                        <div className="flex items-start justify-between">
                            <span className="text-sm text-muted-foreground">Total Pasien Aktif</span>
                            <div className="rounded-lg bg-emerald-100 p-2 text-emerald-700">
                                <Users className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-4xl font-bold">{totalPasien}</p>
                            <div className="mt-1 flex items-center gap-1 text-emerald-700">
                                <TrendingUp className="h-4 w-4" />
                                <span className="text-xs font-medium">
                                    {activePeriod === 'Kustom' && appliedCustomRange
                                        ? `Periode ${appliedCustomRange.from} - ${appliedCustomRange.to}`
                                        : 'Periode aktif'}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className={cn(card3dClassName, 'border-l-4 border-l-destructive')}>
                    <CardContent className="py-5">
                        <div className="flex items-start justify-between">
                            <span className="text-sm text-muted-foreground">Stunting Berat</span>
                            <div className="rounded-lg bg-destructive/10 p-2 text-destructive">
                                <AlertTriangle className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-4xl font-bold text-destructive">{latestSnapshot.stunting}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                {Math.round((latestSnapshot.stunting / Math.max(1, totalPasien)) * 100)}% dari total pasien
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className={cn(card3dClassName, 'border-l-4 border-l-amber-500')}>
                    <CardContent className="py-5">
                        <div className="flex items-start justify-between">
                            <span className="text-sm text-muted-foreground">Stunting Ringan</span>
                            <div className="rounded-lg bg-amber-100 p-2 text-amber-700">
                                <Info className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-4xl font-bold text-amber-600">{latestSnapshot.risiko}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                {Math.round((latestSnapshot.risiko / Math.max(1, totalPasien)) * 100)}% dari total pasien
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className={cn(card3dClassName, 'border-l-4 border-l-emerald-500')}>
                    <CardContent className="py-5">
                        <div className="flex items-start justify-between">
                            <span className="text-sm text-muted-foreground">Normal</span>
                            <div className="rounded-lg bg-emerald-100 p-2 text-emerald-700">
                                <Users className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-4xl font-bold text-emerald-600">{latestSnapshot.normal}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                {Math.round((latestSnapshot.normal / Math.max(1, totalPasien)) * 100)}% dari total pasien
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Charts */}
            <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {/* Area Chart */}
                <Card className={cn(card3dClassName, 'lg:col-span-2')}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle>Tren Status Bulanan</CardTitle>
                        <button
                            type="button"
                            className="rounded-md p-1 text-muted-foreground hover:bg-muted"
                        >
                            <MoreVertical className="h-4 w-4" />
                        </button>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={trendConfig} className="h-[260px] w-full">
                            <AreaChart data={scopedTrendData} margin={{ left: 12, right: 12 }}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="bulan"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                <defs>
                                    <linearGradient id="fillNormal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                                    </linearGradient>
                                    <linearGradient id="fillRisiko" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1} />
                                    </linearGradient>
                                    <linearGradient id="fillStunting" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#BA1A1A" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#BA1A1A" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <Area
                                    dataKey="normal"
                                    type="natural"
                                    fill="url(#fillNormal)"
                                    fillOpacity={0.4}
                                    stroke="#10B981"
                                    strokeWidth={2}
                                />
                                <Area
                                    dataKey="risiko"
                                    type="natural"
                                    fill="url(#fillRisiko)"
                                    fillOpacity={0.4}
                                    stroke="#F59E0B"
                                    strokeWidth={2}
                                />
                                <Area
                                    dataKey="stunting"
                                    type="natural"
                                    fill="url(#fillStunting)"
                                    fillOpacity={0.4}
                                    stroke="#BA1A1A"
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Donut Chart */}
                <Card className={card3dClassName}>
                    <CardHeader>
                        <CardTitle>Distribusi Status</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <ChartContainer
                            config={distribusiConfig}
                            className="mx-auto h-[200px] w-full max-w-[200px]"
                        >
                            <PieChart>
                                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                <Pie
                                    data={scopedDistribusiData}
                                    dataKey="value"
                                    nameKey="status"
                                    innerRadius={58}
                                    outerRadius={82}
                                    strokeWidth={2}
                                >
                                    <Label
                                        content={({ viewBox }) => {
                                            if (
                                                viewBox &&
                                                'cx' in viewBox &&
                                                'cy' in viewBox
                                            ) {
                                                return (
                                                    <text
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        textAnchor="middle"
                                                        dominantBaseline="middle"
                                                    >
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            fontSize="22"
                                                            fontWeight="bold"
                                                            fill="currentColor"
                                                        >
                                                            {totalPasien}
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={(viewBox.cy ?? 0) + 20}
                                                            fontSize="11"
                                                            fill="#888"
                                                        >
                                                            Total
                                                        </tspan>
                                                    </text>
                                                );
                                            }
                                        }}
                                    />
                                    {scopedDistribusiData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ChartContainer>

                        <div className="mt-4 w-full space-y-2.5">
                            {scopedDistribusiData.map((item) => (
                                <div
                                    key={item.status}
                                    className="flex items-center justify-between text-sm"
                                >
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="h-3 w-3 rounded-full"
                                            style={{ backgroundColor: item.fill }}
                                        />
                                        <span>{item.status}</span>
                                    </div>
                                    <span className="font-medium">
                                        {Math.round((item.value / Math.max(1, totalPasien)) * 100)}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Bottom Row */}
            <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {/* Activity Table */}
                <Card className={cn(card3dClassName, 'gap-0 py-0 lg:col-span-2')}>
                    <div className="flex items-center justify-between border-b px-6 py-4">
                        <h2 className="text-base font-semibold">Aktivitas Terbaru</h2>
                        <button
                            type="button"
                            className="text-sm font-medium text-emerald-700 hover:underline"
                        >
                            Lihat Semua
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/30">
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                        Nama Pasien
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                        Usia
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                        Tanggal Periksa
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {activities.map((p) => (
                                    <tr
                                        key={p.name}
                                        className="transition-colors hover:bg-muted/20"
                                    >
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                                                    {p.initials}
                                                </div>
                                                <span className="font-medium">{p.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {p.age}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {p.date}
                                        </td>
                                        <td className="px-4 py-3">
                                            <StatusBadge status={p.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Schedule */}
                <Card className={card3dClassName}>
                    <CardHeader>
                        <CardTitle>Riwayat Kontrol Kesehatan</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                        {schedules.map((s, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-3"
                            >
                                <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg border bg-card shadow-xs">
                                    <span className="text-[10px] font-bold uppercase text-destructive">
                                        {s.month}
                                    </span>
                                    <span className="text-sm font-bold leading-none">
                                        {s.day}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">{s.name}</p>
                                    <div className="mt-1 flex items-center gap-2">
                                        <StatusBadge status={s.risk} />
                                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Clock className="h-3 w-3" />
                                            {s.time}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="mt-2 w-full rounded-lg border border-emerald-300 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-50"
                        >
                            Lihat Semua Jadwal
                        </button>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
