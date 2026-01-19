# Background Effect Options

Replace the `body::before` and `body::after` in `src/app/globals.css` with these options:

## Option 1: Noise + Gradient Orbs (CURRENT)
```css
/* Already implemented! */
```

## Option 2: Subtle Grid Pattern
```css
/* Replace body::before with: */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(107, 107, 107, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(107, 107, 107, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  z-index: 1;
}

/* Keep body::after as is */
```

## Option 3: Dot Matrix Pattern
```css
/* Replace body::before with: */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle, rgba(107, 107, 107, 0.06) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
  z-index: 1;
}

/* Keep body::after as is */
```

## Option 4: Diagonal Lines (Architectural)
```css
/* Replace body::before with: */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(107, 107, 107, 0.02) 10px,
    rgba(107, 107, 107, 0.02) 11px
  );
  pointer-events: none;
  z-index: 1;
}

/* Keep body::after as is */
```

## Option 5: Mesh Gradient (Modern)
```css
/* Replace both body::before and body::after with: */
body::before {
  content: '';
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background:
    radial-gradient(ellipse at 0% 0%, rgba(133, 133, 133, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 100% 0%, rgba(107, 107, 107, 0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 100% 100%, rgba(158, 158, 158, 0.10) 0%, transparent 50%),
    radial-gradient(ellipse at 0% 100%, rgba(82, 82, 82, 0.08) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
  animation: meshRotate 30s linear infinite;
}

body::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 1;
}

/* Add this animation */
@keyframes meshRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

## Option 6: Geometric Shapes
```css
/* Replace body::before with: */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(45deg, rgba(107, 107, 107, 0.01) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(107, 107, 107, 0.01) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(107, 107, 107, 0.01) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(107, 107, 107, 0.01) 75%);
  background-size: 60px 60px;
  background-position: 0 0, 0 30px, 30px -30px, -30px 0px;
  pointer-events: none;
  z-index: 1;
}

/* Keep body::after as is */
```

## Option 7: COMBO - All Effects (Subtle)
```css
/* This combines multiple effects for maximum artistic appeal */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E"),
    radial-gradient(circle at 20px 20px, rgba(107, 107, 107, 0.04) 1px, transparent 1px);
  background-size: auto, 40px 40px;
  pointer-events: none;
  z-index: 1;
  opacity: 0.8;
}

body::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(ellipse at 15% 25%, rgba(133, 133, 133, 0.08) 0%, transparent 45%),
    radial-gradient(ellipse at 85% 75%, rgba(107, 107, 107, 0.06) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(158, 158, 158, 0.04) 0%, transparent 60%),
    linear-gradient(120deg, transparent 48%, rgba(107, 107, 107, 0.01) 50%, transparent 52%);
  pointer-events: none;
  z-index: 0;
  animation: gradientShift 25s ease infinite;
}
```

---

## How to Apply:

1. Open `src/app/globals.css`
2. Find the `body::before` and `body::after` sections
3. Replace with your chosen option above
4. Save and see the effect!

## My Recommendations:

- **Most Artistic**: Option 7 (Combo)
- **Most Professional**: Option 2 (Grid) or Option 3 (Dots)
- **Most Modern**: Option 5 (Mesh Gradient)
- **Most Minimal**: Current (Option 1)
