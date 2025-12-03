import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
  variant?: "primary" | "energy" | "success" | "cardio";
  className?: string;
}

const variantClasses = {
  primary: "gradient-primary",
  energy: "gradient-energy",
  success: "gradient-success",
  cardio: "gradient-cardio",
};

export function StatCard({
  icon: Icon,
  label,
  value,
  unit,
  variant = "primary",
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-4 animate-scale-in",
        variantClasses[variant],
        className
      )}
    >
      <div className="absolute top-2 right-2 opacity-20">
        <Icon className="w-12 h-12" />
      </div>
      <div className="relative z-10">
        <p className="text-xs font-medium opacity-80 mb-1">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold">{value}</span>
          {unit && <span className="text-sm font-medium opacity-80">{unit}</span>}
        </div>
      </div>
    </div>
  );
}
