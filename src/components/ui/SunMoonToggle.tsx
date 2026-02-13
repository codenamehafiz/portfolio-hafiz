'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface SunMoonToggleProps {
  isDark: boolean;
  onClick: () => void;
  size?: 'sm' | 'md';
}

const starPositions = [
  { top: '20%', left: '15%', size: 1, delay: 0.3 },
  { top: '55%', left: '10%', size: 0.8, delay: 0.5 },
  { top: '30%', left: '28%', size: 0.6, delay: 0.7 },
  { top: '65%', left: '22%', size: 0.7, delay: 0.4 },
  { top: '15%', left: '38%', size: 0.5, delay: 0.6 },
  { top: '75%', left: '35%', size: 0.6, delay: 0.8 },
];

const sunRayAngles = [0, 45, 90, 135, 180, 225, 270, 315];

export default function SunMoonToggle({ isDark, onClick, size = 'md' }: SunMoonToggleProps) {
  const isSm = size === 'sm';
  const trackW = isSm ? 36 : 48;
  const trackH = isSm ? 18 : 24;
  const knobSize = isSm ? 14 : 20;
  const padding = (trackH - knobSize) / 2;

  return (
    <button
      onClick={onClick}
      aria-label="Toggle theme"
      className="relative cursor-pointer flex-shrink-0 overflow-hidden"
      style={{ width: trackW, height: trackH, borderRadius: trackH / 2 }}
    >
      {/* Track — gradient sky transition */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isDark
            ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
            : 'linear-gradient(135deg, #38bdf8 0%, #7dd3fc 30%, #bae6fd 60%, #e0f2fe 100%)',
        }}
        transition={{ duration: 0.6 }}
      />

      {/* Sunrise flash — bright burst when switching to light */}
      <AnimatePresence>
        {!isDark && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              background: 'radial-gradient(circle at 25% 50%, rgba(251,191,36,0.6) 0%, rgba(251,146,60,0.3) 30%, transparent 70%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Stars — twinkle in dark mode */}
      <AnimatePresence>
        {isDark &&
          starPositions.map((star, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                top: star.top,
                left: star.left,
                width: (isSm ? 1 : 1.5) * star.size,
                height: (isSm ? 1 : 1.5) * star.size,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.4, 1],
                scale: [0, 1, 0.8, 1],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 2,
                delay: star.delay,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
          ))}
      </AnimatePresence>

      {/* Shooting star — streaks across on dark mode entry */}
      <AnimatePresence>
        {isDark && (
          <motion.div
            className="absolute"
            style={{
              width: isSm ? 8 : 12,
              height: 1,
              background: 'linear-gradient(90deg, transparent, white)',
              borderRadius: 1,
              top: '30%',
            }}
            initial={{ left: '-20%', opacity: 0 }}
            animate={{ left: '120%', opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

      {/* Light rays — radiate outward when switching to light mode */}
      <AnimatePresence>
        {!isDark && (
          <>
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <motion.div
                key={`ray-${deg}`}
                className="absolute"
                style={{
                  left: padding + knobSize / 2,
                  top: trackH / 2,
                  width: isSm ? 6 : 10,
                  height: 1,
                  background: 'linear-gradient(90deg, rgba(251,191,36,0.6), transparent)',
                  transformOrigin: '0% 50%',
                  transform: `rotate(${deg}deg)`,
                }}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: [0, 0.8, 0], scaleX: [0, 1.5, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Clouds — drift in from the right in light mode */}
      <AnimatePresence>
        {!isDark && (
          <>
            {/* Cloud 1 — main cloud, bottom right */}
            <motion.div
              className="absolute"
              style={{
                right: isSm ? 3 : 5,
                bottom: isSm ? 2 : 3,
              }}
              initial={{ opacity: 0, x: 10 }}
              animate={{
                opacity: 0.7,
                x: [0, -1, 0],
              }}
              exit={{ opacity: 0, x: 10 }}
              transition={{
                opacity: { duration: 0.4, delay: 0.2 },
                x: {
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: 0.6,
                },
              }}
            >
              <div
                className="rounded-full bg-white"
                style={{
                  width: isSm ? 10 : 14,
                  height: isSm ? 4 : 6,
                  borderRadius: 999,
                }}
              />
              <div
                className="absolute rounded-full bg-white"
                style={{
                  width: isSm ? 5 : 7,
                  height: isSm ? 5 : 7,
                  bottom: isSm ? 2 : 3,
                  left: isSm ? 1.5 : 2,
                }}
              />
              <div
                className="absolute rounded-full bg-white"
                style={{
                  width: isSm ? 4 : 5,
                  height: isSm ? 4 : 5,
                  bottom: isSm ? 1.5 : 2,
                  right: isSm ? 1 : 2,
                }}
              />
            </motion.div>

            {/* Cloud 2 — smaller cloud, top right */}
            <motion.div
              className="absolute"
              style={{
                right: isSm ? 1 : 2,
                top: isSm ? 2 : 3,
              }}
              initial={{ opacity: 0, x: 8 }}
              animate={{
                opacity: 0.4,
                x: [0, 1, 0],
              }}
              exit={{ opacity: 0, x: 8 }}
              transition={{
                opacity: { duration: 0.4, delay: 0.35 },
                x: {
                  duration: 5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: 0.8,
                },
              }}
            >
              <div
                className="rounded-full bg-white"
                style={{
                  width: isSm ? 6 : 9,
                  height: isSm ? 2.5 : 3.5,
                  borderRadius: 999,
                }}
              />
              <div
                className="absolute rounded-full bg-white"
                style={{
                  width: isSm ? 3 : 4.5,
                  height: isSm ? 3 : 4.5,
                  bottom: isSm ? 1 : 1.5,
                  left: isSm ? 1 : 1.5,
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sun glow — warm pulsing halo in light mode */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: knobSize + (isSm ? 10 : 14),
          height: knobSize + (isSm ? 10 : 14),
          top: padding - (isSm ? 5 : 7),
        }}
        animate={{
          left: isDark
            ? trackW - knobSize - padding - (isSm ? 5 : 7)
            : padding - (isSm ? 5 : 7),
          opacity: isDark ? [0, 0.3, 0.15, 0.3] : [0, 0.35, 0.2, 0.35],
          background: isDark
            ? 'radial-gradient(circle, rgba(186,230,253,0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(251,191,36,0.4) 0%, rgba(251,146,60,0.15) 40%, transparent 70%)',
        }}
        transition={{
          left: { type: 'spring', stiffness: 500, damping: 30 },
          opacity: {
            duration: isDark ? 3 : 2.5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          },
        }}
      />

      {/* Knob (sun/moon) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: knobSize,
          height: knobSize,
          top: padding,
        }}
        animate={{
          left: isDark ? trackW - knobSize - padding : padding,
          backgroundColor: isDark ? '#e2e8f0' : '#fbbf24',
          boxShadow: isDark
            ? '0 0 6px rgba(186, 230, 253, 0.5), 0 0 12px rgba(186, 230, 253, 0.2)'
            : '0 0 8px rgba(251, 191, 36, 0.6), 0 0 16px rgba(251, 146, 60, 0.3)',
          rotate: isDark ? 360 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
          rotate: { duration: 0.6, ease: 'easeInOut' },
        }}
      >
        {/* Sun rays — spin in and pulse in light mode */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: isDark ? 0 : 1,
            rotate: isDark ? -180 : 0,
            scale: isDark ? 0.3 : 1,
          }}
          transition={{
            opacity: { duration: 0.3, delay: isDark ? 0 : 0.15 },
            rotate: { duration: 0.5, ease: 'easeOut' },
            scale: { duration: 0.4, ease: 'easeOut' },
          }}
        >
          {sunRayAngles.map((deg, i) => (
            <motion.div
              key={deg}
              className="absolute rounded-full"
              style={{
                width: isSm ? 1.5 : 2,
                height: isSm ? 2.5 : 3.5,
                left: '50%',
                top: isSm ? -2 : -3,
                marginLeft: isSm ? -0.75 : -1,
                transformOrigin: `50% ${knobSize / 2 + (isSm ? 2 : 3)}px`,
                transform: `rotate(${deg}deg)`,
                background: 'linear-gradient(180deg, #f59e0b, #fbbf24)',
              }}
              animate={
                !isDark
                  ? {
                      height: [isSm ? 2.5 : 3.5, isSm ? 3 : 4.5, isSm ? 2.5 : 3.5],
                      opacity: [0.8, 1, 0.8],
                    }
                  : {}
              }
              transition={{
                duration: 1.5,
                delay: i * 0.08,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>

        {/* Moon crescent overlay — slides in to create crescent shape */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: knobSize * 0.75,
            height: knobSize * 0.75,
          }}
          animate={{
            backgroundColor: isDark ? '#1e293b' : '#fbbf24',
            top: isDark ? knobSize * 0.05 : knobSize * 0.5,
            left: isDark ? knobSize * 0.35 : knobSize * 0.8,
            opacity: isDark ? 1 : 0,
          }}
          transition={{
            duration: 0.4,
            delay: isDark ? 0.15 : 0,
          }}
        />

        {/* Moon craters (visible in dark mode) */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: isDark ? 1 : 0 }}
          transition={{ duration: 0.3, delay: isDark ? 0.2 : 0 }}
        >
          <div
            className="absolute rounded-full bg-slate-300/40"
            style={{
              width: isSm ? 2 : 3,
              height: isSm ? 2 : 3,
              top: '50%',
              left: '15%',
            }}
          />
          <div
            className="absolute rounded-full bg-slate-300/30"
            style={{
              width: isSm ? 1.5 : 2,
              height: isSm ? 1.5 : 2,
              top: '25%',
              left: '10%',
            }}
          />
        </motion.div>
      </motion.div>
    </button>
  );
}
