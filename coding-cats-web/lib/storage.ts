import { Category, Difficulty } from "./problems";
import { supabase } from "./supabase";

export interface PlacedItem {
  itemId: string;
  x: number; // percent from left
  y: number; // percent from bottom
}

interface GameState {
  currency: number;
  streak: { count: number; lastDate: string };
  solvedProblems: string[];
  categoryProgress: Record<Category, number>;
  lastSolveDate: string;
  purchasedItems: Record<string, number>; // itemId -> count owned
  placedItems: PlacedItem[];
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
  purchasedItems: {},
  placedItems: [],
};

const CURRENCY_REWARDS: Record<Difficulty, number> = {
  easy: 3,
  medium: 5,
  hard: 10,
};

// --- Auth ---

export async function ensureUser(): Promise<string | null> {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.user) return session.user.id;

  const { data, error } = await supabase.auth.signInAnonymously();
  if (error || !data.user) return null;
  return data.user.id;
}

// --- Supabase sync ---

async function loadFromSupabase(): Promise<GameState | null> {
  const userId = await ensureUser();
  if (!userId) return null;

  const { data, error } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error || !data) return null;

  return {
    currency: data.currency,
    streak: { count: data.streak_count, lastDate: data.streak_last_date ?? "" },
    solvedProblems: data.solved_problems ?? [],
    categoryProgress: data.category_progress ?? DEFAULT_STATE.categoryProgress,
    lastSolveDate: data.last_solve_date ?? "",
    purchasedItems: data.purchased_items ?? {},
    placedItems: data.placed_items ?? [],
  };
}

async function saveToSupabase(state: GameState): Promise<void> {
  const userId = await ensureUser();
  if (!userId) return;

  await supabase.from("user_progress").upsert({
    user_id: userId,
    currency: state.currency,
    streak_count: state.streak.count,
    streak_last_date: state.streak.lastDate,
    solved_problems: state.solvedProblems,
    category_progress: state.categoryProgress,
    last_solve_date: state.lastSolveDate,
    purchased_items: state.purchasedItems,
    placed_items: state.placedItems,
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id" });
}

// --- Local storage ---

export function getState(): GameState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return DEFAULT_STATE;
  return { ...DEFAULT_STATE, ...JSON.parse(raw) };
}

function saveState(state: GameState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  // Fire-and-forget sync to Supabase
  saveToSupabase(state).catch(() => {});
}

// Call this once on app load to pull state from Supabase and sync locally
export async function initState(): Promise<GameState> {
  const remote = await loadFromSupabase();
  if (remote) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(remote));
    return remote;
  }
  return getState();
}

// --- Game logic (unchanged) ---

export function hasSolvedToday(): boolean {
  if (typeof window === "undefined") return false;
  const state = getState();
  const today = new Date().toISOString().split("T")[0];
  return state.lastSolveDate === today;
}

export function recordSolve(problemId: string, category: Category, difficulty: Difficulty): GameState {
  const state = getState();

  if (state.solvedProblems.includes(problemId)) return state;

  state.currency += CURRENCY_REWARDS[difficulty];

  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  if (state.streak.lastDate === yesterday) {
    state.streak.count += 1;
  } else if (state.streak.lastDate !== today) {
    state.streak.count = 1;
  }
  state.streak.lastDate = today;
  state.lastSolveDate = today;

  state.solvedProblems.push(problemId);
  state.categoryProgress[category] = (state.categoryProgress[category] || 0) + 1;

  saveState(state);
  return state;
}

export function purchaseItem(itemId: string, price: number): { success: boolean; state: GameState } {
  const state = getState();
  if (state.currency < price) return { success: false, state };

  state.currency -= price;
  state.purchasedItems[itemId] = (state.purchasedItems[itemId] || 0) + 1;

  saveState(state);
  return { success: true, state };
}

export function placeItem(itemId: string, x: number, y: number): GameState {
  const state = getState();
  state.placedItems.push({ itemId, x, y });
  saveState(state);
  return state;
}

export function removeLastPlaced(itemId: string): GameState {
  const state = getState();
  const idx = state.placedItems.findLastIndex((p) => p.itemId === itemId);
  if (idx !== -1) state.placedItems.splice(idx, 1);
  saveState(state);
  return state;
}
