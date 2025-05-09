import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EmpowerCircleLogo } from '@/components/icons/EmpowerCircleLogo';

export default function OnboardingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted p-6 text-center">
      <header className="mb-8">
        <EmpowerCircleLogo className="h-12 w-auto" />
      </header>

      <main className="flex flex-col items-center">
        <div className="mb-8 relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-lg border-4 border-primary">
          <Image
            src="https://picsum.photos/seed/empowerwoman/400/400"
            alt="Empowered Woman Illustration"
            layout="fill"
            objectFit="cover"
            data-ai-hint="woman shield illustration"
            className="transform transition-transform duration-500 hover:scale-105"
          />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Welcome to EmpowerCircle!
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-md">
          Your safe space for support, strength, and growth. Step into a community that uplifts and protects.
        </p>

        <Link href="/dashboard" passHref>
          <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
            Get Started
          </Button>
        </Link>
      </main>

      <footer className="mt-12 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} EmpowerCircle. All rights reserved.</p>
      </footer>
    </div>
  );
}
