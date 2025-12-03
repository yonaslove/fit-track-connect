import { Clock, Flame, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface WorkoutCardProps {
  title: string;
  duration: string;
  calories: number;
  exercises: number;
  image?: string;
  variant?: "primary" | "cardio" | "strength";
  onStart?: () => void;
  className?: string;
}

const variantBg = {
  primary: "from-primary/20 to-transparent",
  cardio: "from-cardio/20 to-transparent",
  strength: "from-energy/20 to-transparent",
};

export function WorkoutCard({
  title,
  duration,
  calories,
  exercises,
  image,
  variant = "primary",
  onStart,
  className,
}: WorkoutCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-card border border-border/50 p-4 animate-slide-up",
        className
      )}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br", variantBg[variant])} />
      
      <div className="relative z-10 flex gap-4">
        {image && (
          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-secondary">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-2 truncate">{title}</h3>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame className="w-4 h-4 text-energy" />
              <span>{calories} cal</span>
            </div>
            <span>{exercises} exercises</span>
          </div>
          
          <Button
            size="sm"
            variant="glass"
            onClick={onStart}
            className="group"
          >
            Start Workout
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
