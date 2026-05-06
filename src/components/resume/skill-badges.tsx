import { Badge } from "@/components/ui/badge";

type SkillBadgesProps = {
  title: string;
  items: string[];
  type?: "positive" | "warning";
};

export function SkillBadges({
  title,
  items,
  type = "positive",
}: SkillBadgesProps) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-zinc-200">{title}</h3>
      {items.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <Badge
              key={item}
              className={
                type === "positive"
                  ? "bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/20"
                  : "bg-amber-500/15 text-amber-200 hover:bg-amber-500/20"
              }
            >
              {item}
            </Badge>
          ))}
        </div>
      ) : (
        <p className="text-sm text-zinc-500">No items found.</p>
      )}
    </div>
  );
}
