import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiTrendingUp, FiTarget, FiUsers, FiMessageSquare,
  FiHeadphones, FiGlobe, FiArrowRight, FiCheck,
  FiBarChart2, FiZap, FiShield, FiLayers,
  FiCheckCircle, FiRefreshCw, FiFileText, FiAward, FiActivity,
  FiDollarSign, FiUserCheck, FiBookOpen, FiUserPlus, FiCompass, FiMap,
  FiChevronDown, FiPlus, FiMinus, FiCoffee, FiTool, FiShoppingBag
} from 'react-icons/fi';
import PremiumHeroBackground from './PremiumHeroBackground';
import BrandLogo from '../assets/BrandLogo.png';
import iFranchiseHero from '../assets/iFranchise.png';
import serviceHero from '../assets/serviceHero.png';
import service2 from '../assets/service2.png';
import processImg from '../assets/process.png';
import service4 from '../assets/service4.png';
import service5 from '../assets/service5.png';

// ── Lightweight CSS-only reveal — no framer-motion per element ────────────────
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          obs.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -4% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: 'translateY(14px)',
        transition: `opacity 0.4s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ── Lightweight counter — uses rAF, no setInterval ────────────────────────────
function Counter({ target, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.floor(eased * target));
            if (p < 1) requestAnimationFrame(tick);
            else setCount(target);
          };
          requestAnimationFrame(tick);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Lightweight step badge — 1 CSS animation instead of 8 ────────────────────
function StepBadge({ number, color }) {
  const colors = {
    blue:   { bg: 'from-blue-500 via-indigo-600 to-blue-700',   ring: 'rgba(59,130,246,0.3)',  glow: 'rgba(99,102,241,0.15)' },
    green:  { bg: 'from-emerald-500 via-teal-600 to-emerald-700', ring: 'rgba(16,185,129,0.3)', glow: 'rgba(20,184,166,0.15)' },
    violet: { bg: 'from-violet-500 via-purple-600 to-violet-700', ring: 'rgba(139,92,246,0.3)', glow: 'rgba(168,85,247,0.15)' },
    orange: { bg: 'from-orange-500 via-amber-600 to-orange-700',  ring: 'rgba(249,115,22,0.3)', glow: 'rgba(245,158,11,0.15)' },
  };
  const c = colors[color] || colors.blue;
  return (
    <div className="mb-5 flex justify-center">
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Single subtle pulse ring */}
        <div
          className="absolute inset-0 rounded-full animate-pulseGlow"
          style={{ background: c.ring, transform: 'scale(1.5)', filter: 'blur(6px)' }}
        />
        {/* Badge */}
        <div
          className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${c.bg} flex items-center justify-center shadow-xl`}
          style={{ boxShadow: `0 8px 24px ${c.glow}` }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/25 via-transparent to-transparent" />
          <span className="relative text-2xl font-extrabold text-white drop-shadow">{number}</span>
        </div>
      </div>
    </div>
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

const SERVICE_CARDS = [
  {
    icon: FiUserCheck,
    title: 'Franchise Onboarding',
    points: [
      'Franchise business evaluation',
      'Franchise model setup',
      'Operational guidance',
      'Franchise readiness support'
    ],
    gradient: 'from-blue-500 to-indigo-600',
    glowColor: 'rgba(99, 102, 241, 0.15)'
  },
  {
    icon: FiBookOpen,
    title: 'Franchise Documentation',
    points: [
      'Franchise agreements',
      'Business documentation',
      'Investor presentations',
      'Brand process documentation'
    ],
    gradient: 'from-emerald-500 to-teal-600',
    glowColor: 'rgba(16, 185, 129, 0.15)'
  },
  {
    icon: FiUserPlus,
    title: 'Investor Acquisition',
    points: [
      'Investor lead generation',
      'Franchise investor outreach',
      'Qualified investor matching',
      'Investor onboarding support'
    ],
    gradient: 'from-violet-500 to-purple-600',
    glowColor: 'rgba(139, 92, 246, 0.15)'
  },
  {
    icon: FiTarget,
    title: 'Franchise Branding & Positioning',
    points: [
      'Brand positioning',
      'Franchise marketing strategy',
      'Investor-focused branding',
      'Expansion communication strategy'
    ],
    gradient: 'from-orange-500 to-red-600',
    glowColor: 'rgba(249, 115, 22, 0.15)'
  },
  {
    icon: FiMap,
    title: 'Franchise Expansion Strategy',
    points: [
      'Market expansion planning',
      'Territory analysis',
      'Location targeting',
      'Expansion roadmap'
    ],
    gradient: 'from-cyan-500 to-blue-600',
    glowColor: 'rgba(6, 182, 212, 0.15)'
  },
  {
    icon: FiCompass,
    title: 'Investor Onboarding Support',
    points: [
      'Investor qualification',
      'Opportunity presentations',
      'Initial consultation support',
      'Investor journey management'
    ],
    gradient: 'from-pink-500 to-rose-600',
    glowColor: 'rgba(236, 72, 153, 0.15)'
  }
];

const FAQ_ITEMS = [
  {
    question: 'What franchise services does iFranchise provide?',
    answer: 'We provide franchise onboarding, documentation support, investor acquisition, branding, expansion strategy, and investor onboarding services.'
  },
  {
    question: 'How does iFranchise help brands expand?',
    answer: 'We help brands structure their franchise model, attract investors, and expand into new markets through a scalable growth process.'
  },
  {
    question: 'Do you help find franchise investors?',
    answer: 'Yes, we connect brands with qualified investors actively looking for franchise business opportunities.'
  },
  {
    question: 'What industries do you work with?',
    answer: 'We work with businesses across retail, food & beverage, healthcare, education, beauty, and infrastructure sectors.'
  },
  {
    question: 'Can investors discover opportunities through iFranchise?',
    answer: 'Yes, investors can explore verified franchise opportunities and connect directly with brands.'
  }
];

function FAQItem({ question, answer, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Reveal delay={index * 0.08}>
      <motion.div
        className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/55 backdrop-blur-sm transition-all duration-300"
        animate={{
          borderColor: isOpen ? 'rgba(15, 23, 42, 0.2)' : 'rgba(148, 163, 184, 0.6)',
        }}
      >
        {/* Glowing active state */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 via-violet-50/30 to-purple-50/50 pointer-events-none"
          />
        )}

        {/* Question Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-full text-left px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between gap-4 transition-colors duration-300"
        >
          <span className={`text-base sm:text-lg font-bold transition-colors duration-300 ${
            isOpen ? 'text-slate-900' : 'text-slate-800'
          }`}>
            {question}
          </span>
          
          {/* Animated Icon */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
              isOpen 
                ? 'bg-slate-900 text-white' 
                : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
            }`}
          >
            <FiChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        {/* Answer with smooth animation */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: 'auto', 
                opacity: 1,
                transition: {
                  height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.25, delay: 0.1 }
                }
              }}
              exit={{ 
                height: 0, 
                opacity: 0,
                transition: {
                  height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.2 }
                }
              }}
              className="relative overflow-hidden"
            >
              <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-4">
                    {answer}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover shine effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full pointer-events-none" />
      </motion.div>
    </Reveal>
  );
}

// Investor Dashboard Content Component with Filtering
function InvestorDashboardContent({ navigateTo }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const allOpportunities = [
    { 
      name: 'Premium Coffee Chain',
      category: 'Food & Beverage',
      industry: 'F&B',
      roi: '+32% ROI',
      investment: 'Min: $250K',
      color: 'from-emerald-500 to-teal-600',
      icon: FiCoffee,
      link: '/franchise-opportunities'
    },
    { 
      name: 'Fitness Studio Network',
      category: 'Health & Wellness',
      industry: 'Wellness',
      roi: '+28% ROI',
      investment: 'Min: $180K',
      color: 'from-blue-500 to-cyan-600',
      icon: FiActivity,
      link: '/franchise-opportunities'
    },
    { 
      name: 'Tech Repair Franchise',
      category: 'Technology',
      industry: 'Technology',
      roi: '+36% ROI',
      investment: 'Min: $120K',
      color: 'from-violet-500 to-purple-600',
      icon: FiTool,
      link: '/franchise-opportunities'
    },
    { 
      name: 'Fashion Boutique',
      category: 'Retail',
      industry: 'Retail',
      roi: '+29% ROI',
      investment: 'Min: $150K',
      color: 'from-pink-500 to-rose-600',
      icon: FiShoppingBag,
      link: '/franchise-opportunities'
    }
  ];

  const filteredOpportunities = selectedFilter === 'all' 
    ? allOpportunities.slice(0, 3) 
    : allOpportunities.filter(opp => opp.category === selectedFilter).slice(0, 3);

  return (
    <>
      {/* Filter Tags - Clickable and Functional (No Redirect) */}
      <div className="flex gap-1.5">
        {[
          { label: 'All', value: 'all' },
          { label: 'F&B', value: 'Food & Beverage' },
          { label: 'Retail', value: 'Retail' },
          { label: 'Tech', value: 'Technology' }
        ].map((tag) => (
          <button
            key={tag.value}
            onClick={() => setSelectedFilter(tag.value)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all cursor-pointer hover:scale-105 ${
              selectedFilter === tag.value
                ? 'bg-violet-600 text-white shadow-md' 
                : 'bg-white border border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-600'
            }`}
          >
            {tag.label}
          </button>
        ))}
      </div>

      {/* Verified Opportunity Cards - Filtered */}
      <div className="space-y-1.5">
        {filteredOpportunities.map((opp, i) => (
          <button
            key={i}
            onClick={() => navigateTo(opp.link)}
            className="w-full rounded-lg bg-white/90 backdrop-blur-sm p-2 shadow-md border border-slate-200/60 hover:shadow-lg hover:border-violet-300 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start gap-2">
              <div className={`h-9 w-9 flex-shrink-0 rounded-lg bg-gradient-to-br ${opp.color} shadow-lg flex items-center justify-center`}>
                <opp.icon className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <h4 className="text-[11px] font-bold text-slate-800 truncate">{opp.name}</h4>
                  <div className="flex-shrink-0 h-4 w-4 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center">
                    <FiCheckCircle className="h-2.5 w-2.5 text-emerald-700" />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[9px] text-slate-500">{opp.industry}</span>
                  <span className="text-[9px] text-slate-300">·</span>
                  <span className="text-[9px] font-semibold text-emerald-600">{opp.roi}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-slate-600">{opp.investment}</span>
                  <FiArrowRight className="h-3 w-3 text-indigo-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Investment Analytics Panel - Real Market Intelligence Data */}
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { icon: FiBarChart2, label: 'Avg ROI', value: '31%', color: 'from-violet-500 to-purple-600' },
          { icon: FiTrendingUp, label: 'CAGR', value: '~30%', color: 'from-blue-500 to-cyan-600' },
          { icon: FiDollarSign, label: 'Min Inv', value: '?95K', color: 'from-emerald-500 to-teal-600' }
        ].map((metric, i) => (
          <div
            key={i}
            className={`rounded-lg bg-gradient-to-br ${metric.color} p-2 shadow-lg relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <metric.icon className="h-3 w-3 text-white/80 mb-0.5" />
            <div className="text-sm font-bold text-white">{metric.value}</div>
            <div className="text-[8px] text-white/70">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Market Trends Chart - Larger & Better Visible */}
      <div className="rounded-lg bg-white border border-slate-200/60 p-3 shadow-lg">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <FiActivity className="h-2.5 w-2.5 text-white" />
            </div>
            <span className="text-[11px] font-bold text-slate-900">Market Trends</span>
          </div>
          <div className="relative flex items-center gap-1">
            <div className="absolute h-1 w-1 rounded-full bg-emerald-500 animate-ping" />
            <div className="h-1 w-1 rounded-full bg-emerald-500" />
            <span className="text-[8px] font-semibold text-emerald-600">Live</span>
          </div>
        </div>
        
        {/* Chart with proper alignment */}
        <div className="relative">
          {/* Grid lines with percentage labels */}
          <div className="absolute left-7 right-0 top-0 bottom-6 flex flex-col justify-between">
            {[100, 75, 50, 25, 0].map((val, i) => (
              <div key={i} className="relative h-px bg-slate-200">
                <span className="absolute -left-7 -top-2 text-[8px] text-slate-400 font-medium w-6 text-right">{val}%</span>
              </div>
            ))}
          </div>
          
          {/* Bar chart - Real Market Intelligence Data (Quarterly) */}
          <div className="relative flex items-end justify-between gap-1 h-20 pl-7 pb-6">
            {[
              { value: 38, label: 'Q1' },
              { value: 45, label: 'Q2' },
              { value: 52, label: 'Q3' },
              { value: 61, label: 'Q4' },
              { value: 58, label: 'Q1' },
              { value: 70, label: 'Q2' },
              { value: 78, label: 'Q3' },
              { value: 85, label: 'Q4' },
              { value: 95, label: 'Q1' }
            ].map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center h-full justify-end">
                <div
                  style={{ height: `${item.value}%` }}
                  className="w-full rounded-t-md bg-gradient-to-t from-violet-600 to-purple-500 shadow-md relative overflow-hidden flex flex-col items-center justify-between py-1"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent" />
                  
                  {/* Value inside bar for taller bars */}
                  {item.value >= 60 && (
                    <div className="relative mt-auto mb-0.5">
                      <span className="text-[7px] font-bold text-white drop-shadow-sm">
                        {item.value}%
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Month label below */}
                <span className="text-[7px] text-slate-500 font-medium mt-1 absolute" style={{ bottom: 0 }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default function ServicesPage() {
  const pageRef = useRef(null);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div 
      ref={pageRef} 
      className="relative w-full" 
      style={{ 
        background: 'transparent',
        scrollBehavior: 'smooth',
        scrollPaddingTop: '80px'
      }}
    >

      {/* -----------------------------------------------------------------------
          GLOBAL LIVING BACKGROUND – One continuous animated ecosystem
          Absolute positioned, full page height, behind all content
          Seamlessly integrated with Hero atmosphere
      ----------------------------------------------------------------------- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0, contain: 'paint' }}>
        {/* Base canvas - soft atmospheric foundation */}
        <div className="absolute inset-0" style={{ 
          background: 'linear-gradient(160deg, #ede8ff 0%, #f5f3ff 25%, #eef4ff 55%, #f0ebff 100%)',
          opacity: 0.95
        }} />

        {/* Orb 1 — top-left violet */}
        <div className="absolute" style={{
          top: '-5%', left: '-8%',
          width: '70vw', height: '70vw',
          background: 'radial-gradient(circle, rgba(167,139,250,0.45) 0%, rgba(139,92,246,0.18) 40%, transparent 68%)',
          filter: 'blur(70px)',
          animation: 'globalOrb1 25s ease-in-out infinite',
          willChange: 'transform',
        }} />

        {/* Orb 2 — top-right indigo */}
        <div className="absolute" style={{
          top: '3%', right: '-8%',
          width: '60vw', height: '60vw',
          background: 'radial-gradient(circle, rgba(147,197,253,0.38) 0%, rgba(99,102,241,0.14) 42%, transparent 68%)',
          filter: 'blur(70px)',
          animation: 'globalOrb2 30s ease-in-out infinite',
          willChange: 'transform',
        }} />

        {/* Orb 3 — mid-page center */}
        <div className="absolute" style={{
          top: '28%', left: '15%',
          width: '65vw', height: '55vw',
          background: 'radial-gradient(ellipse, rgba(196,181,253,0.32) 0%, rgba(139,92,246,0.10) 48%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'globalOrb3 35s ease-in-out infinite',
          willChange: 'transform',
        }} />

        {/* Orb 4 — lower-left blue */}
        <div className="absolute" style={{
          top: '52%', left: '-6%',
          width: '55vw', height: '55vw',
          background: 'radial-gradient(circle, rgba(165,180,252,0.36) 0%, rgba(99,102,241,0.12) 42%, transparent 68%)',
          filter: 'blur(65px)',
          animation: 'globalOrb1 28s ease-in-out infinite reverse',
          willChange: 'transform',
        }} />

        {/* Orb 5 — lower-right purple */}
        <div className="absolute" style={{
          top: '60%', right: '-6%',
          width: '58vw', height: '58vw',
          background: 'radial-gradient(circle, rgba(233,213,255,0.40) 0%, rgba(168,85,247,0.13) 42%, transparent 68%)',
          filter: 'blur(70px)',
          animation: 'globalOrb2 32s ease-in-out infinite reverse',
          willChange: 'transform',
        }} />

        {/* Orb 6 — bottom center */}
        <div className="absolute" style={{
          bottom: '0%', left: '25%',
          width: '50vw', height: '40vw',
          background: 'radial-gradient(ellipse, rgba(167,139,250,0.30) 0%, rgba(139,92,246,0.10) 45%, transparent 70%)',
          filter: 'blur(75px)',
          animation: 'globalOrb3 38s ease-in-out infinite reverse',
          willChange: 'transform',
        }} />

        {/* Global dot grid — full page, fades at edges */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(109,40,217,0.14) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'linear-gradient(180deg, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 8%, black 92%, transparent 100%)',
        }} />
      </div>

      {/* HERO – Clean immersive layout with serviceHero.png background */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pb-8">
        
        {/* Background Layer - serviceHero.png clearly visible */}
        <div className="absolute inset-0 overflow-hidden">
          
          {/* ServiceHero Image - Clear and visible */}
          <div className="absolute inset-0">
            <img 
              src={serviceHero} 
              alt="" 
              className="w-full h-full object-cover"
              style={{
                opacity: 0.75,
                filter: 'brightness(1.05)',
                transform: 'scale(1.02)'
              }}
            />
            
            {/* Light gradient overlay - minimal to keep image visible */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#ede8ff]/40 via-transparent to-[#f5f3ff]/30" />
            
            {/* Soft fade at bottom for seamless transition - INCREASED */}
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#f5f3ff] via-[#f5f3ff]/90 to-transparent" />
          </div>

          {/* Subtle ambient orbs - don't overpower the image */}
          <div className="absolute top-[-5%] left-[-5%] w-[40vw] h-[40vw] opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 70%)',
              filter: 'blur(40px)',
              animation: 'float-slow 25s ease-in-out infinite'
            }} />
          
          <div className="absolute top-[10%] right-[-5%] w-[35vw] h-[35vw] opacity-12"
            style={{
              background: 'radial-gradient(circle, rgba(147,197,253,0.15) 0%, transparent 70%)',
              filter: 'blur(50px)',
              animation: 'float-slower 30s ease-in-out infinite'
            }} />

          {/* Premium Hero Background component - reduced opacity */}
          <div style={{ opacity: 0.3 }}>
            <PremiumHeroBackground />
          </div>
        </div>

        {/* Hero content - centered */}
        <div className="relative z-20 mx-auto max-w-[900px] text-center">

          {/* Headline - shorter and clearer like home hero */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
            className="text-[clamp(2.75rem,8vw,5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-slate-900 mb-6"
          >
            Franchise Growth Services
          </motion.h1>

          {/* Subtext - matching home style */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22,1,0.36,1] }}
            className="mx-auto max-w-[720px] text-lg sm:text-xl leading-relaxed text-slate-600 mb-8"
          >
            End-to-end franchise expansion services for growing brands. From onboarding and documentation to investor acquisition and strategic scaling.
          </motion.p>

          {/* CTA Button - matching home style */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22,1,0.36,1] }}
            className="mb-5"
          >
            <button 
              type="button" 
              onClick={() => navigateTo('/contact')}
              className="group relative overflow-hidden rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(15,23,42,0.25)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Schedule a Consultation
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-0.5">
                  <FiArrowRight className="h-3 w-3" />
                </span>
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-600 group-hover:translate-x-full" />
            </button>
          </motion.div>

          {/* Trust Badge with Avatars and Reviews */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-2.5"
          >
            <div className="flex items-center gap-4">
              {/* Overlapping Avatars */}
              <div className="flex -space-x-2">
                <img 
                  src="https://i.pravatar.cc/40?img=12" 
                  alt="User" 
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                />
                <img 
                  src="https://i.pravatar.cc/40?img=18" 
                  alt="User" 
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                />
                <img 
                  src="https://i.pravatar.cc/40?img=26" 
                  alt="User" 
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                />
                <img 
                  src="https://i.pravatar.cc/40?img=32" 
                  alt="User" 
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                />
              </div>

              {/* Stars and Review Count */}
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 fill-slate-900" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm font-medium text-slate-500">From 150+ reviews</p>
              </div>
            </div>

            {/* Trust Text */}
            <p className="text-sm font-medium text-slate-500">
              Helping brands expand and investors connect through a smarter franchise ecosystem
            </p>
          </motion.div>
        </div>
      </div>

      {/* SERVICES OVERVIEW */}
      <div className="relative z-10 py-12 -mt-16">
        
        {/* Background Layer - service2.png full width coverage */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          
          {/* Service2 Image - Full coverage, no white sides */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={service2} 
              alt="" 
              className="w-full h-full"
              style={{
                opacity: 0.65,
                filter: 'brightness(1.08)',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
            
            {/* Light gradient overlay - minimal to keep image visible */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#f5f3ff]/50 via-transparent to-[#eef4ff]/40" />
            
            {/* Soft fade at top and bottom for seamless transitions */}
            <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#f5f3ff] via-[#f5f3ff]/90 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#eef4ff] via-[#eef4ff]/90 to-transparent" />
          </div>

          {/* Subtle ambient glow */}
          <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] opacity-10"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)'
            }} />
        </div>

        {/* Content Container */}
        <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="relative z-10 text-center mb-16">
          <Reveal>
            <span className="inline-block rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-700 mb-5 shadow-sm">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-700 mr-2"></span>
              Our Services
            </span>
            <h2 className="text-4xl font-extrabold text-slate-900 md:text-5xl mb-5">
              Complete Franchise Growth & Expansion Services
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
              We provide end-to-end franchise services designed to help businesses scale efficiently and connect with the right investors. Our process covers every stage of franchise growth — from strategy and documentation to investor onboarding and brand positioning.
            </p>
          </Reveal>
        </div>

        {/* Service Cards Grid - 3x2 on desktop, 2 cols on tablet, 1 col on mobile */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_CARDS.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.08}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/55 backdrop-blur-md p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(99,102,241,0.15)] hover:border-violet-200/70 h-full flex flex-col" style={{ boxShadow: '0 4px 24px rgba(99,102,241,0.08), 0 1px 4px rgba(0,0,0,0.04)' }}>
                
                {/* Animated line background - flows on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  {/* Horizontal lines */}
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent animate-lineFlow" />
                  <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent animate-lineFlow" style={{ animationDelay: '0.3s' }} />
                  <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent animate-lineFlow" style={{ animationDelay: '0.6s' }} />
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent animate-lineFlow" style={{ animationDelay: '0.9s' }} />
                  
                  {/* Vertical lines */}
                  <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-slate-300 to-transparent animate-lineFlowVertical" />
                  <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-slate-300 to-transparent animate-lineFlowVertical" style={{ animationDelay: '0.3s' }} />
                  <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-slate-300 to-transparent animate-lineFlowVertical" style={{ animationDelay: '0.6s' }} />
                  <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-slate-300 to-transparent animate-lineFlowVertical" style={{ animationDelay: '0.9s' }} />
                </div>
                
                {/* Subtle gradient overlay on hover */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top left, ${service.glowColor}, transparent 70%)`
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon Area with gradient background */}
                  <div className="mb-6">
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient} shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                      <service.icon className="h-7 w-7 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-4 transition-colors duration-300 group-hover:text-slate-800">
                    {service.title}
                  </h3>

                  {/* Service Points - flex-1 to push content to fill space */}
                  <ul className="space-y-3 flex-1">
                    {service.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                        <span className="flex-shrink-0 mt-0.5">
                          <FiCheck className="h-4 w-4 text-emerald-600" />
                        </span>
                        <span className="transition-colors duration-300 group-hover:text-slate-700">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full pointer-events-none" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.5} className="text-center mt-12">
          <button
            type="button"
            onClick={() => navigateTo('/contact')}
            className="group inline-flex items-center gap-2.5 rounded-full bg-slate-900 px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-[0_12px_40px_rgba(15,23,42,0.25)] hover:-translate-y-1"
          >
            <span>Get Started with Our Services</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-1">
              <FiArrowRight className="h-3 w-3" />
            </span>
          </button>
        </Reveal>
        
        </div>
        {/* End Content Container */}
      </div>

      {/* HOW OUR PROCESS WORKS */}
      <div className="relative z-10 py-12">
        
        {/* Background Layer - service2.png full width coverage (same as Services Overview) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          
          {/* Service2 Image - Full coverage, no white sides */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={service2} 
              alt="" 
              className="w-full h-full"
              style={{
                opacity: 0.65,
                filter: 'brightness(1.08)',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
            
            {/* Light gradient overlay - minimal to keep image visible */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#f5f3ff]/50 via-transparent to-[#eef4ff]/40" />
            
            {/* Soft fade at top and bottom for seamless transitions */}
            <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#f5f3ff] via-[#f5f3ff]/90 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#eef4ff] via-[#eef4ff]/90 to-transparent" />
          </div>

          {/* Subtle ambient glow */}
          <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] opacity-10"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)'
            }} />
        </div>

        {/* Content Container */}
        <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="relative z-10 text-center mb-16">
          <Reveal>
            <span className="inline-block rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-700 mb-5 shadow-sm">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-700 mr-2"></span>
              How It Works
            </span>
            <h2 className="text-4xl font-extrabold text-slate-900 md:text-5xl mb-5">
              Your Path to Franchise Success
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              A proven step-by-step framework designed to help brands expand and investors discover the right opportunities with confidence.
            </p>
          </Reveal>
        </div>

        {/* Process Steps Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Connection Lines Between Cards - Desktop Only */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none">
            {/* Connection 1?2 */}
            <div className="absolute top-1/2 left-[calc(25%-1.5rem)] w-[3rem] h-px overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-emerald-400 to-transparent animate-connectionFlow" />
              <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400 animate-particleFlow1" />
            </div>
            
            {/* Connection 2?3 */}
            <div className="absolute top-1/2 left-[calc(50%-1.5rem)] w-[3rem] h-px overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-violet-400 to-transparent animate-connectionFlow" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-400 animate-particleFlow2" />
            </div>
            
            {/* Connection 3?4 */}
            <div className="absolute top-1/2 left-[calc(75%-1.5rem)] w-[3rem] h-px overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-400 via-orange-400 to-transparent animate-connectionFlow" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-violet-400 animate-particleFlow3" />
            </div>
          </div>
          
          {/* Step 1 */}
          <Reveal delay={0}>
            <div className="group relative bg-white/55 backdrop-blur-md rounded-2xl border border-white/60 p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(59,130,246,0.15)] hover:border-blue-300 overflow-hidden h-full flex flex-col">
              
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradientShift" />
              
              {/* Floating particles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-[20%] left-[15%] w-1 h-1 rounded-full bg-blue-400/40 animate-floatParticle1" />
                <div className="absolute top-[60%] right-[20%] w-1.5 h-1.5 rounded-full bg-indigo-400/30 animate-floatParticle2" />
                <div className="absolute bottom-[30%] left-[70%] w-1 h-1 rounded-full bg-blue-300/40 animate-floatParticle3" />
              </div>
              
              {/* Animated line background - flows on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                {/* Horizontal lines */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent animate-lineFlow" />
                <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent animate-lineFlow" style={{ animationDelay: '0.3s' }} />
                <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent animate-lineFlow" style={{ animationDelay: '0.6s' }} />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent animate-lineFlow" style={{ animationDelay: '0.9s' }} />
                
                {/* Vertical lines */}
                <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-blue-300 to-transparent animate-lineFlowVertical" />
                <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-300 to-transparent animate-lineFlowVertical" style={{ animationDelay: '0.3s' }} />
                <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-blue-300 to-transparent animate-lineFlowVertical" style={{ animationDelay: '0.6s' }} />
                <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-blue-300 to-transparent animate-lineFlowVertical" style={{ animationDelay: '0.9s' }} />
              </div>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-blue-400/10 via-transparent to-transparent blur-xl" />
              
              <div className="relative z-10 flex flex-col h-full">
                <StepBadge number="1" color="blue" />

                {/* Step Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Discovery & Consultation
                </h3>

                {/* Step Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  We understand your goals, budget, and vision to match you with the perfect franchise opportunities or expansion strategy.
                </p>

                {/* Features List */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <FiCheck className="h-3.5 w-3.5 text-blue-600 flex-shrink-0" />
                    <span>Free Consultation</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <FiTarget className="h-3.5 w-3.5 text-blue-600 flex-shrink-0" />
                    <span>Goal Mapping</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Step 2 */}
          <Reveal delay={0.1}>
            <div className="group relative bg-white/55 backdrop-blur-md rounded-2xl border border-white/60 p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(16,185,129,0.15)] hover:border-emerald-300 overflow-hidden h-full flex flex-col">
              
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradientShift" />
              
              {/* Floating particles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-[25%] left-[20%] w-1 h-1 rounded-full bg-emerald-400/40 animate-floatParticle1" />
                <div className="absolute top-[55%] right-[15%] w-1.5 h-1.5 rounded-full bg-teal-400/30 animate-floatParticle2" />
                <div className="absolute bottom-[35%] left-[65%] w-1 h-1 rounded-full bg-emerald-300/40 animate-floatParticle3" />
              </div>
              
              {/* Animated line background - flows on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                {/* Horizontal lines */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent animate-lineFlow" />
                <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent animate-lineFlow" style={{ animationDelay: '0.3s' }} />
                <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent animate-lineFlow" style={{ animationDelay: '0.6s' }} />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent animate-lineFlow" style={{ animationDelay: '0.9s' }} />
                
                {/* Vertical lines */}
                <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-emerald-300 to-transparent animate-lineFlowVertical" />
                <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-emerald-300 to-transparent animate-lineFlowVertical" style={{ animationDelay: '0.3s' }} />
                <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-emerald-300 to-transparent animate-lineFlowVertical" style={{ animationDelay: '0.6s' }} />
                <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-emerald-300 to-transparent animate-lineFlowVertical" style={{ animationDelay: '0.9s' }} />
              </div>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-emerald-400/10 via-transparent to-transparent blur-xl" />
              
              <div className="relative z-10 flex flex-col h-full">
                <StepBadge number="2" color="green" />

                {/* Step Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Verified Matching
                </h3>

                {/* Step Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Access our curated database of verified franchise opportunities with detailed business intelligence and performance data.
                </p>

                {/* Features List */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <FiCheckCircle className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Verified Brands</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <FiBarChart2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Data Insights</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Step 3 */}
          <Reveal delay={0.2}>
            <div className="group relative bg-white/55 backdrop-blur-md rounded-2xl border border-white/60 p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(139,92,246,0.15)] hover:border-violet-300 overflow-hidden h-full flex flex-col">
              
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-purple-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradientShift" />
              
              {/* Floating particles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-[30%] left-[25%] w-1 h-1 rounded-full bg-violet-400/40 animate-floatParticle1" />
                <div className="absolute top-[50%] right-[25%] w-1.5 h-1.5 rounded-full bg-purple-400/30 animate-floatParticle2" />
                <div className="absolute bottom-[40%] left-[60%] w-1 h-1 rounded-full bg-violet-300/40 animate-floatParticle3" />
              </div>
              
              {/* Animated line background - flows on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                {/* Horizontal lines */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent animate-lineFlow" />
                <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent animate-lineFlow" style={{ animationDelay: '0.3s' }} />
                <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent animate-lineFlow" style={{ animationDelay: '0.6s' }} />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent animate-lineFlow" style={{ animationDelay: '0.9s' }} />
                
                {/* Vertical lines */}
                <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-violet-300 to-transparent animate-lineFlowVertical" />
                <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-violet-300 to-transparent animate-lineFlowVertical" style={{ animationDelay: '0.3s' }} />
                <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-violet-300 to-transparent animate-lineFlowVertical" style={{ animationDelay: '0.6s' }} />
                <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-violet-300 to-transparent animate-lineFlowVertical" style={{ animationDelay: '0.9s' }} />
              </div>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-violet-400/10 via-transparent to-transparent blur-xl" />
              
              <div className="relative z-10 flex flex-col h-full">
                <StepBadge number="3" color="violet" />

                {/* Step Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Due Diligence Support
                </h3>

                {/* Step Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Get expert guidance through legal, financial, and operational due diligence to make informed investment decisions.
                </p>

                {/* Features List */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <FiFileText className="h-3.5 w-3.5 text-violet-600 flex-shrink-0" />
                    <span>Legal Review</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <FiDollarSign className="h-3.5 w-3.5 text-violet-600 flex-shrink-0" />
                    <span>Financial Analysis</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Step 4 */}
          <Reveal delay={0.3}>
            <div className="group relative bg-white/55 backdrop-blur-md rounded-2xl border border-white/60 p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(249,115,22,0.15)] hover:border-orange-300 overflow-hidden h-full flex flex-col">
              
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradientShift" />
              
              {/* Floating particles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-[35%] left-[30%] w-1 h-1 rounded-full bg-orange-400/40 animate-floatParticle1" />
                <div className="absolute top-[45%] right-[30%] w-1.5 h-1.5 rounded-full bg-amber-400/30 animate-floatParticle2" />
                <div className="absolute bottom-[45%] left-[55%] w-1 h-1 rounded-full bg-orange-300/40 animate-floatParticle3" />
              </div>
              
              {/* Animated line background - flows on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                {/* Horizontal lines */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent animate-lineFlow" />
                <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent animate-lineFlow" style={{ animationDelay: '0.3s' }} />
                <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent animate-lineFlow" style={{ animationDelay: '0.6s' }} />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent animate-lineFlow" style={{ animationDelay: '0.9s' }} />
                
                {/* Vertical lines */}
                <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-orange-300 to-transparent animate-lineFlowVertical" />
                <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-orange-300 to-transparent animate-lineFlowVertical" style={{ animationDelay: '0.3s' }} />
                <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-orange-300 to-transparent animate-lineFlowVertical" style={{ animationDelay: '0.6s' }} />
                <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-orange-300 to-transparent animate-lineFlowVertical" style={{ animationDelay: '0.9s' }} />
              </div>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-orange-400/10 via-transparent to-transparent blur-xl" />
              
              <div className="relative z-10 flex flex-col h-full">
                <StepBadge number="4" color="orange" />

                {/* Step Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Launch & Scale
                </h3>

                {/* Step Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Ongoing support for setup, training, marketing, and growth strategies to ensure your franchise success from day one.
                </p>

                {/* Features List */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <FiTrendingUp className="h-3.5 w-3.5 text-orange-600 flex-shrink-0" />
                    <span>Growth Support</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <FiUsers className="h-3.5 w-3.5 text-orange-600 flex-shrink-0" />
                    <span>Training</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.4} className="text-center mt-12">
          <button
            type="button"
            onClick={() => navigateTo('/contact')}
            className="group inline-flex items-center gap-2.5 rounded-full bg-slate-900 px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-[0_12px_40px_rgba(15,23,42,0.25)] hover:-translate-y-1"
          >
            <span>Start Your Expansion Journey</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-1">
              <FiArrowRight className="h-3 w-3" />
            </span>
          </button>
        </Reveal>
        
        </div>
        {/* End Content Container */}
      </div>

      {/* SERVICES FOR BRANDS */}
      <div className="relative z-10 overflow-hidden py-12">
        
        {/* Background Layer - service2.png full width coverage */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          
          {/* Service2 Image - Full coverage */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={service2} 
              alt="" 
              className="w-full h-full"
              style={{
                opacity: 0.65,
                filter: 'brightness(1.08)',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
            
            {/* Light gradient overlay - minimal to keep image visible */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#f5f3ff]/50 via-transparent to-[#eef4ff]/40" />
            
            {/* Soft fade at top and bottom for seamless transitions */}
            <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#f5f3ff] via-[#f5f3ff]/90 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#eef4ff] via-[#eef4ff]/90 to-transparent" />
          </div>

          {/* Subtle ambient glow */}
          <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] opacity-10"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)'
            }} />
        </div>

        <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* RIGHT: Content */}
            <div>
              <Reveal>
                <span className="inline-block rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-700 mb-6 shadow-sm">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-700 mr-2"></span>
                  For Brands
                </span>
                <h2 className="text-4xl font-extrabold text-slate-900 md:text-5xl mb-6 leading-tight">
                  Franchise Services for Brands Looking to Expand
                </h2>
              </Reveal>
              
              <Reveal delay={0.1}>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  We help businesses transform into scalable franchise models with the right structure, strategy, and investor network.
                </p>
              </Reveal>

              {/* Key Benefits - Simple checkmark list */}
              <div className="space-y-4 mb-10">
                {[
                  'Faster franchise expansion',
                  'Structured onboarding process',
                  'Investor acquisition support',
                  'Brand visibility improvement',
                  'Expansion planning & execution'
                ].map((benefit, index) => (
                  <Reveal key={benefit} delay={0.15 + index * 0.05}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600">
                        <FiCheck className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-base text-slate-700">
                        {benefit}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* CTA */}
              <Reveal delay={0.4}>
                <button
                  type="button"
                  onClick={() => navigateTo('/for-brand-owners')}
                  className="group relative overflow-hidden rounded-xl bg-slate-900 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center gap-2.5">
                    Grow Your Brand with iFranchise
                    <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </button>
              </Reveal>
            </div>

            {/* RIGHT: Premium Franchise Expansion Dashboard */}
            <Reveal delay={0.2}>
              <div className="relative max-w-md mx-auto lg:mx-0">
                
                {/* Main dashboard container */}
                <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/50 backdrop-blur-xl p-5 shadow-2xl" style={{ boxShadow: '0 8px 40px rgba(99,102,241,0.12), 0 2px 8px rgba(0,0,0,0.06)' }}>
                  
                  {/* Animated glow effects */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl animate-pulse-slow" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

                  {/* Dashboard Content */}
                  <div className="relative space-y-3">
                    
                    {/* Header - Brand Expansion Control Center */}
                    <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 p-3 shadow-lg">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                          <FiTrendingUp className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Brand Expansion Hub</div>
                          <div className="text-[10px] text-slate-400">Real-time Analytics</div>
                        </div>
                      </div>
                      
                      {/* Live Pill with Breathing Animation */}
                      <div className="relative">
                        <div className="flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-2.5 py-1 animate-pulse">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping absolute left-2" />
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-wider">Live</span>
                        </div>
                      </div>
                    </div>

                    {/* Growth Metrics Cards - Real Data (No Floating) */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                        <FiUsers className="h-3.5 w-3.5 text-white/80 mb-1" />
                        <div className="text-lg font-bold text-white">24</div>
                        <div className="text-[9px] text-white/70">Locations</div>
                      </div>

                      <div className="rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 p-2.5 shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                        <FiTarget className="h-3.5 w-3.5 text-white/80 mb-1" />
                        <div className="text-lg font-bold text-white">8</div>
                        <div className="text-[9px] text-white/70">Markets</div>
                      </div>

                      <div className="rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 p-2.5 shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                        <FiDollarSign className="h-3.5 w-3.5 text-white/80 mb-1" />
                        <div className="text-lg font-bold text-white">?6.8M</div>
                        <div className="text-[9px] text-white/70">Revenue</div>
                      </div>
                    </div>

                    {/* Interactive City Expansion Map with Real Embedded Map */}
                    <div className="rounded-lg bg-white/70 backdrop-blur-sm p-3 shadow-lg border border-slate-200/60">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <FiMap className="h-3 w-3 text-indigo-600" />
                          <div>
                            <span className="text-xs font-bold text-slate-800 block">Franchise Locations</span>
                            <span className="text-[8px] text-slate-500">Active expansion cities</span>
                          </div>
                        </div>
                        
                        {/* City Dropdown */}
                        <select className="text-[10px] font-medium text-slate-600 bg-white border border-slate-200 rounded px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer">
                          <option value="">View All (8)</option>
                          <option value="mumbai">Mumbai - 12 locations</option>
                          <option value="delhi">Delhi - 10 locations</option>
                          <option value="bengaluru">Bengaluru - 9 locations</option>
                          <option value="hyderabad">Hyderabad - 8 locations</option>
                          <option value="pune">Pune - 7 locations</option>
                          <option value="chennai">Chennai - 6 locations</option>
                          <option value="kolkata">Kolkata - 5 locations</option>
                          <option value="ahmedabad">Ahmedabad - 4 locations</option>
                        </select>
                      </div>
                      
                      {/* Real Google Maps Embed - Completely Clean (No Text, No Lines) */}
                      <div className="relative h-24 rounded-lg overflow-hidden border border-slate-200/40">
                        
                        <div className="map-container w-full h-full relative">
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7500000!2d82.8!3d22.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1703123456789!5m2!1sen!2sin&disableDefaultUI=1&zoomControl=1&scrollwheel=1&gestureHandling=cooperative"
                            width="100%"
                            height="140%"
                            style={{ border: 0, display: 'block', marginTop: '-4px', marginBottom: '-20px' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale-[30%] opacity-90"
                            title="India Expansion Map"
                          />
                          
                          {/* Seamless overlay to hide all Google text - matches map colors */}
                          <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none z-10" 
                               style={{
                                 background: 'linear-gradient(to top, rgba(173, 216, 230, 0.9) 0%, rgba(173, 216, 230, 0.7) 40%, transparent 100%)'
                               }} 
                          />
                        </div>
                        
                        {/* Global CSS to hide ALL Google Maps UI elements */}
                        <style dangerouslySetInnerHTML={{__html: `
                          .map-container iframe {
                            pointer-events: auto !important;
                          }
                          .gm-style-cc,
                          .gm-style a,
                          .gm-style button,
                          .gm-style div[style*="cursor: pointer"],
                          .gmnoprint,
                          .gm-bundled-control,
                          .gm-svpc,
                          .gm-control-active,
                          .gm-style-mtc,
                          .gm-fullscreen-control,
                          a[href^="https://maps.google.com"],
                          a[href^="https://www.google.com/maps"],
                          a[title*="Google"],
                          a[title*="Terms"],
                          a[title*="Report"],
                          div[style*="font-family: Roboto"],
                          div[style*="color: rgb(0, 0, 0)"],
                          button[draggable="false"],
                          div[draggable="false"][style*="cursor"] {
                            display: none !important;
                            opacity: 0 !important;
                            visibility: hidden !important;
                            width: 0 !important;
                            height: 0 !important;
                            position: absolute !important;
                            left: -9999px !important;
                          }
                        `}} />
                        
                        {/* Overlay with city markers - All within India */}
                        <div className="absolute inset-0 pointer-events-none z-20">
                          {[
                            { city: 'Mumbai', top: '60%', left: '32%', count: 12 },
                            { city: 'Delhi', top: '28%', left: '48%', count: 10 },
                            { city: 'Bengaluru', top: '72%', left: '50%', count: 9 },
                            { city: 'Hyderabad', top: '64%', left: '54%', count: 8 },
                            { city: 'Pune', top: '64%', left: '40%', count: 7 },
                            { city: 'Chennai', top: '76%', left: '56%', count: 6 },
                            { city: 'Kolkata', top: '50%', left: '70%', count: 5 },
                            { city: 'Ahmedabad', top: '50%', left: '36%', count: 4 },
                          ].map((location, i) => (
                            <div
                              key={location.city}
                              className="absolute group cursor-pointer pointer-events-auto"
                              style={{ top: location.top, left: location.left }}
                            >
                              {/* Pin */}
                              <div className="relative">
                                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 shadow-lg border-2 border-white transition-transform duration-300 group-hover:scale-150" />
                                {/* Pulse ring */}
                                <div className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-40" />
                                
                                {/* Tooltip on hover */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                  <div className="bg-slate-900 text-white text-[8px] font-medium px-1.5 py-0.5 rounded shadow-lg">
                                    <div className="font-bold">{location.city}</div>
                                    <div className="text-[7px] text-emerald-300">{location.count} franchise locations</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Live Growth Chart - Properly Aligned Bars */}
                    <div className="rounded-lg bg-white border border-slate-200/60 p-3 shadow-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5">
                          <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <FiBarChart2 className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-xs font-bold text-slate-900">Growth Trajectory</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping absolute" />
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          <span className="text-[10px] font-semibold text-emerald-600">+92% YoY</span>
                        </div>
                      </div>
                      
                      {/* Chart with proper alignment */}
                      <div className="relative">
                        {/* Grid lines */}
                        <div className="absolute left-8 right-0 top-0 bottom-0 flex flex-col justify-between">
                          {[100, 75, 50, 25, 0].map((val, i) => (
                            <div key={i} className="relative h-px bg-slate-200">
                              <span className="absolute -left-8 -top-2 text-[7px] text-slate-400 font-medium w-6 text-right">{val}%</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Bar chart - Real Market Intelligence Data (Quarterly Growth) */}
                        <div className="relative flex items-end justify-between gap-1.5 h-20 pl-8">
                          {[
                            { value: 38, label: 'Q1' },
                            { value: 45, label: 'Q2' },
                            { value: 52, label: 'Q3' },
                            { value: 61, label: 'Q4' },
                            { value: 58, label: 'Q1' },
                            { value: 70, label: 'Q2' },
                            { value: 78, label: 'Q3' },
                            { value: 85, label: 'Q4' },
                            { value: 92, label: 'Q1' }
                          ].map((item, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center h-full justify-end">
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${item.value}%` }}
                                transition={{ 
                                  duration: 1.2, 
                                  delay: 0.5 + i * 0.1, 
                                  ease: [0.22, 1, 0.36, 1]
                                }}
                                className="w-full rounded-t-lg bg-gradient-to-t from-indigo-600 to-purple-500 shadow-lg relative overflow-hidden cursor-pointer transition-all duration-300 hover:from-indigo-700 hover:to-purple-600 flex flex-col items-center justify-between py-1"
                              >
                                {/* Shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent" />
                                
                                {/* Value inside bar for taller bars */}
                                {item.value >= 55 && (
                                  <div className="relative mt-auto mb-1">
                                    <span className="text-[7px] font-bold text-white drop-shadow-sm">
                                      {item.value}%
                                    </span>
                                  </div>
                                )}
                              </motion.div>
                              
                              {/* Month label below */}
                              <span className="text-[8px] text-slate-500 font-medium mt-1.5">{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Top Franchise Location Cards - Real Cities */}
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { city: 'Mumbai', status: '12 Locations', progress: 85, color: 'emerald', label: 'Active' },
                        { city: 'Bengaluru', status: '9 Locations', progress: 72, color: 'blue', label: 'Expanding' }
                      ].map((location, i) => (
                        <div
                          key={location.city}
                          className="rounded-lg bg-white/80 backdrop-blur-sm p-2 shadow-md border border-slate-200/60"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5">
                              <FiMap className="h-2.5 w-2.5 text-slate-600" />
                              <span className="text-[10px] font-bold text-slate-800">{location.city}</span>
                            </div>
                            <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-${location.color}-50 border border-${location.color}-200`}>
                              <div className={`h-1 w-1 rounded-full bg-${location.color}-500 animate-pulse`} />
                              <span className={`text-[7px] font-semibold text-${location.color}-700`}>{location.label}</span>
                            </div>
                          </div>
                          <div className="text-[9px] text-slate-600 font-medium mb-1.5">{location.status}</div>
                          <div className="h-1 rounded-full bg-slate-200 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${location.progress}%` }}
                              transition={{ duration: 1.5, delay: 1 + i * 0.3, ease: [0.22, 1, 0.36, 1] }}
                              className={`h-full bg-${location.color}-500`}
                            />
                          </div>
                          <div className="text-[7px] text-slate-400 mt-0.5">{location.progress}% market coverage</div>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>

              </div>
            </Reveal>

          </div>

        </div>
      </div>

      {/* SERVICES FOR INVESTORS */}
      <div className="relative z-10 overflow-hidden py-12">
        
        {/* Background Layer - service2.png full width coverage */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          
          {/* Service2 Image - Full coverage */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={service2} 
              alt="" 
              className="w-full h-full"
              style={{
                opacity: 0.65,
                filter: 'brightness(1.08)',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
            
            {/* Light gradient overlay - minimal to keep image visible */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#eef4ff]/50 via-transparent to-[#f5f3ff]/40" />
            
            {/* Soft fade at top and bottom for seamless transitions */}
            <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#eef4ff] via-[#eef4ff]/90 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#f5f3ff] via-[#f5f3ff]/90 to-transparent" />
          </div>

          {/* Subtle ambient glow */}
          <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] opacity-10"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)'
            }} />
        </div>

        <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* LEFT: Premium Investor Intelligence Dashboard */}
            <div className="order-2 lg:order-1">
              <div className="relative max-w-md mx-auto lg:mx-0">
                
                {/* Main dashboard container */}
                <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/50 backdrop-blur-xl p-4 shadow-2xl" style={{ boxShadow: '0 8px 40px rgba(139,92,246,0.12), 0 2px 8px rgba(0,0,0,0.06)' }}>

                  {/* Dashboard Content */}
                  <div className="relative space-y-2.5">
                    
                    {/* Header - Opportunity Discovery with Live Pill */}
                    <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-violet-800 to-purple-900 p-2.5 shadow-lg">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                          <FiTarget className="h-3.5 w-3.5 text-white" />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-white">Opportunity Discovery</div>
                          <div className="text-[9px] text-violet-300">24 Verified Franchises</div>
                        </div>
                      </div>
                      
                      {/* Live Pill with Breathing Animation */}
                      <div className="relative flex items-center">
                        <div className="absolute inset-0 bg-emerald-400/30 rounded-full animate-breathePill" />
                        <div className="relative flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-2 py-0.5">
                          <div className="relative flex items-center justify-center">
                            <div className="absolute h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          </div>
                          <span className="text-[8px] font-bold text-emerald-300 uppercase tracking-wider">Live</span>
                        </div>
                      </div>
                    </div>

                    {/* Filtered Dashboard Content */}
                    <InvestorDashboardContent navigateTo={navigateTo} />

                  </div>

                </div>

              </div>
            </div>

            {/* RIGHT: Content */}
            <div className="order-1 lg:order-2">
              <div>
                <span className="inline-block rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-700 mb-6 shadow-sm">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-700 mr-2"></span>
                  For Investors
                </span>
                <h2 className="text-4xl font-extrabold text-slate-900 md:text-5xl mb-6 leading-tight">
                  Helping Investors<br />
                  Discover the Right<br />
                  Franchise Opportunities
                </h2>
              </div>
              
              <div>
                <p className="text-base text-slate-600 leading-relaxed mb-8">
                  We help investors explore verified franchise opportunities across industries with transparent business information and structured support.
                </p>
              </div>

              {/* Key Benefits - Simple checkmark list */}
              <div className="space-y-4 mb-10">
                {[
                  'Verified franchise opportunities',
                  'Investment-focused discovery',
                  'Business model transparency',
                  'Industry-based opportunity matching',
                  'Investor onboarding support'
                ].map((benefit, index) => (
                  <div key={benefit}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600">
                        <FiCheck className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-base text-slate-700">
                        {benefit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div>
                <button
                  type="button"
                  onClick={() => navigateTo('/franchise-opportunities')}
                  className="group relative overflow-hidden rounded-xl bg-slate-900 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center gap-2.5">
                    Explore Franchise Opportunities
                    <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* INDUSTRIES WE SUPPORT */}
      <div className="relative z-10 overflow-hidden py-12">
        
        {/* Background Layer - serviceHero.png full width coverage */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          
          {/* ServiceHero Image - Full coverage */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={serviceHero} 
              alt="" 
              className="w-full h-full"
              style={{
                opacity: 0.65,
                filter: 'brightness(1.08)',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
            
            {/* Light gradient overlay - minimal to keep image visible */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#eef4ff]/50 via-transparent to-[#f5f3ff]/40" />
            
            {/* Soft fade at top and bottom for seamless transitions */}
            <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#eef4ff] via-[#eef4ff]/90 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#f5f3ff] via-[#f5f3ff]/90 to-transparent" />
          </div>

          {/* Subtle ambient glow */}
          <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] opacity-10"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)'
            }} />
        </div>

        <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          

          {/* Section Header */}
          <div className="text-center mb-16">
            <Reveal>
              <span className="inline-block rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-700 mb-5 shadow-sm">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-700 mr-2"></span>
                Industries
              </span>
              <h2 className="text-4xl font-extrabold text-slate-900 md:text-5xl mb-5">
                Industries We Help Scale Through Franchising
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto max-w-2xl text-base text-slate-600 leading-relaxed">
                Our franchise services are designed to support businesses across industries looking to expand through scalable franchise models.
              </p>
            </Reveal>
          </div>

          {/* Premium Industry Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {[
              {
                title: 'Retail & Jewelry',
                image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
                gradient: 'from-blue-500 to-cyan-600',
                accentColor: '#3b82f6',
                description: 'Scale your retail brand with proven franchise models',
                delay: 0
              },
              {
                title: 'Food & Beverage',
                image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
                gradient: 'from-emerald-500 to-teal-600',
                accentColor: '#10b981',
                description: 'Expand your F&B concept across multiple locations',
                delay: 0.05
              },
              {
                title: 'Healthcare & Wellness',
                image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
                gradient: 'from-rose-500 to-pink-600',
                accentColor: '#f43f5e',
                description: 'Grow your wellness business with franchise support',
                delay: 0.1
              },
              {
                title: 'Education & Training',
                image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
                gradient: 'from-violet-500 to-purple-600',
                accentColor: '#8b5cf6',
                description: 'Build an education empire through franchising',
                delay: 0.15
              },
              {
                title: 'Beauty & Lifestyle',
                image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
                gradient: 'from-orange-500 to-amber-600',
                accentColor: '#f97316',
                description: 'Transform beauty concepts into franchise networks',
                delay: 0.2
              },
              {
                title: 'Logistics & Infrastructure',
                image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80',
                gradient: 'from-indigo-500 to-blue-600',
                accentColor: '#6366f1',
                description: 'Scale logistics operations with franchise models',
                delay: 0.25
              }
            ].map((industry, index) => (
              <Reveal key={industry.title} delay={industry.delay}>
                <div className="group relative h-full">
                  {/* Main Card */}
                  <div className="relative h-full overflow-hidden rounded-2xl bg-white border border-slate-200/60 transition-all duration-500 hover:border-slate-300 hover:shadow-[0_20px_60px_rgba(15,23,42,0.15)] hover:-translate-y-2">
                    
                    {/* Image Container */}
                    <div className="relative h-48 overflow-hidden">
                      {/* Image */}
                      <img 
                        src={industry.image} 
                        alt={industry.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                      
                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
                      </div>
                      
                      {/* Top Accent Bar */}
                      <div 
                        className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `linear-gradient(to right, ${industry.accentColor}, transparent)` }}
                      />
                    </div>

                    {/* Content */}
                    <div className="relative p-6">
                      {/* Accent Line */}
                      <div 
                        className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-all duration-500"
                        style={{ background: `linear-gradient(to right, ${industry.accentColor}, transparent)` }}
                      />
                      
                      {/* Title */}
                      <h3 className="text-lg font-bold text-slate-900 mb-2 transition-colors duration-300 group-hover:text-slate-700">
                        {industry.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">
                        {industry.description}
                      </p>
                      
                      {/* CTA Button */}
                      <button 
                        className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                        style={{ color: industry.accentColor }}
                      >
                        <span>Explore Opportunities</span>
                        <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>

                    {/* Bottom Glow on Hover */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl"
                      style={{ background: `linear-gradient(to top, ${industry.accentColor}15, transparent)` }}
                    />
                  </div>

                  {/* Floating Background Glow */}
                  <div 
                    className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                    style={{ background: `linear-gradient(135deg, ${industry.accentColor}20, transparent)` }}
                  />
                </div>
              </Reveal>
            ))}

          </div>

          {/* Bottom CTA */}
          <Reveal delay={0.6} className="text-center mt-16">
            <p className="text-sm text-slate-500 mb-4">
              Don't see your industry? We work with businesses across all sectors.
            </p>
            <button
              type="button"
              onClick={() => navigateTo('/contact')}
              className="group inline-flex items-center gap-2.5 rounded-xl bg-slate-900 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <span>Discuss Your Industry</span>
              <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </Reveal>

        </div>
      </div>

      {/* BENEFITS – More than just a franchise platform */}
      <div className="relative z-10 w-full py-12 overflow-hidden">
        
        {/* Background Layer - service5.png full width coverage */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          
          {/* Service5 Image - Full coverage */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={service5} 
              alt="" 
              className="w-full h-full"
              style={{
                opacity: 0.65,
                filter: 'brightness(1.08)',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
            
            {/* Light gradient overlay - minimal to keep image visible */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#eef4ff]/50 via-transparent to-[#f5f3ff]/40" />
            
            {/* Soft fade at top and bottom for seamless transitions */}
            <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#eef4ff] via-[#eef4ff]/90 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#f5f3ff] via-[#f5f3ff]/90 to-transparent" />
          </div>

          {/* Subtle ambient glow */}
          <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] opacity-10"
            style={{
              background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)'
            }} />
        </div>
        
        <div className="relative z-10 mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[680px] text-center mb-14">
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="text-xs font-bold uppercase tracking-[0.18em] text-slate-700 mb-5"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-700 mr-2"></span>
              Benefits
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.05 }}
              className="text-4xl font-extrabold tracking-tight text-[#0b0f19] sm:text-5xl mb-6"
            >
              More than just a franchise platform
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.1 }}
              className="text-base leading-relaxed text-slate-500 sm:text-lg"
            >
              iFranchise helps you discover verified opportunities, make confident investment decisions, and scale smarter with real data and insights.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.15 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <button type="button" onClick={() => navigateTo('/contact')}
                className="rounded-full bg-[#0B1220] px-8 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(15,23,42,0.22)]">
                Book a Call
              </button>
              <button type="button" onClick={() => navigateTo('/franchise-opportunities')}
                className="rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-semibold text-[#0b0f19] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(15,23,42,0.10)]">
                View More
              </button>
            </motion.div>
          </div>

          {/* Desktop — Premium Strategic Ecosystem Layout */}
          <div className="relative mt-16 hidden lg:block" style={{ height: '480px' }}>

            {/* Animated gradient background */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/20 to-violet-50/20 rounded-3xl" />
              <div className="absolute inset-0 opacity-[0.03] rounded-3xl" style={{
                backgroundImage: `linear-gradient(rgba(15,23,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,1) 1px, transparent 1px)`,
                backgroundSize: '48px 48px'
              }} />
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
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:hidden">
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
                className="rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-[0_4px_16px_rgba(15,23,42,0.06)]"
              >
                <div className="flex items-center gap-3">
                  <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-${item.color}-50`}>
                    <item.Icon className={`h-4 w-4 text-${item.color}-600`} />
                  </span>
                  <p className="text-sm font-medium text-slate-700">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* WHY CHOOSE iFRANCHISE */}
      <div className="relative z-10 w-full pt-8 pb-12 overflow-hidden">
        
        {/* Background Layer - service2.png full width coverage */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          
          {/* Service2 Image - Full coverage */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={service2} 
              alt="" 
              className="w-full h-full"
              style={{
                opacity: 0.65,
                filter: 'brightness(1.08)',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
            
            {/* Light gradient overlay - minimal to keep image visible */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#f5f3ff]/50 via-transparent to-[#eef4ff]/40" />
            
            {/* Soft fade at top and bottom for seamless transitions */}
            <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#f5f3ff] via-[#f5f3ff]/90 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#eef4ff] via-[#eef4ff]/90 to-transparent" />
          </div>

          {/* Subtle ambient glow */}
          <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] opacity-10"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)'
            }} />
        </div>

        <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <Reveal>
              <div className="inline-flex items-center justify-center mb-6">
                <span className="inline-block rounded-full border border-slate-200 bg-white px-5 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-700 shadow-sm">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-700 mr-2"></span>
                  Why iFranchise
                </span>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 md:text-5xl mb-5 leading-tight">
                Why Businesses Choose iFranchise
              </h2>
            </Reveal>
          </div>

          {/* 4-Column Premium Enterprise Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
            
            {/* Card 1: End-to-End Support */}
            <Reveal delay={0}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/55 backdrop-blur-md p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_24px_60px_rgba(99,102,241,0.15)] h-full flex flex-col">
                
                {/* Soft glow border on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" style={{ boxShadow: '0 0 0 1px rgba(99,102,241,0.3), inset 0 0 20px rgba(99,102,241,0.08)' }} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Animated Icon */}
                  <div className="mb-6">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_12px_30px_rgba(99,102,241,0.3)]">
                      <FiLayers className="h-7 w-7 text-white transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-4 transition-colors duration-300 group-hover:text-indigo-700">
                    End-to-End Support
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed transition-colors duration-300 group-hover:text-slate-700">
                    From onboarding to investor acquisition, we manage every stage of franchise growth.
                  </p>
                </div>

                {/* Hover shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full pointer-events-none" />
              </div>
            </Reveal>

            {/* Card 2: Expansion-Focused Strategy */}
            <Reveal delay={0.1}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/55 backdrop-blur-md p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_24px_60px_rgba(16,185,129,0.15)] h-full flex flex-col">
                
                {/* Soft glow border on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" style={{ boxShadow: '0 0 0 1px rgba(16,185,129,0.3), inset 0 0 20px rgba(16,185,129,0.08)' }} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Animated Icon */}
                  <div className="mb-6">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_12px_30px_rgba(16,185,129,0.3)]">
                      <FiTrendingUp className="h-7 w-7 text-white transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-4 transition-colors duration-300 group-hover:text-emerald-700">
                    Expansion-Focused Strategy
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed transition-colors duration-300 group-hover:text-slate-700">
                    Our approach is built around scalable business expansion and market reach.
                  </p>
                </div>

                {/* Hover shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full pointer-events-none" />
              </div>
            </Reveal>

            {/* Card 3: Investor Network */}
            <Reveal delay={0.2}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/55 backdrop-blur-md p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_24px_60px_rgba(139,92,246,0.15)] h-full flex flex-col">
                
                {/* Soft glow border on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" style={{ boxShadow: '0 0 0 1px rgba(139,92,246,0.3), inset 0 0 20px rgba(139,92,246,0.08)' }} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Animated Icon */}
                  <div className="mb-6">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_12px_30px_rgba(139,92,246,0.3)]">
                      <FiUsers className="h-7 w-7 text-white transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-4 transition-colors duration-300 group-hover:text-violet-700">
                    Investor Network
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed transition-colors duration-300 group-hover:text-slate-700">
                    Access investors actively searching for franchise business opportunities.
                  </p>
                </div>

                {/* Hover shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full pointer-events-none" />
              </div>
            </Reveal>

            {/* Card 4: Structured Franchise Ecosystem */}
            <Reveal delay={0.3}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/55 backdrop-blur-md p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_24px_60px_rgba(249,115,22,0.15)] h-full flex flex-col">
                
                {/* Soft glow border on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" style={{ boxShadow: '0 0 0 1px rgba(249,115,22,0.3), inset 0 0 20px rgba(249,115,22,0.08)' }} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Animated Icon */}
                  <div className="mb-6">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_12px_30px_rgba(249,115,22,0.3)]">
                      <FiShield className="h-7 w-7 text-white transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-4 transition-colors duration-300 group-hover:text-orange-700">
                    Structured Franchise Ecosystem
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed transition-colors duration-300 group-hover:text-slate-700">
                    Clear processes, transparent communication, and growth-focused execution.
                  </p>
                </div>

                {/* Hover shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full pointer-events-none" />
              </div>
            </Reveal>

          </div>

        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="relative z-10 w-full py-12 overflow-hidden">
        
        {/* Background Layer - service2.png full width coverage */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          
          {/* Service2 Image - Full coverage */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={service2} 
              alt="" 
              className="w-full h-full"
              style={{
                opacity: 0.65,
                filter: 'brightness(1.08)',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
            
            {/* Light gradient overlay - minimal to keep image visible */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#eef4ff]/50 via-transparent to-[#f5f3ff]/40" />
            
            {/* Soft fade at top and bottom for seamless transitions */}
            <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#eef4ff] via-[#eef4ff]/90 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#f5f3ff] via-[#f5f3ff]/90 to-transparent" />
          </div>

          {/* Subtle ambient glow */}
          <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] opacity-10"
            style={{
              background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)'
            }} />
        </div>

        <div className="relative z-10 mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <Reveal>
              <div className="inline-flex items-center justify-center mb-6">
                <span className="inline-block rounded-full border border-slate-200 bg-white px-5 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-700 shadow-sm">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-700 mr-2"></span>
                  FAQ
                </span>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 md:text-5xl mb-5 leading-tight">
                Frequently Asked Questions
              </h2>
            </Reveal>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                index={index}
              />
            ))}
          </div>

        </div>
      </div>


    </div>
  );
}
