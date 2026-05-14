import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import brandLogo from '../assets/BrandNav.png';

// Premium Icon Components
function ChevronIcon({ className = '' }) {
  return (
    <svg className={`w-4 h-4 transition-transform duration-200 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
    </svg>
  );
}

function MenuIcon({ isOpen }) {
  return (
    <div className="relative h-5 w-5 flex flex-col justify-center gap-1">
      <motion.span
        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        className="block h-0.5 w-5 bg-current origin-center"
      />
      <motion.span
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        className="block h-0.5 w-5 bg-current"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        className="block h-0.5 w-5 bg-current origin-center"
      />
    </div>
  );
}

// Icon Components for Dropdowns
function FranchiseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17l4-4 4 4 4-6 4 2M3 21h18" />
    </svg>
  );
}

function ExpansionIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

function InvestorIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function ConsultingIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function ResearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function LeadGenIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
    </svg>
  );
}

function BlogIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 6.5h15M4.5 12h8M4.5 17.5h15M15.5 10.5h4v4h-4z" />
    </svg>
  );
}

function FAQIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm8 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM3.8 18.2c.6-2 2.5-3.2 4.6-3.2s4 1.2 4.6 3.2M11 18.2c.6-2 2.5-3.2 4.6-3.2 2.1 0 4 1.2 4.6 3.2" />
    </svg>
  );
}

function ProcessIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function AboutIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

// Company Dropdown Items (keeping original style)
const COMPANY_ITEMS = [
  { title: 'About Us', description: 'Learn about our mission and vision.', Icon: AboutIcon, path: '/about' },
  { title: 'Contact Us', description: 'Get in touch with our team.', Icon: ContactIcon, path: '/contact' },
  { title: 'Careers', description: 'Join the iFranchise growth team.', Icon: TeamIcon, badge: '4', path: '/careers' },
];

// Services Dropdown Items
const SERVICES_ITEMS = [
  { title: 'Franchise Discovery', description: 'Find the perfect franchise match', Icon: FranchiseIcon, path: '/services' },
  { title: 'Franchise Expansion', description: 'Scale your brand nationwide', Icon: ExpansionIcon, path: '/services' },
  { title: 'Investor Matching', description: 'Connect with verified investors', Icon: InvestorIcon, path: '/services' },
  { title: 'Franchise Consulting', description: 'Expert guidance for growth', Icon: ConsultingIcon, path: '/services' },
  { title: 'Market Research', description: 'Data-driven market analysis', Icon: ResearchIcon, path: '/services' },
  { title: 'Lead Generation', description: 'Quality leads for your brand', Icon: LeadGenIcon, path: '/services' },
];

// Resources Dropdown Items
const RESOURCES_ITEMS = [
  { title: 'Blog', description: 'Latest insights and updates', Icon: BlogIcon, path: '/blog' },
  { title: 'FAQs', description: 'Common questions answered', Icon: FAQIcon, path: '/services' },
  { title: 'Industry Reports', description: 'Market analysis and trends', Icon: ReportIcon, path: '/blog' },
];

function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const dropdownTimeoutRef = useRef(null);
  const companyRef = useRef(null);
  const resourcesRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open and preserve scroll position
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Save current scroll position
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      setScrollPosition(currentScroll);
      
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${currentScroll}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Restore scroll position without triggering navigation
      if (scrollPosition > 0) {
        window.scrollTo(0, scrollPosition);
      }
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isMobileMenuOpen, scrollPosition]);

  const handleMouseEnter = (dropdown) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const navigateTo = (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileAccordion(null);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigateTo('/');
    }
  };

  return (
    <header
      className={`fixed left-0 top-0 z-[9999] w-full transition-all duration-300 ${
        isScrolled 
          ? 'h-16 border-b border-slate-200/70 bg-white/95 backdrop-blur-md shadow-sm' 
          : 'h-20 border-b border-slate-200/50 bg-white'
      }`}
    >
      <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between h-full px-2 sm:px-4 lg:px-6">
        
        {/* Logo */}
        <div className="flex flex-col mr-auto">
          <a href="/" onClick={handleLogoClick} className="inline-flex items-center gap-2 sm:gap-3">
            <img 
              src={brandLogo} 
              alt="iFranchise" 
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl"
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-extrabold tracking-tight leading-tight text-[#0b0f19]">
                iFranchise
              </span>
              <p className="text-[10px] sm:text-xs leading-tight text-slate-500 hidden xs:block">
                India's Trusted Franchise Growth Platform
              </p>
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-1 text-sm font-medium text-slate-700 lg:flex flex-1 justify-center">
          
          {/* Company Dropdown */}
          <li 
            className="relative"
            onMouseEnter={() => handleMouseEnter('company')}
            onMouseLeave={handleMouseLeave}
            ref={companyRef}
          >
            <button
              onClick={() => navigateTo('/about')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeDropdown === 'company'
                  ? 'text-[#0b0f19] bg-slate-50'
                  : 'hover:text-[#0b0f19] hover:bg-slate-50'
              }`}
            >
              Company
              <ChevronIcon className={activeDropdown === 'company' ? 'rotate-180' : ''} />
            </button>

            <AnimatePresence>
              {activeDropdown === 'company' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute -left-64 top-full mt-2 w-[720px] rounded-2xl border border-slate-200/60 bg-white shadow-2xl"
                >
                  {/* Header Section */}
                  <div className="border-b border-slate-100 p-4">
                    <a href="/" onClick={handleLogoClick} className="flex items-center gap-3">
                      <img 
                        src={brandLogo} 
                        alt="iFranchise" 
                        className="h-12 w-12 rounded-xl"
                      />
                      <div>
                        <span className="text-xl font-bold text-[#0b0f19]">iFranchise</span>
                        <p className="text-xs text-slate-500 mt-0.5">India's Trusted Franchise Growth Platform</p>
                      </div>
                    </a>
                  </div>

                  {/* Content Section */}
                  <div className="grid grid-cols-2 gap-12 p-6 items-start">
                    {/* Left Column — Company Items */}
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-slate-900 mb-3">Company</h3>
                      {COMPANY_ITEMS.map((item) => (
                        <a
                          key={item.title}
                          href={item.path}
                          onClick={(e) => { e.preventDefault(); navigateTo(item.path); }}
                          className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-slate-50"
                        >
                          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 transition-all duration-200 group-hover:bg-slate-900">
                            <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-white transition-colors duration-200" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                              {item.Icon === AboutIcon && <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                              {item.Icon === ContactIcon && <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
                              {item.Icon === TeamIcon && <path d="M8 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm8 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM3.8 18.2c.6-2 2.5-3.2 4.6-3.2s4 1.2 4.6 3.2M11 18.2c.6-2 2.5-3.2 4.6-3.2 2.1 0 4 1.2 4.6 3.2" />}
                            </svg>
                          </span>
                          <div className="flex-1">
                            <span className="flex items-center gap-2 text-sm font-medium text-slate-800 group-hover:text-slate-900">
                              {item.title}
                              {item.badge && (
                                <span className="relative inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm">
                                  {item.badge}
                                  <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-60" />
                                </span>
                              )}
                            </span>
                            <span className="mt-0.5 block text-xs text-slate-500">{item.description}</span>
                          </div>
                          <span className="text-base leading-none text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                        </a>
                      ))}
                    </div>

                    {/* Right Column — Quick Links + CTA */}
                    <div className="flex flex-col">
                      <h3 className="text-sm font-semibold text-slate-900 mb-3">Pages</h3>
                      <div className="space-y-1">
                        <a
                          href="/privacy-policy"
                          onClick={(e) => { e.preventDefault(); navigateTo('/privacy-policy'); }}
                          className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-slate-700 transition-all duration-200 hover:bg-slate-50"
                        >
                          <span>Privacy Policy</span>
                          <span className="text-base leading-none text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                        </a>
                        <a
                          href="/terms-and-conditions"
                          onClick={(e) => { e.preventDefault(); navigateTo('/terms-and-conditions'); }}
                          className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-slate-700 transition-all duration-200 hover:bg-slate-50"
                        >
                          <span>Terms & Conditions</span>
                          <span className="text-base leading-none text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                        </a>
                        <a
                          href="/licenses"
                          onClick={(e) => { e.preventDefault(); navigateTo('/licenses'); }}
                          className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-slate-700 transition-all duration-200 hover:bg-slate-50"
                        >
                          <span>Licenses</span>
                          <span className="text-base leading-none text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                        </a>
                      </div>

                      {/* CTA Button */}
                      <button
                        type="button"
                        onClick={() => window.open('https://cal.com/ifranchise/30min', '_blank')}
                        className="group mt-6 w-full flex items-center justify-center gap-2 rounded-2xl btn-wave bg-[#0B1220] px-4 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#1a2332] hover:shadow-xl hover:-translate-y-0.5"
                      >
                        Book A Call
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M8 12h9" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* Services — direct link */}
          <li>
            <a
              href="/services"
              onClick={(e) => { e.preventDefault(); navigateTo('/services'); }}
              className="inline-flex items-center px-4 py-2 rounded-lg transition-all duration-200 hover:text-[#0b0f19] hover:bg-slate-50"
            >
              Services
            </a>
          </li>

          {/* About Us */}
          <li>
            <a
              href="/franchise-opportunities"
              onClick={(e) => { e.preventDefault(); navigateTo('/franchise-opportunities'); }}
              className="inline-flex items-center px-4 py-2 rounded-lg transition-all duration-200 hover:text-[#0b0f19] hover:bg-slate-50"
            >
              Franchise Opportunities
            </a>
          </li>

          {/* Resources Dropdown */}
          <li 
            className="relative"
            onMouseEnter={() => handleMouseEnter('resources')}
            onMouseLeave={handleMouseLeave}
            ref={resourcesRef}
          >
            <button
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeDropdown === 'resources'
                  ? 'text-[#0b0f19] bg-slate-50'
                  : 'hover:text-[#0b0f19] hover:bg-slate-50'
              }`}
            >
              Resources
              <ChevronIcon className={activeDropdown === 'resources' ? 'rotate-180' : ''} />
            </button>

            <AnimatePresence>
              {activeDropdown === 'resources' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute -left-20 top-full mt-2 w-[400px] rounded-2xl border border-slate-200/60 bg-white shadow-2xl"
                >
                  {/* Header Section */}
                  <div className="border-b border-slate-100 p-4">
                    <h3 className="text-sm font-semibold text-slate-900">Resources</h3>
                    <p className="text-xs text-slate-500 mt-1">Insights, guides, and industry knowledge</p>
                  </div>

                  {/* Content Section */}
                  <div className="p-3">
                    <div className="space-y-1">
                      {RESOURCES_ITEMS.map((item) => (
                        <a
                          key={item.title}
                          href={item.path}
                          onClick={(e) => { e.preventDefault(); navigateTo(item.path); }}
                          className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-slate-50"
                        >
                          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 transition-all duration-200 group-hover:bg-slate-900">
                            <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-white transition-colors duration-200" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                              {item.Icon === BlogIcon && <path d="M4.5 6.5h15M4.5 12h8M4.5 17.5h15M15.5 10.5h4v4h-4z" />}
                              {item.Icon === FAQIcon && <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                              {item.Icon === ReportIcon && <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}
                            </svg>
                          </span>
                          <div className="flex-1">
                            <span className="block text-sm font-medium text-slate-800 group-hover:text-slate-900">{item.title}</span>
                            <span className="mt-0.5 block text-xs text-slate-500">{item.description}</span>
                          </div>
                          <span className="text-base leading-none text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* Contact Us */}
          <li>
            <a
              href="/contact"
              onClick={(e) => { e.preventDefault(); navigateTo('/contact'); }}
              className="inline-flex items-center px-4 py-2 rounded-lg transition-all duration-200 hover:text-[#0b0f19] hover:bg-slate-50"
            >
              Contact Us
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="inline-flex items-center justify-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 lg:hidden min-h-[48px] min-w-[100px] border border-slate-300 text-slate-700 hover:bg-slate-50 active:scale-95"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <MenuIcon isOpen={isMobileMenuOpen} />
          <span className="font-medium">Menu</span>
        </button>

        {/* Desktop CTA Button */}
        <button
          type="button"
          onClick={() => navigateTo('/list-your-brand')}
          className="group hidden items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 lg:inline-flex ml-auto bg-[#0B1220] hover:bg-[#1a2332] hover:shadow-lg hover:shadow-[#0B1220]/25 hover:scale-105"
        >
          List Your Brand
          <motion.div
            className="inline-flex"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRightIcon />
          </motion.div>
        </button>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[99999] bg-black/25 backdrop-blur-sm lg:hidden"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full flex flex-col w-full max-w-sm bg-white shadow-2xl overflow-hidden"
              style={{ position: 'fixed', height: '100vh', maxHeight: '100vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={brandLogo} 
                    alt="iFranchise" 
                    className="h-9 w-9 rounded-xl"
                  />
                  <span className="text-lg font-bold text-[#0b0f19]">iFranchise</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all hover:bg-slate-200"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Menu Items */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <nav className="space-y-2">
                  
                  {/* Company Accordion */}
                  <div className="rounded-xl border border-slate-200">
                    <button
                      onClick={() => setMobileAccordion(mobileAccordion === 'company' ? null : 'company')}
                      className="flex w-full items-center justify-between px-4 py-3 text-left"
                    >
                      <span className="text-base font-semibold text-slate-900">Company</span>
                      <ChevronIcon className={mobileAccordion === 'company' ? 'rotate-180' : ''} />
                    </button>
                    <AnimatePresence>
                      {mobileAccordion === 'company' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden border-t border-slate-100"
                        >
                          <div className="space-y-1 p-2">
                            {COMPANY_ITEMS.map((item) => (
                              <a
                                key={item.title}
                                href={item.path}
                                onClick={(e) => { e.preventDefault(); navigateTo(item.path); }}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                              >
                                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
                                  <item.Icon />
                                </span>
                                <span className="flex items-center gap-2">
                                  {item.title}
                                  {item.badge && (
                                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-[9px] font-bold text-white">
                                      {item.badge}
                                    </span>
                                  )}
                                </span>
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Services — direct link */}
                  <a
                    href="/services"
                    onClick={(e) => { e.preventDefault(); navigateTo('/services'); }}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-base font-semibold text-slate-900 hover:bg-slate-50"
                  >
                    Services
                  </a>

                  {/* About Us */}
                  <a
                    href="/franchise-opportunities"
                    onClick={(e) => { e.preventDefault(); navigateTo('/franchise-opportunities'); }}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-base font-semibold text-slate-900 hover:bg-slate-50"
                  >
                    Franchise Opportunities
                  </a>

                  {/* Resources Accordion */}
                  <div className="rounded-xl border border-slate-200">
                    <button
                      onClick={() => setMobileAccordion(mobileAccordion === 'resources' ? null : 'resources')}
                      className="flex w-full items-center justify-between px-4 py-3 text-left"
                    >
                      <span className="text-base font-semibold text-slate-900">Resources</span>
                      <ChevronIcon className={mobileAccordion === 'resources' ? 'rotate-180' : ''} />
                    </button>
                    <AnimatePresence>
                      {mobileAccordion === 'resources' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden border-t border-slate-100"
                        >
                          <div className="space-y-1 p-2">
                            {RESOURCES_ITEMS.map((item) => (
                              <a
                                key={item.title}
                                href={item.path}
                                onClick={(e) => { e.preventDefault(); navigateTo(item.path); }}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                              >
                                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
                                  <item.Icon />
                                </span>
                                <span>{item.title}</span>
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Contact Us */}
                  <a
                    href="/contact"
                    onClick={(e) => { e.preventDefault(); navigateTo('/contact'); }}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-base font-semibold text-slate-900 hover:bg-slate-50"
                  >
                    Contact Us
                  </a>
                </nav>
              </div>

              {/* Mobile CTA */}
              <div className="border-t border-slate-100 p-4">
                <button
                  type="button"
                  onClick={() => navigateTo('/list-your-brand')}
                  className="group flex w-full items-center justify-center gap-2.5 rounded-2xl btn-wave bg-[#0B1220] px-6 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#1a2332] active:scale-[0.98]"
                >
                  List Your Brand
                  <motion.div
                    className="inline-flex"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRightIcon />
                  </motion.div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
