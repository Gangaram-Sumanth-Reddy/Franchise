import { useEffect, useRef, useState } from 'react';

/**
 * Premium SaaS-style animated background for Hero section
 * Inspired by Stripe, Linear, Apple, Vercel, Framer
 * Features: mesh gradients, floating orbs, particles, grid overlay
 */
function PremiumHeroBackground() {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse tracking for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas animation for floating particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = isMobile ? 20 : 40;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Enhanced base gradient mesh - richer colors */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(219, 234, 254, 0.5) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(237, 233, 254, 0.5) 0%, transparent 50%),
            radial-gradient(circle at 40% 70%, rgba(224, 242, 254, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(243, 232, 255, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 60% 50%, rgba(254, 240, 138, 0.15) 0%, transparent 60%),
            linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)
          `,
        }}
      />

      {/* Animated mesh gradient overlay with more movement */}
      <div
        className="absolute inset-0 opacity-50 animate-mesh-move"
        style={{
          background: `
            radial-gradient(circle at ${50 + mousePos.x * 10}% ${50 + mousePos.y * 10}%, rgba(147, 197, 253, 0.4) 0%, transparent 50%),
            radial-gradient(circle at ${30 - mousePos.x * 8}% ${70 - mousePos.y * 8}%, rgba(196, 181, 253, 0.4) 0%, transparent 50%),
            radial-gradient(circle at ${70 + mousePos.x * 5}% ${40 - mousePos.y * 5}%, rgba(165, 180, 252, 0.3) 0%, transparent 50%)
          `,
          transition: 'background 0.3s ease-out',
        }}
      />

      {/* Enhanced floating blur orbs with more depth */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-200/40 to-indigo-200/30 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-gradient-to-br from-violet-200/35 to-purple-200/25 rounded-full blur-3xl animate-float-slower" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-gradient-to-br from-indigo-200/30 to-blue-200/20 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/3 w-[350px] h-[350px] bg-gradient-to-br from-cyan-200/25 to-sky-200/20 rounded-full blur-3xl animate-float-slower" style={{ animationDelay: '3s' }} />

      {/* Additional smaller accent orbs */}
      <div className="absolute top-[15%] right-[15%] w-48 h-48 bg-violet-300/20 rounded-full blur-2xl animate-pulse-slow" />
      <div className="absolute bottom-[20%] left-[20%] w-56 h-56 bg-blue-300/20 rounded-full blur-2xl animate-pulse-glow" />

      {/* Premium grid overlay with subtle animation */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Diagonal light rays */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `
            linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.5) 45%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.5) 55%, transparent 100%)
          `,
          transform: 'translateX(-50%)',
          animation: 'light-sweep 15s ease-in-out infinite',
        }}
      />

      {/* Enhanced noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Floating particles canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Enhanced ambient light sweep with color */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background: `
            radial-gradient(circle at ${50 + mousePos.x * 15}% ${50 + mousePos.y * 15}%, rgba(255, 255, 255, 0.5) 0%, rgba(147, 197, 253, 0.1) 30%, transparent 60%)
          `,
          transition: 'background 0.5s ease-out',
        }}
      />

      {/* Subtle vignette effect */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(248, 250, 252, 0.5) 100%)',
        }}
      />

      {/* Top fade to blend with navbar */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/90 to-transparent" />

      {/* Bottom fade for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/50 to-transparent" />
    </div>
  );
}

export default PremiumHeroBackground;
