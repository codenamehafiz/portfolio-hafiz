'use client';

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-white dark:bg-ink" />

      {/* Aurora blobs */}
      <div
        className="absolute -top-1/2 -left-1/4 w-[80vw] h-[80vh] rounded-full opacity-20 dark:opacity-15 blur-[120px] animate-aurora-1"
        style={{ background: 'linear-gradient(135deg, #a5b4fc, #818cf8, #6366f1)' }}
      />
      <div
        className="absolute -bottom-1/3 -right-1/4 w-[70vw] h-[70vh] rounded-full opacity-15 dark:opacity-10 blur-[120px] animate-aurora-2"
        style={{ background: 'linear-gradient(135deg, #c4b5fd, #a78bfa, #8b5cf6)' }}
      />
      <div
        className="absolute top-1/4 left-1/3 w-[50vw] h-[50vh] rounded-full opacity-10 dark:opacity-[0.08] blur-[100px] animate-aurora-3"
        style={{ background: 'linear-gradient(135deg, #93c5fd, #60a5fa, #3b82f6)' }}
      />
    </div>
  );
}
