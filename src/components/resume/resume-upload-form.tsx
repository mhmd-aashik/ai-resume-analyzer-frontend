"use client";

import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UploadCloud, Loader2, FileText, BrainCircuit, Sparkles, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { analyzeResumeApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AnalyzingLoadingState } from "./analyzing-loading-state";

export default function ResumeUploadForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const canSubmit = useMemo(() => {
    return resume && jobDescription.trim().length >= 20;
  }, [resume, jobDescription]);

  const mutation = useMutation({
    mutationFn: analyzeResumeApi,
    onSuccess: async (response) => {
      setIsSuccess(true);
      toast.success("Resume analyzed successfully!");
      await queryClient.invalidateQueries({ queryKey: ["analyses"] });
      
      // Redirect after showing success state
      setTimeout(() => {
        router.push(`/analysis/${response.data.id}`);
      }, 2000);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to analyze resume");
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!resume || !canSubmit) return;
    mutation.mutate({ resume, jobDescription });
  }

  // State: Analyzing or Success
  if (mutation.isPending || isSuccess) {
    return (
      <div className="mx-auto max-w-2xl w-full py-10 animate-in fade-in zoom-in duration-500">
        {isSuccess ? (
          <Card className="flex min-h-[400px] flex-col items-center justify-center border-emerald-500/20 bg-emerald-500/5 text-center text-white p-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="h-10 w-10" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Analysis Complete!</h2>
            <p className="text-zinc-400">Redirecting you to your detailed report...</p>
            <div className="mt-8 flex gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.3s]" />
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.15s]" />
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce" />
            </div>
          </Card>
        ) : (
          <AnalyzingLoadingState />
        )}
      </div>
    );
  }

  // State: Default (Upload Form)
  return (
    <div className="animate-in fade-in duration-700">
      <div className="mb-8">
        <p className="text-sm font-medium text-indigo-300">AI Resume Analyzer</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Upload resume and analyze job fit
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Compare your resume against a job description and get AI-powered
          feedback in seconds.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <Card className="h-fit border-white/10 bg-white/[0.04] text-white">
        <CardHeader>
          <CardTitle>Analyze Resume</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/[0.03] p-8 text-center transition hover:bg-white/[0.06]">
              <UploadCloud className={`mb-3 h-10 w-10 ${resume ? "text-indigo-400" : "text-zinc-500"}`} />
              <p className="font-medium">{resume ? resume.name : "Upload resume PDF"}</p>
              <p className="mt-1 text-sm text-zinc-400">PDF only. Maximum 5MB.</p>
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file?.type === "application/pdf") setResume(file);
                  else if (file) toast.error("Only PDF files allowed");
                }}
              />
            </label>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Job Description</label>
              <Textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="h-64 resize-none border-white/10 bg-zinc-950 text-white placeholder:text-zinc-500 focus-visible:ring-indigo-500 overflow-y-auto"
              />
            </div>

            <Button type="submit" disabled={!canSubmit} className="w-full rounded-xl" size="lg">
              <FileText className="mr-2 h-4 w-4" />
              Analyze Resume
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="flex min-h-[500px] flex-col items-center justify-center border-white/10 bg-white/[0.03] text-center text-white overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />
        <CardContent className="relative z-10 flex flex-col items-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 animate-pulse rounded-full bg-indigo-500/10 blur-xl" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/5 bg-zinc-900/50 text-zinc-600 overflow-hidden">
              {/* Scanning Beam */}
              <div className="absolute inset-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-scan z-10" />
              <BrainCircuit className="h-12 w-12 animate-[pulse_4s_ease-in-out_infinite]" />
            </div>
            <div className="absolute -top-1 -right-1"><Sparkles className="h-6 w-6 text-indigo-400/30 animate-pulse" /></div>
          </div>
          <h2 className="text-xl font-semibold bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">Ready for Analysis</h2>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">Upload your resume and provide a job description to get AI-powered insights.</p>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
