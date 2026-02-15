"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import CodeEditor from "@/components/CodeEditor";
import ProblemDisplay from "@/components/ProblemDisplay";
import TestResults from "@/components/TestResults";
import { getProblemById, getRandomProblem } from "@/lib/problems";
import { runTests, TestResult } from "@/lib/judge0";
import { getState, recordSolve } from "@/lib/storage";

export default function SolvePage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      <SolvePageInner />
    </Suspense>
  );
}

function SolvePageInner() {
  const searchParams = useSearchParams();
  const problemId = searchParams.get("id");

  const [problem, setProblem] = useState(() => {
    if (problemId) {
      return getProblemById(problemId) || getRandomProblem();
    }
    const state = getState();
    return getRandomProblem(state.solvedProblems);
  });

  const [code, setCode] = useState(problem.starterCode);
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [solved, setSolved] = useState(false);

  // Update code when problem changes
  useEffect(() => {
    setCode(problem.starterCode);
    setResults(null);
    setSolved(false);
  }, [problem]);

  async function handleSubmit() {
    setSubmitting(true);
    setResults(null);

    try {
      const testResults = await runTests(code, problem.testCases);
      setResults(testResults);

      const allPassed = testResults.every((r) => r.passed);
      if (allPassed && !solved) {
        recordSolve(problem.id, problem.category, problem.difficulty);
        setSolved(true);
      }
    } catch (e) {
      console.error("Submit error:", e);
    } finally {
      setSubmitting(false);
    }
  }

  const allPassed = results ? results.every((r) => r.passed) : false;

  return (
    <div className="h-screen flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-purple-700 text-white">
        <Link href="/" className="font-bold hover:text-purple-200">
          Coding Cats
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-4 py-1.5 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 rounded font-medium text-sm transition-colors"
          >
            {submitting ? "Running..." : "Submit"}
          </button>
          <Link
            href="/"
            className="px-4 py-1.5 bg-purple-500 hover:bg-purple-400 rounded text-sm transition-colors"
          >
            Home
          </Link>
        </div>
      </div>

      {/* Main content — problem left, editor right */}
      <div className="flex-1 flex overflow-hidden">
        {/* Problem panel */}
        <div className="w-1/2 border-r border-purple-200 bg-white overflow-y-auto">
          <ProblemDisplay problem={problem} />
        </div>

        {/* Editor panel */}
        <div className="w-1/2 flex flex-col">
          <div className="flex-1">
            <CodeEditor value={code} onChange={setCode} />
          </div>

          {/* Test results */}
          {results && (
            <TestResults results={results} allPassed={allPassed} />
          )}
        </div>
      </div>
    </div>
  );
}
