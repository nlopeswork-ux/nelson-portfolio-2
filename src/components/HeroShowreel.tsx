import { useEffect, useRef } from 'react'
import showreelMp4 from '../imports/hero-showreel.mp4'
import showreelWebm from '../imports/hero-showreel.webm'
import showreelPoster from '../imports/hero-showreel-poster.jpg'

// Muted looping showreel (autoplay needs muted). Plays only while on screen,
// and stays on the poster frame when the visitor prefers reduced motion.
// The poster is the video's first frame, so the switch from poster to playback has no jump;
// preload="auto" because it sits in the hero, above the fold.
export default function HeroShowreel({ label }: { label: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { el.pause(); return }
    if (typeof IntersectionObserver === 'undefined') { el.play().catch(() => {}); return }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.play().catch(() => {})
      else el.pause()
    }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <video ref={ref} aria-label={label} poster={showreelPoster} muted loop playsInline preload="auto" disablePictureInPicture>
      <source src={showreelWebm} type="video/webm" />
      <source src={showreelMp4} type="video/mp4" />
    </video>
  )
}
