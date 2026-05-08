import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';
import TestimonialCard from './TestimonialCard';
import processImg from '../assets/process.png';
import contactImg from '../assets/contact.png';
import PremiumHeroBackground from './PremiumHeroBackground';
import { 
  franchiseOpportunities, 
  getTotalCities, 
  getTotalMarkets, 
  getTotalRevenuePotential, 
  formatRevenue,
  getAverageROI,
  getIndustryCount,
  calculateGrowthMetrics
} from '../data/franchiseData';

// ── Lightweight scroll-triggered visibility hook ──────────────────────────────
// Returns [ref, isVisible] — isVisible toggles true/false on every enter/leave
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

// ── Animated wrapper — fades+slides in on scroll, resets when out ─────────────
function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const [ref, visible] = useInView(0.1);
  const transforms = { up: 'translateY(20px)', down: 'translateY(-12px)', right: 'translateX(-20px)' };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0,0,0)' : transforms[direction] || transforms.up,
        transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: visible ? 'auto' : 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}

const testimonials = {
  left: [
    { quote: 'The updates and attention to detail are unmatched.', author: 'Nora S' },
    { quote: 'Saved me weeks of work and the result looks premium.', author: 'Marcus T' },
  ],
  right: [
    { quote: 'Beautiful template, easy to customize and worth every penny.', author: 'Amelia R' },
    { quote: 'Exactly what I needed to kickstart my SaaS project fast.', author: 'Liam V' },
  ],
};


const growthCards = [
  {
    eyebrow: 'FOR BRAND OWNERS',
    tag: 'FRANCHISORS',
    pillBg: 'rgba(124,58,237,0.85)',
    tags: ['Scale', 'Expand', 'Franchise'],
    title: 'Expand Your Brand Through Franchising',
    description:
      'Turn your successful business into a scalable franchise model. We help brand owners structure, launch, and grow through strategic franchising systems, legal frameworks, and investor connections.',
    linkText: 'For Brand Owners',
    href: '/for-brand-owners',
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=85',
    fallbackImage:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85',
    accent: 'from-violet-600 to-indigo-600',
    accentText: 'text-violet-700',
    accentBg: 'bg-violet-50',
  },
  {
    eyebrow: 'FOR INVESTORS',
    tag: 'FRANCHISEES',
    pillBg: 'rgba(5,150,105,0.85)',
    tags: ['Invest', 'Own', 'Grow'],
    title: 'Invest in Proven Franchise Opportunities',
    description:
      'Discover vetted franchise businesses across high-growth industries. Find the right investment based on your budget, goals, and market demand — with clarity and confidence.',
    linkText: 'For Investors',
    href: '/for-investors',
    image:
      'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1200&q=85',
    fallbackImage:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1200&q=85',
    accent: 'from-emerald-600 to-teal-600',
    accentText: 'text-emerald-700',
    accentBg: 'bg-emerald-50',
  },
];


const statsCards = [
  {
    value: 350,
    suffix: '+',
    title: 'Brands Partnered',
    description: 'Trusted by businesses across multiple industries and growth stages.',
  },
  {
    value: 8000,
    suffix: '+',
    title: 'Leads Generated',
    description: 'Qualified opportunities created through focused conversion systems.',
  },
  {
    value: 25,
    suffix: '+',
    title: 'Countries Reached',
    description: 'Global campaigns and launches delivered with local market precision.',
  },
  {
    value: 150,
    suffix: '+',
    title: 'Conversion Experiments',
    description: 'Tested and refined website journeys to increase pipeline efficiency.',
  },
];

const franchiseModels = [
  {
    id: 'foco-model',
    slug: 'foco-model',
    code: 'FOCO',
    title: 'Franchise Owned, Company Operated',
    description:
      'The franchise partner owns the unit while our central team manages operations, staffing, and quality delivery.',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    cta: 'Explore FOCO',
  },
  {
    id: 'fofo-model',
    slug: 'fofo-model',
    code: 'FOFO',
    title: 'Franchise Owned and Operated',
    description:
      'The franchise partner owns and runs daily business operations with standardized systems and growth support.',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    cta: 'Explore FOFO',
  },
  {
    id: 'fico-model',
    slug: 'fico-model',
    code: 'FICO',
    title: 'Franchise Invested, Company Operated',
    description:
      'Investors fund expansion while the company executes operations end-to-end with transparent reporting.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    cta: 'Explore FICO',
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    description:
      'Analyze business goals, market positioning, and growth opportunities to define a scalable roadmap.',
  },
  {
    number: '02',
    title: 'Design & Prototyping',
    description:
      'Create conversion-focused UX/UI aligned with user behavior and business objectives.',
  },
  {
    number: '03',
    title: 'Development & Launch',
    description:
      'Build high-performance platforms optimized for scalability, speed, and real-world usage.',
  },
  {
    number: '04',
    title: 'Optimization & Scale',
    description:
      'Continuously improve performance, conversion, and expansion strategies using real data.',
  },
];

const testimonialsFlowCards = [
  {
    quote:
      'iFranchise helped me scale from 2 outlets to 9 within months. The process is structured and reliable.',
    name: 'Arjun Patel',
    role: 'Franchise Investor',
    avatar: 'https://i.pravatar.cc/60?img=15',
    rating: 5,
  },
  {
    quote:
      'I avoided a wrong investment because of their insights. That alone saved me a huge amount.',
    name: 'Neha Reddy',
    role: 'First-time Investor',
    avatar: 'https://i.pravatar.cc/60?img=47',
    rating: 5,
  },
  {
    quote: 'The platform makes opportunity comparison simple and data-driven.',
    name: 'Kiran Sharma',
    role: 'Investment Advisor',
    avatar: 'https://i.pravatar.cc/60?img=68',
    rating: 5,
  },
  {
    quote: 'Our conversion rate improved significantly after working with iFranchise.',
    name: 'Rajesh Kumar',
    role: 'Business Owner',
    avatar: 'https://i.pravatar.cc/60?img=29',
    rating: 5,
  },
  {
    quote: 'Transparent process, clear ROI expectations, and strong execution.',
    name: "Amelia D'Souza",
    role: 'CEO',
    avatar: 'https://i.pravatar.cc/60?img=33',
    rating: 5,
  },
  {
    quote: "They understand both operators and investors. That's rare.",
    name: 'Ishaan Rao',
    role: 'Director',
    avatar: 'https://i.pravatar.cc/60?img=53',
    rating: 5,
  },
];

const featuredFranchises = [
  {
    id: 1,
    slug: 'burgerblast',
    title: 'BurgerBlast',
    description: 'A premium burger franchise built for metro growth with proven demand and scalable operations support.',
    image: 'https://images.unsplash.com/photo-1568901346376-56c5276b45b0?auto=format&fit=crop&w=600&q=80',
    badge: { text: 'PREMIUM', color: 'green' },
    tags: {
      investment: '$100K-$250K',
      model: 'FOFO',
      expansion: 'PAN INDIA'
    },
    metrics: {
      roi: '35%',
      payback: '20 months'
    },
    details: {
      industry: 'Food & Beverage',
      segment: 'Premium Burgers',
      investment: '$100K-$250K',
      space: '1000-1500 sq ft'
    }
  },
  {
    id: 2,
    slug: 'fitlife-gym',
    title: 'FitLife Gym',
    description: 'Premium fitness boutique offering personalized training, wellness programs, and state-of-the-art equipment in upscale locations.',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=600&q=80',
    badge: { text: 'PREMIUM', color: 'orange' },
    tags: {
      investment: '$150K-$300K',
      model: 'FICO',
      expansion: 'METRO'
    },
    metrics: {
      roi: '40%',
      payback: '24 months'
    },
    details: {
      industry: 'Fitness & Wellness',
      segment: 'Premium Fitness',
      investment: '$150K-$300K',
      space: '3000-5000 sq ft'
    }
  },
  {
    id: 3,
    slug: 'ecoclean-solutions',
    title: 'EcoClean Solutions',
    description: 'Sustainable cleaning services franchise using eco-friendly processes for recurring commercial and residential contracts.',
    image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80',
    badge: { text: 'PREMIUM', color: 'blue' },
    tags: {
      investment: '$50K-$150K',
      model: 'FOCO',
      expansion: 'TIER 2 & 3'
    },
    metrics: {
      roi: '28%',
      payback: '15 months'
    },
    details: {
      industry: 'Home Services',
      segment: 'Eco Cleaning',
      investment: '$50K-$150K',
      space: '500-800 sq ft'
    }
  },
  {
    id: 4,
    title: 'KidsZone Play Center',
    description: 'Interactive entertainment and educational activities for children aged 3-12.',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80',
    badge: { text: 'TRENDING', color: 'green' },
    tags: {
      investment: '$80K-$180K',
      model: 'FOFO',
      expansion: 'SUBURBAN'
    },
    metrics: {
      roi: '42%',
      payback: '20 months'
    },
    details: {
      industry: 'Entertainment',
      segment: 'Family Entertainment',
      investment: '$80K-$180K',
      space: '3000-5000 sq ft'
    }
  },
  {
    id: 5,
    title: 'QuickClean Services',
    description: 'Professional cleaning solutions for residential and commercial properties.',
    image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80',
    badge: { text: 'HIGH ROI', color: 'orange' },
    tags: {
      investment: '$30K-$80K',
      model: 'FICO',
      expansion: 'NATIONAL'
    },
    metrics: {
      roi: '45%',
      payback: '15 months'
    },
    details: {
      industry: 'Services',
      segment: 'Cleaning Services',
      investment: '$30K-$80K',
      space: '500-1000 sq ft'
    }
  },
  {
    id: 6,
    title: 'TechRepair Pro',
    description: 'Comprehensive device repair and tech support services with certified technicians.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
    badge: { text: 'NEW', color: 'blue' },
    tags: {
      investment: '$40K-$120K',
      model: 'FOFO',
      expansion: 'METRO'
    },
    metrics: {
      roi: '38%',
      payback: '16 months'
    },
    details: {
      industry: 'Technology',
      segment: 'Repair Services',
      investment: '$40K-$120K',
      space: '800-1500 sq ft'
    }
  }
];

const contactItems = [
  {
    title: 'Email us',
    value: 'partnerships@ifranchise.com',
    icon: 'email',
  },
  {
    title: 'Call us',
    value: '+1 (501) 123-4567',
    icon: 'phone',
  },
  {
    title: 'Our location',
    value: 'Crosby Street, New York, US',
    icon: 'location',
  },
];

function Avatar({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="-ml-2 h-9 w-9 rounded-full border-2 border-white object-cover first:ml-0"
    />
  );
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 fill-[#111827]"
    >
      <path d="M12 2.5l2.94 5.95 6.56.96-4.75 4.63 1.12 6.54L12 17.5 6.13 20.58l1.12-6.54L2.5 9.41l6.56-.96L12 2.5z" />
    </svg>
  );
}

