import { useEffect, useState } from 'react'

export type CountdownState =
  | { phase: 'countdown'; days: number; hours: number; minutes: number; seconds: number }
  | { phase: 'live'; matchday: number }

function compute(target: number, now: number): CountdownState {
  if (now >= target) {
    const elapsedMs = now - target
    const day = 86_400_000
    const matchday = Math.min(32, Math.floor(elapsedMs / day) + 1)
    return { phase: 'live', matchday }
  }

  const totalSec = Math.floor((target - now) / 1000)
  const days = Math.floor(totalSec / 86_400)
  const hours = Math.floor((totalSec % 86_400) / 3_600)
  const minutes = Math.floor((totalSec % 3_600) / 60)
  const seconds = totalSec % 60
  return { phase: 'countdown', days, hours, minutes, seconds }
}

export function useCountdown(targetISO: string): CountdownState {
  const target = new Date(targetISO).getTime()
  const [state, setState] = useState<CountdownState>(() => compute(target, Date.now()))

  useEffect(() => {
    const tick = () => setState(compute(target, Date.now()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  return state
}
