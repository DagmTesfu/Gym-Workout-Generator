const goalSelect = document.getElementById("goal");
const bodyAreaSelect = document.getElementById("bodyArea");
const difficultySelect = document.getElementById("difficulty");
const equipmentSelect = document.getElementById("equipment");
const durationSelect = document.getElementById("duration");

const generateButton = document.getElementById("generateButton");
const clearButton = document.getElementById("clearButton");

const workoutList = document.getElementById("workoutList");
const errorMessage = document.getElementById("errorMessage");
const workoutAnimation = document.getElementById("workoutAnimation");
const workoutResults = document.getElementById("workoutResults");
const exerciseDialog = document.getElementById("exerciseDialog");
const closeExerciseDialogButton = document.getElementById("closeExerciseDialog");
const exerciseDialogImage = document.getElementById("exerciseDialogImage");
const exerciseDialogSource = document.getElementById("exerciseDialogSource");
const exerciseDialogTitle = document.getElementById("exerciseDialogTitle");
const exerciseDialogTargets = document.getElementById("exerciseDialogTargets");
const exerciseDialogSecondary = document.getElementById("exerciseDialogSecondary");
const exerciseDialogEquipment = document.getElementById("exerciseDialogEquipment");
const exerciseDialogInstructions = document.getElementById("exerciseDialogInstructions");

const apiExercisesByBodyPart = new Map();
let localExerciseDetailsPromise;
let displayedWorkouts = [];

const apiBodyPartBySelection = {
  Back: "back",
  Chest: "chest",
  Biceps: "upper arms",
  Triceps: "upper arms",
  Shoulders: "shoulders",
  "Legs / Quadriceps": "upper legs",
  Glutes: "upper legs",
  Hamstrings: "upper legs",
  Calves: "lower legs"
};

// These legacy variants have safer alternatives with the same training benefit.
const excludedExercisePattern =
  /behind[- ]the[- ]neck|behind neck|partner leg throw|squat(?:ting)? on (?:a )?(?:stability )?ball|jump(?:ing)? on stacked plates/i;

// ExerciseDB muscle names do not exactly match the labels used by the form.
const bodyAreaByMuscle = {
  back: "Back",
  biceps: "Biceps",
  calves: "Calves",
  chest: "Chest",
  delts: "Shoulders",
  glutes: "Glutes",
  hamstrings: "Hamstrings",
  lats: "Back",
  pectorals: "Chest",
  quads: "Legs / Quadriceps",
  spine: "Back",
  shoulders: "Shoulders",
  traps: "Back",
  triceps: "Triceps",
  "upper back": "Back"
};


// Escape text received from the API before placing it inside an HTML template.
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


// Normalize punctuation and simple plurals so "Push-ups" can match "push up".
function normalizeExerciseName(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(" ")
    .map(function (word) {
      return word.endsWith("s") && !word.endsWith("ss") && word.length > 3
        ? word.slice(0, -1)
        : word;
    })
    .join(" ");
}


function findRelatedExercise(exerciseMap, exerciseName) {
  const normalizedName = normalizeExerciseName(exerciseName);
  const exactMatch = exerciseMap.get(normalizedName);
  if (exactMatch) {
    return exactMatch;
  }

  const candidates = [...exerciseMap.entries()].filter(function ([candidateName]) {
    return normalizedName.length >= 6 && (
      candidateName.includes(normalizedName) ||
      normalizedName.includes(candidateName)
    );
  }).sort(function ([firstName], [secondName]) {
    return Math.abs(firstName.length - normalizedName.length) -
      Math.abs(secondName.length - normalizedName.length);
  });

  return candidates[0]?.[1] || null;
}


function getEquipmentCategories(equipmentText, exerciseName) {
  const text = `${equipmentText} ${exerciseName}`.toLowerCase();
  const categories = [];

  if (/body weight|bodyweight|push-up|push up|pull-up|pull up|\bdips?\b/.test(text)) {
    categories.push("Bodyweight");
  }
  if (/dumbbell/.test(text)) {
    categories.push("Dumbbells");
  }
  if (/barbell|ez-bar|ez bar/.test(text)) {
    categories.push("Barbells");
  }
  if (/cable|band|rope/.test(text)) {
    categories.push("Cables");
  }
  if (/machine|lever|sled|smith|leg press|pec deck|assisted/.test(text)) {
    categories.push("Machines");
  }

  return categories.length > 0 ? [...new Set(categories)] : ["Other"];
}


