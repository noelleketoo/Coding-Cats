"use client";

import { useState } from "react";
import { SolvedEntry } from "@/lib/storage";

const DIFF_COLORS: Record<string, string> = {
  easy: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  hard: "bg-red-100 text-red-700",
};

export default function HistoryModal({ history, onClose }: { history: SolvedEntry[]; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-amber-50 border-4 border-yellow-700 rounded-2xl shadow-2xl w-[90vw] max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-3 bg-yellow-800 border-b-4 border-yellow-700">
          <h2 className="text-white text-xs">Solved History</h2>
          <button onClick={onClose} className="text-yellow-200 hover:text-white text-lg">x</button>
        </div>

        <div className="overflow-y-auto p-4 flex flex-col gap-2">
          {history.length === 0 ? (
            <p className="text-center text-yellow-800 text-xs py-8">No problems solved yet. Get coding!</p>
          ) : (
            history.map((entry) => (
              <div key={`${entry.id}-${entry.date}`} className="border-2 border-yellow-200 rounded-xl bg-white overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-yellow-50 transition-colors"
                  onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${DIFF_COLORS[entry.difficulty]}`}>
                      {entry.difficulty}
                    </span>
                    <span className="text-xs text-yellow-900 font-bold">{entry.title}</span>
                    <span className="text-xs text-gray-400">{entry.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{entry.date}</span>
                    <span className="text-yellow-600 text-xs">{expanded === entry.id ? "▲" : "▼"}</span>
                  </div>
                </button>

                {expanded === entry.id && (
                  <div className="border-t-2 border-yellow-100 px-4 py-3 bg-gray-50">
                    <pre className="text-xs text-gray-700 font-mono whitespace-pre-wrap overflow-x-auto">{entry.solution}</pre>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
