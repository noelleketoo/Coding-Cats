"use client";

import { useState, useRef } from "react";

export default function LofiPlayer() {
  const [playing, setPlaying] = useState(false);
  const startedRef = useRef(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  async function toggle() {
    if (playing) {
      cleanupRef.current?.();
      cleanupRef.current = null;
      startedRef.current = false;
      setPlaying(false);
      return;
    }

    // Dynamically import Tone.js so it only loads client-side
    const Tone = await import("tone");
    await Tone.start();

    // --- Effects chain ---
    const reverb = new Tone.Reverb({ decay: 4, wet: 0.4 }).toDestination();
    const filter = new Tone.Filter(900, "lowpass").connect(reverb);
    const chorus = new Tone.Chorus(2, 2.5, 0.3).connect(filter).start();
    const vol = new Tone.Volume(-10).connect(chorus);

    // --- Chord synth (soft pads) ---
    const chordSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: { attack: 0.4, decay: 0.2, sustain: 0.7, release: 1.5 },
      volume: -8,
    }).connect(vol);

    // --- Melody synth ---
    const melodySynth = new Tone.Synth({
      oscillator: { type: "sine" },
      envelope: { attack: 0.05, decay: 0.3, sustain: 0.4, release: 1 },
      volume: -14,
    }).connect(vol);

    // --- Bass synth ---
    const bassSynth = new Tone.Synth({
      oscillator: { type: "triangle" },
      envelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 0.8 },
      volume: -10,
    }).connect(vol);

    // Lofi chord progression in C major (Cmaj7 - Am7 - Fmaj7 - G7)
    const chords = [
      ["C4", "E4", "G4", "B4"],
      ["A3", "C4", "E4", "G4"],
      ["F3", "A3", "C4", "E4"],
      ["G3", "B3", "D4", "F4"],
    ];

    const bassNotes = ["C3", "A2", "F2", "G2"];

    // Simple pentatonic melody notes over each chord
    const melodyLines = [
      ["E5", "G5", "B4", "G5"],
      ["A4", "C5", "E5", "C5"],
      ["F4", "A4", "C5", "A4"],
      ["G4", "B4", "D5", "B4"],
    ];

    const BPM = 72;
    Tone.getTransport().bpm.value = BPM;

    let chordIndex = 0;
    let melodyStep = 0;

    // Play chords every 2 beats
    const chordLoop = new Tone.Sequence(
      (time) => {
        chordSynth.triggerAttackRelease(chords[chordIndex], "2n", time);
        bassSynth.triggerAttackRelease(bassNotes[chordIndex], "2n", time);
        chordIndex = (chordIndex + 1) % chords.length;
      },
      [0],
      "2n"
    );

    // Play melody every half-beat
    const melodyLoop = new Tone.Sequence(
      (time) => {
        const chord = Math.floor(melodyStep / 4) % melodyLines.length;
        const note = melodyLines[chord][melodyStep % 4];
        // Occasionally skip a note for that lazy lofi feel
        if (Math.random() > 0.25) {
          melodySynth.triggerAttackRelease(note, "8n", time);
        }
        melodyStep++;
      },
      [0],
      "4n"
    );

    chordLoop.start(0);
    melodyLoop.start(0);
    Tone.getTransport().start();

    startedRef.current = true;
    setPlaying(true);

    cleanupRef.current = () => {
      chordLoop.stop();
      melodyLoop.stop();
      Tone.getTransport().stop();
      chordSynth.dispose();
      melodySynth.dispose();
      bassSynth.dispose();
      vol.dispose();
      chorus.dispose();
      filter.dispose();
      reverb.dispose();
    };
  }

  return (
    <button
      onClick={toggle}
      title={playing ? "Mute music" : "Play lofi music"}
      className="text-lg"
    >
      {playing ? "🔊" : "🔇"}
    </button>
  );
}
