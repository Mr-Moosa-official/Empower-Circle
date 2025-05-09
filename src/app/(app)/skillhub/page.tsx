"use client";

import Image from 'next/image';
import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { BookOpenText, Search, Filter, PlayCircle, WifiOff } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface SkillResource {
  id: string;
  title: string;
  category: 'self-defense' | 'rights' | 'money-skills';
  language: 'english' | 'hindi' | 'bengali';
  duration: string;
  imageUrl: string;
  videoUrl?: string; // Placeholder for actual video link
  isOfflineAvailable: boolean;
  aiHint: string;
}

const resourcesData: SkillResource[] = [
  { id: '1', title: 'Basic Self-Defense Moves', category: 'self-defense', language: 'english', duration: '15 min', imageUrl: 'https://picsum.photos/seed/skillvideo1/400/225', isOfflineAvailable: true, aiHint: "self defense class" },
  { id: '2', title: 'Understanding Your Legal Rights', category: 'rights', language: 'hindi', duration: '22 min', imageUrl: 'https://picsum.photos/seed/skillvideo2/400/225', isOfflineAvailable: true, aiHint: "law book justice" },
  { id: '3', title: 'Introduction to Budgeting', category: 'money-skills', language: 'english', duration: '18 min', imageUrl: 'https://picsum.photos/seed/skillvideo3/400/225', isOfflineAvailable: false, aiHint: "financial planning chart" },
  { id: '4', title: 'Advanced Financial Planning', category: 'money-skills', language: 'bengali', duration: '30 min', imageUrl: 'https://picsum.photos/seed/skillvideo4/400/225', isOfflineAvailable: true, aiHint: "investment graph money" },
  { id: '5', title: 'Cyber Safety for Women', category: 'rights', language: 'english', duration: '25 min', imageUrl: 'https://picsum.photos/seed/skillvideo5/400/225', isOfflineAvailable: true, aiHint: "cyber security lock" },
  { id: '6', title: 'Escaping Common Grabs', category: 'self-defense', language: 'hindi', duration: '20 min', imageUrl: 'https://picsum.photos/seed/skillvideo6/400/225', isOfflineAvailable: false, aiHint: "martial arts action" },
];

export default function SkillHubPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') as SkillResource['category'] | 'all' || 'all';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SkillResource['category'] | 'all'>(initialCategory);
  const [selectedLanguage, setSelectedLanguage] = useState<'all' | SkillResource['language']>('all');
  const [showOfflineOnly, setShowOfflineOnly] = useState(false);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const filteredResources = useMemo(() => {
    return resourcesData.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
      const matchesLanguage = selectedLanguage === 'all' || resource.language === selectedLanguage;
      const matchesOffline = !showOfflineOnly || resource.isOfflineAvailable;
      return matchesSearch && matchesCategory && matchesLanguage && matchesOffline;
    });
  }, [searchTerm, selectedCategory, selectedLanguage, showOfflineOnly]);

  return (
    <div className="space-y-8">
      <section className="text-center">
        <BookOpenText className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-foreground mb-2">SkillHub - Empower Yourself</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Acquire new skills, understand your rights, and build financial independence. Knowledge is power.
        </p>
      </section>

      <Card className="p-4 md:p-6 shadow-lg sticky top-16 md:top-20 z-30 bg-card/95 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="space-y-1">
            <Label htmlFor="search-skills" className="flex items-center"><Search className="h-4 w-4 mr-1 text-muted-foreground"/>Search Skills</Label>
            <Input
              id="search-skills"
              type="text"
              placeholder="E.g., 'Budgeting', 'Self-defense'"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="category-filter" className="flex items-center"><Filter className="h-4 w-4 mr-1 text-muted-foreground"/>Category</Label>
            <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)}>
              <SelectTrigger id="category-filter">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="self-defense">Self-Defense</SelectItem>
                <SelectItem value="rights">Your Rights</SelectItem>
                <SelectItem value="money-skills">Money Skills</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="language-filter" className="flex items-center"><Filter className="h-4 w-4 mr-1 text-muted-foreground"/>Language</Label>
            <Select value={selectedLanguage} onValueChange={(value) => setSelectedLanguage(value as any)}>
              <SelectTrigger id="language-filter">
                <SelectValue placeholder="All Languages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
                <SelectItem value="bengali">Bengali</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2 justify-self-start md:justify-self-auto pb-1.5">
            <Switch
              id="offline-toggle"
              checked={showOfflineOnly}
              onCheckedChange={setShowOfflineOnly}
            />
            <Label htmlFor="offline-toggle" className="flex items-center whitespace-nowrap"><WifiOff className="h-4 w-4 mr-1 text-muted-foreground"/>Offline Only</Label>
          </div>
        </div>
      </Card>

      {filteredResources.length === 0 ? (
         <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl text-muted-foreground">No skills found matching your criteria.</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative w-full h-40 group">
                  <Image
                    src={resource.imageUrl}
                    alt={resource.title}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={resource.aiHint}
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <PlayCircle className="h-16 w-16 text-white/80" />
                  </div>
                   {resource.isOfflineAvailable && (
                      <div className="absolute top-2 right-2 bg-secondary text-secondary-foreground px-2 py-1 text-xs rounded-md font-medium flex items-center gap-1">
                        <WifiOff className="h-3 w-3" /> Offline
                      </div>
                    )}
                </div>
              </CardHeader>
              <CardContent className="flex-grow pt-4">
                <CardTitle className="text-lg mb-1 line-clamp-2">{resource.title}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground capitalize">
                  {resource.category.replace('-', ' ')} &bull; {resource.language} &bull; {resource.duration}
                </CardDescription>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="outline" className="w-full group">
                  Watch Now <PlayCircle className="ml-2 h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
