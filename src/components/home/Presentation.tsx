'use client';

import { useEffect, useRef } from 'react';
import { HiOutlineArrowsExpand } from 'react-icons/hi';

import 'reveal.js/reveal.css';
import 'reveal.js/theme/simple.css';

type RevealLike = {
  destroy?: () => void;
  initialize?: () => Promise<unknown>;
};

export default function Presentation() {
  const deckRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<RevealLike | null>(null);

  useEffect(() => {
    if (!deckRef.current) return;
    let cancelled = false;
    let deck: RevealLike | null = null;

    (async () => {
      const RevealModule = await import('reveal.js');
      const Reveal = (RevealModule as { default: new (el: HTMLElement, cfg: Record<string, unknown>) => RevealLike }).default;
      if (cancelled || !deckRef.current) return;

      deck = new Reveal(deckRef.current, {
        embedded: true,
        controls: true,
        progress: true,
        center: true,
        hash: false,
        keyboard: true,
        transition: 'slide',
      });
      await deck.initialize?.();
      if (cancelled) return;
      revealRef.current = deck;
    })();

    return () => {
      cancelled = true;
      try {
        deck?.destroy?.();
        revealRef.current = null;
      } catch {
        // noop — destroy can throw if init never completed
      }
    };
  }, []);

  const enterFullscreen = () => {
    const el = deckRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      el.requestFullscreen?.();
    }
  };

  return (
    <div className="container-custom max-w-7xl pt-2">
      <div className="reveal-deck relative rounded-xl overflow-hidden border border-primary-200 dark:border-primary-800 bg-white">
        {/* Fullscreen toggle */}
        <button
          type="button"
          onClick={enterFullscreen}
          aria-label="Toggle fullscreen presentation"
          className="absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 rounded-md bg-[#F7C948] text-ink px-3 py-1.5 text-xs font-semibold shadow-sm hover:bg-[#e3b73e] transition-colors"
        >
          <HiOutlineArrowsExpand className="w-4 h-4" />
          Fullscreen
        </button>

        <div ref={deckRef} className="reveal !h-[60vh] sm:!h-[70vh] md:!h-[78vh]">
          <div className="slides">
            {/* ───── 1. TITLE ───── */}
            <section
              data-background="linear-gradient(135deg, #0f0f0f 0%, #1f1f1f 100%)"
              data-transition="fade"
            >
              <h1 style={{ color: '#fff', fontSize: '2.5em' }}>
                How <span className="accent">I work</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.55em' }}>
                A pragmatic process for shipping software that lasts.
              </p>
              <div
                style={{
                  marginTop: '2.5rem',
                  fontSize: '0.4em',
                  letterSpacing: '0.18em',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                <span className="accent">PLAN</span>
                <span style={{ margin: '0 0.6em' }}>·</span>
                <span className="accent">BUILD</span>
                <span style={{ margin: '0 0.6em' }}>·</span>
                <span className="accent">TEST</span>
                <span style={{ margin: '0 0.6em' }}>·</span>
                <span className="accent">SHIP</span>
              </div>
            </section>

            {/* ───── 2. PLAN — section header ───── */}
            <section data-background="#F7C948" data-transition="zoom">
              <h1 style={{ color: '#0a0a0a', fontSize: '3em' }}>Plan</h1>
              <p style={{ color: '#0a0a0a', opacity: 0.8, fontSize: '0.55em' }}>
                Understand before we build
              </p>
            </section>

            {/* ───── PLAN content ───── */}
            <section>
              <h2>
                <span className="accent">1.</span> Plan
              </h2>
              <ul style={{ fontSize: '0.6em' }}>
                <li>Surface the <span className="accent">real</span> need</li>
                <li>Sketch architecture; identify risks</li>
                <li>Break into <span className="accent">shippable slices</span></li>
              </ul>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginTop: '1.5rem',
                  fontSize: '0.4em',
                }}
              >
                {['Sketches', 'Tickets', 'Risk log', 'Tech spikes'].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: '0.4rem 0.9rem',
                      background: 'rgba(247,201,72,0.15)',
                      border: '1px solid rgba(247,201,72,0.4)',
                      borderRadius: '999px',
                      color: '#0a0a0a',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* ───── 6. BUILD — section header ───── */}
            <section data-background="#F7C948" data-transition="zoom">
              <h1 style={{ color: '#0a0a0a', fontSize: '3em' }}>Build</h1>
              <p style={{ color: '#0a0a0a', opacity: 0.8, fontSize: '0.55em' }}>
                Ship small, ship often, ship readable
              </p>
            </section>

            {/* ───── BUILD content ───── */}
            <section>
              <h2>
                <span className="accent">2.</span> Build
              </h2>
              <ul style={{ fontSize: '0.6em' }}>
                <li><span className="accent">TypeScript-first</span> — types catch what reviews miss</li>
                <li>Small, well-named commits</li>
                <li>
                  Clear &gt; clever, every time
                  <span className="code-tooltip" tabIndex={0} aria-label="Show example">
                    <span className="code-tooltip-trigger">?</span>
                    <span className="code-tooltip-content">
                      <span className="label">Clever (avoid):</span>
                      <pre>
                        <code>{`const isAdult = users.filter(u => u.age >= 18).map(u => u.name).reduce((acc, n, i) => i === 0 ? n : \`\${acc}, \${n}\`, '');`}</code>
                      </pre>
                      <span className="label">Clear (prefer):</span>
                      <pre>
                        <code>{`const adults = users.filter(user => user.age >= 18);
const adultNames = adults.map(user => user.name).join(', ');`}</code>
                      </pre>
                    </span>
                  </span>
                </li>
              </ul>
              <pre
                style={{ fontSize: '0.35em', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', marginTop: '1.2rem' }}
              >
                <code>{`type Project = {
  id: string;
  title: string;
  tags: readonly string[];
};`}</code>
              </pre>
            </section>

            {/* ───── 9. TEST — section header ───── */}
            <section data-background="#F7C948" data-transition="zoom">
              <h1 style={{ color: '#0a0a0a', fontSize: '3em' }}>Test</h1>
              <p style={{ color: '#0a0a0a', opacity: 0.8, fontSize: '0.55em' }}>
                Confidence before the merge button
              </p>
            </section>

            {/* ───── TEST content ───── */}
            <section>
              <h2>
                <span className="accent">3.</span> Test
              </h2>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.45em',
                  marginTop: '0.8rem',
                }}
              >
                <div style={{ width: '30%', padding: '0.6rem', background: '#F7C948', color: '#0a0a0a', borderRadius: '8px', fontWeight: 700 }}>
                  E2E
                </div>
                <div style={{ width: '55%', padding: '0.6rem', background: 'rgba(247,201,72,0.6)', color: '#0a0a0a', borderRadius: '8px', fontWeight: 700 }}>
                  Integration
                </div>
                <div style={{ width: '85%', padding: '0.6rem', background: 'rgba(247,201,72,0.3)', color: '#0a0a0a', borderRadius: '8px', fontWeight: 700 }}>
                  Unit
                </div>
              </div>
              <ul style={{ fontSize: '0.55em', marginTop: '1.2rem' }}>
                <li>
                  Most value in <span className="accent">integration</span> tests
                  <span className="code-tooltip" tabIndex={0} aria-label="Show example">
                    <span className="code-tooltip-trigger">?</span>
                    <span className="code-tooltip-content">
                      <span className="label">Unit test:</span>
                      <p className="tt-line">
                        &quot;Does <code>addToCart()</code> correctly increment the cart count?&quot;
                      </p>
                      <span className="label">Integration test:</span>
                      <p className="tt-line">
                        &quot;Does posting an order to <code>/checkout</code> correctly: (1) deduct inventory, (2) charge the payment service, (3) email the receipt?&quot;
                      </p>
                      <span className="label">E2E test:</span>
                      <p className="tt-line">
                        &quot;Click &lsquo;Add to Cart&rsquo; button → navigate to checkout page → fill form → click pay → see thank-you page.&quot;
                      </p>
                    </span>
                  </span>
                </li>
                <li>CI runs the full suite on every PR</li>
              </ul>
            </section>

            {/* ───── 12. SHIP — section header ───── */}
            <section data-background="#F7C948" data-transition="zoom">
              <h1 style={{ color: '#0a0a0a', fontSize: '3em' }}>Ship</h1>
              <p style={{ color: '#0a0a0a', opacity: 0.8, fontSize: '0.55em' }}>
                Deliver with confidence, observe with care
              </p>
            </section>

            {/* ───── SHIP content ───── */}
            <section>
              <h2>
                <span className="accent">4.</span> Ship
              </h2>
              <ul style={{ fontSize: '0.6em' }}>
                <li><span className="accent">CI/CD</span> for confident, repeatable deploys</li>
                <li>Feature flags for staged rollouts</li>
                <li>Observability <em>before</em> launch</li>
              </ul>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginTop: '1.5rem',
                  fontSize: '0.4em',
                }}
              >
                {['Logs', 'Metrics', 'Traces'].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: '0.4rem 1rem',
                      background: 'rgba(247,201,72,0.15)',
                      border: '1px solid rgba(247,201,72,0.4)',
                      borderRadius: '999px',
                      color: '#0a0a0a',
                      fontWeight: 600,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* ───── 15. VALUES ───── */}
            <section data-transition="convex">
              <h2>What I value</h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.8rem',
                  fontSize: '0.5em',
                  marginTop: '1rem',
                }}
              >
                {[
                  { name: 'Reliability', desc: 'Code that runs the same way twice.' },
                  { name: 'Performance', desc: 'Fast feels effortless.' },
                  { name: 'Clarity', desc: 'The next dev (or future me) thanks you.' },
                  { name: 'Pragmatism', desc: 'The simplest thing that works, ships.' },
                ].map(({ name, desc }) => (
                  <div
                    key={name}
                    style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      borderTop: '3px solid #F7C948',
                      background: 'rgba(247,201,72,0.08)',
                      textAlign: 'left',
                    }}
                  >
                    <strong className="accent">{name}</strong>
                    <p style={{ margin: '0.4em 0 0', opacity: 0.85 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ───── 16. OUTRO ───── */}
            <section
              data-background="linear-gradient(135deg, #0f0f0f 0%, #1f1f1f 100%)"
              data-transition="fade"
            >
              <h1 style={{ color: '#fff', fontSize: '2.5em' }}>
                Thanks for <span className="accent">watching</span>
              </h1>
              <p
                style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.55em' }}
              >
                Let&apos;s build something great together.
              </p>
              <p
                style={{
                  marginTop: '2rem',
                  fontSize: '0.4em',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                Built with{' '}
                <a
                  href="https://revealjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#F7C948' }}
                >
                  reveal.js
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
