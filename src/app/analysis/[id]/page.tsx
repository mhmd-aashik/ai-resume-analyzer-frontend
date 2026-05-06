import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAnalysisByIdApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { AnalysisResultCard } from "@/components/resume/analysis-result-card";

export const dynamic = "force-dynamic";

type AnalysisDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AnalysisDetailPage({
  params,
}: AnalysisDetailPageProps) {
  const { id } = await params;
  const analysis = await getAnalysisByIdApi(id);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <Button asChild variant="ghost" className="mb-6 text-zinc-400 hover:text-white">
        <Link href="/history">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to History
        </Link>
      </Button>

      <AnalysisResultCard analysis={analysis} />
    </main>
  );
}
