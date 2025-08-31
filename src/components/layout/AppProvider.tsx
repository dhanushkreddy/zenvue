import { AdStoreProvider } from '@/store/ad-store';
import { Toaster } from "@/components/ui/toaster"

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <AdStoreProvider>
      {children}
      <Toaster />
    </AdStoreProvider>
  );
}
