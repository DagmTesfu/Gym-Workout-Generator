const workouts = [
    {
    name: "Push-ups",
    target: "Chest and Triceps",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 10
},
{
    name: "Bench Press",
    target: "Chest and Triceps",
    goal: ["Strength"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 8
},
{
    name: "Incline Bench Press",
    target: "Chest",
    goal: ["Strength", "muscle"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 10
},
{
    name: "Dips",
    target: "Chest and Triceps",
    goal: ["Strength", "muscle"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 8
},
{
    name: "Cable Fly",
    target: "Chest",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 12
},
{
    name: "Pull-Up",
    target: "Back(Lat)",
    goal: ["muscle"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 6
},
{
    name: "Chest-Supported Row",
    target: "Back",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 12
},
{
    name: "Lat Pulldown",
    target: "Back",
    goal: ["muscle", "Athletic"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 12
},
{
    name: "Seated Cable Row",
    target: "Back",
    goal: ["muscle", "Athletic"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 12
},
{
    name: "Barbell Bent-Over Row",
    target: "Back",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 8
},
{
    name: "One-Arm Dumbbell Row",
    target: "Back",
    goal: ["muscle", "Athletic"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 10
},
{
    name: "Chest-Supported Dumbbell Row",
    target: "Back",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 12
},
{
    name: "Assisted Pull-Up",
    target: "Back",
    goal: ["muscle", "Athletic"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 10
},
{
    name: "T-Bar Row",
    target: "Back",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 8
},
{
    name: "Straight-Arm Cable Pulldown",
    target: "Back",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 12
},
{
    name: "Barbell Bench Press",
    target: "Chest",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 8
},
{
    name: "Dumbbell Bench Press",
    target: "Chest",
    goal: ["muscle", "Strength"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 10
},
{
    name: "Incline Barbell Bench Press",
    target: "Chest",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 8
},
{
    name: "Incline Dumbbell Press",
    target: "Chest",
    goal: ["muscle", "Strength"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 10
},
{
    name: "Chest Press Machine",
    target: "Chest",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 12
},
{
    name: "Pec Deck Fly",
    target: "Chest",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 15
},
{
    name: "Cable Chest Fly",
    target: "Chest",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 15
},
{
    name: "Dumbbell Chest Fly",
    target: "Chest",
    goal: ["muscle"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 12
},
{
    name: "Dumbbell Shoulder Press",
    target: "Shoulders",
    goal: ["muscle", "Strength"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 10
},
{
    name: "Barbell Overhead Press",
    target: "Shoulders",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 8
},
{
    name: "Shoulder Press Machine",
    target: "Shoulders",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 12
},
{
    name: "Dumbbell Lateral Raise",
    target: "Shoulders",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 15
},
{
    name: "Cable Lateral Raise",
    target: "Shoulders",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 15
},
{
    name: "Rear Delt Fly Machine",
    target: "Shoulders",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 15
},
{
    name: "Dumbbell Rear Delt Fly",
    target: "Shoulders",
    goal: ["muscle"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 15
},
{
    name: "Cable Face Pull",
    target: "Shoulders",
    goal: ["muscle", "Athletic"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 15
},
{
    name: "Barbell Curl",
    target: "Biceps",
    goal: ["muscle", "Strength"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 10
},
{
    name: "Dumbbell Curl",
    target: "Biceps",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 12
},
{
    name: "Hammer Curl",
    target: "Biceps",
    goal: ["muscle", "Strength"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 12
},
{
    name: "EZ-Bar Curl",
    target: "Biceps",
    goal: ["muscle", "Strength"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 10
},
{
    name: "Preacher Curl Machine",
    target: "Biceps",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 12
},
{
    name: "Cable Curl",
    target: "Biceps",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 12
},
{
    name: "Incline Dumbbell Curl",
    target: "Biceps",
    goal: ["muscle"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 12
},
{
    name: "Concentration Curl",
    target: "Biceps",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 12
},
{
    name: "Cable Triceps Pushdown",
    target: "Triceps",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 12
},
{
    name: "Rope Triceps Pushdown",
    target: "Triceps",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 12
},
{
    name: "Overhead Cable Triceps Extension",
    target: "Triceps",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 12
},
{
    name: "Dumbbell Overhead Triceps Extension",
    target: "Triceps",
    goal: ["muscle"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 12
},
{
    name: "Skull Crushers",
    target: "Triceps",
    goal: ["muscle", "Strength"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 10
},
{
    name: "Close-Grip Bench Press",
    target: "Triceps",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 8
},
{
    name: "Assisted Dip Machine",
    target: "Triceps",
    goal: ["muscle", "Athletic"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 10
},
{
    name: "Triceps Extension Machine",
    target: "Triceps",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 12
},
{
    name: "Barbell Back Squat",
    target: "Legs / Quadriceps",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 8
},
{
    name: "Front Squat",
    target: "Legs / Quadriceps",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 8
},
{
    name: "Leg Press",
    target: "Legs / Quadriceps",
    goal: ["muscle", "Strength"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 10
},
{
    name: "Hack Squat Machine",
    target: "Legs / Quadriceps",
    goal: ["muscle", "Strength"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 10
},
{
    name: "Leg Extension Machine",
    target: "Legs / Quadriceps",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 12
},
{
    name: "Dumbbell Goblet Squat",
    target: "Legs / Quadriceps",
    goal: ["muscle", "Athletic"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 12
},
{
    name: "Bulgarian Split Squat",
    target: "Legs / Quadriceps and Glutes",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 10
},
{
    name: "Dumbbell Walking Lunge",
    target: "Legs / Quadriceps",
    goal: ["muscle", "Athletic"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 10
},
{
    name: "Romanian Deadlift",
    target: "Hamstrings",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 8
},
{
    name: "Barbell Stiff-Leg Deadlift",
    target: "Hamstrings",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 8
},
{
    name: "Dumbbell Romanian Deadlift",
    target: "Hamstrings",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 10
},
{
    name: "Lying Leg Curl Machine",
    target: "Hamstrings",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 12
},
{
    name: "Seated Leg Curl Machine",
    target: "Hamstrings",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 12
},
{
    name: "Good Morning",
    target: "Hamstrings",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 8
},
{
    name: "Single-Leg Romanian Deadlift",
    target: "Hamstrings",
    goal: ["muscle", "Athletic"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 10
},
{
    name: "Cable Pull-Through",
    target: "Hamstrings",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 12
},
{
    name: "Barbell Hip Thrust",
    target: "Glutes",
    goal: ["muscle", "Strength"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 10
},
{
    name: "Smith Machine Hip Thrust",
    target: "Glutes",
    goal: ["muscle", "Strength"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 10
},
{
    name: "Dumbbell Hip Thrust",
    target: "Glutes",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 12
},
{
    name: "Cable Glute Kickback",
    target: "Glutes",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 15
},
{
    name: "Sumo Deadlift",
    target: "Glutes",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 8
},
{
    name: "Reverse Lunge",
    target: "Glutes",
    goal: ["muscle", "Athletic"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 10
},
{
    name: "Hip Abduction Machine",
    target: "Glutes",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 15
},
{
    name: "Standing Calf Raise Machine",
    target: "Calves",
    goal: ["muscle", "Strength"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 15
},
{
    name: "Seated Calf Raise Machine",
    target: "Calves",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 15
},
{
    name: "Leg Press Calf Raise",
    target: "Calves",
    goal: ["muscle", "Strength"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 15
},
{
    name: "Smith Machine Calf Raise",
    target: "Calves",
    goal: ["muscle", "Strength"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 15
},
{
    name: "Dumbbell Standing Calf Raise",
    target: "Calves",
    goal: ["muscle", "Athletic"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 15
},
{
    name: "Single-Leg Calf Raise",
    target: "Calves",
    goal: ["muscle", "Athletic"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 15
},
{
    name: "Donkey Calf Raise Machine",
    target: "Calves",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 15
},
{
    name: "Seated Dumbbell Calf Raise",
    target: "Calves",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 15
},
{
    name: "Pendulum Squat Machine",
    target: "Legs / Quadriceps",
    goal: ["Strength", "muscle"],
    difficulty: ["Intermediate"],
    sets: 4,
    reps: 8,
    image: "assets/exercises-web/pendulum-squat-machine-generated.png"
},
{
    name: "Hip Thrust Machine",
    target: "Glutes",
    goal: ["Strength", "muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 10,
    image: "assets/exercises-web/hip-thrust-machine-generated.png"
},
{
    name: "Plate-Loaded Iso-Lateral Row",
    target: "Back",
    goal: ["Strength", "muscle"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 10,
    image: "assets/exercises-web/iso-lateral-row-machine-generated.png"
},
{
    name: "Lever Chest Press",
    target: "Chest and Triceps",
    goal: ["Strength", "muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 10,
    image: "https://static.exercisedb.dev/media/DOoWcnA.gif"
},
{
    name: "Lever Seated Row",
    target: "Back",
    goal: ["Strength", "muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 10,
    image: "https://static.exercisedb.dev/media/7I6LNUG.gif"
},
{
    name: "Bayesian Cable Curl",
    target: "Biceps",
    goal: ["muscle"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 12,
    image: "https://static.exercisedb.dev/media/G08RZcQ.gif",
    targetMuscles: ["biceps"],
    secondaryMuscles: ["forearms"],
    equipmentDetails: ["cable machine", "single handle"],
    instructions: [
      "Set a cable handle near the floor and stand one step in front of it, facing away from the stack.",
      "Hold the handle with your arm slightly behind your torso and keep your shoulder still.",
      "Curl the handle toward your shoulder, squeeze the biceps, then lower it under control."
    ]
},
{
    name: "Single-Arm Cable Triceps Extension",
    target: "Triceps",
    goal: ["muscle"],
    difficulty: ["Beginner"],
    sets: 3,
    reps: 12,
    image: "https://static.exercisedb.dev/media/Gchi5Tr.gif",
    targetMuscles: ["triceps"],
    secondaryMuscles: ["forearms"],
    equipmentDetails: ["cable machine", "single handle"],
    instructions: [
      "Set the cable above head height and stand square to the machine.",
      "Pin your working elbow beside your torso with the forearm bent.",
      "Extend the elbow until the arm is straight, pause, then return slowly without moving the upper arm."
    ]
},

];


const exerciseImages = {
  "Push-ups": "assets/exercises/push-ups.jpg",
  "Bench Press": "assets/exercises/bench-press.jpg",
  "Incline Bench Press": "assets/exercises/incline-bench-press.jpg",
  "Dips": "assets/exercises/dips.jpg",
  "Cable Fly": "assets/exercises/cable-fly.jpg",
  "Pull-Up": "assets/exercises/pull-up.jpg",
  "Chest-Supported Row": "assets/exercises/chest-suported-row.jpg",
  "Lat Pulldown": "assets/exercises/lat-pulldown.jpg",
  "Seated Cable Row": "assets/exercises/seated-cable-row.jpg",
  "Barbell Bent-Over Row": "assets/exercises/barbell-bent-over-row.jpg",
  "One-Arm Dumbbell Row": "assets/exercises/one-arm-dumbbell-row.jpg",
  "Chest-Supported Dumbbell Row": "assets/exercises/chest-supported-dumbbell-row.jpg",
  "Assisted Pull-Up": "assets/exercises/assisted-pull-up.jpg",
  "T-Bar Row": "assets/exercises/t-bar-row.jpg",
  "Straight-Arm Cable Pulldown": "assets/exercises/straight-arm-cable-pulldown.jpg",
  "Barbell Bench Press": "assets/exercises/barbell-bench-press.jpg",
  "Dumbbell Bench Press": "assets/exercises/dumbbell-bench-press.jpg",
  "Incline Barbell Bench Press": "assets/exercises/incline-barbell-bench-press.png",
  "Incline Dumbbell Press": "assets/exercises/incline-dumbbell-press.jpg",
  "Chest Press Machine": "assets/exercises/chest-press-machine.jpg",
  "Pec Deck Fly": "assets/exercises/pec-deck-fly.jpg",
  "Cable Chest Fly": "assets/exercises/cable-chest-fly.jpg",
  "Dumbbell Chest Fly": "assets/exercises/dumbbell-chest-fly.jpg",
  "Dumbbell Shoulder Press": "assets/exercises/dumbbell-shoulder-press.jpg",
  "Barbell Overhead Press": "assets/exercises/barbell-overhead-press.jpg",
  "Shoulder Press Machine": "assets/exercises/shoulder-press-machine.jpg",
  "Dumbbell Lateral Raise": "assets/exercises/dumbbell-lateral-raise.jpg",
  "Cable Lateral Raise": "assets/exercises/cable-lateral-raise.jpg",
  "Rear Delt Fly Machine": "assets/exercises/rear-delt-fly-machine.jpg",
  "Dumbbell Rear Delt Fly": "assets/exercises/dumbbell-rear-delt-fly.jpg",
  "Cable Face Pull": "assets/exercises/cable-face-pull.jpg",
  "Barbell Curl": "assets/exercises/barbell-curl.jpg",
  "Dumbbell Curl": "assets/exercises/dumbbell-curl.jpg",
  "Hammer Curl": "assets/exercises/hammer-curl.jpg",
  "EZ-Bar Curl": "assets/exercises/ez-bar-curl.jpg",
  "Preacher Curl Machine": "assets/exercises/preacher-curl-machine.jpg",
  "Cable Curl": "assets/exercises/cable-curl.jpg",
  "Incline Dumbbell Curl": "assets/exercises/incline-dumbbell-curl.jpg",
  "Concentration Curl": "assets/exercises/concentration-curl.jpg",
  "Cable Triceps Pushdown": "assets/exercises/cable-triceps-pushdown.jpg",
  "Rope Triceps Pushdown": "assets/exercises/rope-triceps-pushdown.jpg",
  "Overhead Cable Triceps Extension": "assets/exercises/overhead-cable-triceps-extension.jpg",
  "Dumbbell Overhead Triceps Extension": "assets/exercises/dumbbell-overhead-triceps-extension.jpg",
  "Skull Crushers": "assets/exercises/skull-crushers.jpg",
  "Close-Grip Bench Press": "assets/exercises/close-grip-bench-press.jpg",
  "Assisted Dip Machine": "assets/exercises/assisted-dip-machine.jpg",
  "Triceps Extension Machine": "assets/exercises/triceps-extension-machine.jpg",
  "Barbell Back Squat": "assets/exercises/barbell-back-squat.jpg",
  "Front Squat": "assets/exercises/front-squat.jpg",
  "Leg Press": "assets/exercises/leg-press.jpg",
  "Hack Squat Machine": "assets/exercises/hack-squat-machine.jpg",
  "Leg Extension Machine": "assets/exercises/leg-extension-machine.jpg",
  "Dumbbell Goblet Squat": "assets/exercises/dumbbell-goblet-squat.jpg",
  "Bulgarian Split Squat": "assets/exercises/bulgarian-split-squat.jpg",
  "Dumbbell Walking Lunge": "assets/exercises/dumbbell-walking-lunge.jpg",
  "Romanian Deadlift": "assets/exercises/romanian-deadlift.jpg",
  "Barbell Stiff-Leg Deadlift": "assets/exercises/barbell-stiff-leg-deadlift.jpg",
  "Dumbbell Romanian Deadlift": "assets/exercises/dumbbell-romanian-deadlift.jpg",
  "Lying Leg Curl Machine": "assets/exercises/lying-leg-curl-machine.jpg",
  "Seated Leg Curl Machine": "assets/exercises/seated-leg-curl-machine.jpg",
  "Good Morning": "assets/exercises/good-morning.jpg",
  "Single-Leg Romanian Deadlift": "assets/exercises/single-leg-romanian-deadlift.png",
  "Cable Pull-Through": "assets/exercises/cable-pull-through.jpg",
  "Barbell Hip Thrust": "assets/exercises/barbell-hip-thrust.jpg",
  "Smith Machine Hip Thrust": "assets/exercises/smith-machine-hip-thrust.jpg",
  "Dumbbell Hip Thrust": "assets/exercises/dumbbell-hip-thrust.png",
  "Cable Glute Kickback": "assets/exercises/cable-glute-kickback.jpg",
  "Sumo Deadlift": "assets/exercises/sumo-deadlift.jpg",
  "Reverse Lunge": "assets/exercises/reverse-lunge.jpg",
  "Hip Abduction Machine": "assets/exercises/hip-abduction-machine.jpg",
  "Standing Calf Raise Machine": "assets/exercises-web/standing-calf-raise-machine-generated.png",
  "Seated Calf Raise Machine": "assets/exercises/seated-calf-raise-machine.jpg",
  "Leg Press Calf Raise": "assets/exercises/leg-press-calf-raise.jpg",
  "Smith Machine Calf Raise": "assets/exercises/smith-machine-calf-raise.jpg",
  "Dumbbell Standing Calf Raise": "assets/exercises/dumbbell-standing-calf-raise.jpg",
  "Single-Leg Calf Raise": "assets/exercises/single-leg-calf-raise.jpg",
  "Donkey Calf Raise Machine": "assets/exercises/donkey-calf-raise-machine.jpg",
  "Seated Dumbbell Calf Raise": "assets/exercises/seated-dumbbell-calf-raise.jpg"
};

// Complete detail records for saved movements whose names do not map cleanly
// to the local Free Exercise DB. These fields power the View Details dialog.
const savedExerciseDetails = {
  "Pull-Up": {
    equipmentDetails: ["pull-up bar"]
  },
  "Bulgarian Split Squat": {
    equipmentDetails: ["bench", "optional dumbbells"]
  },
  "Reverse Lunge": {
    equipmentDetails: ["body weight", "optional dumbbells"]
  },
  "Dips": {
    targetMuscles: ["pectorals", "triceps"], secondaryMuscles: ["front deltoids"], equipmentDetails: ["parallel bars"],
    instructions: ["Support yourself on parallel bars with the shoulders down and chest slightly forward.", "Bend the elbows and lower until the upper arms are about parallel with the floor.", "Press through the bars to return without shrugging the shoulders."]
  },
  "Chest-Supported Row": {
    targetMuscles: ["upper back", "lats"], secondaryMuscles: ["biceps", "rear deltoids"], equipmentDetails: ["chest-supported row machine"],
    instructions: ["Adjust the pad so your chest stays supported and grasp the handles.", "Pull the handles toward your lower ribs while drawing the shoulder blades together.", "Pause briefly, then extend the arms under control without lifting the chest."]
  },
  "Barbell Bent-Over Row": {
    targetMuscles: ["lats", "upper back"], secondaryMuscles: ["biceps", "rear deltoids", "spinal erectors"], equipmentDetails: ["barbell"],
    instructions: ["Hinge at the hips with a neutral spine and hold the bar below the knees.", "Brace your trunk and row the bar toward the lower ribs.", "Lower the bar under control while maintaining the same torso angle."]
  },
  "Chest-Supported Dumbbell Row": {
    targetMuscles: ["upper back", "lats"], secondaryMuscles: ["biceps", "rear deltoids"], equipmentDetails: ["dumbbells", "incline bench"],
    instructions: ["Lie chest-down on an incline bench with a dumbbell in each hand.", "Row both dumbbells toward the hips while keeping the chest on the pad.", "Lower until the arms are long without letting the shoulders roll forward."]
  },
  "Straight-Arm Cable Pulldown": {
    targetMuscles: ["lats"], secondaryMuscles: ["teres major", "triceps"], equipmentDetails: ["cable machine", "straight bar"],
    instructions: ["Set a cable above head height and hold the bar with nearly straight arms.", "Brace your torso and sweep the bar down toward the thighs.", "Return slowly until the lats are stretched without bending the elbows significantly."]
  },
  "Incline Barbell Bench Press": {
    targetMuscles: ["upper pectorals"], secondaryMuscles: ["triceps", "front deltoids"], equipmentDetails: ["barbell", "incline bench", "rack"],
    instructions: ["Set the bench to a low incline and plant both feet firmly.", "Unrack the bar and lower it toward the upper chest with stacked wrists.", "Press upward and slightly back until the elbows are extended."]
  },
  "Chest Press Machine": {
    targetMuscles: ["pectorals"], secondaryMuscles: ["triceps", "front deltoids"], equipmentDetails: ["chest press machine"],
    instructions: ["Adjust the seat so the handles align with mid-chest.", "Keep your back against the pad and press the handles forward.", "Return until the chest is comfortably stretched without letting the weight stack slam."]
  },
  "Pec Deck Fly": {
    targetMuscles: ["pectorals"], secondaryMuscles: ["front deltoids"], equipmentDetails: ["pec deck machine"],
    instructions: ["Adjust the seat so the elbows or handles align with the chest.", "Bring the arms together in a wide hugging motion without shrugging.", "Open the arms slowly to a comfortable chest stretch."]
  },
  "Cable Chest Fly": {
    targetMuscles: ["pectorals"], secondaryMuscles: ["front deltoids", "serratus anterior"], equipmentDetails: ["dual cable machine", "handles"],
    instructions: ["Stand between two pulleys with a staggered stance and soft elbows.", "Bring the handles together in front of the chest while keeping the torso still.", "Open the arms under control until the chest is comfortably stretched."]
  },
  "Dumbbell Chest Fly": {
    targetMuscles: ["pectorals"], secondaryMuscles: ["front deltoids"], equipmentDetails: ["dumbbells", "flat bench"],
    instructions: ["Lie on a bench with the dumbbells above the chest and elbows softly bent.", "Lower the arms in a wide arc until a comfortable chest stretch is reached.", "Reverse the arc and bring the dumbbells together without turning it into a press."]
  },
  "Barbell Overhead Press": {
    targetMuscles: ["deltoids"], secondaryMuscles: ["triceps", "upper chest", "trapezius"], equipmentDetails: ["barbell", "rack"],
    instructions: ["Hold the bar at upper-chest height with the forearms nearly vertical.", "Brace the trunk and press the bar overhead while moving the head slightly back.", "Finish with the bar stacked over the shoulders, then lower under control."]
  },
  "Shoulder Press Machine": {
    targetMuscles: ["deltoids"], secondaryMuscles: ["triceps", "upper chest"], equipmentDetails: ["shoulder press machine"],
    instructions: ["Adjust the seat so the handles begin around shoulder height.", "Keep the back supported and press overhead without shrugging.", "Lower the handles slowly until the elbows reach a comfortable depth."]
  },
  "Dumbbell Lateral Raise": {
    targetMuscles: ["side deltoids"], secondaryMuscles: ["upper trapezius"], equipmentDetails: ["dumbbells"],
    instructions: ["Stand tall with dumbbells by your sides and elbows softly bent.", "Raise the arms out to the sides until they approach shoulder height.", "Lower slowly and avoid swinging the torso or shrugging."]
  },
  "Cable Lateral Raise": {
    targetMuscles: ["side deltoids"], secondaryMuscles: ["upper trapezius"], equipmentDetails: ["cable machine", "single handle"],
    instructions: ["Set the cable low and hold the handle with the outside hand.", "Lead with the elbow and raise the arm out to shoulder height.", "Lower across the body under control while keeping the torso still."]
  },
  "Rear Delt Fly Machine": {
    targetMuscles: ["rear deltoids"], secondaryMuscles: ["rhomboids", "middle trapezius"], equipmentDetails: ["reverse pec deck machine"],
    instructions: ["Face the pad and adjust the handles to begin with arms forward.", "Open the arms wide while keeping the chest supported and shoulders down.", "Return slowly without letting the weight stack pull the shoulders forward."]
  },
  "Dumbbell Rear Delt Fly": {
    targetMuscles: ["rear deltoids"], secondaryMuscles: ["rhomboids", "middle trapezius"], equipmentDetails: ["dumbbells"],
    instructions: ["Hinge at the hips with a neutral spine and let the dumbbells hang.", "Raise the arms out and slightly back with soft elbows.", "Lower slowly without using momentum or extending the lower back."]
  },
  "Overhead Cable Triceps Extension": {
    targetMuscles: ["triceps"], secondaryMuscles: ["forearms"], equipmentDetails: ["cable machine", "rope attachment"],
    instructions: ["Face away from a high cable with the rope behind your head.", "Keep the elbows pointed forward and extend the arms overhead.", "Bend the elbows slowly to return while keeping the upper arms still."]
  },
  "Triceps Extension Machine": {
    targetMuscles: ["triceps"], secondaryMuscles: ["forearms"], equipmentDetails: ["triceps extension machine"],
    instructions: ["Adjust the seat and arm pad so the elbows align with the machine pivot.", "Extend the elbows until the arms are nearly straight.", "Return the handles slowly without lifting the elbows from the pad."]
  },
  "Barbell Back Squat": {
    targetMuscles: ["quadriceps", "glutes"], secondaryMuscles: ["hamstrings", "adductors", "core"], equipmentDetails: ["barbell", "squat rack"],
    instructions: ["Set the bar securely across the upper back and step out with a stable stance.", "Brace the trunk and sit down between the hips while the knees track over the feet.", "Drive through the whole foot to stand while keeping the chest controlled."]
  },
  "Dumbbell Walking Lunge": {
    targetMuscles: ["quadriceps", "glutes"], secondaryMuscles: ["hamstrings", "calves", "core"], equipmentDetails: ["dumbbells"],
    instructions: ["Stand tall with a dumbbell in each hand and take a controlled step forward.", "Lower until both knees are comfortably bent and the front foot stays planted.", "Push through the front foot, bring the rear leg through, and repeat on the other side."]
  },
  "Barbell Stiff-Leg Deadlift": {
    targetMuscles: ["hamstrings"], secondaryMuscles: ["glutes", "spinal erectors"], equipmentDetails: ["barbell"],
    instructions: ["Hold the bar at the thighs with knees softly bent and feet hip-width apart.", "Push the hips back and lower the bar close to the legs with a neutral spine.", "Stop at a strong hamstring stretch, then extend the hips to stand."]
  },
  "Smith Machine Hip Thrust": {
    targetMuscles: ["glutes"], secondaryMuscles: ["hamstrings", "adductors"], equipmentDetails: ["Smith machine", "bench", "bar pad"],
    instructions: ["Place the upper back on a bench and position the padded Smith bar over the hips.", "Plant the feet and drive the hips upward while keeping the ribs controlled.", "Squeeze the glutes at the top, then lower the hips slowly."]
  },
  "Dumbbell Hip Thrust": {
    targetMuscles: ["glutes"], secondaryMuscles: ["hamstrings", "adductors"], equipmentDetails: ["dumbbell", "bench"],
    instructions: ["Rest the upper back on a bench and place a padded dumbbell across the hips.", "Drive through the feet to lift the hips until the torso is level.", "Pause with the glutes contracted, then lower under control."]
  },
  "Hip Abduction Machine": {
    targetMuscles: ["gluteus medius", "gluteus minimus"], secondaryMuscles: ["tensor fasciae latae"], equipmentDetails: ["hip abduction machine"],
    instructions: ["Sit with the outer thighs against the pads and keep the pelvis stable.", "Press the knees outward through a comfortable range.", "Pause briefly, then return slowly without letting the weight stack slam."]
  },
  "Single-Leg Calf Raise": {
    targetMuscles: ["gastrocnemius", "soleus"], secondaryMuscles: ["foot stabilizers"], equipmentDetails: ["raised step", "optional support"],
    instructions: ["Stand on one forefoot at the edge of a stable step and hold support if needed.", "Lower the heel under control, then rise as high as comfortable.", "Pause at the top and complete all repetitions before changing sides."]
  },
  "Seated Dumbbell Calf Raise": {
    targetMuscles: ["soleus"], secondaryMuscles: ["gastrocnemius"], equipmentDetails: ["dumbbells", "bench", "raised step"],
    instructions: ["Sit with the forefeet on a raised surface and dumbbells secured above the knees.", "Lower the heels under control to stretch the calves.", "Press through the balls of the feet and raise the heels as high as comfortable."]
  },
  "Pendulum Squat Machine": {
    targetMuscles: ["quadriceps", "glutes"], secondaryMuscles: ["adductors", "hamstrings"], equipmentDetails: ["pendulum squat machine"],
    instructions: ["Set the shoulder pads and foot position so the back remains supported.", "Unlock the machine and descend while the knees track in line with the feet.", "Drive through the platform to stand without forcefully locking the knees."]
  },
  "Hip Thrust Machine": {
    targetMuscles: ["glutes"], secondaryMuscles: ["hamstrings", "adductors"], equipmentDetails: ["hip thrust machine"],
    instructions: ["Adjust the back support and secure the machine pad or belt across the hips.", "Drive through the feet and extend the hips while keeping the ribs down.", "Squeeze the glutes at full extension, then lower under control."]
  },
  "Plate-Loaded Iso-Lateral Row": {
    targetMuscles: ["lats", "upper back"], secondaryMuscles: ["biceps", "rear deltoids"], equipmentDetails: ["plate-loaded iso-lateral row machine"],
    instructions: ["Adjust the seat so the chest is supported and load both sides evenly.", "Pull the handles toward the torso while keeping the shoulders away from the ears.", "Extend the arms slowly and let the shoulder blades move naturally forward."]
  },
  "Lever Chest Press": {
    targetMuscles: ["pectorals"], secondaryMuscles: ["triceps", "front deltoids"], equipmentDetails: ["lever chest press machine"],
    instructions: ["Adjust the seat so the handles align with mid-chest.", "Keep the shoulder blades supported and press the handles forward.", "Return slowly until the chest is comfortably stretched."]
  },
  "Lever Seated Row": {
    targetMuscles: ["lats", "upper back"], secondaryMuscles: ["biceps", "rear deltoids"], equipmentDetails: ["lever seated row machine"],
    instructions: ["Adjust the seat and chest pad, then grasp the handles with long arms.", "Row toward the ribs while drawing the shoulder blades back and down.", "Return under control without rocking the torso."]
  }
};

workouts.forEach(function (workout) {
  Object.assign(workout, savedExerciseDetails[workout.name] || {});
});

// Expose the logged catalog to index.js without running a second app.
window.loggedWorkouts = workouts;
window.exerciseImages = exerciseImages;
