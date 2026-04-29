import * as React from 'react';
import { Head } from '@inertiajs/react';

import { AppSidebar, type AdminSection } from '@/components/app-sidebar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbLink,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';

import DashboardPage from '@/pages/admin/dashboard/page';
import ManajemenPasienPage from '@/pages/admin/manajemen-pasien/page';
import ManajemenPengurusPage from '@/pages/admin/manajemen-pengurus/page';
import KonfigurasiPosyankesPage from '@/pages/admin/konfigurasi-posyankes/page';
import MpasiPage from '@/pages/admin/mpasi/page';
import EksporPage from '@/pages/admin/ekspor/page';
import JadwalKesehatanPage from './jadwal-kesehatan/page';

const sectionLabels: Record<AdminSection, string> = {
    dashboard: 'Dashboard',
    'manajemen-pasien': 'Manajemen Pasien',
    'manajemen-pengurus': 'Manajemen Pengurus',
    'konfigurasi-posyandu': 'Konfigurasi Posyandu',
    'jadwal-kesehatan': 'Jadwal Kesehatan',
    mpasi: 'Mpasi',
    ekspor: 'Ekspor',
};

function PlaceholderContent({ title }: { title: string }) {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="flex min-h-[40vh] flex-1 items-center justify-center rounded-xl bg-muted/50 text-sm text-muted-foreground">
                {title} — konten menyusul
            </div>
        </div>
    );
}

export default function AdminPage() {
    const [active, setActive] = React.useState<AdminSection>('dashboard');

    const content = React.useMemo(() => {
        switch (active) {
            case 'dashboard':
                return <DashboardPage />;
            case 'manajemen-pasien':
                return <ManajemenPasienPage />;
            case 'manajemen-pengurus':
                return <ManajemenPengurusPage />;
            case 'konfigurasi-posyandu':
                return <KonfigurasiPosyankesPage />;
            case 'mpasi':
                return <MpasiPage />;
            case 'ekspor':
                return <EksporPage />;
            case 'jadwal-kesehatan':
                return <JadwalKesehatanPage />;
            default:
                return <DashboardPage />;
        }
    }, [active]);

    return (
        <>
            <Head title="Admin Dashboard" />
            <SidebarProvider>
                <AppSidebar active={active} onNavigate={setActive} />
                <SidebarInset className="bg-[#f7faf6]">
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="#">Admin</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>
                                            {sectionLabels[active]}
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>
                    <main className="flex flex-1 flex-col">{content}</main>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
