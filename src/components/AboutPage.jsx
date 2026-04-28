import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
      className="group relative h-[580px] w-full overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-[0_8px_40px_rgba(15,23,42,0.08)] transition-all duration-500 hover:border-purple-300 hover:shadow-[0_16px_60px_rgba(124,58,237,0.2)]"
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

      {/* Floating Plus Button with Rolling Social Reveal */}
      <div className="absolute bottom-32 left-1/2 z-30 -translate-x-1/2">
        <AnimatePresence mode="wait">
          {!socialOpen ? (
            <motion.button
              key="plus-button"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 45 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleSocial}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-purple-200 bg-white text-purple-600 shadow-[0_8px_32px_rgba(124,58,237,0.2)] transition-all duration-300 hover:bg-purple-50 hover:shadow-[0_12px_40px_rgba(124,58,237,0.3)]"
              aria-label="Show social links"
            >
              <motion.svg
                animate={{ rotate: isHovered ? 90 : 0 }}
                transition={{ duration: 0.3 }}
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </motion.svg>
            </motion.button>
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
function BrandCard({ brand }) {
  return (
    <div className="group relative flex h-20 w-48 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800/80 to-slate-900/80 px-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-violet-400/30 hover:shadow-[0_0_24px_rgba(139,92,246,0.15)] lg:h-24 lg:w-56">
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-indigo-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
      
      {/* Brand name */}
      <span className="relative z-10 text-center text-lg font-bold tracking-wide text-white/90 transition-colors duration-300 group-hover:text-white lg:text-xl">
        {brand.name}
      </span>
      
      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20">
        <div className="h-full w-full bg-gradient-to-r from-violet-400 to-indigo-400" />
      </div>
    </div>
  );
}

// Brand Logos Data - Realistic franchise categories
const brandLogos = [
  { name: 'BurgerBlast', category: 'food' },
  { name: 'FitLife Studio', category: 'fitness' },
  { name: 'KidZone Academy', category: 'education' },
  { name: 'EduSpark', category: 'education' },
  { name: 'RetailHub', category: 'retail' },
  { name: 'UrbanBite', category: 'food' },
  { name: 'SmartCare Clinic', category: 'healthcare' },
  { name: 'GrowthLabs', category: 'business' },
  { name: 'CoffeeHouse Co.', category: 'food' },
  { name: 'TechRepair Pro', category: 'service' },
  { name: 'PetPalace', category: 'retail' },
  { name: 'YogaFlow', category: 'fitness' },
  { name: 'QuickBites', category: 'food' },
  { name: 'AutoCare Plus', category: 'service' },
  { name: 'BeautyBar', category: 'beauty' },
  { name: 'HomeClean Pro', category: 'service' },
];

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
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Daniel Reeves',
    role: 'Co-Founder & Strategy Director',
    topLabel: 'Strategic',
    subtitle: 'EXPANSION ARCHITECT',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Neha Sharma',
    role: 'Head of Franchise Strategy',
    topLabel: 'Engaging',
    subtitle: 'FRANCHISE GENIUS',
    image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Vikram Singh',
    role: 'Investment Advisor',
    topLabel: 'Builder',
    subtitle: 'INVESTMENT LEAD',
    image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Sneha Mehta',
    role: 'Brand Partnerships Lead',
    topLabel: 'Scaling',
    subtitle: 'PARTNERSHIP EXPERT',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Kiran Rao',
    role: 'Operations Strategist',
    topLabel: 'Creative',
    subtitle: 'OPERATIONS MASTER',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
    quote:
      "We've seen measurable growth since using iFranchise solutions. It's intuitive, fast, and integrates seamlessly with our existing workflows.",
    icon: '◎',
  },
  {
    name: 'Sophia Martin',
    company: 'Martin Agency',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    quote:
      'Finally, franchise services designed with users in mind. Everything we need is here: smart automation, insights, and amazing support.',
    icon: '✕',
  },
  {
    name: 'Rohit Verma',
    company: 'ScaleCraft Ventures',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    quote:
      'Working with iFranchise gave our team the clarity and speed we needed for expansion. The process is transparent and data-driven.',
    icon: '◌',
  },
];

