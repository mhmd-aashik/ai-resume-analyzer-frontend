import { Skeleton } from "@/components/ui/skeleton";

export default function AnalysisDetailLoading() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <Skeleton className="mb-6 h-10 w-40 bg-white/10" />
      <Skeleton className="h-[600px] w-full rounded-2xl bg-white/10" />
    </main>
  );
}