function playWorkoutAnimation() {
  generateButton.classList.add("is-working");
  workoutAnimation.classList.remove("is-active");
  // Reading offsetWidth forces the browser to restart the CSS animation.
  void workoutAnimation.offsetWidth;
  workoutAnimation.classList.add("is-active");

  setTimeout(function () {
    generateButton.classList.remove("is-working");
    workoutAnimation.classList.remove("is-active");
  }, 750);
}


async function fetchWorkouts(selectedBodyArea) {
  const buttonLabel = generateButton.querySelector(".button-label");
  const apiBodyPart = apiBodyPartBySelection[selectedBodyArea];

  if (apiExercisesByBodyPart.has(apiBodyPart)) {
    return apiExercisesByBodyPart.get(apiBodyPart);
  }

  try {
    generateButton.disabled = true;
    buttonLabel.textContent = "Loading recommendations...";

    const requestPromise = (async function () {
      const query = new URLSearchParams({
        bodyParts: apiBodyPart,
        limit: "25"
      });

      // Prefer the same-origin Node proxy, but support ordinary static servers
      // by falling back to ExerciseDB's browser-accessible first page.
      const urls = [
        `/api/exercises?${query}`,
        `https://oss.exercisedb.dev/api/v1/exercises?${query}`
      ];

      for (const url of urls) {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            continue;
          }

          const result = await response.json();
          if (Array.isArray(result?.data)) {
            return result.data;
          }
        } catch (error) {
          console.warn(`Exercise source failed: ${url}`, error);
        }
      }

      return [];
    })();

    apiExercisesByBodyPart.set(apiBodyPart, requestPromise);
    const exercises = await requestPromise;
    if (exercises.length === 0) {
      // Do not cache an outage; the next Generate click may retry.
      apiExercisesByBodyPart.delete(apiBodyPart);
    }
    return exercises;
  } catch (error) {
    apiExercisesByBodyPart.delete(apiBodyPart);
    console.warn("Online recommendations are temporarily unavailable.", error);
    return [];
  } finally {
    generateButton.disabled = false;
    buttonLabel.textContent = "Generate workout";
  }
}


async function fetchLocalExerciseDetails() {
  if (!localExerciseDetailsPromise) {
    localExerciseDetailsPromise = fetch("assets/exercise-database.json")
      .then(function (response) {
        if (!response.ok) {
          throw new Error(`Could not load local exercise details (${response.status})`);
        }
        return response.json();
      })
      .then(function (exercises) {
        return new Map(exercises.map(function (exercise) {
          return [normalizeExerciseName(exercise.name), exercise];
        }));
      })
      .catch(function (error) {
        console.warn("Local exercise details are unavailable.", error);
        return new Map();
      });
  }

  return localExerciseDetailsPromise;
}


