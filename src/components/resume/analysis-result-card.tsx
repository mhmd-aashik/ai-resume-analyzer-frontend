import type { ResumeAnalysis } from "@/types/analysis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScoreRing } from "./score-ring";
import { SkillBadges } from "./skill-badges";

type AnalysisResultCardProps = {
  analysis: ResumeAnalysis;
};

export function AnalysisResultCard({ analysis }: AnalysisResultCardProps) {
  return (
    <Card className="border-white/10 bg-white/[0.04] text-white">
      <CardHeader>
        <CardTitle className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <span>Analysis Result</span>
          <span className="text-sm font-normal text-zinc-400">
            {analysis.resumeFileName}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Score and Skills Overview */}
        <div className="grid gap-6 md:grid-cols-[180px_1fr]">
          <ScoreRing score={analysis.score} />
          <div className="space-y-6">
            <SkillBadges title="Matched Skills" items={analysis.matchedSkills} />
            <SkillBadges
              title="Missing Skills"
              items={analysis.missingSkills}
              type="warning"
            />
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* ATS Feedback */}
        <section>
          <h3 className="mb-3 font-semibold">ATS Feedback</h3>
          <ul className="space-y-2 text-sm text-zinc-300">
            {analysis.atsFeedback.length > 0 ? (
              analysis.atsFeedback.map((item, index) => (
                <li key={index} className="rounded-lg bg-white/[0.03] p-3">
                  {item}
                </li>
              ))
            ) : (
              <li className="text-zinc-500">No ATS feedback returned.</li>
            )}
          </ul>
        </section>

        {/* Improvement Suggestions */}
        <section>
          <h3 className="mb-3 font-semibold">Improvement Suggestions</h3>
          <ul className="space-y-2 text-sm text-zinc-300">
            {analysis.improvementSuggestions.length > 0 ? (
              analysis.improvementSuggestions.map((item, index) => (
                <li key={index} className="rounded-lg bg-white/[0.03] p-3">
                  {item}
                </li>
              ))
            ) : (
              <li className="text-zinc-500">
                No improvement suggestions returned.
              </li>
            )}
          </ul>
        </section>

        {/* Suggested Summary */}
        <section className="rounded-xl border border-white/10 bg-indigo-500/10 p-4">
          <h3 className="mb-2 font-semibold">Suggested Summary</h3>
          <p className="text-sm leading-6 text-zinc-200">
            {analysis.summarySuggestion || "No summary suggestion returned."}
          </p>
        </section>

        {/* Recommendation */}
        <section className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="mb-2 font-semibold">Recommendation</h3>
          <p className="text-sm leading-6 text-zinc-300">
            {analysis.recommendation || "No recommendation returned."}
          </p>
        </section>
      </CardContent>
    </Card>
  );
}
