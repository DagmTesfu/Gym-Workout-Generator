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
    target: "Legs / Quadriceps",
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
    name: "Bulgarian Split Squat",
    target: "Glutes",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Intermediate"],
    sets: 3,
    reps: 10
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

// Expose the logged catalog to index.js without running a second app.
window.loggedWorkouts = workouts;
window.exerciseImages = exerciseImages;
