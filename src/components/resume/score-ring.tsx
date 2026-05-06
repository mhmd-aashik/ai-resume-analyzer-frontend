type ScoreRingProps = {
  score: number;
};

export function ScoreRing({ score }: ScoreRingProps) {
  // Ensure score is between 0 and 100
  const safeScore = Math.min(Math.max(score, 0), 100);

  return (
    <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/30 to-cyan-500/20">
      <div className="absolute inset-2 rounded-full border border-white/10 bg-zinc-950" />
      <div className="relative text-center">
        <p className="text-4xl font-bold text-white">{safeScore}%</p>
        <p className="text-xs text-zinc-400">Match Score</p>
      </div>
    </div>
  );
}
