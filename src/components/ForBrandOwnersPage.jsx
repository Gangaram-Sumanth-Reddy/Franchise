import { useEffect, useRef, useState } from 'react';

// ── Scroll-triggered visibility hook ─────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold, rootMargin: '0px 0px -4% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── Animated reveal wrapper ───────────────────────────────────────────────────
function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const [ref, visible] = useInView(0.1);
  const transforms = {
    up: 'translateY(16px)',
    down: 'translateY(-12px)',
    right: 'translateX(-16px)',
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate(0,0)' : (transforms[direction] || transforms.up),
        transition: `opacity 0.38s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.38s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}

function navigateTo(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function goBack() {
  // Navigate home and scroll to the "Who Are You?" section
  window.history.pushState({}, '', '/#who-are-you');
  window.dispatchEvent(new PopStateEvent('popstate'));
}

// ── Icons (inline SVG, no external deps) ─────────────────────────────────────
const IconBottleneck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);
const IconPlaybook = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);
const IconTrust = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconStructure = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="2" y="3" width="6" height="6" rx="1" />
    <rect x="16" y="3" width="6" height="6" rx="1" />
    <rect x="9" y="15" width="6" height="6" rx="1" />
    <path d="M5 9v3h14V9M12 12v3" />
  </svg>
);
const IconLegal = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);
const IconSOP = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </svg>
);
const IconPipeline = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);
const IconRevenue = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);
const IconScale = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M18 20V10M12 20V4M6 20v-6" />
  </svg>
);
const IconValuation = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────
const PAIN_POINTS = [
  {
    icon: IconBottleneck,
    title: 'Stuck at the Same Scale',
    desc: 'Your operations are the ceiling. Every new location means more of your time, energy, and oversight — making growth feel impossible.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: IconPlaybook,
    title: 'No Expansion Playbook',
    desc: "You've built something great, but there's no structured model to replicate it. Every new outlet reinvents the wheel.",
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: IconTrust,
    title: "Investors Don't Trust Unstructured Brands",
    desc: 'Without proper documentation, SOPs, and legal frameworks, serious investors walk away — no matter how good your product is.',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
];

const SOLUTIONS = [
  {
    icon: IconStructure,
    title: 'Franchise Structuring',
    desc: 'We design your complete franchise model — territory mapping, fee structures, royalty systems, and operational blueprints.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
  },
  {
    icon: IconLegal,
    title: 'Legal Frameworks',
    desc: 'FDD preparation, franchise agreements, IP protection, and compliance documentation handled by franchise law specialists.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    icon: IconSOP,
    title: 'SOP Systems',
    desc: 'Comprehensive standard operating procedures that let franchisees replicate your brand experience without your involvement.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  {
    icon: IconPipeline,
    title: 'Investor Pipeline',
    desc: 'Access our network of 8,000+ pre-qualified franchise investors actively looking for opportunities like yours.',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
  },
];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Business Audit',
    desc: 'We deep-dive into your current operations, financials, and brand positioning to identify franchisability and growth potential.',
  },
  {
    num: '02',
    title: 'Franchise Model Design',
    desc: 'Our team architects your complete franchise system — from unit economics to territory strategy and franchisee support structures.',
  },
  {
    num: '03',
    title: 'Legal & Documentation',
    desc: 'We prepare all legal documents, franchise disclosure documents, agreements, and compliance frameworks required to launch.',
  },
  {
    num: '04',
    title: 'Launch & Investor Onboarding',
    desc: 'We connect you with qualified investors, manage the onboarding process, and support your first wave of franchise launches.',
  },
];

const STATS = [
  { value: '350+', label: 'Brands Structured' },
  { value: '₹800Cr+', label: 'Ecosystem Value' },
  { value: '40+', label: 'Cities Expanded' },
  { value: '92%', label: 'Investor Match Rate' },
];

const CASE_STUDIES = [
  {
    tag: 'Food & Beverage',
    headline: 'Scaled from 3 → 40 outlets in 18 months',
    desc: 'A regional QSR brand with no franchise model went from 3 company-owned outlets to 40 franchise locations across 12 cities after our full structuring engagement.',
    metric1: '40 outlets',
    metric2: '18 months',
  },
  {
    tag: 'Fitness & Wellness',
    headline: 'Raised ₹12Cr in franchise investment in 6 months',
    desc: 'A premium fitness chain with strong unit economics but zero investor documentation raised ₹12Cr from 8 franchise investors within 6 months of our legal and pitch framework.',
    metric1: '₹12Cr raised',
    metric2: '6 months',
  },
];

const BENEFITS = [
  {
    icon: IconRevenue,
    title: 'Predictable Revenue Growth',
    desc: 'Franchise fees and royalties create recurring revenue streams that grow as your network expands — without proportional cost increases.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: IconScale,
    title: 'Scalable Without Hiring More',
    desc: 'Franchisees invest their own capital and manage their own teams. You scale your brand footprint without scaling your headcount.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: IconValuation,
    title: 'Brand Valuation Increase',
    desc: 'A structured franchise system with documented processes, legal frameworks, and a growing network dramatically increases your brand valuation.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function ForBrandOwnersPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f8f6' }}>

      {/* ── BACK BREADCRUMB ───────────────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-violet-700 transition-colors duration-200 group"
        >
          <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back to Home
        </button>
      </div>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Dot grid background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, #7c3aed22 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Soft gradient blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #7c3aed40, transparent 70%)' }} />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #4f46e540, transparent 70%)' }} />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal delay={0}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-violet-100 text-violet-700 border border-violet-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
              For Brand Owners
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6 max-w-4xl mx-auto">
              Turn Your Business Into a{' '}
              <span className="text-violet-600">Scalable Franchise System</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Stop being the bottleneck. Build a franchise model that grows without you — with structured systems, legal frameworks, and a pipeline of qualified investors.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigateTo('/contact')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 text-white font-semibold text-base hover:bg-violet-700 transition-colors duration-200 shadow-lg shadow-slate-900/20"
              >
                Start Franchising
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
              </button>
              <button
                onClick={() => {
                  document.getElementById('bo-process')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold text-base hover:border-violet-400 hover:text-violet-700 transition-colors duration-200"
              >
                See How It Works
              </button>
            </div>
          </Reveal>

          {/* Trust bar */}
          <Reveal delay={0.24}>
            <div className="mt-14 flex flex-wrap justify-center gap-8">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-extrabold text-slate-900">{s.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-violet-600 uppercase tracking-widest">The Problem</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">Why Most Brands Never Scale</h2>
              <p className="mt-4 text-slate-500 max-w-xl mx-auto">Growth stalls not because of demand — but because of structural gaps that prevent replication.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PAIN_POINTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 hover:-translate-y-1 hover:shadow-md transition-all duration-200 h-full">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${p.bg} ${p.color} mb-5`}>
                    <p.icon />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">{p.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTION ─────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-violet-600 uppercase tracking-widest">Our Solution</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">Everything You Need to Franchise</h2>
              <p className="mt-4 text-slate-500 max-w-xl mx-auto">A complete end-to-end system that takes your business from single-location to scalable franchise network.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SOLUTIONS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.07}>
                <div className={`bg-white rounded-2xl border ${s.border} shadow-sm p-7 hover:-translate-y-1 hover:shadow-md transition-all duration-200 h-full`}>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${s.bg} ${s.color} mb-5`}>
                    <s.icon />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      <section id="bo-process" className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <span className="text-sm font-semibold text-violet-600 uppercase tracking-widest">The Process</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">From Business to Franchise in 4 Steps</h2>
              <p className="mt-4 text-slate-500 max-w-xl mx-auto">A structured engagement that transforms your business into a replicable, investor-ready franchise system.</p>
            </div>
          </Reveal>

          <div className="relative max-w-2xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-200 hidden sm:block" />

            <div className="space-y-8">
              {PROCESS_STEPS.map((step, i) => (
                <Reveal key={step.num} delay={i * 0.09}>
                  <div className="relative flex gap-6 items-start">
                    <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-2xl bg-violet-600 text-white flex items-center justify-center font-extrabold text-lg shadow-lg shadow-violet-200">
                      {step.num}
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex-1 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
                      <h3 className="text-base font-extrabold text-slate-900 mb-1.5">{step.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROOF ────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-violet-600 uppercase tracking-widest">Proof</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">Results That Speak for Themselves</h2>
            </div>
          </Reveal>

          {/* Stats row */}
          <Reveal delay={0.05}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
              {STATS.map((s) => (
                <div key={s.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
                  <div className="text-3xl font-extrabold text-violet-600 mb-1">{s.value}</div>
                  <div className="text-sm text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Case studies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CASE_STUDIES.map((c, i) => (
              <Reveal key={c.headline} delay={i * 0.08}>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 hover:-translate-y-1 hover:shadow-md transition-all duration-200 h-full">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-700 mb-4">{c.tag}</span>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-3">{c.headline}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{c.desc}</p>
                  <div className="flex gap-4">
                    <div className="flex-1 bg-slate-50 rounded-xl p-3 text-center">
                      <div className="text-base font-extrabold text-violet-600">{c.metric1}</div>
                    </div>
                    <div className="flex-1 bg-slate-50 rounded-xl p-3 text-center">
                      <div className="text-base font-extrabold text-slate-700">{c.metric2}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-violet-600 uppercase tracking-widest">Benefits</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">What You Gain by Franchising</h2>
              <p className="mt-4 text-slate-500 max-w-xl mx-auto">Franchising isn't just about more locations — it's a fundamentally different and more powerful business model.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 hover:-translate-y-1 hover:shadow-md transition-all duration-200 h-full">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${b.bg} ${b.color} mb-5`}>
                    <b.icon />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">{b.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="bg-slate-900 rounded-3xl px-8 py-14 sm:py-16 text-center relative overflow-hidden">
              {/* Background glow */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }} />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to Scale Without Limits?</h2>
                <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
                  Join 350+ brands that have built scalable franchise systems with iFranchise.
                </p>
                <button
                  onClick={() => navigateTo('/contact')}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-violet-600 text-white font-semibold text-base hover:bg-violet-500 transition-colors duration-200 shadow-lg shadow-violet-900/40"
                >
                  Book Strategy Call
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
