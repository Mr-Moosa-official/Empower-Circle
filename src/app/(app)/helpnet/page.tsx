"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { HandHeart, Gift } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Profile {
  id: string;
  name: string;
  story: string;
  imageUrl: string;
  goal: number;
  raised: number;
  aiHint: string;
}

const profilesData: Profile[] = [
  { id: '1', name: 'Aisha K.', story: 'Aisha is a single mother striving to start her own tailoring business to support her two children. She needs funds for a sewing machine and initial materials.', imageUrl: 'https://picsum.photos/seed/womanprofile1/300/300', goal: 15000, raised: 7500, aiHint: "woman portrait hopeful" },
  { id: '2', name: 'Priya S.', story: 'Priya is a bright student who needs financial assistance to continue her college education after her family faced unexpected medical expenses.', imageUrl: 'https://picsum.photos/seed/womanprofile2/300/300', goal: 50000, raised: 12000, aiHint: "student thoughtful" },
  { id: '3', name: 'Fatima B.', story: 'Fatima wants to attend a vocational training program for digital literacy to improve her job prospects and become financially independent.', imageUrl: 'https://picsum.photos/seed/womanprofile3/300/300', goal: 25000, raised: 20000, aiHint: "woman learning computer" },
];

export default function HelpNetPage() {
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<Profile[]>(profilesData);
  const [customAmounts, setCustomAmounts] = useState<Record<string, string>>({});

  const handleDonate = (profileId: string, amount: number) => {
    // Simulate donation
    setProfiles(prevProfiles =>
      prevProfiles.map(p =>
        p.id === profileId ? { ...p, raised: Math.min(p.goal, p.raised + amount) } : p
      )
    );
    toast({
      title: "Donation Successful!",
      description: `Thank you for donating ₹${amount} to ${profiles.find(p => p.id === profileId)?.name}.`,
      action: <Gift className="h-5 w-5 text-primary" />,
    });
    setCustomAmounts(prev => ({ ...prev, [profileId]: ""})); // Clear custom amount input
  };

  const handleCustomAmountChange = (profileId: string, value: string) => {
    setCustomAmounts(prev => ({ ...prev, [profileId]: value }));
  };

  return (
    <div className="space-y-8">
      <section className="text-center">
        <HandHeart className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-foreground mb-2">HelpNet - Support Network</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Extend your support to resilient women overcoming challenges. Your contribution, big or small, empowers them to build a brighter future.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <Card key={profile.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <div className="relative w-full h-48 rounded-t-lg overflow-hidden mb-4">
                <Image
                  src={profile.imageUrl}
                  alt={profile.name}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={profile.aiHint}
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardTitle className="text-2xl">{profile.name}</CardTitle>
              <CardDescription className="h-20 overflow-y-auto text-sm">{profile.story}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-3">
                <div className="flex justify-between text-sm text-muted-foreground mb-1">
                  <span>Raised: ₹{profile.raised.toLocaleString()}</span>
                  <span>Goal: ₹{profile.goal.toLocaleString()}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${(profile.raised / profile.goal) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <p className="text-sm font-medium text-foreground">Choose an amount to donate:</p>
                <div className="flex gap-2 flex-wrap">
                  {[50, 100, 250].map((amount) => (
                    <Button key={amount} variant="outline" onClick={() => handleDonate(profile.id, amount)} className="flex-1">
                      ₹{amount}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <Input
                    type="number"
                    id={`custom-amount-${profile.id}`}
                    placeholder="Custom amount"
                    value={customAmounts[profile.id] || ""}
                    onChange={(e) => handleCustomAmountChange(profile.id, e.target.value)}
                    className="flex-grow"
                  />
                   <AlertDialog>
                    <AlertDialogTrigger asChild>
                       <Button 
                        disabled={!customAmounts[profile.id] || parseInt(customAmounts[profile.id] || "0") <= 0}
                        className="whitespace-nowrap"
                       >
                         Donate Custom
                       </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Donation</AlertDialogTitle>
                        <AlertDialogDescription>
                          You are about to donate ₹{customAmounts[profile.id] || "0"} to {profile.name}. Are you sure?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDonate(profile.id, parseInt(customAmounts[profile.id] || "0"))}>
                          Confirm Donation
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
            <CardFooter>
                <p className="text-xs text-muted-foreground w-full text-center">
                    Every contribution helps build a stronger community.
                </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
