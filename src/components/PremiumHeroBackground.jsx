import { useEffect, useRef, memo } from 'react';

/**
 * Optimized Hero background — static gradients + CSS-only animations.
 * Canvas particle system throttled to 30fps. Mouse tracking removed
 * (was causing setState on every mousemove = constant re-renders).
 */
const PremiumHeroBackground = memo(function PremiumHeroBackground() {
  const canvasRef = useRef(null);

  // Canvas particle system — throttled to 30fps, paused when tab hidden
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let rafId;
    let lastTime = 0;
    const FPS = 30;
    const INTERVAL = 1000 / FPS;
    const isMobile = window.innerWidth < 768;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const count = isMobile ? 15 : 30;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.25 + 0.05,
      }));
    };

    const animate = (timestamp) => {
      rafId = requestAnimationFrame(animate);
      if (timestamp - lastTime < INTERVAL) return;
      lastTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${p.opacity})`;
        ctx.fill();
      }
    };

    resize();
    rafId = requestAnimationFrame(animate);

    const onResize = () => resize();
    window.addEventListener('resize', onResize, { passive: true });

    // Pause when tab hidden
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(rafId);
      else rafId = requestAnimationFrame(animate);
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ contain: 'paint' }}>
      {/* Static base gradient — no JS, no repaints */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(219,234,254,0.45) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(237,233,254,0.45) 0%, transparent 50%),
            radial-gradient(circle at 40% 70%, rgba(224,242,254,0.35) 0%, transparent 50%),
            linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)
          `,
        }}
      />

      {/* CSS-animated orbs — GPU composited, no layout/paint */}
      <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px] bg-gradient-to-br from-blue-200/35 to-indigo-200/25 rounded-full blur-3xl animate-float-slow" style={{ willChange: 'transform' }} />
      <div className="absolute top-1/3 right-1/4 w-[420px] h-[420px] bg-gradient-to-br from-violet-200/30 to-purple-200/20 rounded-full blur-3xl animate-float-slower" style={{ animationDelay: '1.2s', willChange: 'transform' }} />
      <div className="absolute bottom-1/4 left-1/3 w-[380px] h-[380px] bg-gradient-to-br from-indigo-200/25 to-blue-200/15 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2.4s', willChange: 'transform' }} />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99,102,241,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99,102,241,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Particle canvas — throttled 30fps */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Top/bottom fades */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/90 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/50 to-transparent" />
    </div>
  );
});

export default PremiumHeroBackground;
