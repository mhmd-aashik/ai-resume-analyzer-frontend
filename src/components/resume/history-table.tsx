import Link from "next/link";
import type { ResumeAnalysis } from "@/types/analysis";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type HistoryTableProps = {
  analyses: ResumeAnalysis[];
};

export function HistoryTable({ analyses }: HistoryTableProps) {
  if (analyses.length === 0) {
    return (
      <Card className="border-white/10 bg-white/[0.04] text-white">
        <CardContent className="p-8 text-center">
          <p className="text-zinc-400">No analysis history found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <table className="w-full border-collapse bg-white/[0.03] text-left text-sm">
        <thead className="bg-white/[0.04] text-zinc-300">
          <tr>
            <th className="p-4">Resume</th>
            <th className="p-4">Score</th>
            <th className="hidden p-4 md:table-cell">Matched Skills</th>
            <th className="hidden p-4 lg:table-cell">Created</th>
            <th className="p-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {analyses.map((item) => (
            <tr key={item.id} className="border-t border-white/10">
              <td className="p-4 font-medium text-white">
                {item.resumeFileName}
              </td>
              <td className="p-4">
                <Badge className="bg-indigo-500/15 text-indigo-200">
                  {item.score}%
                </Badge>
              </td>
              <td className="hidden p-4 md:table-cell">
                <div className="flex max-w-md flex-wrap gap-2">
                  {item.matchedSkills.slice(0, 4).map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-white/10 text-zinc-200"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {item.matchedSkills.length > 4 && (
                    <span className="text-xs text-zinc-500">
                      +{item.matchedSkills.length - 4} more
                    </span>
                  )}
                </div>
              </td>
              <td className="hidden p-4 text-zinc-400 lg:table-cell">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className="p-4 text-right">
                <Button asChild size="sm" variant="outline">
                  <Link href={`/analysis/${item.id}`}>View</Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
