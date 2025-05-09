import { AppHeader } from '@/components/AppHeader';
import { BottomNavigationBar } from '@/components/BottomNavigationBar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-1 container mx-auto px-4 py-8 pb-20 md:pb-8"> {/* Added padding bottom for mobile nav */}
        {children}
      </main>
      <BottomNavigationBar /> {/* Only shown on mobile */}
    </div>
  );
}
