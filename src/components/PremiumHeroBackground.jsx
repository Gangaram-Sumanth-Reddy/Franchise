import { memo } from 'react';

/**
 * Hero background — fully static, no animations, no hover effects.
 * Pure CSS gradients for a clean, polished look.
 */
const PremiumHeroBackground = memo(function PremiumHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ contain: 'paint' }}>
      {/* Static base gradient */}
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

      {/* Static soft orbs — no animation */}
      <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px] bg-gradient-to-br from-blue-200/30 to-indigo-200/20 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-[420px] h-[420px] bg-gradient-to-br from-violet-200/25 to-purple-200/15 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/3 w-[380px] h-[380px] bg-gradient-to-br from-indigo-200/20 to-blue-200/10 rounded-full blur-3xl" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99,102,241,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99,102,241,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Top/bottom fades */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/90 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/50 to-transparent" />
    </div>
  );
});

export default PremiumHeroBackground;
