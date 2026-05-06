import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

// Import actual images
import aboutUsImage from '../assets/aboutus.png';
import teamImage1 from '../assets/about.png';
import teamImage2 from '../assets/contact.png';
import teamImage3 from '../assets/contact2.png';
import teamImage4 from '../assets/contact3.png';
import teamImage5 from '../assets/hero.png';
import teamImage6 from '../assets/process.png';

// Premium Team Card Component with Interactive Social Reveal
function PremiumTeamCard({ member }) {
  const [isHovered, setIsHovered] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const toggleSocial = (e) => {
    e.stopPropagation();
    setSocialOpen(!socialOpen);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${-mousePosition.y * 0.3}deg) rotateY(${mousePosition.x * 0.3}deg) scale(1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      }}
      className="group relative h-[480px] w-full overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-[0_8px_40px_rgba(15,23,42,0.08)] transition-all duration-500 hover:border-purple-300 hover:shadow-[0_16px_60px_rgba(124,58,237,0.2)] sm:h-[540px] lg:h-[580px]"
    >
      {/* Animated Background Glow */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.15 : 0,
          scale: isHovered ? 1.2 : 0.8,
        }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-violet-500/20 to-indigo-500/30 blur-3xl"
      />

      {/* Grain Texture Overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015] mix-blend-overlay">
        <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      </div>

      {/* BACKGROUND LAYER - Large Typography BEHIND Portrait */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: isHovered ? 10 : 0,
            opacity: isHovered ? 0.95 : 0.85,
          }}
          transition={{ duration: 0.4 }}
          className="absolute left-0 top-8 w-full px-4"
          style={{
            zIndex: 1,
            mixBlendMode: 'soft-light',
          }}
        >
          {/* Large Keyword - Behind Head */}
          <p className="text-[5.5rem] font-black uppercase leading-[0.85] tracking-[-0.04em] text-purple-600/90 sm:text-[6.5rem] lg:text-[7rem]">
            {member.topLabel}
          </p>
          
          {/* Subtitle - Clean positioning */}
          <p className="mt-2 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-slate-500/70 sm:text-xs">
            {member.subtitle}
          </p>
        </motion.div>
      </div>

      {/* FOREGROUND LAYER - Portrait Image (overlays text) */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <motion.img
          src={member.image}
          alt={member.name}
          animate={{
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.7 }}
          className="h-full w-full object-cover object-center transition-all duration-700"
          style={{
            filter: isHovered ? 'grayscale(0%) brightness(1.1)' : 'grayscale(100%) brightness(0.7)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0.4) 95%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0.4) 95%, rgba(0,0,0,0) 100%)',
          }}
          loading="lazy"
        />
        
        {/* Bottom Fade Shadow */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent" />
        
        {/* Spotlight Effect */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-br from-orange-500/40 via-transparent to-violet-500/20"
        />
      </div>

      {/* Bottom Info Strip */}
      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/95 via-black/90 to-transparent px-6 pb-6 pt-20">
        <motion.div
          animate={{
            y: isHovered ? -4 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {member.name}
          </h3>
          <p className="mt-2 text-sm font-medium text-white/80">
            {member.role}
          </p>
        </motion.div>
      </div>

      {/* Floating Connect Button with Glassmorphism + Rolling Social Reveal */}
      <div className="absolute bottom-32 left-1/2 z-30 -translate-x-1/2">
        <AnimatePresence mode="wait">
          {!socialOpen ? (
            <motion.div
              key="connect-button-wrap"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="group relative"
            >
              {/* Animated border pulse ring */}
              <motion.div
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full border border-purple-400/60"
              />
              <motion.div
                animate={{
                  scale: [1, 1.45, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="absolute inset-0 rounded-full border border-indigo-400/40"
              />

              {/* Glassmorphism Connect Button */}
              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleSocial}
                className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/90 shadow-[0_8px_32px_rgba(124,58,237,0.25),0_2px_8px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-all duration-500 hover:bg-white hover:shadow-[0_12px_48px_rgba(124,58,237,0.4),0_0_0_1px_rgba(139,92,246,0.3)]"
                aria-label="Connect — view profile and social links"
              >
                {/* Inner glow on hover */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/0 to-indigo-500/0 opacity-0 transition-opacity duration-300 group-hover:from-purple-500/10 group-hover:to-indigo-500/10 group-hover:opacity-100" />

                {/* ArrowUpRight Icon */}
                <svg
                  className="relative z-10 h-6 w-6 text-purple-600 transition-all duration-300 group-hover:text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </motion.button>

              {/* "Connect" tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.9 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 4, scale: isHovered ? 1 : 0.9 }}
                transition={{ duration: 0.25 }}
                className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/30 bg-slate-900/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white shadow-lg backdrop-blur-sm"
              >
                Connect
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="social-icons"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex items-center gap-3"
            >
              {/* Close Button */}
              <motion.button
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleSocial}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-purple-200 bg-white text-purple-600 shadow-lg transition-colors hover:bg-purple-50"
                aria-label="Close social links"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Social Icons */}
              {[
                { icon: 'X', color: 'hover:bg-slate-700 hover:text-white', delay: 0.15, label: 'X' },
                { icon: 'LinkedIn', color: 'hover:bg-blue-600 hover:text-white', delay: 0.2, label: 'LinkedIn' },
                { icon: 'Instagram', color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 hover:text-white', delay: 0.25, label: 'Instagram' },
                { icon: 'Facebook', color: 'hover:bg-blue-700 hover:text-white', delay: 0.3, label: 'Facebook' },
              ].map((social) => (
                <motion.a
                  key={social.icon}
                  href="#"
                  initial={{ scale: 0, x: -20 }}
                  animate={{ scale: 1, x: 0 }}
                  transition={{ delay: social.delay, type: 'spring', stiffness: 200, damping: 15 }}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex h-12 w-12 items-center justify-center rounded-full border border-purple-200 bg-white text-slate-700 shadow-lg transition-all duration-300 ${social.color}`}
                  aria-label={`${member.name} ${social.label}`}
                >
                  {social.icon === 'X' && (
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                      <path d="M18.9 3h2.92l-6.38 7.3L23 21h-5.88l-4.6-6.01L7.3 21H4.37l6.82-7.8L1 3h6.03l4.15 5.42L18.9 3zm-1.03 16.22h1.62L6.16 4.7H4.42l13.45 14.52z" />
                    </svg>
                  )}
                  {social.icon === 'LinkedIn' && (
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                      <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3A2.02 2.02 0 1 0 5.3 7.04 2.02 2.02 0 0 0 5.25 3zM20.44 13.26c0-3.04-1.62-4.95-4.37-4.95-1.27 0-2.11.7-2.46 1.2v-1h-3.37c.04.66 0 11.49 0 11.49h3.37v-6.42c0-.34.02-.68.12-.92.27-.68.87-1.39 1.88-1.39 1.32 0 1.85 1 1.85 2.48V20H20.44v-6.74z" />
                    </svg>
                  )}
                  {social.icon === 'Instagram' && (
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5zm8.95 1.75a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
                    </svg>
                  )}
                  {social.icon === 'Facebook' && (
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card Glow on Hover */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
        className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_0_60px_rgba(124,58,237,0.15),0_0_60px_rgba(124,58,237,0.2)]"
      />
    </motion.article>
  );
}

// Brand Card Component
// Accordion Item Component
function AccordionItem({ number, title, content, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.04)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors duration-200"
      >
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 text-lg font-bold text-indigo-600">
            {number}
          </span>
          <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {title}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors duration-200 group-hover:bg-violet-100 group-hover:text-violet-600"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 px-6 pb-6 pt-4">
              <p className="text-base leading-relaxed text-slate-600">
                {content}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const teamMembers = [
  {
    name: 'Arjun Malhotra',
    role: 'Founder & CEO',
    topLabel: 'Visionary',
    subtitle: 'CEO MASTERMIND',
    image: teamImage1,
  },
  {
    name: 'Daniel Reeves',
    role: 'Co-Founder & Strategy Director',
    topLabel: 'Strategic',
    subtitle: 'EXPANSION ARCHITECT',
    image: teamImage2,
  },
  {
    name: 'Neha Sharma',
    role: 'Head of Franchise Strategy',
    topLabel: 'Engaging',
    subtitle: 'FRANCHISE GENIUS',
    image: teamImage3,
  },
  {
    name: 'Vikram Singh',
    role: 'Investment Advisor',
    topLabel: 'Builder',
    subtitle: 'INVESTMENT LEAD',
    image: teamImage4,
  },
  {
    name: 'Sneha Mehta',
    role: 'Brand Partnerships Lead',
    topLabel: 'Scaling',
    subtitle: 'PARTNERSHIP EXPERT',
    image: teamImage5,
  },
  {
    name: 'Kiran Rao',
    role: 'Operations Strategist',
    topLabel: 'Creative',
    subtitle: 'OPERATIONS MASTER',
    image: teamImage6,
  },
];

const features = [
  {
    title: 'SMART PLANNING',
    description: 'Structured planning frameworks that align your goals with measurable execution.',
    icon: '◌',
  },
  {
    title: 'EXPERT ADVICE',
    description: 'Actionable guidance from experienced specialists across finance and business growth.',
    icon: '✦',
  },
  {
    title: 'CREATIVE SOLUTIONS',
    description: 'Practical ideas designed to solve real business constraints with speed and clarity.',
    icon: '⬢',
  },
  {
    title: 'BUSINESS GROWTH',
    description: 'Scalable systems that improve efficiency, conversion, and long-term performance.',
    icon: '↗',
  },
];

const customerTestimonials = [
  {
    name: 'Emily Johnson',
    company: 'Johnson Marketing',
    avatar: teamImage1,
    quote:
      "We've seen measurable growth since using iFranchise solutions. It's intuitive, fast, and integrates seamlessly with our existing workflows.",
    icon: '◎',
  },
  {
    name: 'Sophia Martin',
    company: 'Martin Agency',
    avatar: teamImage2,
    quote:
      'Finally, franchise services designed with users in mind. Everything we need is here: smart automation, insights, and amazing support.',
    icon: '✕',
  },
  {
    name: 'Rohit Verma',
    company: 'ScaleCraft Ventures',
    avatar: teamImage3,
    quote:
      'Working with iFranchise gave our team the clarity and speed we needed for expansion. The process is transparent and data-driven.',
    icon: '◌',
  },
];

// Slideshow Images for About Section
const slideshowImages = [
  teamImage1,
  teamImage2,
  teamImage3,
  teamImage4,
];

// ─────────────────────────────────────────────────────────────────────────────

function AboutPage() {
  const [founderModalOpen, setFounderModalOpen] = useState(false);
  const [cofounderModalOpen, setCofounderModalOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Create testimonials loop for marquee
  const testimonialsLoop = [...customerTestimonials, ...customerTestimonials];

  // Auto-advance slideshow (faster - every 3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 3000); // Change slide every 3 seconds (faster)
    
    return () => clearInterval(interval);
  }, []);

  // Disable scroll when modal is open
  useEffect(() => {
    if (founderModalOpen || cofounderModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [founderModalOpen, cofounderModalOpen]);

  const openTeamPage = () => {
    window.history.pushState({}, '', '/team');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <>
    <main className="w-full bg-white">
      {/* HERO SECTION - STRICT GRID */}
      <section className="relative w-full bg-white py-24">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="grid items-center gap-12 lg:grid-cols-12">

            {/* LEFT SIDE — Content (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* H1 */}
              <h1 className="text-[clamp(32px,8vw,56px)] font-black leading-[1.1] tracking-tight text-slate-900">
                India's Franchise Intelligence Engine
              </h1>

              {/* Subtext */}
              <p className="text-[clamp(16px,4vw,18px)] leading-relaxed text-slate-600">
                We engineer scalable franchise growth systems powered by data, execution, and investor alignment.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                <button
                  onClick={() => { window.history.pushState({}, '', '/franchise-opportunities'); window.dispatchEvent(new PopStateEvent('popstate')); }}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-slate-800"
                >
                  Explore Opportunities
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                  </svg>
                </button>
                <button
                  onClick={openTeamPage}
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-slate-200 bg-white px-6 py-3.5 text-[15px] font-semibold text-slate-900 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
                >
                  Meet Leadership
                </button>
              </div>
            </div>

            {/* RIGHT SIDE — System Diagram (5 cols) */}
            <div className="lg:col-span-5 relative w-full" style={{ aspectRatio: '1 / 1' }}>
              
              {/* Center: iF Engine */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  animate={{ y: [-2, 2, -2] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-20 flex flex-col items-center justify-center w-28 h-28 rounded-2xl bg-slate-900 shadow-lg"
                >
                  <span className="text-white font-black text-xl">iF</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-1">Engine</span>
                </motion.div>
              </div>

              {/* 4 Corner Nodes */}
              {[
                { label: 'Market Intelligence', pos: 'top-[15%] left-[10%]', delay: 0 },
                { label: 'Investor Network', pos: 'top-[15%] right-[10%]', delay: 0.5 },
                { label: 'SOP Systems', pos: 'bottom-[15%] left-[10%]', delay: 1 },
                { label: 'Legal & Compliance', pos: 'bottom-[15%] right-[10%]', delay: 1.5 },
              ].map((node, i) => (
                <motion.div 
                  key={i}
                  animate={{ y: [-2, 2, -2] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: node.delay }}
                  className={`absolute ${node.pos} flex flex-col items-center gap-2 w-[100px] sm:w-[120px]`}
                >
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                    <div className="h-2 w-2 rounded-full bg-slate-700" />
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-semibold text-slate-900 text-center leading-tight">{node.label}</p>
                </motion.div>
              ))}

              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="rgba(15,23,42,0.1)" strokeWidth="1" />
                <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="rgba(15,23,42,0.1)" strokeWidth="1" />
                <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="rgba(15,23,42,0.1)" strokeWidth="1" />
                <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="rgba(15,23,42,0.1)" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE SECTION - STRICT GRID */}
      <section className="w-full bg-slate-50 py-24">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          
          {/* Section Header - Centered */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">About Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
              We Build Infrastructure, Not Listings
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              iFranchise transforms franchise opportunities into scalable business systems through data intelligence and strategic execution.
            </p>
          </div>

          {/* Grid Layout - 12 columns - PERFECT HEIGHT ALIGNMENT */}
          <div className="grid gap-8 lg:grid-cols-12 items-stretch">
            
            {/* LEFT - Premium Visual System (5 cols) - FULL HEIGHT MATCH */}
            <div className="lg:col-span-5 mb-8 lg:mb-0 flex">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative w-full"
              >
                {/* Subtle Background Glow */}
                <div className="absolute -inset-4 bg-gradient-to-br from-violet-100/40 via-transparent to-indigo-100/40 blur-3xl opacity-60" />
                
                {/* Main Image Block with Slideshow - FULL HEIGHT */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl h-full">
                  {/* Auto Slideshow Images */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1.08 }}
                      exit={{ opacity: 0, scale: 1 }}
                      transition={{ duration: 1.2, ease: 'easeInOut' }}
                      className="absolute inset-0"
                    >
                      <img
                        src={slideshowImages[currentSlide]}
                        alt={`iFranchise ${currentSlide + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Gradient Overlay at Bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  
                  {/* Slide Indicators */}
                  <div className="absolute bottom-6 left-6 flex gap-1.5">
                    {slideshowImages.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1 rounded-full transition-all duration-500 ${
                          idx === currentSlide ? 'w-8 bg-white' : 'w-1 bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT - 4 Compact Accordion Cards (7 cols) */}
            <div className="lg:col-span-7 space-y-3 flex flex-col">
              
              {/* Card 01 - Our Foundation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`group overflow-hidden rounded-xl border-2 bg-white transition-all duration-250 ${
                  expandedCard === '01' ? 'border-slate-900 shadow-lg' : 'border-slate-200 hover:border-slate-400'
                } ${expandedCard && expandedCard !== '01' ? 'opacity-60' : 'opacity-100'}`}
              >
                <button
                  onClick={() => setExpandedCard(expandedCard === '01' ? null : '01')}
                  className="flex w-full items-center gap-3 p-4 text-left"
                >
                  <span className="text-xl font-black text-slate-900">01</span>
                  <h3 className="flex-1 text-lg font-bold text-slate-900">Our Foundation</h3>
                  <svg 
                    className={`h-5 w-5 text-slate-400 transition-transform duration-250 ${expandedCard === '01' ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedCard === '01' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed">
                      Built on 15+ years of franchise expansion expertise across India and Southeast Asia. We understand the complexities of scaling brands from single locations to multi-city operations.
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Card 02 - Our Approach */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className={`group overflow-hidden rounded-xl border-2 bg-white transition-all duration-250 ${
                  expandedCard === '02' ? 'border-slate-900 shadow-lg' : 'border-slate-200 hover:border-slate-400'
                } ${expandedCard && expandedCard !== '02' ? 'opacity-60' : 'opacity-100'}`}
              >
                <button
                  onClick={() => setExpandedCard(expandedCard === '02' ? null : '02')}
                  className="flex w-full items-center gap-3 p-4 text-left"
                >
                  <span className="text-xl font-black text-slate-900">02</span>
                  <h3 className="flex-1 text-lg font-bold text-slate-900">Our Approach</h3>
                  <svg 
                    className={`h-5 w-5 text-slate-400 transition-transform duration-250 ${expandedCard === '02' ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedCard === '02' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed">
                      Data-driven franchise intelligence combined with investor-grade business systems. Every opportunity is evaluated through our proprietary framework that assesses market viability, operational scalability, and capital efficiency.
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Card 03 - Our Edge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`group overflow-hidden rounded-xl border-2 bg-white transition-all duration-250 ${
                  expandedCard === '03' ? 'border-slate-900 shadow-lg' : 'border-slate-200 hover:border-slate-400'
                } ${expandedCard && expandedCard !== '03' ? 'opacity-60' : 'opacity-100'}`}
              >
                <button
                  onClick={() => setExpandedCard(expandedCard === '03' ? null : '03')}
                  className="flex w-full items-center gap-3 p-4 text-left"
                >
                  <span className="text-xl font-black text-slate-900">03</span>
                  <h3 className="flex-1 text-lg font-bold text-slate-900">Our Edge</h3>
                  <svg 
                    className={`h-5 w-5 text-slate-400 transition-transform duration-250 ${expandedCard === '03' ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedCard === '03' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed">
                      Direct access to 8,000+ verified investors, 350+ scaled brands, and proven expansion frameworks. We don't just connect—we architect sustainable franchise growth ecosystems.
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Card 04 - Vision & Mission */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className={`group overflow-hidden rounded-xl border-2 bg-white transition-all duration-250 ${
                  expandedCard === '04' ? 'border-slate-900 shadow-lg' : 'border-slate-200 hover:border-slate-400'
                } ${expandedCard && expandedCard !== '04' ? 'opacity-60' : 'opacity-100'}`}
              >
                <button
                  onClick={() => setExpandedCard(expandedCard === '04' ? null : '04')}
                  className="flex w-full items-center gap-3 p-4 text-left"
                >
                  <span className="text-xl font-black text-slate-900">04</span>
                  <h3 className="flex-1 text-lg font-bold text-slate-900">Vision & Mission</h3>
                  <svg 
                    className={`h-5 w-5 text-slate-400 transition-transform duration-250 ${expandedCard === '04' ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedCard === '04' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-3">
                      <div>
                        <p className="text-xs font-bold text-slate-900 mb-1">Mission</p>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          To build India's most trusted franchise intelligence ecosystem. We empower entrepreneurs and investors with strategic, transparent, and growth-focused franchise opportunities backed by verified data.
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 mb-1">Vision</p>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          To become the category-defining global franchise infrastructure — where technology meets strategy, trust meets execution, and expansion meets intelligence.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>

            </div>
          </div>

          {/* iFranchise HISTORY CONTINUATION - MINIMAL GAP */}
          <div className="grid gap-8 lg:grid-cols-12 items-stretch mt-8">
            
            {/* LEFT - Static Image (5 cols) - FULL HEIGHT */}
            <div className="lg:col-span-5 flex">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative w-full"
              >
                {/* Subtle Background Glow */}
                <div className="absolute -inset-4 bg-gradient-to-br from-indigo-100/40 via-transparent to-violet-100/40 blur-3xl opacity-60" />
                
                {/* Static Image with Subtle Zoom - FULL HEIGHT */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl h-full">
                  <motion.img
                    initial={{ scale: 1 }}
                    whileInView={{ scale: 1.05 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    src={aboutUsImage}
                    alt="iFranchise History"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              </motion.div>
            </div>

            {/* RIGHT - Content (7 cols) - FULL HEIGHT MATCH */}
            <div className="lg:col-span-7 flex">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col justify-between space-y-5"
              >
                <div className="space-y-5">
                  <h3 className="text-3xl font-bold text-slate-900">
                    iFranchise History
                  </h3>
                  
                  <p className="text-base leading-relaxed text-slate-600">
                    Founded with a vision to revolutionize India's franchise ecosystem, iFranchise emerged from a critical gap in the market — the absence of a structured, transparent, and intelligence-driven platform connecting ambitious entrepreneurs with verified franchise opportunities.
                  </p>
                  
                  <p className="text-base leading-relaxed text-slate-600">
                    What began as a consulting initiative quickly evolved into India's most comprehensive franchise discovery and growth platform. We recognized that traditional franchise models lacked the strategic infrastructure needed for sustainable expansion. Our response was to build a data-driven ecosystem that combines market intelligence, investor networks, and operational frameworks into a unified growth engine.
                  </p>
                  
                  <p className="text-base leading-relaxed text-slate-600">
                    Over the years, we've partnered with 350+ established brands and connected 8,000+ verified investors across India and Southeast Asia. Each partnership is built on three pillars: transparency in operations, verified business intelligence, and strategic execution support. We don't just facilitate connections — we architect scalable franchise systems that transform regional brands into category leaders.
                  </p>
                  
                  <p className="text-base leading-relaxed text-slate-600">
                    Today, iFranchise stands as the trusted bridge between franchise innovation and market execution, empowering entrepreneurs to make informed investment decisions backed by comprehensive due diligence, proven expansion models, and ongoing strategic guidance.
                  </p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Executive Leadership Section - Unified Premium - REDUCED GAP */}
      <section className="w-full bg-gradient-to-b from-white to-slate-50/30 py-16">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-5xl text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">About Leadership</span>
            </div>
            
            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              The Minds Powering iFranchise
            </h2>
            
            <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl">
              Two leaders. One vision. Building India's most trusted franchise growth ecosystem through innovation, systems, and expansion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* LEADERSHIP SECTION - VIEWPORT FIT WITH MODAL - REDUCED GAP */}
      <section className="w-full bg-white py-12">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          
          {/* FOUNDER BLOCK - VIEWPORT FIT */}
          <div className="mb-12">
            <div className="grid gap-6 lg:grid-cols-[35fr_65fr] lg:gap-10 items-start">
              
              {/* LEFT — Compact Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative group"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg" style={{ aspectRatio: '3/4', maxHeight: '380px' }}>
                  <img
                    src={teamImage1}
                    alt="Arjun Malhotra"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-xl font-bold text-white">Arjun Malhotra</p>
                    <p className="text-xs text-white/90 mt-0.5">Founder</p>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT — Professional Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col gap-4"
              >
                
                {/* Name & Role */}
                <div>
                  <h3 className="text-3xl font-black tracking-tight text-slate-900 lg:text-4xl">
                    Arjun Malhotra
                  </h3>
                  <p className="text-base font-semibold text-slate-600 mt-1">
                    Founder & Strategic Growth Architect
                  </p>
                </div>

                {/* Core Statement - Professional Description */}
                <div className="text-base text-slate-600 leading-relaxed space-y-2">
                  <p>
                    Arjun brings over 15 years of strategic expertise in franchise development and business scaling. His vision transformed iFranchise from a consulting initiative into India's leading franchise intelligence platform.
                  </p>
                  <p>
                    With a proven track record of architecting growth systems for 350+ brands, Arjun specializes in converting traditional franchise models into data-driven, scalable ecosystems that deliver predictable expansion outcomes.
                  </p>
                </div>

                {/* Professional Highlights */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-slate-900 font-bold mt-0.5">•</span>
                    <p className="text-sm text-slate-600">15+ years driving franchise expansion across India and Southeast Asia</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-900 font-bold mt-0.5">•</span>
                    <p className="text-sm text-slate-600">Featured in Forbes India 30 Under 30 (2019)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-900 font-bold mt-0.5">•</span>
                    <p className="text-sm text-slate-600">MBA from IIM Ahmedabad, B.Tech from IIT Delhi</p>
                  </div>
                </div>

                {/* View Full Profile Button */}
                <button
                  onClick={() => setFounderModalOpen(true)}
                  className="group mt-2 inline-flex items-center gap-2 self-start rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  <span>View Full Profile</span>
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                  </svg>
                </button>

                {/* Social Links */}
                <div className="flex items-center gap-2 pt-2">
                  <a href="#" aria-label="X" className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-all duration-200 hover:bg-slate-900 hover:text-white">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                      <path d="M18.9 3h2.92l-6.38 7.3L23 21h-5.88l-4.6-6.01L7.3 21H4.37l6.82-7.8L1 3h6.03l4.15 5.42L18.9 3zm-1.03 16.22h1.62L6.16 4.7H4.42l13.45 14.52z" />
                    </svg>
                  </a>
                  <a href="#" aria-label="LinkedIn" className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-all duration-200 hover:bg-slate-900 hover:text-white">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                      <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3A2.02 2.02 0 1 0 5.3 7.04 2.02 2.02 0 0 0 5.25 3zM20.44 13.26c0-3.04-1.62-4.95-4.37-4.95-1.27 0-2.11.7-2.46 1.2v-1h-3.37c.04.66 0 11.49 0 11.49h3.37v-6.42c0-.34.02-.68.12-.92.27-.68.87-1.39 1.88-1.39 1.32 0 1.85 1 1.85 2.48V20H20.44v-6.74z" />
                    </svg>
                  </a>
                  <a href="#" aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-all duration-200 hover:bg-slate-900 hover:text-white">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5zm8.95 1.75a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* CO-FOUNDER BLOCK - VIEWPORT FIT (MIRRORED) */}
          <div>
            <div className="grid gap-6 lg:grid-cols-[65fr_35fr] lg:gap-10 items-start">
              
              {/* LEFT — Professional Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-4 order-2 lg:order-1"
              >
                
                {/* Name & Role */}
                <div>
                  <h3 className="text-3xl font-black tracking-tight text-slate-900 lg:text-4xl">
                    Daniel Reeves
                  </h3>
                  <p className="text-base font-semibold text-slate-600 mt-1">
                    Co-Founder & Expansion Strategy Director
                  </p>
                </div>

                {/* Core Statement - Professional Description */}
                <div className="text-base text-slate-600 leading-relaxed space-y-2">
                  <p>
                    Daniel specializes in operational excellence and franchise system design. His expertise lies in transforming complex business models into streamlined, repeatable frameworks that enable rapid yet sustainable expansion.
                  </p>
                  <p>
                    As Co-Founder and Expansion Strategy Director, he has engineered operational blueprints for hundreds of franchise brands, ensuring each partnership maintains quality standards while achieving aggressive growth targets across diverse markets.
                  </p>
                </div>

                {/* Professional Highlights */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-slate-900 font-bold mt-0.5">•</span>
                    <p className="text-sm text-slate-600">12+ years in operations scaling and multi-city franchise coordination</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-900 font-bold mt-0.5">•</span>
                    <p className="text-sm text-slate-600">Recognized by Economic Times as Top 40 Under 40 (2020)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-900 font-bold mt-0.5">•</span>
                    <p className="text-sm text-slate-600">MBA from INSEAD, B.Eng from NUS Singapore</p>
                  </div>
                </div>

                {/* View Full Profile Button */}
                <button
                  onClick={() => setCofounderModalOpen(true)}
                  className="group mt-2 inline-flex items-center gap-2 self-start rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  <span>View Full Profile</span>
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                  </svg>
                </button>

                {/* Social Links */}
                <div className="flex items-center gap-2 pt-2">
                  <a href="#" aria-label="X" className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-all duration-200 hover:bg-slate-900 hover:text-white">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                      <path d="M18.9 3h2.92l-6.38 7.3L23 21h-5.88l-4.6-6.01L7.3 21H4.37l6.82-7.8L1 3h6.03l4.15 5.42L18.9 3zm-1.03 16.22h1.62L6.16 4.7H4.42l13.45 14.52z" />
                    </svg>
                  </a>
                  <a href="#" aria-label="LinkedIn" className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-all duration-200 hover:bg-slate-900 hover:text-white">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                      <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3A2.02 2.02 0 1 0 5.3 7.04 2.02 2.02 0 0 0 5.25 3zM20.44 13.26c0-3.04-1.62-4.95-4.37-4.95-1.27 0-2.11.7-2.46 1.2v-1h-3.37c.04.66 0 11.49 0 11.49h3.37v-6.42c0-.34.02-.68.12-.92.27-.68.87-1.39 1.88-1.39 1.32 0 1.85 1 1.85 2.48V20H20.44v-6.74z" />
                    </svg>
                  </a>
                  <a href="#" aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-all duration-200 hover:bg-slate-900 hover:text-white">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5zm8.95 1.75a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
                    </svg>
                  </a>
                </div>
              </motion.div>

              {/* RIGHT — Compact Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative group order-1 lg:order-2"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg" style={{ aspectRatio: '3/4', maxHeight: '380px' }}>
                  <img
                    src={teamImage2}
                    alt="Daniel Reeves"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-xl font-bold text-white">Daniel Reeves</p>
                    <p className="text-xs text-white/90 mt-0.5">Co-Founder</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM TEAM SECTION - WHITE LUXURY THEME */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-slate-50/30 to-white py-24">
        {/* Subtle Animated Background Elements */}
        <div className="pointer-events-none absolute inset-0">
          {/* Floating Purple Gradient Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.03, 0.06, 0.03],
              x: [0, 30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute left-[15%] top-[20%] h-[400px] w-[400px] rounded-full bg-purple-500/20 blur-[100px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.04, 0.08, 0.04],
              x: [0, -40, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 3,
            }}
            className="absolute right-[10%] bottom-[15%] h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-[120px]"
          />

          {/* Animated Mesh Lines */}
          <svg className="absolute inset-0 h-full w-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="team-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-purple-900" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#team-grid)" />
          </svg>

          {/* Soft Blur Particles */}
          <motion.div
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute left-[25%] top-[40%] h-3 w-3 rounded-full bg-purple-400/30 blur-sm"
          />
          <motion.div
            animate={{
              y: [0, 25, 0],
              opacity: [0.08, 0.18, 0.08],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
            className="absolute right-[30%] top-[60%] h-2.5 w-2.5 rounded-full bg-violet-400/25 blur-sm"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6">
          {/* Section Header */}
          <div className="flex flex-wrap items-end justify-between gap-8 pb-12">
            {/* Left Side - Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-4xl"
            >
              {/* Small Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-1.5 shadow-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-600" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700">The Pillars</span>
              </div>

              {/* Main Heading */}
              <h2 className="mt-6 text-5xl font-black uppercase tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                The Pillars Behind
                <br />
                iFranchise
              </h2>

              {/* Power Statement Subheading */}
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl">
                Not just a team — the architects, operators, and visionaries building the force behind India's next franchise empire.
              </p>
            </motion.div>

            {/* Right Side - CTA Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={openTeamPage}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-purple-200 bg-white px-6 py-3 text-base font-bold text-slate-900 shadow-[0_4px_20px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-purple-400 hover:bg-purple-50 hover:shadow-[0_8px_32px_rgba(124,58,237,0.2)]"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              {/* Arrow Pill */}
              <span className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-45">
                ↗
              </span>
              
              <span className="relative z-10">Meet the team</span>
            </motion.button>
          </div>

          {/* Team Cards Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <PremiumTeamCard member={member} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY IFRANCHISE / OUR ADVANTAGES SECTION */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-slate-50/30 to-white py-24">
        {/* Subtle Animated Background Elements */}
        <div className="pointer-events-none absolute inset-0">
          {/* Floating Purple Gradient Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.03, 0.06, 0.03],
              x: [0, 30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute left-[15%] top-[20%] h-[400px] w-[400px] rounded-full bg-purple-500/20 blur-[100px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.04, 0.08, 0.04],
              x: [0, -40, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 3,
            }}
            className="absolute right-[10%] bottom-[15%] h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-[120px]"
          />

          {/* Animated Mesh Lines */}
          <svg className="absolute inset-0 h-full w-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="advantages-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-purple-900" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#advantages-grid)" />
          </svg>

          {/* Soft Blur Particles */}
          <motion.div
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute left-[25%] top-[40%] h-3 w-3 rounded-full bg-purple-400/30 blur-sm"
          />
          <motion.div
            animate={{
              y: [0, 25, 0],
              opacity: [0.08, 0.18, 0.08],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
            className="absolute right-[30%] top-[60%] h-2.5 w-2.5 rounded-full bg-violet-400/25 blur-sm"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6">
          {/* Section Header */}
          <div className="mx-auto max-w-4xl text-center">
            {/* Top Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-1.5 shadow-sm"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-600" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700">Our Advantages</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
            >
              Benefits That Define the
              <br />
              iFranchise Advantage
            </motion.h2>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl"
            >
              We don't just connect brands and investors — we deliver intelligence, systems, and strategic infrastructure that accelerate franchise expansion.
            </motion.p>
          </div>

          {/* 4 Premium Cards */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: Verified Franchise Intelligence */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-purple-300 hover:shadow-[0_12px_40px_rgba(124,58,237,0.15)]"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 via-purple-50/50 to-purple-50/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-violet-100 text-purple-600 shadow-sm"
                >
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </motion.div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  Verified Franchise Intelligence
                </h3>

                {/* Description */}
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  Access thoroughly evaluated franchise opportunities backed by trust, transparency, and strategic validation.
                </p>
              </div>
            </motion.article>

            {/* Card 2: Founder–Investor Ecosystem */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-purple-300 hover:shadow-[0_12px_40px_rgba(124,58,237,0.15)]"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 via-purple-50/50 to-purple-50/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-violet-100 text-purple-600 shadow-sm"
                >
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </motion.div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  Founder–Investor Ecosystem
                </h3>

                {/* Description */}
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  Bridge ambitious founders with expansion-ready investors through a unified strategic growth network.
                </p>
              </div>
            </motion.article>

            {/* Card 3: Scalable Expansion Systems */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-purple-300 hover:shadow-[0_12px_40px_rgba(124,58,237,0.15)]"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 via-purple-50/50 to-purple-50/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-violet-100 text-purple-600 shadow-sm"
                >
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </motion.div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  Scalable Expansion Systems
                </h3>

                {/* Description */}
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  Leverage operational frameworks, business scaling tools, and market-entry systems built for long-term category growth.
                </p>
              </div>
            </motion.article>

            {/* Card 4: Category Leadership Positioning */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-purple-300 hover:shadow-[0_12px_40px_rgba(124,58,237,0.15)]"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 via-purple-50/50 to-purple-50/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-violet-100 text-purple-600 shadow-sm"
                >
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </motion.div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  Category Leadership Positioning
                </h3>

                {/* Description */}
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  Transform opportunities into dominant market presence through data-backed visibility and expansion intelligence.
                </p>
              </div>
            </motion.article>
          </div>

          {/* Bottom Trust Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Built for founders. Trusted by investors. Designed for scale.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">

      <section className="pb-12 lg:pb-16">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 shadow-[0_4px_14px_rgba(15,23,42,0.08)]">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            Customers
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#0b0f19] sm:text-5xl">Our customers love us</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Real feedback from teams and individuals who rely on iFranchise to power growth with practical analytics.
          </p>
        </div>

        <div className="mt-10 overflow-hidden">
          <div className="animate-marquee-left flex w-max items-stretch gap-5 py-2" style={{ animationDuration: '30s' }}>
            {testimonialsLoop.map((testimonial, idx) => (
              <article
                key={`${testimonial.name}-${idx}`}
                className="w-[420px] rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
              >
                <div className="flex items-center gap-3">
                  <img src={testimonial.avatar} alt={testimonial.name} className="h-14 w-14 rounded-xl object-cover" loading="lazy" />
                  <div className="flex-1">
                    <p className="text-2xl font-semibold tracking-tight text-[#0b0f19]">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.company}</p>
                  </div>
                  <span className="text-3xl text-violet-700">{testimonial.icon}</span>
                </div>
                <div className="mt-4 border-t border-slate-200 pt-4">
                  <p className="text-base leading-relaxed text-slate-700">{testimonial.quote}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3 text-sm text-slate-600">
          <div className="flex -space-x-2">
            {[
              'https://i.pravatar.cc/40?img=12',
              'https://i.pravatar.cc/40?img=18',
              'https://i.pravatar.cc/40?img=26',
              'https://i.pravatar.cc/40?img=32',
            ].map((avatar) => (
              <img key={avatar} src={avatar} alt="Reviewer avatar" className="h-8 w-8 rounded-full border-2 border-white object-cover" loading="lazy" />
            ))}
          </div>
          <p>Over 15,725+ people gave us review</p>
        </div>
      </section>
      </div>

    </main>

    {/* FOUNDER MODAL - ENHANCED WITH EXCLUSIVE CONTENT - FULLY RESPONSIVE */}
    {founderModalOpen && createPortal(
      <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', overflowY: 'auto' }}
        onClick={(e) => { if (e.target === e.currentTarget) setFounderModalOpen(false); }}>
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }} onClick={() => setFounderModalOpen(false)} />
        <div className="modal-content" style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '520px', borderRadius: '24px', background: '#fff', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.35)', margin: 'auto' }}>
          <div style={{ background: 'linear-gradient(135deg,#1e293b 0%,#312e81 50%,#0f172a 100%)', padding: 'clamp(16px, 4vw, 24px)', position: 'relative' }}>
            <button type="button" onClick={() => setFounderModalOpen(false)}
              style={{ position: 'absolute', right: 16, top: 16, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
              aria-label="Close">&#x2715;</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 3vw, 16px)', paddingTop: 8, flexWrap: 'wrap' }}>
              <div style={{ width: 'clamp(60px, 15vw, 80px)', height: 'clamp(60px, 15vw, 80px)', borderRadius: 16, background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(24px, 6vw, 32px)', fontWeight: 900, color: '#fff', border: '3px solid rgba(255,255,255,0.3)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', flexShrink: 0 }}>
                AM
              </div>
              <div style={{ flex: 1, minWidth: '150px' }}>
                <p style={{ margin: 0, fontSize: 'clamp(9px, 2vw, 11px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Founder & Visionary</p>
                <h3 style={{ margin: 0, fontSize: 'clamp(18px, 4vw, 22px)', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>Arjun Malhotra</h3>
                <p style={{ margin: '4px 0 0', fontSize: 'clamp(11px, 2.5vw, 13px)', fontWeight: 600, color: '#a5b4fc' }}>Strategic Growth Architect</p>
              </div>
            </div>
          </div>
          <div className="modal-scroll" style={{ padding: 'clamp(16px, 4vw, 24px)', maxHeight: '70vh', overflowY: 'auto' }}>
            <p style={{ fontSize: 'clamp(13px, 3vw, 14.5px)', lineHeight: 1.75, color: '#475569', margin: '0 0 20px' }}>
              A visionary entrepreneur with 15+ years transforming franchise ecosystems across India and Southeast Asia. Arjun's data-driven approach has revolutionized how brands scale, combining investor intelligence with operational excellence to build category-defining infrastructure.
            </p>

            {/* Professional Certifications - Responsive */}
            <p style={{ fontSize: 'clamp(10px, 2vw, 11px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', marginBottom: 12 }}>Certifications & Credentials</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(6px, 1.5vw, 8px)', marginBottom: 20 }}>
              {['Certified Franchise Executive (CFE)', 'Strategic Management (Harvard)', 'Venture Capital Analyst', 'Business Valuation Expert'].map((cert) => (
                <span key={cert} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)', border: '1px solid #c4b5fd', borderRadius: 20, padding: '6px 12px', fontSize: 'clamp(10px, 2.5vw, 12px)', fontWeight: 600, color: '#5b21b6' }}>
                  <span style={{ fontSize: 14 }}>🎖️</span><span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{cert}</span>
                </span>
              ))}
            </div>

            {/* Key Achievements with Icons - Responsive */}
            <p style={{ fontSize: 'clamp(10px, 2vw, 11px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', marginBottom: 12 }}>Career Highlights</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '🚀', text: 'Scaled 350+ brands across India and Southeast Asia' },
                { icon: '💰', text: 'Facilitated ₹500Cr+ in franchise capital deployment' },
                { icon: '🌍', text: 'Expanded operations to 100+ cities in 8 countries' },
                { icon: '🤝', text: 'Built network of 8,000+ verified investors' },
                { icon: '📈', text: 'Achieved 95% franchise success rate (industry avg: 60%)' },
                { icon: '🎯', text: 'Advised 50+ unicorn-track startups on expansion strategy' },
              ].map((item) => (
                <li key={item.text} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 'clamp(12px, 3vw, 14px)', color: '#334155', lineHeight: 1.5 }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>{item.text}
                </li>
              ))}
            </ul>

            {/* Awards & Recognition - Responsive */}
            <p style={{ fontSize: 'clamp(10px, 2vw, 11px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', marginBottom: 12 }}>Awards & Recognition</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {[
                { year: '2019', award: 'Forbes India 30 Under 30', color: '#fbbf24' },
                { year: '2021', award: 'Entrepreneur of the Year - Franchise India', color: '#f59e0b' },
                { year: '2022', award: 'Best Franchise Consultant - Asia Pacific', color: '#d97706' },
                { year: '2023', award: 'Business Leader of the Year - ET Now', color: '#b45309' },
                { year: '2024', award: 'Top 10 Franchise Innovators - Global Summit', color: '#92400e' },
              ].map((item) => (
                <div key={item.award} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 12, padding: '10px 12px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 'clamp(35px, 8vw, 40px)', height: 'clamp(35px, 8vw, 40px)', borderRadius: 10, background: item.color, color: '#fff', fontSize: 'clamp(14px, 3.5vw, 18px)', fontWeight: 900, flexShrink: 0 }}>
                    {item.year.slice(2)}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 'clamp(11px, 2.8vw, 13px)', fontWeight: 700, color: '#78350f', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.award}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 'clamp(10px, 2.2vw, 11px)', color: '#92400e' }}>{item.year}</p>
                  </div>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>🏆</span>
                </div>
              ))}
            </div>

            {/* Speaking Engagements - Responsive */}
            <p style={{ fontSize: 'clamp(10px, 2vw, 11px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', marginBottom: 12 }}>Speaking & Media</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(6px, 1.5vw, 8px)', marginBottom: 20 }}>
              {['TEDx Speaker', 'CNBC Contributor', 'Economic Times Columnist', 'YourStory Featured'].map((media) => (
                <span key={media} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#dbeafe', border: '1px solid #93c5fd', borderRadius: 20, padding: '6px 12px', fontSize: 'clamp(10px, 2.5vw, 12px)', fontWeight: 600, color: '#1e40af' }}>
                  <span style={{ fontSize: 14 }}>🎤</span>{media}
                </span>
              ))}
            </div>

            {/* Stats Grid - Responsive */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: 10, marginBottom: 24 }}>
              {[{ v: '350+', l: 'Brands Scaled' }, { v: '₹500Cr+', l: 'Capital Facilitated' }, { v: '8,000+', l: 'Investor Network' }].map((s) => (
                <div key={s.l} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 14, padding: '14px 8px', textAlign: 'center' }}>
                  <p style={{ margin: 0, fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 800, color: '#0f172a' }}>{s.v}</p>
                  <p style={{ margin: '3px 0 0', fontSize: 'clamp(9px, 2.2vw, 11px)', color: '#94a3b8' }}>{s.l}</p>
                </div>
              ))}
            </div>

            {/* Education - Responsive */}
            <p style={{ fontSize: 'clamp(10px, 2vw, 11px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', marginBottom: 12 }}>Education</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '10px 12px' }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>🎓</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 'clamp(11px, 2.8vw, 13px)', fontWeight: 700, color: '#166534', overflow: 'hidden', textOverflow: 'ellipsis' }}>MBA - IIM Ahmedabad</p>
                  <p style={{ margin: '2px 0 0', fontSize: 'clamp(10px, 2.2vw, 11px)', color: '#15803d' }}>Gold Medalist, Strategy & Entrepreneurship</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '10px 12px' }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>🎓</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 'clamp(11px, 2.8vw, 13px)', fontWeight: 700, color: '#166534', overflow: 'hidden', textOverflow: 'ellipsis' }}>B.Tech - IIT Delhi</p>
                  <p style={{ margin: '2px 0 0', fontSize: 'clamp(10px, 2.2vw, 11px)', color: '#15803d' }}>Computer Science, Dean's List</p>
                </div>
              </div>
            </div>

            <button type="button" onClick={() => setFounderModalOpen(false)}
              style={{ width: '100%', padding: 'clamp(12px, 3vw, 14px)', borderRadius: 14, background: '#0f172a', border: 'none', color: '#fff', fontSize: 'clamp(12px, 3vw, 14px)', fontWeight: 700, cursor: 'pointer', touchAction: 'manipulation' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#1e293b'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#0f172a'; }}>
              Close
            </button>
          </div>
        </div>
      </div>,
      document.body
    )}

    {/* CO-FOUNDER MODAL - ENHANCED WITH EXCLUSIVE CONTENT - FULLY RESPONSIVE */}
    {cofounderModalOpen && createPortal(
      <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', overflowY: 'auto' }}
        onClick={(e) => { if (e.target === e.currentTarget) setCofounderModalOpen(false); }}>
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }} onClick={() => setCofounderModalOpen(false)} />
        <div className="modal-content" style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '520px', borderRadius: '24px', background: '#fff', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.35)', margin: 'auto' }}>
          <div style={{ background: 'linear-gradient(135deg,#1e293b 0%,#312e81 50%,#0f172a 100%)', padding: 'clamp(16px, 4vw, 24px)', position: 'relative' }}>
            <button type="button" onClick={() => setCofounderModalOpen(false)}
              style={{ position: 'absolute', right: 16, top: 16, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
              aria-label="Close">&#x2715;</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 3vw, 16px)', paddingTop: 8, flexWrap: 'wrap' }}>
              <div style={{ width: 'clamp(60px, 15vw, 80px)', height: 'clamp(60px, 15vw, 80px)', borderRadius: 16, background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(24px, 6vw, 32px)', fontWeight: 900, color: '#fff', border: '3px solid rgba(255,255,255,0.3)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', flexShrink: 0 }}>
                DR
              </div>
              <div style={{ flex: 1, minWidth: '150px' }}>
                <p style={{ margin: 0, fontSize: 'clamp(9px, 2vw, 11px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Co-Founder & Strategist</p>
                <h3 style={{ margin: 0, fontSize: 'clamp(18px, 4vw, 22px)', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>Daniel Reeves</h3>
                <p style={{ margin: '4px 0 0', fontSize: 'clamp(11px, 2.5vw, 13px)', fontWeight: 600, color: '#a5b4fc' }}>Expansion Strategy Director</p>
              </div>
            </div>
          </div>
          <div className="modal-scroll" style={{ padding: 'clamp(16px, 4vw, 24px)', maxHeight: '70vh', overflowY: 'auto' }}>
            <p style={{ fontSize: 'clamp(13px, 3vw, 14.5px)', lineHeight: 1.75, color: '#475569', margin: '0 0 20px' }}>
              An operations mastermind with 12+ years engineering scalable franchise systems. Daniel's systematic approach to process architecture and multi-city coordination has enabled hundreds of brands to achieve sustainable, profitable expansion across diverse markets.
            </p>

            {/* Professional Certifications - Responsive */}
            <p style={{ fontSize: 'clamp(10px, 2vw, 11px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', marginBottom: 12 }}>Certifications & Credentials</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(6px, 1.5vw, 8px)', marginBottom: 20 }}>
              {['Six Sigma Black Belt', 'PMP Certified', 'Lean Operations Expert', 'Supply Chain Management (MIT)'].map((cert) => (
                <span key={cert} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', border: '1px solid #93c5fd', borderRadius: 20, padding: '6px 12px', fontSize: 'clamp(10px, 2.5vw, 12px)', fontWeight: 600, color: '#1e40af' }}>
                  <span style={{ fontSize: 14 }}>🎖️</span><span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{cert}</span>
                </span>
              ))}
            </div>

            {/* Key Achievements with Icons - Responsive */}
            <p style={{ fontSize: 'clamp(10px, 2vw, 11px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', marginBottom: 12 }}>Career Highlights</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '🏗️', text: 'Engineered operational blueprints for 200+ franchise brands' },
                { icon: '🌏', text: 'Expanded franchise networks across 25+ countries' },
                { icon: '⚡', text: 'Reduced operational costs by 40% through process optimization' },
                { icon: '📊', text: 'Conducted 150+ conversion rate optimization tests' },
                { icon: '🤝', text: 'Built 100+ strategic alliances with industry leaders' },
                { icon: '🎯', text: 'Achieved 98% franchisee satisfaction rate' },
              ].map((item) => (
                <li key={item.text} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 'clamp(12px, 3vw, 14px)', color: '#334155', lineHeight: 1.5 }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>{item.text}
                </li>
              ))}
            </ul>

            {/* Awards & Recognition - Responsive */}
            <p style={{ fontSize: 'clamp(10px, 2vw, 11px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', marginBottom: 12 }}>Awards & Recognition</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {[
                { year: '2020', award: 'Economic Times Top 40 Under 40', color: '#3b82f6' },
                { year: '2021', award: 'Excellence in Operations - Franchise Asia', color: '#2563eb' },
                { year: '2022', award: 'Operations Leader of the Year - Business Today', color: '#1d4ed8' },
                { year: '2023', award: 'Best Process Architect - Business World', color: '#1e40af' },
                { year: '2024', award: 'Innovation in Franchise Systems - Global Forum', color: '#1e3a8a' },
              ].map((item) => (
                <div key={item.award} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#dbeafe', border: '1px solid #93c5fd', borderRadius: 12, padding: '10px 12px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 'clamp(35px, 8vw, 40px)', height: 'clamp(35px, 8vw, 40px)', borderRadius: 10, background: item.color, color: '#fff', fontSize: 'clamp(14px, 3.5vw, 18px)', fontWeight: 900, flexShrink: 0 }}>
                    {item.year.slice(2)}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 'clamp(11px, 2.8vw, 13px)', fontWeight: 700, color: '#1e3a8a', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.award}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 'clamp(10px, 2.2vw, 11px)', color: '#1e40af' }}>{item.year}</p>
                  </div>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>🏆</span>
                </div>
              ))}
            </div>

            {/* Speaking Engagements - Responsive */}
            <p style={{ fontSize: 'clamp(10px, 2vw, 11px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', marginBottom: 12 }}>Speaking & Advisory</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(6px, 1.5vw, 8px)', marginBottom: 20 }}>
              {['Operations Summit Speaker', 'Franchise Council Advisor', 'Inc42 Contributor', 'Startup Mentor'].map((media) => (
                <span key={media} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 20, padding: '6px 12px', fontSize: 'clamp(10px, 2.5vw, 12px)', fontWeight: 600, color: '#92400e' }}>
                  <span style={{ fontSize: 14 }}>🎤</span>{media}
                </span>
              ))}
            </div>

            {/* Stats Grid - Responsive */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: 10, marginBottom: 24 }}>
              {[{ v: '25+', l: 'Countries Reached' }, { v: '150+', l: 'Optimization Tests' }, { v: '100+', l: 'Strategic Alliances' }].map((s) => (
                <div key={s.l} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 14, padding: '14px 8px', textAlign: 'center' }}>
                  <p style={{ margin: 0, fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 800, color: '#0f172a' }}>{s.v}</p>
                  <p style={{ margin: '3px 0 0', fontSize: 'clamp(9px, 2.2vw, 11px)', color: '#94a3b8' }}>{s.l}</p>
                </div>
              ))}
            </div>

            {/* Education - Responsive */}
            <p style={{ fontSize: 'clamp(10px, 2vw, 11px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', marginBottom: 12 }}>Education</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '10px 12px' }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>🎓</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 'clamp(11px, 2.8vw, 13px)', fontWeight: 700, color: '#166534', overflow: 'hidden', textOverflow: 'ellipsis' }}>MBA - INSEAD, France</p>
                  <p style={{ margin: '2px 0 0', fontSize: 'clamp(10px, 2.2vw, 11px)', color: '#15803d' }}>Operations & Strategy, Distinction</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '10px 12px' }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>🎓</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 'clamp(11px, 2.8vw, 13px)', fontWeight: 700, color: '#166534', overflow: 'hidden', textOverflow: 'ellipsis' }}>B.Eng - NUS Singapore</p>
                  <p style={{ margin: '2px 0 0', fontSize: 'clamp(10px, 2.2vw, 11px)', color: '#15803d' }}>Industrial Engineering, First Class Honors</p>
                </div>
              </div>
            </div>

            <button type="button" onClick={() => setCofounderModalOpen(false)}
              style={{ width: '100%', padding: 'clamp(12px, 3vw, 14px)', borderRadius: 14, background: '#0f172a', border: 'none', color: '#fff', fontSize: 'clamp(12px, 3vw, 14px)', fontWeight: 700, cursor: 'pointer', touchAction: 'manipulation' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#1e293b'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#0f172a'; }}>
              Close
            </button>
          </div>
        </div>
      </div>,
      document.body
    )}
    </>
  );
}

export default AboutPage;
