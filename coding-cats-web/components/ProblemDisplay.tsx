import { Problem } from "@/lib/problems";

interface ProblemDisplayProps {
  problem: Problem;
}

export default function ProblemDisplay({ problem }: ProblemDisplayProps) {
  const difficultyColor = {
    easy: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    hard: "bg-red-100 text-red-700",
  }[problem.difficulty];

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl font-bold">{problem.title}</h2>
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${difficultyColor}`}>
          {problem.difficulty}
        </span>
        <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700">
          {problem.category}
        </span>
      </div>

      <div className="prose prose-sm max-w-none mb-6">
        {problem.description.split("\n").map((line, i) => (
          <p key={i} className="mb-2">
            {line.split("`").map((part, j) =>
              j % 2 === 1 ? (
                <code key={j} className="bg-purple-100 px-1 rounded text-sm">
                  {part}
                </code>
              ) : (
                part
              )
            )}
          </p>
        ))}
      </div>

      <h3 className="font-bold mb-3">Examples</h3>
      {problem.examples.map((ex, i) => (
        <div key={i} className="bg-gray-50 rounded-lg p-4 mb-3 border border-gray-200">
          <div className="mb-1">
            <span className="font-medium text-sm">Input: </span>
            <code className="text-sm">{ex.input}</code>
          </div>
          <div className="mb-1">
            <span className="font-medium text-sm">Output: </span>
            <code className="text-sm">{ex.output}</code>
          </div>
          {ex.explanation && (
            <div className="text-sm text-gray-500 mt-1">
              {ex.explanation}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
