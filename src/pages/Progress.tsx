import { Trophy, Target, Flame, Calendar } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { WeeklyChart } from "@/components/progress/WeeklyChart";
import { AchievementCard } from "@/components/progress/AchievementCard";
import { weeklyProgress, caloriesProgress } from "@/data/workouts";

const achievements = [
  {
    icon: Trophy,
    title: "First Workout",
    description: "Complete your first workout",
    unlocked: true,
  },
  {
    icon: Flame,
    title: "Calorie Crusher",
    description: "Burn 1,000 calories in a week",
    unlocked: true,
  },
  {
    icon: Calendar,
    title: "7 Day Streak",
    description: "Work out 7 days in a row",
    unlocked: true,
  },
  {
    icon: Target,
    title: "Goal Getter",
    description: "Complete 50 workouts",
    unlocked: false,
    progress: 68,
  },
];

const Progress = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="p-6 pt-12">
        <h1 className="text-2xl font-bold text-foreground mb-2">Your Progress</h1>
        <p className="text-muted-foreground">Track your fitness journey</p>
      </header>

      {/* Stats Overview */}
      <section className="px-6 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon={Trophy}
            label="Total Workouts"
            value={34}
            variant="primary"
          />
          <StatCard
            icon={Flame}
            label="Total Calories"
            value="12.4k"
            variant="energy"
          />
        </div>
      </section>

      {/* Weekly Activity Chart */}
      <section className="px-6 mb-8">
        <WeeklyChart data={weeklyProgress} label="Weekly Activity (minutes)" />
      </section>

      {/* Calories Chart */}
      <section className="px-6 mb-8">
        <WeeklyChart data={caloriesProgress} label="Calories Burned" />
      </section>

      {/* Achievements */}
      <section className="px-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Achievements</h2>
        <div className="grid gap-4">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={index}
              icon={achievement.icon}
              title={achievement.title}
              description={achievement.description}
              unlocked={achievement.unlocked}
              progress={achievement.progress}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Progress;
