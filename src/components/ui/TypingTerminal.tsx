'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const lines = [
  { text: 'const config = {', indent: 0, delay: 0 },
  { text: 'editor: "VS Code",', indent: 2, delay: 0.2 },
  { text: 'theme: "dark mode, always",', indent: 2, delay: 0.4 },
  { text: 'fuel: "coffee",', indent: 2, delay: 0.7 },
  { text: 'clean_code: "worth the effort"",', indent: 2, delay: 0.9 },
  { text: 'deploys_on_friday: false,', indent: 2, delay: 1.1 },
  { text: '};', indent: 0, delay: 1.4 },
  { text: '', indent: 0, delay: 1.5 },
  { text: 'ship(config);', indent: 0, delay: 1.6 },
];

const CHAR_SPEED = 15; // ms per character

function TypingLine({ text, startDelay, onDone }: { text: string; startDelay: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), startDelay * 1000);
    return () => clearTimeout(timeout);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, CHAR_SPEED);
      return () => clearTimeout(timeout);
    } else {
      setDone(true);
      onDone?.();
    }
  }, [started, displayed, text, onDone]);

  if (!started) return null;

  return (
    <span>
      {colorize(displayed)}
      {!done && <span className="animate-pulse text-primary-400">▎</span>}
    </span>
  );
}

function colorize(text: string) {
  // Simple syntax highlighting
  return text.split(/(\b(?:const|new|true|false)\b|"[^"]*"|\/\/.*$|\(.*?\))/g).map((part, i) => {
    if (/^(const|new|true|false)$/.test(part)) {
      return <span key={i} className="text-purple-400">{part}</span>;
    }
    if (/^".*"$/.test(part)) {
      return <span key={i} className="text-green-400">{part}</span>;
    }
    if (/^\/\//.test(part)) {
      return <span key={i} className="text-primary-500 italic">{part}</span>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default function TypingTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeLine, setActiveLine] = useState(0);

  return (
    <div ref={ref} className="container-custom max-w-4xl py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl overflow-hidden border border-primary-200 dark:border-primary-800 bg-[#1e1e2e] shadow-lg"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#181825] border-b border-primary-800">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-primary-500 font-mono">hafiz.ts</span>
        </div>

        {/* Terminal body */}
        <div className="px-5 py-5 font-mono text-sm md:text-base leading-loose text-primary-300 min-h-[160px] whitespace-pre">
          {inView && lines.map((line, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-primary-600 select-none shrink-0 w-5 text-right">{i + 1}</span>
              <div>
                {i <= activeLine && (
                  <>
                    {line.indent > 0 && <span>{' '.repeat(line.indent)}</span>}
                    <TypingLine
                      text={line.text}
                      startDelay={line.delay}
                      onDone={i === activeLine && i < lines.length - 1 ? () => setActiveLine(i + 1) : undefined}
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
