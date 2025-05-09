"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShieldAlert, HandHeart, BookOpenText, UserCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/sos', icon: ShieldAlert, label: 'SOS' },
  { href: '/helpnet', icon: HandHeart, label: 'HelpNet' },
  { href: '/skillhub', icon: BookOpenText, label: 'SkillHub' },
  { href: '/report', icon: Info, label: 'Report' },
  // Profile is handled separately in AppHeader for avatar display
];

interface SidebarNavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  isMobile?: boolean;
}

function SidebarNavItem({ href, icon: Icon, label, isActive, isMobile }: SidebarNavItemProps) {
  return (
    <Link href={href} passHref className="block w-full">
       <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start gap-2 px-3 py-2 text-sm font-medium rounded-md",
          isMobile ? "text-base h-12" : "h-9",
          isActive ? "text-primary-foreground bg-primary hover:bg-primary/90" : "hover:bg-accent hover:text-accent-foreground"
        )}
        aria-current={isActive ? "page" : undefined}
      >
        <Icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-accent-foreground")} />
        <span>{label}</span>
      </Button>
    </Link>
  );
}


export function SidebarNav({ className, isMobile = false }: { className?: string; isMobile?: boolean }) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-col gap-2", className)}>
      {navItems.map((item) => (
        <SidebarNavItem
          key={item.href}
          href={item.href}
          icon={item.icon}
          label={item.label}
          isActive={pathname === item.href || (item.href === "/dashboard" && pathname.startsWith("/dashboard"))}
          isMobile={isMobile}
        />
      ))}
    </nav>
  );
}