async function generateWorkout() {
  const selectedGoal = goalSelect.value;
  const selectedBodyArea = bodyAreaSelect.value;
  const selectedDifficulty = difficultySelect.value;
  const selectedEquipment = equipmentSelect.value;
  const selectedDuration = durationSelect.value;

  // All five values are required to create a focused workout.
  if (
    selectedGoal === "" ||
    selectedBodyArea === "" ||
    selectedDifficulty === "" ||
    selectedEquipment === "" ||
    selectedDuration === ""
  ) {
    errorMessage.textContent = "Please select all five options.";
    return;
  }

  errorMessage.textContent = "";
  playWorkoutAnimation();

  const [exercises, localExerciseDetails] = await Promise.all([
    fetchWorkouts(selectedBodyArea),
    fetchLocalExerciseDetails()
  ]);

  workoutResults.scrollIntoView({ behavior: "smooth", block: "start" });

  // Convert API records and assign the difficulty data that ExerciseDB omits.
  const apiWorkouts = exercises.map(function (exercise) {
    const muscles = [
      ...(exercise.targetMuscles || []),
      ...(exercise.secondaryMuscles || []),
      ...(exercise.bodyParts || [])
    ];
    const equipmentText = (exercise.equipments || []).join(" ").toLowerCase();
    const name = exercise.name || "Unnamed exercise";
    const isFoundationalEquipment =
      /body weight|band|assisted|leverage machine/.test(equipmentText);
    const goals = ["muscle", "Strength"];

    if (/body weight|band|rope|sled/.test(equipmentText)) {
      goals.push("Athletic");
    }

    return {
      name,
      target: muscles.map(function (muscle) {
        return bodyAreaByMuscle[muscle.toLowerCase()];
      }).filter(Boolean),
      goal: goals,
      difficulty: isFoundationalEquipment ? "Foundational" : "Technical",
      equipment: getEquipmentCategories(equipmentText, name),
      sets: 3,
      reps: goals.includes("Strength") ? 8 : 12,
      image: exercise.gifUrl,
      source: "ExerciseDB",
      instructions: Array.isArray(exercise.instructions)
        ? exercise.instructions
        : [],
      targetMuscles: exercise.targetMuscles || [],
      secondaryMuscles: exercise.secondaryMuscles || [],
      equipmentDetails: exercise.equipments || [],
      gif: exercise.gifUrl || ""
    };

  }).filter(function (workout) {
    return !excludedExercisePattern.test(workout.name);
  });

  // Normalize the saved app.js workouts to the same card shape.
  const savedWorkouts = (window.loggedWorkouts || []).map(function (workout) {
    const localDetails = findRelatedExercise(localExerciseDetails, workout.name);
    const imagePath = workout.image || window.exerciseImages?.[workout.name] || "";
    const optimizedImagePath = imagePath.startsWith("assets/exercises/")
      ? imagePath
          .replace("assets/exercises/", "assets/exercises-web/")
          .replace(/\.(jpg|png)$/, ".jpg")
      : imagePath;

    return {
      name: workout.name,
      target: [workout.target],
      goal: workout.goal,
      difficulty: workout.difficulty[0] === "Beginner"
        ? "Foundational"
        : "Technical",
      equipment: getEquipmentCategories("", workout.name),
      sets: workout.sets,
      reps: workout.reps,
      image: optimizedImagePath,
      source: "Saved workout",
      instructions: Array.isArray(workout.instructions)
        ? workout.instructions
        : localDetails?.instructions || [],
      targetMuscles:
        (Array.isArray(workout.targetMuscles) && workout.targetMuscles.length > 0)
          ? workout.targetMuscles
          : localDetails?.primaryMuscles || [workout.target],
      secondaryMuscles:
        Array.isArray(workout.secondaryMuscles)
          ? workout.secondaryMuscles
          : localDetails?.secondaryMuscles || [],
      equipmentDetails:
        (Array.isArray(workout.equipmentDetails) && workout.equipmentDetails.length > 0)
          ? workout.equipmentDetails
          : localDetails?.equipment
            ? [localDetails.equipment]
            : getEquipmentCategories("", workout.name),
      gif: /\.gif(?:$|\?)/i.test(optimizedImagePath)
        ? optimizedImagePath
        : ""
    };
  }).filter(function (workout) {
    return !excludedExercisePattern.test(workout.name);
  });

  // Merge duplicates: retain saved programming but upgrade its static image
  // to the API's animated movement demo when an exact name is available.
  const apiByName = new Map(apiWorkouts.map(function (workout) {
    return [normalizeExerciseName(workout.name), workout];
  }));
  const mergedSavedWorkouts = savedWorkouts.map(function (workout) {
    const savedName = normalizeExerciseName(workout.name);
    let matchedKey = savedName;
    let apiMatch = apiByName.get(savedName);

    // Accept a close equipment-prefixed name such as "barbell bench press".
    if (!apiMatch) {
      const candidates = [...apiByName.entries()].filter(function ([apiName]) {
        return apiName.endsWith(savedName) || savedName.endsWith(apiName);
      }).sort(function ([firstName], [secondName]) {
        return Math.abs(firstName.length - savedName.length) -
          Math.abs(secondName.length - savedName.length);
      });

      if (candidates.length > 0) {
        [matchedKey, apiMatch] = candidates[0];
      }
    }

    if (!apiMatch) {
      return workout;
    }

    apiByName.delete(matchedKey);
    return {
      ...workout,
      image: apiMatch.image || workout.image,
      gif: apiMatch.gif || workout.gif,
      instructions: apiMatch.instructions.length > 0
        ? apiMatch.instructions
        : workout.instructions,
      targetMuscles: apiMatch.targetMuscles.length > 0
        ? apiMatch.targetMuscles
        : workout.targetMuscles,
      secondaryMuscles: apiMatch.secondaryMuscles.length > 0
        ? apiMatch.secondaryMuscles
        : workout.secondaryMuscles,
      equipmentDetails: apiMatch.equipmentDetails.length > 0
        ? apiMatch.equipmentDetails
        : workout.equipmentDetails,
      source: "Saved + animated API demo"
    };
  });
  function matchesCoreSelection(workout) {
    return (
      workout.target.some(function (target) {
        return target.includes(selectedBodyArea);
      }) &&
      (selectedDifficulty === "Any" ||
        workout.difficulty === selectedDifficulty) &&
      (selectedEquipment === "Any" ||
        workout.equipment.includes(selectedEquipment))
    );
  }

  const exactSavedWorkouts = mergedSavedWorkouts.filter(function (workout) {
    return matchesCoreSelection(workout) && workout.goal.includes(selectedGoal);
  });
  const adaptableSavedWorkouts = mergedSavedWorkouts.filter(function (workout) {
    return matchesCoreSelection(workout) && !workout.goal.includes(selectedGoal);
  }).map(function (workout) {
    return {
      ...workout,
      reps: selectedGoal === "Strength" ? 8 : 12,
      source: `${workout.source} · adapted to goal`
    };
  });
  const savedCandidates = [...exactSavedWorkouts, ...adaptableSavedWorkouts];
  const apiCandidates = [...apiByName.values()].filter(function (workout) {
    return matchesCoreSelection(workout) && workout.goal.includes(selectedGoal);
  });

  const sessionSizeByDuration = { "20": 4, "30": 6, "45": 8, "60": 10 };
  const sessionSize = sessionSizeByDuration[selectedDuration];
  const savedQuota = apiCandidates.length > 0
    ? Math.ceil(sessionSize * 0.7)
    : sessionSize;
  const filteredSavedWorkouts = savedCandidates.slice(0, savedQuota);
  let filteredApiWorkouts = apiCandidates.slice(
    0,
    sessionSize - filteredSavedWorkouts.length
  );

  // Fill unused API slots with more saved workouts, then use extra API results.
  let openSlots = sessionSize -
    filteredSavedWorkouts.length -
    filteredApiWorkouts.length;
  if (openSlots > 0) {
    filteredSavedWorkouts.push(
      ...savedCandidates.slice(savedQuota, savedQuota + openSlots)
    );
  }
  openSlots = sessionSize -
    filteredSavedWorkouts.length -
    filteredApiWorkouts.length;
  if (openSlots > 0) {
    filteredApiWorkouts = [
      ...filteredApiWorkouts,
      ...apiCandidates.slice(filteredApiWorkouts.length, filteredApiWorkouts.length + openSlots)
    ];
  }

  const totalMatches = filteredSavedWorkouts.length + filteredApiWorkouts.length;

  if (totalMatches === 0) {
    displayedWorkouts = [];
    workoutList.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon" aria-hidden="true">!</span>
        <div>
          <strong>No exact match this time.</strong>
          <p>Try Any complexity, Any equipment, or another body area.</p>
        </div>
      </div>
    `;
    return;
  }

  function buildCards(workouts, startIndex) {
    return workouts.map(function (workout, index) {
      const cardIndex = startIndex + index;
      const safeName = escapeHtml(workout.name);
      const safeImage = escapeHtml(workout.image);
      const mediaLabel = /\.gif(?:$|\?)/i.test(workout.image)
        ? "Animated demo"
        : "Exercise photo";

      return `
        <article class="exercise-card" style="animation-delay: ${cardIndex * 55}ms">
          <div class="exercise-visual">
            <img
              src="${safeImage}"
              alt="${safeName} exercise demonstration"
              loading="${cardIndex < 3 ? "eager" : "lazy"}"
              decoding="async"
            >
            <span class="exercise-number">${String(cardIndex + 1).padStart(2, "0")}</span>
            <span class="exercise-media-label">${mediaLabel}</span>
          </div>
          <div class="exercise-content">
            <span class="exercise-target">${workout.target.join(" / ")}</span>
            <h3>${safeName}</h3>
            <div class="exercise-prescription">
              <div><strong>${workout.sets}</strong><span>Sets</span></div>
              <div><strong>${workout.reps}</strong><span>Reps</span></div>
            </div>
            <div class="exercise-meta">
              <span>${workout.difficulty} &middot; ${workout.equipment.join(" / ")}</span>
              <span>${workout.source}</span>
            </div>
            <button
              class="details-button"
              type="button"
              data-workout-index="${cardIndex}"
              aria-label="View details for ${safeName}"
            >
              View details
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </article>
      `;
    }).join("");
  }

  const savedSection = filteredSavedWorkouts.length > 0
    ? `
      <div class="catalog-heading">
        <strong>Your saved workouts</strong>
        <span>${filteredSavedWorkouts.length} matches</span>
      </div>
      ${buildCards(filteredSavedWorkouts, 0)}
    `
    : "";
  const apiSection = `
    <div class="catalog-heading catalog-heading-online">
      <strong>Online recommendations</strong>
      <span>${filteredApiWorkouts.length > 0
        ? `${filteredApiWorkouts.length} matches`
        : exercises.length > 0
          ? "No online matches for these filters"
          : "Temporarily unavailable"}</span>
    </div>
    ${buildCards(filteredApiWorkouts, filteredSavedWorkouts.length)}
  `;

  displayedWorkouts = [...filteredSavedWorkouts, ...filteredApiWorkouts];
  workoutList.innerHTML = savedSection + apiSection;
}


function formatDetailList(values, fallback) {
  const items = Array.isArray(values) ? values.filter(Boolean) : [];
  return items.length > 0 ? items.join(", ") : fallback;
}


function showExerciseDetails(workout) {
  const detailImage = workout.gif || workout.image;
  exerciseDialogImage.src = detailImage;
  exerciseDialogImage.alt = `${workout.name} exercise demonstration`;
  exerciseDialogSource.textContent = workout.source;
  exerciseDialogTitle.textContent = workout.name;
  exerciseDialogTargets.textContent = formatDetailList(
    workout.targetMuscles,
    workout.target.join(", ")
  );
  exerciseDialogSecondary.textContent = formatDetailList(
    workout.secondaryMuscles,
    "Not listed"
  );
  exerciseDialogEquipment.textContent = formatDetailList(
    workout.equipmentDetails,
    workout.equipment.join(", ")
  );

  exerciseDialogInstructions.replaceChildren();
  const instructions = workout.instructions.length > 0
    ? workout.instructions
    : [
        "Detailed instructions are not available for this saved exercise yet. " +
        "Use the demonstration as a visual reference and keep the movement controlled."
      ];

  const instructionFragment = document.createDocumentFragment();
  instructions.forEach(function (instruction) {
    const item = document.createElement("li");
    item.textContent = String(instruction).replace(/^Step:\s*\d+\s*/i, "");
    instructionFragment.appendChild(item);
  });
  exerciseDialogInstructions.appendChild(instructionFragment);

  exerciseDialog.showModal();
}


function clearWorkout() {
  goalSelect.value = "";
  bodyAreaSelect.value = "";
  difficultySelect.value = "";
  equipmentSelect.value = "";
  durationSelect.value = "";
  errorMessage.textContent = "";
  displayedWorkouts = [];

  if (exerciseDialog.open) {
    exerciseDialog.close();
  }

  workoutList.innerHTML = `
    <div class="empty-state">
      <span class="empty-icon" aria-hidden="true">&nearr;</span>
      <div>
        <strong>Your session starts here.</strong>
        <p>Select your preferences above to search saved and online exercises.</p>
      </div>
    </div>
  `;
}


generateButton.addEventListener("click", generateWorkout);
clearButton.addEventListener("click", clearWorkout);

workoutList.addEventListener("click", function (event) {
  const detailsButton = event.target.closest(".details-button");
  if (!detailsButton) {
    return;
  }

  const workout = displayedWorkouts[Number(detailsButton.dataset.workoutIndex)];
  if (workout) {
    showExerciseDetails(workout);
  }
});

closeExerciseDialogButton.addEventListener("click", function () {
  exerciseDialog.close();
});

exerciseDialog.addEventListener("click", function (event) {
  if (event.target === exerciseDialog) {
    exerciseDialog.close();
  }
});
