"use client";

import { useState, useEffect, useCallback } from "react";

// Sprite sheet is 256x320, frames are 32x32
// Row 0: sitting frames (columns 0-3)
// Row 4: walking right frames (columns 0-4)
// Row 5: walking right frames continued
const FRAME_SIZE = 32;
const SHEET_W = 256;
const SHEET_H = 320;

// Idle frames: top row, first 4 columns
const IDLE_FRAMES = [
  { x: 0, y: 0 },
  { x: 32, y: 0 },
  { x: 64, y: 0 },
  { x: 32, y: 0 },
];

// Walk frames: row 4 (y=128), first 5 columns
const WALK_FRAMES = [
  { x: 0, y: 128 },
  { x: 32, y: 128 },
  { x: 64, y: 128 },
  { x: 96, y: 128 },
  { x: 128, y: 128 },
];

type CatState = "idle" | "walking";

export default function FieldCat() {
  const [posX, setPosX] = useState(50); // percent from left
  const [frame, setFrame] = useState(0);
  const [catState, setCatState] = useState<CatState>("idle");
  const [facingLeft, setFacingLeft] = useState(false);
  const [targetX, setTargetX] = useState(50);

  // Pick a new random behavior every few seconds
  useEffect(() => {
    const behaviorInterval = setInterval(() => {
      const rand = Math.random();

      if (rand < 0.4) {
        // 40% chance: stay idle
        setCatState("idle");
      } else {
        // 60% chance: walk to a random spot
        const newTarget = 15 + Math.random() * 70; // keep between 15% and 85%
        setTargetX(newTarget);
        setFacingLeft(newTarget < posX);
        setCatState("walking");
      }
    }, 3000 + Math.random() * 3000); // every 3-6 seconds

    return () => clearInterval(behaviorInterval);
  }, [posX]);

  // Animate frame cycling
  useEffect(() => {
    const frames = catState === "walking" ? WALK_FRAMES : IDLE_FRAMES;
    const speed = catState === "walking" ? 150 : 400;

    const frameInterval = setInterval(() => {
      setFrame((f) => (f + 1) % frames.length);
    }, speed);

    return () => clearInterval(frameInterval);
  }, [catState]);

  // Move toward target when walking
  useEffect(() => {
    if (catState !== "walking") return;

    const moveInterval = setInterval(() => {
      setPosX((current) => {
        const diff = targetX - current;
        if (Math.abs(diff) < 0.5) {
          setCatState("idle");
          return targetX;
        }
        return current + Math.sign(diff) * 0.3;
      });
    }, 16); // ~60fps

    return () => clearInterval(moveInterval);
  }, [catState, targetX]);

  const currentFrames = catState === "walking" ? WALK_FRAMES : IDLE_FRAMES;
  const currentFrame = currentFrames[frame % currentFrames.length];

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
    />
  );
}
