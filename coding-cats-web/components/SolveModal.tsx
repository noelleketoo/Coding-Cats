"use client";

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";
import ProblemDisplay from "@/components/ProblemDisplay";
import TestResults from "@/components/TestResults";
import { getDailyChoices, Problem, Difficulty } from "@/lib/problems";
import { runTests, TestResult } from "@/lib/judge0";
import { getState, recordSolve } from "@/lib/storage";

interface SolveModalProps {
  onClose: () => void;
  onSolved: () => void;
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

  function selectDifficulty(difficulty: Difficulty) {
    const problem = choices[difficulty];
    setSelectedProblem(problem);
    setCode(problem.starterCode);
    setResults(null);
    setSolved(false);
  }

  async function handleSubmit() {
    if (!selectedProblem) return;
    setSubmitting(true);
    setResults(null);

    try {
      const testResults = await runTests(code, selectedProblem.testCases);
      setResults(testResults);

      const allPassed = testResults.every((r) => r.passed);
      if (allPassed && !solved) {
        recordSolve(selectedProblem.id, selectedProblem.category, selectedProblem.difficulty);
        setSolved(true);
        onSolved();
      }
    } catch (e) {
      console.error("Submit error:", e);
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
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

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
              onClick={handleSubmit}
              disabled={submitting}
              className="px-4 py-1.5 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 rounded font-medium text-sm transition-colors"
            >
              {submitting ? "Running..." : "Submit"}
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-purple-500 hover:bg-purple-400 rounded text-sm transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          <div className="w-1/2 border-r border-purple-200 overflow-y-auto">
            <ProblemDisplay problem={selectedProblem} />
          </div>

          <div className="w-1/2 flex flex-col">
            <div className="flex-1">
              <CodeEditor value={code} onChange={setCode} />
            </div>

            {results && (
              <TestResults results={results} allPassed={allPassed} />
            )}
          </div>
        </div>

        {/* Solved banner */}
        {solved && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg text-lg">
            +{REWARD_MAP[selectedProblem.difficulty]} coins! Great job!
          </div>
        )}
      </div>
    </div>
  );
}
