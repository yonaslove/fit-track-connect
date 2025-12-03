import { Flame, Timer, Dumbbell, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { CircularProgress } from "@/components/dashboard/CircularProgress";
import { WorkoutCard } from "@/components/dashboard/WorkoutCard";
import { workoutPlans } from "@/data/workouts";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const todayWorkout = workoutPlans[0];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="p-6 pt-12">
        <p className="text-muted-foreground text-sm">Good morning</p>
        <h1 className="text-2xl font-bold text-foreground">Ready to crush it? 💪</h1>
      </header>

      {/* Daily Goal Progress */}
      <section className="px-6 mb-8">
        <div className="bg-card rounded-3xl border border-border/50 p-6 animate-scale-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">Daily Goal</h2>
              <p className="text-sm text-muted-foreground mb-4">3 of 5 workouts completed</p>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-gradient">60%</span>
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
            </div>
            <CircularProgress
              progress={60}
              size={100}
              strokeWidth={10}
              value="3/5"
              label="workouts"
            />
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="px-6 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon={Flame}
            label="Calories Burned"
            value={847}
            unit="kcal"
            variant="energy"
          />
          <StatCard
            icon={Timer}
            label="Active Time"
            value={72}
            unit="min"
            variant="primary"
          />
          <StatCard
            icon={Dumbbell}
            label="Workouts"
            value={12}
            unit="this week"
            variant="cardio"
          />
          <StatCard
            icon={TrendingUp}
            label="Streak"
            value={7}
            unit="days"
            variant="success"
          />
        </div>
      </section>

      {/* Today's Workout */}
      <section className="px-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Today's Workout</h2>
          <button
            onClick={() => navigate("/workouts")}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            See all
          </button>
        </div>
        <WorkoutCard
          title={todayWorkout.title}
          duration={todayWorkout.duration}
          calories={todayWorkout.calories}
          exercises={todayWorkout.exercises.length}
          image={todayWorkout.image}
          variant="strength"
          onStart={() => navigate(`/workout/${todayWorkout.id}`)}
        />
      </section>

      {/* Quick Actions */}
      <section className="px-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Start</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Strength", icon: "💪", color: "gradient-primary" },
            { label: "Cardio", icon: "🏃", color: "gradient-cardio" },
            { label: "Yoga", icon: "🧘", color: "gradient-success" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => navigate("/workouts")}
              className={`${item.color} p-4 rounded-2xl flex flex-col items-center gap-2 transition-transform hover:scale-105 active:scale-95`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm font-medium text-primary-foreground">{item.label}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
