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
const workoutProgress = document.getElementById("workoutProgress");
const workoutProgressText = document.getElementById("workoutProgressText");
const workoutProgressPercent = document.getElementById("workoutProgressPercent");
const workoutProgressBar = document.getElementById("workoutProgressBar");
const workoutProgressFill = document.getElementById("workoutProgressFill");
const workoutCompleteMessage = document.getElementById("workoutCompleteMessage");
const workoutTimer = document.getElementById("workoutTimer");
const workoutDraftDialog = document.getElementById("workoutDraftDialog");
const workoutDraftSummary = document.getElementById("workoutDraftSummary");
const resumeWorkoutDraftButton = document.getElementById("resumeWorkoutDraft");
const discardWorkoutDraftButton = document.getElementById("discardWorkoutDraft");
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
let replacementCandidates = [];
const workoutLogState = new Map();
let activeSession = null;
let pendingSavedSession = null;
let workoutTimerInterval = null;
let workoutTimerStartedAt = null;
let draftSaveTimeout = null;

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
const lowValueApiPattern =
  /\bvariation\b|with classic|\bimpossible\b|deep smith machine reverse decline|barbell bench squat|squat \(on knees\)/i;
const establishedMovementPattern =
  /press|row|pulldown|pull-down|pull-up|chin-up|curl|extension|raise|squat|lunge|deadlift|hip thrust|fly|push-up|dip/i;

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


// Session logging stays separate from saved and API catalog records.
function createExerciseLogState(workout) {
  const plannedSetCount = Math.max(1, Number.parseInt(workout.sets, 10) || 1);
  const plannedReps = String(workout.reps ?? "");

  return {
    instanceId: WorkoutLog.createId("exercise"),
    completed: false,
    dirty: false,
    notes: "",
    nextSetId: plannedSetCount + 1,
    sets: Array.from({ length: plannedSetCount }, function (_, index) {
      return {
        id: index + 1,
        weight: "",
        actualReps: plannedReps,
        rpe: "",
        completed: false
      };
    })
  };
}


function initializeWorkoutLogState(workouts) {
  workoutLogState.clear();
  workouts.forEach(function (workout, index) {
    workoutLogState.set(index, createExerciseLogState(workout));
  });
}


function hasEnteredWorkoutData() {
  return [...workoutLogState.values()].some(function (exerciseLog) {
    return exerciseLog.dirty;
  });
}


function getExerciseLogState(workout, cardIndex) {
  if (!workoutLogState.has(cardIndex)) {
    workoutLogState.set(cardIndex, createExerciseLogState(workout));
  }
  return workoutLogState.get(cardIndex);
}


function getElapsedWorkoutSeconds() {
  if (!activeSession) {
    return 0;
  }

  const runningSeconds = workoutTimerStartedAt === null
    ? 0
    : Math.floor((Date.now() - workoutTimerStartedAt) / 1000);
  return Math.max(0, Math.floor(activeSession.elapsedSeconds || 0) + runningSeconds);
}


function updateWorkoutTimerDisplay() {
  workoutTimer.textContent = WorkoutLog.formatElapsedTime(
    getElapsedWorkoutSeconds()
  );
}


function buildActiveSessionSnapshot() {
  if (!activeSession) {
    return null;
  }

  return {
    ...activeSession,
    elapsedSeconds: getElapsedWorkoutSeconds(),
    displayedWorkouts,
    replacementCandidates,
    exerciseLogs: displayedWorkouts.map(function (_, index) {
      return workoutLogState.get(index);
    })
  };
}


function saveActiveWorkoutNow() {
  const snapshot = buildActiveSessionSnapshot();
  if (!snapshot) {
    return;
  }

  const result = WorkoutLog.saveActiveSession(snapshot);
  if (!result.ok) {
    console.warn("The active workout draft could not be saved.", result.error);
    errorMessage.textContent =
      "This workout could not be saved in your browser. Keep this page open.";
  }
}


function queueActiveWorkoutSave() {
  if (!activeSession) {
    return;
  }

  window.clearTimeout(draftSaveTimeout);
  draftSaveTimeout = window.setTimeout(saveActiveWorkoutNow, 250);
}


