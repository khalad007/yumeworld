'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from 'react'
import { audioEngine } from '@/lib/AudioEngine'

interface AudioContextValue {
  playing: boolean
  rainOn: boolean
  volume: number
  ready: boolean
  streamError: boolean

  togglePlay: () => Promise<void>
  toggleRain: () => void
  setVolume: (v: number) => void

  playChime: (freq?: number) => void
  playBadge: () => void
  playPetalPop: () => void
  playMochiVoice: (idx: number) => void
  playKuruKuru: () => void
}

const Ctx = createContext<AudioContextValue | null>(null)

export function AudioProvider({ children }: { children: ReactNode }) {
  const [playing, setPlaying] = useState(false)
  const [rainOn, setRainOn] = useState(true)
  const [volume, setVolumeState] = useState(0.85)
  const [ready, setReady] = useState(false)
  const [streamError, setStreamError] = useState(false)
  const initRef = useRef(false)

  const ensureInit = useCallback(async () => {
    if (initRef.current) return
    initRef.current = true
    await audioEngine.init()
    setReady(true)
  }, [])

  const togglePlay = useCallback(async () => {
    await ensureInit()
    if (playing) {
      audioEngine.pauseStream()
      setPlaying(false)
    } else {
      try {
        await audioEngine.playStream()
        setPlaying(true)
        setStreamError(false)
      } catch {
        setStreamError(true)
        setPlaying(false)
      }
    }
  }, [playing, ensureInit])

  const toggleRain = useCallback(() => {
    const next = !rainOn
    setRainOn(next)
    audioEngine.setRain(next)
  }, [rainOn])

  const handleSetVolume = useCallback((v: number) => {
    setVolumeState(v)
    audioEngine.setVolume(v)
  }, [])

  const playChime = useCallback((freq?: number) => {
    ensureInit().then(() => audioEngine.chime(freq))
  }, [ensureInit])

  const playBadge = useCallback(() => {
    ensureInit().then(() => audioEngine.badge())
  }, [ensureInit])

  const playPetalPop = useCallback(() => {
    ensureInit().then(() => audioEngine.petalPop())
  }, [ensureInit])

  const playMochiVoice = useCallback((idx: number) => {
    ensureInit().then(() => audioEngine.mochiVoice(idx))
  }, [ensureInit])

  const playKuruKuru = useCallback(() => {
    ensureInit().then(() => audioEngine.kuruKuru())
  }, [ensureInit])

  return (
    <Ctx.Provider
      value={{
        playing, rainOn, volume, ready, streamError,
        togglePlay, toggleRain, setVolume: handleSetVolume,
        playChime, playBadge, playPetalPop, playMochiVoice, playKuruKuru,
      }}
    >
      {children}
    </Ctx.Provider>
  )
}

export function useAudio() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAudio must be used inside <AudioProvider>')
  return ctx
}
