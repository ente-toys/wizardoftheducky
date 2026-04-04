let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

export function playMagic() {
  try {
    const ac = getCtx();
    const now = ac.currentTime;

    // Shimmering sweep
    const osc1 = ac.createOscillator();
    const gain1 = ac.createGain();
    osc1.connect(gain1);
    gain1.connect(ac.destination);
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(200, now);
    osc1.frequency.exponentialRampToValueAtTime(1200, now + 0.4);
    osc1.frequency.exponentialRampToValueAtTime(400, now + 0.8);
    gain1.gain.setValueAtTime(0.08, now);
    gain1.gain.linearRampToValueAtTime(0.12, now + 0.3);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
    osc1.start(now);
    osc1.stop(now + 1.0);

    // Ethereal chime
    const osc2 = ac.createOscillator();
    const gain2 = ac.createGain();
    osc2.connect(gain2);
    gain2.connect(ac.destination);
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(800, now + 0.1);
    osc2.frequency.exponentialRampToValueAtTime(1600, now + 0.5);
    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.06, now + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
    osc2.start(now + 0.1);
    osc2.stop(now + 0.9);

    // Deep rumble
    const osc3 = ac.createOscillator();
    const gain3 = ac.createGain();
    osc3.connect(gain3);
    gain3.connect(ac.destination);
    osc3.type = "sine";
    osc3.frequency.setValueAtTime(60, now);
    osc3.frequency.exponentialRampToValueAtTime(40, now + 0.8);
    gain3.gain.setValueAtTime(0.1, now);
    gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    osc3.start(now);
    osc3.stop(now + 0.8);
  } catch {}
}
