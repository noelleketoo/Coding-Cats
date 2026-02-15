import { Category, Difficulty } from "./problems";

interface GameState {
  currency: number;
  streak: { count: number; lastDate: string };
  solvedProblems: string[];
  categoryProgress: Record<Category, number>;
  lastSolveDate: string;
}

const STORAGE_KEY = "coding-cats-state";

const DEFAULT_STATE: GameState = {
  currency: 0,
  streak: { count: 0, lastDate: "" },
  solvedProblems: [],
  categoryProgress: {
    arrays: 0,
    strings: 0,
    math: 0,
    hashmap: 0,
    dp: 0,
  },
  lastSolveDate: "",
};

const CURRENCY_REWARDS: Record<Difficulty, number> = {
  easy: 3,
  medium: 5,
  hard: 10,
};

export function getState(): GameState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return DEFAULT_STATE;
  return { ...DEFAULT_STATE, ...JSON.parse(raw) };
}

function saveState(state: GameState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function hasSolvedToday(): boolean {
  if (typeof window === "undefined") return false;
  const state = getState();
  const today = new Date().toISOString().split("T")[0];
  return state.lastSolveDate === today;
}

export function recordSolve(problemId: string, category: Category, difficulty: Difficulty): GameState {
  const state = getState();

  // Don't double-count
  if (state.solvedProblems.includes(problemId)) return state;

  // Add currency based on difficulty
  state.currency += CURRENCY_REWARDS[difficulty];

  // Update streak
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000)
    .toISOString()
    .split("T")[0];

  if (state.streak.lastDate === yesterday) {
    state.streak.count += 1;
  } else if (state.streak.lastDate !== today) {
    state.streak.count = 1;
  }
  state.streak.lastDate = today;
  state.lastSolveDate = today;

  // Track problem
  state.solvedProblems.push(problemId);
  state.categoryProgress[category] =
    (state.categoryProgress[category] || 0) + 1;

  saveState(state);
  return state;
}