function startWorkoutTimer() {
  if (!activeSession || workoutTimerStartedAt !== null) {
    return;
  }

  workoutTimerStartedAt = Date.now();
  updateWorkoutTimerDisplay();
  window.clearInterval(workoutTimerInterval);
  workoutTimerInterval = window.setInterval(function () {
    const elapsedSeconds = getElapsedWorkoutSeconds();
    workoutTimer.textContent = WorkoutLog.formatElapsedTime(elapsedSeconds);
    if (elapsedSeconds > 0 && elapsedSeconds % 15 === 0) {
      saveActiveWorkoutNow();
    }
  }, 1000);
}


function pauseWorkoutTimer() {
  if (activeSession && workoutTimerStartedAt !== null) {
    activeSession.elapsedSeconds = getElapsedWorkoutSeconds();
  }
  workoutTimerStartedAt = null;
  window.clearInterval(workoutTimerInterval);
  workoutTimerInterval = null;
  updateWorkoutTimerDisplay();
}


function discardActiveWorkout() {
  window.clearTimeout(draftSaveTimeout);
  draftSaveTimeout = null;
  pauseWorkoutTimer();
  activeSession = null;
  WorkoutLog.clearActiveSession();
  workoutTimer.textContent = "00:00";
}


function beginActiveWorkout(preferences, savedWorkoutCount, onlineStatus) {
  activeSession = WorkoutLog.createActiveSession({
    preferences,
    savedWorkoutCount,
    onlineStatus,
    displayedWorkouts,
    replacementCandidates,
    exerciseLogs: displayedWorkouts.map(function (_, index) {
      return workoutLogState.get(index);
    })
  });
  startWorkoutTimer();
  saveActiveWorkoutNow();
}


function buildSetRow(set, setIndex, cardIndex, canRemove) {
  const safeWeight = escapeHtml(set.weight);
  const safeReps = escapeHtml(set.actualReps);
  const safeRpe = escapeHtml(set.rpe);
  const checkedAttribute = set.completed ? " checked" : "";
  const disabledAttribute = canRemove ? "" : " disabled";

  return `
    <div class="set-log-row" data-set-id="${set.id}">
      <span class="set-log-number">${setIndex + 1}</span>
      <label class="set-log-field">
        <span>kg</span>
        <input
          class="set-log-input"
          type="number"
          min="0"
          step="any"
          inputmode="decimal"
          value="${safeWeight}"
          data-workout-index="${cardIndex}"
          data-set-id="${set.id}"
          data-log-field="weight"
          aria-label="Set ${setIndex + 1} weight in kilograms"
        >
      </label>
      <label class="set-log-field">
        <span>Reps</span>
        <input
          class="set-log-input"
          type="number"
          min="0"
          step="1"
          inputmode="numeric"
          value="${safeReps}"
          data-workout-index="${cardIndex}"
          data-set-id="${set.id}"
          data-log-field="actualReps"
          aria-label="Set ${setIndex + 1} actual repetitions"
        >
      </label>
      <label class="set-log-field">
        <span>RPE</span>
        <input
          class="set-log-input"
          type="number"
          min="1"
          max="10"
          step="0.5"
          inputmode="decimal"
          value="${safeRpe}"
          data-workout-index="${cardIndex}"
          data-set-id="${set.id}"
          data-log-field="rpe"
          aria-label="Set ${setIndex + 1} optional RPE from 1 to 10"
        >
      </label>
      <label class="set-log-done">
        <input
          class="set-complete-checkbox"
          type="checkbox"
          data-workout-index="${cardIndex}"
          data-set-id="${set.id}"
          aria-label="Mark set ${setIndex + 1} complete"${checkedAttribute}
        >
        <span>Done</span>
      </label>
      <button
        class="remove-set-button"
        type="button"
        data-workout-index="${cardIndex}"
        data-set-id="${set.id}"
        aria-label="Remove set ${setIndex + 1}"${disabledAttribute}
      >&times;</button>
    </div>
  `;
}


