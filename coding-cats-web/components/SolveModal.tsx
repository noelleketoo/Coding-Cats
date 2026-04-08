"use client";

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";
import ProblemDisplay from "@/components/ProblemDisplay";
import TestResults from "@/components/TestResults";
import { getDailyChoices, Problem, Difficulty, PROBLEMS } from "@/lib/problems";
import { runTests, TestResult } from "@/lib/judge0";
import { getState, recordSolve, purchaseHint, HINT_COST } from "@/lib/storage";
import { HINTS } from "@/lib/hints";
import { playSolveSound, playCoinSound, playHintSound, playClickSound } from "@/lib/sounds";

interface SolveModalProps {
  onClose: () => void;
  onSolved: (newCat: import("@/lib/problems").Category | null) => void;
}

const REWARD_MAP: Record<Difficulty, number> = {
  easy: 3,
  medium: 5,
  hard: 10,
};

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  easy: "bg-green-500 hover:bg-green-600",
  medium: "bg-yellow-500 hover:bg-yellow-600",
  hard: "bg-red-500 hover:bg-red-600",
};

export default function SolveModal({ onClose, onSolved }: SolveModalProps) {
  const [choices] = useState(() => {
    const state = getState();
    return getDailyChoices(state.solvedProblems);
  });

  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState("");
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [solved, setSolved] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [hintUnlocked, setHintUnlocked] = useState(false);
  const [showHint, setShowHint] = useState(false);

  function selectDifficulty(difficulty: Difficulty) {
    playClickSound();
    const problem = choices[difficulty];
    const state = getState();
    setSelectedProblem(problem);
    setCode(problem.starterCode);
    setResults(null);
    setSolved(false);
    setStatusMsg(null);
    setHintUnlocked(state.purchasedHints.includes(problem.id));
    setShowHint(false);
  }

  function handleHint() {
    if (!selectedProblem) return;
    if (hintUnlocked) { setShowHint(v => !v); return; }
    const { success, state } = purchaseHint(selectedProblem.id);
    if (success) {
      playHintSound();
      setHintUnlocked(true);
      setShowHint(true);
      onSolved(null);
    } else {
      setStatusMsg(`Need ${HINT_COST} coins for a hint!`);
      setTimeout(() => setStatusMsg(null), 1500);
    }
  }

  function reroll() {
    if (!selectedProblem) return;
    const state = getState();
    const pool = PROBLEMS.filter(
      (p) => p.difficulty === selectedProblem.difficulty && p.id !== selectedProblem.id && !state.solvedProblems.includes(p.id)
    );
    const next = pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : selectedProblem;
    setSelectedProblem(next);
    setCode(next.starterCode);
    setResults(null);
    setSolved(false);
    setStatusMsg(null);
  }

  async function handleSubmit() {
    if (!selectedProblem) return;
    setSubmitting(true);
    setResults(null);
    setStatusMsg("Running your code...");

    try {
      const testResults = await runTests(code, selectedProblem.testCases);
      setResults(testResults);

      const allPassed = testResults.every((r) => r.passed);
      if (allPassed && !solved) {
        const { newCat } = recordSolve(selectedProblem.id, selectedProblem.category, selectedProblem.difficulty, selectedProblem.title, code);
        playSolveSound();
        playCoinSound();
        setSolved(true);
        setStatusMsg(`+${REWARD_MAP[selectedProblem.difficulty]} coins! Great job!`);
        onSolved(newCat);

        setTimeout(() => {
          onClose();
        }, 2500);
      } else if (!allPassed) {
        setStatusMsg(`${testResults.filter(r => r.passed).length}/${testResults.length} tests passed. Try again!`);
      }
    } catch (e) {
      console.error("Submit error:", e);
      setStatusMsg("Error: " + (e instanceof Error ? e.message : String(e)));
    } finally {
      setSubmitting(false);
    }
  }

  const allPassed = results ? results.every((r) => r.passed) : false;

  // Difficulty picker screen
  if (!selectedProblem) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />

        <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
          >
            x
          </button>

          <h2 className="text-2xl font-bold text-purple-800 mb-2 text-center">
            Daily Challenge
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Pick a difficulty level!
          </p>

          <div className="space-y-3">
            {(["easy", "medium", "hard"] as Difficulty[]).map((diff) => (
              <button
                key={diff}
                onClick={() => selectDifficulty(diff)}
                className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-colors ${DIFFICULTY_STYLES[diff]}`}
              >
                <div className="flex justify-between items-center px-6">
                  <span className="capitalize">{diff}</span>
                  <div className="text-right">
                    <span className="text-sm opacity-80">
                      {choices[diff].title}
                    </span>
                    <span className="ml-3 bg-white/20 px-2 py-0.5 rounded text-sm">
                      +{REWARD_MAP[diff]} coins
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Code editor screen
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" />

      {/* Fixed status toast at top of screen */}
      {statusMsg && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] px-6 py-3 rounded-xl font-bold shadow-lg text-white text-lg ${
          solved ? "bg-green-500" :
          submitting ? "bg-blue-500" :
          allPassed ? "bg-green-500" :
          results ? "bg-red-500" :
          "bg-blue-500"
        }`}>
          {statusMsg}
        </div>
      )}

      <div className="relative w-[90vw] h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal header */}
        <div className="flex items-center justify-between px-4 py-2 bg-purple-700 text-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedProblem(null)}
              className="px-2 py-1 bg-purple-500 hover:bg-purple-400 rounded text-sm transition-colors"
            >
              Back
            </button>
            <span className="font-bold">
              {selectedProblem.title}
            </span>
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
              selectedProblem.difficulty === "easy" ? "bg-green-500" :
              selectedProblem.difficulty === "medium" ? "bg-yellow-500" :
              "bg-red-500"
            }`}>
              {selectedProblem.difficulty} (+{REWARD_MAP[selectedProblem.difficulty]} coins)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleHint}
              disabled={solved}
              className="px-4 py-1.5 bg-purple-500 hover:bg-purple-400 disabled:bg-gray-400 rounded font-medium text-sm transition-colors text-white"
              title={hintUnlocked ? "Show/hide hint" : `Unlock hint (${HINT_COST} coins)`}
            >
              {hintUnlocked ? (showHint ? "Hide Hint" : "Show Hint") : `Hint (${HINT_COST} 🪙)`}
            </button>
            <button
              onClick={reroll}
              disabled={solved}
              className="px-4 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 disabled:bg-gray-400 rounded font-medium text-sm transition-colors"
            >
              Reroll
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting || solved}
              className="px-4 py-1.5 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 rounded font-medium text-sm transition-colors"
            >
              {submitting ? "Running..." : solved ? "Solved!" : "Submit"}
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-purple-500 hover:bg-purple-400 rounded text-sm transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        {/* Content: problem left, editor + results right */}
        <div className="flex-1 flex min-h-0">
          {/* Problem panel */}
          <div className="w-1/2 border-r border-purple-200 overflow-y-auto flex flex-col">
            <ProblemDisplay problem={selectedProblem} />
            {showHint && HINTS[selectedProblem.id] && (
              <div className="mx-4 mb-4 p-3 bg-purple-50 border-2 border-purple-200 rounded-xl">
                <p className="text-xs font-bold text-purple-700 mb-1">Hint</p>
                <p className="text-xs text-purple-900">{HINTS[selectedProblem.id]}</p>
              </div>
            )}
          </div>

          {/* Editor + results panel */}
          <div className="w-1/2 flex flex-col min-h-0">
            {/* Editor takes 60% when results are showing, 100% otherwise */}
            <div className={results ? "h-[60%]" : "flex-1"}>
              <CodeEditor value={code} onChange={setCode} />
            </div>

            {/* Test results take remaining 40% */}
            {results && (
              <div className="h-[40%] overflow-y-auto">
                <TestResults results={results} allPassed={allPassed} />
              </div>
            )}
          </div>
        </div>

        {/* Success overlay */}
        {solved && (
          <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center pointer-events-none">
            <div className="bg-green-500 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl text-xl">
              +{REWARD_MAP[selectedProblem.difficulty]} coins! Great job!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
