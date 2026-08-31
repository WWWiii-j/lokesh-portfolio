import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Premium deep-space / cosmic editorial background.
 *
 * Layers (back → front):
 *  1. Deep black/charcoal base (#0c0b0a)
 *  2. Distant star field  — 3 depth layers, sparse, tiny, barely visible
 *  3. Nebula formations   — 3 very large, soft radial washes (dust, not blobs)
 *  4. Muted amber accent  — one warm filament drifting slowly
 *  5. Vignette            — CSS radial darkening at edges, keeps centre clean
 *  6. Film-grain SVG      — analogue depth, CSS-only
 *
 * Animation: all movement is sinusoidal, extremely slow (full cycle ≈ 2–4 min).
 * Mouse parallax is layered — distant stars barely move, near stars shift more.
 *
 * No particles, no shooting stars, no galaxy spirals, no neon, no blobs.
 */

// ─── Seeded PRNG (Mulberry32) — deterministic star positions every mount ──
function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// ─── Star definition ───────────────────────────────────────────────────────
interface Star {
  x: number        // 0–1 normalised
  y: number        // 0–1 normalised
  r: number        // radius px
  alpha: number    // base opacity
  twinklePhase: number
  twinkleSpeed: number
  // depth layer: 0 = distant (slowest parallax), 1 = mid, 2 = near
  layer: number
  // slow autonomous drift amplitude (fraction of canvas)
  driftAmp: number
  driftPhaseX: number
  driftPhaseY: number
  driftFreqX: number
  driftFreqY: number
}

function buildStars(): Star[] {
  const rng = mulberry32(0xdeadbeef)
  const stars: Star[] = []

  // Layer config: [count, minR, maxR, minAlpha, maxAlpha, parallaxScale, driftAmp]
  const layers: [number, number, number, number, number, number, number][] = [
    [55, 0.28, 0.65, 0.12, 0.32, 0, 0.004],    // distant — barely visible, no parallax
    [28, 0.40, 0.85, 0.18, 0.42, 1, 0.007],    // mid
    [12, 0.55, 1.10, 0.24, 0.52, 2, 0.012],    // near — slightly larger, fractionally brighter
  ]

  for (const [count, minR, maxR, minA, maxA, layer, driftAmp] of layers) {
    for (let i = 0; i < count; i++) {
      // Avoid the dense centre (0.3–0.7 x, 0.25–0.65 y) — keep it clean for text
      let x: number, y: number
      do {
        x = rng()
        y = rng()
      } while (x > 0.28 && x < 0.72 && y > 0.22 && y < 0.68)

      stars.push({
        x,
        y,
        r: minR + rng() * (maxR - minR),
        alpha: minA + rng() * (maxA - minA),
        twinklePhase: rng() * Math.PI * 2,
        twinkleSpeed: 0.18 + rng() * 0.22,   // very slow twinkle
        layer,
        driftAmp,
        driftPhaseX: rng() * Math.PI * 2,
        driftPhaseY: rng() * Math.PI * 2,
        driftFreqX: 0.012 + rng() * 0.018,   // near-imperceptible frequency
        driftFreqY: 0.010 + rng() * 0.016,
      })
    }
  }
  return stars
}

const STARS = buildStars()

// ─── Nebula layer definition ───────────────────────────────────────────────
interface Nebula {
  ox: number        // base centre x (0–1)
  oy: number        // base centre y (0–1)
  rx: number        // horizontal radius as fraction of canvas width
  ry: number        // vertical radius as fraction of canvas height
  ax: number        // drift amplitude x
  ay: number        // drift amplitude y
  phaseX: number
  phaseY: number
  freqX: number
  freqY: number
  // colour: muted cool dust or warm amber accent
  r: number; g: number; b: number
  maxOpacity: number    // peak opacity at centre
  parallax: number      // parallax factor (fraction of canvas)
}

const NEBULAE: Nebula[] = [
  // ── Large cool-dust wash, upper-left quadrant ──
  {
    ox: 0.18, oy: 0.22,
    rx: 0.55, ry: 0.42,
    ax: 0.06, ay: 0.05,
    phaseX: 0.0, phaseY: 1.8,
    freqX: 0.014, freqY: 0.010,
    r: 160, g: 155, b: 148,
    maxOpacity: 0.040,
    parallax: -0.008,
  },
  // ── Faint cool-dust, right-centre ──
  {
    ox: 0.80, oy: 0.50,
    rx: 0.44, ry: 0.38,
    ax: 0.05, ay: 0.07,
    phaseX: 2.6, phaseY: 0.6,
    freqX: 0.011, freqY: 0.016,
    r: 148, g: 150, b: 158,
    maxOpacity: 0.032,
    parallax: 0.006,
  },
  // ── Muted amber filament — the ONE accent, lower-right ──
  {
    ox: 0.72, oy: 0.76,
    rx: 0.36, ry: 0.30,
    ax: 0.04, ay: 0.05,
    phaseX: 1.2, phaseY: 3.4,
    freqX: 0.009, freqY: 0.013,
    r: 195, g: 108, b: 38,
    maxOpacity: 0.048,
    parallax: 0.012,
  },
  // ── Very faint warm haze, bottom-left ──
  {
    ox: 0.15, oy: 0.82,
    rx: 0.38, ry: 0.28,
    ax: 0.04, ay: 0.04,
    phaseX: 4.2, phaseY: 0.4,
    freqX: 0.008, freqY: 0.011,
    r: 175, g: 162, b: 145,
    maxOpacity: 0.028,
    parallax: -0.005,
  },
]

// Parallax scale per layer (multiplied by the nebula/star's own parallax value)
const LAYER_PARALLAX = [0.25, 0.6, 1.0]

// ─── Drawing ───────────────────────────────────────────────────────────────
function drawFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  mnx: number,   // normalised mouse –0.5…0.5
  mny: number,
) {
  // 1. Deep space base
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = '#0c0b0a'
  ctx.fillRect(0, 0, w, h)

  // 2. Nebula formations — drawn first (behind stars)
  for (const n of NEBULAE) {
    const driftX = n.ax * Math.sin(n.freqX * t + n.phaseX)
    const driftY = n.ay * Math.sin(n.freqY * t + n.phaseY)
    const cx = (n.ox + driftX + mnx * n.parallax) * w
    const cy = (n.oy + driftY + mny * n.parallax) * h
    const radX = n.rx * w
    const radY = n.ry * h
    // Use the larger radius for the gradient, scale ellipse via transform
    const maxR = Math.max(radX, radY)

    ctx.save()
    ctx.translate(cx, cy)
    ctx.scale(radX / maxR, radY / maxR)

    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, maxR)
    grad.addColorStop(0,    `rgba(${n.r},${n.g},${n.b},${n.maxOpacity.toFixed(3)})`)
    grad.addColorStop(0.45, `rgba(${n.r},${n.g},${n.b},${(n.maxOpacity * 0.28).toFixed(3)})`)
    grad.addColorStop(0.80, `rgba(${n.r},${n.g},${n.b},${(n.maxOpacity * 0.07).toFixed(3)})`)
    grad.addColorStop(1,    `rgba(${n.r},${n.g},${n.b},0)`)

    ctx.fillStyle = grad
    ctx.fillRect(-maxR, -maxR, maxR * 2, maxR * 2)
    ctx.restore()
  }

  // 3. Stars — sparse, tiny, varied brightness
  for (const s of STARS) {
    const driftX = s.driftAmp * Math.sin(s.driftFreqX * t + s.driftPhaseX)
    const driftY = s.driftAmp * Math.sin(s.driftFreqY * t + s.driftPhaseY)
    const px = mnx * LAYER_PARALLAX[s.layer] * 0.04
    const py = mny * LAYER_PARALLAX[s.layer] * 0.04

    const sx = (s.x + driftX + px) * w
    const sy = (s.y + driftY + py) * h

    // Very gentle twinkle — less than ±15% opacity variation
    const twinkle = 1 + 0.14 * Math.sin(s.twinkleSpeed * t + s.twinklePhase)
    const alpha = Math.min(1, s.alpha * twinkle)

    ctx.beginPath()
    ctx.arc(sx, sy, s.r, 0, Math.PI * 2)
    // Stars: warm white, slight warmth toward amber for near layer
    const warm = s.layer === 2 ? ', 240, 228, 210' : ', 235, 233, 228'
    ctx.fillStyle = `rgba(${s.layer === 2 ? '240,228,210' : '235,233,228'},${alpha.toFixed(3)})`
    void warm // silence unused
    ctx.fill()
  }
}

