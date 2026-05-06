import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FiTrendingUp, FiTarget, FiUsers, FiMessageSquare,
  FiHeadphones, FiGlobe, FiArrowRight, FiCheck,
  FiBarChart2, FiZap, FiShield, FiLayers,
  FiCheckCircle, FiRefreshCw, FiFileText, FiAward, FiActivity,
  FiDollarSign
} from 'react-icons/fi';
import PremiumHeroBackground from './PremiumHeroBackground';
import BrandLogo from '../assets/BrandLogo.png';
import iFranchiseHero from '../assets/iFranchise.png';

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
    <div ref={pageRef} className="relative w-full overflow-x-hidden bg-white">

      {/* HERO — Premium cinematic background with smooth transitions */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-32 px-4 sm:px-6 lg:px-8">
        
        {/* Extended Cinematic Background Layer with iFranchise.png */}
        <div className="absolute inset-0 -top-20 -bottom-40 z-0 overflow-hidden">
          {/* Base Image - Fully visible, extended, and clear */}
          <div 
            className="absolute inset-0 opacity-100"
            style={{
              backgroundImage: `url(${iFranchiseHero})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              filter: 'brightness(1.15)',
              transform: 'scale(1.05)',
            }}
          />
          
          {/* Smooth fade to white at bottom - removes hard line */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(255,255,255,0.3) 75%, rgba(255,255,255,0.7) 85%, rgba(255,255,255,0.95) 95%, white 100%)',
            }}
          />
          
          {/* Radial gradient for depth and readability */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center top, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.5) 80%)',
            }}
          />
          
          {/* Premium atmospheric mesh gradients */}
          <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-blue-100/15 via-indigo-100/8 to-transparent rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/15 via-violet-100/8 to-transparent rounded-full blur-3xl animate-float-slower" />
          
          {/* Ambient light glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-white/20 via-white/10 to-transparent rounded-full blur-3xl" />
          
          {/* Noise texture overlay for premium feel */}
          <div 
            className="absolute inset-0 opacity-[0.012]"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
            }}
          />
        </div>

        {/* Hero content with subtle text enhancements - NO large glass card */}
        <div className="relative z-10 mx-auto max-w-[900px] text-center">

          {/* Headline — stagger reveal, centered with text shadows for readability */}
          <div className="overflow-hidden mb-1">
            <motion.h1 initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.4, delay: 0.05, ease: [0.22,1,0.36,1] }}
              className="text-[clamp(1.75rem,6vw,3.5rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900"
              style={{ 
                textShadow: '0 2px 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.6), 0 1px 3px rgba(0,0,0,0.1)',
              }}>
              Strategic Services That
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-1">
            <motion.h1 initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.4, delay: 0.1, ease: [0.22,1,0.36,1] }}
              className="text-[clamp(1.75rem,6vw,3.5rem)] font-extrabold leading-[1.1] tracking-[-0.02em]"
              style={{ 
                background: 'linear-gradient(90deg,#6366f1 0%,#8b5cf6 45%,#3b82f6 100%)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 2px 12px rgba(255,255,255,0.8)) drop-shadow(0 0 30px rgba(255,255,255,0.5))',
              }}>
              Scale Brands Beyond
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-5">
            <motion.h1 initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.4, delay: 0.15, ease: [0.22,1,0.36,1] }}
              className="text-[clamp(1.75rem,6vw,3.5rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900"
              style={{ 
                textShadow: '0 2px 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.6), 0 1px 3px rgba(0,0,0,0.1)',
              }}>
              Competition
            </motion.h1>
          </div>

          {/* Subtle backdrop only behind subtext for readability */}
          <div className="relative mb-6">
            <div className="absolute inset-0 -inset-x-4 -inset-y-2 bg-white/30 backdrop-blur-sm rounded-2xl -z-10" />
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.25 }}
              className="mx-auto max-w-[560px] text-sm sm:text-base leading-relaxed text-slate-800 font-medium"
              style={{ 
                textShadow: '0 1px 8px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)',
              }}>
              India's most trusted franchise growth platform. We combine strategic intelligence, operational excellence, and investor-grade positioning to turn your brand into a scalable empire.
            </motion.p>
          </div>

          {/* CTAs — centered, premium with enhanced shadows */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <button type="button" onClick={() => navigateTo('/contact')}
              className="group relative overflow-hidden rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-indigo-500 hover:-translate-y-0.5"
              style={{
                boxShadow: '0 4px 20px rgba(99,102,241,0.4), 0 8px 40px rgba(99,102,241,0.2), 0 0 0 1px rgba(255,255,255,0.1)',
              }}>
              <span className="relative z-10 flex items-center gap-2">
                Book a Growth Strategy Call
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-0.5">
                  <FiArrowRight className="h-3 w-3" />
                </span>
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-600 group-hover:translate-x-full" />
            </button>
            <button type="button" onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-2 rounded-2xl border-2 border-slate-300 bg-white/95 backdrop-blur-sm px-6 py-3 text-sm font-bold text-slate-900 transition-all duration-300 hover:border-slate-400 hover:bg-white hover:-translate-y-0.5"
              style={{
                boxShadow: '0 4px 16px rgba(15,23,42,0.12), 0 8px 32px rgba(15,23,42,0.08)',
              }}>
              Explore Our Solutions
              <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Stats — centered glass cards with individual backdrops */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.35 }}
            className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 max-w-2xl mx-auto">
            {[
              { val: 500, suffix: '+', label: 'Brands Scaled' },
              { val: 98, suffix: '%', label: 'Client Satisfaction' },
              { val: 12, suffix: 'yr', label: 'Industry Experience' },
              { val: 40, suffix: '+', label: 'Cities Covered' },
            ].map((s) => (
              <div key={s.label} 
                className="rounded-xl border border-slate-200/80 bg-white/95 backdrop-blur-sm px-3 py-3 text-center"
                style={{
                  boxShadow: '0 4px 12px rgba(15,23,42,0.08), 0 2px 6px rgba(15,23,42,0.04)',
                }}>
                <p className="text-xl font-extrabold text-slate-900"><Counter target={s.val} suffix={s.suffix} /></p>
                <p className="mt-0.5 text-[10px] text-slate-600 font-medium">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* BENEFITS — More than just a franchise platform */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-8 -mt-24">
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

            {/* Animated gradient background */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute inset-0 opacity-40">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 animate-gradient-shift" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-violet-200/40 to-transparent rounded-full blur-3xl animate-float-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-200/40 to-transparent rounded-full blur-3xl animate-float-slower" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-indigo-200/30 to-transparent rounded-full blur-2xl animate-pulse-slow" />
              </div>
            </div>

            {/* Center orbit graphic — refined size for better balance */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ width: 300, height: 300 }}>
              <svg viewBox="0 0 300 300" width="300" height="300">
                <circle cx="150" cy="150" r="140" stroke="rgba(148,163,184,0.18)" strokeWidth="1.5" fill="none" />
                <circle cx="150" cy="150" r="100" stroke="rgba(148,163,184,0.14)" strokeWidth="1.5" fill="none" strokeDasharray="5 8" />
                <circle cx="150" cy="150" r="65" stroke="rgba(148,163,184,0.11)" strokeWidth="1.5" fill="none" />
                <circle cx="150" cy="150" r="32" stroke="rgba(148,163,184,0.08)" strokeWidth="1.5" fill="none" />
              </svg>
              
              {/* Animated glow rings behind logo */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-violet-200/50 via-purple-200/40 to-indigo-200/50 blur-2xl animate-pulse-slow" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-gradient-to-br from-purple-300/40 via-violet-300/30 to-indigo-300/40 blur-xl animate-pulse-glow" />
              
              {/* Center logo with purple background and animations */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 shadow-[0_0_40px_rgba(139,92,246,0.4),0_8px_32px_rgba(124,58,237,0.3)] flex items-center justify-center p-5 animate-logo-float">
                <img 
                  src={BrandLogo} 
                  alt="iFranchise Logo" 
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
              
              {/* Rotating ring around logo */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-2 border-dashed border-purple-300/30 animate-spin-slow" />
              
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

      {/* HOW IT WORKS - Success Framework */}
      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 py-24">
        <Reveal className="text-center mb-16">
          <span className="inline-block rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-indigo-700 mb-4">
            How It Works
          </span>
          <h2 className="text-4xl font-extrabold text-slate-900 md:text-5xl mb-4">Your Path to Franchise Success</h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            A proven step-by-step framework designed to help brands expand and investors discover the right opportunities with confidence.
          </p>
        </Reveal>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Step 1 */}
          <Reveal delay={0}>
            <div className="relative group">
              {/* Connector Line - Hidden on mobile, shown on lg+ */}
              <div className="hidden lg:block absolute top-16 left-[calc(100%-2rem)] w-[calc(100%-1rem)] h-0.5 bg-gradient-to-r from-blue-200 to-emerald-200 z-0" />
              
              <div className="relative bg-white rounded-2xl border border-slate-200/80 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 z-10">
                {/* Step Number Badge */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-lg mb-4 shadow-lg">
                  1
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-2">Discovery & Consultation</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  We understand your goals, budget, and vision to match you with the perfect franchise opportunities or expansion strategy.
                </p>
                
                {/* Key Features Pills */}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                    <FiCheckCircle className="h-3 w-3 text-blue-600" />
                    Free Consultation
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                    <FiTarget className="h-3 w-3 text-blue-600" />
                    Goal Mapping
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Step 2 */}
          <Reveal delay={0.1}>
            <div className="relative group">
              {/* Connector Line */}
              <div className="hidden lg:block absolute top-16 left-[calc(100%-2rem)] w-[calc(100%-1rem)] h-0.5 bg-gradient-to-r from-emerald-200 to-violet-200 z-0" />
              
              <div className="relative bg-white rounded-2xl border border-slate-200/80 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 z-10">
                {/* Step Number Badge */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-bold text-lg mb-4 shadow-lg">
                  2
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-2">Verified Matching</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Access our curated database of verified franchise opportunities with detailed business intelligence and performance data.
                </p>
                
                {/* Key Features Pills */}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                    <FiShield className="h-3 w-3 text-emerald-600" />
                    Verified Brands
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                    <FiBarChart2 className="h-3 w-3 text-emerald-600" />
                    Data Insights
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Step 3 */}
          <Reveal delay={0.2}>
            <div className="relative group">
              {/* Connector Line */}
              <div className="hidden lg:block absolute top-16 left-[calc(100%-2rem)] w-[calc(100%-1rem)] h-0.5 bg-gradient-to-r from-violet-200 to-orange-200 z-0" />
              
              <div className="relative bg-white rounded-2xl border border-slate-200/80 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 z-10">
                {/* Step Number Badge */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 text-white font-bold text-lg mb-4 shadow-lg">
                  3
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-2">Due Diligence Support</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Get expert guidance through legal, financial, and operational due diligence to make informed investment decisions.
                </p>
                
                {/* Key Features Pills */}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                    <FiFileText className="h-3 w-3 text-violet-600" />
                    Legal Review
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                    <FiDollarSign className="h-3 w-3 text-violet-600" />
                    Financial Analysis
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Step 4 */}
          <Reveal delay={0.3}>
            <div className="relative group">
              <div className="relative bg-white rounded-2xl border border-slate-200/80 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 z-10">
                {/* Step Number Badge */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold text-lg mb-4 shadow-lg">
                  4
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-2">Launch & Scale</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Ongoing support for setup, training, marketing, and growth strategies to ensure your franchise success from day one.
                </p>
                
                {/* Key Features Pills */}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                    <FiTrendingUp className="h-3 w-3 text-orange-600" />
                    Growth Support
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                    <FiUsers className="h-3 w-3 text-orange-600" />
                    Training
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

        </div>

        {/* Bottom Stats/Trust Indicators */}
        <Reveal delay={0.4}>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
              <div className="text-3xl font-extrabold text-blue-600 mb-1">500+</div>
              <div className="text-sm font-medium text-slate-600">Brands Listed</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
              <div className="text-3xl font-extrabold text-emerald-600 mb-1">1000+</div>
              <div className="text-sm font-medium text-slate-600">Successful Matches</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100">
              <div className="text-3xl font-extrabold text-violet-600 mb-1">95%</div>
              <div className="text-sm font-medium text-slate-600">Client Satisfaction</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100">
              <div className="text-3xl font-extrabold text-orange-600 mb-1">24/7</div>
              <div className="text-sm font-medium text-slate-600">Expert Support</div>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.5} className="text-center mt-12">
          <button
            type="button"
            onClick={() => navigateTo('/contact')}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-xl hover:-translate-y-1"
          >
            Start Your Journey Today
            <FiArrowRight className="h-4 w-4" />
          </button>
        </Reveal>
      </div>


    </div>
  );
}
