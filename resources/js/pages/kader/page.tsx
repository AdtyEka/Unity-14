import * as React from 'react';
import { Head } from '@inertiajs/react';

import { KaderSidebar, type KaderSection } from '@/components/kader-sidebar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';

import DashboardPage from '@/pages/kader/dashboard/page';
import ManajemenPasienPage from '@/pages/kader/manajemen-pasien/page';

const sectionLabels: Record<KaderSection, string> = {
    dashboard: 'Dashboard',
    'manajemen-pasien': 'Manajemen Pasien',
};

export default function KaderPage(props: any) {
    const { activeSection } = props;
    const [active, setActive] = React.useState<KaderSection>(activeSection || 'dashboard');

    React.useEffect(() => {
        if (activeSection) {
            setActive(activeSection);
        }
    }, [activeSection]);

    const content = React.useMemo(() => {
        switch (active) {
            case 'dashboard':
                return <DashboardPage
                    stats={props.stats}
                    trendData={props.trendData}
                    activities={props.activities}
                    schedules={props.schedules}
                />;
            case 'manajemen-pasien':
                return <ManajemenPasienPage baseUrl="/kader/pasien" />;
            default:
                return <DashboardPage
                    stats={props.stats}
                    trendData={props.trendData}
                    activities={props.activities}
                    schedules={props.schedules}
                />;
        }
    }, [active, props.stats, props.trendData, props.activities, props.schedules]);

    return (
        <>
            <Head title="Kader Dashboard" />
            <SidebarProvider>
                <KaderSidebar active={active} onNavigate={setActive} />
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
                                        <BreadcrumbLink href="#">Kader</BreadcrumbLink>
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