// ─── Component ─────────────────────────────────────────────────────────────
export function BackgroundScrub() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const reduce    = useReducedMotion()
  const mouseRef  = useRef({ raw: { x: 0.5, y: 0.5 }, smooth: { x: 0.5, y: 0.5 } })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.raw.x = e.clientX / window.innerWidth
      mouseRef.current.raw.y = e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    if (reduce) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let t0: number | null = null

    const loop = (ts: number) => {
      if (t0 === null) t0 = ts
      const t = (ts - t0) / 1000

      const dpr = window.devicePixelRatio || 1
      const w   = canvas.clientWidth
      const h   = canvas.clientHeight
      if (canvas.width  !== Math.round(w * dpr)) canvas.width  = Math.round(w * dpr)
      if (canvas.height !== Math.round(h * dpr)) canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Lerp mouse — very slow so parallax feels gravitational, not reactive
      const LERP = 0.018
      const m = mouseRef.current
      m.smooth.x += (m.raw.x - m.smooth.x) * LERP
      m.smooth.y += (m.raw.y - m.smooth.y) * LERP
      const mnx = m.smooth.x - 0.5
      const mny = m.smooth.y - 0.5

      drawFrame(ctx, w, h, t, mnx, mny)
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [reduce])

  if (reduce) {
    return <div aria-hidden className="fixed inset-0 -z-10" style={{ background: '#0c0b0a' }} />
  }

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated canvas — space base + nebulae + stars */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />

      {/*
        Film-grain SVG — analogue texture, zero JS.
        Very low opacity so it reads as photographic grain, not noise.
      */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        style={{ opacity: 0.048, mixBlendMode: 'screen' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="cosmic-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.68"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cosmic-grain)" />
      </svg>

      {/*
        Vignette — edges darker, keeps the centre stage clean.
        Two-layer: a strong corner crush + a gentle circular soften.
      */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 90% 80% at 50% 38%, transparent 35%, rgba(8,7,6,0.55) 100%)',
            'linear-gradient(to bottom, rgba(8,7,6,0.30) 0%, transparent 12%, transparent 85%, rgba(8,7,6,0.50) 100%)',
          ].join(', '),
        }}
      />
    </div>
  )
}
