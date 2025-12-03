import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { WorkoutPlanCard } from "@/components/workouts/WorkoutPlanCard";
import { workoutPlans } from "@/data/workouts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type FavoritesMap = Record<string, boolean>;

const categories = ["All", "Strength", "Cardio", "HIIT", "Yoga"] as const;

const Workouts = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<FavoritesMap>(() => {
    try {
      return JSON.parse(localStorage.getItem("ftc_favs") || "{}");
    } catch {
      return {};
    }
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("ftc_favs", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const filteredWorkouts = workoutPlans.filter((workout) => {
    const matchesCategory = selectedCategory === "All" || workout.category === selectedCategory;
    const matchesSearch = workout.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="p-6 pt-12">
        <h1 className="text-2xl font-bold text-foreground mb-2">Workout Plans</h1>
        <p className="text-muted-foreground">Find your perfect workout</p>
      </header>

      {/* Search */}
      <section className="px-6 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search workouts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-card border-border/50 rounded-xl"
          />
        </div>
      </section>

      {/* Category Filters */}
      <section className="px-6 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300",
                selectedCategory === category
                  ? "gradient-primary text-primary-foreground glow-primary"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Workout Grid */}
      <section className="px-6">
        <div className="grid gap-4">
          {filteredWorkouts.map((workout, index) => (
            <div key={workout.id}>
              <WorkoutPlanCard {...workout} className={`animation-delay-${index * 100}`} />
              <div className="mt-2 flex gap-2">
                <Button onClick={() => navigate(`/workout/${workout.id}`)} size="sm">Start</Button>
                <Button variant="outline" size="sm" onClick={() => toggleFavorite(workout.id)}>
                  {favorites[workout.id] ? "Unfavorite" : "Favorite"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredWorkouts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No workouts found</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Workouts;
