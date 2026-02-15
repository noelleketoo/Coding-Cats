import { TestResult } from "@/lib/judge0";

interface TestResultsProps {
  results: TestResult[];
  allPassed: boolean;
}

export default function TestResults({ results, allPassed }: TestResultsProps) {
  return (
    <div className="border-t border-purple-200 p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-lg font-bold ${allPassed ? "text-green-600" : "text-red-500"}`}>
          {allPassed ? "All tests passed! +10 coins" : "Some tests failed"}
        </span>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {results.map((r, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg text-sm ${
              r.passed ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span>{r.passed ? "PASS" : "FAIL"}</span>
              <span className="font-medium">Test {i + 1}</span>
            </div>
            {!r.passed && (
              <div className="text-xs mt-1 space-y-1">
                <div>Expected: <code>{r.expected}</code></div>
                <div>Got: <code>{r.actual || "(no output)"}</code></div>
                {r.error && <div className="text-red-600">Error: {r.error}</div>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
