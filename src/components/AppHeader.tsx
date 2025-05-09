import Link from 'next/link';
import Image from 'next/image';
import { EmpowerCircleLogo } from '@/components/icons/EmpowerCircleLogo';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { SidebarNav } from './SidebarNav'; // Will create this next

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/dashboard" className="flex items-center">
          <EmpowerCircleLogo className="h-8 w-auto" />
        </Link>
        
        {/* Desktop Navigation Placeholder */}
        <nav className="hidden md:flex gap-4 items-center">
           <SidebarNav className="flex-row gap-1" />
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/profile" className="hidden md:block">
            <Avatar className="h-9 w-9 border-2 border-primary hover:opacity-80 transition-opacity">
              <AvatarImage src="https://picsum.photos/seed/empoweravatar/100/100" alt="User Profile" data-ai-hint="woman avatar cartoon" />
              <AvatarFallback>EC</AvatarFallback>
            </Avatar>
          </Link>
          
          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-3/4 p-0">
                <div className="p-4">
                  <Link href="/dashboard" className="mb-4 block">
                     <EmpowerCircleLogo className="h-8 w-auto" />
                  </Link>
                </div>
                <SidebarNav className="flex-col gap-1 p-4" />
                <div className="p-4 border-t">
                  <Link href="/profile" className="flex items-center gap-2">
                    <Avatar className="h-9 w-9 border-2 border-primary">
                      <AvatarImage src="https://picsum.photos/seed/empoweravatar/100/100" alt="User Profile" data-ai-hint="woman avatar cartoon" />
                      <AvatarFallback>EC</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">Profile</span>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