function buildExerciseLogger(workout, cardIndex) {
  const exerciseLog = getExerciseLogState(workout, cardIndex);
  const safeInstanceId = escapeHtml(exerciseLog.instanceId);
  const completedSets = exerciseLog.sets.filter(function (set) {
    return set.completed;
  }).length;
  const canRemove = exerciseLog.sets.length > 1;
  const setRows = exerciseLog.sets.map(function (set, index) {
    return buildSetRow(set, index, cardIndex, canRemove);
  }).join("");

  return `
    <details class="exercise-logger" data-workout-index="${cardIndex}">
      <summary>
        <span>Log sets</span>
        <span class="logger-status">${completedSets} / ${exerciseLog.sets.length} done</span>
      </summary>
      <div class="exercise-logger-content">
        <div class="set-log-heading" aria-hidden="true">
          <span>Set</span><span>kg</span><span>Reps</span><span>RPE</span><span>Done</span><span></span>
        </div>
        <div class="set-log-list">${setRows}</div>
        <button
          class="add-set-button"
          type="button"
          data-workout-index="${cardIndex}"
        >+ Add set</button>
        <label class="exercise-notes-label" for="exercise-notes-${safeInstanceId}">
          <span>Exercise notes</span>
          <textarea
            id="exercise-notes-${safeInstanceId}"
            class="exercise-notes"
            rows="2"
            maxlength="500"
            data-workout-index="${cardIndex}"
            data-log-field="notes"
            placeholder="Form cues, adjustments, or how the exercise felt"
          >${escapeHtml(exerciseLog.notes)}</textarea>
        </label>
      </div>
    </details>
  `;
}


// Recount the rendered checkboxes so progress always reflects the visible workout.
function updateWorkoutProgress() {
  const exerciseCheckboxes = workoutList.querySelectorAll(
    ".exercise-complete-checkbox"
  );
  const completedCheckboxes = workoutList.querySelectorAll(
    ".exercise-complete-checkbox:checked"
  );
  const total = exerciseCheckboxes.length;
  const completed = completedCheckboxes.length;
  const percentage = total > 0
    ? Math.round((completed / total) * 100)
    : 0;

  workoutProgressText.textContent =
    `Workout Progress: ${completed} of ${total} completed`;
  workoutProgressPercent.textContent = `${percentage}%`;
  workoutProgressFill.style.width = `${percentage}%`;
  workoutProgressBar.setAttribute("aria-valuenow", String(percentage));
  workoutProgressBar.setAttribute(
    "aria-valuetext",
    `${completed} of ${total} exercises completed`
  );
  workoutCompleteMessage.hidden = !(total > 0 && completed === total);
  workoutProgress.hidden = total === 0;
}


function updateLoggerStatus(cardIndex) {
  const exerciseLog = workoutLogState.get(cardIndex);
  const status = workoutList.querySelector(
    `.exercise-logger[data-workout-index="${cardIndex}"] .logger-status`
  );
  if (!exerciseLog || !status) {
    return;
  }

  const completedSets = exerciseLog.sets.filter(function (set) {
    return set.completed;
  }).length;
  status.textContent = `${completedSets} / ${exerciseLog.sets.length} done`;
}


function synchronizeExerciseCompletion(cardIndex) {
  const exerciseLog = workoutLogState.get(cardIndex);
  const exerciseCheckbox = workoutList.querySelector(
    `.exercise-complete-checkbox[data-workout-index="${cardIndex}"]`
  );
  if (!exerciseLog || !exerciseCheckbox) {
    return;
  }

  const completedSets = exerciseLog.sets.filter(function (set) {
    return set.completed;
  }).length;
  const allSetsCompleted = completedSets === exerciseLog.sets.length;
  const someSetsCompleted = completedSets > 0 && !allSetsCompleted;

  exerciseLog.completed = allSetsCompleted;
  exerciseCheckbox.checked = allSetsCompleted;
  exerciseCheckbox.indeterminate = someSetsCompleted;
  updateLoggerStatus(cardIndex);
  updateWorkoutProgress();
  queueActiveWorkoutSave();
}


function setAllExerciseSetsCompleted(cardIndex, completed) {
  const exerciseLog = workoutLogState.get(cardIndex);
  if (!exerciseLog) {
    return;
  }

  exerciseLog.dirty = true;
  exerciseLog.completed = completed;
  exerciseLog.sets.forEach(function (set) {
    set.completed = completed;
  });

  workoutList.querySelectorAll(
    `.set-complete-checkbox[data-workout-index="${cardIndex}"]`
  ).forEach(function (checkbox) {
    checkbox.checked = completed;
  });

  const exerciseCheckbox = workoutList.querySelector(
    `.exercise-complete-checkbox[data-workout-index="${cardIndex}"]`
  );
  if (exerciseCheckbox) {
    exerciseCheckbox.checked = completed;
    exerciseCheckbox.indeterminate = false;
  }

  updateLoggerStatus(cardIndex);
  updateWorkoutProgress();
  queueActiveWorkoutSave();
}


