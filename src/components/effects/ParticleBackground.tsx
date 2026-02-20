'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const particleCount = 100;
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: Math.random() * 2 + 1,
      });
    }

    // Pre-compute opacity-to-color lookup (10 buckets)
    const fillColors: string[] = [];
    for (let i = 0; i <= 10; i++) {
      fillColors.push(`rgba(100,100,120,${(i / 10) * 0.6})`);
    }

    // Animation loop
    const animate = () => {
      const cw = canvas.width;
      const ch = canvas.height;
      const halfW = cw / 2;
      const halfH = ch / 2;

      ctx.clearRect(0, 0, cw, ch);

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z -= particle.vz;

        // Reset particle if it goes too far
        if (particle.z < 1) {
          particle.z = 1000;
          particle.x = Math.random() * cw;
          particle.y = Math.random() * ch;
        }

        // Wrap around edges
        if (particle.x < 0) particle.x = cw;
        if (particle.x > cw) particle.x = 0;
        if (particle.y < 0) particle.y = ch;
        if (particle.y > ch) particle.y = 0;

        // Calculate 3D projection
        const scale = 1000 / (1000 + particle.z);
        const x2d = (particle.x - halfW) * scale + halfW;
        const y2d = (particle.y - halfH) * scale + halfH;
        const size = scale * 3;
        const opacityBucket = Math.round((1 - particle.z / 1000) * 10);

        // Draw particle
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fillStyle = fillColors[opacityBucket];
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