function GrowthCard({ card }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setImgLoaded(true);
    }
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-[20px] bg-white border border-slate-100 cursor-pointer"
      style={{
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.10)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)';
      }}
      onClick={() => navigateTo(card.href)}
    >
      {/* Image — 16/9 ratio, fits fully in viewport */}
      <div
        className="relative overflow-hidden shrink-0"
        style={{ aspectRatio: '16/9', backgroundColor: '#f8f9fa' }}
      >
        {/* Skeleton */}
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 animate-pulse" />
        )}
        {/* Error fallback */}
        {imgError && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <span className="text-5xl font-black text-slate-300">{card.eyebrow[0]}</span>
          </div>
        )}
        {/* Image — contain so nothing is cut */}
        {!imgError && (
          <img
            ref={imgRef}
            src={card.image}
            alt={card.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            onError={() => {
              if (card.fallbackImage) {
                imgRef.current.src = card.fallbackImage;
                imgRef.current.onerror = () => setImgError(true);
              } else {
                setImgError(true);
              }
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 20%',
              transition: 'transform 0.5s ease, opacity 0.4s ease',
              opacity: imgLoaded ? 1 : 0,
            }}
            className="group-hover:scale-[1.03]"
          />
        )}
        {/* Soft overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.02), rgba(0,0,0,0.10))' }}
        />
        {/* Tag pill — top right, colored glassmorphism */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.14em] text-white px-3 py-1.5 rounded-full"
            style={{
              background: card.pillBg,
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.25)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
          >
            {card.tag}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">

        {/* Eyebrow label */}
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-2">
          {card.eyebrow}
        </p>

        {/* Title */}
        <h3 className="text-lg font-extrabold tracking-tight text-[#0b0f19] leading-snug mb-2">
          {card.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-slate-500 flex-1 mb-3">
          {card.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {card.tags.map((t) => (
            <span
              key={t}
              className="text-[11px] font-medium text-slate-500 px-2.5 py-0.5 rounded-full border border-slate-200"
              style={{ backgroundColor: '#f8f9fa' }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={(e) => { e.stopPropagation(); navigateTo(card.href); }}
          className={`group/btn inline-flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-full bg-gradient-to-r ${card.accent} text-white transition-all duration-200 active:scale-95 self-start`}
        >
          {card.linkText}
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1"
            fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M8 12h9" />
          </svg>
        </button>

      </div>
    </article>
  );
}

function StatCard({ stat, active }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frameId;
    let startTime;
    const durationMs = 2000; // 2 seconds for smooth animation

    // Always reset to 0 when active changes
    if (!active) {
      setCount(0);
      return undefined;
    }

    // Start animation from 0
    setCount(0);

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      
      // Eased animation for smooth counting
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(stat.value * eased);
      
      setCount(currentCount);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      } else {
        // Ensure we end exactly at the target value
        setCount(stat.value);
      }
    };

    // Small delay before starting animation for better visual effect
    const timeoutId = setTimeout(() => {
      frameId = window.requestAnimationFrame(animate);
    }, 200);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [active, stat.value]); // Re-run when active changes

  return (
    <div className="inline-block">
      <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0b0f19] tabular-nums mb-1">
        {count.toLocaleString()}
        {stat.suffix}
      </p>
    </div>
  );
}

// ── Franchise Model Modal Data ────────────────────────────────────────────────
const MODEL_DETAILS = {
  FOCO: {
    badge: 'FOCO',
    badgeColor: 'bg-violet-100 text-violet-700 border-violet-200',
    accentColor: '#7c3aed',
    tagline: 'Company manages operations while you focus on ownership and returns.',
    overview:
      'In the FOCO model, you invest in and own the franchise unit, but the franchisor\u2019s central team handles all day-to-day operations \u2014 staffing, quality control, and customer experience. You earn returns without being involved in daily management.',
    howItWorks: [
      'You provide the capital and own the franchise unit',
      'Franchisor deploys an operations team to run the outlet',
      'You receive regular performance reports and profit distributions',
      'Brand maintains quality standards across all units',
    ],
    investment: '₹15L – ₹50L',
    whoShouldChoose:
      'Ideal for passive investors, working professionals, or HNIs who want franchise returns without operational involvement.',
    pros: [
      'Truly passive income — no daily involvement needed',
      'Brand expertise drives operational quality',
      'Lower personal risk from management errors',
      'Scalable — own multiple units simultaneously',
    ],
    considerations: [
      'Lower control over day-to-day decisions',
      'Returns depend on franchisor\u2019s operational efficiency',
      'Management fees reduce net margins',
    ],
  },
  FOFO: {
    badge: 'FOFO',
    badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    accentColor: '#059669',
    tagline: 'You own and run the business with full control and higher involvement.',
    overview:
      'In the FOFO model, you own the franchise unit and manage all operations yourself using the franchisor\u2019s proven systems, brand, and support. This gives you maximum control and higher profit potential in exchange for active involvement.',
    howItWorks: [
      'You invest capital and take ownership of the franchise unit',
      'Franchisor provides brand license, SOPs, and training',
      'You hire, manage staff, and run daily operations',
      'Ongoing support from franchisor for marketing and systems',
    ],
    investment: '₹20L – ₹80L',
    whoShouldChoose:
      'Best for entrepreneurs, ex-professionals, or business-minded individuals who want hands-on ownership with a proven brand behind them.',
    pros: [
      'Full operational control and decision-making authority',
      'Higher profit margins — no management fee to franchisor',
      'Direct relationship with customers and team',
      'Faster adaptation to local market needs',
    ],
    considerations: [
      'Requires significant time and personal involvement',
      'Operational success depends on your management skills',
      'Higher personal workload, especially in early stages',
    ],
  },
  FICO: {
    badge: 'FICO',
    badgeColor: 'bg-orange-100 text-orange-700 border-orange-200',
    accentColor: '#ea580c',
    tagline: 'You invest capital while the company handles execution and operations.',
    overview:
      'In the FICO model, the franchisor owns and operates the outlet while you act as a pure financial investor. You provide the capital for expansion and receive a fixed or revenue-linked return, with full transparency on performance.',
    howItWorks: [
      'You commit capital as a franchise investor',
      'Franchisor owns, sets up, and operates the unit entirely',
      'You receive periodic returns based on agreed terms',
      'Transparent reporting on revenue, costs, and performance',
    ],
    investment: '₹10L – ₹40L',
    whoShouldChoose:
      'Perfect for investors seeking structured returns without any operational role — similar to a business investment with brand-backed security.',
    pros: [
      'Zero operational involvement required',
      'Structured, predictable return framework',
      'Brand accountability for performance outcomes',
      'Low entry barrier with defined exit options',
    ],
    considerations: [
      'No ownership of the physical franchise unit',
      'Returns are capped by the agreed investment structure',
      'Less flexibility to influence business decisions',
    ],
  },
};

// ── Franchise Model Modal ─────────────────────────────────────────────────────
function FranchiseModelModal({ model, onClose }) {
  const details = MODEL_DETAILS[model.code];
  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    onClose();
  };

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!details) return null;

  const modal = (
    /* ── Full-screen backdrop — always fixed to viewport ── */
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(11,15,25,0.55)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      {/* ── Modal panel — centered, never affected by scroll ── */}
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '780px',
          maxHeight: '85vh',
          backgroundColor: '#fff',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(11,15,25,0.22), 0 0 0 1px rgba(11,15,25,0.06)',
          animation: 'modalIn 0.22s cubic-bezier(0.22,1,0.36,1) both',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Scrollable inner wrapper — clips inside the rounded container ── */}
        <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* ── HEADER ── */}
        <div className="flex items-start justify-between gap-4 px-8 pt-8 pb-6 border-b border-slate-100 shrink-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${details.badgeColor}`}>
                {details.badge}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0b0f19] leading-tight mb-1">
              {model.title}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">{details.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors duration-150 mt-0.5"
            aria-label="Close modal"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── BODY ── */}
        <div className="px-8 py-6 space-y-7 flex-1">

          {/* Overview */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: details.accentColor + '15' }}>
                <svg className="w-4 h-4" fill="none" stroke={details.accentColor} viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-[#0b0f19] uppercase tracking-wider">Overview</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed pl-[2.375rem]">{details.overview}</p>
          </div>

          {/* How it Works */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: details.accentColor + '15' }}>
                <svg className="w-4 h-4" fill="none" stroke={details.accentColor} viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-[#0b0f19] uppercase tracking-wider">How It Works</h3>
            </div>
            <ul className="pl-[2.375rem] space-y-2">
              {details.howItWorks.map((step, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white mt-0.5" style={{ backgroundColor: details.accentColor }}>
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {/* Investment + Who Should Choose — 2 col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke={details.accentColor} viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Investment Range</span>
              </div>
              <p className="text-2xl font-extrabold text-[#0b0f19]">{details.investment}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke={details.accentColor} viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Who Should Choose</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{details.whoShouldChoose}</p>
            </div>
          </div>

          {/* Pros + Considerations — 2 col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-[#0b0f19] uppercase tracking-wider">Pros</h3>
              </div>
              <ul className="space-y-2">
                {details.pros.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-[#0b0f19] uppercase tracking-wider">Considerations</h3>
              </div>
              <ul className="space-y-2">
                {details.considerations.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01" />
                    </svg>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="flex items-center justify-between gap-3 px-8 py-5 border-t border-slate-100 bg-slate-50/60 rounded-b-[20px] shrink-0">
          <button
            onClick={() => navigateTo('/franchise-opportunities')}
            className="text-sm font-semibold text-slate-600 hover:text-[#0b0f19] transition-colors duration-150 underline underline-offset-2"
          >
            Compare Models
          </button>
          <button
            onClick={() => navigateTo('/contact')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
            style={{ backgroundColor: details.accentColor, boxShadow: `0 4px 14px ${details.accentColor}40` }}
          >
            Book Consultation
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M8 12h9" />
            </svg>
          </button>
        </div>
        </div>{/* ── end inner scrollable wrapper ── */}
      </div>
    </div>
  );

  // Render into document.body — completely outside card/section DOM tree
  return createPortal(modal, document.body);
}

function FranchiseModelCard({ model, visible, delayMs }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {modalOpen && (
        <FranchiseModelModal model={model} onClose={() => setModalOpen(false)} />
      )}
      <article
        className={`group flex h-full min-h-[520px] flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,23,42,0.15)] ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
        style={{ transitionDelay: `${delayMs}ms` }}
      >
        {/* IMAGE SECTION */}
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={model.image}
            alt={model.title}
            className="h-56 w-full object-cover transition-all duration-300 group-hover:scale-105"
            loading="lazy"
            onLoad={(e) => { e.target.classList.add('loaded'); e.target.classList.remove('loading'); }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.classList.add('loaded');
              e.target.classList.remove('loading');
              const fallbackImages = {
                'Food & Beverage': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
                'Health & Wellness': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80',
                'Home Services': 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80',
                'Education': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
                'Technology': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
                'Retail': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
                'Entertainment': 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80',
              };
              let category = 'Food & Beverage';
              if (model.title.toLowerCase().includes('company') || model.title.toLowerCase().includes('operated')) category = 'Business Services';
              else if (model.title.toLowerCase().includes('invested') || model.title.toLowerCase().includes('invest')) category = 'Financial Services';
              e.target.src = fallbackImages[category] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=600&q=80';
            }}
          />
        </div>

        {/* CONTENT SECTION */}
        <div className="flex flex-col flex-1 p-6">
          <div className="h-16 flex items-start">
            <h3 className="text-xl font-bold leading-tight tracking-tight text-[#0b0f19] line-clamp-2">
              {model.title}
            </h3>
          </div>
          <div className="flex-1">
            <p className="text-sm leading-relaxed text-slate-500 line-clamp-3">
              {model.description}
            </p>
          </div>

          {/* CTA — only these buttons are interactive */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                window.history.pushState({}, '', `/franchise/${model.slug}`);
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="flex-1 rounded-xl bg-[#0B1220] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1a2332] hover:shadow-lg hover:-translate-y-0.5"
            >
              Explore
            </button>
            <button
              type="button"
              data-action="open-modal"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#0B1220] transition-all duration-300 hover:border-[#0B1220] hover:bg-slate-50"
            >
              Learn more
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M8 12h9" />
              </svg>
            </button>
          </div>
        </div>
      </article>
    </>
  );
}

function TestimonialStatCard({ item }) {
  return (
    <article className="rounded-[18px] border border-[rgba(0,0,0,0.06)] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-3">
        <img src={item.avatar} alt={item.name} className="h-10 w-10 rounded-full object-cover" loading="lazy" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-800">{item.name}</p>
          <p className="text-xs text-slate-500">{item.role}</p>
        </div>
      </div>
      {item.rating && (
        <div className="mt-4 flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} />
          ))}
        </div>
      )}
      <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.quote}</p>
    </article>
  );
}

function FranchiseCard({ franchise }) {
  const badgeColors = {
    green: 'bg-emerald-500 text-white',
    orange: 'bg-amber-500 text-white',
    blue: 'bg-blue-500 text-white'
  };

  const handleCardClick = () => {
    // Navigate to dedicated franchise page by slug
    console.log('Navigating to franchise page:', franchise.slug);
    window.history.pushState({}, '', `/franchise/${franchise.slug}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <article 
      onClick={handleCardClick}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,23,42,0.15)] cursor-pointer"
    >
      {/* Image with Badge */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={franchise.image}
          alt={franchise.title}
          className="h-48 w-full object-cover transition-all duration-300 group-hover:scale-105"
          loading="lazy"
          onLoad={(e) => {
            e.target.classList.add('loaded');
            e.target.classList.remove('loading');
          }}
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.classList.add('loaded');
            e.target.classList.remove('loading');
            // Fallback to category-specific images based on franchise type
            const fallbackImages = {
              'Food & Beverage': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
              'Health & Wellness': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80',
              'Home Services': 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80',
              'Education': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
              'Technology': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
              'Retail': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
              'Entertainment': 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80'
            };
            // Determine category based on franchise title or use default
            let category = 'Food & Beverage'; // default
            if (franchise.title.toLowerCase().includes('gym') || franchise.title.toLowerCase().includes('fitness') || franchise.title.toLowerCase().includes('spa') || franchise.title.toLowerCase().includes('yoga')) {
              category = 'Health & Wellness';
            } else if (franchise.title.toLowerCase().includes('clean') || franchise.title.toLowerCase().includes('repair') || franchise.title.toLowerCase().includes('care')) {
              category = 'Home Services';
            } else if (franchise.title.toLowerCase().includes('education') || franchise.title.toLowerCase().includes('tutor') || franchise.title.toLowerCase().includes('academy') || franchise.title.toLowerCase().includes('learn')) {
              category = 'Education';
            } else if (franchise.title.toLowerCase().includes('tech') || franchise.title.toLowerCase().includes('code')) {
              category = 'Technology';
            } else if (franchise.title.toLowerCase().includes('game') || franchise.title.toLowerCase().includes('entertainment')) {
              category = 'Entertainment';
            } else if (franchise.title.toLowerCase().includes('salon') || franchise.title.toLowerCase().includes('store') || franchise.title.toLowerCase().includes('mart') || franchise.title.toLowerCase().includes('shop')) {
              category = 'Retail';
            }
            e.target.src = fallbackImages[category] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=600&q=80';
          }}
        />
        <div className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${badgeColors[franchise.badge.color]}`}>
          {franchise.badge.text}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title and Description */}
        <h3 className="text-xl font-bold tracking-tight text-[#0b0f19]">{franchise.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{franchise.description}</p>

        {/* Tags Row */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            {franchise.tags.investment}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            {franchise.tags.model}
          </span>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            {franchise.tags.expansion}
          </span>
        </div>

        {/* Metrics Row */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs font-medium text-slate-500">ROI</p>
            <p className="text-lg font-bold text-[#0b0f19]">{franchise.metrics.roi}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs font-medium text-slate-500">Payback</p>
            <p className="text-lg font-bold text-[#0b0f19]">{franchise.metrics.payback}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="font-medium text-slate-500">Industry</p>
            <p className="text-slate-800">{franchise.details.industry}</p>
          </div>
          <div>
            <p className="font-medium text-slate-500">Segment</p>
            <p className="text-slate-800">{franchise.details.segment}</p>
          </div>
          <div>
            <p className="font-medium text-slate-500">Investment</p>
            <p className="text-slate-800">{franchise.details.investment}</p>
          </div>
          <div>
            <p className="font-medium text-slate-500">Space</p>
            <p className="text-slate-800">{franchise.details.space}</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-auto pt-5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              console.log('View Details clicked - navigating to franchise page:', franchise.slug);
              window.history.pushState({}, '', `/franchise/${franchise.slug}`);
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="w-full rounded-full bg-[#0B1220] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#0B1220]/25"
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}

function ContactIcon({ type }) {
  if (type === 'phone') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-slate-200">
        <path
          d="M4.5 4.5h4l1.8 4.2-2.1 2.1a15.4 15.4 0 0 0 5 5l2.1-2.1 4.2 1.8v4A1.6 1.6 0 0 1 18 21C10.3 21 3 13.7 3 6A1.6 1.6 0 0 1 4.5 4.5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (type === 'location') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-slate-200">
        <path
          d="M12 21s6-5.6 6-11a6 6 0 1 0-12 0c0 5.4 6 11 6 11z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-slate-200">
      <path
        d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m5 8 7 5 7-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactSection() {
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-[28px] md:rounded-[32px] border border-emerald-300/20 bg-[radial-gradient(circle_at_50%_30%,rgba(16,185,129,0.16),transparent_50%),linear-gradient(130deg,#020506_0%,#051414_48%,#020506_100%)] px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 lg:py-12 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(52,211,153,0.18),transparent_42%)]" />
        <div className="pointer-events-none absolute -left-12 top-16 h-[1px] w-52 bg-gradient-to-r from-transparent via-emerald-200/35 to-transparent hidden sm:block" />
        <div className="pointer-events-none absolute right-6 top-10 h-36 w-36 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 right-16 h-24 w-[260px] bg-[linear-gradient(90deg,transparent,rgba(167,243,208,0.18),transparent)] blur-sm hidden sm:block" />
        <p className="pointer-events-none absolute left-1/2 top-7 -translate-x-1/2 text-[clamp(2rem,10vw,5.125rem)] font-black tracking-[0.2em] text-emerald-100/5 blur-[1px]">
          CONTACT
        </p>

        <div className="relative grid gap-6 sm:gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-4 sm:space-y-5">
            <span className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-emerald-50 backdrop-blur-md">
              Contact
            </span>
            <h2 className="text-[clamp(1.75rem,8vw,3rem)] font-extrabold tracking-tight text-white leading-tight">Get in touch</h2>
            <p className="max-w-[440px] text-sm sm:text-base font-medium leading-relaxed text-emerald-50/75">
              Have questions or ready to transform your business with our franchise solutions?
            </p>

            <div className="space-y-3 sm:space-y-4 pt-2">
              {contactItems.map((item) => (
                <article
                  key={item.title}
                  className="group flex items-center justify-between rounded-xl sm:rounded-2xl border border-white/15 bg-white/10 p-3 sm:p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-emerald-200/35 hover:bg-white/15 hover:shadow-[0_10px_28px_rgba(16,185,129,0.14)]"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    <span className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <ContactIcon type={item.icon} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-emerald-100/70">{item.title}</p>
                      <p className="mt-0.5 text-sm sm:text-base font-semibold text-white truncate">{item.value}</p>
                    </div>
                  </div>
                  <span className="ml-2 text-emerald-200/60 opacity-0 transition duration-200 group-hover:opacity-100 shrink-0">
                    ?
                  </span>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-5 md:p-6 backdrop-blur-md">
            <form className="space-y-3 sm:space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-lg sm:rounded-xl border border-white/15 bg-black/25 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-slate-300/70 outline-none transition duration-200 focus:border-emerald-200/40 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.14)]"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-lg sm:rounded-xl border border-white/15 bg-black/25 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-slate-300/70 outline-none transition duration-200 focus:border-emerald-200/40 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.14)]"
              />
              <input
                type="url"
                placeholder="Website"
                className="w-full rounded-lg sm:rounded-xl border border-white/15 bg-black/25 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-slate-300/70 outline-none transition duration-200 focus:border-emerald-200/40 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.14)]"
              />
              <input
                type="tel"
                placeholder="Contact Number"
                className="w-full rounded-lg sm:rounded-xl border border-white/15 bg-black/25 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-slate-300/70 outline-none transition duration-200 focus:border-emerald-200/40 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.14)]"
              />
              <textarea
                placeholder="Message"
                rows={5}
                className="w-full resize-none rounded-lg sm:rounded-xl border border-white/15 bg-black/25 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-slate-300/70 outline-none transition duration-200 focus:border-emerald-200/40 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.14)]"
              />
              <button
                type="submit"
                className="w-full rounded-lg sm:rounded-xl bg-white px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-bold text-[#091115] transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-50 hover:shadow-[0_12px_25px_rgba(255,255,255,0.2)]"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Franchise Education Card -------------------------------------------------

function FranchiseEduCard({ card, index }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [activeSrc, setActiveSrc] = useState(card.img);
  const [fallbackIdx, setFallbackIdx] = useState(0);

  // Force-trigger load: if the browser already cached the image,
  // onLoad won't fire � so we check naturalWidth after mount.
  const imgRef = useRef(null);
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setImgLoaded(true);
    }
  }, [activeSrc]);

  const handleError = () => {
    const next = fallbackIdx + 1;
    if (card.fallbackImgs && next < card.fallbackImgs.length) {
      setFallbackIdx(next);
      setActiveSrc(card.fallbackImgs[next]);
      setImgLoaded(false);
    } else {
      setImgError(true);
    }
  };

  return (
    <Reveal delay={index * 0.06} className="group bg-white rounded-[28px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image container � fixed height, consistent ratio */}
      <div className="relative h-48 sm:h-52 overflow-hidden shrink-0 bg-slate-100">
        {/* Skeleton shimmer shown while loading */}
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 animate-pulse" />
        )}
        {/* Fallback gradient on total failure */}
        {imgError && (
          <div className={`absolute inset-0 bg-gradient-to-br ${card.fallback} flex items-center justify-center`}>
            <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {!imgError && (
          <img
            ref={imgRef}
            src={activeSrc}
            alt={card.alt}
            loading="eager"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            onError={handleError}
            className={`w-full h-full object-cover object-center transition-opacity duration-500 group-hover:scale-105 transition-transform ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
        {/* Bottom gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-3">
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${card.badgeColor}`}>
            {card.badgeIcon}
            {card.badge}
          </span>
        </div>
        <h3 className="text-base sm:text-[17px] font-extrabold text-[#0b0f19] mb-3 leading-snug">
          {card.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed flex-1">
          {card.body}
        </p>
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-start gap-2">
          <svg className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-slate-400 leading-relaxed italic">{card.why}</p>
        </div>
      </div>
    </Reveal>
  );
}

// --- Market Intelligence Section ---------------------------------------------

function useCountUp(target, active, duration = 1600) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    let frameId; let start;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [active, target, duration]);
  return count;
}

// -- Dataset definitions ------------------------------------------------------
const CHART_DATASETS = {
  Monthly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    bars:   [42, 48, 55, 51, 60, 67, 63, 72, 78, 74, 85, 92],
    line:   [30, 36, 44, 40, 52, 58, 55, 65, 70, 67, 80, 88],
  },
  Quarterly: {
    labels: ["Q1'21", "Q2'21", "Q3'21", "Q4'21", "Q1'22", "Q2'22", "Q3'22", "Q4'22", "Q1'23", "Q2'23", "Q3'23", "Q4'23"],
    bars:   [38, 45, 52, 61, 58, 70, 78, 85, 80, 90, 95, 100],
    line:   [28, 35, 42, 50, 48, 58, 65, 72, 68, 80, 88, 96],
  },
  Yearly: {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024E', '2025E'],
    bars:   [28, 36, 30, 52, 68, 82, 90, 100],
    line:   [20, 28, 22, 44, 60, 76, 86, 96],
  },
};

const CATEGORIES = [
  { name: 'Food & Beverage', pct: 25, color: '#7c3aed' }, // 6 out of 24 = 25%
  { name: 'Home Services',   pct: 25, color: '#3b82f6' }, // 6 out of 24 = 25%
  { name: 'Health & Wellness', pct: 21, color: '#10b981' }, // 5 out of 24 = 21%
  { name: 'Retail',          pct: 17, color: '#f97316' }, // 4 out of 24 = 17%
  { name: 'Education',       pct: 12, color: '#f43f5e' }, // 3 out of 24 = 12%
];

const SOURCES = ['IFA', 'KPMG', 'Franchise India', 'Statista', 'Deloitte', 'Industry Reports'];

// -- Donut chart --------------------------------------------------------------
function DonutChart({ active }) {
  const r = 48; const cx = 64; const cy = 64;
  const circ = 2 * Math.PI * r;
  const [filled, setFilled] = useState(0);
  useEffect(() => {
    if (!active) {
      setFilled(0);
      return;
    }
    let frameId; let start;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1400, 1);
      setFilled(Math.floor(72 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) { frameId = requestAnimationFrame(tick); }
      else { setFilled(72); }
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [active]);
  const dash = (circ * filled) / 100;
  return (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <defs>
        <linearGradient id="dg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth="16" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#dg)" strokeWidth="16"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`} />
      <text x={cx} y={cy - 5} textAnchor="middle"
        style={{ fontSize: 20, fontWeight: 800, fill: '#0b0f19', fontFamily: 'inherit' }}>
        {filled}%
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle"
        style={{ fontSize: 8, fill: '#94a3b8', fontWeight: 700, letterSpacing: 1, fontFamily: 'inherit' }}>
        FRANCHISE
      </text>
    </svg>
  );
}

// -- Bar + line chart ---------------------------------------------------------
function BarLineChart({ dataset, active }) {
  const [tooltip, setTooltip] = useState(null);
  const { labels, bars, line } = dataset;
  const yTicks = [100, 75, 50, 25, 0];

  return (
    <div className="relative h-52 sm:h-56 select-none">
      {/* Y-axis */}
      <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between pr-1.5">
        {yTicks.map((v) => (
          <span key={v} className="text-[9px] text-slate-300 font-medium w-5 text-right leading-none">{v}</span>
        ))}
      </div>

      {/* Grid */}
      <div className="absolute left-7 right-0 top-0 bottom-6 pointer-events-none">
        {yTicks.map((_, i) => (
          <div key={i} className="absolute w-full border-t border-slate-100"
            style={{ top: `${(i / (yTicks.length - 1)) * 100}%` }} />
        ))}
      </div>

      {/* Bars */}
      <div className="absolute left-7 right-0 top-0 bottom-6 flex items-end gap-1">
        {bars.map((val, i) => (
          <div key={`${labels[i]}-${i}`}
            className="relative flex-1 flex flex-col items-center group/bar cursor-pointer"
            onMouseEnter={() => setTooltip({ i, val, label: labels[i] })}
            onMouseLeave={() => setTooltip(null)}
          >
            {tooltip?.i === i && (
              <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 z-20
                bg-[#0b0f19] text-white text-[10px] font-bold px-2 py-1 rounded-lg
                whitespace-nowrap shadow-xl pointer-events-none">
                {labels[i]}: {val}%
                <div className="absolute top-full left-1/2 -translate-x-1/2
                  border-[3px] border-transparent border-t-[#0b0f19]" />
              </div>
            )}
            <div
              className="w-full rounded-t-[3px] bg-gradient-to-t from-violet-500/90 to-violet-400/60
                group-hover/bar:from-violet-600 group-hover/bar:to-violet-500 transition-colors duration-150"
              style={{
                height: active ? `${val}%` : '2px',
                transition: `height 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s`,
              }}
            />
          </div>
        ))}
      </div>

      {/* SVG line overlay */}
      <svg className="absolute pointer-events-none overflow-visible"
        style={{ left: '1.75rem', top: 0, width: 'calc(100% - 1.75rem)', height: 'calc(100% - 1.5rem)' }}
        preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="lg2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <polyline
          points={line.map((v, i) => `${(i / (line.length - 1)) * 100},${100 - v}`).join(' ')}
          fill="none" stroke="url(#lg2)" strokeWidth="1.6"
          strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray="220" strokeDashoffset={active ? '0' : '220'}
          style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(0.22,1,0.36,1) 0.25s' }}
        />
        {line.map((v, i) => (
          <circle key={i} cx={(i / (line.length - 1)) * 100} cy={100 - v} r="1.4"
            fill="#f59e0b" opacity={active ? 1 : 0}
            style={{ transition: `opacity 0.25s ease ${0.25 + i * 0.08}s` }} />
        ))}
      </svg>

      {/* X-axis labels */}
      <div className="absolute left-7 right-0 bottom-0 flex justify-between">
        {labels.map((l) => (
          <span key={l} className="text-[8px] sm:text-[9px] text-slate-300 font-medium flex-1 text-center leading-none">{l}</span>
        ))}
      </div>
    </div>
  );
}

/* -- Legacy sub-components kept for reference but replaced above -- */
function NodeGraph({ active }) {
  const nodes = [
    { x: 50, y: 50, r: 7, delay: 0 },
    { x: 20, y: 25, r: 4, delay: 0.3 },
    { x: 78, y: 22, r: 5, delay: 0.6 },
    { x: 15, y: 68, r: 4, delay: 0.9 },
    { x: 82, y: 65, r: 6, delay: 0.4 },
    { x: 50, y: 85, r: 4, delay: 0.7 },
    { x: 35, y: 48, r: 3, delay: 1.1 },
    { x: 65, y: 42, r: 3, delay: 0.2 },
  ];
  const edges = [
    [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,6],[2,7],[3,5],[4,5],
  ];
  return (
    <div className="relative w-full h-36">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Edges */}
        {edges.map(([a, b], i) => (
          <line key={i}
            x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
            stroke="#7c3aed" strokeWidth="0.5" strokeOpacity="0.25"
          />
        ))}
        {/* Nodes */}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={n.r + 3} fill="#7c3aed" fillOpacity="0.08">
              {active && (
                <animate attributeName="r" values={`${n.r+3};${n.r+6};${n.r+3}`}
                  dur="2.4s" begin={`${n.delay}s`} repeatCount="indefinite" />
              )}
            </circle>
            <circle cx={n.x} cy={n.y} r={n.r} fill="url(#ng)" />
          </g>
        ))}
        {/* Travelling pulse dot */}
        {active && (
          <circle r="1.8" fill="#a78bfa">
            <animateMotion dur="3s" repeatCount="indefinite" path="M50,50 L20,25 L78,22 L82,65 L50,85 L15,68 L50,50" />
          </circle>
        )}
        <defs>
          <radialGradient id="ng" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#7c3aed" />
          </radialGradient>
        </defs>
      </svg>
      {/* Signal badge */}
      <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-violet-50 border border-violet-100 rounded-full px-2.5 py-1">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet-500" />
        </span>
        <span className="text-[10px] font-bold text-violet-700">+34% Growth Signal</span>
      </div>
    </div>
  );
}

