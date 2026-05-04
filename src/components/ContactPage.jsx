import { useState } from 'react';
import { motion } from 'framer-motion';
import contactImage from '../assets/contact.png';
import contactImage2 from '../assets/contact2.png';
import contactImage3 from '../assets/contact3.png';

function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    website: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          fullName: '',
          contactNumber: '',
          email: '',
          website: '',
          company: '',
          message: ''
        });
      }, 3000);
    }, 1500);
  };

  const FAQ_ITEMS = [
    {
      question: 'How do I choose the right franchise?',
      answer: 'We assess your budget, risk profile, location goals, and preferred industry to shortlist the most suitable models.'
    },
    {
      question: 'What is the typical investment range?',
      answer: 'Most opportunities on our platform start around $20K and can go beyond $250K depending on brand category and market potential.'
    },
    {
      question: 'How long does it take to break even?',
      answer: 'Break-even timelines vary by sector, but many franchise models we work with target 12 to 24 months with disciplined execution.'
    },
    {
      question: 'Do I need prior business experience?',
      answer: 'Not necessarily. Many successful partners are first-time operators and rely on structured onboarding, SOPs, and advisory support.'
    },
    {
      question: 'What support does iFranchise provide?',
      answer: 'We support brand matching, diligence, financial understanding, launch planning, and ongoing growth guidance after onboarding.'
    },
    {
      question: 'Can I operate multiple franchise units?',
      answer: 'Yes. Multi-unit expansion is available for many brands after performance milestones and market readiness checks are met.'
    }
  ];

  return (
    <main className="relative bg-white">
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — PREMIUM HERO (REBUILT)
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center overflow-hidden bg-white">

        {/* ── Background layer ── */}
        <div className="pointer-events-none absolute inset-0">
          {/* Soft gradient wash */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50/40 via-white to-indigo-50/30" />

          {/* Subtle dot grid */}
          <svg className="absolute inset-0 h-full w-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-900" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>

          {/* Large ambient orb — left */}
          <motion.div
            animate={{ scale: [1, 1.18, 1], opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-32 top-1/4 h-[560px] w-[560px] rounded-full bg-violet-400/20 blur-[120px]"
          />
          {/* Large ambient orb — right */}
          <motion.div
            animate={{ scale: [1, 1.22, 1], opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            className="absolute -right-40 bottom-0 h-[640px] w-[640px] rounded-full bg-indigo-400/15 blur-[140px]"
          />

          {/* Particle flow — left to right */}
          <motion.div
            animate={{ x: [-80, 1400], opacity: [0, 0.5, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
            className="absolute top-[38%] h-px w-28 bg-gradient-to-r from-transparent via-violet-400/50 to-transparent"
          />
          <motion.div
            animate={{ x: [1400, -80], opacity: [0, 0.35, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear', delay: 5 }}
            className="absolute top-[62%] h-px w-36 bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent"
          />

          {/* Floating micro-nodes */}
          {[
            { left: '8%', top: '20%', size: 'h-2 w-2', color: 'bg-violet-400/40', dur: 7 },
            { left: '18%', top: '72%', size: 'h-1.5 w-1.5', color: 'bg-indigo-400/35', dur: 9, delay: 1 },
            { left: '88%', top: '18%', size: 'h-2.5 w-2.5', color: 'bg-violet-500/30', dur: 11, delay: 2 },
            { left: '78%', top: '78%', size: 'h-2 w-2', color: 'bg-indigo-500/35', dur: 8, delay: 0.5 },
          ].map((node, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -18, 0], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: node.dur, repeat: Infinity, ease: 'easeInOut', delay: node.delay ?? 0 }}
              className={`absolute ${node.size} ${node.color} rounded-full blur-[1px]`}
              style={{ left: node.left, top: node.top }}
            />
          ))}
        </div>

        {/* ── Main content ── */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12 py-10 lg:py-0">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">

            {/* ── LEFT: Text block ── */}
            <div className="flex flex-col justify-center lg:pl-8 xl:pl-12 text-center lg:text-left items-center lg:items-start">

              {/* Trust badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 shadow-sm"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500" />
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-700">
                  India's Trusted Franchise Growth Platform
                </span>
              </motion.div>

              {/* Headline — staggered word reveal */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ opacity: 0, y: 48 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl xl:text-6xl"
                >
                  Let's grow your{' '}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                      brand
                    </span>
                    {/* Animated gradient underline */}
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
                    />
                  </span>{' '}
                  together.
                </motion.h1>
              </div>

              {/* Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                className="mt-6 max-w-[480px] text-lg leading-relaxed text-slate-600"
              >
                Positioning for founders, franchise brands, and expansion leaders through strategy, intelligence, and scalable growth.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
                className="mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white shadow-[0_8px_32px_rgba(15,23,42,0.18)] transition-all duration-300 hover:bg-slate-800 hover:shadow-[0_12px_40px_rgba(15,23,42,0.28)]"
                >
                  {/* Shine sweep */}
                  <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  <span className="relative z-10">Start Your Growth Journey</span>

                  {/* Arrow micro-slide */}
                  <motion.svg
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative z-10 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </motion.button>
              </motion.div>

              {/* Soft connector beam toward image */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="mt-12 hidden origin-left lg:block"
              >
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-violet-300/60 via-indigo-300/40 to-transparent" />
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="h-2 w-2 rounded-full bg-violet-400"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                    className="h-1.5 w-1.5 rounded-full bg-indigo-400"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                    className="h-1 w-1 rounded-full bg-violet-300"
                  />
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: Image block — clean orbit system ── */}
            <div className="relative flex items-center justify-center lg:-ml-8 xl:-ml-16 mt-4 lg:mt-0">

              {/* ── LAYER 0: Deep spotlight glow behind image ── */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.14, 1], opacity: [0.14, 0.26, 0.14] }}
                  transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-[380px] w-[380px] rounded-full bg-gradient-to-br from-violet-400/25 via-indigo-300/15 to-transparent blur-[80px] lg:h-[480px] lg:w-[480px]"
                />
              </div>

              {/* ── LAYER 1: Rotating orbit rings (CSS transform, no overlap) ── */}
              {/* Outer ring — slowest */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                className="pointer-events-none absolute h-[min(520px,80vw)] w-[min(520px,80vw)] rounded-full border border-violet-300/20 lg:h-[600px] lg:w-[600px]"
                aria-hidden="true"
              />
              {/* Mid ring — medium, reverse */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="pointer-events-none absolute h-[min(420px,65vw)] w-[min(420px,65vw)] rounded-full border border-indigo-300/20 lg:h-[490px] lg:w-[490px]"
                style={{ borderStyle: 'dashed' }}
                aria-hidden="true"
              />
              {/* Inner ring — fastest, hidden on small mobile */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                className="pointer-events-none absolute hidden h-[330px] w-[330px] rounded-full border border-purple-200/22 sm:block lg:h-[390px] lg:w-[390px]"
                aria-hidden="true"
              />

              {/* ── LAYER 2: Perimeter icon nodes — OUTSIDE image safe zone ── */}

              {/* TOP-RIGHT corner node — Growth arrow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.7 },
                  scale: { duration: 0.5, delay: 0.7 },
                  y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute right-0 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-violet-200/70 bg-white/80 shadow-[0_4px_20px_rgba(124,58,237,0.12)] backdrop-blur-sm lg:-right-6 lg:top-8"
                aria-hidden="true"
              >
                <svg className="h-5 w-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </motion.div>

              {/* UPPER-LEFT corner node — Globe */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.9 },
                  scale: { duration: 0.5, delay: 0.9 },
                  y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
                }}
                className="absolute left-0 top-12 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-indigo-200/70 bg-white/80 shadow-[0_4px_20px_rgba(99,102,241,0.12)] backdrop-blur-sm lg:-left-4 lg:top-16"
                aria-hidden="true"
              >
                <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>

              {/* BOTTOM-RIGHT corner node — Network pulse */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 1.1 },
                  scale: { duration: 0.5, delay: 1.1 },
                  y: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 },
                }}
                className="absolute bottom-12 right-0 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-purple-200/70 bg-white/80 shadow-[0_4px_20px_rgba(168,85,247,0.12)] backdrop-blur-sm lg:-right-4 lg:bottom-16"
                aria-hidden="true"
              >
                <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </motion.div>

              {/* BOTTOM-LEFT corner node — Strategy */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 1.3 },
                  scale: { duration: 0.5, delay: 1.3 },
                  y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
                }}
                className="absolute bottom-8 left-0 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 shadow-[0_4px_20px_rgba(15,23,42,0.08)] backdrop-blur-sm lg:-left-4 lg:bottom-12"
                aria-hidden="true"
              >
                <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </motion.div>

              {/* ── LAYER 3: Floating particles ── */}
              {[
                { top: '15%', left: '12%', size: 'h-1.5 w-1.5', color: 'bg-violet-400/50', dur: 6 },
                { top: '80%', left: '15%', size: 'h-1 w-1', color: 'bg-indigo-400/40', dur: 8, delay: 1 },
                { top: '10%', right: '12%', size: 'h-2 w-2', color: 'bg-purple-400/35', dur: 7, delay: 0.5 },
                { top: '75%', right: '10%', size: 'h-1.5 w-1.5', color: 'bg-violet-300/45', dur: 9, delay: 2 },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -12, 0], opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay ?? 0 }}
                  className={`pointer-events-none absolute ${p.size} ${p.color} rounded-full blur-[0.5px]`}
                  style={{ top: p.top, left: p.left, right: p.right }}
                  aria-hidden="true"
                />
              ))}


              {/* ── Main image — clean, unobstructed ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 mx-8 my-10"
              >
                <motion.img
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.018, 1],
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                  src={contactImage}
                  alt="Professional workspace — iFranchise"
                  className="relative w-[75vw] max-w-[380px] object-contain drop-shadow-[0_24px_48px_rgba(15,23,42,0.14)] sm:w-full lg:max-w-[460px] xl:max-w-[500px]"
                />

                {/* Ground shadow pulse */}
                <motion.div
                  animate={{ scaleX: [1, 1.08, 1], opacity: [0.15, 0.25, 0.15] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-full bg-slate-400/20 blur-xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - CONTACT FORM (FULL VIEWPORT FIT) */}
      <section className="w-full bg-gradient-to-br from-slate-50/30 via-white to-purple-50/20 min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-8">
          <div id="contact-form" className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Large Image + Social Links */}
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex flex-col items-center justify-center order-last lg:order-first space-y-6"
            >
              {/* Image Container */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[400px] h-[400px] lg:w-[480px] lg:h-[480px] bg-gradient-to-br from-slate-100/40 via-purple-50/30 to-slate-100/40 rounded-[40%_60%_70%_30%] blur-sm"></div>
                </div>
                
                <div className="relative z-10">
                  <motion.img
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                    src={contactImage2}
                    alt="Contact support"
                    className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain drop-shadow-lg"
                  />
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 lg:-top-12 lg:left-2/3 lg:-translate-x-1/2"
                  >
                    <div className="bg-white rounded-2xl px-5 py-3 shadow-xl border border-slate-200/50 relative">
                      <p className="text-base font-medium text-slate-700">Let's Connect!</p>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                    </div>
                  </motion.div>
                  
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-3/4 h-12 bg-slate-200/30 rounded-full blur-xl"></div>
                </div>
              </div>

              {/* Premium Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                className="flex flex-col items-center space-y-4"
              >
                <p className="text-sm font-medium text-slate-600">Connect with iFranchise</p>
                
                <div className="flex items-center gap-4">
                  {/* Instagram */}
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex items-center justify-center w-12 h-12 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-300"
                  >
                    <svg className="w-5 h-5 text-slate-600 group-hover:text-purple-600 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </motion.a>

                  {/* YouTube */}
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex items-center justify-center w-12 h-12 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-300"
                  >
                    <svg className="w-5 h-5 text-slate-600 group-hover:text-purple-600 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </motion.a>

                  {/* X (Twitter) */}
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex items-center justify-center w-12 h-12 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-300"
                  >
                    <svg className="w-4 h-4 text-slate-600 group-hover:text-purple-600 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </motion.a>

                  {/* LinkedIn */}
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex items-center justify-center w-12 h-12 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-300"
                  >
                    <svg className="w-5 h-5 text-slate-600 group-hover:text-purple-600 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="order-first lg:order-last"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl p-6 lg:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
                    Send Message
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    Ready to scale your business? Fill out the form and we'll get back to you within 24 hours.
                  </p>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">Message Sent!</h3>
                    <p className="text-slate-600 text-sm">Thank you for reaching out. We'll be in touch soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="w-full px-3 py-3 rounded-lg border border-slate-200 focus:border-purple-400 focus:ring-3 focus:ring-purple-100 transition-all duration-300 bg-white/80 text-slate-900 placeholder-slate-500 text-sm"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Contact Number *</label>
                        <input
                          type="tel"
                          required
                          value={formData.contactNumber}
                          onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                          className="w-full px-3 py-3 rounded-lg border border-slate-200 focus:border-purple-400 focus:ring-3 focus:ring-purple-100 transition-all duration-300 bg-white/80 text-slate-900 placeholder-slate-500 text-sm"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-3 py-3 rounded-lg border border-slate-200 focus:border-purple-400 focus:ring-3 focus:ring-purple-100 transition-all duration-300 bg-white/80 text-slate-900 placeholder-slate-500 text-sm"
                          placeholder="Enter your email address"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Website / Portfolio</label>
                        <input
                          type="url"
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          className="w-full px-3 py-3 rounded-lg border border-slate-200 focus:border-purple-400 focus:ring-3 focus:ring-purple-100 transition-all duration-300 bg-white/80 text-slate-900 placeholder-slate-500 text-sm"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Company Name</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="w-full px-3 py-3 rounded-lg border border-slate-200 focus:border-purple-400 focus:ring-3 focus:ring-purple-100 transition-all duration-300 bg-white/80 text-slate-900 placeholder-slate-500 text-sm"
                        placeholder="Enter your company name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Message *</label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="w-full px-3 py-3 rounded-lg border border-slate-200 focus:border-purple-400 focus:ring-3 focus:ring-purple-100 transition-all duration-300 bg-white/80 text-slate-900 placeholder-slate-500 resize-none text-sm"
                        placeholder="Tell us about your project and goals..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </div>
                      ) : (
                        'Send Message'
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - OUR LOCATION MAP (TIGHT SPACING) */}
      <section className="w-full bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-600 mb-4">
              OUR LOCATION
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
              Built in Bangalore. Scaling Across India.
            </h2>
            
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Strategically positioned in India's innovation capital to connect founders, investors, and franchise ecosystems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d77.49085452148437!3d12.953945614117967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4aa0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1703123456789!5m2!1sen!2sin"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[500px] transition-all duration-300"
                title="Bangalore Location Map"
              ></iframe>
              
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-200/30 transition-all duration-300 pointer-events-none"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 - FAQ (CLEAN SPACING) */}
      <section className="w-full bg-slate-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything founders, investors, and franchise partners need to know.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-2">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <motion.button
                  key={item.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setOpenFaq(prev => prev === index ? -1 : index)}
                  className="text-left rounded-xl border border-slate-200 bg-white p-5 transition duration-300 hover:border-slate-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-semibold text-slate-900 pr-2">{item.question}</p>
                    <span className="text-lg font-semibold text-purple-600 flex-shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                  <div className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}>
                    <div className="overflow-hidden">
                      <p className="text-sm leading-relaxed text-slate-600">{item.answer}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5 - PREMIUM "GET IN TOUCH" TRUST BLOCK (FULL SCREEN) */}
      <section className="w-full bg-white min-h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
          {/* Section Header - Tight Spacing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-600 mb-6">
              CONFUSED ABOUT SCALING?
            </div>
            
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Confused about business growth, branding, or franchise expansion?
            </h2>
            
            <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Let iFranchise guide your next move with strategic clarity, market intelligence, and founder-first execution.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Contact Info Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-last lg:order-first"
            >
              <div className="relative group">
                <div className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-[0_4px_32px_rgba(11,15,25,0.08)] group-hover:shadow-[0_8px_48px_rgba(11,15,25,0.12)] transition-all duration-500 border border-slate-100">
                  <div className="space-y-2">
                    {/* Email - Interactive */}
                    <motion.a
                      href="mailto:hello@ifranchise.in"
                      whileHover={{ x: 4 }}
                      className="group/item cursor-pointer block"
                    >
                      <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-all duration-300 border border-transparent hover:border-slate-200">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-slate-400 font-medium mb-0.5 uppercase tracking-wide">Email</p>
                          <p className="text-slate-800 font-semibold group-hover/item:text-indigo-600 transition-colors duration-300">hello@ifranchise.in</p>
                        </div>
                        <div className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>
                    </motion.a>

                    {/* Phone - Interactive */}
                    <motion.a
                      href="tel:+919876543210"
                      whileHover={{ x: 4 }}
                      className="group/item cursor-pointer block"
                    >
                      <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-all duration-300 border border-transparent hover:border-slate-200">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-slate-400 font-medium mb-0.5 uppercase tracking-wide">Phone</p>
                          <p className="text-slate-800 font-semibold group-hover/item:text-indigo-600 transition-colors duration-300">+91 98765 43210</p>
                        </div>
                        <div className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>
                    </motion.a>

                    {/* Address - Interactive */}
                    <motion.a
                      href="https://maps.google.com/?q=Bangalore,Karnataka,India"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      className="group/item cursor-pointer block"
                    >
                      <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-all duration-300 border border-transparent hover:border-slate-200">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-slate-400 font-medium mb-0.5 uppercase tracking-wide">Address</p>
                          <p className="text-slate-800 font-semibold group-hover/item:text-indigo-600 transition-colors duration-300">Bangalore, Karnataka, India</p>
                        </div>
                        <div className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>
                    </motion.a>

                    {/* Availability */}
                    <motion.div whileHover={{ x: 4 }} className="group/item">
                      <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-all duration-300 border border-transparent hover:border-slate-200">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-slate-400 font-medium mb-0.5 uppercase tracking-wide">Availability</p>
                          <p className="text-slate-800 font-semibold">Monday to Saturday, 9 AM – 7 PM IST</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side — Premium Visible Animation System */}
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative flex items-center justify-center lg:justify-end order-first lg:order-last"
            >
              <div className="relative flex items-center justify-center" style={{ width: 'min(480px, 90vw)', height: 'min(480px, 90vw)' }}>

                {/* ── LAYER 0: Glow blobs — visible on white ── */}
                {/* Lavender radial glow */}
                <motion.div
                  animate={{ scale: [1, 1.18, 1], opacity: [0.22, 0.38, 0.22] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  className="pointer-events-none absolute h-72 w-72 rounded-full bg-purple-400/20 blur-[60px]"
                />
                {/* Gray spotlight */}
                <motion.div
                  animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.30, 0.18] }}
                  transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                  className="pointer-events-none absolute h-56 w-56 rounded-full bg-slate-300/30 blur-[50px]"
                />

                {/* ── LAYER 1: SVG Radar / radial grid ── */}
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]"
                  viewBox="0 0 480 480"
                  fill="none"
                  aria-hidden="true"
                >
                  {/* Radial spokes */}
                  {[0, 30, 60, 90, 120, 150].map((deg) => (
                    <line
                      key={deg}
                      x1="240" y1="240"
                      x2={240 + Math.cos((deg * Math.PI) / 180) * 220}
                      y2={240 + Math.sin((deg * Math.PI) / 180) * 220}
                      stroke="#a78bfa"
                      strokeWidth="0.6"
                      strokeDasharray="4 6"
                    />
                  ))}
                  {/* Concentric guide circles */}
                  <circle cx="240" cy="240" r="80"  stroke="#c4b5fd" strokeWidth="0.8" strokeDasharray="3 5" />
                  <circle cx="240" cy="240" r="140" stroke="#a78bfa" strokeWidth="0.6" strokeDasharray="2 6" />
                  <circle cx="240" cy="240" r="200" stroke="#818cf8" strokeWidth="0.5" strokeDasharray="2 8" />
                </svg>

                {/* ── LAYER 2: Rotating orbit rings — higher contrast ── */}
                {/* Outer ring — smooth, slowest */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
                  className="pointer-events-none absolute rounded-full"
                  style={{
                    width: 420, height: 420,
                    border: '1px solid',
                    borderColor: 'rgba(167,139,250,0.35)',
                    boxShadow: '0 0 32px rgba(139,92,246,0.08)',
                  }}
                  aria-hidden="true"
                />
                {/* Mid ring — dashed, reverse */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  className="pointer-events-none absolute rounded-full"
                  style={{
                    width: 330, height: 330,
                    border: '1px dashed rgba(148,163,184,0.45)',
                  }}
                  aria-hidden="true"
                />
                {/* Inner ring — dotted, fastest */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  className="pointer-events-none absolute rounded-full"
                  style={{
                    width: 240, height: 240,
                    border: '1.5px solid rgba(196,181,253,0.50)',
                    boxShadow: '0 0 20px rgba(139,92,246,0.10)',
                  }}
                  aria-hidden="true"
                />

                {/* ── LAYER 3: Floating business signal nodes — perimeter only ── */}
                {/* Top — Growth arrow */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    opacity: { duration: 0.4, delay: 0.5 },
                    scale: { duration: 0.4, delay: 0.5 },
                    y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="absolute top-4 left-1/2 z-20 -translate-x-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-violet-300/80 bg-white shadow-[0_4px_20px_rgba(124,58,237,0.18),0_1px_4px_rgba(15,23,42,0.08)] backdrop-blur-sm"
                  aria-hidden="true"
                >
                  <svg className="h-5 w-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </motion.div>

                {/* Right — Globe */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    opacity: { duration: 0.4, delay: 0.7 },
                    scale: { duration: 0.4, delay: 0.7 },
                    y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 },
                  }}
                  className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-indigo-300/80 bg-white shadow-[0_4px_20px_rgba(99,102,241,0.18),0_1px_4px_rgba(15,23,42,0.08)] backdrop-blur-sm"
                  aria-hidden="true"
                >
                  <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>

                {/* Bottom — Strategy bar chart */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  animate={{ y: [0, -7, 0] }}
                  transition={{
                    opacity: { duration: 0.4, delay: 0.9 },
                    scale: { duration: 0.4, delay: 0.9 },
                    y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 },
                  }}
                  className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-purple-300/80 bg-white shadow-[0_4px_20px_rgba(168,85,247,0.18),0_1px_4px_rgba(15,23,42,0.08)] backdrop-blur-sm"
                  aria-hidden="true"
                >
                  <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </motion.div>

                {/* Left — Lightning / scale */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    opacity: { duration: 0.4, delay: 1.1 },
                    scale: { duration: 0.4, delay: 1.1 },
                    y: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
                  }}
                  className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-slate-300/80 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.12),0_1px_4px_rgba(15,23,42,0.06)] backdrop-blur-sm"
                  aria-hidden="true"
                >
                  <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </motion.div>

                {/* ── LAYER 4: Pulse wave rings — visible on white ── */}
                {[0, 1.4, 2.8].map((delay, i) => (
                  <motion.div
                    key={i}
                    className="pointer-events-none absolute rounded-full"
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={{ scale: [0.3, 1.6], opacity: [0.5, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay,
                      ease: 'easeOut',
                    }}
                    style={{
                      width: 160, height: 160,
                      border: '1.5px solid rgba(167,139,250,0.45)',
                    }}
                    aria-hidden="true"
                  />
                ))}

                {/* ── CENTER: Question mark — floating, glowing ── */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  animate={{ y: [0, -10, 0] }}
                  className="relative z-10 flex flex-col items-center"
                >
                  {/* Soft spotlight behind the image */}
                  <div className="absolute inset-0 -z-10 flex items-center justify-center">
                    <div className="h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
                  </div>

                  <motion.img
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                    src={contactImage3}
                    alt="Strategic business clarity"
                    className="relative w-full max-w-[280px] object-contain drop-shadow-[0_20px_40px_rgba(139,92,246,0.18)] lg:max-w-[320px]"
                  />

                  {/* Ground shadow */}
                  <motion.div
                    animate={{ scaleX: [1, 1.1, 1], opacity: [0.18, 0.28, 0.18] }}
                    transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -bottom-4 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full bg-purple-400/20 blur-xl"
                  />
                </motion.div>

                {/* ── Floating micro-particles ── */}
                {[
                  { top: '18%', left: '22%', size: 8, color: 'rgba(167,139,250,0.6)', dur: 5 },
                  { top: '72%', left: '20%', size: 6, color: 'rgba(129,140,248,0.5)', dur: 7, delay: 1 },
                  { top: '15%', right: '22%', size: 7, color: 'rgba(196,181,253,0.65)', dur: 6, delay: 0.5 },
                  { top: '78%', right: '18%', size: 5, color: 'rgba(167,139,250,0.5)', dur: 8, delay: 2 },
                  { top: '45%', left: '8%',  size: 5, color: 'rgba(148,163,184,0.5)', dur: 6.5, delay: 1.5 },
                  { top: '50%', right: '8%', size: 6, color: 'rgba(167,139,250,0.45)', dur: 7.5, delay: 0.8 },
                ].map((p, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay ?? 0 }}
                    className="pointer-events-none absolute rounded-full"
                    style={{
                      top: p.top, left: p.left, right: p.right,
                      width: p.size, height: p.size,
                      background: p.color,
                      boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                    }}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;