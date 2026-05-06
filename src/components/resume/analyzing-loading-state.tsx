"use client";

import { useEffect, useState } from "react";
import { BrainCircuit, CheckCircle2, Loader2, Sparkles, Cpu, Search } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

const STEPS = [
  { id: 1, label: "Extracting text from PDF...", icon: Search },
  { id: 2, label: "Identifying core skills...", icon: Cpu },
  { id: 3, label: "Matching with job description...", icon: BrainCircuit },
  { id: 4, label: "Generating ATS feedback...", icon: Sparkles },
  { id: 5, label: "Finalizing AI recommendations...", icon: CheckCircle2 },
];

export function AnalyzingLoadingState() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + 1;
      });
    }, 100);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <Card className="flex min-h-[500px] flex-col items-center justify-center border-white/10 bg-white/[0.03] p-8 text-center text-white">
      <CardContent className="w-full max-w-md space-y-8">
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-indigo-500/20" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
            <BrainCircuit className="h-10 w-10 animate-pulse" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">AI is analyzing...</h2>
          <p className="text-sm text-zinc-400">
            Our AI model is processing your resume against the job description.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-xs font-medium text-zinc-400">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-white/5" />
        </div>

        <div className="space-y-3">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <div
                key={step.id}
                className={`flex items-center gap-3 rounded-xl border p-3 transition-all duration-500 ${
                  isCurrent
                    ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-100"
                    : isCompleted
                    ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-300"
                    : "border-white/5 bg-transparent text-zinc-500"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : isCurrent ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
                <span className="text-sm font-medium">{step.label}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
