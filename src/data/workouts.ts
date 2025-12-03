export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: string;
  restTime?: number;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  description: string;
  duration: string;
  calories: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: "Strength" | "Cardio" | "HIIT" | "Yoga";
  image: string;
  exercises: Exercise[];
}

export const workoutPlans: WorkoutPlan[] = [
  {
    id: "full-body-strength",
    title: "Full Body Strength",
    description: "A complete full-body workout targeting all major muscle groups for balanced strength development.",
    duration: "45 min",
    calories: 350,
    level: "Intermediate",
    category: "Strength",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=60",
    exercises: [
      { id: "1", name: "Barbell Squats", sets: 4, reps: "8-10", weight: "60 kg" },
      { id: "2", name: "Bench Press", sets: 4, reps: "8-10", weight: "50 kg" },
      { id: "3", name: "Bent Over Rows", sets: 3, reps: "10-12", weight: "40 kg" },
      { id: "4", name: "Overhead Press", sets: 3, reps: "8-10", weight: "30 kg" },
      { id: "5", name: "Romanian Deadlift", sets: 3, reps: "10-12", weight: "50 kg" },
      { id: "6", name: "Plank", sets: 3, reps: "60 sec" },
    ],
  },
  {
    id: "hiit-cardio-blast",
    title: "HIIT Cardio Blast",
    description: "High-intensity interval training to maximize calorie burn and improve cardiovascular fitness.",
    duration: "30 min",
    calories: 450,
    level: "Advanced",
    category: "HIIT",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=60",
    exercises: [
      { id: "1", name: "Burpees", sets: 4, reps: "15" },
      { id: "2", name: "Mountain Climbers", sets: 4, reps: "30 sec" },
      { id: "3", name: "Jump Squats", sets: 4, reps: "20" },
      { id: "4", name: "High Knees", sets: 4, reps: "30 sec" },
      { id: "5", name: "Box Jumps", sets: 3, reps: "12" },
      { id: "6", name: "Sprint Intervals", sets: 5, reps: "20 sec" },
    ],
  },
  {
    id: "upper-body-power",
    title: "Upper Body Power",
    description: "Focus on building strength and definition in your chest, back, shoulders, and arms.",
    duration: "40 min",
    calories: 280,
    level: "Intermediate",
    category: "Strength",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=800&auto=format&fit=crop&q=60",
    exercises: [
      { id: "1", name: "Pull-ups", sets: 4, reps: "8-10" },
      { id: "2", name: "Dumbbell Shoulder Press", sets: 4, reps: "10-12", weight: "20 kg" },
      { id: "3", name: "Cable Flyes", sets: 3, reps: "12-15", weight: "15 kg" },
      { id: "4", name: "Tricep Dips", sets: 3, reps: "12" },
      { id: "5", name: "Bicep Curls", sets: 3, reps: "12", weight: "12 kg" },
      { id: "6", name: "Face Pulls", sets: 3, reps: "15", weight: "20 kg" },
    ],
  },
  {
    id: "yoga-flow",
    title: "Morning Yoga Flow",
    description: "Start your day with energizing yoga poses to improve flexibility and mental clarity.",
    duration: "25 min",
    calories: 150,
    level: "Beginner",
    category: "Yoga",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=60",
    exercises: [
      { id: "1", name: "Sun Salutation A", sets: 3, reps: "5 breaths" },
      { id: "2", name: "Warrior I", sets: 2, reps: "30 sec each side" },
      { id: "3", name: "Warrior II", sets: 2, reps: "30 sec each side" },
      { id: "4", name: "Triangle Pose", sets: 2, reps: "30 sec each side" },
      { id: "5", name: "Downward Dog", sets: 3, reps: "60 sec" },
      { id: "6", name: "Child's Pose", sets: 2, reps: "60 sec" },
    ],
  },
  {
    id: "leg-day-crusher",
    title: "Leg Day Crusher",
    description: "Intense lower body workout to build powerful legs and improve overall athletic performance.",
    duration: "50 min",
    calories: 400,
    level: "Advanced",
    category: "Strength",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=60",
    exercises: [
      { id: "1", name: "Back Squats", sets: 5, reps: "5", weight: "80 kg" },
      { id: "2", name: "Leg Press", sets: 4, reps: "10-12", weight: "150 kg" },
      { id: "3", name: "Walking Lunges", sets: 3, reps: "20 steps", weight: "20 kg" },
      { id: "4", name: "Leg Curls", sets: 4, reps: "12", weight: "40 kg" },
      { id: "5", name: "Calf Raises", sets: 4, reps: "15", weight: "60 kg" },
      { id: "6", name: "Glute Bridges", sets: 3, reps: "15", weight: "40 kg" },
    ],
  },
  {
    id: "cardio-endurance",
    title: "Cardio Endurance",
    description: "Steady-state cardio workout to build endurance and improve heart health.",
    duration: "35 min",
    calories: 320,
    level: "Beginner",
    category: "Cardio",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&auto=format&fit=crop&q=60",
    exercises: [
      { id: "1", name: "Warm-up Walk", sets: 1, reps: "5 min" },
      { id: "2", name: "Jogging", sets: 1, reps: "15 min" },
      { id: "3", name: "Jumping Jacks", sets: 3, reps: "30 sec" },
      { id: "4", name: "Jump Rope", sets: 3, reps: "2 min" },
      { id: "5", name: "Cool-down Walk", sets: 1, reps: "5 min" },
      { id: "6", name: "Stretching", sets: 1, reps: "5 min" },
    ],
  },
];

export const weeklyProgress = [
  { day: "Mon", value: 45 },
  { day: "Tue", value: 60 },
  { day: "Wed", value: 30 },
  { day: "Thu", value: 75 },
  { day: "Fri", value: 50 },
  { day: "Sat", value: 90 },
  { day: "Sun", value: 20 },
];

export const caloriesProgress = [
  { day: "Mon", value: 350 },
  { day: "Tue", value: 420 },
  { day: "Wed", value: 280 },
  { day: "Thu", value: 500 },
  { day: "Fri", value: 380 },
  { day: "Sat", value: 620 },
  { day: "Sun", value: 150 },
];
