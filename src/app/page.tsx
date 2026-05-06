import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  FileSearch,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.25),transparent_35%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.18),transparent_30%)]" />

      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
        <div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white md:text-6xl">
            Analyze resumes with AI and improve job match scores.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            Upload a resume, paste a job description, and get an AI-powered
            score with matched skills, missing skills, ATS feedback, and
            improvement suggestions.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-xl">
              <Link href="/analyze">
                Start Analysis <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl border-white/10 bg-white/5"
            >
              <Link href="/history">View History</Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {["Next.js", "NestJS", "TypeScript", "Ollama", "Drizzle"].map(
              (item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="bg-white/10 text-zinc-200"
                >
                  {item}
                </Badge>
              ),
            )}
          </div>
        </div>

        <Card className="border-white/10 bg-white/4 shadow-2xl backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">AI Match Score</p>
                  <p className="text-5xl font-bold text-white">91%</p>
                </div>
                <BrainCircuit className="h-12 w-12 text-indigo-300" />
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: BadgeCheck,
                    title: "Matched Skills",
                    text: "React, Next.js, TypeScript, PostgreSQL",
                  },
                  {
                    icon: FileSearch,
                    title: "ATS Feedback",
                    text: "Add measurable achievements and stronger keywords.",
                  },
                  {
                    icon: Sparkles,
                    title: "AI Recommendation",
                    text: "Strong candidate, improve DevOps and cloud details.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-white/10 bg-white/3 p-4"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <item.icon className="h-4 w-4 text-indigo-300" />
                      <p className="font-medium text-white">{item.title}</p>
                    </div>
                    <p className="text-sm text-zinc-400">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