function replaceExerciseLogger(cardIndex) {
  const workout = displayedWorkouts[cardIndex];
  const currentLogger = workoutList.querySelector(
    `.exercise-logger[data-workout-index="${cardIndex}"]`
  );
  if (!workout || !currentLogger) {
    return;
  }

  const wasOpen = currentLogger.open;
  const loggerTemplate = document.createElement("template");
  loggerTemplate.innerHTML = buildExerciseLogger(workout, cardIndex).trim();
  const newLogger = loggerTemplate.content.firstElementChild;
  newLogger.open = wasOpen;
  currentLogger.replaceWith(newLogger);
}


function resetWorkoutProgress() {
  workoutList.querySelectorAll(".exercise-complete-checkbox").forEach(function (checkbox) {
    checkbox.checked = false;
    checkbox.indeterminate = false;
  });
  workoutProgressText.textContent = "Workout Progress: 0 of 0 completed";
  workoutProgressPercent.textContent = "0%";
  workoutProgressFill.style.width = "0%";
  workoutProgressBar.setAttribute("aria-valuenow", "0");
  workoutProgressBar.setAttribute("aria-valuetext", "0 of 0 exercises completed");
  workoutCompleteMessage.hidden = true;
  workoutProgress.hidden = true;
}


// Build one card so initial rendering and single-card replacement stay identical.
function buildExerciseCard(workout, cardIndex) {
  const exerciseLog = getExerciseLogState(workout, cardIndex);
  const safeInstanceId = escapeHtml(exerciseLog.instanceId);
  const safeName = escapeHtml(workout.name);
  const safeImage = escapeHtml(workout.image);
  const safeTarget = escapeHtml(workout.target.join(" / "));
  const safeDifficulty = escapeHtml(workout.difficulty);
  const safeEquipment = escapeHtml(workout.equipment.join(" / "));
  const safeSource = escapeHtml(workout.source);
  const mediaLabel = /\.gif(?:$|\?)/i.test(workout.image)
    ? "Animated demo"
    : "Exercise photo";
  const checkedAttribute = exerciseLog.completed ? " checked" : "";

  return `
    <article
      class="exercise-card"
      data-workout-index="${cardIndex}"
      data-exercise-instance-id="${safeInstanceId}"
      style="animation-delay: ${cardIndex * 55}ms"
    >
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
        <span class="exercise-target">${safeTarget}</span>
        <h3>${safeName}</h3>
        <div class="exercise-prescription">
          <div><strong>${escapeHtml(workout.sets)}</strong><span>Sets</span></div>
          <div><strong>${escapeHtml(workout.reps)}</strong><span>Reps</span></div>
        </div>
        <div class="exercise-meta">
          <span>${safeDifficulty} &middot; ${safeEquipment}</span>
          <span>${safeSource}</span>
        </div>
        <label class="exercise-completion" for="exercise-complete-${safeInstanceId}">
          <input
            id="exercise-complete-${safeInstanceId}"
            class="exercise-complete-checkbox"
            type="checkbox"
            data-workout-index="${cardIndex}"
            data-exercise-instance-id="${safeInstanceId}"
            aria-label="Mark ${safeName} as complete"${checkedAttribute}
          >
          <span>Mark as complete</span>
        </label>
        ${buildExerciseLogger(workout, cardIndex)}
        <div class="exercise-actions">
          <button
            class="replace-button"
            type="button"
            data-workout-index="${cardIndex}"
            aria-label="Replace ${safeName}"
          >
            Replace
            <span aria-hidden="true">&#8635;</span>
          </button>
          <button
            class="details-button"
            type="button"
            data-workout-index="${cardIndex}"
            aria-label="View details for ${safeName}"
          >
            Details
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </article>
  `;
}


function buildCards(workouts, startIndex) {
  return workouts.map(function (workout, index) {
    return buildExerciseCard(workout, startIndex + index);
  }).join("");
}


function renderDisplayedWorkout(savedWorkoutCount, onlineStatus) {
  const savedWorkouts = displayedWorkouts.slice(0, savedWorkoutCount);
  const onlineWorkouts = displayedWorkouts.slice(savedWorkoutCount);
  const savedSection = savedWorkouts.length > 0
    ? `
      <div class="catalog-heading">
        <strong>Your saved workouts</strong>
        <span>${savedWorkouts.length} matches</span>
      </div>
      ${buildCards(savedWorkouts, 0)}
    `
    : "";
  const onlineSection = `
    <div class="catalog-heading catalog-heading-online">
      <strong>Online recommendations</strong>
      <span>${escapeHtml(onlineStatus)}</span>
    </div>
    ${buildCards(onlineWorkouts, savedWorkouts.length)}
  `;

  workoutList.innerHTML = savedSection + onlineSection;
  workoutLogState.forEach(function (_, cardIndex) {
    synchronizeExerciseCompletion(cardIndex);
  });
  updateWorkoutProgress();
}


