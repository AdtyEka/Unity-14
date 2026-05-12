import * as React from 'react';
import { router, usePage } from '@inertiajs/react';
import {
    ClipboardList,
    ChevronsUpDown,
    Download,
    LayoutDashboard,
    LogOut,
    Settings2,
    Users,
    UsersRound,
    Calendar,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarGroup,
    SidebarGroupLabel,
    useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

type AdminSection =
    | 'dashboard'
    | 'manajemen-pasien'
    | 'manajemen-pengurus'
    | 'konfigurasi-posyandu'
    | 'jadwal-kesehatan'
    | 'mpasi'
    | 'ekspor';

export type { AdminSection };

const navItems: {
    key: AdminSection;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}[] = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'manajemen-pasien', label: 'Manajemen Pasien', icon: Users },
    { key: 'manajemen-pengurus', label: 'Manajemen Pengurus', icon: UsersRound },
    { key: 'konfigurasi-posyandu', label: 'Konfigurasi Posyandu', icon: Settings2 },
    { key: 'jadwal-kesehatan', label: 'Jadwal Kesehatan', icon: Calendar },
    { key: 'mpasi', label: 'MPASI', icon: ClipboardList },
    { key: 'ekspor', label: 'Ekspor', icon: Download },
];
    
function NavUser() {
    const { isMobile } = useSidebar();
    const { auth } = usePage<any>().props;
    const user = auth.user;

    const logout = () => {
        router.post('/logout');
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src="" alt={user.name} />
                                <AvatarFallback className="rounded-lg">
                                    {user.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                <span className="truncate font-semibold">{user.name}</span>
                                <span className="truncate text-xs">{user.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? 'bottom' : 'right'}
                        align={isMobile ? 'end' : 'start'}
                        sideOffset={12}
                        collisionPadding={14}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src="" alt={user.name} />
                                    <AvatarFallback className="rounded-lg">
                                        {user.name.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user.name}</span>
                                    <span className="truncate text-xs">{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout} className="cursor-pointer">
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}

export function AppSidebar({
    active,
    onNavigate,
    className,
    ...props
}: React.ComponentProps<typeof Sidebar> & {
    active: AdminSection;
    onNavigate: (key: AdminSection) => void;
}) {
    return (
        <Sidebar collapsible="icon" className={cn('bg-white', className)} {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <button
                                type="button"
                                className="cursor-default group-data-[collapsible=icon]:justify-center"
                            >
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-transparent group-data-[collapsible=icon]:size-7">
                                    <img
                                        src="/assets/images/dashboard/icon/Icon Dashboard.webp"
                                        alt="Icon Dashboard"
                                        className="size-8 object-contain group-data-[collapsible=icon]:size-6"
                                        draggable={false}
                                    />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                    <span className="truncate font-semibold">Admin</span>
                                    <span className="truncate text-xs">Panel kontrol</span>
                                </div>
                            </button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigasi</SidebarGroupLabel>
                    <SidebarMenu>
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <SidebarMenuItem key={item.key}>
                                    <SidebarMenuButton
                                        size="lg"
                                        tooltip={item.label}
                                        isActive={active === item.key}
                                        onClick={() => {
                                            if (item.key === 'manajemen-pengurus') {
                                                router.get('/admin/pengurus');
                                            } else if (item.key === 'manajemen-pasien') {
                                                router.get('/admin/pasien');
                                            } else if (item.key === 'konfigurasi-posyandu') {
                                                router.get('/admin/konfigurasi-posyankes');
                                            } else if (item.key === 'mpasi') {
                                                router.get('/admin/mpasi');
                                            } else {
                                                onNavigate(item.key);
                                            }
                                        }}
                                        className={cn(
                                            'h-12 rounded-lg px-3 text-base',
                                            'hover:bg-primary/5 hover:text-primary',
                                            'data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:font-semibold',
                                            'data-[active=true]:border-r-4 data-[active=true]:border-primary',
                                            // collapsed (icon-only) mode
                                            'group-data-[collapsible=icon]:size-12 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0',
                                            'group-data-[collapsible=icon]:border-r-0',
                                        )}
                                    >
                                        <Icon />
                                        <span className="truncate group-data-[collapsible=icon]:hidden">
                                            {item.label}
                                        </span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}
