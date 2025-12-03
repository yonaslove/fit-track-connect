import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExerciseCardProps {
  name: string;
  sets: number;
  reps: string;
  weight?: string;
  completed?: boolean;
  onToggle?: () => void;
  className?: string;
}

export function ExerciseCard({
  name,
  sets,
  reps,
  weight,
  completed = false,
  onToggle,
  className,
}: ExerciseCardProps) {
  return (
    <div
      onClick={onToggle}
      className={cn(
        "flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 cursor-pointer transition-all duration-300 hover:border-primary/50",
        completed && "border-success/50 bg-success/5",
        className
      )}
    >
      <div className="flex-shrink-0">
        {completed ? (
          <CheckCircle2 className="w-6 h-6 text-success" />
        ) : (
          <Circle className="w-6 h-6 text-muted-foreground" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className={cn(
          "font-medium transition-colors",
          completed ? "text-muted-foreground line-through" : "text-foreground"
        )}>
          {name}
        </h4>
        <p className="text-sm text-muted-foreground">
          {sets} sets × {reps}
          {weight && ` • ${weight}`}
        </p>
      </div>
    </div>
  );
}
