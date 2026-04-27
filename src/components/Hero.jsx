import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import TestimonialCard from './TestimonialCard';

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
    eyebrow: 'FOR BRANDS',
    title: 'Scale your brand into new markets',
    description:
      'Turn your business into a scalable franchise model. We help you structure, expand, and connect with the right partners to accelerate growth.',
    linkText: 'For Brands',
    image:
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=80',
  },
  {
    eyebrow: 'FOR INVESTORS',
    title: 'Invest in high-growth franchise opportunities',
    description:
      'Discover curated franchise opportunities across industries. Find businesses with proven models and strong potential for returns.',
    linkText: 'For Investors',
    image:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80',
  },
];

const statsCards = [
  {
    value: 500,
    suffix: '+',
    title: 'Brands Partnered',
    description: 'Trusted by businesses across multiple industries and growth stages.',
  },
  {
    value: 10000,
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

function GrowthCard({ card, reverse = false }) {
  return (
    <article className="group grid overflow-hidden rounded-3xl bg-white shadow-soft transition duration-300 hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-[0_18px_42px_rgba(15,23,42,0.14)] md:grid-cols-2">
      <div className={`${reverse ? 'md:order-2' : ''} overflow-hidden`}>
        <img
          src={card.image}
          alt={card.title}
          className="h-56 w-full object-cover transition duration-300 group-hover:scale-105 md:h-full"
          loading="lazy"
        />
      </div>
      <div className={`${reverse ? 'md:order-1' : ''} flex flex-col justify-center p-7 sm:p-9`}>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{card.eyebrow}</p>
        <h3 className="text-2xl font-bold tracking-tight text-[#0b0f19]">{card.title}</h3>
        <p className="mt-3 text-base leading-relaxed text-slate-500">{card.description}</p>
        <a
          href="#"
          className="group/link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition duration-200 hover:text-[#0b0f19]"
        >
          {card.linkText}
          <span className="transition duration-200 group-hover/link:translate-x-1">→</span>
        </a>
      </div>
    </article>
  );
}

function StatCard({ stat, active }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frameId;
    let startTime;
    const durationMs = 1800;

    if (!active) {
      setCount(0);
      return undefined;
    }

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(stat.value * eased));

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
  }, [active, stat.value]);

  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-[0_2px_10px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_26px_rgba(15,23,42,0.10)]">
      <p className="text-3xl font-extrabold tracking-tight text-[#0b0f19] sm:text-[34px]">
        {count.toLocaleString()}
        {stat.suffix}
      </p>
      <p className="mt-2 text-sm font-semibold text-slate-800">{stat.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">{stat.description}</p>
    </article>
  );
}

