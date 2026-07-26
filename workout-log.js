(function (global) {
  "use strict";

  const SCHEMA_VERSION = 1;
  const ACTIVE_WORKOUT_KEY = "formAthletics.activeWorkout.v1";
  const WORKOUT_HISTORY_KEY = "formAthletics.workoutHistory.v1";

  function createId(prefix) {
    const randomPart = global.crypto?.randomUUID
      ? global.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    return `${prefix}-${randomPart}`;
  }

  function createActiveSession(data) {
    return {
      schemaVersion: SCHEMA_VERSION,
      id: createId("workout"),
      status: "active",
      startedAt: new Date().toISOString(),
      elapsedSeconds: 0,
      ...data
    };
  }

  function isValidActiveSession(value) {
    return Boolean(
      value &&
      value.schemaVersion === SCHEMA_VERSION &&
      value.status === "active" &&
      typeof value.id === "string" &&
      typeof value.startedAt === "string" &&
      Number.isFinite(value.elapsedSeconds) &&
      value.preferences &&
      Array.isArray(value.displayedWorkouts) &&
      Array.isArray(value.replacementCandidates) &&
      Array.isArray(value.exerciseLogs)
    );
  }

  function saveActiveSession(session) {
    try {
      global.localStorage.setItem(ACTIVE_WORKOUT_KEY, JSON.stringify(session));
      return { ok: true, error: null };
    } catch (error) {
      return { ok: false, error };
    }
  }

  function loadActiveSession() {
    try {
      const storedValue = global.localStorage.getItem(ACTIVE_WORKOUT_KEY);
      if (!storedValue) {
        return { session: null, error: null };
      }

      const session = JSON.parse(storedValue);
      if (!isValidActiveSession(session)) {
        return {
          session: null,
          error: new Error("The saved workout draft is not compatible.")
        };
      }
      return { session, error: null };
    } catch (error) {
      return { session: null, error };
    }
  }

  function clearActiveSession() {
    try {
      global.localStorage.removeItem(ACTIVE_WORKOUT_KEY);
      return { ok: true, error: null };
    } catch (error) {
      return { ok: false, error };
    }
  }

  function isValidFinishedSession(value) {
    return Boolean(
      value &&
      value.schemaVersion === SCHEMA_VERSION &&
      (value.status === "complete" || value.status === "partial") &&
      typeof value.id === "string" &&
      typeof value.startedAt === "string" &&
      typeof value.finishedAt === "string" &&
      Number.isFinite(value.elapsedSeconds) &&
      value.preferences &&
      Array.isArray(value.exercises)
    );
  }

  function loadWorkoutHistory() {
    try {
      const storedValue = global.localStorage.getItem(WORKOUT_HISTORY_KEY);
      if (!storedValue) {
        return { sessions: [], error: null };
      }

      const history = JSON.parse(storedValue);
      if (
        !history ||
        history.schemaVersion !== SCHEMA_VERSION ||
        !Array.isArray(history.sessions) ||
        !history.sessions.every(isValidFinishedSession)
      ) {
        return {
          sessions: [],
          error: new Error("The saved workout history is not compatible.")
        };
      }
      return { sessions: history.sessions, error: null };
    } catch (error) {
      return { sessions: [], error };
    }
  }

  function saveWorkoutHistory(sessions) {
    try {
      global.localStorage.setItem(WORKOUT_HISTORY_KEY, JSON.stringify({
        schemaVersion: SCHEMA_VERSION,
        sessions
      }));
      return { ok: true, error: null };
    } catch (error) {
      return { ok: false, error };
    }
  }

  function addFinishedSession(session) {
    if (!isValidFinishedSession(session)) {
      return {
        ok: false,
        sessions: [],
        error: new Error("The finished workout is not valid.")
      };
    }

    const loadedHistory = loadWorkoutHistory();
    if (loadedHistory.error) {
      return { ok: false, sessions: [], error: loadedHistory.error };
    }

    const sessions = [
      session,
      ...loadedHistory.sessions.filter(function (savedSession) {
        return savedSession.id !== session.id;
      })
    ];
    const savedHistory = saveWorkoutHistory(sessions);
    return { ...savedHistory, sessions: savedHistory.ok ? sessions : loadedHistory.sessions };
  }

  function deleteFinishedSession(sessionId) {
    const loadedHistory = loadWorkoutHistory();
    if (loadedHistory.error) {
      return { ok: false, sessions: [], error: loadedHistory.error };
    }

    const sessions = loadedHistory.sessions.filter(function (session) {
      return session.id !== sessionId;
    });
    const savedHistory = saveWorkoutHistory(sessions);
    return { ...savedHistory, sessions: savedHistory.ok ? sessions : loadedHistory.sessions };
  }

  function formatElapsedTime(totalSeconds) {
    const safeSeconds = Math.max(0, Math.floor(Number(totalSeconds) || 0));
    const hours = Math.floor(safeSeconds / 3600);
    const minutes = Math.floor((safeSeconds % 3600) / 60);
    const seconds = safeSeconds % 60;

    return hours > 0
      ? [hours, minutes, seconds].map(function (value) {
          return String(value).padStart(2, "0");
        }).join(":")
      : [minutes, seconds].map(function (value) {
          return String(value).padStart(2, "0");
        }).join(":");
  }

  global.WorkoutLog = {
    schemaVersion: SCHEMA_VERSION,
    storageKey: ACTIVE_WORKOUT_KEY,
    historyStorageKey: WORKOUT_HISTORY_KEY,
    createId,
    createActiveSession,
    saveActiveSession,
    loadActiveSession,
    clearActiveSession,
    loadWorkoutHistory,
    addFinishedSession,
    deleteFinishedSession,
    formatElapsedTime
  };
})(window);
