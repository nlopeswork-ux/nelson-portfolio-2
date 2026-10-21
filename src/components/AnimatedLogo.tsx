import { useEffect, useRef } from 'react'

// Animated "nl." -> "nelson lopes." wordmark. Footer only; styles live in index.css (.nl-logo).
type StateName = 'nl' | 'nelsonl' | 'full'
type State = { show: number[]; tail: number; dot: number; pill: number }

const STATES: Record<StateName, State> = {
  nl:      { show: [0, 6],                                  tail: -169.354, dot: 115.862, pill: 126 },
  nelsonl: { show: [0, 1, 2, 3, 4, 5, 6],                   tail: 0,        dot: 285.216, pill: 294.5 },
  full:    { show: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],      tail: 0,        dot: 421.5,   pill: 429.5 },
}

const T = {
  firstDelay: 900,
  holdInitials: 4000,
  holdMiddle: 700,
  holdFull: 6000,
  gap: 4,
  leadOut: 140,
  moveIn: 1000,
  moveOut: 850,
  fadeIn: 420,
  fadeOut: 220,
}

const RIGHT = [87.15, 123.41, 142.49, 170.15, 204.89, 238.56, 276.04, 311.22, 347.4, 381.63, 411.22]
const L_LEFT = 261.58
const DOT_R = 5.284

const [X1, Y1, X2, Y2] = [0.77, 0, 0.175, 1]
const bez = (a: number, b: number, s: number) => 3 * a * s * (1 - s) ** 2 + 3 * b * s * s * (1 - s) + s ** 3
function timeAt(progress: number) {
  let lo = 0, hi = 1
  for (let k = 0; k < 24; k++) {
    const mid = (lo + hi) / 2
    if (bez(Y1, Y2, mid) < progress) lo = mid
    else hi = mid
  }
  return bez(X1, X2, (lo + hi) / 2)
}
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