/* Card 2 � Opportunity Gauge */
function OpportunityGauge({ active }) {
  const [angle, setAngle] = useState(0);
  const targetAngle = 210; // ~70% of 300deg arc
  useEffect(() => {
    if (!active) return;
    let start;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1600, 1);
      setAngle(Math.floor(targetAngle * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active]);

  // Arc from -150deg to +150deg (300deg total), needle at `angle` from start
  const cx = 60; const cy = 62; const r = 44;
  const startDeg = -210; // left end
  const needleDeg = startDeg + angle;
  const toRad = (d) => (d * Math.PI) / 180;
  const nx = cx + (r - 6) * Math.cos(toRad(needleDeg));
  const ny = cy + (r - 6) * Math.sin(toRad(needleDeg));

  const arcPath = (start, end, radius) => {
    const s = { x: cx + radius * Math.cos(toRad(start)), y: cy + radius * Math.sin(toRad(start)) };
    const e = { x: cx + radius * Math.cos(toRad(end)),   y: cy + radius * Math.sin(toRad(end)) };
    const large = end - start > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${large} 1 ${e.x} ${e.y}`;
  };

  const zones = [
    { label: 'Saturated', color: '#f43f5e', start: -210, end: -110 },
    { label: 'Emerging',  color: '#f59e0b', start: -110, end: -10  },
    { label: 'High Demand', color: '#10b981', start: -10, end: 90  },
  ];

  return (
    <div className="relative w-full h-36 flex flex-col items-center">
      <svg viewBox="0 0 120 80" className="w-full h-28" preserveAspectRatio="xMidYMid meet">
        {/* Zone arcs */}
        {zones.map((z) => (
          <path key={z.label} d={arcPath(z.start, z.end, 44)}
            fill="none" stroke={z.color} strokeWidth="6" strokeOpacity="0.25" strokeLinecap="round" />
        ))}
        {/* Active arc */}
        <path d={arcPath(-210, startDeg + angle, 44)}
          fill="none" stroke="url(#gaugeGrad)" strokeWidth="6" strokeLinecap="round" />
        {/* Needle */}
        <line x1={cx} y1={cy} x2={nx} y2={ny}
          stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="3" fill="#7c3aed" />
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>
      {/* Zone labels */}
      <div className="flex items-center gap-3 -mt-2">
        {zones.map((z) => (
          <div key={z.label} className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: z.color }} />
            <span className="text-[9px] font-semibold text-slate-500">{z.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Card 3 � Benchmark Speedometer bars */
function BenchmarkBars({ active }) {
  const segments = [
    { label: 'Food & Bev',  score: 88, color: '#7c3aed' },
    { label: 'Retail',      score: 72, color: '#3b82f6' },
    { label: 'Education',   score: 65, color: '#10b981' },
    { label: 'Wellness',    score: 58, color: '#f97316' },
  ];
  return (
    <div className="w-full space-y-2.5 pt-1">
      {segments.map((s, i) => (
        <div key={s.label}>
          <div className="flex justify-between mb-1">
            <span className="text-[11px] font-semibold text-slate-600">{s.label}</span>
            <span className="text-[11px] font-bold text-slate-800">{s.score}</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700"
              style={{
                width: active ? `${s.score}%` : '0%',
                background: s.color,
                transitionDelay: `${0.3 + i * 0.12}s`,
              }}
            />
          </div>
        </div>
      ))}
      {/* Dial indicator */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[10px] text-slate-400 font-medium">Scalability Index</span>
        <span className="text-[11px] font-bold text-violet-600">
          {active ? '? Optimised' : '�'}
        </span>
      </div>
    </div>
  );
}

/* Card 4 � Investor Signal Stream */
function InvestorSignals({ active }) {
  const signals = [
    {
      icon: (
        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      text: 'Retail interest rising in Pune',
      time: '2m ago',
      color: 'bg-blue-50 border-blue-100',
      iconBg: 'bg-blue-100',
    },
    {
      icon: (
        <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: 'Food demand trending in Tier 2',
      time: '5m ago',
      color: 'bg-orange-50 border-orange-100',
      iconBg: 'bg-orange-100',
    },
    {
      icon: (
        <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      text: 'Education sector gaining traction',
      time: '9m ago',
      color: 'bg-emerald-50 border-emerald-100',
      iconBg: 'bg-emerald-100',
    },
    {
      icon: (
        <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      text: 'Wellness brands expanding fast',
      time: '14m ago',
      color: 'bg-violet-50 border-violet-100',
      iconBg: 'bg-violet-100',
    },
  ];
  return (
    <div className="w-full space-y-2 pt-1">
      {signals.map((s, i) => (
        <div
          key={i}
          className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 ${s.color} transition-all duration-500`}
          style={{
            opacity: active ? 1 : 0,
            transform: active ? 'translateX(0)' : 'translateX(-12px)',
            transitionDelay: `${0.2 + i * 0.15}s`,
          }}
        >
          <div className={`w-7 h-7 rounded-lg ${s.iconBg} flex items-center justify-center shrink-0`}>
            {s.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-slate-700 leading-snug truncate">{s.text}</p>
            <p className="text-[10px] text-slate-400">{s.time}</p>
          </div>
          <span className="relative shrink-0 flex h-2 w-2">
            {active && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />}
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
        </div>
      ))}
    </div>
  );
}

