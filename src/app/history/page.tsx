"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getAnalysesApi } from "@/lib/api";
import { HistoryTable } from "@/components/resume/history-table";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";

export default function HistoryPage() {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["analyses", "infinite"],
    queryFn: ({ pageParam = 0 }) => getAnalysesApi(10, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * 10;
      return nextOffset < lastPage.total ? nextOffset : undefined;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten the pages into a single array of items
  const allAnalyses = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-indigo-300">Analysis History</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Previous resume analyses
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Infinite scroll enabled. Loading 10 items per batch.
        </p>
      </div>

      {status === "pending" ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
        </div>
      ) : status === "error" ? (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-8 text-center text-red-400">
          <p>Failed to load analysis history. Please try again later.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <HistoryTable analyses={allAnalyses} />
          
          {/* Loading trigger at the bottom */}
          <div
            ref={ref}
            className="flex h-20 items-center justify-center py-10"
          >
            {isFetchingNextPage ? (
              <div className="flex items-center gap-3 text-zinc-400">
                <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
                <span>Loading more...</span>
              </div>
            ) : hasNextPage ? (
              <span className="text-sm text-zinc-500 italic">Scroll for more</span>
            ) : allAnalyses.length > 0 ? (
              <span className="text-sm text-zinc-500 italic">End of history</span>
            ) : null}
          </div>
        </div>
      )}
    </main>
  );
}
