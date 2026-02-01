// ============================================================
// MOUSTACHE — Audio Engine
// Web Audio API synth — no audio files needed
// ============================================================

const Audio = {
  ctx: null,
  muted: true, // start muted, user opts in
  ambientOsc: null,
  ambientGain: null,
  initialized: false,

  init() {
    if (this.initialized) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.initialized = true;
    } catch (e) {
      console.warn("Web Audio not available");
    }
  },

  ensureContext() {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return !!this.ctx;
  },

  playCorrect() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    // Rising two-note chime: C5 → E5
    [523.25, 659.25].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.15, now + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.3);
      osc.connect(gain).connect(this.ctx.destination);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.4);
    });
  },

  playWrong() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.value = 98;
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    osc.connect(gain).connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.5);
  },

  playGlitch() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.08;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const source = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    source.buffer = buffer;
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    source.connect(gain).connect(this.ctx.destination);
    source.start(now);
  },

  playReveal() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    // Dramatic low drone rising
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(60, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 2);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.setValueAtTime(0.05, now + 1.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
    osc.connect(gain).connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 3);
  },

  startAmbient(corruption) {
    if (this.muted || !this.ensureContext()) return;
    if (this.ambientOsc) {
      // Update existing
      this.ambientOsc.frequency.setTargetAtTime(
        55 + corruption * 50,
        this.ctx.currentTime,
        0.5,
      );
      this.ambientGain.gain.setTargetAtTime(
        corruption * 0.03,
        this.ctx.currentTime,
        0.5,
      );
      return;
    }
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 55 + corruption * 50;
    gain.gain.value = corruption * 0.03;
    osc.connect(gain).connect(this.ctx.destination);
    osc.start();
    this.ambientOsc = osc;
    this.ambientGain = gain;
  },

  stopAmbient() {
    if (this.ambientOsc) {
      try {
        this.ambientOsc.stop();
      } catch (e) {}
      this.ambientOsc = null;
      this.ambientGain = null;
    }
  },

  toggle() {
    this.muted = !this.muted;
    if (this.muted) {
      this.stopAmbient();
    }
    return !this.muted;
  },
};
