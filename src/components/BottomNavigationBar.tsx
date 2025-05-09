"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShieldAlert, HandHeart, BookOpenText, UserCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/sos', icon: ShieldAlert, label: 'Safety' },
  { href: '/helpnet', icon: HandHeart, label: 'Donate' },
  { href: '/skillhub', icon: BookOpenText, label: 'Learn' },
  { href: '/profile', icon: UserCircle2, label: 'Profile' },
];

interface BottomNavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}

function BottomNavItem({ href, icon: Icon, label, isActive }: BottomNavItemProps) {
  return (
    <Link href={href} passHref>
      <div
        className={cn(
          "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 w-1/5",
          isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
        )}
        aria-current={isActive ? "page" : undefined}
      >
        <Icon className="h-6 w-6 mb-0.5" strokeWidth={isActive ? 2.5 : 2} />
        <span className={cn("text-xs font-medium", isActive && "font-bold")}>{label}</span>
      </div>
    </Link>
  );
}

export function BottomNavigationBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-t-lg z-50 h-16 md:hidden">
      <div className="flex justify-around items-center h-full max-w-md mx-auto px-2">
        {navItems.map((item) => (
          <BottomNavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={pathname === item.href || (item.href === "/dashboard" && pathname.startsWith("/dashboard"))}
          />
        ))}
      </div>
    </nav>
  );
}