function FranchiseModelCard({ model, visible, delayMs }) {
  const handleCardClick = () => {
    // Navigate to franchise-specific detail page
    console.log('Navigating to franchise:', model.slug);
    window.history.pushState({}, '', `/franchise/${model.slug}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <article
      onClick={handleCardClick}
      className={`group flex h-full min-h-[520px] flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,23,42,0.15)] cursor-pointer ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {/* IMAGE SECTION - Top with consistent height */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={model.image}
          alt={model.title}
          className="h-56 w-full object-cover transition-all duration-300 group-hover:scale-105"
          loading="lazy"
          onLoad={(e) => {
            e.target.classList.add('loaded');
            e.target.classList.remove('loading');
          }}
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.classList.add('loaded');
            e.target.classList.remove('loading');
            // Fallback to category-specific images based on model type
            const fallbackImages = {
              'Food & Beverage': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
              'Health & Wellness': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80',
              'Home Services': 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80',
              'Education': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
              'Technology': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
              'Retail': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
              'Entertainment': 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80'
            };
            // Determine category based on model title or use default
            let category = 'Food & Beverage'; // default
            if (model.title.toLowerCase().includes('company') || model.title.toLowerCase().includes('operated')) {
              category = 'Business Services';
            } else if (model.title.toLowerCase().includes('invested') || model.title.toLowerCase().includes('invest')) {
              category = 'Financial Services';
            }
            e.target.src = fallbackImages[category] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=600&q=80';
          }}
        />
      </div>

      {/* CONTENT SECTION */}
      <div className="flex flex-col flex-1 p-6">
        {/* TITLE SECTION - Fixed height for alignment */}
        <div className="h-16 flex items-start">
          <h3 className="text-xl font-bold leading-tight tracking-tight text-[#0b0f19] line-clamp-2">
            {model.title}
          </h3>
        </div>

        {/* DESCRIPTION SECTION - Controlled text */}
        <div className="flex-1">
          <p className="text-sm leading-relaxed text-slate-500 line-clamp-3">
            {model.description}
          </p>
        </div>

        {/* CTA SECTION - Bottom aligned */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Button clicked - navigating to:', model.slug);
              window.history.pushState({}, '', `/franchise/${model.slug}`);
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="flex-1 rounded-xl bg-[#0B1220] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1a2332] hover:shadow-lg hover:-translate-y-0.5"
          >
            Explore
          </button>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Link clicked - navigating to:', model.slug);
              window.history.pushState({}, '', `/franchise/${model.slug}`);
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#0B1220] transition-all duration-300 hover:border-[#0B1220] hover:bg-slate-50"
          >
            Learn more
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M8 12h9" />
            </svg>
          </a>
        </div>
      </div>
    </article>
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
    <section className="relative mx-auto w-full max-w-[1200px] px-4 pb-28 pt-2 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[32px] border border-emerald-300/20 bg-[radial-gradient(circle_at_50%_30%,rgba(16,185,129,0.16),transparent_50%),linear-gradient(130deg,#020506_0%,#051414_48%,#020506_100%)] px-5 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] sm:px-8 lg:px-10 lg:py-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(52,211,153,0.18),transparent_42%)]" />
        <div className="pointer-events-none absolute -left-12 top-16 h-[1px] w-52 bg-gradient-to-r from-transparent via-emerald-200/35 to-transparent" />
        <div className="pointer-events-none absolute right-6 top-10 h-36 w-36 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 right-16 h-24 w-[260px] bg-[linear-gradient(90deg,transparent,rgba(167,243,208,0.18),transparent)] blur-sm" />
        <p className="pointer-events-none absolute left-1/2 top-7 -translate-x-1/2 text-[54px] font-black tracking-[0.2em] text-emerald-100/5 blur-[1px] sm:text-[82px]">
          CONTACT
        </p>

        <div className="relative grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-5">
            <span className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-50 backdrop-blur-md">
              Contact
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Get in touch</h2>
            <p className="max-w-[440px] text-base font-medium leading-relaxed text-emerald-50/75">
              Have questions or ready to transform your business with our franchise solutions?
            </p>

            <div className="space-y-4 pt-2">
              {contactItems.map((item) => (
                <article
                  key={item.title}
                  className="group flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-emerald-200/35 hover:bg-white/15 hover:shadow-[0_10px_28px_rgba(16,185,129,0.14)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20">
                      <ContactIcon type={item.icon} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-sm text-emerald-50/70">{item.value}</p>
                    </div>
                  </div>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white/80 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white">
                    ↗
                  </span>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl sm:p-6">
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-sm text-white placeholder:text-slate-300/70 outline-none transition duration-200 focus:border-emerald-200/40 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.14)]"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-sm text-white placeholder:text-slate-300/70 outline-none transition duration-200 focus:border-emerald-200/40 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.14)]"
              />
              <input
                type="url"
                placeholder="Website"
                className="w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-sm text-white placeholder:text-slate-300/70 outline-none transition duration-200 focus:border-emerald-200/40 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.14)]"
              />
              <input
                type="tel"
                placeholder="Contact Number"
                className="w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-sm text-white placeholder:text-slate-300/70 outline-none transition duration-200 focus:border-emerald-200/40 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.14)]"
              />
              <textarea
                placeholder="Message"
                rows={6}
                className="w-full resize-none rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-sm text-white placeholder:text-slate-300/70 outline-none transition duration-200 focus:border-emerald-200/40 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.14)]"
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#091115] transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-50 hover:shadow-[0_12px_25px_rgba(255,255,255,0.2)]"
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
        setStatsInView(entry.isIntersecting);
      },
      { threshold: 0.25 }
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
    <main className="relative isolate overflow-hidden">
      <section className="relative mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-[1200px] items-center justify-center px-4 pb-14 pt-24 sm:px-6 lg:px-8">
        <div className="absolute left-4 top-24 hidden h-[460px] w-56 overflow-hidden xl:block">
          <div className="animate-scroll-up space-y-5">
            {leftLoopItems.map((item, idx) => (
              <TestimonialCard
                key={`${item.author}-${idx}`}
                quote={item.quote}
                author={item.author}
                className={idx % 2 === 0 ? 'opacity-70' : 'opacity-60'}
              />
            ))}
          </div>
        </div>

        <div className="absolute right-4 top-24 hidden h-[460px] w-56 overflow-hidden xl:block">
          <div className="animate-scroll-down space-y-5">
            {rightLoopItems.map((item, idx) => (
              <TestimonialCard
                key={`${item.author}-${idx}`}
                quote={item.quote}
                author={item.author}
                className={idx % 2 === 0 ? 'opacity-70' : 'opacity-60'}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 flex max-w-[720px] flex-col items-center text-center mx-auto">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/80 px-4 py-2 text-xs font-medium text-emerald-800 shadow-soft">
            <span className="animate-dot-pulse h-2 w-2 rounded-full bg-emerald-500" />
            10K+ Growing Franchise Networks
          </span>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-[#0b0f19] sm:text-5xl lg:text-6xl">
            Discover &amp; Scale Franchise Brands
            <br />
            For Ambitious Investors
          </h1>

          <p className="max-w-[600px] text-base leading-relaxed text-slate-500 sm:text-lg">
            Explore verified franchise opportunities and make smarter investment decisions with real-time insights and growth analytics.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Button variant="primary" icon className="h-[56px] px-7 py-[14px] text-[15px] font-semibold transition-all duration-300 hover:scale-[1.03] hover:bg-[#0c1a2] hover:shadow-[0_8px_20px_rgba(12,18,41,0.12)] hover:-translate-y-2">
              Explore Brands
            </Button>
            <button
              type="button"
              onClick={() => {
                window.history.pushState({}, '', '/opportunities');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="group inline-flex items-center justify-center rounded-full border-2 border-[#0B1220] bg-white px-7 py-[14px] text-[15px] font-semibold transition-all duration-300 hover:bg-[#0B1220] hover:text-white hover:scale-[1.03] hover:shadow-[0_4px_12px_rgba(12,18,41,0.08)] hover:-translate-y-2 h-[56px]"
            >
              View Opportunities
            </button>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center">
              <Avatar src="https://i.pravatar.cc/40?img=12" alt="Reviewer 1" />
              <Avatar src="https://i.pravatar.cc/40?img=22" alt="Reviewer 2" />
              <Avatar src="https://i.pravatar.cc/40?img=32" alt="Reviewer 3" />
              <Avatar src="https://i.pravatar.cc/40?img=18" alt="Reviewer 4" />
            </div>
            <div className="text-left">
              <p className="flex items-center gap-1">
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
      </section>

      <div
        className="pointer-events-none absolute left-0 right-0 top-[calc(100vh+60px)] h-20 bg-gradient-to-b from-slate-50/0 to-slate-50/70"
        aria-hidden="true"
      />

      <div
        ref={growthRef}
        className={`mx-auto w-full max-w-[1200px] px-4 pb-24 pt-20 transition duration-700 ease-out sm:px-6 lg:px-8 ${
          growthVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        {/* Trust Text - Moved from Hero */}
        <div className="mb-16 text-center">
          <p className="text-[15px] font-medium text-slate-700">
            Trusted by 5000+ franchise investors & brands
          </p>
          
          {/* Logo Strip - Restored with left-to-right scrolling */}
          <div className="mt-8 overflow-hidden rounded-2xl py-2">
            <div className="animate-marquee-right flex w-max items-center gap-16 will-change-transform sm:gap-20">
              {['FranchiseIndia', 'FranchiseBazar', 'FranchiseMart', 'BizFranchise', 'IndiaFranchise', 'FranchiseHub', 'TopFranchise', 'FranchiseIndia', 'FranchiseBazar', 'FranchiseMart', 'BizFranchise', 'IndiaFranchise', 'FranchiseHub', 'TopFranchise'].map((brand, idx) => (
                <div
                  key={`${brand}-${idx}`}
                  className="inline-flex items-center gap-2 whitespace-nowrap text-3xl font-semibold tracking-tight text-slate-800"
                >
                  <span className="text-2xl leading-none">*</span>
                  <span>{brand}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[640px] text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            CHOOSE YOUR PATH
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-[#0b0f19] sm:text-5xl">
            Two ways to grow
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500">
            Select the path that aligns with your goals and scale faster with the right strategy.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <GrowthCard card={growthCards[0]} />
          <GrowthCard card={growthCards[1]} reverse />
        </div>
      </div>

      <div id="services" ref={modelsRef} className="mx-auto w-full max-w-[1200px] px-4 pb-28 pt-2 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            FRANCHISE MODELS
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-[#0b0f19] sm:text-5xl">
            Choose the right franchise model
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500">
            Compare operating structures and select the model that best fits your ownership,
            execution, and investment goals.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {franchiseModels.map((model, idx) => (
            <FranchiseModelCard
              key={model.code}
              model={model}
              visible={modelsVisible}
              delayMs={idx * 100}
            />
          ))}
        </div>
      </div>

      <div id="about" ref={processRef} className="mx-auto w-full max-w-[1200px] px-4 pb-28 pt-2 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="flex flex-col gap-8 lg:sticky lg:top-[120px]">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
                <span className="h-2 w-2 rounded-sm bg-rose-500" />
                Process
              </p>
              <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-[#0b0f19] sm:text-5xl">
                Proven &amp; effective process.
                <br />
                <span className="text-slate-600">That delivers results.</span>
              </h2>
              <p className="mt-5 max-w-[520px] text-base leading-relaxed text-slate-500">
                We dive deep into your goals, audience, and challenges to craft a strategy that drives
                clear direction and impact.
              </p>
            </div>

            {/* Video Card - Fills remaining vertical space below text */}
            <div className="relative flex-grow rounded-3xl overflow-hidden bg-slate-900 shadow-soft min-h-[300px]">
              <video
                className="absolute inset-0 h-full w-full object-cover block"
                style={{ transform: 'scale(1.05)' }}
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                poster="/process-video-poster.jpg"
              >
                <source src="/src/assets/Videos/video.mp4" type="video/mp4" />
              </video>
              
              {/* Optional overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none" />
            </div>
          </div>

          <div ref={processTimelineRef} className="relative pl-0 sm:pl-2">
            <div className="absolute left-2 top-3 hidden h-[calc(100%-24px)] w-[2px] bg-slate-200 sm:block" />
            <div
              className="absolute left-2 top-3 hidden h-[calc(100%-24px)] w-[2px] origin-top bg-rose-500 transition-transform duration-200 sm:block"
              style={{ transform: `scaleY(${processLineProgress})` }}
            />

            <div className="space-y-9">
              {processSteps.map((step, idx) => {
                const isActive = visibleProcessSteps[idx];
                return (
                  <div
                    key={step.number}
                    ref={(el) => {
                      stepRefs.current[idx] = el;
                    }}
                    data-step-index={idx}
                    className={`relative rounded-3xl border border-slate-200/90 bg-white p-6 transition duration-500 ${
                      isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    } sm:ml-12`}
                  >
                    <span
                      className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white text-sm font-semibold transition duration-300 sm:absolute sm:-left-[58px] sm:top-5 ${
                        isActive
                          ? 'border-rose-400 text-slate-900 shadow-[0_8px_18px_rgba(244,63,94,0.18)]'
                          : 'border-slate-300 text-slate-500'
                      }`}
                    >
                      {step.number}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-[#0b0f19]">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-500">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-4 py-[100px] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[680px] text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Testimonials</p>
          <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-[#0b0f19] sm:text-5xl">
            We&apos;re loved.
            <br />
            Just success stories.
          </h2>
        </div>

        <div className="mt-12 hidden gap-9 md:grid md:grid-cols-2 xl:grid-cols-3">
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

        <div className="mt-10 space-y-5 md:hidden">
          {testimonialsFlowCards.map((item) => (
            <TestimonialStatCard key={item.name} item={item} />
          ))}
        </div>
      </div>

      <section id="featured-franchises" className="mx-auto w-full max-w-[1200px] scroll-mt-28 px-4 pb-28 pt-2 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[680px] text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">OPPORTUNITIES</p>
          <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-[#0b0f19] sm:text-5xl">
            Featured Franchises
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500">
            Curated, high-performing brands ready for expansion and investment
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredFranchises.slice(0, 3).map((franchise) => (
            <FranchiseCard key={franchise.id} franchise={franchise} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <button
            type="button"
            onClick={() => {
              window.history.pushState({}, '', '/opportunities');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="inline-flex items-center gap-3 rounded-full bg-[#0B1220] px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#0B1220]/25"
          >
            View More
            <span className="transition duration-200 group-hover:translate-x-1">{"\u2192"}</span>
          </button>
        </div>
      </section>

      <div ref={statsRef} className="mx-auto w-full max-w-[1200px] px-4 pb-28 pt-2 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              PROVEN TRACK RECORD
            </p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-[#0b0f19] sm:text-5xl">
              Numbers that speak
            </h2>
            <p className="mt-4 max-w-[500px] text-base leading-relaxed text-slate-500">
              Clear metrics from real projects, reflecting consistent growth outcomes across
              branding, acquisition, and conversion performance.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button variant="primary">Learn More</Button>
              <a
                href="#"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition duration-200 hover:text-[#0b0f19]"
              >
                View All
                <span className="transition duration-200 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {statsCards.map((stat) => (
              <StatCard key={stat.title} stat={stat} active={statsInView} />
            ))}
          </div>
        </div>
      </div>

      <ContactSection />

      <div className="relative z-10 mx-auto -mt-12 w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-50 to-white px-6 py-16 text-center shadow-xl shadow-slate-900/10 ring-1 ring-slate-100 sm:px-16"
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Trusted by 1,200+ founders.
            <br />
            <span className="text-slate-400">Turning ideas into bold brands.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-600">
            Book a free discovery call to discuss strategy, set goals, and see how we can help you grow.
          </p>
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => {
                window.history.pushState({}, '', '/contact');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="group inline-flex items-center justify-center rounded-full bg-[#0B1220] px-6 py-3 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#0B1220]/25"
            >
              Book A Call
              <span
                className="ml-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1a2332] transition group-hover:translate-x-1"
              >
                <svg
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </button>
          </div>

          {/* Pill Button - Moved under CTA buttons */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"
              ></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500"></span>
            </div>
            <p className="text-sm text-slate-600">Trusted by 1,000,000+ Professionals</p>
          </div>

          {/* Logo Marquee */}
          <div className="mt-12 overflow-hidden">
            <div className="animate-marquee-right flex items-center gap-16 will-change-transform">
              {['Google', 'Amazon', 'Stripe', 'Shopify', 'Tata', 'Reliance', 'Infosys', 'Microsoft', 'Apple', 'Meta', 'Google', 'Amazon', 'Stripe', 'Shopify', 'Tata', 'Reliance', 'Infosys', 'Microsoft', 'Apple', 'Meta'].map((brand, idx) => (
                <div
                  key={`${brand}-${idx}`}
                  className="flex items-center gap-2 whitespace-nowrap text-2xl font-bold tracking-tight text-slate-400 transition-opacity hover:opacity-100"
                >
                  <span className="text-2xl leading-none opacity-50">*</span>
                  <span>{brand}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Smooth transition to footer */}
      <div className="h-20 bg-gradient-to-b from-slate-50 to-slate-100"></div>
    </main>
  );
}

export default Hero;
