"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle, Share2, PhoneCall, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function SOSPage() {
  const { toast } = useToast();
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [fakeCallTime, setFakeCallTime] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setIsSOSActive(true);
      // Here you would typically trigger actual SOS actions (e.g., API calls)
      toast({
        title: "SOS Activated!",
        description: "Emergency contacts notified and location shared.",
        variant: "destructive",
      });
      setCountdown(null); // Reset countdown
      // Play a sound
      try {
        const audio = new Audio('/sounds/sos-alert.mp3'); // Ensure you have this sound file
        audio.play();
      } catch (error) {
        console.warn("Could not play SOS sound:", error)
      }
    }
    return () => clearTimeout(timer);
  }, [countdown, toast]);

  const handleSOSPress = () => {
    if (isSOSActive) {
      setIsSOSActive(false);
      setCountdown(null);
      toast({
        title: "SOS Deactivated",
        description: "Emergency alert has been cancelled.",
      });
    } else if (countdown === null) {
      setCountdown(5); // Start 5-second countdown
    } else {
      // Cancel countdown
      setCountdown(null);
      toast({
        title: "SOS Cancelled",
        description: "Emergency alert countdown stopped.",
      });
    }
  };

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
          if (navigator.share) {
            navigator.share({
              title: 'My Current Location',
              text: `I need help! This is my current location: ${locationUrl}`,
              url: locationUrl,
            }).then(() => {
              toast({ title: "Location Shared", description: "Your location has been prepared for sharing." });
            }).catch(console.error);
          } else {
            // Fallback for browsers that don't support navigator.share
            navigator.clipboard.writeText(`I need help! This is my current location: ${locationUrl}`);
            toast({ title: "Location Copied", description: "Location URL copied to clipboard. Paste it to share." });
          }
        },
        (error) => {
          toast({ title: "Error getting location", description: error.message, variant: "destructive" });
        }
      );
    } else {
      toast({ title: "Geolocation not supported", description: "Your browser doesn't support geolocation.", variant: "destructive" });
    }
  };

  const handleFakeCall = () => {
    // Simulate a call screen appearing after a short delay
    toast({ title: "Initiating Fake Call...", description: "The fake call screen will appear shortly." });
    setTimeout(() => {
      const now = new Date();
      setFakeCallTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      // In a real app, you'd navigate to a fake call screen component or show a modal
    }, 2000);
  };
  
  if (fakeCallTime) {
    return (
      <div className="fixed inset-0 bg-black text-white z-[100] flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <p className="text-4xl font-bold">Incoming Call</p>
          <p className="text-2xl mt-2 text-gray-300">Unknown Number</p>
        </div>
        <div className="my-16">
          <PhoneCall className="h-24 w-24 text-green-500 animate-pulse" />
        </div>
        <div className="flex w-full justify-around">
            <Button variant="ghost" className="text-red-500 text-lg p-4 bg-red-500/20" onClick={() => setFakeCallTime(null)}>
                Decline
            </Button>
            <Button variant="ghost" className="text-green-500 text-lg p-4 bg-green-500/20" onClick={() => { /* Simulate accept */ setFakeCallTime(null); toast({title: "Fake call ended"}); }}>
                Accept
            </Button>
        </div>
        <p className="absolute top-4 right-4 text-sm">{fakeCallTime}</p>
      </div>
    );
  }


  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 py-8">
      <Card className={cn(
        "w-full max-w-md shadow-xl transition-all duration-500",
        isSOSActive ? "border-destructive bg-destructive/10" : "border-primary",
        countdown !== null ? "border-yellow-500 bg-yellow-500/10" : ""
      )}>
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
            <AlertTriangle className={cn("h-8 w-8", isSOSActive ? "text-destructive" : "text-primary", countdown !== null ? "text-yellow-500" : "")} />
            SOS Emergency
          </CardTitle>
          <CardDescription>
            {isSOSActive
              ? "SOS IS ACTIVE. Help is on the way."
              : countdown !== null
              ? `SOS activating in ${countdown}s... Press again to cancel.`
              : "Press and hold the button in an emergency."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <button
            onClick={handleSOSPress}
            className={cn(
              "relative w-48 h-48 md:w-56 md:h-56 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-2xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-4",
              isSOSActive
                ? "bg-red-600 hover:bg-red-700 focus:ring-red-400 animate-pulse-intense"
                : countdown !== null
                ? "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300 animate-pulse"
                : "bg-destructive hover:bg-red-700 focus:ring-red-400",
              "transform active:scale-95"
            )}
            aria-live="assertive"
            aria-label={isSOSActive ? "SOS Active, press to deactivate" : countdown !== null ? `SOS activating in ${countdown} seconds, press to cancel` : "Activate SOS"}
          >
            {countdown !== null ? (
              <span className="text-5xl">{countdown}</span>
            ) : (
              "SOS"
            )}
            {isSOSActive && <Volume2 className="absolute top-4 right-4 h-6 w-6 animate-ping" />}
          </button>
          
          <div className="w-full space-y-3 pt-4">
            <Button
              variant="secondary"
              size="lg"
              className="w-full rounded-lg text-lg"
              onClick={handleShareLocation}
              disabled={isSOSActive || countdown !== null}
            >
              <Share2 className="mr-2 h-5 w-5" /> Share My Location
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full rounded-lg text-lg"
              onClick={handleFakeCall}
              disabled={isSOSActive || countdown !== null}
            >
              <PhoneCall className="mr-2 h-5 w-5" /> Fake Call
            </Button>
          </div>
          {isSOSActive && (
            <p className="text-sm text-muted-foreground mt-4">
              To deactivate, press the SOS button again.
            </p>
          )}
        </CardContent>
      </Card>
      <style jsx>{`
        .animate-pulse-intense {
          animation: pulse-intense 1s infinite;
        }
        @keyframes pulse-intense {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