function restoreActiveWorkout(session) {
  activeSession = session;
  displayedWorkouts = session.displayedWorkouts;
  replacementCandidates = session.replacementCandidates;
  workoutLogState.clear();

  displayedWorkouts.forEach(function (workout, index) {
    const savedLog = session.exerciseLogs[index];
    const fallbackLog = createExerciseLogState(workout);
    const restoredSets = Array.isArray(savedLog?.sets) && savedLog.sets.length > 0
      ? savedLog.sets
      : fallbackLog.sets;

    workoutLogState.set(index, {
      ...fallbackLog,
      ...savedLog,
      instanceId: typeof savedLog?.instanceId === "string"
        ? savedLog.instanceId
        : fallbackLog.instanceId,
      sets: restoredSets
    });
  });

  goalSelect.value = session.preferences.goal;
  bodyAreaSelect.value = session.preferences.bodyArea;
  difficultySelect.value = session.preferences.difficulty;
  equipmentSelect.value = session.preferences.equipment;
  durationSelect.value = session.preferences.duration;
  errorMessage.textContent = "";

  const savedWorkoutCount = Math.min(
    Math.max(0, Number(session.savedWorkoutCount) || 0),
    displayedWorkouts.length
  );
  renderDisplayedWorkout(
    savedWorkoutCount,
    String(session.onlineStatus || "Restored from saved workout")
  );
  pendingSavedSession = null;
  workoutDraftDialog.close();
  startWorkoutTimer();
  workoutResults.scrollIntoView({ behavior: "smooth", block: "start" });
}


function offerSavedWorkoutDraft() {
  const result = WorkoutLog.loadActiveSession();
  if (result.error) {
    console.warn("The saved workout draft could not be restored.", result.error);
    errorMessage.textContent =
      "A saved workout draft could not be restored and was discarded.";
    WorkoutLog.clearActiveSession();
    return;
  }
  if (!result.session || result.session.displayedWorkouts.length === 0) {
    return;
  }

  pendingSavedSession = result.session;
  const exerciseCount = result.session.displayedWorkouts.length;
  workoutDraftSummary.textContent =
    `${exerciseCount} exercises · ` +
    `${WorkoutLog.formatElapsedTime(result.session.elapsedSeconds)} elapsed. ` +
    "Your set entries and notes are ready to continue.";
  workoutDraftDialog.showModal();
}


function getWorkoutBodyAreas(workout) {
  const targetText = workout.target.join(" ");
  return Object.keys(apiBodyPartBySelection).filter(function (bodyArea) {
    return targetText.includes(bodyArea);
  });
}


