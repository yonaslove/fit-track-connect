import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface AchievementCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  unlocked?: boolean;
  progress?: number;
  className?: string;
}

export function AchievementCard({
  icon: Icon,
  title,
  description,
  unlocked = false,
  progress,
  className,
}: AchievementCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-4 border transition-all duration-300 animate-scale-in",
        unlocked
          ? "bg-card border-primary/50 glow-primary"
          : "bg-card/50 border-border/50 opacity-60",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
            unlocked ? "gradient-primary" : "bg-muted"
          )}
        >
          <Icon
            className={cn(
              "w-6 h-6",
              unlocked ? "text-primary-foreground" : "text-muted-foreground"
            )}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className={cn(
            "font-semibold mb-1",
            unlocked ? "text-foreground" : "text-muted-foreground"
          )}>
            {title}
          </h4>
          <p className="text-sm text-muted-foreground">{description}</p>
          
          {!unlocked && progress !== undefined && (
            <div className="mt-3">
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full gradient-primary rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{progress}% complete</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
