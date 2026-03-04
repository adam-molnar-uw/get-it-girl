/**
 * Maps our exercise IDs to image paths from free-exercise-db (public domain).
 * Each exercise has two images: position 0 (start) and position 1 (end).
 * Base URL: https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/
 */

const BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises';

export interface ExerciseImages {
  start: string; // 0.jpg — starting position
  end: string;   // 1.jpg — ending position
}

const IMAGE_MAP: Record<string, string> = {
  // Lower Body
  'goblet-squat': 'Goblet_Squat',
  'bulgarian-split-squat': 'Split_Squat_with_Dumbbells',
  'pistol-squat-progression': 'Kettlebell_Pistol_Squat',
  'romanian-deadlift': 'Stiff-Legged_Dumbbell_Deadlift',
  'single-leg-rdl': 'Kettlebell_One-Legged_Deadlift',
  'dumbbell-lunges': 'Dumbbell_Lunges',
  'reverse-lunges': 'Dumbbell_Rear_Lunge',
  'curtsy-lunges': 'Crossover_Reverse_Lunge',
  'sumo-squat': 'Plie_Dumbbell_Squat',
  'sumo-squat-pulse': 'Plie_Dumbbell_Squat',
  'glute-bridge': 'Barbell_Glute_Bridge',
  'single-leg-glute-bridge': 'Single_Leg_Glute_Bridge',
  'calf-raises': 'Standing_Dumbbell_Calf_Raise',
  'single-leg-calf-raise': 'Dumbbell_Seated_One-Leg_Calf_Raise',
  'step-ups': 'Dumbbell_Step_Ups',
  'lateral-step-ups': 'Dumbbell_Step_Ups',

  // Upper Body
  'dumbbell-press': 'Dumbbell_Floor_Press',
  'push-ups': 'Push-Ups_-_Close_Triceps_Position',
  'diamond-push-ups': 'Close-Grip_Push-Up_off_of_a_Dumbbell',
  'archer-push-ups': 'Push-Up_Wide',
  'dumbbell-row': 'One-Arm_Dumbbell_Row',
  'renegade-row': 'Alternating_Renegade_Row',
  'overhead-press': 'Dumbbell_Shoulder_Press',
  'arnold-press': 'Arnold_Dumbbell_Press',
  'lateral-raise': 'Side_Lateral_Raise',
  'bicep-curl': 'Dumbbell_Bicep_Curl',
  'hammer-curl': 'Hammer_Curls',
  'tricep-extension': 'Standing_Dumbbell_Triceps_Extension',
  'tricep-kickback': 'Tricep_Dumbbell_Kickback',

  // Core
  'plank': 'Plank',
  'side-plank': 'Side_Bridge',
  'russian-twist': 'Russian_Twist',
  'woodchop': 'Plate_Twist',
  'dead-bug': 'Dead_Bug',
  'dead-bug-dumbbell': 'Dead_Bug',

  // HIIT
  'squat-jumps': 'Freehand_Jump_Squat',
  'jump-lunges': 'Bodyweight_Walking_Lunge',
  'burpees': 'Bodyweight_Squat',
  'mountain-climbers': 'Mountain_Climbers',
  'cross-body-climbers': 'Mountain_Climbers',
  'high-knees': 'Bodyweight_Squat',
  'dumbbell-thrusters': 'Kettlebell_Thruster',
  'dumbbell-snatch': 'One-Arm_Kettlebell_Snatch',

  // Cardio
  'jumping-jacks': 'Bodyweight_Squat',
  'skaters': 'Bodyweight_Walking_Lunge',

  // Strong Curves accessories
  'fire-hydrant': 'Fire_Hydrant',
  'donkey-kick': 'Donkey_Kicks',
  'back-extension': 'Hyperextension',
};

export function getExerciseImages(exerciseId: string): ExerciseImages | null {
  const folder = IMAGE_MAP[exerciseId];
  if (!folder) return null;
  return {
    start: `${BASE}/${folder}/0.jpg`,
    end: `${BASE}/${folder}/1.jpg`,
  };
}