function replaceDisplayedWorkout(cardIndex) {
  const currentWorkout = displayedWorkouts[cardIndex];
  if (!currentWorkout) {
    return;
  }

  const currentBodyAreas = getWorkoutBodyAreas(currentWorkout);
  const displayedNames = new Set(displayedWorkouts.map(function (workout) {
    return normalizeExerciseName(workout.name);
  }));

  // Keep the replacement relevant and prevent duplicate cards in the session.
  const possibleReplacements = replacementCandidates.filter(function (candidate) {
    const candidateBodyAreas = getWorkoutBodyAreas(candidate);
    const hasSameBodyArea = currentBodyAreas.some(function (bodyArea) {
      return candidateBodyAreas.includes(bodyArea);
    });

    return hasSameBodyArea &&
      !displayedNames.has(normalizeExerciseName(candidate.name));
  });

  if (possibleReplacements.length === 0) {
    errorMessage.textContent =
      `No other ${currentBodyAreas[0] || "matching"} exercise is available for these filters.`;
    return;
  }

  const currentLog = workoutLogState.get(cardIndex);
  if (
    currentLog?.dirty &&
    !window.confirm(`Replace ${currentWorkout.name} and discard its set log?`)
  ) {
    return;
  }

  const replacement = possibleReplacements[
    Math.floor(Math.random() * possibleReplacements.length)
  ];
  displayedWorkouts[cardIndex] = replacement;
  workoutLogState.set(cardIndex, createExerciseLogState(replacement));
  errorMessage.textContent = "";

  // Replace only the selected article; every other workout card remains untouched.
  const currentCard = workoutList.querySelector(
    `.exercise-card[data-workout-index="${cardIndex}"]`
  );
  if (currentCard) {
    const cardTemplate = document.createElement("template");
    cardTemplate.innerHTML = buildExerciseCard(replacement, cardIndex).trim();
    currentCard.replaceWith(cardTemplate.content.firstElementChild);
  }
  updateWorkoutProgress();
  queueActiveWorkoutSave();
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

  if (
    hasEnteredWorkoutData() &&
    !window.confirm("Generate a new workout and discard the current set log?")
  ) {
    return;
  }

  errorMessage.textContent = "";
  discardActiveWorkout();
  resetWorkoutProgress();
  displayedWorkouts = [];
  replacementCandidates = [];
  workoutLogState.clear();
  workoutList.innerHTML = `
    <div class="empty-state">
      <span class="empty-icon" aria-hidden="true">&hellip;</span>
      <div>
        <strong>Building your workout.</strong>
        <p>Matching exercises to your selected preferences.</p>
      </div>
    </div>
  `;
  playWorkoutAnimation();

  const [exercises, localExerciseDetails] = await Promise.all([
    fetchWorkouts(selectedBodyArea),
    fetchLocalExerciseDetails()
  ]);

  workoutResults.scrollIntoView({ behavior: "smooth", block: "start" });

  // Convert API records and assign the difficulty data that ExerciseDB omits.
  const apiWorkouts = exercises.map(function (exercise) {
    const primaryTargets = (exercise.targetMuscles || []).map(function (muscle) {
      return bodyAreaByMuscle[muscle.toLowerCase()];
    }).filter(Boolean);
    const bodyPartTargets = (exercise.bodyParts || []).map(function (bodyPart) {
      return bodyAreaByMuscle[bodyPart.toLowerCase()];
    }).filter(Boolean);
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
      // Secondary muscles belong in details, not in primary-area filtering.
      target: primaryTargets.length > 0 ? primaryTargets : bodyPartTargets,
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
    return (
      !excludedExercisePattern.test(workout.name) &&
      !lowValueApiPattern.test(workout.name)
    );
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
      source: `${workout.source} - adapted to goal`
    };
  });
  const savedCandidates = [...exactSavedWorkouts, ...adaptableSavedWorkouts];
  const apiCandidates = [...apiByName.values()].filter(function (workout) {
    return matchesCoreSelection(workout) && workout.goal.includes(selectedGoal);
  }).sort(function (first, second) {
    return Number(establishedMovementPattern.test(second.name)) -
      Number(establishedMovementPattern.test(first.name));
  });

  // Keep every eligible, unique result available for card-level replacement.
  replacementCandidates = [...new Map(
    [...savedCandidates, ...apiCandidates].map(function (workout) {
      return [normalizeExerciseName(workout.name), workout];
    })
  ).values()];

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
    replacementCandidates = [];
    workoutLogState.clear();
    resetWorkoutProgress();
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

  displayedWorkouts = [...filteredSavedWorkouts, ...filteredApiWorkouts];
  initializeWorkoutLogState(displayedWorkouts);
  const onlineStatus = filteredApiWorkouts.length > 0
    ? `${filteredApiWorkouts.length} matches`
    : exercises.length > 0
      ? "No online matches for these filters"
      : "Temporarily unavailable";

  renderDisplayedWorkout(filteredSavedWorkouts.length, onlineStatus);
  beginActiveWorkout(
    {
      goal: selectedGoal,
      bodyArea: selectedBodyArea,
      difficulty: selectedDifficulty,
      equipment: selectedEquipment,
      duration: selectedDuration
    },
    filteredSavedWorkouts.length,
    onlineStatus
  );
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
  if (
    hasEnteredWorkoutData() &&
    !window.confirm("Clear this workout and discard the current set log?")
  ) {
    return;
  }

  goalSelect.value = "";
  bodyAreaSelect.value = "";
  difficultySelect.value = "";
  equipmentSelect.value = "";
  durationSelect.value = "";
  errorMessage.textContent = "";
  displayedWorkouts = [];
  replacementCandidates = [];
  discardActiveWorkout();
  workoutLogState.clear();
  resetWorkoutProgress();

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
  const addSetButton = event.target.closest(".add-set-button");
  if (addSetButton) {
    const cardIndex = Number(addSetButton.dataset.workoutIndex);
    const exerciseLog = workoutLogState.get(cardIndex);
    const workout = displayedWorkouts[cardIndex];
    if (!exerciseLog || !workout) {
      return;
    }

    exerciseLog.sets.push({
      id: exerciseLog.nextSetId,
      weight: "",
      actualReps: String(workout.reps ?? ""),
      rpe: "",
      completed: false
    });
    exerciseLog.nextSetId += 1;
    exerciseLog.dirty = true;
    replaceExerciseLogger(cardIndex);
    synchronizeExerciseCompletion(cardIndex);
    return;
  }

  const removeSetButton = event.target.closest(".remove-set-button");
  if (removeSetButton) {
    const cardIndex = Number(removeSetButton.dataset.workoutIndex);
    const setId = Number(removeSetButton.dataset.setId);
    const exerciseLog = workoutLogState.get(cardIndex);
    if (!exerciseLog || exerciseLog.sets.length <= 1) {
      return;
    }

    exerciseLog.sets = exerciseLog.sets.filter(function (set) {
      return set.id !== setId;
    });
    exerciseLog.dirty = true;
    replaceExerciseLogger(cardIndex);
    synchronizeExerciseCompletion(cardIndex);
    return;
  }

  const replaceButton = event.target.closest(".replace-button");
  if (replaceButton) {
    replaceDisplayedWorkout(Number(replaceButton.dataset.workoutIndex));
    return;
  }

  const detailsButton = event.target.closest(".details-button");
  if (!detailsButton) {
    return;
  }

  const workout = displayedWorkouts[Number(detailsButton.dataset.workoutIndex)];
  if (workout) {
    showExerciseDetails(workout);
  }
});

