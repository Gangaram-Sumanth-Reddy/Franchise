import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FiTrendingUp, FiTarget, FiUsers, FiMessageSquare,
  FiHeadphones, FiGlobe, FiArrowRight, FiCheck,
  FiBarChart2, FiZap, FiShield, FiLayers,
  FiCheckCircle, FiRefreshCw, FiFileText, FiAward, FiActivity
} from 'react-icons/fi';

function Counter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: 'transform, opacity' }}
      className={className}
    >{children}</motion.div>
  );
}

const WHY_CARDS = [
  { icon: FiTrendingUp, title: 'Proven Track Record', desc: 'We have built a reputation as a trusted and reliable partner in achieving business success across 200+ brands.' },
  { icon: FiTarget, title: 'Tailored Solutions', desc: 'We offer personalized solutions tailored to your specific goals, audience, and industry for maximum impact.' },
  { icon: FiUsers, title: 'Client-Centric Focus', desc: 'Your success is our priority. We prioritize understanding your business goals before recommending any strategy.' },
  { icon: FiMessageSquare, title: 'Transparent Communication', desc: 'We believe in open and honest communication every step of the way — no surprises, no hidden agendas.' },
  { icon: FiHeadphones, title: 'Dedicated Support', desc: "Your success is our priority, and we're here to support you every step of the way with a dedicated team." },
  { icon: FiGlobe, title: 'Cross-Industry Expertise', desc: 'Our team has extensive experience working across various industries — from F&B to tech to wellness.' },
];

const FEATURES = [
  { icon: FiLayers, title: 'Franchise Expansion Strategy', desc: 'End-to-end franchise development roadmaps that scale your brand across markets with precision.', points: ['Market feasibility analysis', 'Territory mapping & planning', 'Franchise documentation'], iconBg: 'bg-indigo-600', accent: 'rgba(99,102,241,0.07)' },
  { icon: FiBarChart2, title: 'Investor-Ready Positioning', desc: 'Transform your business into an investment-grade opportunity that attracts serious capital.', points: ['Financial modelling & projections', 'Pitch deck creation', 'Due diligence preparation'], iconBg: 'bg-emerald-600', accent: 'rgba(5,150,105,0.07)' },
  { icon: FiZap, title: 'Lead Generation Systems', desc: 'High-conversion digital funnels that bring qualified franchise inquiries directly to your pipeline.', points: ['Multi-channel campaign setup', 'CRM integration & automation', 'Lead scoring & nurturing'], iconBg: 'bg-orange-500', accent: 'rgba(249,115,22,0.07)' },
  { icon: FiShield, title: 'Operational Scaling', desc: 'Build the systems, SOPs, and training infrastructure needed to replicate success at scale.', points: ['SOP development & documentation', 'Training program design', 'Quality control frameworks'], iconBg: 'bg-rose-500', accent: 'rgba(244,63,94,0.07)' },
];

