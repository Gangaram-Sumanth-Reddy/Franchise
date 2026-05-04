import { useEffect, useRef, useState } from "react";

// Scroll-triggered visibility hook
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold, rootMargin: "0px 0px -4% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// Animated reveal wrapper
function Reveal({ children, delay = 0, direction = "up", className = "" }) {
  const [ref, visible] = useInView(0.1);
  const transforms = {
    up: "translateY(16px)",
    down: "translateY(-12px)",
    right: "translateX(-16px)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0,0)" : (transforms[direction] || transforms.up),
        transition: `opacity 0.38s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.38s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}

function navigateTo(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function goBack() {
  window.history.pushState({}, "", "/#who-are-you");
  window.dispatchEvent(new PopStateEvent("popstate"));
}

// Icons
const IconOverwhelm = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4M12 16h.01" />
  </svg>
);
const IconRisk = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <path d="M12 9v4M12 17h.01" />
  </svg>
);
const IconAlone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconMatch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <path d="M22 4L12 14.01l-3-3" />
  </svg>
);
const IconROI = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);
const IconSupport = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);
const IconAssess = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconBudget = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
  </svg>
);
const IconLocation = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconIndustry = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M18 20V10M12 20V4M6 20v-6" />
  </svg>
);

// Data
const PAIN_POINTS = [
  {
    icon: IconOverwhelm,
    title: "Too Many Options, No Clarity",
    desc: "Thousands of franchise brands, conflicting advice, and no structured way to evaluate which opportunity actually fits your goals and budget.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: IconRisk,
    title: "Fear of Losing Capital",
    desc: "Without proper due diligence, financial modeling, and risk assessment, franchise investment feels like a gamble rather than a calculated business decision.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: IconAlone,
    title: "No Expert Guidance",
    desc: "Most investors go it alone — relying on brand marketing materials instead of independent analysis, leading to mismatched expectations and poor outcomes.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
];

const SOLUTIONS = [
  {
    icon: IconMatch,
    title: "Curated Brand Matching",
    desc: "We match you with franchise brands that fit your exact budget, location, industry preference, and investment timeline — not just what's available.",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    icon: IconROI,
    title: "ROI Clarity Reports",
    desc: "Detailed financial projections, payback period analysis, and unit economics breakdowns so you know exactly what returns to expect before committing.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    icon: IconSupport,
    title: "End-to-End Support",
    desc: "From initial discovery to signing the franchise agreement and launching your first outlet — we guide you through every step of the process.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: IconAssess,
    title: "Risk Assessment",
    desc: "Independent evaluation of brand health, franchisor track record, market saturation, and operational risks before you make any commitment.",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
];

const OPPORTUNITIES = [
  {
    category: "Food & Beverage",
    categoryColor: "bg-orange-100 text-orange-700",
    investment: "₹15L – ₹30L",
    roi: "35%",
    payback: "20 months",
    desc: "High-footfall QSR and cafe concepts with proven unit economics across Tier 1 and Tier 2 cities.",
  },
  {
    category: "Fitness & Wellness",
    categoryColor: "bg-emerald-100 text-emerald-700",
    investment: "₹25L – ₹50L",
    roi: "40%",
    payback: "24 months",
    desc: "Premium fitness studios and wellness centers with strong recurring revenue from membership models.",
  },
  {
    category: "Education",
    categoryColor: "bg-blue-100 text-blue-700",
    investment: "₹10L – ₹20L",
    roi: "28%",
    payback: "15 months",
    desc: "Skill development and tutoring centers with low capex, high margins, and strong demand across all cities.",
  },
];

const DECISION_FEATURES = [
  {
    icon: IconBudget,
    title: "Budget Matching",
    desc: "We find brands within your exact investment range — no upselling, no pressure. Your budget is the starting point, not a negotiation.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: IconLocation,
    title: "Location Strategy",
    desc: "City-level demand analysis, competitor mapping, and footfall data for your target market to ensure you pick the right location.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: IconIndustry,
    title: "Industry Selection",
    desc: "Data-driven sector recommendations based on your background, risk appetite, and the growth trajectory of different franchise categories.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
];

const STATS = [
  { value: "8000+", label: "Investors Guided" },
  { value: "72%", label: "Prefer Franchise Models" },
  { value: "500+", label: "Cities Covered" },
  { value: "30%", label: "Avg CAGR" },
];

const TESTIMONIALS = [
  {
    initials: "RK",
    name: "Rajesh Kumar",
    role: "Franchise Owner, F&B",
    quote: "iFranchise matched me with the perfect brand for my budget. The ROI report gave me full confidence before I signed. Now running 2 outlets profitably.",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    initials: "PS",
    name: "Priya Sharma",
    role: "Investor, Education Sector",
    quote: "I was overwhelmed by choices. The team narrowed it down to 3 perfect fits, walked me through the numbers, and supported me through the entire launch.",
    color: "bg-blue-100 text-blue-700",
  },
  {
    initials: "AM",
    name: "Arjun Mehta",
    role: "Multi-unit Franchisee",
    quote: "Started with one fitness franchise. The location analysis was spot on — we hit payback in 18 months. Now expanding to a second city with iFranchise.",
    color: "bg-violet-100 text-violet-700",
  },
];

export default function ForInvestorsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f8f6" }}>

      {/* ── BACK BREADCRUMB ───────────────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-700 transition-colors duration-200 group"
        >
          <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back to Home
        </button>
      </div>

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, #10b98122 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #10b98140, transparent 70%)" }} />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, #059669 40, transparent 70%)" }} />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal delay={0}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              For Investors
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6 max-w-4xl mx-auto">
              Invest in{" "}
              <span className="text-emerald-600">Proven Franchise Opportunities</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Stop guessing. Get matched with vetted franchise brands that fit your budget, location, and goals — with full ROI clarity before you invest.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigateTo("/franchise-opportunities")}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 text-white font-semibold text-base hover:bg-emerald-700 transition-colors duration-200 shadow-lg shadow-slate-900/20"
              >
                Explore Opportunities
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
              </button>
              <button
                onClick={() => {
                  document.getElementById("inv-process")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold text-base hover:border-emerald-400 hover:text-emerald-700 transition-colors duration-200"
              >
                How It Works
              </button>
            </div>
          </Reveal>

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

      {/* PROBLEM */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-emerald-600 uppercase tracking-widest">The Problem</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">Why Most Investors Get It Wrong</h2>
              <p className="mt-4 text-slate-500 max-w-xl mx-auto">The franchise market is full of opportunity — but without the right guidance, it is easy to make costly mistakes.</p>
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

      {/* SOLUTION */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-emerald-600 uppercase tracking-widest">Our Solution</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">How We Help You Invest Smarter</h2>
              <p className="mt-4 text-slate-500 max-w-xl mx-auto">We replace guesswork with data, expertise, and a structured process that puts your interests first.</p>
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

      {/* OPPORTUNITIES */}
      <section id="inv-process" className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-emerald-600 uppercase tracking-widest">Opportunities</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">Featured Franchise Categories</h2>
              <p className="mt-4 text-slate-500 max-w-xl mx-auto">A snapshot of the types of vetted opportunities available across our network.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OPPORTUNITIES.map((opp, i) => (
              <Reveal key={opp.category} delay={i * 0.08}>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 hover:-translate-y-1 hover:shadow-md transition-all duration-200 h-full flex flex-col">
                  <span className={`inline-block self-start px-3 py-1 rounded-full text-xs font-semibold mb-4 ${opp.categoryColor}`}>{opp.category}</span>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">{opp.desc}</p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-medium">Investment Range</span>
                      <span className="text-sm font-extrabold text-slate-900">{opp.investment}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-medium">Expected ROI</span>
                      <span className="text-sm font-extrabold text-emerald-600">{opp.roi}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-medium">Payback Period</span>
                      <span className="text-sm font-extrabold text-slate-700">{opp.payback}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigateTo("/franchise-opportunities")}
                    className="w-full py-2.5 rounded-xl border-2 border-emerald-200 text-emerald-700 font-semibold text-sm hover:bg-emerald-50 hover:border-emerald-400 transition-colors duration-200"
                  >
                    View Details
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DECISION SUPPORT */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-emerald-600 uppercase tracking-widest">Decision Support</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">We Do the Hard Work for You</h2>
              <p className="mt-4 text-slate-500 max-w-xl mx-auto">Three pillars of our investor support framework that ensure you make the right decision.</p>
            </div>
          </Reveal>

          <div className="space-y-5">
            {DECISION_FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.07}>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-7 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start gap-5">
                    <div className={`flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl ${f.bg} ${f.color}`}>
                      <f.icon />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 mb-1.5">{f.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-emerald-600 uppercase tracking-widest">Trust</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">Trusted by Thousands of Investors</h2>
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal delay={0.05}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
              {STATS.map((s) => (
                <div key={s.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
                  <div className="text-3xl font-extrabold text-emerald-600 mb-1">{s.value}</div>
                  <div className="text-sm text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 hover:-translate-y-1 hover:shadow-md transition-all duration-200 h-full flex flex-col">
                  <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-5">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-extrabold ${t.color}`}>
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-slate-900">{t.name}</div>
                      <div className="text-xs text-slate-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="bg-slate-900 rounded-3xl px-8 py-14 sm:py-16 text-center relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #10b981, transparent 70%)" }} />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Start Your Franchise Journey with Confidence</h2>
                <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
                  Get personalized franchise recommendations based on your budget, location, and goals.
                </p>
                <button
                  onClick={() => navigateTo("/contact")}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 text-white font-semibold text-base hover:bg-emerald-500 transition-colors duration-200 shadow-lg shadow-emerald-900/40"
                >
                  Get Personalized Recommendations
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
