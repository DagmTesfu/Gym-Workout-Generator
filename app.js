const workouts = [
    {
    name: "Push-ups",
    target: "Chest and Triceps",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Bench Press",
    target: "Chest and Triceps",
    goal: "Strength",
    difficulty: "Begineer and Advanced",
    sets: 3,
    reps: 10
},
{
    name: "Incline Bench Press",
    target: "Chest",
    goal: "Strength and Muscle",
    difficulty: "Begineer and Advanced",
    sets: 3,
    reps: 10
},
{
    name: "Dips",
    target: "Chest and Triceps",
    goal: "Strength and Muscle",
    difficulty: "Begineer and Advanced",
    sets: 3,
    reps: 15
},
{
    name: "Cable Fly",
    target: "Chest",
    goal: "Muscle",
    difficulty: "Begineer and Advanced",
    sets: 3,
    reps: 12
},
{
    name: "Lat Pulldown",
    target: "Back(Lat Muscle)",
    goal: "Muscle",
    difficulty: "Begineer and Advanced",
    sets: 3,
    reps: 15
},
{
    name: "Pull-Up",
    target: "Back(Lat)",
    goal: "Muscle",
    difficulty: "Begineer and Advanced",
    sets: 3,
    reps: 10
},
{
    name: "Chest Suported Row",
    target: "Back",
    goal: "Muscle",
    difficulty: "Begineer and Advanced",
    sets: 3,
    reps: 15
},
{
    name: "Push-ups",
    target: "Ches and Triceps",
    goal: "Strength and Muscle",
    difficulty: "Begineer",
    sets: 3,
    reps: 15
},
{
    name: "Push-ups",
    target: "Ches and Triceps",
    goal: "Strength and Muscle",
    difficulty: "Begineer",
    sets: 3,
    reps: 15
},

{
    name: "Lat Pulldown",
    target: "Back",
    goal: ["muscle", "Athletic"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Seated Cable Row",
    target: "Back",
    goal: ["muscle", "Athletic"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Barbell Bent-Over Row",
    target: "Back",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "One-Arm Dumbbell Row",
    target: "Back",
    goal: ["muscle", "Athletic"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Chest-Supported Dumbbell Row",
    target: "Back",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Assisted Pull-Up",
    target: "Back",
    goal: ["muscle", "Athletic"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "T-Bar Row",
    target: "Back",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Straight-Arm Cable Pulldown",
    target: "Back",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Barbell Bench Press",
    target: "Chest",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Dumbbell Bench Press",
    target: "Chest",
    goal: ["muscle", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Incline Barbell Bench Press",
    target: "Chest",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Incline Dumbbell Press",
    target: "Chest",
    goal: ["muscle", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Chest Press Machine",
    target: "Chest",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Pec Deck Fly",
    target: "Chest",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Cable Chest Fly",
    target: "Chest",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Dumbbell Chest Fly",
    target: "Chest",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Dumbbell Shoulder Press",
    target: "Shoulders",
    goal: ["muscle", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Barbell Overhead Press",
    target: "Shoulders",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Shoulder Press Machine",
    target: "Shoulders",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Dumbbell Lateral Raise",
    target: "Shoulders",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Cable Lateral Raise",
    target: "Shoulders",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Rear Delt Fly Machine",
    target: "Shoulders",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Dumbbell Rear Delt Fly",
    target: "Shoulders",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Cable Face Pull",
    target: "Shoulders",
    goal: ["muscle", "Athletic"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Barbell Curl",
    target: "Biceps",
    goal: ["muscle", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Dumbbell Curl",
    target: "Biceps",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Hammer Curl",
    target: "Biceps",
    goal: ["muscle", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "EZ-Bar Curl",
    target: "Biceps",
    goal: ["muscle", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Preacher Curl Machine",
    target: "Biceps",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Cable Curl",
    target: "Biceps",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Incline Dumbbell Curl",
    target: "Biceps",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Concentration Curl",
    target: "Biceps",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Cable Triceps Pushdown",
    target: "Triceps",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Rope Triceps Pushdown",
    target: "Triceps",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Overhead Cable Triceps Extension",
    target: "Triceps",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Dumbbell Overhead Triceps Extension",
    target: "Triceps",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Skull Crushers",
    target: "Triceps",
    goal: ["muscle", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Close-Grip Bench Press",
    target: "Triceps",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Assisted Dip Machine",
    target: "Triceps",
    goal: ["muscle", "Athletic"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Triceps Extension Machine",
    target: "Triceps",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Barbell Back Squat",
    target: "Legs / Quadriceps",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Front Squat",
    target: "Legs / Quadriceps",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Leg Press",
    target: "Legs / Quadriceps",
    goal: ["muscle", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Hack Squat Machine",
    target: "Legs / Quadriceps",
    goal: ["muscle", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Leg Extension Machine",
    target: "Legs / Quadriceps",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Dumbbell Goblet Squat",
    target: "Legs / Quadriceps",
    goal: ["muscle", "Athletic"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Bulgarian Split Squat",
    target: "Legs / Quadriceps",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Dumbbell Walking Lunge",
    target: "Legs / Quadriceps",
    goal: ["muscle", "Athletic"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Romanian Deadlift",
    target: "Hamstrings",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Barbell Stiff-Leg Deadlift",
    target: "Hamstrings",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Dumbbell Romanian Deadlift",
    target: "Hamstrings",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Lying Leg Curl Machine",
    target: "Hamstrings",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Seated Leg Curl Machine",
    target: "Hamstrings",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Good Morning",
    target: "Hamstrings",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Single-Leg Romanian Deadlift",
    target: "Hamstrings",
    goal: ["muscle", "Athletic"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Cable Pull-Through",
    target: "Hamstrings",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Barbell Hip Thrust",
    target: "Glutes",
    goal: ["muscle", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Smith Machine Hip Thrust",
    target: "Glutes",
    goal: ["muscle", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Dumbbell Hip Thrust",
    target: "Glutes",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Cable Glute Kickback",
    target: "Glutes",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Bulgarian Split Squat",
    target: "Glutes",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Sumo Deadlift",
    target: "Glutes",
    goal: ["muscle", "Athletic", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Reverse Lunge",
    target: "Glutes",
    goal: ["muscle", "Athletic"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Hip Abduction Machine",
    target: "Glutes",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Standing Calf Raise Machine",
    target: "Calves",
    goal: ["muscle", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Seated Calf Raise Machine",
    target: "Calves",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Leg Press Calf Raise",
    target: "Calves",
    goal: ["muscle", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Smith Machine Calf Raise",
    target: "Calves",
    goal: ["muscle", "Strength"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Dumbbell Standing Calf Raise",
    target: "Calves",
    goal: ["muscle", "Athletic"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Single-Leg Calf Raise",
    target: "Calves",
    goal: ["muscle", "Athletic"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Donkey Calf Raise Machine",
    target: "Calves",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},
{
    name: "Seated Dumbbell Calf Raise",
    target: "Calves",
    goal: ["muscle"],
    difficulty: ["Begineer", "Intermidiate"],
    sets: 3,
    reps: 15
},

];
