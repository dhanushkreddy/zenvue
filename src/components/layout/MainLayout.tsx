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
  User,
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

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/ad-history', label: 'Ad History', icon: History },
  { href: '/affiliate-products', label: 'Affiliate Products', icon: Handshake },
];

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { cart, affiliateProducts, user } = useAdStore();

  const getBadgeCount = (href: string) => {
    if (href === '/cart') return cart.length;
    if (href === '/affiliate-products') return affiliateProducts.length;
    return 0;
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2.5">
            <Logo className="size-7" />
            <h2 className="text-xl font-semibold tracking-tight">AdControl</h2>
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
             <SidebarMenuItem>
                <Link href="/cart" className="w-full" passHref>
                  <SidebarMenuButton
                    isActive={pathname === '/cart'}
                    tooltip="Personal Cart"
                    size="lg"
                    className="mt-4 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                  >
                    <ShoppingCart />
                    <span>Personal Cart</span>
                  </SidebarMenuButton>
                </Link>
                {getBadgeCount('/cart') > 0 && <SidebarMenuBadge>{getBadgeCount('/cart')}</SidebarMenuBadge>}
              </SidebarMenuItem>
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
      <SidebarInset>
        <header className="flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 lg:h-[68px] lg:px-8 sticky top-0 z-30">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            {/* Can add breadcrumbs or page title here */}
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
      </SidebarInset>
    </SidebarProvider>
  );
}
