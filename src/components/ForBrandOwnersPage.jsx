import { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import BrandsSection from './sections/BrandsSection';
import IndustriesSection from './sections/IndustriesSection';
import WhyChooseSection from './sections/WhyChooseSection';
import CaseStudiesSection from './sections/CaseStudiesSection';
import BrandApplicationForm from './sections/BrandApplicationForm';
import FAQSection from './sections/FAQSection';

// â”€â”€ Count-up hook â€” runs once on mount, number always visible after â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
      else { setCount(target); done.current = true; }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);
  return count;
}
import {
  franchiseOpportunities,
  getTotalCities,
  getTotalMarkets,
  getTotalRevenuePotential,
  formatRevenue,
  getAverageROI,
  getTopOpportunitiesByROI,
  getTopCities,
  calculateGrowthMetrics,
} from '../data/franchiseData';

// â”€â”€ Inline SVG icons â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const IcoUsers   = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4.13a4 4 0 11-8 0 4 4 0 018 0zm6 0a3 3 0 11-6 0 3 3 0 016 0z"/></svg>;
const IcoBar     = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>;
const IcoTrend   = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>;
const IcoShield  = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>;
const IcoArrow   = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12"/></svg>;
const IcoChevron = () => <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>;
const IcoPin     = () => <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>;
const IcoCheck   = () => <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>;

const VALUE_PROPS = [
  { icon: <IcoUsers />,  label: 'Investor Access'       },
  { icon: <IcoBar />,    label: 'Scalable Systems'       },
  { icon: <IcoTrend />,  label: 'Growth Intelligence'    },
  { icon: <IcoShield />, label: 'Structured Onboarding'  },
];

// city dot positions inside the 110px-tall map panel
const DOT_POS = [
  { x: '36%', y: '55%' }, // Mumbai
  { x: '50%', y: '18%' }, // Delhi
  { x: '54%', y: '68%' }, // Bengaluru
  { x: '60%', y: '56%' }, // Hyderabad
  { x: '62%', y: '78%' }, // Chennai
  { x: '43%', y: '60%' }, // Pune
];

// â”€â”€ Fallback images by category â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const FALLBACKS = {
  'Food & Beverage': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=120&q=80',
  'Health & Wellness': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=120&q=80',
  'Home Services': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=120&q=80',
  'Education': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=120&q=80',
  'Technology': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=120&q=80',
  'Retail': 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=120&q=80',
  'Entertainment': 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=120&q=80',
};
const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=120&q=80';

// â”€â”€ Opportunity image with fallback â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function OppImage({ src, alt, category }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [tried, setTried] = useState(false);
  return (
    <img
      src={imgSrc}
      alt={alt}
      className="w-8 h-8 rounded-md object-cover border border-slate-200 shrink-0 bg-slate-100"
      onError={() => {
        if (!tried) {
          setTried(true);
          setImgSrc(FALLBACKS[category] ?? DEFAULT_FALLBACK);
        }
      }}
    />
  );
}

