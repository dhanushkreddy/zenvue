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
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
  SidebarMenuBadge,
} from '@/components/ui/sidebar';
import {
  Home,
  History,
  Handshake,
  ShoppingCart,
  UserCircle,
} from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useAdStore } from '@/store/ad-store';
import { OnboardingModal } from '../OnboardingModal';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/ad-history', label: 'Ad History', icon: History },
  { href: '/affiliate-products', label: 'Affiliate Products', icon: Handshake },
  { href: '/cart', label: 'Personal Cart', icon: ShoppingCart },
];

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { cart, affiliateProducts } = useAdStore();

  const getBadgeCount = (href: string) => {
    if (href === '/cart') return cart.length;
    if (href === '/affiliate-products') return affiliateProducts.length;
    return 0;
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="size-8" />
            <h2 className="text-lg font-semibold tracking-tight">AdControl Hub</h2>
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
                <SidebarMenuButton tooltip="Profile">
                    <UserCircle />
                    <span>User Profile</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            {/* Can add breadcrumbs or page title here */}
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <UserCircle className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
        <OnboardingModal />
      </SidebarInset>
    </SidebarProvider>
  );
}
