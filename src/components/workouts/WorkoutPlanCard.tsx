import { Clock, Flame, Dumbbell, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface WorkoutPlanCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  calories: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: "Strength" | "Cardio" | "HIIT" | "Yoga";
  image: string;
  className?: string;
}

const levelColors = {
  Beginner: "bg-success/20 text-success",
  Intermediate: "bg-energy/20 text-energy",
  Advanced: "bg-cardio/20 text-cardio",
};

const categoryColors = {
  Strength: "text-primary",
  Cardio: "text-cardio",
  HIIT: "text-energy",
  Yoga: "text-success",
};

export function WorkoutPlanCard({
  id,
  title,
  description,
  duration,
  calories,
  level,
  category,
  image,
  className,
}: WorkoutPlanCardProps) {
  return (
    <Link
      to={`/workout/${id}`}
      className={cn(
        "group block overflow-hidden rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:border-primary/50 hover:shadow-lg animate-slide-up",
        className
      )}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={cn("px-2 py-1 rounded-full text-xs font-medium", levelColors[level])}>
            {level}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Dumbbell className={cn("w-4 h-4", categoryColors[category])} />
          <span className={cn("text-xs font-medium", categoryColors[category])}>{category}</span>
        </div>
        
        <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame className="w-4 h-4 text-energy" />
              <span>{calories}</span>
            </div>
          </div>
          
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
}
