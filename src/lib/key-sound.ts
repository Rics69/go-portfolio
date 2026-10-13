// Mechanical key click synthesised with Web Audio: a filtered noise "tick"
// plus a short pitched "thock" on key-down. No audio files to load.

const STORAGE_KEY = "keyboard-sound";

let ctx: AudioContext | null = null;
let noise: AudioBuffer | null = null;
let enabled: boolean | null = null;
const listeners = new Set<() => void>();

function readEnabled() {
  if (enabled === null) {
    try {
      enabled = localStorage.getItem(STORAGE_KEY) !== "off";
    } catch {
      enabled = true;
    }
  }
  return enabled;
}

export const soundStore = {
  get: readEnabled,
  getServer: () => true,
  set(value: boolean) {
    enabled = value;
    try {
      localStorage.setItem(STORAGE_KEY, value ? "on" : "off");
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for this visit.
    }
    listeners.forEach((listener) => listener());
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

function getNoise(audio: AudioContext) {
  if (!noise) {
    noise = audio.createBuffer(1, Math.floor(audio.sampleRate * 0.05), audio.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / data.length) ** 4;
    }
  }
  return noise;
}

export function playKeySound(kind: "down" | "up") {
  if (typeof window === "undefined" || !readEnabled()) return;

  ctx ??= new AudioContext();
  if (ctx.state === "suspended") void ctx.resume();
  const t = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.value = 0.45;
  master.connect(ctx.destination);

  const tick = ctx.createBufferSource();
  tick.buffer = getNoise(ctx);
  tick.playbackRate.value = 0.85 + Math.random() * 0.3;
  const band = ctx.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.value = kind === "down" ? 2800 : 4200;
  band.Q.value = 1.1;
  const tickGain = ctx.createGain();
  tickGain.gain.setValueAtTime(kind === "down" ? 0.9 : 0.4, t);
  tickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);
  tick.connect(band).connect(tickGain).connect(master);
  tick.start(t);
  tick.stop(t + 0.05);

  if (kind === "down") {
    const body = ctx.createOscillator();
    body.type = "triangle";
    body.frequency.setValueAtTime(190 + Math.random() * 40, t);
    body.frequency.exponentialRampToValueAtTime(70, t + 0.07);
    const bodyGain = ctx.createGain();
    bodyGain.gain.setValueAtTime(0.5, t);
    bodyGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    body.connect(bodyGain).connect(master);
    body.start(t);
    body.stop(t + 0.09);
  }
}