// â”€â”€ Metric card â€” number always visible, count-up on mount only â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function MetricCard({ metric, active, onClick }) {
  const counted = useCountUp(metric.isNum ? metric.raw : 0, 1200);

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={`relative text-left px-3 py-2.5 rounded-xl border overflow-hidden transition-colors duration-300 ${
        active
          ? 'border-violet-300 bg-gradient-to-br from-violet-50 to-indigo-50/60'
          : 'border-slate-200 bg-white hover:border-violet-200'
      }`}
    >
      {/* sliding highlight bar â€” top edge */}
      <motion.div
        initial={false}
        animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'left' }}
        className="absolute top-0 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
      />

      {/* soft glow behind value when active */}
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-br from-violet-100/40 to-indigo-100/20 pointer-events-none rounded-xl"
        />
      )}

      {/* label */}
      <p className={`relative text-[0.6rem] font-semibold uppercase tracking-wider mb-1 transition-colors duration-300 ${
        active ? 'text-violet-500' : 'text-slate-400'
      }`}>
        {metric.label}
      </p>

      {/* value â€” always visible */}
      <p className={`relative text-[1.05rem] font-extrabold leading-none tabular-nums transition-colors duration-300 ${
        active ? 'text-violet-700' : 'text-slate-800'
      }`}>
        {metric.isNum
          ? <>{counted}{metric.suffix}</>
          : metric.display
        }
      </p>
    </motion.button>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function ForBrandOwnersPage() {
  const [activeMetric, setActiveMetric] = useState(0);

  // live data
  const totalBrands = useMemo(() => franchiseOpportunities.length, []);
  const markets     = useMemo(() => getTotalMarkets(), []);
  const revenue     = useMemo(() => formatRevenue(getTotalRevenuePotential()), []);
  const growth      = useMemo(() => `${calculateGrowthMetrics().growthRate}%`, []);
  const topOpps     = useMemo(() => getTopOpportunitiesByROI(3), []);
  const topCities   = useMemo(() => getTopCities(6), []);
  const avgROI      = useMemo(() => getAverageROI(), []);
  const cityCount   = useMemo(() => getTotalCities(), []);
  const minInvest   = useMemo(() => {
    const min = franchiseOpportunities.reduce((m, o) => Math.min(m, o.minInvestment), Infinity);
    return formatRevenue(min);
  }, []);

  const METRICS = [
    { label: 'Total Brands',   raw: totalBrands, suffix: '+',  prefix: '',  isNum: true  },
    { label: 'Active Markets', raw: markets,     suffix: '+',  prefix: '',  isNum: true  },
    { label: 'Est. Revenue',   raw: null,        suffix: '',   prefix: '',  isNum: false, display: revenue  },
    { label: 'YoY Growth',     raw: null,        suffix: '',   prefix: '',  isNum: false, display: growth   },
  ];

  useEffect(() => {
    const t = setInterval(() => setActiveMetric(p => (p + 1) % 4), 3000);
    return () => clearInterval(t);
  }, []);

  const nav = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <main className="relative bg-white overflow-x-hidden">
      {/* â”€â”€ single continuous ambient background that spans the whole page â”€â”€ */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-violet-50/20 to-indigo-50/20" />
        <div className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-violet-200/20 blur-[120px]" />
        <div className="absolute -right-40 top-2/3 h-[500px] w-[500px] rounded-full bg-indigo-200/15 blur-[120px]" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.022]">
          <defs>
            <pattern id="page-grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#6366f1" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#page-grid)"/>
        </svg>
      </div>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          HERO â€” locked to viewport height, no scroll needed
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: 'calc(100vh - 80px)' }}
      >
        {/* â”€â”€ two-column layout, vertically centred, fills height â”€â”€ */}
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_430px] gap-10 xl:gap-14 items-center">

              {/* â”€â”€ LEFT â”€â”€ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-6"
              >
                {/* headline */}
                <div className="space-y-2.5">
                  <h1 className="text-4xl sm:text-5xl lg:text-[2.9rem] xl:text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900">
                    Scale Your Brand Into{' '}
                    <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                      India's Next
                    </span>
                    <br />Franchise Success Story
                  </h1>
                  <p className="text-[0.95rem] text-slate-500 leading-relaxed max-w-md">
                    Connect with qualified investors, access structured expansion systems, and grow with franchise intelligence built for ambitious brand owners.
                  </p>
                </div>

                {/* value props */}
                <div className="grid grid-cols-2 gap-2 max-w-xs">
                  {VALUE_PROPS.map((v, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200"
                    >
                      <span className="text-violet-600 shrink-0">{v.icon}</span>
                      <span className="text-[0.75rem] font-semibold text-slate-700">{v.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Single strategic CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <button
                    onClick={() => {
                      const el = document.getElementById('brand-application');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-slate-900 text-white text-sm font-bold hover:bg-violet-700 transition-all duration-300 shadow-lg hover:shadow-violet-200/50 overflow-hidden"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <span className="relative z-10">Apply to List Your Brand</span>
                    <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 group-hover:translate-x-0.5">
                      <IcoArrow />
                    </span>
                  </button>
                </motion.div>
              </motion.div>

              {/* â”€â”€ RIGHT â€” compact dashboard â”€â”€ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">

                  {/* header */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200">
                    <div>
                      <p className="text-[0.72rem] font-bold text-slate-800 tracking-wide">Expansion Intelligence</p>
                      <p className="text-[0.62rem] text-slate-400">Live franchise ecosystem data</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"/>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"/>
                      </span>
                      <span className="text-[0.6rem] font-bold text-emerald-600 uppercase tracking-wider">Live</span>
                    </div>
                  </div>

                  <div className="p-3 space-y-3">

                    {/* 4 metric cards */}
                    <div className="grid grid-cols-2 gap-2">
                      {METRICS.map((m, i) => (
                        <MetricCard
                          key={i}
                          metric={m}
                          active={activeMetric === i}
                          onClick={() => setActiveMetric(i)}
                        />
                      ))}
                    </div>

                    {/* map panel â€” structured city pills, no free-floating */}
                    <div className="rounded-xl bg-gradient-to-br from-slate-50 to-indigo-50/30 border border-slate-200 overflow-hidden">
                      {/* top bar */}
                      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200/70">
                        <div className="flex items-center gap-1.5">
                          <span className="text-violet-500"><IcoPin /></span>
                          <span className="text-[0.65rem] font-bold text-slate-700 uppercase tracking-wide">Active Expansion Zones</span>
                        </div>
                        <span className="text-[0.6rem] font-semibold text-slate-500">{cityCount} cities active</span>
                      </div>
                      {/* city pills grid */}
                      <div className="p-2.5 flex flex-wrap gap-1.5">
                        {topCities.map((city, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.4 + i * 0.07 }}
                            className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white border border-slate-200 shadow-sm"
                          >
                            {/* pulsing dot */}
                            <span className="relative flex h-1.5 w-1.5 shrink-0">
                              <motion.span
                                animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.35 }}
                                className="absolute inset-0 rounded-full bg-violet-400"
                              />
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet-600" />
                            </span>
                            <span className="text-[0.65rem] font-semibold text-slate-700 whitespace-nowrap">{city.city}</span>
                            <span className="text-[0.58rem] font-medium text-slate-400">{city.count}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* top 3 opportunities */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-[0.65rem] font-bold text-slate-600 uppercase tracking-wide">Top Opportunities</p>
                        <p className="text-[0.6rem] text-slate-400">by ROI</p>
                      </div>
                      <div className="space-y-1">
                        {topOpps.map((opp) => (
                          <button
                            key={opp.id}
                            onClick={() => nav(`/franchise-details?id=${opp.id}`)}
                            className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-violet-300 hover:bg-violet-50/40 transition-all duration-150 group text-left"
                          >
                            <OppImage src={opp.image} alt={opp.brandName} category={opp.category} />
                            <div className="flex-1 min-w-0">
                              <p className="text-[0.7rem] font-semibold text-slate-800 truncate">{opp.brandName}</p>
                              <p className="text-[0.6rem] text-slate-400 truncate">{opp.category}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-[0.7rem] font-bold text-emerald-600">{opp.roi} ROI</p>
                              <p className="text-[0.6rem] text-slate-400">{opp.investment}</p>
                            </div>
                            <span className="text-slate-300 group-hover:text-violet-500 transition-colors shrink-0"><IcoChevron /></span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* market insight strip */}
                    <div className="grid grid-cols-3 divide-x divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                      {[
                        { label: 'Avg ROI',    value: `${avgROI}%` },
                        { label: 'Growth',     value: growth        },
                        { label: 'Min Invest', value: minInvest     },
                      ].map((s, i) => (
                        <div key={i} className="flex flex-col items-center py-2 bg-slate-50/60">
                          <p className="text-[0.82rem] font-extrabold text-slate-800">{s.value}</p>
                          <p className="text-[0.58rem] text-slate-400 mt-0.5">{s.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* verified footer */}
                    <div className="flex items-center justify-center gap-1.5">
                      <IcoCheck />
                      <span className="text-[0.6rem] text-slate-400 font-medium">Data verified Â· Updated in real-time</span>
                    </div>

                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ heroâ†’trust separator â”€â”€ */}
      <div className="h-px bg-slate-100" />

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          SECTION 2 â€” TRUST & SCALE STRIP
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <TrustStrip />

      {/* â”€â”€ separator â”€â”€ */}
      <div className="h-px bg-slate-100" />

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          SECTION 3 â€” BRAND EXPANSION PROBLEMS
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <ProblemsSection />

      {/* â”€â”€ separator â”€â”€ */}
      <div className="h-px bg-slate-100" />

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          SECTION 4 â€” SERVICES OVERVIEW
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}

      {/* â”€â”€ separator â”€â”€ */}
      <div className="h-px bg-slate-100" />

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          SECTION 5 â€” PROCESS FLOW
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}

      {/* â”€â”€ separator â”€â”€ */}
      <div className="h-px bg-slate-100" />

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          SECTION 6 â€” SERVICES FOR BRANDS
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <BrandsSection />

      {/* â”€â”€ separator â”€â”€ */}
      <div className="h-px bg-slate-100" />

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          SECTION 8 â€” INDUSTRIES WE SUPPORT
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <IndustriesSection />

      {/* â”€â”€ separator â”€â”€ */}
      <div className="h-px bg-slate-100" />

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          SECTION 9 â€” WHY CHOOSE iFRANCHISE
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <WhyChooseSection />

      {/* â”€â”€ separator â”€â”€ */}
      <div className="h-px bg-slate-100" />

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          SECTION 10 â€” CASE STUDIES
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <CaseStudiesSection />

      {/* â”€â”€ separator â”€â”€ */}
      <div className="h-px bg-slate-100" />

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          SECTION 11 â€” BRAND APPLICATION FORM
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <div id="brand-application">
        <BrandApplicationForm />
      </div>

      {/* â”€â”€ separator â”€â”€ */}
      <div className="h-px bg-slate-100" />

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          SECTION 12 â€” FAQ
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <FAQSection />

    </main>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// SECTION 2 â€” TRUST & SCALE STRIP
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const TRUST_STATS = [
  { value: 200,  suffix: '+', label: 'Brands Scaled'           },
  { value: 1800, suffix: '+', label: 'Investors Onboarded'     },
  { value: 17,   suffix: '+', label: 'Cities Covered'          },
  { value: 24,   suffix: '+', label: 'Active Opportunities'    },
  { value: 94,   suffix: '%', label: 'Investor Engagement Rate'},
];

const PARTNER_LOGOS = [
  'BurgerBlast', 'FitLife Gym', 'EcoClean', 'TechTutor',
  'CoffeeHaven', 'YogaZen', 'CodeAcademy', 'FreshMart',
];

function TrustCounter({ target, suffix, duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = null;
        const tick = (ts) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setCount(Math.floor(eased * target));
          if (p < 1) requestAnimationFrame(tick);
          else setCount(target);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
}

function TrustStrip() {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-16">
      {/* animated gradient mesh â€” no solid bg override, flows from bridge */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-slate-900 to-indigo-900/40" />
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -30, 0], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[10%] top-[20%] h-72 w-72 rounded-full bg-violet-500/20 blur-[80px]"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 40, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute right-[10%] bottom-[10%] h-80 w-80 rounded-full bg-indigo-500/20 blur-[90px]"
        />
        {/* subtle grid */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.04]">
          <defs>
            <pattern id="trust-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#trust-grid)"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[0.7rem] font-bold uppercase tracking-widest text-violet-300">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Trusted by India's Fastest-Growing Brands
          </span>
        </motion.div>

        {/* animated stat counters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-white/10 rounded-2xl overflow-hidden mb-12">
          {TRUST_STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center justify-center py-7 px-4 bg-white/5 hover:bg-white/10 transition-colors duration-300"
            >
              <p className="text-3xl font-extrabold text-white mb-1">
                <TrustCounter target={s.value} suffix={s.suffix} />
              </p>
              <p className="text-[0.7rem] font-medium text-slate-400 text-center">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* investor trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          {[
            { icon: 'âœ“', text: 'SEBI Compliant Framework'     },
            { icon: 'âœ“', text: 'Verified Investor Network'    },
            { icon: 'âœ“', text: 'Structured Due Diligence'     },
            { icon: 'âœ“', text: 'Transparent ROI Reporting'    },
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/15">
              <span className="text-emerald-400 text-xs font-bold">{t.icon}</span>
              <span className="text-[0.75rem] font-semibold text-slate-300">{t.text}</span>
            </div>
          ))}
        </motion.div>

        {/* scrolling marquee of partner logos */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="flex gap-6 w-max"
          >
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((name, i) => (
              <div
                key={i}
                className="flex items-center justify-center px-6 py-3 rounded-xl bg-white/8 border border-white/12 min-w-[140px]"
              >
                <span className="text-[0.75rem] font-bold text-slate-400 whitespace-nowrap">{name}</span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// SECTION 3 â€” PROBLEMS vs SOLUTIONS  (user-driven, continuous flow)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const ITEMS = [
  {
    problem:     'Weak Onboarding Systems',
    problemDesc: 'No SOPs or training â€” franchisees fail from day one.',
    solution:    'Structured SOP Frameworks',
    solutionDesc:'Complete onboarding playbooks, training modules & launch checklists built for every unit.',
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>,
  },
  {
    problem:     'Poor Franchise Architecture',
    problemDesc: 'Expanding without a model causes unit failures & legal gaps.',
    solution:    'Scalable Franchise Model Design',
    solutionDesc:'Legal-ready franchise architecture â€” FOCO, FOFO, FICO â€” built for multi-unit growth.',
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>,
  },
  {
    problem:     'Low-Quality Investor Pipeline',
    problemDesc: 'Unqualified leads waste months and drain marketing budgets.',
    solution:    'Verified Investor Network',
    solutionDesc:'Pre-screened, high-intent investors matched to your brand profile, budget & market.',
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4.13a4 4 0 11-8 0 4 4 0 018 0zm6 0a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  },
  {
    problem:     'No Expansion Strategy',
    problemDesc: 'Reactive growth with no territory planning leads to chaos.',
    solution:    'Data-Driven Territory Planning',
    solutionDesc:'Market analysis, phased rollout maps & city-level targeting for controlled expansion.',
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>,
  },
  {
    problem:     'Inconsistent Operations',
    problemDesc: 'Every unit runs differently â€” brand equity erodes fast.',
    solution:    'Centralized Operations Systems',
    solutionDesc:'Unified quality controls, performance audits & real-time dashboards across all units.',
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  },
  {
    problem:     'Weak Brand Positioning',
    problemDesc: 'Failing to communicate value â€” investors look elsewhere.',
    solution:    'Premium Brand Storytelling',
    solutionDesc:'Investor-grade brand decks, pitch materials & positioning strategy that converts.',
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>,
  },
  {
    problem:     'Random Lead Generation',
    problemDesc: 'No funnel = wasted spend & zero qualified pipeline.',
    solution:    'Performance Investor Acquisition',
    solutionDesc:'Structured lead funnels with qualified investor conversion systems & ROI tracking.',
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>,
  },
];

function ProblemsSection() {
  const [active, setActive] = useState(null);
  const item = active !== null ? ITEMS[active] : null;

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">

      {/* soft red + violet ambient â€” blends with page background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-red-100/30 blur-[90px]" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-violet-100/30 blur-[90px]" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* â”€â”€ section header â€” same style as home sections â”€â”€ */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[0.68rem] font-bold uppercase tracking-widest text-red-500">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              The Hard Truth
            </span>
            <span className="hidden sm:block text-[0.72rem] text-slate-400">â† tap a problem to reveal the fix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-slate-900 leading-[1.1] max-w-3xl">
            Why Most Brands Fail to Scale Through Franchising â€”{' '}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              And How iFranchise Fixes Every One
            </span>
          </h2>
        </motion.div>

        {/* â”€â”€ two-column body â”€â”€ */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* LEFT â€” 7 problem rows */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2"
          >
            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 mb-4">7 Common Failure Points</p>
            {ITEMS.map((it, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(active === i ? null : i)}
                whileHover={{ x: active === i ? 0 : 4 }}
                transition={{ duration: 0.15 }}
                className={`w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                  active === i
                    ? 'border-red-300 bg-red-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-red-200 hover:bg-red-50/30'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200 ${
                  active === i ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {it.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold leading-snug transition-colors duration-200 ${
                    active === i ? 'text-red-700' : 'text-slate-700'
                  }`}>{it.problem}</p>
                  {active === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.2 }}
                      className="text-[0.72rem] text-red-500/80 mt-0.5 leading-snug overflow-hidden"
                    >
                      {it.problemDesc}
                    </motion.p>
                  )}
                </div>
                <motion.div
                  animate={{ rotate: active === i ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <svg className={`w-4 h-4 transition-colors duration-200 ${active === i ? 'text-red-400' : 'text-slate-300'}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                  </svg>
                </motion.div>
              </motion.button>
            ))}
          </motion.div>

          {/* RIGHT â€” solution panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28"
          >
            {item === null ? (
              /* empty state */
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 py-20 px-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"/>
                  </svg>
                </div>
                <p className="text-base font-bold text-slate-600 mb-2">Select a problem on the left</p>
                <p className="text-sm text-slate-400 max-w-[220px] leading-relaxed">
                  See exactly how iFranchise solves each franchise failure point
                </p>
                {/* hint arrows pointing left */}
                <div className="flex items-center gap-1 mt-6 text-slate-300">
                  {[0,1,2].map(i => (
                    <motion.svg key={i} className="w-4 h-4"
                      animate={{ x: [-3, 0, -3], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                    </motion.svg>
                  ))}
                  <span className="text-[0.7rem] font-medium text-slate-400 ml-1">pick one</span>
                </div>
              </div>
            ) : (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden"
              >
                {/* card header */}
                <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-violet-600 to-indigo-600">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[0.6rem] font-bold uppercase tracking-wider text-violet-200">iFranchise Solution</p>
                    <p className="text-base font-extrabold text-white leading-tight">{item.solution}</p>
                  </div>
                  <div className="ml-auto w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* problem recap pill */}
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 border border-red-100">
                    <svg className="w-3.5 h-3.5 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    <span className="text-[0.72rem] font-semibold text-red-600">{item.problem}</span>
                    <svg className="w-3.5 h-3.5 text-slate-300 mx-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12"/>
                    </svg>
                    <span className="text-[0.72rem] font-semibold text-violet-600">Fixed</span>
                  </div>

                  {/* solution description */}
                  <p className="text-[0.88rem] text-slate-600 leading-relaxed">{item.solutionDesc}</p>

                  {/* outcome tags */}
                  <div className="flex flex-wrap gap-2">
                    {['Proven Framework', 'Expert-Led', 'Scalable', 'Results-Driven'].map((tag, t) => (
                      <span key={t} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-200 text-[0.68rem] font-semibold text-violet-700">
                        <span className="w-1 h-1 rounded-full bg-violet-400" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* progress + CTA */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      {ITEMS.map((_, i) => (
                        <button key={i} onClick={() => setActive(i)}
                          className={`rounded-full transition-all duration-200 ${
                            i === active ? 'w-4 h-1.5 bg-violet-500' : 'w-1.5 h-1.5 bg-slate-200 hover:bg-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => { window.history.pushState({}, '', '/contact'); window.dispatchEvent(new PopStateEvent('popstate')); }}
                      className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-[0.78rem] font-semibold hover:bg-violet-700 transition-colors duration-200"
                    >
                      Get This Solution
                      <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}


