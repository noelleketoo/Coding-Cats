"use client";

import { useState, useEffect } from "react";

// Sprite sheet is 256x320, frames are 32x32 (8 cols x 10 rows)
const FRAME_SIZE = 32;
const SHEET_W = 256;
const SHEET_H = 320;

const IDLE_FRAMES = [
  { x: 0, y: 0 },
  { x: 32, y: 0 },
  { x: 64, y: 0 },
  { x: 32, y: 0 },
];

const WALK_FRAMES = [
  { x: 0, y: 128 },
  { x: 32, y: 128 },
  { x: 64, y: 128 },
  { x: 96, y: 128 },
  { x: 128, y: 128 },
];

// Row 2 (y=64): alternate sitting/looking pose
const SIT2_FRAMES = [
  { x: 0, y: 64 },
  { x: 32, y: 64 },
  { x: 64, y: 64 },
  { x: 32, y: 64 },
];

// Row 6 (y=192): jump / hop
const JUMP_FRAMES = [
  { x: 0, y: 192 },
  { x: 32, y: 192 },
  { x: 64, y: 192 },
  { x: 96, y: 192 },
];

// Row 7 (y=224): sleeping / lying down
const SLEEP_FRAMES = [
  { x: 0, y: 224 },
  { x: 32, y: 224 },
  { x: 64, y: 224 },
  { x: 96, y: 224 },
  { x: 64, y: 224 },
  { x: 32, y: 224 },
];

// Row 9 (y=288): excited / running
const RUN_FRAMES = [
  { x: 0, y: 288 },
  { x: 32, y: 288 },
  { x: 64, y: 288 },
  { x: 96, y: 288 },
  { x: 128, y: 288 },
  { x: 160, y: 288 },
];

type CatState = "idle" | "idle2" | "walking" | "jumping" | "sleeping" | "running";

const FRAME_SPEEDS: Record<CatState, number> = {
  idle: 400,
  idle2: 400,
  walking: 150,
  jumping: 120,
  sleeping: 600,
  running: 100,
};

const STATE_FRAMES: Record<CatState, { x: number; y: number }[]> = {
  idle: IDLE_FRAMES,
  idle2: SIT2_FRAMES,
  walking: WALK_FRAMES,
  jumping: JUMP_FRAMES,
  sleeping: SLEEP_FRAMES,
  running: RUN_FRAMES,
};

const HAT_EMOJIS: Record<string, string> = {
  "party-hat": "🎉",
  "witch-hat": "🧙",
  "crown": "👑",
  "bow": "🎀",
  "santa-hat": "🎅",
};

export default function FieldCat({ initialX = 50, hat = null }: { initialX?: number; hat?: string | null }) {
  const [posX, setPosX] = useState(initialX);
  const [frame, setFrame] = useState(0);
  const [catState, setCatState] = useState<CatState>("idle");
  const [facingLeft, setFacingLeft] = useState(false);
  const [targetX, setTargetX] = useState(initialX);

  // Pick a new random behavior every few seconds
  useEffect(() => {
    const behaviorInterval = setInterval(() => {
      const rand = Math.random();

      if (rand < 0.2) {
        setCatState("idle");
      } else if (rand < 0.35) {
        setCatState("idle2");
      } else if (rand < 0.45) {
        setCatState("sleeping");
      } else if (rand < 0.55) {
        setCatState("jumping");
      } else if (rand < 0.65) {
        // running: pick a far target
        const newTarget = 10 + Math.random() * 80;
        setTargetX(newTarget);
        setFacingLeft(newTarget < posX);
        setCatState("running");
      } else {
        // walking: pick a nearby target
        const newTarget = 15 + Math.random() * 70;
        setTargetX(newTarget);
        setFacingLeft(newTarget < posX);
        setCatState("walking");
      }
    }, 3000 + Math.random() * 3000);

    return () => clearInterval(behaviorInterval);
  }, [posX]);

  // Animate frame cycling
  useEffect(() => {
    setFrame(0);
    const speed = FRAME_SPEEDS[catState];
    const frames = STATE_FRAMES[catState];
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % frames.length);
    }, speed);
    return () => clearInterval(interval);
  }, [catState]);

  // Move toward target when walking or running
  useEffect(() => {
    if (catState !== "walking" && catState !== "running") return;
    const speed = catState === "running" ? 0.6 : 0.3;

    const moveInterval = setInterval(() => {
      setPosX((current) => {
        const diff = targetX - current;
        if (Math.abs(diff) < 0.5) {
          setCatState("idle");
          return targetX;
        }
        return current + Math.sign(diff) * speed;
      });
    }, 16);

    return () => clearInterval(moveInterval);
  }, [catState, targetX]);

  const frames = STATE_FRAMES[catState];
  const currentFrame = frames[frame % frames.length];

  return (
    <div
      className="absolute transition-none"
      style={{
        bottom: "22%",
        left: `${posX}%`,
        transform: `translateX(-50%) scaleX(${facingLeft ? -1 : 1})`,
        width: FRAME_SIZE,
        height: FRAME_SIZE,
        backgroundImage: "url(/sprites/cats.png)",
        backgroundPosition: `-${currentFrame.x}px -${currentFrame.y}px`,
        backgroundSize: `${SHEET_W}px ${SHEET_H}px`,
        imageRendering: "pixelated",
        scale: "2.5",
      }}
    >
      {hat && HAT_EMOJIS[hat] && (
        <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", fontSize: 14, lineHeight: 1 }}>
          {HAT_EMOJIS[hat]}
        </div>
      )}
    </div>
  );
}
