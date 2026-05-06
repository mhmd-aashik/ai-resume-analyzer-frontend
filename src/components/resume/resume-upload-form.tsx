"use client";

import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UploadCloud, Loader2, FileText } from "lucide-react";
import { toast } from "sonner";
import { analyzeResumeApi } from "@/lib/api";
import type { ResumeAnalysis } from "@/types/analysis";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AnalysisResultCard } from "./analysis-result-card";
import { AnalyzingLoadingState } from "./analyzing-loading-state";

export function ResumeUploadForm() {
  const queryClient = useQueryClient();
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<ResumeAnalysis | null>(null);

  const canSubmit = useMemo(() => {
    return resume && jobDescription.trim().length >= 20;
  }, [resume, jobDescription]);

  const mutation = useMutation({
    mutationFn: analyzeResumeApi,
    onSuccess: async (response) => {
      setResult(response.data);
      toast.success("Resume analyzed successfully");
      await queryClient.invalidateQueries({ queryKey: ["analyses"] });
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

  function handleReset() {
    setResult(null);
    setResume(null);
    setJobDescription("");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <Card className="h-fit border-white/10 bg-white/[0.04] text-white transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Analyze Resume</CardTitle>
          {result && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-zinc-400 hover:text-white"
            >
              Reset
            </Button>
          )}
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

      {/* Result Area */}
      <div className="transition-all duration-500">
        {mutation.isPending ? (
          <AnalyzingLoadingState />
        ) : result ? (
          <AnalysisResultCard analysis={result} />
        ) : (
          <Card className="flex min-h-[500px] items-center justify-center border-white/10 bg-white/[0.03] text-center text-white">
            <CardContent>
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
                <FileText className="h-10 w-10 text-zinc-500" />
              </div>
              <h2 className="text-xl font-semibold">No analysis yet</h2>
              <p className="mt-2 max-w-md text-sm text-zinc-400">
                Upload your resume and paste a job description. Your AI-powered
                match result will appear here automatically.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
