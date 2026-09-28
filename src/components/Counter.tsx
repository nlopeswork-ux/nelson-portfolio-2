import { useEffect, useRef, useState } from 'react'

interface ParsedValue {
  prefix: string
  suffix: string
  target: number
  hasComma: boolean
  decimals: number
}

const NUMBER_PATTERN = /^(\D*)([\d,]*\d(?:\.\d+)?)(.*)$/

function parseValue(raw: string): ParsedValue | null {
  const match = raw.match(NUMBER_PATTERN)
  if (!match) return null
  const [, prefix, numStr, suffix] = match
  const target = parseFloat(numStr.replace(/,/g, ''))
  if (Number.isNaN(target)) return null
  return {
    prefix,
    suffix,
    target,
    hasComma: numStr.includes(','),
    decimals: numStr.includes('.') ? numStr.split('.')[1].length : 0,
  }
}

function formatNumber(n: number, { hasComma, decimals }: ParsedValue): string {
  const rounded = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString()
  if (!hasComma) return rounded
  const [intPart, decPart] = rounded.split('.')
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return decPart ? `${withCommas}.${decPart}` : withCommas
}

const DURATION = 700
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function Counter({ value }: { value: string }) {
  const parsed = useRef(parseValue(value)).current
  const elRef = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  const [display, setDisplay] = useState(() => {
    if (!parsed) return value
    return prefersReducedMotion() ? formatNumber(parsed.target, parsed) : formatNumber(0, parsed)
  })

  useEffect(() => {
    if (!parsed || prefersReducedMotion()) return
    const el = elRef.current
    if (!el) return

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return
      started.current = true
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION)
        setDisplay(formatNumber(parsed.target * easeOutCubic(t), parsed))
        if (t < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
      obs.disconnect()
    }, { threshold: 0.4 })

    obs.observe(el)
    return () => obs.disconnect()
  }, [parsed])

  if (!parsed) return <span>{value}</span>
  return (
    <span ref={elRef}>
      {parsed.prefix}{display}{parsed.suffix}
    </span>
  )
}
