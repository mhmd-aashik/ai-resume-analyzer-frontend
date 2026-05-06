import { getAnalysesApi } from "@/lib/api";
import { HistoryTable } from "@/components/resume/history-table";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const analyses = await getAnalysesApi();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-indigo-300">Analysis History</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Previous resume analyses
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Server-rendered history page using Next.js App Router.
        </p>
      </div>

      <HistoryTable analyses={analyses} />
    </main>
  );
}
