
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SurakshaPlusLogo } from '@/components/icons/SurakshaPlusLogo';
import { cn } from '@/lib/utils';

export default function OnboardingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted p-6 text-center">
      <header className="mb-8">
        <SurakshaPlusLogo className="h-12 w-auto text-primary" />
      </header>

      <main className="flex flex-col items-center">
        <div className={cn(
          "mb-8 relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-primary",
          "animate-pulse-circle flex items-center justify-center" 
        )}>
          <Image
            src="https://picsum.photos/seed/empowerhands/400/400"
            alt="Community holding hands in unity"
            layout="fill"
            objectFit="cover"
            data-ai-hint="people hands" 
            className="transform transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-4">
            <p className="text-lg md:text-xl font-semibold text-white text-center leading-tight">
              Uplift your safety, career, and community
            </p>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Welcome to Suraksha+!
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-md">
          Your safe space for support, strength, and growth. Step into a community that uplifts and protects.
        </p>

        <Link href="/dashboard" passHref>
          <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 text-lg px-8 py-6">
            Get Started
          </Button>
        </Link>
      </main>

      <footer className="mt-12 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Suraksha+. All rights reserved.</p>
      </footer>
    </div>
  );
}

