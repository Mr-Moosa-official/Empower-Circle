import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle, MapPin, Users, BookOpen, ShieldCheck, Heart } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back!</h1>
        <p className="text-muted-foreground">Your safety and empowerment at your fingertips.</p>
      </section>

      <section>
        <Link href="/sos" passHref>
          <Button
            variant="destructive"
            className="w-full h-20 text-2xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-3"
          >
            <AlertTriangle className="h-8 w-8" />
            SOS EMERGENCY
          </Button>
        </Link>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">Live Location</CardTitle>
            <MapPin className="h-6 w-6 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-40 rounded-md overflow-hidden bg-muted">
              <Image
                src="https://picsum.photos/seed/minimap/600/400"
                alt="Mini map preview"
                layout="fill"
                objectFit="cover"
                data-ai-hint="map preview location"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <span className="text-white font-semibold p-2 bg-black/50 rounded">Tracking Active</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Share your live location with trusted contacts.</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-secondary/10 border-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">HelpNet</CardTitle>
            <Heart className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
             <div className="relative w-full h-24 rounded-md overflow-hidden mb-3">
               <Image
                src="https://picsum.photos/seed/communitysupport/600/200"
                alt="Community Support"
                layout="fill"
                objectFit="cover"
                data-ai-hint="community support"
              />
             </div>
            <CardDescription className="mb-4 text-foreground">
              Support women in need. Your contribution can make a difference.
            </CardDescription>
            <Link href="/helpnet" passHref>
              <Button className="w-full">Donate Now</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">SkillHub Empowerment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/skillhub?category=self-defense" passHref>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col">
              <CardHeader>
                 <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="h-6 w-6 text-secondary" />
                    <CardTitle className="text-xl">Learn Self-Defense</CardTitle>
                 </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <div className="relative w-full h-32 rounded-md overflow-hidden mb-3">
                    <Image src="https://picsum.photos/seed/selfdefense/400/250" alt="Self-defense class" layout="fill" objectFit="cover" data-ai-hint="self defense martial arts" />
                </div>
                <p className="text-sm text-muted-foreground mb-3">Equip yourself with essential self-defense techniques.</p>
                <Button variant="outline" className="mt-auto w-full">Explore Skills</Button>
              </CardContent>
            </Card>
          </Link>
          <Link href="/skillhub?category=rights" passHref>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col">
              <CardHeader>
                 <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-6 w-6 text-secondary" />
                    <CardTitle className="text-xl">Know Your Rights</CardTitle>
                 </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                 <div className="relative w-full h-32 rounded-md overflow-hidden mb-3">
                    <Image src="https://picsum.photos/seed/legalrights/400/250" alt="Legal book" layout="fill" objectFit="cover" data-ai-hint="legal book justice" />
                </div>
                <p className="text-sm text-muted-foreground mb-3">Understand your legal rights and protections.</p>
                <Button variant="outline" className="mt-auto w-full">Learn More</Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}
