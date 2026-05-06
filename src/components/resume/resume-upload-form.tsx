"use client";

import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UploadCloud, Loader2, FileText, BrainCircuit, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { analyzeResumeApi } from "@/lib/api";
import type { ResumeAnalysis } from "@/types/analysis";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AnalyzingLoadingState } from "./analyzing-loading-state";

export default function ResumeUploadForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");

  const canSubmit = useMemo(() => {
    return resume && jobDescription.trim().length >= 20;
  }, [resume, jobDescription]);

  const mutation = useMutation({
    mutationFn: analyzeResumeApi,
    onSuccess: async (response) => {
      toast.success("Resume analyzed successfully!");
      await queryClient.invalidateQueries({ queryKey: ["analyses"] });
      
      // Redirect to the detail page after a short delay to let the user process the success
      setTimeout(() => {
        router.push(`/analysis/${response.data.id}`);
      }, 1500);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to analyze resume");
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!resume) {
      toast.error("Please upload a resume PDF");
      return;
    }

    if (jobDescription.trim().length < 20) {
      toast.error("Please enter a longer job description");
      return;
    }

    mutation.mutate({
      resume,
      jobDescription,
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <Card className="h-fit border-white/10 bg-white/[0.04] text-white transition-all duration-300">
        <CardHeader>
          <CardTitle>Analyze Resume</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* File Upload Area */}
            <label
              className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center transition-all duration-300 ${
                mutation.isPending
                  ? "pointer-events-none opacity-50"
                  : "border-white/20 bg-white/[0.03] hover:bg-white/[0.06]"
              }`}
            >
              <UploadCloud
                className={`mb-3 h-10 w-10 ${
                  resume ? "text-indigo-400" : "text-zinc-500"
                }`}
              />
              <p className="font-medium text-white">
                {resume ? resume.name : "Upload resume PDF"}
              </p>
              <p className="mt-1 text-sm text-zinc-400">
                PDF only. Maximum 5MB.
              </p>
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                disabled={mutation.isPending}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;

                  if (file.type !== "application/pdf") {
                    toast.error("Only PDF files are allowed");
                    return;
                  }

                  setResume(file);
                }}
              />
            </label>

            {/* Job Description Area */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                Job Description
              </label>
              <Textarea
                value={jobDescription}
                onChange={(event) => setJobDescription(event.target.value)}
                disabled={mutation.isPending}
                placeholder="Paste the job description here..."
                className="min-h-48 border-white/10 bg-zinc-950 text-white placeholder:text-zinc-500 focus-visible:ring-indigo-500 transition-all duration-300"
              />
            </div>

            <Button
              type="submit"
              disabled={!canSubmit || mutation.isPending}
              className="w-full rounded-xl transition-all duration-300"
              size="lg"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Analyze Resume
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Result / Idle Area */}
      <div className="transition-all duration-500">
        {mutation.isPending ? (
          <AnalyzingLoadingState />
        ) : (
          <Card className="flex min-h-[500px] flex-col items-center justify-center border-white/10 bg-white/[0.03] text-center text-white overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />
            
            <CardContent className="relative z-10 flex flex-col items-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 animate-pulse rounded-full bg-indigo-500/10 blur-xl" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/5 bg-zinc-900/50 text-zinc-600">
                  <BrainCircuit className="h-12 w-12 animate-[pulse_4s_ease-in-out_infinite]" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="h-6 w-6 text-indigo-400/30 animate-pulse" />
                </div>
              </div>
              
              <h2 className="text-xl font-semibold bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                Ready for Analysis
              </h2>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">
                Upload your resume and provide a job description to get AI-powered insights and match scores.
              </p>
              
              <div className="mt-8 flex gap-4">
                <div className="h-1 w-1 rounded-full bg-indigo-500/20" />
                <div className="h-1 w-1 rounded-full bg-indigo-500/40" />
                <div className="h-1 w-1 rounded-full bg-indigo-500/20" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
