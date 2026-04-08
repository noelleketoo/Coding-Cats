function ctx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  return new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
}

function tone(
  ac: AudioContext,
  freq: number,
  start: number,
  duration: number,
  gain = 0.25,
  type: OscillatorType = "sine"
) {
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.connect(g);
  g.connect(ac.destination);
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(gain, start);
  g.gain.exponentialRampToValueAtTime(0.001, start + duration);
  osc.start(start);
  osc.stop(start + duration + 0.01);
}

export function playSolveSound() {
  const ac = ctx();
  if (!ac) return;
  const t = ac.currentTime;
  // Ascending arpeggio C5-E5-G5-C6
  [523, 659, 784, 1047].forEach((f, i) => tone(ac, f, t + i * 0.09, 0.18));
}

export function playCoinSound() {
  const ac = ctx();
  if (!ac) return;
  const t = ac.currentTime;
  tone(ac, 1047, t, 0.08, 0.2);
  tone(ac, 1319, t + 0.06, 0.08, 0.2);
}

export function playUnlockSound() {
  const ac = ctx();
  if (!ac) return;
  const t = ac.currentTime;
  // Fanfare: C5 E5 G5 E5 C6
  [523, 659, 784, 659, 1047].forEach((f, i) => tone(ac, f, t + i * 0.1, 0.2, 0.3));
}

export function playClickSound() {
  const ac = ctx();
  if (!ac) return;
  tone(ac, 600, ac.currentTime, 0.04, 0.08, "square");
}

export function playHintSound() {
  const ac = ctx();
  if (!ac) return;
  const t = ac.currentTime;
  tone(ac, 440, t, 0.1, 0.15);
  tone(ac, 550, t + 0.08, 0.1, 0.15);
}
