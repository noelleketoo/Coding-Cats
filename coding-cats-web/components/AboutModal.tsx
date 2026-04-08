"use client";

// ✏️ EDIT THIS to write your about statement!
const ABOUT_TEXT = `This game was developed for my final project in CS1960 at Harvard. It is designed to encourage iteration in learning Computer Science. Please enjoy!`;

// ✏️ EDIT THIS to add your name/links
const CREATOR = {
  name: "Noelle Keto",
  link: "", // e.g. "https://github.com/noelleketoo"
};

export default function AboutModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-amber-50 border-4 border-yellow-700 rounded-2xl shadow-2xl w-[90vw] max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 bg-yellow-800 border-b-4 border-yellow-700">
          <h2 className="text-white text-sm">About</h2>
          <button onClick={onClose} className="text-yellow-200 hover:text-white text-lg">x</button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4">
          <div className="flex justify-center">
            <img
              src="/sprites/cats.png"
              alt="cat"
              width={64}
              height={64}
              style={{
                imageRendering: "pixelated",
                objectFit: "none",
                objectPosition: "0 0",
                width: 64,
                height: 64,
              }}
            />
          </div>

          <h3 className="text-yellow-900 text-sm text-center">Coding Cats</h3>

          <p className="text-gray-700 text-xs leading-relaxed whitespace-pre-wrap text-center">{ABOUT_TEXT}</p>

          {CREATOR.name && (
            <p className="text-xs text-yellow-800 text-center">
              Made with love by{" "}
              {CREATOR.link ? (
                <a href={CREATOR.link} target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-600">
                  {CREATOR.name}
                </a>
              ) : (
                <span>{CREATOR.name}</span>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
