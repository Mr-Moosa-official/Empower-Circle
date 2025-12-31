
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserCircle2, Edit3, Bell, Shield, LogOut } from 'lucide-react';

// Placeholder user data
const userData = {
  name: "Aisha Sharma",
  email: "aisha.s@example.com",
  joinDate: "March 15, 2023",
  bio: "Passionate about women empowerment and community building. Believer in strength through unity.",
  avatarUrl: "https://picsum.photos/seed/empoweravatar/200/200",
  aiHint: "woman avatar confident"
};

export default function ProfilePage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <section className="text-center">
         <UserCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </section>

      <Card className="shadow-xl">
        <CardHeader className="items-center text-center">
          <Avatar className="h-32 w-32 mb-4 border-4 border-primary shadow-lg">
            <AvatarImage src={userData.avatarUrl} alt={userData.name} data-ai-hint={userData.aiHint} />
            <AvatarFallback className="text-4xl">{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">{userData.name}</CardTitle>
          <CardDescription>{userData.email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Bio</h3>
            <p className="text-foreground mt-1">{userData.bio || "No bio provided."}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Joined Empower Circle</h3>
            <p className="text-foreground mt-1">{userData.joinDate}</p>
          </div>

          <div className="border-t pt-6 space-y-3">
             <Button variant="outline" className="w-full justify-start gap-2">
              <Edit3 className="h-5 w-5 text-muted-foreground" /> Edit Profile
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Bell className="h-5 w-5 text-muted-foreground" /> Notification Settings
            </Button>
             <Button variant="outline" className="w-full justify-start gap-2">
              <Shield className="h-5 w-5 text-muted-foreground" /> Privacy & Safety Settings
            </Button>
          </div>

          <div className="border-t pt-6">
            <Button variant="destructive" className="w-full justify-start gap-2">
              <LogOut className="h-5 w-5" /> Log Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