function AboutPage() {
  const testimonialsLoop = [...customerTestimonials, ...customerTestimonials];

  const openTeamPage = () => {
    window.history.pushState({}, '', '/team');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <main className="w-full">
      {/* CINEMATIC PREMIUM HERO SECTION - About our Company */}
      <section className="relative w-full overflow-hidden bg-white pt-16 pb-10 lg:pt-20 lg:pb-12">
        {/* Advanced Cinematic Background */}
        <div className="pointer-events-none absolute inset-0">
          {/* Animated gradient mesh */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50/30 via-white to-indigo-50/20" />
          
          {/* Floating strategic grid lines */}
          <svg className="absolute inset-0 h-full w-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-900" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Animated network nodes - floating */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-[10%] top-[15%] h-2 w-2 rounded-full bg-violet-400/40 blur-[1px]"
          />
          <motion.div
            animate={{
              y: [0, 30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute right-[15%] top-[25%] h-3 w-3 rounded-full bg-indigo-400/30 blur-[1px]"
          />
          <motion.div
            animate={{
              y: [0, -25, 0],
              x: [0, 15, 0],
              opacity: [0.25, 0.55, 0.25],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute left-[70%] top-[40%] h-2.5 w-2.5 rounded-full bg-violet-500/35 blur-[1px]"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              x: [0, -10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute left-[25%] bottom-[30%] h-2 w-2 rounded-full bg-indigo-500/40 blur-[1px]"
          />

          {/* Soft glowing pathways */}
          <motion.div
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-[20%] top-[20%] h-64 w-64 rounded-full bg-gradient-to-br from-violet-200/20 to-transparent blur-3xl"
          />
          <motion.div
            animate={{
              opacity: [0.15, 0.35, 0.15],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute right-[15%] bottom-[25%] h-80 w-80 rounded-full bg-gradient-to-tl from-indigo-200/20 to-transparent blur-3xl"
          />

          {/* Particle flows */}
          <motion.div
            animate={{
              x: [-100, 1200],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-[30%] h-[1px] w-32 bg-gradient-to-r from-transparent via-violet-400/40 to-transparent"
          />
          <motion.div
            animate={{
              x: [1200, -100],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
              delay: 3,
            }}
            className="absolute top-[60%] h-[1px] w-40 bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 md:px-12 lg:px-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            {/* LEFT SIDE - Enhanced Brand Narrative */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* WHO WE ARE Pill */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 shadow-sm"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500" />
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-700">Who We Are</span>
              </motion.div>
              
              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
              >
                About our Company
              </motion.h2>
              
              {/* Enhanced Brand Narrative */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6 text-lg leading-relaxed text-slate-600"
              >
                <p>
                  We don't just list franchise opportunities — we{' '}
                  <span className="font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                    engineer scalable growth ecosystems
                  </span>{' '}
                  for founders, investors, and category-defining brands.
                </p>
                
                <p>
                  At iFranchise, we combine{' '}
                  <span className="font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                    franchise discovery intelligence
                  </span>
                  ,{' '}
                  <span className="font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                    investor-grade business scaling
                  </span>
                  , and verified growth ecosystems to transform opportunities into powerful business infrastructures.
                </p>
                
                <p>
                  From strategic expansion systems to founder-investor bridges, we help ambitious leaders unlock{' '}
                  <span className="font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                    category leadership
                  </span>{' '}
                  through trust, transparency, and precision execution.
                </p>
                
                <p className="text-slate-700 font-medium">
                  We believe franchise growth should be transparent, data-driven, and built beyond ordinary listings — because real success comes from strategic execution and verified intelligence.
                </p>
              </motion.div>

              {/* Social Proof Row - Premium Icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="flex items-center gap-3 pt-4"
              >
                <a
                  href="#"
                  aria-label="iFranchise Instagram"
                  className="group relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:scale-110 hover:border-violet-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-indigo-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="relative z-10 h-5 w-5 fill-slate-700 transition-colors duration-300 group-hover:fill-violet-600">
                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5zm8.95 1.75a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
                  </svg>
                </a>

                <a
                  href="#"
                  aria-label="iFranchise X"
                  className="group relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:scale-110 hover:border-slate-400 hover:shadow-[0_0_20px_rgba(71,85,105,0.3)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-500/0 to-slate-600/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="relative z-10 h-4 w-4 fill-slate-700 transition-colors duration-300 group-hover:fill-slate-900">
                    <path d="M18.9 3h2.92l-6.38 7.3L23 21h-5.88l-4.6-6.01L7.3 21H4.37l6.82-7.8L1 3h6.03l4.15 5.42L18.9 3zm-1.03 16.22h1.62L6.16 4.7H4.42l13.45 14.52z" />
                  </svg>
                </a>

                <a
                  href="#"
                  aria-label="iFranchise YouTube"
                  className="group relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:scale-110 hover:border-red-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-600/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="relative z-10 h-5 w-5 fill-slate-700 transition-colors duration-300 group-hover:fill-red-600">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                <a
                  href="#"
                  aria-label="iFranchise LinkedIn"
                  className="group relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:scale-110 hover:border-blue-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-600/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="relative z-10 h-5 w-5 fill-slate-700 transition-colors duration-300 group-hover:fill-blue-600">
                    <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3A2.02 2.02 0 1 0 5.3 7.04 2.02 2.02 0 0 0 5.25 3zM20.44 13.26c0-3.04-1.62-4.95-4.37-4.95-1.27 0-2.11.7-2.46 1.2v-1h-3.37c.04.66 0 11.49 0 11.49h3.37v-6.42c0-.34.02-.68.12-.92.27-.68.87-1.39 1.88-1.39 1.32 0 1.85 1 1.85 2.48V20H20.44v-6.74z" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>

            {/* RIGHT SIDE - Enhanced Accordion */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4"
            >
              <AccordionItem
                number="01"
                title="Our History"
                content="Founded to modernize franchise discovery, iFranchise was built to bridge the gap between investors, founders, and scalable franchise ecosystems. We identified a critical market fragmentation — where trust, transparency, and verified intelligence were missing. Our platform solves the investor-franchise disconnect through strategic data systems and category-defining infrastructure."
                defaultOpen={true}
              />
              
              <AccordionItem
                number="02"
                title="Our Mission"
                content="To build India's most trusted franchise intelligence ecosystem. We empower entrepreneurs and investors with strategic, transparent, and growth-focused franchise opportunities backed by verified data, operational excellence, and investor-grade positioning. Our mission is to transform how brands scale and how investors discover category leadership opportunities."
              />
              
              <AccordionItem
                number="03"
                title="Our Vision"
                content="To become the category-defining global franchise infrastructure — where technology meets strategy, trust meets execution, and expansion meets intelligence. We envision a future where iFranchise powers the world's most ambitious franchise growth ecosystems, setting the standard for verified scaling and strategic leadership."
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brands We Have Worked With Section - Premium Marquee */}
      <section className="w-full bg-white py-12 lg:py-16">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-20">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-700">Brands</span>
            </div>
            
            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Brands we have worked with
            </h2>
            
            <p className="mt-4 text-lg text-slate-600">
              Trusted by ambitious businesses across industries.
            </p>
          </div>

          {/* Premium Dark Container with Marquee */}
          <div className="relative mt-16 overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 shadow-[0_24px_60px_rgba(0,0,0,0.15)] lg:p-12">
            {/* Subtle Grid Pattern */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
              <div className="absolute inset-0 bg-dot-grid" />
            </div>

            {/* Row 1 - Scrolls Right to Left */}
            <div className="relative mb-6 overflow-hidden lg:mb-8">
              <div className="flex animate-marquee-right gap-4 lg:gap-6">
                {[...brandLogos, ...brandLogos].map((brand, idx) => (
                  <BrandCard key={`row1-${idx}`} brand={brand} />
                ))}
              </div>
            </div>

            {/* Row 2 - Scrolls Left to Right */}
            <div className="relative overflow-hidden">
              <div className="flex animate-marquee-left gap-4 lg:gap-6">
                {[...brandLogos.slice().reverse(), ...brandLogos.slice().reverse()].map((brand, idx) => (
                  <BrandCard key={`row2-${idx}`} brand={brand} />
                ))}
              </div>
            </div>

            {/* Gradient Fade Edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-900 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-900 to-transparent" />
          </div>
        </div>
      </section>

      {/* Executive Leadership Section - Unified Premium */}
      <section className="w-full bg-gradient-to-b from-white to-slate-50/30 pt-12 pb-8 lg:pt-16 lg:pb-10">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-20">
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

      {/* Founder Section */}
      <section className="w-full bg-gradient-to-b from-white to-slate-50/30 py-10 lg:py-12">
        <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12 lg:px-20">
          {/* Balanced 50/50 Layout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* LEFT SIDE - Founder Portrait */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex flex-col items-center lg:order-1 lg:items-start"
              >
                {/* Portrait Image */}
                <div className="relative w-full max-w-sm">
                  <div className="relative h-[480px] w-full overflow-hidden rounded-3xl border-[3px] border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:h-[560px]">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                      alt="Arjun Malhotra - Founder of iFranchise"
                      className="h-full w-full object-cover transition-all duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Name Stack (Mobile Only - Centered) */}
                <div className="mt-10 text-center lg:hidden">
                  <h3 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                    Arjun Malhotra
                  </h3>
                  <p className="mt-4 text-base font-semibold text-slate-700 sm:text-lg">
                    Founder & Strategic Growth Architect
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-500">iFranchise</p>
                  
                  {/* Social Icons */}
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <a
                      href="#"
                      aria-label="Arjun Malhotra X"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition duration-200 hover:scale-110 hover:border-slate-400 hover:bg-slate-50"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                        <path d="M18.9 3h2.92l-6.38 7.3L23 21h-5.88l-4.6-6.01L7.3 21H4.37l6.82-7.8L1 3h6.03l4.15 5.42L18.9 3zm-1.03 16.22h1.62L6.16 4.7H4.42l13.45 14.52z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      aria-label="Arjun Malhotra Instagram"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-violet-200 bg-violet-50 text-violet-600 transition duration-200 hover:scale-110 hover:bg-violet-100"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5zm8.95 1.75a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      aria-label="Arjun Malhotra LinkedIn"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-600 transition duration-200 hover:scale-110 hover:bg-blue-100"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                        <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3A2.02 2.02 0 1 0 5.3 7.04 2.02 2.02 0 0 0 5.25 3zM20.44 13.26c0-3.04-1.62-4.95-4.37-4.95-1.27 0-2.11.7-2.46 1.2v-1h-3.37c.04.66 0 11.49 0 11.49h3.37v-6.42c0-.34.02-.68.12-.92.27-.68.87-1.39 1.88-1.39 1.32 0 1.85 1 1.85 2.48V20H20.44v-6.74z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT SIDE - Bio & Credentials */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col justify-center space-y-10 lg:order-2"
              >
                {/* Name & Title (Desktop Only - Hidden on Mobile) */}
                <div className="hidden space-y-3 lg:block">
                  <h3 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                    Arjun Malhotra
                  </h3>
                  <p className="text-base font-semibold text-slate-700 sm:text-lg">
                    Founder & Strategic Growth Architect
                  </p>
                  <p className="text-sm font-medium text-slate-500">iFranchise</p>
                  
                  {/* Social Icons */}
                  <div className="flex items-center gap-3">
                    <a
                      href="#"
                      aria-label="Arjun Malhotra X"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition duration-200 hover:scale-110 hover:border-slate-400 hover:bg-slate-50"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                        <path d="M18.9 3h2.92l-6.38 7.3L23 21h-5.88l-4.6-6.01L7.3 21H4.37l6.82-7.8L1 3h6.03l4.15 5.42L18.9 3zm-1.03 16.22h1.62L6.16 4.7H4.42l13.45 14.52z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      aria-label="Arjun Malhotra Instagram"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-violet-200 bg-violet-50 text-violet-600 transition duration-200 hover:scale-110 hover:bg-violet-100"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5zm8.95 1.75a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      aria-label="Arjun Malhotra LinkedIn"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-600 transition duration-200 hover:scale-110 hover:bg-blue-100"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                        <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3A2.02 2.02 0 1 0 5.3 7.04 2.02 2.02 0 0 0 5.25 3zM20.44 13.26c0-3.04-1.62-4.95-4.37-4.95-1.27 0-2.11.7-2.46 1.2v-1h-3.37c.04.66 0 11.49 0 11.49h3.37v-6.42c0-.34.02-.68.12-.92.27-.68.87-1.39 1.88-1.39 1.32 0 1.85 1 1.85 2.48V20H20.44v-6.74z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Detailed Bio */}
                <div className="space-y-5">
                  <p className="text-lg leading-relaxed text-slate-700 sm:text-xl">
                    Arjun Malhotra's leadership combines strategic foresight, operational precision, and investor-first execution. Through transparency, scalable systems, and category-defining innovation, he has positioned iFranchise as a trusted force in modern franchise intelligence.
                  </p>
                </div>

                {/* Trait Pills */}
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: '◆', label: 'Visionary Strategist' },
                    { icon: '✦', label: 'Investor-First Builder' },
                    { icon: '⬢', label: 'Growth Architect' },
                    { icon: '↗', label: 'Brand Expansion Leader' },
                  ].map((trait, idx) => (
                    <motion.div
                      key={trait.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.5 + idx * 0.08 }}
                      className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md"
                    >
                      <span className="text-base text-slate-400 transition-colors duration-300 group-hover:text-slate-600">
                        {trait.icon}
                      </span>
                      <span className="text-sm font-semibold text-slate-700 transition-colors duration-300 group-hover:text-slate-900">
                        {trait.label}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Featured In / Trust Signals */}
                <div className="space-y-5">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Featured In & Recognized By
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {[
                      'Franchise Media',
                      'Startup India',
                      'Growth Networks',
                    ].map((credential, idx) => (
                      <motion.div
                        key={credential}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.6 + idx * 0.04 }}
                        className="group flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md"
                      >
                        <span className="text-center text-xs font-semibold text-slate-600 transition-colors duration-300 group-hover:text-slate-900">
                          {credential}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Co-Founder Section */}
      <section className="w-full bg-gradient-to-b from-slate-50/30 to-white py-10 lg:py-12">
        <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12 lg:px-20">
          {/* Balanced 50/50 Mirrored Layout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* LEFT SIDE - Bio & Credentials */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col justify-center space-y-10 lg:order-1"
              >
                {/* Name & Title (Desktop Only - Hidden on Mobile) */}
                <div className="hidden space-y-3 lg:block">
                  <h3 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                    Daniel Reeves
                  </h3>
                  <p className="text-base font-semibold text-slate-700 sm:text-lg">
                    Co-Founder & Expansion Strategy Director
                  </p>
                  <p className="text-sm font-medium text-slate-500">iFranchise</p>
                  
                  {/* Social Icons */}
                  <div className="flex items-center gap-3">
                    <a
                      href="#"
                      aria-label="Daniel Reeves X"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition duration-200 hover:scale-110 hover:border-slate-400 hover:bg-slate-50"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                        <path d="M18.9 3h2.92l-6.38 7.3L23 21h-5.88l-4.6-6.01L7.3 21H4.37l6.82-7.8L1 3h6.03l4.15 5.42L18.9 3zm-1.03 16.22h1.62L6.16 4.7H4.42l13.45 14.52z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      aria-label="Daniel Reeves Instagram"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-violet-200 bg-violet-50 text-violet-600 transition duration-200 hover:scale-110 hover:bg-violet-100"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5zm8.95 1.75a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      aria-label="Daniel Reeves LinkedIn"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-600 transition duration-200 hover:scale-110 hover:bg-blue-100"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                        <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3A2.02 2.02 0 1 0 5.3 7.04 2.02 2.02 0 0 0 5.25 3zM20.44 13.26c0-3.04-1.62-4.95-4.37-4.95-1.27 0-2.11.7-2.46 1.2v-1h-3.37c.04.66 0 11.49 0 11.49h3.37v-6.42c0-.34.02-.68.12-.92.27-.68.87-1.39 1.88-1.39 1.32 0 1.85 1 1.85 2.48V20H20.44v-6.74z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Detailed Bio */}
                <div className="space-y-5">
                  <p className="text-lg leading-relaxed text-slate-700 sm:text-xl">
                    Daniel Reeves leads operational scaling, strategic alliances, and franchise growth expansion across iFranchise. His expertise in execution systems and market penetration transforms scalable opportunities into category leadership.
                  </p>
                </div>

                {/* Trait Pills */}
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: '◆', label: 'Expansion Strategist' },
                    { icon: '✦', label: 'Systems Operator' },
                    { icon: '⬢', label: 'Strategic Alliances' },
                    { icon: '↗', label: 'Market Growth Leader' },
                  ].map((trait, idx) => (
                    <motion.div
                      key={trait.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.5 + idx * 0.08 }}
                      className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md"
                    >
                      <span className="text-base text-slate-400 transition-colors duration-300 group-hover:text-slate-600">
                        {trait.icon}
                      </span>
                      <span className="text-sm font-semibold text-slate-700 transition-colors duration-300 group-hover:text-slate-900">
                        {trait.label}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Featured In / Trust Signals */}
                <div className="space-y-5">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Featured In & Recognized By
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {[
                      'Startup Leadership Media',
                      'Franchise Expansion Council',
                      'Strategic Growth Networks',
                    ].map((credential, idx) => (
                      <motion.div
                        key={credential}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.6 + idx * 0.04 }}
                        className="group flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md"
                      >
                        <span className="text-center text-xs font-semibold text-slate-600 transition-colors duration-300 group-hover:text-slate-900">
                          {credential}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* RIGHT SIDE - Co-Founder Portrait */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex flex-col items-center lg:order-2 lg:items-end"
              >
                {/* Portrait Image */}
                <div className="relative w-full max-w-sm">
                  <div className="relative h-[480px] w-full overflow-hidden rounded-3xl border-[3px] border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:h-[560px]">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80"
                      alt="Daniel Reeves - Co-Founder of iFranchise"
                      className="h-full w-full object-cover transition-all duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Name Stack (Mobile Only - Centered) */}
                <div className="mt-10 text-center lg:hidden">
                  <h3 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                    Daniel Reeves
                  </h3>
                  <p className="mt-4 text-base font-semibold text-slate-700 sm:text-lg">
                    Co-Founder & Expansion Strategy Director
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-500">iFranchise</p>
                  
                  {/* Social Icons */}
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <a
                      href="#"
                      aria-label="Daniel Reeves X"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition duration-200 hover:scale-110 hover:border-slate-400 hover:bg-slate-50"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                        <path d="M18.9 3h2.92l-6.38 7.3L23 21h-5.88l-4.6-6.01L7.3 21H4.37l6.82-7.8L1 3h6.03l4.15 5.42L18.9 3zm-1.03 16.22h1.62L6.16 4.7H4.42l13.45 14.52z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      aria-label="Daniel Reeves Instagram"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-violet-200 bg-violet-50 text-violet-600 transition duration-200 hover:scale-110 hover:bg-violet-100"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5zm8.95 1.75a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      aria-label="Daniel Reeves LinkedIn"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-600 transition duration-200 hover:scale-110 hover:bg-blue-100"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                        <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3A2.02 2.02 0 1 0 5.3 7.04 2.02 2.02 0 0 0 5.25 3zM20.44 13.26c0-3.04-1.62-4.95-4.37-4.95-1.27 0-2.11.7-2.46 1.2v-1h-3.37c.04.66 0 11.49 0 11.49h3.37v-6.42c0-.34.02-.68.12-.92.27-.68.87-1.39 1.88-1.39 1.32 0 1.85 1 1.85 2.48V20H20.44v-6.74z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
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

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-20">
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

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-20">
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
  );
}

export default AboutPage;
