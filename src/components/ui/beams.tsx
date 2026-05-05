"use client"

import React, { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export interface BackgroundBeamsProps {
  className?: string
}

// Generate sinusoidal wavy paths — many wiggles along each diagonal beam.
// `xStep` controls horizontal spread between beams; mobile uses a wider step
// so the fan spreads further right and more beams enter the visible column.
function generateWavyPath(beamIndex: number, totalBeams: number, xStep: number = 32): string {
  const xShift = (beamIndex - totalBeams / 2) * xStep
  const yShift = (beamIndex - totalBeams / 2) * -34

  const startX = -380 + xShift
  const startY = -189 + yShift
  const endX = 684 + xShift
  const endY = 875 + yShift

  const dx = endX - startX
  const dy = endY - startY
  const len = Math.hypot(dx, dy)
  const perpX = -dy / len
  const perpY = dx / len

  const waves = 18
  const amplitude = 32
  const samplesPerWave = 3
  const totalSamples = waves * samplesPerWave

  const points: [number, number][] = []
  for (let i = 0; i <= totalSamples; i++) {
    const t = i / totalSamples
    const offset = Math.sin(t * waves * Math.PI * 2 + beamIndex * 0.4) * amplitude
    points.push([
      startX + dx * t + perpX * offset,
      startY + dy * t + perpY * offset,
    ])
  }

  let path = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(points.length - 1, i + 2)]
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6
    path += ` C${cp1x.toFixed(1)} ${cp1y.toFixed(1)},${cp2x.toFixed(1)} ${cp2y.toFixed(1)},${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }

  return path
}

const TOTAL_BEAMS = 15

const desktopPaths = Array.from({ length: TOTAL_BEAMS }, (_, i) => generateWavyPath(i, TOTAL_BEAMS, 32))
const mobilePaths = Array.from({ length: TOTAL_BEAMS }, (_, i) => generateWavyPath(i, TOTAL_BEAMS, 70))

export const BackgroundBeams = React.memo(({ className }: BackgroundBeamsProps) => {
  const [isCompactViewport, setIsCompactViewport] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)")
    const updateViewport = () => setIsCompactViewport(mediaQuery.matches)

    updateViewport()
    mediaQuery.addEventListener("change", updateViewport)

    return () => {
      mediaQuery.removeEventListener("change", updateViewport)
    }
  }, [])

  // Mobile uses a wider-step path set so the diagonal fan spreads further
  // right and more beams pass through the visible portrait column.
  const paths = isCompactViewport ? mobilePaths : desktopPaths

  return (
    <div className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}>
      <style>{`
        @keyframes beams-reveal-ltr {
          from { clip-path: inset(0 100% 0 0); }
          to { clip-path: inset(0 0 0 0); }
        }
        .beams-reveal {
          clip-path: inset(0 100% 0 0);
          animation: beams-reveal-ltr 1.4s ease-out forwards;
        }
      `}</style>
      <svg
        className="beams-reveal absolute h-full w-full"
        fill="none"
        viewBox="0 0 696 316"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {paths.map((d, i) => (
          <path
            key={`beam-${i}`}
            d={d}
            stroke={`url(#gradient-${i})`}
            strokeWidth="1"
            strokeLinecap="round"
            opacity={0.35}
          />
        ))}

        <defs>
          {paths.map((_, i) => (
            <linearGradient
              key={`gradient-${i}`}
              id={`gradient-${i}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              <stop offset="20%" stopColor="hsl(var(--primary))" stopOpacity="1" />
              <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="1" />
              <stop offset="80%" stopColor="hsl(var(--secondary, var(--primary)))" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(var(--secondary, var(--primary)))" stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  )
})

BackgroundBeams.displayName = "BackgroundBeams"