// -- Main section -------------------------------------------------------------
function MarketIntelligenceSection() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const [tab, setTab] = useState('Quarterly');

  // Calculate REAL data from franchise opportunities
  const totalFranchises = franchiseOpportunities.length; // 24
  const totalCities = getTotalCities(); // 8
  const avgROI = getAverageROI(); // Average ROI
  const growthMetrics = calculateGrowthMetrics(); // Recent growth

  const marketSize = useCountUp(totalFranchises, active, 1800); // Real: 24 franchises
  const cagr       = useCountUp(avgROI,  active, 1400); // Real: Average ROI
  const cities     = useCountUp(totalCities, active, 1600); // Real: 8 cities
  const investors  = useCountUp(growthMetrics.growthRate,  active, 1500); // Real: Growth rate

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        // Toggle active on every enter/leave � animations replay each time
        setActive(e.isIntersecting);
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const kpis = [
    { label: 'Total Franchises',     value: `${marketSize}`, sub: 'Verified opportunities',   dotColor: '#7c3aed' },
    { label: 'Average ROI',     value: `${cagr}%`,             sub: 'Across all brands',   dotColor: '#10b981' },
    { label: 'Active Cities', value: `${cities}`,            sub: 'Pan India coverage', dotColor: '#3b82f6' },
    { label: 'Recent Growth',  value: `${investors}%`,         sub: 'Last 3 months',  dotColor: '#f97316' },
  ];

  const dataset = CHART_DATASETS[tab];

  // Build smooth cubic bezier SVG path
  const buildPath = (pts, close = false) => {
    if (!pts.length) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const cp1x = pts[i - 1].x + (pts[i].x - pts[i - 1].x) * 0.4;
      const cp1y = pts[i - 1].y;
      const cp2x = pts[i].x - (pts[i].x - pts[i - 1].x) * 0.4;
      const cp2y = pts[i].y;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pts[i].x} ${pts[i].y}`;
    }
    if (close) {
      d += ` L ${pts[pts.length - 1].x} 100 L ${pts[0].x} 100 Z`;
    }
    return d;
  };

  const linePoints = dataset.line.map((v, i) => ({
    x: (i / (dataset.line.length - 1)) * 100,
    y: 100 - v,
  }));

  return (
    <section ref={ref} className="w-full bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Compact Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 shadow-sm rounded-full px-4 py-1.5 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">India Franchise Market Intelligence</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0b0f19] leading-tight mb-2">
            Inside India&apos;s Franchise Growth Engine
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            Real-time market insights, investor patterns, and expansion trends shaping India&apos;s franchise future.
          </p>
        </div>

        {/* Live ticker - Reversed Animation (Right to Left) */}
        <div className="mb-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 px-4 py-2">
            <span className="shrink-0 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              Live
            </span>
            {/* Fade edges */}
            <div className="relative overflow-hidden flex-1">
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10" />
              {/* Duplicated text for seamless RIGHT→LEFT loop */}
              <div className="flex w-max animate-marquee-left">
                {[0, 1].map((n) => (
                  <p key={n} className="text-xs text-slate-600 font-medium whitespace-nowrap pr-16">
                    24 verified franchise opportunities across India &nbsp;&middot;&nbsp;
                    Operating in 8 major cities including Mumbai, Delhi, Bengaluru &nbsp;&middot;&nbsp;
                    Average ROI of 34% across all franchise brands &nbsp;&middot;&nbsp;
                    Food & Beverage and Home Services leading with 25% market share each &nbsp;&middot;&nbsp;
                    Investment opportunities starting from &#8377;25K to &#8377;350K &nbsp;&middot;&nbsp;
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Compact KPI stat tiles - No hover effects */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {kpis.map((k, i) => (
            <div
              key={k.label}
              className="bg-white rounded-xl border border-slate-100 shadow-sm px-4 py-3"
              style={{
                opacity: active ? 1 : 0.4,
                transform: active ? 'translateY(0)' : 'translateY(8px)',
                transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
              }}
            >
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">{k.label}</p>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: k.dotColor }} />
                <p className="text-xl font-extrabold text-[#0b0f19] tabular-nums leading-none">{k.value}</p>
              </div>
              <p className="text-[10px] text-slate-400">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Premium Main dashboard card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_280px]">

            {/* LEFT – Premium Chart panel */}
            <div className="p-5 border-b lg:border-b-0 lg:border-r border-slate-100">

              {/* Chart header row */}
              <div className="flex items-start justify-between mb-4 gap-3 flex-wrap">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-0.5">Revenue Growth Index</p>
                  <p className="text-sm font-extrabold text-[#0b0f19]">India Franchise Market Expansion</p>
                </div>
                {/* More prominent tab buttons */}
                <div className="flex items-center gap-1 bg-slate-50 rounded-xl p-1 border border-slate-200 shadow-sm shrink-0">
                  {['Monthly', 'Quarterly', 'Yearly'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`text-xs font-bold px-4 py-2 rounded-lg transition-all duration-200 ${
                        tab === t
                          ? 'bg-gradient-to-br from-violet-600 to-violet-700 text-white shadow-md'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Professional Chart area with clear labels */}
              <div className="relative h-52 select-none">
                {/* Y-axis with percentage labels */}
                <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between pr-2 pointer-events-none">
                  {[100, 75, 50, 25, 0].map((v) => (
                    <span key={v} className="text-[10px] text-slate-400 font-medium w-7 text-right leading-none">{v}%</span>
                  ))}
                </div>

                {/* Grid lines - Professional stock style */}
                <div className="absolute left-9 right-0 top-0 bottom-8 pointer-events-none">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="absolute w-full border-t border-slate-100" style={{ top: `${(i / 4) * 100}%` }} />
                  ))}
                  {/* Vertical grid lines */}
                  {dataset.labels.map((_, i) => (
                    <div 
                      key={`vline-${i}`} 
                      className="absolute h-full border-l border-slate-50" 
                      style={{ left: `${(i / (dataset.labels.length - 1)) * 100}%` }} 
                    />
                  ))}
                </div>

                {/* SVG chart - Stock-style realistic line */}
                <svg
                  className="absolute top-0 pointer-events-none"
                  style={{ left: '2.25rem', width: 'calc(100% - 2.25rem)', height: 'calc(100% - 2rem)' }}
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    {/* Enhanced 3D Pipe gradients with more depth */}
                    <linearGradient id="miBarGrad3D" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#4c1d95" stopOpacity="0.5" />
                      <stop offset="15%" stopColor="#5b21b6" stopOpacity="0.75" />
                      <stop offset="35%" stopColor="#7c3aed" stopOpacity="0.95" />
                      <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
                      <stop offset="65%" stopColor="#7c3aed" stopOpacity="0.95" />
                      <stop offset="85%" stopColor="#5b21b6" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.5" />
                    </linearGradient>
                    {/* Top ellipse gradient - brighter for light reflection */}
                    <radialGradient id="miBarTop" cx="50%" cy="30%">
                      <stop offset="0%" stopColor="#c4b5fd" stopOpacity="1" />
                      <stop offset="40%" stopColor="#a78bfa" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.85" />
                    </radialGradient>
                    {/* Bottom ellipse gradient - darker for depth */}
                    <radialGradient id="miBarBottom" cx="50%" cy="70%">
                      <stop offset="0%" stopColor="#6d28d9" stopOpacity="0.9" />
                      <stop offset="60%" stopColor="#5b21b6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.7" />
                    </radialGradient>
                    <linearGradient id="miAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                    {/* Enhanced shadow filter for stronger 3D depth */}
                    <filter id="barShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="1.2"/>
                      <feOffset dx="1" dy="2" result="offsetblur"/>
                      <feComponentTransfer>
                        <feFuncA type="linear" slope="0.4"/>
                      </feComponentTransfer>
                      <feMerge>
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    {/* Inner shadow for depth */}
                    <filter id="innerShadow">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="0.5"/>
                      <feOffset dx="0" dy="1"/>
                      <feComposite operator="out" in="SourceGraphic"/>
                    </filter>
                  </defs>

                  {/* Premium 3D Pipe Bars with Enhanced Depth */}
                  {dataset.bars.map((val, i) => {
                    const bw = 100 / dataset.bars.length;
                    const x = i * bw + bw * 0.22;
                    const w = bw * 0.56;
                    const barH = active ? val : val * 0.3;
                    const topY = 100 - barH;
                    const ellipseRy = w * 0.18; // Larger ellipse for more 3D effect
                    
                    return (
                      <g key={`${tab}-bar-${i}`}>
                        {/* Bottom ellipse (base) - creates 3D bottom cap */}
                        <ellipse
                          cx={x + w / 2}
                          cy={100}
                          rx={w / 2}
                          ry={ellipseRy * 0.8}
                          fill="url(#miBarBottom)"
                          opacity="0.6"
                        />
                        
                        {/* Main pipe body with enhanced shadow */}
                        <g filter="url(#barShadow)">
                          {/* Pipe body with cylindrical gradient */}
                          <rect
                            x={x} 
                            y={topY + ellipseRy} 
                            width={w} 
                            height={barH - ellipseRy}
                            fill="url(#miBarGrad3D)"
                            style={{
                              transition: `height 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s, y 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s`,
                            }}
                          />
                          
                          {/* Strong highlight on left edge - light reflection */}
                          <rect
                            x={x + w * 0.08}
                            y={topY + ellipseRy}
                            width={w * 0.2}
                            height={barH - ellipseRy}
                            fill="white"
                            opacity="0.25"
                            rx="1"
                            style={{
                              transition: `height 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s, y 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s`,
                            }}
                          />
                          
                          {/* Strong shadow on right edge - depth */}
                          <rect
                            x={x + w - w * 0.22}
                            y={topY + ellipseRy}
                            width={w * 0.22}
                            height={barH - ellipseRy}
                            fill="black"
                            opacity="0.25"
                            rx="1"
                            style={{
                              transition: `height 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s, y 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s`,
                            }}
                          />
                          
                          {/* 3D Top cap (ellipse) with radial gradient */}
                          <ellipse
                            cx={x + w / 2}
                            cy={topY + ellipseRy}
                            rx={w / 2}
                            ry={ellipseRy}
                            fill="url(#miBarTop)"
                            style={{
                              transition: `cy 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s`,
                            }}
                          />
                          
                          {/* Top highlight - glossy effect */}
                          <ellipse
                            cx={x + w / 2}
                            cy={topY + ellipseRy * 0.7}
                            rx={w / 3}
                            ry={ellipseRy * 0.5}
                            fill="white"
                            opacity="0.3"
                            style={{
                              transition: `cy 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s`,
                            }}
                          />
                        </g>
                      </g>
                    );
                  })}

                  {/* Subtle area fill under line */}
                  <path d={buildPath(linePoints, true)} fill="url(#miAreaGrad)" />

                  {/* Realistic stock-style trend line - Clean green */}
                  <path
                    key={`${tab}-line`}
                    d={buildPath(linePoints)}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="200"
                    strokeDashoffset={active ? '0' : '200'}
                    style={{ 
                      transition: 'stroke-dashoffset 1.8s cubic-bezier(0.22,1,0.36,1) 0.4s',
                    }}
                  />

                  {/* Small dots on line - Stock style */}
                  {linePoints.map((pt, i) => (
                    <circle
                      key={`${tab}-dot-${i}`}
                      cx={pt.x} cy={pt.y} r="1.5"
                      fill="#10b981"
                      opacity={active ? 0.6 : 0}
                      style={{ 
                        transition: `opacity 0.3s ease ${0.6 + i * 0.08}s`,
                      }}
                    />
                  ))}
                </svg>

                {/* X-axis labels - Clear and visible */}
                <div className="absolute left-9 right-0 bottom-0 flex justify-between px-1">
                  {dataset.labels.map((l) => (
                    <span key={l} className="text-[10px] text-slate-500 font-semibold flex-1 text-center">{l}</span>
                  ))}
                </div>
              </div>

              {/* Useful insights below chart - No wasted space */}
              <div className="mt-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between gap-4">
                  {/* Legend */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-sm" style={{ background: 'linear-gradient(to top, #7c3aed, #a78bfa)' }} />
                      <span className="text-[10px] text-slate-500 font-medium">Market Growth</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-0.5 bg-emerald-500 rounded" />
                      <span className="text-[10px] text-slate-500 font-medium">CAGR Trend</span>
                    </div>
                  </div>
                  {/* Key insight */}
                  <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg">
                    <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[10px] font-bold text-emerald-700">+{avgROI}% Avg Growth</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT – Compact Donut + Category bars */}
            <div className="flex flex-col divide-y divide-slate-100">

              {/* Compact Donut */}
              <div className="p-4">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Investor Preference</p>
                <p className="text-xs font-bold text-[#0b0f19] mb-3">Franchise vs Independent</p>
                <div className="flex items-center gap-3">
                  <div className="w-[75px] h-[75px] shrink-0">
                    <DonutChart active={active} />
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: 'Franchise Model', pct: '72%', color: '#7c3aed' },
                      { label: 'Independent',     pct: '28%', color: '#e2e8f0' },
                    ].map((s) => (
                      <div key={s.label} className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
                        <div>
                          <p className="text-[10px] font-semibold text-slate-700 leading-tight">{s.label}</p>
                          <p className="text-[9px] text-slate-400">{s.pct}</p>
                        </div>
                      </div>
                    ))}
                    <p className="text-[9px] text-slate-400 italic">3&times; since 2020</p>
                  </div>
                </div>
              </div>

              {/* Compact Category bars */}
              <div className="p-4 flex-1">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Top Sectors</p>
                <p className="text-xs font-bold text-[#0b0f19] mb-3">Fastest Growing Categories</p>
                <div className="space-y-2.5">
                  {CATEGORIES.map((cat, i) => (
                    <div key={cat.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-semibold text-slate-600">{cat.name}</span>
                        <span className="text-[10px] font-bold text-slate-700">{cat.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: active ? `${cat.pct}%` : `${cat.pct * 0.25}%`,
                            background: cat.color,
                            transitionDelay: `${0.4 + i * 0.1}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Compact Source strip */}
        <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Verified Sources:</span>
            {SOURCES.map((s) => (
              <span key={s} className="text-[11px] font-semibold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-full shadow-sm">{s}</span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="text-[11px] text-slate-400 font-medium">AI + Market Intelligence Powered</p>
          </div>
        </div>



      </div>
    </section>
  );
}

// --- Process Timeline Component ----------------------------------------------

const PROCESS_FLOWS = {
  Investors: [
    {
      num: '01',
      title: 'Discover Opportunities',
      desc: 'Browse franchise businesses based on industry, location, and investment range.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      num: '02',
      title: 'Evaluate the Business',
      desc: 'Review business models, investment details, support systems, and growth potential.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      num: '03',
      title: 'Connect & Start',
      desc: 'Connect directly with brands and take the next step toward franchise ownership.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ],
  Brands: [
    {
      num: '01',
      title: 'List Your Franchise',
      desc: 'Showcase your business opportunity with detailed franchise information.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      num: '02',
      title: 'Reach the Right Investors',
      desc: 'Get visibility among investors actively searching for franchise opportunities.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      num: '03',
      title: 'Expand Across Markets',
      desc: 'Build your franchise presence and grow across new cities and regions.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ],
};

function ProcessTimeline() {
  const [mode, setMode] = useState('Investors');
  const [visible, setVisible] = useState(false);
  const [lineH, setLineH] = useState(0);
  const ref = useRef(null);
  const hasShown = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !hasShown.current) {
          hasShown.current = true;
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Animate the connector line height
  useEffect(() => {
    if (!visible) return;
    let start;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      setLineH(Math.floor(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, mode]);

  const steps = PROCESS_FLOWS[mode];

  return (
    <div ref={ref}>
      {/* Toggle pills */}
      <div className="flex items-center gap-2 mb-8 bg-slate-50 border border-slate-200 rounded-2xl p-1.5 w-fit">
        {['Investors', 'Brands'].map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setLineH(0); setVisible(false); setTimeout(() => setVisible(true), 50); }}
            className={`text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-250 ${
              mode === m
                ? 'bg-white text-[#0b0f19] shadow-sm border border-slate-200'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            For {m}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical connector track */}
        <div className="absolute left-5 top-10 bottom-10 w-px bg-slate-100 hidden sm:block" />
        {/* Animated fill */}
        <div
          className="absolute left-5 top-10 w-px bg-gradient-to-b from-violet-500 to-indigo-400 hidden sm:block origin-top transition-none"
          style={{ height: `${lineH}%`, transition: 'height 0.05s linear' }}
        />

        <div className="space-y-5">
          {steps.map((step, i) => (
            <div
              key={`${mode}-${step.num}`}
              className="relative sm:pl-16"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s ease ${i * 0.15}s, transform 0.5s ease ${i * 0.15}s`,
              }}
            >
              {/* Step node */}
              <div className={`hidden sm:flex absolute left-0 top-5 w-10 h-10 rounded-full items-center justify-center
                border-2 bg-white z-10 transition-all duration-500 ${
                  visible
                    ? 'border-violet-400 shadow-[0_0_0_4px_rgba(139,92,246,0.12)]'
                    : 'border-slate-200'
                }`}>
                <span className="text-xs font-extrabold text-violet-600">{step.num}</span>
              </div>

              {/* Card */}
              <div className="group bg-white rounded-[20px] border border-slate-100 shadow-sm
                hover:shadow-lg hover:-translate-y-1 hover:border-violet-200 transition-all duration-300 p-5">
                <div className="flex items-start gap-4">
                  {/* Mobile step number */}
                  <div className="sm:hidden flex-shrink-0 w-9 h-9 rounded-full bg-violet-50 border border-violet-200
                    flex items-center justify-center">
                    <span className="text-xs font-extrabold text-violet-600">{step.num}</span>
                  </div>
                  {/* Icon */}
                  <div className="hidden sm:flex w-10 h-10 rounded-xl bg-violet-50 border border-violet-100
                    items-center justify-center text-violet-600 shrink-0 group-hover:bg-violet-100 transition-colors duration-200">
                    {step.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-extrabold text-[#0b0f19] mb-1.5 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-[20px] bg-gradient-to-r
                  from-violet-500 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Hero ---------------------------------------------------------------------

function FAQAccordionItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Reveal delay={index * 0.06} className="group border border-slate-200/60 rounded-xl bg-white hover:shadow-md transition-all duration-300">
      {/* Question Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50/50 transition-colors duration-200 rounded-xl"
      >
        <div className="flex items-start gap-4 flex-1">
          {/* Number Badge */}
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#0b0f19] text-white text-sm font-bold flex items-center justify-center">
            {faq.number}
          </div>
          
          {/* Question */}
          <h3 className="text-lg font-bold text-[#0b0f19] leading-tight tracking-tight pr-4">
            {faq.question}
          </h3>
        </div>
        
        {/* Plus/Minus Icon */}
        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
          <svg 
            className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </button>
      
      {/* Answer Content */}
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 pt-0">
          <div className="pl-12">
            <p className="text-slate-600 leading-relaxed text-base">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function PremiumFAQItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Reveal delay={index * 0.04} direction="right" className={`group rounded-xl border border-slate-200/60 bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${isOpen ? 'shadow-lg border-slate-300/80 bg-slate-50/30' : ''}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50/50 transition-colors duration-200"
      >
        <div className="flex items-center gap-3 flex-1">
          {/* Compact Number Badge */}
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#0b0f19] to-slate-700 text-white text-sm font-bold flex items-center justify-center shadow-sm">
            {faq.number}
          </div>
          
          {/* Question */}
          <h3 className="text-sm font-semibold text-[#0b0f19] leading-tight pr-2">
            {faq.question}
          </h3>
        </div>
        
        {/* Plus/Minus Icon */}
        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
          <svg 
            className={`w-4 h-4 text-slate-400 transition-all duration-300 ${isOpen ? 'rotate-45 text-[#0b0f19]' : 'group-hover:text-slate-600'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
      </button>
      
      {/* Answer Content */}
      <div className={`overflow-hidden transition-all duration-400 ease-out ${isOpen ? 'max-h-32 pb-4' : 'max-h-0'}`}>
        <div className="px-4">
          <div className="pl-11 pr-2">
            <p className="text-xs text-slate-600 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Hero() {
  const leftLoopItems = [...testimonials.left, ...testimonials.left];
  const rightLoopItems = [...testimonials.right, ...testimonials.right];
    const growthRef = useRef(null);
  const statsRef = useRef(null);
  const modelsRef = useRef(null);
  const processRef = useRef(null);
  const processTimelineRef = useRef(null);
  const stepRefs = useRef([]);
  const [growthVisible, setGrowthVisible] = useState(false);
  const [statsInView, setStatsInView] = useState(false);
  const [modelsVisible, setModelsVisible] = useState(false);
  const [processLineProgress, setProcessLineProgress] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [visibleProcessSteps, setVisibleProcessSteps] = useState(() =>
    processSteps.map(() => false)
  );
  const leftColumnLoop = [...testimonialsFlowCards, ...testimonialsFlowCards];
  const middleColumnLoop = [...testimonialsFlowCards, ...testimonialsFlowCards];
  const rightColumnLoop = [...testimonialsFlowCards, ...testimonialsFlowCards];

  useEffect(() => {
    let frameId;
    let startTime;
    const durationMs = 1400;
    const targetCount = 150;

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      setReviewCount(Math.floor(targetCount * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);
    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  // Section reveal � replays every time section enters viewport
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          // Remove so it re-animates next time it enters
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });

    const sections = document.querySelectorAll('.section-reveal');
    sections.forEach((s) => {
      s.classList.add('will-animate');
      obs.observe(s);
    });

    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!growthRef.current || growthVisible) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGrowthVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(growthRef.current);

    return () => observer.disconnect();
  }, [growthVisible]);

  useEffect(() => {
    if (!statsRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Always reset to false first, then trigger animation
          setStatsInView(false);
          // Use requestAnimationFrame to ensure state update happens before triggering animation
          requestAnimationFrame(() => {
            setStatsInView(true);
          });
        } else {
          // Reset when leaving viewport to prepare for next animation
          setStatsInView(false);
        }
      },
      { 
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: '-50px 0px' // Add some margin to prevent premature triggering
      }
    );

    observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!modelsRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setModelsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(modelsRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!processTimelineRef.current) {
      return undefined;
    }

    let rafId = null;

    const updateProgress = () => {
      const rect = processTimelineRef.current.getBoundingClientRect();
      const triggerY = window.innerHeight * 0.55;
      const rawProgress = (triggerY - rect.top) / rect.height;
      const clamped = Math.min(1, Math.max(0, rawProgress));
      setProcessLineProgress(clamped);
      rafId = null;
    };

    const onScrollOrResize = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    onScrollOrResize();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useEffect(() => {
    const refs = stepRefs.current.filter(Boolean);
    if (!refs.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute('data-step-index'));
          if (entry.isIntersecting) {
            setVisibleProcessSteps((prev) => {
              if (prev[idx]) {
                return prev;
              }
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    refs.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative isolate overflow-x-hidden bg-transparent">
      {/* -- HERO SECTION -- */}
      <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center pt-20 sm:pt-24 pb-12 sm:pb-16">
        {/* Premium Animated Background */}
        <PremiumHeroBackground />
        
        <div className="section-container relative">
          <div className="relative z-10 flex w-full max-w-[900px] flex-col items-center text-center mx-auto">
            <span className="mb-4 sm:mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/80 backdrop-blur-sm px-4 py-2 text-xs font-medium text-emerald-800 shadow-sm">
              <span className="animate-dot-pulse h-1.5 w-1.5 rounded-full bg-emerald-500" />
              10K+ Growing Franchise Networks
            </span>

            <h1 className="mb-4 sm:mb-5 text-[clamp(1.75rem,6vw,2.75rem)] font-extrabold leading-[1.15] tracking-tight text-[#0b0f19] px-4">
              Discover Franchise Opportunities That Build Wealth and Scale Brands That Are Ready for Growth
            </h1>

            <p className="max-w-[720px] px-4 text-[15px] sm:text-base leading-relaxed text-slate-600 mb-7 sm:mb-8">
              Whether you are an investor looking for the next high-growth franchise opportunity or a brand planning to expand across markets, iFranchise brings both sides together through a structured and trusted marketplace.
            </p>

            <div className="flex flex-col xs:flex-row justify-center gap-3 w-full px-4 xs:w-auto">
              <button
                type="button"
                onClick={() => {
                  window.history.pushState({}, '', '/franchise-opportunities');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className="group relative overflow-hidden rounded-2xl bg-[#0B1220] px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#1a2332] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(11,15,25,0.3)]"
                style={{
                  boxShadow: '0 4px 20px rgba(11,15,25,0.25)',
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Opportunities
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-all duration-300 group-hover:bg-white/30 group-hover:translate-x-1">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                    </svg>
                  </span>
                </span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-600 group-hover:translate-x-full" />
              </button>
              <button
                type="button"
                onClick={() => {
                  window.history.pushState({}, '', '/for-brand-owners');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className="group relative overflow-hidden rounded-2xl bg-[#0B1220] px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#1a2332] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(11,15,25,0.3)]"
                style={{
                  boxShadow: '0 4px 20px rgba(11,15,25,0.25)',
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  List Your Brand
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-all duration-300 group-hover:bg-white/30 group-hover:translate-x-1">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                    </svg>
                  </span>
                </span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-600 group-hover:translate-x-full" />
              </button>
            </div>

            <div className="mt-6 sm:mt-7 flex flex-col xs:flex-row items-center justify-center gap-3 xs:gap-4 px-4">
              <div className="flex items-center -space-x-2">
                <Avatar src="https://i.pravatar.cc/40?img=12" alt="Reviewer 1" />
                <Avatar src="https://i.pravatar.cc/40?img=22" alt="Reviewer 2" />
                <Avatar src="https://i.pravatar.cc/40?img=32" alt="Reviewer 3" />
                <Avatar src="https://i.pravatar.cc/40?img=18" alt="Reviewer 4" />
              </div>
              <div className="text-center xs:text-left">
                <p className="flex items-center justify-center xs:justify-start gap-0.5">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </p>
                <p className="text-xs text-slate-500">From {reviewCount}+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -- OUR SERVICES SECTION -- */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        
        <div className="section-container relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white shadow-sm px-4 py-2 mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Our Services
            </span>
            
            <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold tracking-tight text-[#0b0f19] leading-[1.15] mb-4 px-4 max-w-3xl mx-auto">
              Built to Simplify Franchise Growth and Investment
            </h2>
            
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto px-4">
              iFranchise is more than a listing platform. We help investors discover the right businesses and support brands in building scalable franchise networks.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            
            {/* Service Card 1 - Franchise Discovery */}
            <Reveal delay={0} className="h-full">
              <div className="group h-full flex flex-col bg-white rounded-2xl border border-slate-200/60 p-6 sm:p-7 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 hover:border-slate-300/60">
                {/* Icon */}
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-200/40">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-[#0b0f19] mb-3 leading-tight">
                  Franchise Discovery
                </h3>
                
                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed flex-1">
                  Find franchise opportunities that match your investment goals, industry interests, and budget.
                </p>
              </div>
            </Reveal>

            {/* Service Card 2 - Franchise Expansion */}
            <Reveal delay={0.1} className="h-full">
              <div className="group h-full flex flex-col bg-white rounded-2xl border border-slate-200/60 p-6 sm:p-7 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 hover:border-slate-300/60">
                {/* Icon */}
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-200/40">
                  <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-[#0b0f19] mb-3 leading-tight">
                  Franchise Expansion
                </h3>
                
                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed flex-1">
                  Expand your business into new cities through qualified franchise partnerships and strategic growth support.
                </p>
              </div>
            </Reveal>

            {/* Service Card 3 - Investor Matching */}
            <Reveal delay={0.2} className="h-full">
              <div className="group h-full flex flex-col bg-white rounded-2xl border border-slate-200/60 p-6 sm:p-7 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 hover:border-slate-300/60">
                {/* Icon */}
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-50 to-violet-100/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-violet-200/40">
                  <svg className="h-6 w-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-[#0b0f19] mb-3 leading-tight">
                  Investor Matching
                </h3>
                
                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed flex-1">
                  Connect investors with brands that align with their growth vision and investment expectations.
                </p>
              </div>
            </Reveal>

            {/* Service Card 4 - Market Insights */}
            <Reveal delay={0.3} className="h-full">
              <div className="group h-full flex flex-col bg-white rounded-2xl border border-slate-200/60 p-6 sm:p-7 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 hover:border-slate-300/60">
                {/* Icon */}
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-orange-200/40">
                  <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-[#0b0f19] mb-3 leading-tight">
                  Market Insights & Consulting
                </h3>
                
                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed flex-1">
                  Access industry insights, market trends, and franchise guidance to make informed business decisions.
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      <div
        className="pointer-events-none absolute left-0 right-0 top-[calc(100vh+60px)] h-20 bg-gradient-to-b from-slate-50/0 to-slate-50/70"
        aria-hidden="true"
      />

      {/* -- AUDIENCE SPLIT SECTION -- */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(0 0 0) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        
        {/* Ambient glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="section-container relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white shadow-sm px-4 py-2 mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              Who We Serve
            </span>
            
            <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold tracking-tight text-[#0b0f19] leading-[1.15] mb-4 px-4 max-w-3xl mx-auto">
              Built for Investors and Growing Brands
            </h2>
            
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto px-4">
              Whether you're looking to invest in scalable franchise businesses or expand your brand across new markets, iFranchise provides the infrastructure to support long-term growth.
            </p>
          </div>

          {/* Two-Column Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            
            {/* Card 1 - FOR INVESTORS */}
            <Reveal delay={0} className="h-full">
              <div className="group relative h-full flex flex-col bg-white rounded-3xl border border-slate-200/60 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-slate-300/30 hover:-translate-y-2 hover:border-slate-300/80">
                {/* Ambient glow behind card */}
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-100/40 via-transparent to-violet-100/40 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                
                {/* Image Section - Fixed for desktop to show full face */}
                <div className="relative h-72 sm:h-80 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85"
                    alt="Professional investor reviewing business opportunities"
                    className="w-full h-full object-cover object-[center_20%] sm:object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Dark overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  
                  {/* Label Badge - Top Right */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/60 shadow-xl px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-sm" />
                      For Investors
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0b0f19] leading-tight mb-4">
                    Invest in Businesses Built for Long-Term Growth
                  </h3>
                  
                  <ul className="space-y-3 mb-6 flex-1">
                    <li className="flex items-start gap-3 text-sm text-slate-600">
                      <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Explore verified franchise opportunities</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-600">
                      <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Compare business models and investment requirements</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-600">
                      <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Discover opportunities across multiple industries</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-600">
                      <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Connect directly with franchise brands</span>
                    </li>
                  </ul>

                  {/* CTA Button - Black with premium animation */}
                  <button
                    type="button"
                    onClick={() => {
                      window.history.pushState({}, '', '/franchise-opportunities');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }}
                    className="group/btn relative overflow-hidden w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0B1220] text-white px-6 py-3.5 text-sm font-bold transition-all duration-300 hover:bg-[#1a2332] hover:shadow-[0_8px_32px_rgba(11,15,25,0.3)] hover:-translate-y-0.5"
                    style={{
                      boxShadow: '0 4px 20px rgba(11,15,25,0.25)',
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Explore Opportunities
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-all duration-300 group-hover/btn:bg-white/30 group-hover/btn:translate-x-1">
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                        </svg>
                      </span>
                    </span>
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-600 group-hover/btn:translate-x-full" />
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Card 2 - FOR BRANDS */}
            <Reveal delay={0.15} className="h-full">
              <div className="group relative h-full flex flex-col bg-white rounded-3xl border border-slate-200/60 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-slate-300/30 hover:-translate-y-2 hover:border-slate-300/80">
                {/* Ambient glow behind card */}
                <div className="absolute -inset-1 bg-gradient-to-br from-emerald-100/40 via-transparent to-blue-100/40 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                
                {/* Image Section - Fixed for desktop to show full faces */}
                <div className="relative h-72 sm:h-80 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85"
                    alt="Business team celebrating franchise expansion success"
                    className="w-full h-full object-cover object-[center_30%] sm:object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Dark overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  
                  {/* Label Badge - Top Right */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/60 shadow-xl px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm" />
                      For Brands
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0b0f19] leading-tight mb-4">
                    Turn Your Brand Into a Scalable Franchise Network
                  </h3>
                  
                  <ul className="space-y-3 mb-6 flex-1">
                    <li className="flex items-start gap-3 text-sm text-slate-600">
                      <svg className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Reach serious investors actively looking for opportunities</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-600">
                      <svg className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Expand into new markets and cities</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-600">
                      <svg className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Generate qualified franchise leads</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-600">
                      <svg className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Build a stronger brand presence</span>
                    </li>
                  </ul>

                  {/* CTA Button - Black with premium animation */}
                  <button
                    type="button"
                    onClick={() => {
                      window.history.pushState({}, '', '/for-brand-owners');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }}
                    className="group/btn relative overflow-hidden w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0B1220] text-white px-6 py-3.5 text-sm font-bold transition-all duration-300 hover:bg-[#1a2332] hover:shadow-[0_8px_32px_rgba(11,15,25,0.3)] hover:-translate-y-0.5"
                    style={{
                      boxShadow: '0 4px 20px rgba(11,15,25,0.25)',
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      List Your Brand
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-all duration-300 group-hover/btn:bg-white/30 group-hover/btn:translate-x-1">
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                        </svg>
                      </span>
                    </span>
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-600 group-hover/btn:translate-x-full" />
                  </button>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      <div id="about" ref={processRef} className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* -- Centered section header -- */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 shadow-sm rounded-full px-4 py-1.5 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              iFRANCHISE PROCESS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold tracking-tight text-[#0b0f19] leading-tight mb-2">
            Two Strategic Paths. One Growth Engine.
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            Whether you&apos;re scaling a franchise brand or investing in the right opportunity, iFranchise simplifies every critical step.
          </p>
        </div>

        {/* -- Two-column layout -- */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12 items-start">

          {/* LEFT � Living Visual with Growth Signal */}
          <div className="lg:sticky lg:top-28 self-start flex flex-col items-center gap-6">

            {/* Living Process Visual */}
            <div className="relative w-full flex items-center justify-center">
              {/* Soft ambient glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-violet-300/15 blur-3xl rounded-full pointer-events-none animate-pulse" />
              
              {/* Growth Signal Pill - Top Left */}
              <div 
                className="absolute top-2 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-md border border-emerald-200/60 rounded-full px-3 py-1.5 shadow-lg z-10"
                style={{ 
                  animation: 'float 4s ease-in-out infinite',
                  animationDelay: '0.5s'
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[10px] font-bold text-emerald-700 tracking-wide">Growth Signal</span>
              </div>

              {/* Main Process Image with Premium Animation */}
              <div className="relative group">
                {/* Background glow that responds to image */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-violet-200/20 via-emerald-200/15 to-blue-200/20 rounded-3xl blur-2xl"
                  style={{ 
                    animation: 'breathingGlow 8s ease-in-out infinite',
                    transform: 'scale(1.1)'
                  }}
                />
                
                {/* Main image with sophisticated animation */}
                <img
                  src={processImg}
                  alt="iFranchise Process"
                  className="relative w-full max-w-sm object-contain drop-shadow-[0_24px_48px_rgba(15,23,42,0.12)] transition-all duration-700 group-hover:drop-shadow-[0_32px_64px_rgba(139,92,246,0.15)]"
                  loading="eager"
                  style={{ 
                    animation: 'premiumFloat 10s ease-in-out infinite',
                    transformOrigin: 'center center'
                  }}
                />
                
                {/* Subtle rotating accent ring */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 0deg, rgba(139, 92, 246, 0.1) 60deg, transparent 120deg, rgba(16, 185, 129, 0.08) 180deg, transparent 240deg, rgba(59, 130, 246, 0.06) 300deg, transparent 360deg)',
                    animation: 'slowRotate 20s linear infinite',
                    borderRadius: '50%',
                    filter: 'blur(1px)'
                  }}
                />
                
                {/* Energy particles */}
                <div className="absolute inset-0 pointer-events-none">
                  <div 
                    className="absolute top-1/4 left-1/4 w-1 h-1 bg-violet-400 rounded-full opacity-60"
                    style={{ animation: 'particleFloat1 12s ease-in-out infinite' }}
                  />
                  <div 
                    className="absolute top-3/4 right-1/3 w-0.5 h-0.5 bg-emerald-400 rounded-full opacity-70"
                    style={{ animation: 'particleFloat2 15s ease-in-out infinite' }}
                  />
                  <div 
                    className="absolute bottom-1/4 left-2/3 w-0.5 h-0.5 bg-blue-400 rounded-full opacity-50"
                    style={{ animation: 'particleFloat3 18s ease-in-out infinite' }}
                  />
                </div>
                
                {/* Hover enhancement */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              {/* Floating Micro Elements */}
              <div 
                className="absolute top-8 right-8 w-2 h-2 bg-violet-400/60 rounded-full"
                style={{ animation: 'microFloat 5s ease-in-out infinite' }}
              />
              <div 
                className="absolute bottom-12 left-8 w-1.5 h-1.5 bg-emerald-400/50 rounded-full"
                style={{ animation: 'microFloat 7s ease-in-out infinite', animationDelay: '2s' }}
              />
            </div>

            {/* Interactive Bottom Pills */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {[
                { label: 'Discover', d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', color: 'violet' },
                { label: 'Structure', d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', color: 'emerald' },
                { label: 'Expand', d: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', color: 'blue' },
              ].map((p, i) => (
                <div
                  key={p.label}
                  className={`group flex items-center gap-1.5 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-full px-3 py-1.5 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer`}
                >
                  <svg className={`w-3 h-3 text-${p.color}-500 group-hover:text-${p.color}-600 transition-colors duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={p.d} />
                  </svg>
                  <span className="text-[11px] font-bold text-slate-700 group-hover:text-slate-800 transition-colors duration-200">{p.label}</span>
                  <div className={`absolute inset-0 rounded-full bg-${p.color}-100/0 group-hover:bg-${p.color}-100/30 transition-all duration-300 -z-10`} />
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT � toggle + timeline */}
          <ProcessTimeline />

        </div>
      </div>

      {/* -- INDUSTRIES SECTION -- */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        
        {/* Ambient glow effects */}
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-violet-200/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="section-container relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white shadow-sm px-4 py-2 mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Industries
            </span>
            
            <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold tracking-tight text-[#0b0f19] leading-[1.15] mb-4 px-4 max-w-3xl mx-auto">
              Opportunities Across High-Growth Industries
            </h2>
            
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto px-4">
              Discover franchise opportunities across industries with growing demand and long-term business potential.
            </p>
          </div>

          {/* Industry Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 max-w-6xl mx-auto">
            
            {/* Industry Card 1 - Retail & Jewelry */}
            <Reveal delay={0} className="h-full">
              <div className="group relative h-full flex flex-col bg-white rounded-3xl border border-slate-200/60 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-slate-300/30 hover:-translate-y-2 hover:border-slate-300/80 cursor-pointer">
                {/* Ambient glow behind card */}
                <div className="absolute -inset-1 bg-gradient-to-br from-amber-100/40 via-transparent to-orange-100/40 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=85"
                    alt="Retail & Jewelry"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                  
                  {/* Icon Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-sm border border-white/60 shadow-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col p-6">
                  <h3 className="text-xl font-extrabold text-[#0b0f19] leading-tight mb-2">
                    Retail & Jewelry
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Growing consumer demand and scalable business models.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Industry Card 2 - Food & Beverage */}
            <Reveal delay={0.1} className="h-full">
              <div className="group relative h-full flex flex-col bg-white rounded-3xl border border-slate-200/60 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-slate-300/30 hover:-translate-y-2 hover:border-slate-300/80 cursor-pointer">
                {/* Ambient glow behind card */}
                <div className="absolute -inset-1 bg-gradient-to-br from-orange-100/40 via-transparent to-red-100/40 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=85"
                    alt="Food & Beverage"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                  
                  {/* Icon Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-sm border border-white/60 shadow-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col p-6">
                  <h3 className="text-xl font-extrabold text-[#0b0f19] leading-tight mb-2">
                    Food & Beverage
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Proven concepts with strong customer loyalty and repeat business.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Industry Card 3 - Healthcare & Wellness */}
            <Reveal delay={0.2} className="h-full">
              <div className="group relative h-full flex flex-col bg-white rounded-3xl border border-slate-200/60 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-slate-300/30 hover:-translate-y-2 hover:border-slate-300/80 cursor-pointer">
                {/* Ambient glow behind card */}
                <div className="absolute -inset-1 bg-gradient-to-br from-emerald-100/40 via-transparent to-teal-100/40 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=85"
                    alt="Healthcare & Wellness"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                  
                  {/* Icon Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-sm border border-white/60 shadow-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col p-6">
                  <h3 className="text-xl font-extrabold text-[#0b0f19] leading-tight mb-2">
                    Healthcare & Wellness
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Rising health consciousness driving sustainable growth.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Industry Card 4 - Education & Training */}
            <Reveal delay={0.3} className="h-full">
              <div className="group relative h-full flex flex-col bg-white rounded-3xl border border-slate-200/60 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-slate-300/30 hover:-translate-y-2 hover:border-slate-300/80 cursor-pointer">
                {/* Ambient glow behind card */}
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-100/40 via-transparent to-indigo-100/40 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=85"
                    alt="Education & Training"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                  
                  {/* Icon Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-sm border border-white/60 shadow-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col p-6">
                  <h3 className="text-xl font-extrabold text-[#0b0f19] leading-tight mb-2">
                    Education & Training
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Lifelong learning trends creating consistent demand.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Industry Card 5 - Logistics & Infrastructure */}
            <Reveal delay={0.4} className="h-full">
              <div className="group relative h-full flex flex-col bg-white rounded-3xl border border-slate-200/60 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-slate-300/30 hover:-translate-y-2 hover:border-slate-300/80 cursor-pointer">
                {/* Ambient glow behind card */}
                <div className="absolute -inset-1 bg-gradient-to-br from-slate-100/40 via-transparent to-gray-100/40 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=85"
                    alt="Logistics & Infrastructure"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                  
                  {/* Icon Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-sm border border-white/60 shadow-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col p-6">
                  <h3 className="text-xl font-extrabold text-[#0b0f19] leading-tight mb-2">
                    Logistics & Infrastructure
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    E-commerce boom fueling supply chain opportunities.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Industry Card 6 - Beauty & Lifestyle */}
            <Reveal delay={0.5} className="h-full">
              <div className="group relative h-full flex flex-col bg-white rounded-3xl border border-slate-200/60 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-slate-300/30 hover:-translate-y-2 hover:border-slate-300/80 cursor-pointer">
                {/* Ambient glow behind card */}
                <div className="absolute -inset-1 bg-gradient-to-br from-pink-100/40 via-transparent to-rose-100/40 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=85"
                    alt="Beauty & Lifestyle"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                  
                  {/* Icon Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-sm border border-white/60 shadow-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col p-6">
                  <h3 className="text-xl font-extrabold text-[#0b0f19] leading-tight mb-2">
                    Beauty & Lifestyle
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Premium services with high customer retention rates.
                  </p>
                </div>
              </div>
            </Reveal>

          </div>

          {/* Bottom CTA */}
          <div className="mt-12 sm:mt-16 text-center">
            <button
              type="button"
              onClick={() => {
                window.history.pushState({}, '', '/franchise-opportunities');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#0B1220] text-white px-8 py-4 text-base font-semibold transition-all duration-300 hover:bg-[#1a2332] hover:scale-[1.02] hover:shadow-xl hover:shadow-[#0B1220]/30"
            >
              Explore Industries
              <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* -- FEATURED FRANCHISES SECTION -- */}
      <section className="relative w-full py-12 sm:py-16 lg:py-20 section-reveal">
        <div className="section-container">
          <div className="section-header">
            <div className="section-pill">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                OPPORTUNITIES
              </span>
            </div>
            <h2 className="section-title">
              Featured Franchises
            </h2>
            <p className="section-subtitle">
              Curated, high-performing brands ready for expansion and investment
            </p>
          </div>

          <div className="mt-8 sm:mt-10 md:mt-12 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredFranchises.slice(0, 3).map((franchise) => (
              <FranchiseCard key={franchise.id} franchise={franchise} />
            ))}
          </div>

          <div className="mt-12 sm:mt-14 md:mt-16 text-center">
            <button
              type="button"
              onClick={() => {
                window.history.pushState({}, '', '/franchise-opportunities');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="cta-button"
            >
              View More
              <span className="transition duration-200 group-hover:translate-x-1">{"\u2192"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* -- WHY iFRANCHISE SECTION -- */}
      <section className="relative w-full py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        
        {/* Ambient glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-200/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="section-container relative z-10">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white shadow-sm px-4 py-2 mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Why iFranchise
            </span>
            
            <h2 className="text-[clamp(1.5rem,4.5vw,2.25rem)] font-extrabold tracking-tight text-[#0b0f19] leading-[1.15] mb-3 px-4 max-w-3xl mx-auto">
              Why Investors and Brands Choose iFranchise
            </h2>
            
            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto px-4">
              Built to simplify franchise discovery, expansion, and investment through structured business intelligence.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            
            {/* Block 1 - Verified Opportunities */}
            <Reveal delay={0} className="h-full">
              <div className="group relative h-full flex flex-col bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-500/40">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 -z-10" />
                
                {/* 3D Icon Container */}
                <div className="relative h-48 flex items-center justify-center overflow-hidden">
                  {/* Background decorative elements */}
                  <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                  <div className="absolute bottom-6 left-6 w-32 h-32 bg-blue-300/20 rounded-full blur-3xl" />
                  
                  {/* 3D Icon - Shield with Checkmark */}
                  <div className="relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    {/* Shadow layer */}
                    <div className="absolute inset-0 translate-y-2 translate-x-1">
                      <svg className="w-20 h-20 text-blue-900/40 blur-sm" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                      </svg>
                    </div>
                    {/* Main icon */}
                    <svg className="w-20 h-20 text-white drop-shadow-2xl" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                    </svg>
                    {/* Highlight layer */}
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="w-6 h-6 bg-white/40 rounded-full blur-md absolute top-2 left-4" />
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 pt-2">
                  <h3 className="text-xl font-bold text-white leading-tight mb-2">
                    Verified Opportunities
                  </h3>
                  <p className="text-sm text-blue-50/90 leading-relaxed">
                    Every opportunity is reviewed and structured to provide clarity and transparency.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Block 2 - Faster Brand Expansion */}
            <Reveal delay={0.1} className="h-full">
              <div className="group relative h-full flex flex-col bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-emerald-500/40">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 -z-10" />
                
                {/* 3D Icon Container */}
                <div className="relative h-48 flex items-center justify-center overflow-hidden">
                  {/* Background decorative elements */}
                  <div className="absolute top-4 left-4 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
                  <div className="absolute bottom-4 right-4 w-32 h-32 bg-emerald-300/20 rounded-full blur-3xl" />
                  
                  {/* 3D Icon - Rocket */}
                  <div className="relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                    {/* Shadow layer */}
                    <div className="absolute inset-0 translate-y-2 translate-x-1">
                      <svg className="w-20 h-20 text-green-900/40 blur-sm" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C12 2 4 6 4 12c0 2.5 1 4.5 2 6l2-2c-1-1-2-2.5-2-4 0-4 5-7 6-7.5V2zm0 0c0 0 8 4 8 10 0 2.5-1 4.5-2 6l-2-2c1-1 2-2.5 2-4 0-4-5-7-6-7.5V2zM9 17l3 5 3-5-3-1-3 1z"/>
                      </svg>
                    </div>
                    {/* Main icon */}
                    <svg className="w-20 h-20 text-white drop-shadow-2xl" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C12 2 4 6 4 12c0 2.5 1 4.5 2 6l2-2c-1-1-2-2.5-2-4 0-4 5-7 6-7.5V2zm0 0c0 0 8 4 8 10 0 2.5-1 4.5-2 6l-2-2c1-1 2-2.5 2-4 0-4-5-7-6-7.5V2zM9 17l3 5 3-5-3-1-3 1z"/>
                    </svg>
                    {/* Highlight layer */}
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="w-5 h-5 bg-white/50 rounded-full blur-md absolute top-3 left-5" />
                    </div>
                    {/* Flame effect */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-yellow-300/60 rounded-full blur-lg animate-pulse" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 pt-2">
                  <h3 className="text-xl font-bold text-white leading-tight mb-2">
                    Faster Brand Expansion
                  </h3>
                  <p className="text-sm text-emerald-50/90 leading-relaxed">
                    We help brands connect with the right investors to scale faster across markets.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Block 3 - Investor-Focused Discovery */}
            <Reveal delay={0.2} className="h-full">
              <div className="group relative h-full flex flex-col bg-gradient-to-br from-violet-500 via-purple-600 to-fuchsia-700 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-violet-500/40">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-br from-violet-400 to-fuchsia-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 -z-10" />
                
                {/* 3D Icon Container */}
                <div className="relative h-48 flex items-center justify-center overflow-hidden">
                  {/* Background decorative elements */}
                  <div className="absolute top-6 right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                  <div className="absolute bottom-4 left-4 w-28 h-28 bg-purple-300/20 rounded-full blur-3xl" />
                  
                  {/* 3D Icon - Compass/Target */}
                  <div className="relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                    {/* Shadow layer */}
                    <div className="absolute inset-0 translate-y-2 translate-x-1">
                      <svg className="w-20 h-20 text-purple-900/40 blur-sm" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </div>
                    {/* Main icon */}
                    <svg className="w-20 h-20 text-white drop-shadow-2xl" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                      <circle cx="12" cy="12" r="3" fill="currentColor"/>
                      <path d="M12 8l-1.5 4h3L12 8zm0 8l1.5-4h-3L12 16z"/>
                    </svg>
                    {/* Highlight layer */}
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="w-6 h-6 bg-white/40 rounded-full blur-md absolute top-2 left-3" />
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 pt-2">
                  <h3 className="text-xl font-bold text-white leading-tight mb-2">
                    Investor-Focused Discovery
                  </h3>
                  <p className="text-sm text-violet-50/90 leading-relaxed">
                    Simplified franchise discovery experience designed around business goals and investment intent.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Block 4 - Data-Driven Marketplace */}
            <Reveal delay={0.3} className="h-full">
              <div className="group relative h-full flex flex-col bg-gradient-to-br from-orange-500 via-amber-600 to-yellow-600 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-orange-500/40">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-br from-orange-400 to-yellow-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 -z-10" />
                
                {/* 3D Icon Container */}
                <div className="relative h-48 flex items-center justify-center overflow-hidden">
                  {/* Background decorative elements */}
                  <div className="absolute top-4 left-6 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
                  <div className="absolute bottom-6 right-4 w-32 h-32 bg-orange-300/20 rounded-full blur-3xl" />
                  
                  {/* 3D Icon - Chart/Analytics */}
                  <div className="relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    {/* Shadow layer */}
                    <div className="absolute inset-0 translate-y-2 translate-x-1">
                      <svg className="w-20 h-20 text-orange-900/40 blur-sm" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4-4h2v18h-2V3zm4 9h2v9h-2v-9zm4-5h2v14h-2V7z"/>
                      </svg>
                    </div>
                    {/* Main icon */}
                    <svg className="w-20 h-20 text-white drop-shadow-2xl" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4-4h2v18h-2V3zm4 9h2v9h-2v-9zm4-5h2v14h-2V7z"/>
                    </svg>
                    {/* Highlight layer */}
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="w-5 h-5 bg-white/50 rounded-full blur-md absolute top-2 left-4" />
                    </div>
                    {/* Sparkle effects */}
                    <div className="absolute top-1 right-2 w-2 h-2 bg-white rounded-full animate-pulse" />
                    <div className="absolute bottom-3 left-1 w-1.5 h-1.5 bg-white/80 rounded-full animate-pulse delay-150" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 pt-2">
                  <h3 className="text-xl font-bold text-white leading-tight mb-2">
                    Data-Driven Marketplace
                  </h3>
                  <p className="text-sm text-orange-50/90 leading-relaxed">
                    Industry-focused insights and structured business information help users make better decisions.
                  </p>
                </div>
              </div>
            </Reveal>

          </div>

          {/* Bottom CTA */}
          <div className="mt-10 sm:mt-12 text-center">
            <button
              type="button"
              onClick={() => {
                window.history.pushState({}, '', '/franchise-opportunities');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#0B1220] text-white px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:bg-[#1a2332] hover:scale-[1.02] hover:shadow-xl hover:shadow-[#0B1220]/30"
            >
              Explore Franchise Opportunities
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* -- SOCIAL PROOF ECOSYSTEM -- */}
      <section className="relative w-full py-12 sm:py-16 lg:py-20 section-reveal">
        <div className="section-container">
          
          {/* Section Header */}
          <div className="section-header">
            <div className="section-pill">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Testimonials
              </span>
            </div>
            <h2 className="section-title">
              Trusted by brands. Backed by outcomes.
            </h2>
            <p className="section-subtitle">
              From franchise structuring to investor conversion, iFranchise has helped brands scale smarter and franchisees choose with confidence.
            </p>
          </div>

          {/* Testimonials Section - UNCHANGED */}
          <div className="mb-16 sm:mb-20">
            <div className="hidden gap-6 sm:gap-9 md:grid md:grid-cols-2 xl:grid-cols-3">
              <div
                className="testi-column relative h-[500px] overflow-hidden"
                style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}
              >
                <div className="testi-track-down space-y-6">
                  {leftColumnLoop.map((item, idx) => (
                    <TestimonialStatCard key={`${item.name}-left-${idx}`} item={item} />
                  ))}
                </div>
              </div>
              <div
                className="testi-column relative h-[500px] overflow-hidden"
                style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}
              >
                <div className="testi-track-up space-y-6">
                  {middleColumnLoop.map((item, idx) => (
                    <TestimonialStatCard key={`${item.name}-middle-${idx}`} item={item} />
                  ))}
                </div>
              </div>
              <div
                className="testi-column relative h-[500px] overflow-hidden md:hidden xl:block"
                style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}
              >
                <div className="testi-track-down space-y-6">
                  {rightColumnLoop.map((item, idx) => (
                    <TestimonialStatCard key={`${item.name}-right-${idx}`} item={item} />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-5 md:hidden">
              {testimonialsFlowCards.map((item) => (
                <TestimonialStatCard key={item.name} item={item} />
              ))}
            </div>
          </div>

          {/* Clean Stats Row - No Card Background */}
          <div ref={statsRef} className="mb-16 sm:mb-20">
            {/* Subtle background pattern */}
            <div className="relative">
              <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(15,23,42,0.15) 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }} />
              
              <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 py-8">
                {statsCards.map((stat, index) => (
                  <div key={stat.title} className="group relative flex flex-col items-center text-center">
                    {/* Vertical divider - hidden on mobile, shown on lg+ */}
                    {index < statsCards.length - 1 && (
                      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-20 bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
                    )}
                    
                    {/* Stat content */}
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3 justify-center">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-emerald-500" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                          {stat.title}
                        </p>
                      </div>
                      
                      <div className="mb-3">
                        <StatCard stat={stat} active={statsInView} />
                      </div>
                      
                      <p className="text-sm text-slate-500 leading-relaxed max-w-[200px] mx-auto">
                        {stat.description}
                      </p>
                    </div>
                    
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-50/0 via-emerald-50/0 to-blue-50/0 group-hover:from-violet-50/30 group-hover:via-emerald-50/20 group-hover:to-blue-50/30 transition-all duration-500 -z-10" />
                  </div>
                ))}
              </div>
              
              {/* Success Stories Pills */}
              <div className="mt-12 pt-8 border-t border-slate-100/60 flex flex-wrap items-center justify-center gap-3">
                {[
                  {
                    label: '500+ franchise launches',
                    icon: (
                      <svg className="w-3.5 h-3.5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    ),
                  },
                  {
                    label: '₹800Cr+ ecosystem influenced',
                    icon: (
                      <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                  },
                  {
                    label: '72% investor preference',
                    icon: (
                      <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    ),
                  },
                  {
                    label: '30% CAGR aligned',
                    icon: (
                      <svg className="w-3.5 h-3.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    ),
                  },
                ].map((item, i) => (
                  <Reveal key={item.label} delay={i * 0.05}>
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-50 to-white border border-slate-200/60 rounded-full px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* Brand Trust Rail */}
          <div className="text-center">
            <p className="text-sm font-medium text-slate-600 mb-6 sm:mb-8">
              Trusted across franchise, strategy & enterprise ecosystems
            </p>
            
            {/* Logo Marquee */}
            <div className="overflow-hidden rounded-2xl py-4">
              <div className="animate-marquee-right flex w-max items-center gap-12 sm:gap-16 md:gap-20 will-change-transform">
                {['Tata', 'Reliance', 'Infosys', 'Shopify', 'Stripe', 'Microsoft', 'Google', 'Amazon', 'Tata', 'Reliance', 'Infosys', 'Shopify', 'Stripe', 'Microsoft', 'Google', 'Amazon'].map((brand, idx) => (
                  <div
                    key={`${brand}-${idx}`}
                    className="group inline-flex items-center gap-2 whitespace-nowrap text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-300 hover:text-slate-600 transition-colors duration-300"
                  >
                    <span className="text-lg sm:text-xl md:text-2xl leading-none opacity-40 group-hover:opacity-60 transition-opacity duration-300">*</span>
                    <span className="group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-emerald-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">{brand}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* -- INDIA FRANCHISE MARKET INTELLIGENCE -- */}
      <MarketIntelligenceSection />

      {/* -- FRANCHISE FAQ / DECISION INTELLIGENCE SECTION -- */}
      <section className="relative w-full py-12 sm:py-16 lg:py-20 section-reveal">
        <div className="section-container">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(15,23,42,0.15) 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }} />
          
          <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 flex flex-col justify-center">
          
          {/* TOP CENTER PILL */}
          <div 
            className="text-center mb-8"
            style={{
              opacity: 0,
              animation: 'fadeSlideDown 0.3s ease forwards',
              animationDelay: '0.2s'
            }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-white to-slate-50 border border-slate-200/60 shadow-sm rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                FAQs
              </span>
            </div>
          </div>

          {/* SECTION HEADER - CENTERED */}
          <div 
            className="text-center mb-12"
            style={{
              opacity: 0,
              animation: 'fadeSlideUp 0.35s ease forwards',
              animationDelay: '0.1s'
            }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0b0f19] leading-tight mb-4">
              Helpful Franchise Questions & Answers
            </h2>
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Everything founders, investors, and franchise buyers need to know before making expansion decisions.
            </p>
          </div>

          {/* MAIN CONTENT - PERFECT 50/50 SPLIT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            
            {/* LEFT SIDE - STRATEGIC ADVISOR IMAGE */}
            <div 
              className="flex flex-col items-center justify-center"
              style={{
                opacity: 0,
                animation: 'fadeSlideUp 0.35s ease forwards',
                animationDelay: '0.15s'
              }}
            >
              {/* Strategic Advisor Image - Contact Page Style */}
              <div className="relative">
                <img
                  src={contactImg}
                  alt="Strategic Franchise Advisory"
                  className="relative w-[75vw] max-w-[380px] object-contain drop-shadow-[0_24px_48px_rgba(15,23,42,0.14)] sm:w-full lg:max-w-[460px] xl:max-w-[500px]"
                  loading="lazy"
                  style={{ 
                    animation: 'contactFloat 10s ease-in-out infinite',
                    transformOrigin: 'center center'
                  }}
                  onError={(e) => {
                    // Fallback to professional placeholder
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                
                {/* Fallback placeholder */}
                <div className="hidden w-[75vw] max-w-[380px] sm:w-full lg:max-w-[460px] xl:max-w-[500px] h-80 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl items-center justify-center drop-shadow-[0_24px_48px_rgba(15,23,42,0.14)]">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center">
                      <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                    <p className="text-xl font-semibold text-slate-600">Strategic Franchise Advisory</p>
                    <p className="text-sm text-slate-400 mt-2">Professional consultation</p>
                  </div>
                </div>

                {/* Ground shadow pulse - Contact Page Style */}
                <div
                  className="absolute -bottom-4 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-full bg-slate-400/20 blur-xl"
                  style={{
                    animation: 'shadowPulse 10s ease-in-out infinite'
                  }}
                />
              </div>

              {/* Advisory Text & CTA */}
              <div className="text-center mt-8 w-full max-w-md">
                {/* CTA Removed as per user request */}
              </div>
            </div>

            {/* RIGHT SIDE - COMPACT FAQ ACCORDION */}
            <div 
              className="flex flex-col justify-start pr-0 sm:pr-2"
              style={{
                opacity: 0,
                animation: 'fadeSlideUp 0.35s ease forwards',
                animationDelay: '0.2s'
              }}
            >
              <div className="space-y-3">
                {[
                  {
                    number: "01",
                    question: "How much does it cost to start a franchise?",
                    answer: "Franchise investment varies by industry. Low-cost franchises (?2-10 lakhs), mid-range (?10-50 lakhs), premium (?50 lakhs+). FOCO models require 30-40% less capital than FOFO models."
                  },
                  {
                    number: "02", 
                    question: "What's the difference between FOCO, FOFO & COCO?",
                    answer: "FOCO: You invest, company operates. FOFO: You own and operate. COCO: Company owned and operated. Each offers different risk-reward profiles and involvement levels."
                  },
                  {
                    number: "03",
                    question: "Is franchise business profitable in India?",
                    answer: "Successful franchises achieve 15-25% net margins after stabilization. F&B shows 18-30% gross margins, retail 25-40%, services 35-50%. Success depends on brand strength and execution."
                  },
                  {
                    number: "04",
                    question: "What legal documents are required?",
                    answer: "Essential documents: FDD, Franchise Agreement, Trademark License, Operations Manual, Territory Rights. Plus GST registration, FSSAI license, and local permits."
                  },
                  {
                    number: "05",
                    question: "How long does it take to launch a franchise?",
                    answer: "Typically 3-6 months from agreement to opening. Includes due diligence, documentation, site selection, setup, training, and soft launch preparation."
                  }
                ].map((faq, index) => (
                  <PremiumFAQItem 
                    key={faq.number}
                    faq={faq}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Smooth transition to footer */}
      <div className="h-16 sm:h-20 bg-gradient-to-b from-slate-50 to-slate-100"></div>
    </main>
  );
}

export default Hero;
