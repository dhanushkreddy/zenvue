'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarFooter,
  SidebarMenuBadge,
} from '@/components/ui/sidebar';
import {
  Home,
  History,
  Bookmark,
  User,
  Search,
} from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '../ui/button';
import { useAdStore } from '@/store/ad-store';
import { OnboardingModal } from '../OnboardingModal';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '../ui/input';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/ad-history', label: 'History', icon: History },
  { href: '/saved', label: 'Saved', icon: Bookmark },
];

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { saved, user } = useAdStore();

  const getBadgeCount = (href: string) => {
    if (href === '/saved') return saved.length;
    return 0;
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2.5">
            <Logo className="size-7" />
            <h2 className="text-xl font-semibold tracking-tight">AdGram</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} className="w-full" passHref>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.label}
                    size="lg"
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
                {getBadgeCount(item.href) > 0 && <SidebarMenuBadge>{getBadgeCount(item.href)}</SidebarMenuBadge>}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
             <SidebarMenuItem>
                <Link href="/profile" className="w-full" passHref>
                  <SidebarMenuButton
                    isActive={pathname === '/profile'}
                    tooltip="Profile"
                     size="lg"
                  >
                    <User />
                    <span>User Profile</span>
                  </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <div className="flex-1">
        <header className="flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 lg:h-[68px] lg:px-8 sticky top-0 z-30">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1 flex justify-center">
             <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-10 bg-muted border-none focus-visible:ring-primary focus-visible:ring-2" />
             </div>
          </div>
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/profile" passHref>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <DropdownMenuItem disabled>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
        <OnboardingModal />
      </div>
    </SidebarProvider>
  );
}
