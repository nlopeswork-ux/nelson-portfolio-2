import { useCallback, useRef, useState } from 'react'
import type { KeyboardEvent, TouchEvent } from 'react'

export interface CarouselImage {
  src: string
  alt: string
  caption?: string
}

interface PrototypeCarouselProps {
  images: CarouselImage[]
  /** "mobile" = 390:844 phone frame. "wide" = FigJam/board-shot aspect. */
  aspectRatio?: 'mobile' | 'wide'
}

const ASPECT: Record<'mobile' | 'wide', string> = {
  mobile: '390 / 844',
  wide: '16 / 10',
}

const SWIPE_THRESHOLD = 40

export default function PrototypeCarousel({ images, aspectRatio = 'mobile' }: PrototypeCarouselProps) {
  const [index, setIndex] = useState(0)
  const [failed, setFailed] = useState<Record<number, boolean>>({})
  const [settled, setSettled] = useState(true)
  const touchStartX = useRef<number | null>(null)
  const isMobileFrame = aspectRatio === 'mobile'

  const go = useCallback((delta: number) => {
    setSettled(false)
    setIndex(i => (i + delta + images.length) % images.length)
  }, [images.length])

  const goTo = useCallback((i: number) => {
    setSettled(false)
    setIndex(i)
  }, [])

  if (images.length === 0) return null
  const current = images[index]
  const single = images.length === 1

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (single) return
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
  }

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (single || touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > SWIPE_THRESHOLD) go(delta < 0 ? 1 : -1)
    touchStartX.current = null
  }

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Prototype screens"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ outline: 'none' }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <div
          style={{
            width: isMobileFrame ? 'min(280px, 68vw)' : '100%',
            maxWidth: isMobileFrame ? 280 : 680,
            aspectRatio: ASPECT[aspectRatio],
            borderRadius: isMobileFrame ? 32 : 16,
            border: isMobileFrame ? '8px solid #12141F' : '1px solid #EAF1FF',
            overflow: 'hidden',
            background: '#F5F7FC',
            position: 'relative',
          }}
        >
          {!failed[index] ? (
            <img
              src={current.src}
              alt={current.alt}
              loading={index === 0 ? 'eager' : 'lazy'}
              onLoad={() => setSettled(true)}
              onError={() => { setFailed(f => ({ ...f, [index]: true })); setSettled(true) }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: settled ? 1 : 0, transition: 'opacity 180ms ease-out' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 16, textAlign: 'center', background: 'repeating-linear-gradient(135deg, #EEF1F8, #EEF1F8 10px, #E4E8F4 10px, #E4E8F4 20px)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#8A8FA3', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Image pending</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#5A5F73', wordBreak: 'break-all' }}>{current.src.split('/').pop()}</div>
            </div>
          )}
        </div>
      </div>

      {current.caption && (
        <p style={{ textAlign: 'center', fontSize: 13, lineHeight: 1.6, color: '#5A5F73', margin: '0 auto 16px', maxWidth: 480 }}>{current.caption}</p>
      )}

      {!single && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          <button type="button" className="carousel-arrow" aria-label="Previous screen" onClick={() => go(-1)}>←</button>
          <div style={{ display: 'flex', gap: 8 }}>
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                style={{ cursor: 'pointer', width: 8, height: 8, borderRadius: '50%', background: i === index ? '#002FA7' : '#DCE8FF', border: 'none', padding: 0 }}
              />
            ))}
          </div>
          <button type="button" className="carousel-arrow" aria-label="Next screen" onClick={() => go(1)}>→</button>
        </div>
      )}
    </div>
  )
}
