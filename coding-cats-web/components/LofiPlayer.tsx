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
    const reverb = new Tone.Reverb({ decay: 2.5, wet: 0.25 }).toDestination();
    const filter = new Tone.Filter(1400, "lowpass").connect(reverb);
    const chorus = new Tone.Chorus(3, 2, 0.2).connect(filter).start();
    const vol = new Tone.Volume(-8).connect(chorus);

    // --- Chord synth (bright pluck) ---
    const chordSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "square4" },
      envelope: { attack: 0.02, decay: 0.3, sustain: 0.4, release: 0.8 },
      volume: -10,
    }).connect(vol);

    // --- Melody synth (bouncy triangle) ---
    const melodySynth = new Tone.Synth({
      oscillator: { type: "triangle" },
      envelope: { attack: 0.02, decay: 0.15, sustain: 0.5, release: 0.5 },
      volume: -10,
    }).connect(vol);

    // --- Bass synth (punchy) ---
    const bassSynth = new Tone.Synth({
      oscillator: { type: "sawtooth" },
      envelope: { attack: 0.01, decay: 0.2, sustain: 0.3, release: 0.4 },
      volume: -12,
    }).connect(vol);

    // --- Hi-hat ---
    const hihat = new Tone.NoiseSynth({
      noise: { type: "white" },
      envelope: { attack: 0.001, decay: 0.04, sustain: 0, release: 0.04 },
      volume: -22,
    }).connect(vol);

    // --- Kick drum ---
    const kick = new Tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 6,
      envelope: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.1 },
      volume: -14,
    }).connect(vol);

    // --- Snare ---
    const snare = new Tone.NoiseSynth({
      noise: { type: "pink" },
      envelope: { attack: 0.001, decay: 0.12, sustain: 0, release: 0.1 },
      volume: -20,
    }).connect(vol);

    // --- Counter-melody (bell-like) ---
    const bellSynth = new Tone.Synth({
      oscillator: { type: "sine" },
      envelope: { attack: 0.01, decay: 0.4, sustain: 0.1, release: 0.8 },
      volume: -18,
    }).connect(vol);

    // Chord progression: C - G - Am - F
    const chords = [
      ["C4", "E4", "G4"],
      ["G3", "B3", "D4"],
      ["A3", "C4", "E4"],
      ["F3", "A3", "C4"],
    ];

    // Walking bass lines per chord
    const bassLines = [
      ["C2", "E2", "G2", "B2"],
      ["G2", "B2", "D3", "F3"],
      ["A2", "C3", "E3", "G3"],
      ["F2", "A2", "C3", "E3"],
    ];

    // Main bouncy melody
    const melodyLines = [
      ["G5", "E5", "G5", "C5", "E5", "G5", "E5", "D5"],
      ["D5", "B4", "D5", "G4", "B4", "D5", "B4", "A4"],
      ["E5", "C5", "E5", "A4", "C5", "E5", "C5", "B4"],
      ["F5", "A4", "C5", "F4", "A4", "C5", "A4", "G4"],
    ];

    // Counter-melody (sparse, higher register)
    const counterLines = [
      ["C6", null, "E6", null, "G6", null, "E6", null],
      ["B5", null, "D6", null, "G5", null, "B5", null],
      ["A5", null, "C6", null, "E6", null, "C6", null],
      ["F5", null, "A5", null, "C6", null, "A5", null],
    ];

    const BPM = 100;
    Tone.getTransport().bpm.value = BPM;

    let chordIndex = 0;
    let melodyStep = 0;
    let bassStep = 0;
    let counterStep = 0;
    let beatStep = 0;

    // Chords every bar
    const chordLoop = new Tone.Sequence(
      (time) => {
        chordSynth.triggerAttackRelease(chords[chordIndex], "4n", time);
        chordIndex = (chordIndex + 1) % chords.length;
      },
      [0],
      "1n"
    );

    // Walking bass every quarter note
    const bassLoop = new Tone.Sequence(
      (time) => {
        const chord = Math.floor(bassStep / 4) % bassLines.length;
        bassSynth.triggerAttackRelease(bassLines[chord][bassStep % 4], "8n", time);
        bassStep++;
      },
      [0],
      "4n"
    );

    // Melody every 8th note
    const melodyLoop = new Tone.Sequence(
      (time) => {
        const chord = Math.floor(melodyStep / 8) % melodyLines.length;
        const note = melodyLines[chord][melodyStep % 8];
        if (Math.random() > 0.1) {
          melodySynth.triggerAttackRelease(note, "16n", time);
        }
        melodyStep++;
      },
      [0],
      "8n"
    );

    // Counter-melody every 8th note
    const counterLoop = new Tone.Sequence(
      (time) => {
        const chord = Math.floor(counterStep / 8) % counterLines.length;
        const note = counterLines[chord][counterStep % 8];
        if (note) bellSynth.triggerAttackRelease(note, "8n", time);
        counterStep++;
      },
      [0],
      "8n"
    );

    // Drum pattern: kick on 1&3, snare on 2&4, hihat every 8th
    const drumLoop = new Tone.Sequence(
      (time) => {
        const step = beatStep % 8;
        if (step === 0 || step === 4) kick.triggerAttackRelease("C1", "8n", time);
        if (step === 2 || step === 6) snare.triggerAttackRelease("8n", time);
        hihat.triggerAttackRelease("16n", time);
        beatStep++;
      },
      [0],
      "8n"
    );

    chordLoop.start(0);
    bassLoop.start(0);
    melodyLoop.start(0);
    counterLoop.start(0);
    drumLoop.start(0);
    Tone.getTransport().start();

    startedRef.current = true;
    setPlaying(true);

    cleanupRef.current = () => {
      chordLoop.stop();
      bassLoop.stop();
      melodyLoop.stop();
      counterLoop.stop();
      drumLoop.stop();
      Tone.getTransport().stop();
      chordSynth.dispose();
      melodySynth.dispose();
      bassSynth.dispose();
      bellSynth.dispose();
      hihat.dispose();
      kick.dispose();
      snare.dispose();
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