workoutList.addEventListener("change", function (event) {
  if (event.target.matches(".exercise-complete-checkbox")) {
    setAllExerciseSetsCompleted(
      Number(event.target.dataset.workoutIndex),
      event.target.checked
    );
    return;
  }

  if (event.target.matches(".set-complete-checkbox")) {
    const cardIndex = Number(event.target.dataset.workoutIndex);
    const setId = Number(event.target.dataset.setId);
    const exerciseLog = workoutLogState.get(cardIndex);
    const set = exerciseLog?.sets.find(function (candidate) {
      return candidate.id === setId;
    });
    if (!set || !exerciseLog) {
      return;
    }

    set.completed = event.target.checked;
    exerciseLog.dirty = true;
    synchronizeExerciseCompletion(cardIndex);
    return;
  }

  if (event.target.matches(".set-log-input") && !event.target.checkValidity()) {
    event.target.reportValidity();
  }
});

workoutList.addEventListener("input", function (event) {
  const field = event.target.dataset.logField;
  if (!field) {
    return;
  }

  const cardIndex = Number(event.target.dataset.workoutIndex);
  const exerciseLog = workoutLogState.get(cardIndex);
  if (!exerciseLog) {
    return;
  }

  exerciseLog.dirty = true;
  if (field === "notes") {
    exerciseLog.notes = event.target.value;
    queueActiveWorkoutSave();
    return;
  }

  if (!event.target.checkValidity() && event.target.value !== "") {
    return;
  }

  const setId = Number(event.target.dataset.setId);
  const set = exerciseLog.sets.find(function (candidate) {
    return candidate.id === setId;
  });
  if (set) {
    set[field] = event.target.value;
    queueActiveWorkoutSave();
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

resumeWorkoutDraftButton.addEventListener("click", function () {
  if (pendingSavedSession) {
    restoreActiveWorkout(pendingSavedSession);
  }
});

discardWorkoutDraftButton.addEventListener("click", function () {
  pendingSavedSession = null;
  WorkoutLog.clearActiveSession();
  workoutDraftDialog.close();
});

workoutDraftDialog.addEventListener("cancel", function (event) {
  // Require an explicit choice so the stored draft is not forgotten accidentally.
  event.preventDefault();
});

window.addEventListener("pagehide", function () {
  if (activeSession) {
    pauseWorkoutTimer();
    saveActiveWorkoutNow();
  }
});

window.addEventListener("pageshow", function () {
  if (activeSession && workoutTimerStartedAt === null) {
    startWorkoutTimer();
  }
});

offerSavedWorkoutDraft();