export default function ServicesPage() {
  const pageRef = useRef(null);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div ref={pageRef} className="relative w-full overflow-x-hidden"
      style={{ background: 'linear-gradient(180deg, #060d1a 0%, #0d1526 18%, #0f172a 32%, #f8fafc 52%, #ffffff 65%, #f8fafc 80%, #ffffff 100%)' }}>

      {/* Persistent ambient orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute top-[-5%] left-[-8%] w-[700px] h-[700px] rounded-full opacity-[0.18] blur-[120px]"
          animate={{ scale: [1, 1.08, 1], opacity: [0.18, 0.24, 0.18], y: ['0%', '8%', '0%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,1) 0%, transparent 70%)' }} />
        <motion.div
          className="absolute top-[15%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-[0.12] blur-[100px]"
          animate={{ scale: [1, 1.12, 1], opacity: [0.12, 0.18, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,1) 0%, transparent 70%)' }} />
        <motion.div
          className="absolute top-[45%] left-[10%] w-[400px] h-[400px] rounded-full opacity-[0.07] blur-[80px]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,1) 0%, transparent 70%)' }} />
        <motion.div
          className="absolute top-[70%] right-[5%] w-[450px] h-[450px] rounded-full opacity-[0.06] blur-[90px]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,1) 0%, transparent 70%)' }} />
      </div>

      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />

      {/* HERO — Premium centered, network bg */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-8 pb-16">

        {/* Animated SVG network intelligence background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
            {/* Network connection lines */}
            <g opacity="0.18">
              <line x1="120" y1="180" x2="380" y2="320" stroke="rgba(99,102,241,0.6)" strokeWidth="0.8" />
              <line x1="380" y1="320" x2="720" y2="200" stroke="rgba(99,102,241,0.5)" strokeWidth="0.8" />
              <line x1="720" y1="200" x2="1060" y2="340" stroke="rgba(99,102,241,0.5)" strokeWidth="0.8" />
              <line x1="1060" y1="340" x2="1320" y2="220" stroke="rgba(99,102,241,0.4)" strokeWidth="0.8" />
              <line x1="200" y1="500" x2="480" y2="420" stroke="rgba(139,92,246,0.4)" strokeWidth="0.8" />
              <line x1="480" y1="420" x2="720" y2="560" stroke="rgba(139,92,246,0.4)" strokeWidth="0.8" />
              <line x1="720" y1="560" x2="960" y2="440" stroke="rgba(139,92,246,0.4)" strokeWidth="0.8" />
              <line x1="960" y1="440" x2="1240" y2="580" stroke="rgba(99,102,241,0.3)" strokeWidth="0.8" />
              <line x1="380" y1="320" x2="480" y2="420" stroke="rgba(99,102,241,0.3)" strokeWidth="0.6" />
              <line x1="720" y1="200" x2="720" y2="560" stroke="rgba(139,92,246,0.25)" strokeWidth="0.6" />
              <line x1="1060" y1="340" x2="960" y2="440" stroke="rgba(99,102,241,0.25)" strokeWidth="0.6" />
              <line x1="120" y1="180" x2="200" y2="500" stroke="rgba(99,102,241,0.2)" strokeWidth="0.6" />
              <line x1="1320" y1="220" x2="1240" y2="580" stroke="rgba(99,102,241,0.2)" strokeWidth="0.6" />
              {/* Secondary web */}
              <line x1="300" y1="720" x2="600" y2="660" stroke="rgba(99,102,241,0.15)" strokeWidth="0.6" />
              <line x1="600" y1="660" x2="900" y2="740" stroke="rgba(99,102,241,0.15)" strokeWidth="0.6" />
              <line x1="900" y1="740" x2="1140" y2="680" stroke="rgba(99,102,241,0.15)" strokeWidth="0.6" />
              <line x1="480" y1="420" x2="600" y2="660" stroke="rgba(139,92,246,0.12)" strokeWidth="0.5" />
              <line x1="960" y1="440" x2="900" y2="740" stroke="rgba(139,92,246,0.12)" strokeWidth="0.5" />
            </g>

            {/* Network nodes */}
            <g>
              {[
                [120, 180], [380, 320], [720, 200], [1060, 340], [1320, 220],
                [200, 500], [480, 420], [720, 560], [960, 440], [1240, 580],
                [300, 720], [600, 660], [900, 740], [1140, 680],
              ].map(([cx, cy], i) => (
                <g key={i}>
                  <circle cx={cx} cy={cy} r="3" fill="rgba(99,102,241,0.5)" />
                  <circle cx={cx} cy={cy} r="6" fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="1" />
                </g>
              ))}
              {/* Larger hub nodes */}
              {[[720, 200], [480, 420], [960, 440]].map(([cx, cy], i) => (
                <g key={`hub-${i}`}>
                  <circle cx={cx} cy={cy} r="5" fill="rgba(139,92,246,0.6)" />
                  <circle cx={cx} cy={cy} r="10" fill="none" stroke="rgba(139,92,246,0.2)" strokeWidth="1" />
                  <circle cx={cx} cy={cy} r="16" fill="none" stroke="rgba(139,92,246,0.08)" strokeWidth="1" />
                </g>
              ))}
            </g>

            {/* Animated pulse signals along paths */}
            <circle r="3" fill="rgba(129,140,248,0.9)">
              <animateMotion dur="4s" repeatCount="indefinite" path="M120,180 L380,320 L720,200 L1060,340 L1320,220" />
            </circle>
            <circle r="2.5" fill="rgba(167,139,250,0.8)">
              <animateMotion dur="5s" repeatCount="indefinite" begin="1.5s" path="M200,500 L480,420 L720,560 L960,440 L1240,580" />
            </circle>
            <circle r="2" fill="rgba(96,165,250,0.7)">
              <animateMotion dur="6s" repeatCount="indefinite" begin="0.8s" path="M380,320 L480,420 L600,660 L900,740" />
            </circle>
            <circle r="2" fill="rgba(129,140,248,0.6)">
              <animateMotion dur="4.5s" repeatCount="indefinite" begin="2.2s" path="M1320,220 L1060,340 L960,440 L1140,680" />
            </circle>

            {/* Horizontal scan line */}
            <line x1="0" y1="450" x2="1440" y2="450" stroke="rgba(99,102,241,0.06)" strokeWidth="1" strokeDasharray="4 8" />
            <line x1="0" y1="300" x2="1440" y2="300" stroke="rgba(99,102,241,0.04)" strokeWidth="1" strokeDasharray="4 12" />
          </svg>

          {/* Floating particles */}
          {[
            { x: '15%', y: '25%', size: 2, dur: 6 },
            { x: '75%', y: '15%', size: 1.5, dur: 8 },
            { x: '85%', y: '60%', size: 2, dur: 7 },
            { x: '25%', y: '70%', size: 1.5, dur: 9 },
            { x: '50%', y: '85%', size: 1, dur: 5 },
            { x: '60%', y: '30%', size: 1.5, dur: 10 },
          ].map((p, i) => (
            <motion.div key={i}
              className="absolute rounded-full bg-indigo-400"
              style={{ left: p.x, top: p.y, width: p.size * 2, height: p.size * 2, opacity: 0.4 }}
              animate={{ y: [0, -12, 0], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
            />
          ))}

          {/* Glassmorphism strategic overlay cards — subtle business signals */}
          <div className="absolute top-[12%] right-[8%] hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md"
              style={{ minWidth: 180 }}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Active Expansions</p>
              <p className="text-2xl font-extrabold text-white">247 <span className="text-emerald-400 text-sm">↑ 18%</span></p>
              <div className="mt-2 flex gap-1">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div key={i} className="w-1.5 rounded-full bg-indigo-500/60" style={{ height: h * 0.3 }} />
                ))}
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-[18%] left-[6%] hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md"
              style={{ minWidth: 160 }}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Cities Covered</p>
              <p className="text-2xl font-extrabold text-white">40<span className="text-indigo-400">+</span></p>
              <p className="text-[11px] text-slate-500 mt-1">Pan India Network</p>
            </motion.div>
          </div>

          <div className="absolute top-[55%] right-[5%] hidden xl:block">
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.8 }}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md"
              style={{ minWidth: 160 }}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Satisfaction</p>
              <p className="text-2xl font-extrabold text-white">98<span className="text-emerald-400">%</span></p>
              <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
                <motion.div className="h-full rounded-full bg-emerald-400"
                  initial={{ width: 0 }} animate={{ width: '98%' }} transition={{ delay: 0.9, duration: 1.2, ease: 'easeOut' }} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hero content — centered */}
        <div className="relative z-10 mx-auto max-w-[900px] text-center">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 mb-10 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-300">Premium Growth Services</span>
          </motion.div>

          {/* Headline — stagger reveal, centered */}
          <div className="overflow-hidden mb-1">
            <motion.h1 initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.4, delay: 0.05, ease: [0.22,1,0.36,1] }}
              className="text-5xl font-extrabold leading-[1.04] tracking-[-0.02em] text-white md:text-6xl lg:text-[80px]">
              Strategic Services That
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-1">
            <motion.h1 initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.4, delay: 0.1, ease: [0.22,1,0.36,1] }}
              className="text-5xl font-extrabold leading-[1.04] tracking-[-0.02em] md:text-6xl lg:text-[80px]"
              style={{ background: 'linear-gradient(90deg,#818cf8 0%,#a78bfa 45%,#60a5fa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Scale Brands Beyond
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1 initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.4, delay: 0.15, ease: [0.22,1,0.36,1] }}
              className="text-5xl font-extrabold leading-[1.04] tracking-[-0.02em] text-white md:text-6xl lg:text-[80px]">
              Competition
            </motion.h1>
          </div>

          {/* Subheadline */}
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.25 }}
            className="mx-auto max-w-[560px] text-base leading-relaxed text-slate-400 mb-10">
            India's most trusted franchise growth platform. We combine strategic intelligence, operational excellence, and investor-grade positioning to turn your brand into a scalable empire.
          </motion.p>

          {/* CTAs — centered, premium */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-20">
            <button type="button" onClick={() => navigateTo('/contact')}
              className="group relative overflow-hidden rounded-2xl bg-indigo-600 px-8 py-4 text-sm font-bold text-white shadow-[0_0_0_1px_rgba(99,102,241,0.3)] transition-all duration-300 hover:bg-indigo-500 hover:shadow-[0_0_40px_rgba(99,102,241,0.55),0_0_0_1px_rgba(99,102,241,0.5)] hover:-translate-y-0.5">
              <span className="relative z-10 flex items-center gap-2.5">
                Book a Growth Strategy Call
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-0.5">
                  <FiArrowRight className="h-3.5 w-3.5" />
                </span>
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-600 group-hover:translate-x-full" />
            </button>
            <button type="button" onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-2.5 rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/35 hover:bg-white/10 hover:-translate-y-0.5">
              Explore Our Solutions
              <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Stats — centered glass row */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.35 }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-2xl mx-auto">
            {[
              { val: 500, suffix: '+', label: 'Brands Scaled' },
              { val: 98, suffix: '%', label: 'Client Satisfaction' },
              { val: 12, suffix: 'yr', label: 'Industry Experience' },
              { val: 40, suffix: '+', label: 'Cities Covered' },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-md text-center">
                <p className="text-2xl font-extrabold text-white"><Counter target={s.val} suffix={s.suffix} /></p>
                <p className="mt-0.5 text-[11px] text-slate-400">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 pb-28">
        <Reveal className="text-center mb-14">
          <span className="inline-block rounded-full border border-slate-700/60 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-300 mb-4 backdrop-blur-sm">
            Why Choose Us
          </span>
          <h2 className="text-4xl font-extrabold text-white md:text-5xl">Why we are your best choice</h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(15,23,42,0.13)' }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-[0_4px_20px_rgba(15,23,42,0.06)]"
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 transition-all duration-300 group-hover:border-indigo-100 group-hover:bg-indigo-50">
                  <card.icon className="h-6 w-6 text-slate-700 transition-colors duration-300 group-hover:text-indigo-600" />
                </div>
                <h3 className="mb-2 text-base font-bold text-slate-900">{card.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{card.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* BENEFITS — More than just a franchise platform */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-8">
        <div className="mx-auto w-full max-w-[1240px] overflow-hidden rounded-[32px] border border-slate-100 bg-white px-6 py-16 shadow-[0_8px_40px_rgba(15,23,42,0.07)] sm:px-10">
          <div className="mx-auto max-w-[640px] text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600 mb-4"
            >
              Benefits
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.05 }}
              className="text-4xl font-extrabold tracking-tight text-[#0b0f19] sm:text-5xl"
            >
              More than just a franchise platform
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-5 text-base leading-relaxed text-slate-500 sm:text-lg"
            >
              iFranchise helps you discover verified opportunities, make confident investment decisions, and scale smarter with real data and insights.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.15 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <button type="button" onClick={() => navigateTo('/contact')}
                className="rounded-full bg-[#0B1220] px-7 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(15,23,42,0.22)]">
                Book a Call
              </button>
              <button type="button" onClick={() => navigateTo('/franchise-opportunities')}
                className="rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-[#0b0f19] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(15,23,42,0.10)]">
                View More
              </button>
            </motion.div>
          </div>

          {/* Desktop — Premium Strategic Ecosystem Layout */}
          <div className="relative mt-12 hidden lg:block" style={{ height: '480px' }}>

            {/* Center orbit graphic — refined size for better balance */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ width: 300, height: 300 }}>
              <svg viewBox="0 0 300 300" width="300" height="300">
                <circle cx="150" cy="150" r="140" stroke="rgba(148,163,184,0.18)" strokeWidth="1.5" fill="none" />
                <circle cx="150" cy="150" r="100" stroke="rgba(148,163,184,0.14)" strokeWidth="1.5" fill="none" strokeDasharray="5 8" />
                <circle cx="150" cy="150" r="65" stroke="rgba(148,163,184,0.11)" strokeWidth="1.5" fill="none" />
                <circle cx="150" cy="150" r="32" stroke="rgba(148,163,184,0.08)" strokeWidth="1.5" fill="none" />
              </svg>
              {/* Core glow */}
              <div className="benefits-core absolute left-1/2 top-1/2 h-[80px] w-[80px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
              <div className="benefits-core-glow absolute left-1/2 top-1/2 h-[115px] w-[115px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
              {/* Orbit dots */}
              <div className="benefits-orbit-ring absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full">
                <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(124,58,237,0.6)]" />
              </div>
              <div className="benefits-orbit-ring-reverse absolute left-1/2 top-1/2 h-[135px] w-[135px] -translate-x-1/2 -translate-y-1/2 rounded-full">
                <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.55)]" />
              </div>
            </div>

            {/* Premium Pills — Perfect Circular Arrangement (8 pills, 45° apart) */}
            
            {/* Position 1: TOP CENTER (0°) - Moved further left */}
            <motion.div className="absolute top-[6%] left-[40%]"
              initial={{ opacity: 0, y: -12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.2 }}>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="whitespace-nowrap rounded-full border border-slate-200/80 bg-white px-5 py-2.5 shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50">
                    <FiCheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                  </span>
                  <p className="text-sm font-medium text-slate-800">Verified Franchise Listings</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Position 2: TOP RIGHT (45°) */}
            <motion.div className="absolute top-[16%] right-[12%]"
              initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.25 }}>
              <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="whitespace-nowrap rounded-full border border-slate-200/80 bg-white px-5 py-2.5 shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-50">
                    <FiBarChart2 className="h-3.5 w-3.5 text-indigo-600" />
                  </span>
                  <p className="text-sm font-medium text-slate-800">Data-Driven Insights</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Position 3: MIDDLE RIGHT (90°) */}
            <motion.div className="absolute top-[50%] -translate-y-1/2 right-[6%]"
              initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.3 }}>
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="whitespace-nowrap rounded-full border border-slate-200/80 bg-white px-5 py-2.5 shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-violet-50">
                    <FiTarget className="h-3.5 w-3.5 text-violet-600" />
                  </span>
                  <p className="text-sm font-medium text-slate-800">Smart Investment Decisions</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Position 4: BOTTOM RIGHT (135°) */}
            <motion.div className="absolute bottom-[16%] right-[12%]"
              initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.35 }}>
              <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="whitespace-nowrap rounded-full border border-slate-200/80 bg-white px-5 py-2.5 shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-50">
                    <FiAward className="h-3.5 w-3.5 text-amber-600" />
                  </span>
                  <p className="text-sm font-medium text-slate-800">Expert Guidance & Support</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Position 5: BOTTOM CENTER (180°) - Moved further left */}
            <motion.div className="absolute bottom-[6%] left-[37%]"
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.4 }}>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="whitespace-nowrap rounded-full border border-slate-200/80 bg-white px-5 py-2.5 shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-50">
                    <FiRefreshCw className="h-3.5 w-3.5 text-blue-600" />
                  </span>
                  <p className="text-sm font-medium text-slate-800">Real-Time Opportunity Updates</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Position 6: BOTTOM LEFT (225°) */}
            <motion.div className="absolute bottom-[16%] left-[12%]"
              initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.45 }}>
              <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
                className="whitespace-nowrap rounded-full border border-slate-200/80 bg-white px-5 py-2.5 shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-50">
                    <FiFileText className="h-3.5 w-3.5 text-slate-600" />
                  </span>
                  <p className="text-sm font-medium text-slate-800">Transparent Deal Information</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Position 7: MIDDLE LEFT (270°) */}
            <motion.div className="absolute top-[50%] -translate-y-1/2 left-[6%]"
              initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.5 }}>
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                className="whitespace-nowrap rounded-full border border-slate-200/80 bg-white px-5 py-2.5 shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-rose-50">
                    <FiUsers className="h-3.5 w-3.5 text-rose-600" />
                  </span>
                  <p className="text-sm font-medium text-slate-800">Investor-Centric Platform</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Position 8: TOP LEFT (315°) */}
            <motion.div className="absolute top-[16%] left-[12%]"
              initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.55 }}>
              <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4.3, repeat: Infinity, ease: 'easeInOut', delay: 3.5 }}
                className="whitespace-nowrap rounded-full border border-slate-200/80 bg-white px-5 py-2.5 shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-50">
                    <FiTarget className="h-3.5 w-3.5 text-purple-600" />
                  </span>
                  <p className="text-sm font-medium text-slate-800">Strategic Planning</p>
                </div>
              </motion.div>
            </motion.div>

          </div>

          {/* Mobile — grid */}
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:hidden">
            {[
              { title: 'Verified Franchise Listings', Icon: FiCheckCircle, color: 'emerald' },
              { title: 'Strategic Planning', Icon: FiTarget, color: 'purple' },
              { title: 'Data-Driven Insights', Icon: FiBarChart2, color: 'indigo' },
              { title: 'Growth & Expansion Support', Icon: FiTrendingUp, color: 'blue' },
              { title: 'Smart Investment Decisions', Icon: FiTarget, color: 'violet' },
              { title: 'Market Intelligence', Icon: FiActivity, color: 'sky' },
              { title: 'Real-Time Opportunity Updates', Icon: FiRefreshCw, color: 'blue' },
              { title: 'Transparent Deal Information', Icon: FiFileText, color: 'slate' },
              { title: 'Expert Guidance & Support', Icon: FiAward, color: 'amber' },
              { title: 'Investor-Centric Platform', Icon: FiUsers, color: 'rose' },
            ].map((item, i) => (
              <motion.div key={item.title}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.02 }}
                className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-[0_4px_16px_rgba(15,23,42,0.06)]"
              >
                <div className="flex items-center gap-2.5">
                  <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full bg-${item.color}-50`}>
                    <item.Icon className={`h-4 w-4 text-${item.color}-600`} />
                  </span>
                  <p className="text-sm font-medium text-slate-700">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* OUR SOLUTIONS */}
      <div id="solutions" className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 py-24">
        <Reveal className="text-center mb-14">
          <span className="inline-block rounded-full bg-slate-900 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white mb-4">
            Our Solutions
          </span>
          <h2 className="text-4xl font-extrabold text-slate-900 md:text-5xl">Everything you need to scale</h2>
          <p className="mt-4 max-w-xl mx-auto text-base text-slate-500">
            Four core service pillars engineered to take your brand from local success to national dominance.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.09}>
              <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-2xl"
                  style={{ background: `radial-gradient(circle at 0% 0%, ${f.accent} 0%, transparent 60%)` }} />
                <div className={`relative mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl ${f.iconBg}`}>
                  <f.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="relative text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="relative text-sm leading-relaxed text-slate-500 mb-5">{f.desc}</p>
                <ul className="relative space-y-2.5">
                  {f.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <span className={`flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full ${f.iconBg}`}>
                        <FiCheck className="h-2.5 w-2.5 text-white" />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-[#0b1220] px-8 py-16 text-center shadow-[0_40px_100px_rgba(0,0,0,0.25)]">
            <div className="pointer-events-none absolute top-[-40%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-30 blur-3xl"
              style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.8) 0%, transparent 70%)' }} />
            <div className="relative z-10">
              <span className="inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-indigo-300 mb-6">
                Get Started Today
              </span>
              <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-4">Ready to scale your brand?</h2>
              <p className="text-base text-slate-400 max-w-lg mx-auto mb-10">
                Book a free 30-minute strategy call with our senior consultants and discover your brand's true growth potential.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button type="button" onClick={() => navigateTo('/contact')}
                  className="group relative overflow-hidden rounded-xl bg-indigo-600 px-9 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-indigo-500 hover:-translate-y-0.5">
                  Book Your Strategy Call
                </button>
                <button type="button" onClick={() => navigateTo('/franchise-opportunities')}
                  className="rounded-xl border border-white/20 bg-white/5 px-9 py-4 text-sm font-bold text-white transition-all duration-300 hover:border-white/35 hover:bg-white/8">
                  View Opportunities
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

    </div>
  );
}