export default function AnimatedLogo() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)')
    if (reduce.matches) return

    const g = [...svg.querySelectorAll<SVGElement>('.nl-g')]
    const tail = svg.querySelector<SVGElement>('.nl-tail')!
    const dot = svg.querySelector<SVGElement>('.nl-dot')!
    const body = svg.querySelector<SVGElement>('.nl-pill-body')!
    const cap = svg.querySelector<SVGElement>('.nl-pill-cap')!

    function apply(name: StateName, from: StateName, opts: { move: number }) {
      const s = STATES[name], f = STATES[from]
      const prev = new Set(f.show)
      const next = new Set(s.show)
      const entering = s.show.filter(i => !prev.has(i))
      const leaving = [...prev].filter(i => !next.has(i))

      const edge = s.tail !== f.tail
        ? { a: L_LEFT + f.tail, b: L_LEFT + s.tail }
        : { a: f.dot - DOT_R, b: s.dot - DOT_R }
      const lead = leaving.length ? T.leadOut : 0
      const passes = (i: number) => lead + opts.move * timeAt(clamp01((RIGHT[i] + T.gap - edge.a) / (edge.b - edge.a)))

      svg!.style.setProperty('--nl-move', `${opts.move}ms`)
      svg!.style.setProperty('--nl-delay', `${lead}ms`)
      entering.forEach(i => {
        g[i].style.setProperty('--nl-fade', `${T.fadeIn}ms`)
        g[i].style.transitionDelay = `${Math.round(passes(i))}ms`
        g[i].classList.remove('is-off')
      })
      leaving.forEach(i => {
        g[i].style.setProperty('--nl-fade', `${T.fadeOut}ms`)
        g[i].style.transitionDelay = `${Math.max(0, Math.round(passes(i) - T.fadeOut))}ms`
        g[i].classList.add('is-off')
      })

      tail.style.transform = `translateX(${s.tail}px)`
      dot.style.transform = `translateX(${s.dot - STATES.full.dot}px)`
      body.style.transform = `translateX(60px) scaleX(${s.pill - 70})`
      cap.style.transform = `translateX(${s.pill - 10}px)`
    }

    const seq: [StateName, StateName, number, number][] = [
      ['nelsonl', 'nl', T.moveIn, T.holdMiddle],
      ['full', 'nelsonl', T.moveIn * 0.85, T.holdFull],
      ['nelsonl', 'full', T.moveOut * 0.85, T.holdMiddle],
      ['nl', 'nelsonl', T.moveOut, T.holdInitials],
    ]

    let i = 0
    let timer: ReturnType<typeof setTimeout> | undefined
    let running = false
    let remaining = T.firstDelay
    let deadline = 0
    function schedule(ms: number) {
      deadline = performance.now() + ms
      timer = setTimeout(tick, ms)
    }
    function tick() {
      const [to, from, move, hold] = seq[i]
      apply(to, from, { move })
      i = (i + 1) % seq.length
      schedule(move + T.leadOut + hold)
    }
    function start() {
      if (running) return
      running = true
      schedule(remaining)
    }
    function stop() {
      if (!running) return
      running = false
      clearTimeout(timer)
      remaining = Math.max(0, deadline - performance.now())
    }

    svg.classList.add('no-transition', 'is-animated')
    g.forEach((el, n) => el.classList.toggle('is-off', !STATES.nl.show.includes(n)))
    apply('nl', 'nl', { move: 0 })
    svg.getBoundingClientRect()
    svg.classList.remove('no-transition')

    let inView = false
    const sync = () => (inView && !document.hidden ? start() : stop())
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; sync() }, { threshold: 0.6 })
    io.observe(svg)
    document.addEventListener('visibilitychange', sync)

    const onReduce = (e: MediaQueryListEvent) => {
      if (!e.matches) return
      stop()
      svg.classList.remove('is-animated')
      ;[tail, dot, body, cap].forEach(el => { el.style.transform = '' })
      g.forEach(el => { el.classList.remove('is-off'); el.style.transitionDelay = '' })
    }
    reduce.addEventListener('change', onReduce)

    return () => {
      stop()
      io.disconnect()
      document.removeEventListener('visibilitychange', sync)
      reduce.removeEventListener('change', onReduce)
      svg.classList.remove('is-animated', 'no-transition')
      ;[tail, dot, body, cap].forEach(el => { el.style.transform = '' })
      g.forEach(el => { el.classList.remove('is-off'); el.style.transitionDelay = '' })
    }
  }, [])

  return (
    <svg ref={svgRef} className="nl-logo" viewBox="48 198 386 67" preserveAspectRatio="xMinYMid meet" role="img" aria-label="Nelson Lopes">
      <g className="nl-pill" aria-hidden="true">
      <circle cx="60" cy="243.078" r="10"/>
      <rect className="nl-pill-body" x="0" y="233.078" width="1" height="20"/>
      <circle className="nl-pill-cap" cx="0" cy="243.078" r="10"/>
      </g>
      <g className="nl-ink" aria-hidden="true">
      <path className="nl-g" data-i="0" d="M77.7682 214.375C80.7272 214.375 83.031 215.284 84.6795 217.101C86.3281 218.876 87.1524 221.348 87.1524 224.517V248.986H78.1487V226.039C78.1487 224.222 77.8316 222.954 77.1976 222.235C76.6058 221.475 75.697 221.094 74.4711 221.094C73.203 221.094 72.0405 221.496 70.9838 222.299C69.9693 223.06 68.9759 224.222 68.0037 225.785V248.986H59V215.389H66.799L67.4964 219.636C68.8914 217.904 70.4131 216.594 72.0617 215.706C73.7525 214.819 75.6547 214.375 77.7682 214.375Z"/>
      <path className="nl-g" data-i="1" d="M123.411 231.133C123.411 231.563 123.347 232.746 123.218 234.681H101.868C102.169 237.777 103.008 239.97 104.384 241.26C105.76 242.55 107.63 243.195 109.995 243.195C111.457 243.195 112.833 242.958 114.123 242.486C115.413 242.013 116.811 241.26 118.316 240.228L122.121 245.388C118.294 248.484 113.973 250.032 109.157 250.032C103.782 250.032 99.6535 248.419 96.7725 245.194C93.8915 241.97 92.451 237.605 92.451 232.101C92.451 228.618 93.053 225.5 94.257 222.749C95.504 219.953 97.2885 217.76 99.6105 216.17C101.976 214.578 104.771 213.783 107.996 213.783C112.855 213.783 116.639 215.309 119.348 218.362C122.056 221.416 123.411 225.673 123.411 231.133ZM114.316 228.554C114.316 222.877 112.274 220.039 108.189 220.039C106.297 220.039 104.814 220.749 103.739 222.168C102.707 223.544 102.083 225.801 101.868 228.94H114.316V228.554Z"/>
      <path className="nl-g" data-i="2" d="M136.619 250.032C133.824 250.032 131.653 249.236 130.105 247.646C128.557 246.012 127.783 243.711 127.783 240.744V201.205L136.942 200.173V240.486C136.942 241.991 137.565 242.743 138.812 242.743C139.5 242.743 140.102 242.614 140.618 242.356L142.489 248.871C140.726 249.645 138.769 250.032 136.619 250.032Z"/>
      <path className="nl-g" data-i="3" d="M156.608 213.783C161.424 213.783 165.552 215.159 168.992 217.911L165.509 223.135C162.628 221.329 159.79 220.426 156.995 220.426C155.49 220.426 154.329 220.706 153.512 221.265C152.695 221.824 152.286 222.576 152.286 223.522C152.286 224.21 152.458 224.791 152.802 225.264C153.189 225.737 153.877 226.188 154.866 226.618C155.898 227.049 157.425 227.564 159.446 228.167C163.058 229.155 165.745 230.488 167.508 232.166C169.271 233.799 170.153 236.057 170.153 238.938C170.153 241.217 169.486 243.195 168.153 244.872C166.863 246.549 165.1 247.839 162.864 248.742C160.628 249.602 158.134 250.032 155.382 250.032C152.501 250.032 149.878 249.602 147.513 248.742C145.148 247.839 143.127 246.613 141.45 245.065L145.965 240.035C148.846 242.271 151.899 243.389 155.124 243.389C156.844 243.389 158.199 243.066 159.188 242.421C160.22 241.733 160.736 240.808 160.736 239.647C160.736 238.744 160.542 238.035 160.155 237.519C159.768 237.003 159.059 236.53 158.027 236.1C156.995 235.627 155.382 235.09 153.189 234.487C149.749 233.542 147.191 232.208 145.514 230.488C143.88 228.725 143.063 226.554 143.063 223.974C143.063 222.039 143.622 220.297 144.74 218.749C145.858 217.201 147.427 215.997 149.448 215.137C151.512 214.234 153.899 213.783 156.608 213.783Z"/>
      <path className="nl-g" data-i="4" d="M188.569 213.783C193.686 213.783 197.685 215.396 200.566 218.62C203.447 221.802 204.887 226.231 204.887 231.907C204.887 235.52 204.221 238.701 202.888 241.453C201.598 244.162 199.706 246.27 197.212 247.775C194.761 249.279 191.858 250.032 188.504 250.032C183.387 250.032 179.367 248.441 176.443 245.259C173.562 242.034 172.121 237.583 172.121 231.907C172.121 228.295 172.766 225.135 174.056 222.426C175.389 219.674 177.281 217.545 179.732 216.04C182.226 214.535 185.172 213.783 188.569 213.783ZM188.569 220.62C186.247 220.62 184.505 221.544 183.344 223.393C182.226 225.199 181.667 228.037 181.667 231.907C181.667 235.778 182.226 238.637 183.344 240.486C184.505 242.292 186.225 243.195 188.504 243.195C190.783 243.195 192.482 242.292 193.6 240.486C194.761 238.637 195.341 235.778 195.341 231.907C195.341 228.037 194.782 225.199 193.664 223.393C192.546 221.544 190.848 220.62 188.569 220.62Z"/>
      <path className="nl-g" data-i="5" d="M229.009 213.783C232.019 213.783 234.363 214.707 236.04 216.556C237.717 218.362 238.555 220.878 238.555 224.103V249H229.396V225.651C229.396 223.802 229.074 222.512 228.429 221.781C227.827 221.007 226.902 220.62 225.655 220.62C224.365 220.62 223.183 221.028 222.108 221.845C221.076 222.619 220.065 223.802 219.076 225.393V249H209.917V214.815H217.851L218.56 219.136C219.979 217.373 221.527 216.04 223.204 215.137C224.924 214.234 226.859 213.783 229.009 213.783Z"/>
      <g className="nl-tail">
      <path className="nl-g" data-i="6" d="M270.272 250C267.524 250 265.389 249.218 263.868 247.655C262.346 246.049 261.585 243.788 261.585 240.872V202.014L270.589 201V240.618C270.589 242.097 271.202 242.837 272.427 242.837C273.104 242.837 273.696 242.71 274.203 242.457L276.042 248.859C274.308 249.62 272.385 250 270.272 250Z"/>
      <path className="nl-g" data-i="7" d="M294.899 213.783C300.016 213.783 304.015 215.396 306.896 218.62C309.777 221.802 311.217 226.231 311.217 231.907C311.217 235.52 310.551 238.701 309.218 241.453C307.928 244.162 306.036 246.27 303.542 247.775C301.09 249.279 298.188 250.032 294.834 250.032C289.717 250.032 285.697 248.441 282.773 245.259C279.892 242.034 278.451 237.583 278.451 231.907C278.451 228.295 279.096 225.135 280.386 222.426C281.719 219.674 283.611 217.545 286.062 216.04C288.556 214.535 291.502 213.783 294.899 213.783ZM294.899 220.62C292.576 220.62 290.835 221.544 289.674 223.393C288.556 225.199 287.997 228.037 287.997 231.907C287.997 235.778 288.556 238.637 289.674 240.486C290.835 242.292 292.555 243.195 294.834 243.195C297.113 243.195 298.812 242.292 299.93 240.486C301.091 238.637 301.671 235.778 301.671 231.907C301.671 228.037 301.112 225.199 299.994 223.393C298.876 221.544 297.178 220.62 294.899 220.62Z"/>
      <path className="nl-g" data-i="8" d="M334.694 213.783C338.994 213.783 342.176 215.374 344.24 218.556C346.347 221.695 347.4 226.124 347.4 231.843C347.4 235.326 346.863 238.444 345.788 241.195C344.713 243.947 343.143 246.119 341.079 247.71C339.058 249.258 336.65 250.032 333.855 250.032C330.372 250.032 327.556 248.806 325.406 246.355V262.158L316.247 263.19V214.815H324.309L324.761 218.814C326.051 217.137 327.556 215.89 329.276 215.073C331.039 214.213 332.845 213.783 334.694 213.783ZM331.146 243.195C335.618 243.195 337.854 239.432 337.854 231.907C337.854 227.779 337.36 224.855 336.371 223.135C335.382 221.416 333.877 220.555 331.856 220.555C330.566 220.555 329.362 220.964 328.244 221.781C327.169 222.555 326.223 223.608 325.406 224.941V239.841C326.868 242.077 328.781 243.195 331.146 243.195Z"/>
      <path className="nl-g" data-i="9" d="M381.631 231.133C381.631 231.563 381.566 232.746 381.437 234.681H360.088C360.389 237.777 361.227 239.97 362.603 241.26C363.979 242.55 365.85 243.195 368.215 243.195C369.677 243.195 371.053 242.958 372.343 242.486C373.633 242.013 375.03 241.26 376.535 240.228L380.341 245.388C376.514 248.484 372.192 250.032 367.376 250.032C362.001 250.032 357.873 248.419 354.992 245.194C352.111 241.97 350.671 237.605 350.671 232.101C350.671 228.618 351.273 225.5 352.477 222.749C353.724 219.953 355.508 217.76 357.83 216.17C360.195 214.578 362.99 213.783 366.215 213.783C371.074 213.783 374.858 215.309 377.567 218.362C380.276 221.416 381.631 225.673 381.631 231.133ZM372.536 228.554C372.536 222.877 370.494 220.039 366.409 220.039C364.517 220.039 363.033 220.749 361.958 222.168C360.926 223.544 360.303 225.801 360.088 228.94H372.536V228.554Z"/>
      <path className="nl-g" data-i="10" d="M397.677 213.783C402.493 213.783 406.621 215.159 410.061 217.911L406.578 223.135C403.697 221.329 400.859 220.426 398.064 220.426C396.559 220.426 395.398 220.706 394.581 221.265C393.764 221.824 393.356 222.576 393.356 223.522C393.356 224.21 393.528 224.791 393.872 225.264C394.259 225.737 394.947 226.188 395.936 226.618C396.968 227.049 398.494 227.564 400.515 228.167C404.127 229.155 406.815 230.488 408.578 232.166C410.341 233.799 411.222 236.057 411.222 238.938C411.222 241.217 410.556 243.195 409.223 244.872C407.933 246.549 406.17 247.839 403.934 248.742C401.698 249.602 399.204 250.032 396.452 250.032C393.571 250.032 390.948 249.602 388.583 248.742C386.218 247.839 384.197 246.613 382.52 245.065L387.035 240.035C389.916 242.271 392.969 243.389 396.194 243.389C397.914 243.389 399.268 243.066 400.257 242.421C401.289 241.733 401.805 240.808 401.805 239.647C401.805 238.744 401.612 238.035 401.225 237.519C400.838 237.003 400.128 236.53 399.096 236.1C398.064 235.627 396.452 235.09 394.259 234.487C390.819 233.542 388.26 232.208 386.583 230.488C384.949 228.725 384.132 226.554 384.132 223.974C384.132 222.039 384.691 220.297 385.809 218.749C386.927 217.201 388.497 215.997 390.518 215.137C392.582 214.234 394.968 213.783 397.677 213.783Z"/>
      </g>
      </g>
      <circle className="nl-dot" cx="421.5" cy="243.275" r="5.284" aria-hidden="true"/>
    </svg>
  )
}
