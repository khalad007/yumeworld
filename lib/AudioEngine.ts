'use client'

const LOFI_STREAMS = [
  'https://streams.ilovemusic.de/iloveradio17.mp3',
  'https://ice1.somafm.com/groovesalad-128-mp3',
]

function createRainNoise(ctx: AudioContext): AudioBufferSourceNode {
  const bufferSize = ctx.sampleRate * 4
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.4
  }
  const src = ctx.createBufferSource()
  src.buffer = buffer
  src.loop = true
  return src
}

function playChime(ctx: AudioContext, master: GainNode, freq = 880, type: OscillatorType = 'sine') {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, ctx.currentTime)
  gain.gain.setValueAtTime(0.18, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2)
  osc.connect(gain)
  gain.connect(master)
  osc.start()
  osc.stop(ctx.currentTime + 1.2)
}

function playBadge(ctx: AudioContext, master: GainNode) {
  const notes = [523.25, 659.25, 783.99, 1046.5]
  notes.forEach((freq, i) => setTimeout(() => playChime(ctx, master, freq, 'triangle'), i * 80))
}

function playPetalPop(ctx: AudioContext, master: GainNode) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(1200, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.18)
  gain.gain.setValueAtTime(0.12, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22)
  osc.connect(gain)
  gain.connect(master)
  osc.start()
  osc.stop(ctx.currentTime + 0.22)
}

// Cute anime-style voice: sawtooth + formant bandpass + vibrato LFO
// Each pattern is [baseHz, peakHz, endHz, durationSec]
const VOICE_PATTERNS: [number, number, number, number][] = [
  [320, 355, 268, 0.52],  // ne~
  [290, 430, 305, 0.44],  // hai~
  [305, 395, 305, 0.50],  // nya~
  [270, 365, 240, 0.58],  // u~wa
  [340, 370, 280, 0.46],  // ee~
  [295, 420, 260, 0.54],  // kyaa~
]

function playMochiVoice(ctx: AudioContext, master: GainNode, idx: number) {
  const t = ctx.currentTime
  const [base, peak, end, dur] = VOICE_PATTERNS[idx % VOICE_PATTERNS.length]

  const osc = ctx.createOscillator()
  osc.type = 'sawtooth'  // rich harmonics = more voice-like than sine

  // Vibrato LFO
  const vibLfo = ctx.createOscillator()
  const vibGain = ctx.createGain()
  vibLfo.type = 'sine'
  vibLfo.frequency.value = 5.8
  vibGain.gain.value = 7
  vibLfo.connect(vibGain)
  vibGain.connect(osc.frequency)

  // Bandpass to shape a vowel formant (~"e/i" character)
  const formant = ctx.createBiquadFilter()
  formant.type = 'bandpass'
  formant.frequency.value = 1150
  formant.Q.value = 3.5

  const gain = ctx.createGain()

  osc.frequency.setValueAtTime(base, t)
  osc.frequency.linearRampToValueAtTime(peak, t + 0.07)
  osc.frequency.linearRampToValueAtTime(end, t + dur)

  gain.gain.setValueAtTime(0, t)
  gain.gain.linearRampToValueAtTime(0.09, t + 0.04)
  gain.gain.setValueAtTime(0.09, t + dur - 0.12)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur)

  osc.connect(formant)
  formant.connect(gain)
  gain.connect(master)

  vibLfo.start(t)
  vibLfo.stop(t + dur + 0.05)
  osc.start(t)
  osc.stop(t + dur + 0.05)
}

// くるくる spinning sound: 3 quick pitch sweeps up-down-up = spin sensation
function playKuruKuru(ctx: AudioContext, master: GainNode) {
  const t = ctx.currentTime
  for (let i = 0; i < 3; i++) {
    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    osc.type = 'triangle'
    const st = t + i * 0.27

    osc.frequency.setValueAtTime(540, st)
    osc.frequency.exponentialRampToValueAtTime(1080, st + 0.12)
    osc.frequency.exponentialRampToValueAtTime(540, st + 0.24)

    g.gain.setValueAtTime(0, st)
    g.gain.linearRampToValueAtTime(0.13, st + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, st + 0.26)

    osc.connect(g)
    g.connect(master)
    osc.start(st)
    osc.stop(st + 0.28)
  }
}

class AudioEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private rainSource: AudioBufferSourceNode | null = null
  private rainGain: GainNode | null = null
  private rainOn = true
  private streamEl: HTMLAudioElement | null = null
  private streamPlaying = false
  private started = false
  private masterVolume = 0.85

  async init() {
    if (this.started) return
    this.started = true

    this.ctx = new AudioContext()
    this.master = this.ctx.createGain()
    this.master.gain.value = this.masterVolume
    this.master.connect(this.ctx.destination)

    // HPF removes sub-bass static; peaking at 3kHz adds rain hiss; LPF softens top
    this.rainGain = this.ctx.createGain()
    this.rainGain.gain.value = this.rainOn ? 0.28 : 0

    const hpf = this.ctx.createBiquadFilter()
    hpf.type = 'highpass'
    hpf.frequency.value = 350
    hpf.Q.value = 0.5

    const peak = this.ctx.createBiquadFilter()
    peak.type = 'peaking'
    peak.frequency.value = 3000
    peak.gain.value = 8
    peak.Q.value = 0.8

    const lpf = this.ctx.createBiquadFilter()
    lpf.type = 'lowpass'
    lpf.frequency.value = 9000
    lpf.Q.value = 0.5

    this.rainSource = createRainNoise(this.ctx)
    this.rainSource.connect(hpf)
    hpf.connect(peak)
    peak.connect(lpf)
    lpf.connect(this.rainGain)
    this.rainGain.connect(this.master)
    this.rainSource.start()

    this.streamEl = document.createElement('audio')
    this.streamEl.loop = false
    this.streamEl.volume = this.masterVolume
  }

  async playStream() {
    if (!this.ctx || !this.streamEl) return
    if (this.ctx.state === 'suspended') await this.ctx.resume()
    for (const url of LOFI_STREAMS) {
      try {
        this.streamEl.src = url
        await this.streamEl.play()
        this.streamPlaying = true
        return
      } catch (e) {
        console.warn('[AudioEngine] Stream failed:', url, e)
      }
    }
    this.streamPlaying = false
    throw new Error('All lo-fi streams unavailable')
  }

  pauseStream() {
    this.streamEl?.pause()
    this.streamPlaying = false
  }

  isStreamPlaying() { return this.streamPlaying }

  setRain(on: boolean) {
    this.rainOn = on
    if (!this.rainGain || !this.ctx) return
    this.rainGain.gain.cancelScheduledValues(this.ctx.currentTime)
    this.rainGain.gain.linearRampToValueAtTime(on ? 0.28 : 0, this.ctx.currentTime + 0.8)
  }

  setVolume(v: number) {
    this.masterVolume = v
    if (this.master && this.ctx) this.master.gain.linearRampToValueAtTime(v, this.ctx.currentTime + 0.3)
    if (this.streamEl) this.streamEl.volume = Math.min(1, v)
  }

  chime(freq?: number) {
    if (!this.ctx || !this.master) return
    playChime(this.ctx, this.master, freq)
  }

  badge() {
    if (!this.ctx || !this.master) return
    playBadge(this.ctx, this.master)
  }

  petalPop() {
    if (!this.ctx || !this.master) return
    playPetalPop(this.ctx, this.master)
  }

  mochiVoice(idx: number) {
    if (!this.ctx || !this.master) return
    playMochiVoice(this.ctx, this.master, idx)
  }

  kuruKuru() {
    if (!this.ctx || !this.master) return
    playKuruKuru(this.ctx, this.master)
  }
}

export const audioEngine = new AudioEngine()
