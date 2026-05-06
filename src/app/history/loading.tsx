import { Skeleton } from "@/components/ui/skeleton";

export default function HistoryLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <Skeleton className="mb-4 h-8 w-64 bg-white/10" />
      <Skeleton className="mb-8 h-4 w-96 bg-white/10" />
      <Skeleton className="h-96 w-full rounded-2xl bg-white/10" />
    </main>
  );
}
