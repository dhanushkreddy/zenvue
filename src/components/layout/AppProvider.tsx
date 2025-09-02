import { AdStoreProvider } from '@/store/ad-store';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from 'next-themes';

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
    >
        <AdStoreProvider>
        {children}
        <Toaster />
        </AdStoreProvider>
    </ThemeProvider>
  );
}
