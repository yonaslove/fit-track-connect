import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Flame, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExerciseCard } from "@/components/workouts/ExerciseCard";
import { workoutPlans } from "@/data/workouts";
import { toast } from "@/hooks/use-toast";

const WorkoutDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const workout = workoutPlans.find((w) => w.id === id);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);

  if (!workout) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Workout not found</p>
          <Button onClick={() => navigate("/workouts")}>Back to Workouts</Button>
        </div>
      </div>
    );
  }

  const toggleExercise = (exerciseId: string) => {
    if (!isWorkoutStarted) return;
    
    setCompletedExercises((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(exerciseId)) {
        newSet.delete(exerciseId);
      } else {
        newSet.add(exerciseId);
      }
      return newSet;
    });
  };

  const handleStartWorkout = () => {
    setIsWorkoutStarted(true);
    toast({
      title: "Workout Started! 💪",
      description: "Let's crush this workout together!",
    });
  };

  const handleFinishWorkout = () => {
    toast({
      title: "Workout Complete! 🎉",
      description: `You burned approximately ${workout.calories} calories!`,
    });
    navigate("/progress");
  };

  const progress = (completedExercises.size / workout.exercises.length) * 100;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Image */}
      <div className="relative h-64">
        <img
          src={workout.image}
          alt={workout.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-6 w-10 h-10 rounded-full glass flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="px-6 -mt-16 relative z-10">
        <div className="bg-card rounded-3xl border border-border/50 p-6 mb-6 animate-slide-up">
          <h1 className="text-2xl font-bold text-foreground mb-2">{workout.title}</h1>
          <p className="text-muted-foreground mb-4">{workout.description}</p>
          
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-foreground">{workout.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-energy" />
              <span className="text-foreground">{workout.calories} cal</span>
            </div>
          </div>

          {!isWorkoutStarted ? (
            <Button onClick={handleStartWorkout} size="lg" className="w-full">
              <Play className="w-5 h-5 mr-2" />
              Start Workout
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full gradient-primary rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {progress === 100 && (
                <Button onClick={handleFinishWorkout} variant="success" size="lg" className="w-full">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Complete Workout
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Exercises */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Exercises ({completedExercises.size}/{workout.exercises.length})
          </h2>
          {workout.exercises.map((exercise, index) => (
            <ExerciseCard
              key={exercise.id}
              name={exercise.name}
              sets={exercise.sets}
              reps={exercise.reps}
              weight={exercise.weight}
              completed={completedExercises.has(exercise.id)}
              onToggle={() => toggleExercise(exercise.id)}
              className={`animation-delay-${index * 50}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetail;
