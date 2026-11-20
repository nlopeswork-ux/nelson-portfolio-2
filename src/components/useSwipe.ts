import { useRef } from 'react'
import type { TouchEvent, WheelEvent } from 'react'

const THRESHOLD = 40
const WHEEL_THRESHOLD = 30
const WHEEL_COOLDOWN = 450

/**
 * Horizontal gesture navigation for carousels: touch swipe, plus two-finger trackpad scroll.
 * Vertical scrolling is left alone (see `.swipe-x`: touch-action pan-y). Arrows and dots keep working.
 * Spread the result on the carousel viewport.
 */
export function useSwipe(onPrev: () => void, onNext: () => void) {
  const start = useRef<{ x: number; y: number } | null>(null)
  const wheelAt = useRef(0)

  return {
    className: 'swipe-x',
    onTouchStart: (e: TouchEvent) => {
      const t = e.touches[0]
      start.current = { x: t.clientX, y: t.clientY }
    },
    onTouchEnd: (e: TouchEvent) => {
      if (!start.current) return
      const t = e.changedTouches[0]
      const dx = t.clientX - start.current.x
      const dy = t.clientY - start.current.y
      start.current = null
      if (Math.abs(dx) > THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.2) (dx < 0 ? onNext : onPrev)()
    },
    onWheel: (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < WHEEL_THRESHOLD || Math.abs(e.deltaX) < Math.abs(e.deltaY)) return
      const now = Date.now()
      if (now - wheelAt.current < WHEEL_COOLDOWN) return
      wheelAt.current = now
      ;(e.deltaX > 0 ? onNext : onPrev)()
    },
  }
}
