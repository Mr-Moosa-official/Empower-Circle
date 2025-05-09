"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, Mic, FileAudio, Send } from "lucide-react";
import { useState } from "react";

const reportFormSchema = z.object({
  incidentDetails: z.string().min(50, {
    message: "Please provide detailed information (at least 50 characters).",
  }).max(5000, { message: "Details cannot exceed 5000 characters."}),
  location: z.string().optional(),
  dateTime: z.string().optional(), // Consider using a date picker component for better UX
  voiceNote: z.any().optional(), // For file upload
});

type ReportFormValues = z.infer<typeof reportFormSchema>;

export default function AnonymousReportingPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      incidentDetails: "",
      location: "",
      dateTime: "",
    },
  });

  async function onSubmit(data: ReportFormValues) {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Report submitted:", data); // In a real app, send this to a secure backend
    
    toast({
      title: "Report Submitted Anonymously",
      description: "Thank you for your courage. Your report has been received.",
      action: <ShieldCheck className="h-5 w-5 text-green-500" />,
    });
    form.reset();
    setFileName(null);
    setIsSubmitting(false);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // You might want to validate file type/size here
      form.setValue("voiceNote", file);
    } else {
      setFileName(null);
      form.setValue("voiceNote", undefined);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <section className="text-center">
        <ShieldCheck className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-foreground mb-2">Anonymous Reporting</h1>
        <p className="text-muted-foreground">
          Your safety and privacy are paramount. Report incidents securely and anonymously.
          Your voice matters.
        </p>
      </section>

      <Card className="shadow-xl border-primary/50">
        <CardHeader>
          <CardTitle>Submit a Confidential Report</CardTitle>
          <CardDescription>
            Please provide as much detail as possible. This information will be handled with utmost confidentiality.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="incidentDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Incident Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the incident in detail. What happened, when, and where?"
                        rows={6}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Please be specific but avoid sharing personally identifiable information if you wish to remain fully anonymous.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., Near City Park, Bus Route 5B" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date & Time (Optional)</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="voiceNote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mic className="h-5 w-5"/> Voice Note (Optional)
                    </FormLabel>
                    <FormControl>
                      <>
                        <Input 
                          type="file" 
                          accept="audio/*" 
                          onChange={handleFileChange}
                          className="hidden" 
                          id="voice-note-upload"
                        />
                        <label 
                          htmlFor="voice-note-upload" 
                          className="w-full flex items-center justify-center px-4 py-2 border-2 border-dashed border-border rounded-md cursor-pointer hover:border-primary transition-colors"
                        >
                          {fileName ? (
                            <>
                              <FileAudio className="h-5 w-5 mr-2 text-primary"/>
                              <span className="text-sm text-primary truncate max-w-[200px]">{fileName}</span>
                            </>
                          ) : (
                            <>
                              <Mic className="h-5 w-5 mr-2 text-muted-foreground"/>
                              <span className="text-sm text-muted-foreground">Upload voice recording (MP3, WAV)</span>
                            </>
                          )}
                        </label>
                      </>
                    </FormControl>
                    <FormDescription>
                      If you prefer, you can upload an audio recording of your report.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full text-lg py-3" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" /> Submit Anonymously
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
