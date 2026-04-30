import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Menu Icon Component
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

function FolderIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 stroke-slate-500">
      <path
        d="M3.5 8.5a2 2 0 0 1 2-2h4l1.6 1.7h7.4a2 2 0 0 1 2 2V16a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V8.5z"
        fill="none"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BlogIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 stroke-slate-500">
      <path
        d="M4.5 6.5h15M4.5 12h8M4.5 17.5h15M15.5 10.5h4v4h-4z"
        fill="none"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 stroke-slate-500">
      <path
        d="M8 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm8 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM3.8 18.2c.6-2 2.5-3.2 4.6-3.2s4 1.2 4.6 3.2M11 18.2c.6-2 2.5-3.2 4.6-3.2 2.1 0 4 1.2 4.6 3.2"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon({ className = '' }) {
  return (
    <span className={`text-base leading-none text-slate-400 transition duration-200 ${className}`}>
      →
    </span>
  );
}

const LEFT_ITEMS = [
  { title: 'Services', description: 'Explore our franchise consulting services.', Icon: FolderIcon },
  { title: 'Blog', description: 'Design tips & insights from blogs.', Icon: BlogIcon },
  { title: 'Explore Brands', description: 'Discover scalable franchise brands.', Icon: TeamIcon },
  { title: 'Careers', description: 'Join the iFranchise growth team.', Icon: TeamIcon },
];

const RIGHT_ITEMS = [
  { title: 'Contact Us', path: '/contact' },
  { title: 'Privacy Policy', path: '/privacy-policy' },
  { title: 'Terms & Conditions', path: '/terms-and-conditions' },
  { title: 'Licenses', path: '/licenses' },
  { title: '404 Page', path: '/404' },
];

function Navbar() {
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHomeActive, setIsHomeActive] = useState(false);
  const [isAboutActive, setIsAboutActive] = useState(false);
  const [isContactActive, setIsContactActive] = useState(false);
  const [isBlogActive, setIsBlogActive] = useState(false);
  const companyMenuRef = useRef(null);
  const companyButtonRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 8);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isCompanyOpen) {
      return undefined;
    }

    function onPointerDown(event) {
      const target = event.target;
      const isInsideMenu = companyMenuRef.current?.contains(target);
      const isInsideButton = companyButtonRef.current?.contains(target);

      if (!isInsideMenu && !isInsideButton) {
        setIsCompanyOpen(false);
      }
    }

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setIsCompanyOpen(false);
        companyButtonRef.current?.focus();
      }
    }

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isCompanyOpen]);

  useEffect(() => {
    const updateActiveStates = () => {
      setIsHomeActive(window.location.pathname === '/');
      setIsAboutActive(window.location.pathname === '/about');
      setIsContactActive(window.location.pathname === '/contact' || window.location.pathname === '/contact-us');
      setIsBlogActive(window.location.pathname === '/blog' || window.location.pathname.startsWith('/blog/'));
    };

    updateActiveStates();
    window.addEventListener('popstate', updateActiveStates);
    window.addEventListener('hashchange', updateActiveStates);
    return () => {
      window.removeEventListener('popstate', updateActiveStates);
      window.removeEventListener('hashchange', updateActiveStates);
    };
  }, []);

  const navigateTo = (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    setIsMobileMenuOpen(false);
    setIsCompanyOpen(false);
  };

  const handleHomeClick = (event) => {
    if (window.location.pathname === '/') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      event.preventDefault();
      navigateTo('/');
    }
    setIsMobileMenuOpen(false);
    setIsCompanyOpen(false);
  };

  const handleServicesClick = (event) => {
    event.preventDefault();
    navigateTo('/services');
  };

  const isContactPage = false;

  return (
    <header
      className={`fixed left-0 z-[9999] w-full transition duration-300 ${
        isContactPage
          ? 'top-5 border-transparent'
          : `top-0 border-b ${isScrolled ? 'h-16 border-slate-200/70 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)]' : 'h-20 border-slate-200/50 bg-white'}`
      }`}
    >
      <nav
        className={`mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8 ${
          isContactPage
            ? 'h-[62px] max-w-[840px] rounded-full border border-white/20 bg-white/10 shadow-[0_14px_40px_rgba(0,0,0,0.42)] backdrop-blur-xl'
            : 'h-full'
        }`}
      >
        {/* Logo - Responsive Sizing */}
        <div className="flex flex-col">
          <a href="/" onClick={handleHomeClick} className="inline-flex items-center gap-2 sm:gap-3">
            <img 
              src="/logo.png" 
              alt="iFranchise" 
              className="h-8 w-auto sm:h-10"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iIzBiMTIyMCIvPgo8dGV4dCB4PSIyMCIgeT0iMjQiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5pPC90ZXh0Pgo8L3N2Zz4K';
              }}
            />
            <div className="flex flex-col">
              <span className={`text-lg sm:text-2xl font-extrabold tracking-tight leading-tight ${isContactPage ? 'text-white' : 'text-[#0b0f19]'}`}>
                iFranchise
              </span>
              <p className={`text-[10px] sm:text-xs leading-tight ${isContactPage ? 'text-slate-300' : 'text-slate-500'} hidden xs:block`}>
                India's Trusted Franchise Growth Platform
              </p>
            </div>
          </a>
        </div>

        {isContactPage ? (
          <ul className="hidden items-center gap-6 text-sm font-medium text-slate-100 lg:flex">
            <li>
              <a href="/" onClick={handleHomeClick} className="transition duration-200 hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#integrations" className="transition duration-200 hover:text-white/90">
                Integrations
              </a>
            </li>
            <li>
              <a href="#pricing" className="transition duration-200 hover:text-white/90">
                Pricing
              </a>
            </li>
            <li>
              <a href="/blog" className="transition duration-200 hover:text-white">
                Blog
              </a>
            </li>
            <li>
              <a
                href="/contact"
                onClick={(event) => {
                  event.preventDefault();
                  navigateTo('/contact');
                }}
                className="rounded-full border border-emerald-200/40 bg-emerald-300/10 px-3 py-1.5 text-emerald-100"
              >
                Contact
              </a>
            </li>
          </ul>
        ) : (
        <ul className="hidden items-center gap-8 text-sm font-medium text-slate-700 lg:flex">
          <li>
            <a
              href="/"
              onClick={handleHomeClick}
              className={`border-b pb-1 transition duration-200 ${
                isHomeActive
                  ? 'border-[#0b0f19] text-[#0b0f19]'
                  : 'border-transparent hover:text-[#0b0f19]'
              }`}
            >
              Home
            </a>
          </li>
          <li className="relative">
            <button
              ref={companyButtonRef}
              type="button"
              onClick={() => setIsCompanyOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:text-[#0b0f19] hover:bg-slate-100 rounded-lg border border-transparent hover:border-slate-200"
              aria-expanded={isCompanyOpen}
              aria-haspopup="true"
              aria-controls="company-menu"
            >
              Company
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${isCompanyOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isCompanyOpen ? (
              <div
                ref={companyMenuRef}
                id="company-menu"
                className="animate-mega-in absolute left-1/2 top-11 w-[720px] -translate-x-1/2 rounded-[16px] border border-slate-200/60 bg-white shadow-2xl"
              >
                {/* Header Section */}
                <div className="border-b border-slate-100 p-4">
                  <a href="#" className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0b0f19] shadow-lg">
                      <span className="text-xl font-bold text-white">i</span>
                    </div>
                    <div>
                      <span className="text-xl font-bold text-[#0b0f19]">iFranchise</span>
                      <p className="text-xs text-slate-500 mt-0.5">India's Trusted Franchise Growth Platform</p>
                    </div>
                  </a>
                </div>

                {/* Content Section */}
                <div className="grid grid-cols-2 gap-12 p-6 items-start">
                  {/* Left Column — Company */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">Company</h3>
                    {LEFT_ITEMS.map((item) => (
                      <a
                        key={item.title}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (item.title === 'Explore Brands') {
                            navigateTo('/franchise-opportunities');
                          } else if (item.title === 'Services') {
                            navigateTo('/services');
                          } else if (item.title === 'Blog') {
                            navigateTo('/blog');
                          } else if (item.title === 'Careers') {
                            navigateTo('/careers');
                          }
                        }}
                        className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-slate-50 hover:shadow-sm"
                      >
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 group-hover:border-[#0b0f19] group-hover:bg-[#0b0f19] transition-colors duration-200">
                          <item.Icon className="h-4 w-4 stroke-slate-600 group-hover:stroke-white" />
                        </span>
                        <div className="flex-1">
                          <span className="flex items-center gap-2 text-sm font-medium text-slate-800">
                            {item.title}
                            {item.badge ? (
                              <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold lowercase tracking-wide text-rose-600">
                                {item.badge}
                              </span>
                            ) : null}
                          </span>
                          <span className="mt-1 block text-xs text-slate-500">{item.description}</span>
                        </div>
                        <ArrowIcon className="text-slate-400 opacity-0 group-hover:opacity-100 group-hover:text-[#0b0f19]" />
                      </a>
                    ))}
                  </div>

                  {/* Right Column — Pages + CTA */}
                  <div className="flex flex-col">
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">Pages</h3>
                    <div className="space-y-1">
                      {RIGHT_ITEMS.map((item) => (
                        <a
                          key={item.title}
                          href={item.path || '#'}
                          onClick={(event) => {
                            event.preventDefault();
                            if (!item.path) return;
                            navigateTo(item.path);
                          }}
                          className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:shadow-sm"
                        >
                          <span className="flex items-center gap-2">
                            {item.title}
                            {item.badge ? (
                              <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-600">
                                {item.badge}
                              </span>
                            ) : null}
                          </span>
                          <ArrowIcon className="text-slate-400 opacity-0 group-hover:opacity-100 group-hover:text-[#0b0f19]" />
                        </a>
                      ))}
                    </div>

                    {/* CTA Button — anchored under right column */}
                    <button
                      type="button"
                      onClick={() => navigateTo('/contact')}
                      className="group mt-6 w-full flex items-center justify-center gap-2 rounded-2xl bg-[#0B1220] px-4 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#111827] hover:shadow-xl hover:-translate-y-0.5"
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
              </div>
            ) : null}
          </li>
          <li>
            <a href="/franchise-opportunities" onClick={(event) => {
              event.preventDefault();
              navigateTo('/franchise-opportunities');
            }} className="inline-flex items-center gap-2 transition duration-200 hover:text-[#0b0f19]">
              Franchise Opportunities
            </a>
          </li>
          <li>
            <a
              href="/about"
              onClick={(event) => {
                event.preventDefault();
                navigateTo('/about');
              }}
              className={`border-b pb-1 transition duration-200 ${
                isAboutActive
                  ? 'border-[#0b0f19] text-[#0b0f19]'
                  : 'border-transparent hover:text-[#0b0f19]'
              }`}
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="/blog"
              onClick={(event) => {
                event.preventDefault();
                navigateTo('/blog');
              }}
              className={`border-b pb-1 transition duration-200 ${
                isBlogActive ? 'border-[#0b0f19] text-[#0b0f19]' : 'border-transparent hover:text-[#0b0f19]'
              }`}
            >
              Blog
            </a>
          </li>
          <li>
            <a
              href="/contact"
              onClick={(event) => {
                event.preventDefault();
                navigateTo('/contact');
              }}
              className={`border-b pb-1 transition duration-200 ${
                isContactActive
                  ? 'border-[#0b0f19] text-[#0b0f19]'
                  : 'border-transparent hover:text-[#0b0f19]'
              }`}
            >
              Contact Us
            </a>
          </li>
        </ul>
        )}

        {/* Mobile Menu Button - Premium Design with Icon Animation */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className={`inline-flex items-center justify-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 lg:hidden min-h-[48px] min-w-[100px] ${
            isContactPage
              ? 'border border-white/30 text-slate-100 hover:bg-white/10 active:scale-95'
              : 'border border-slate-300 text-slate-700 hover:bg-slate-50 active:scale-95'
          }`}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <MenuIcon isOpen={isMobileMenuOpen} />
          <span className="font-medium">Menu</span>
        </button>

        {/* Desktop CTA Button - Hidden on Mobile/Tablet */}
        <button
          type="button"
          onClick={() => navigateTo('/contact')}
          className={`hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 lg:inline-flex ${
            isContactPage
              ? 'border border-white/30 bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.28)]'
              : 'bg-[#0B1220] hover:shadow-lg hover:shadow-[#0B1220]/25'
          }`}
        >
          Book a Call
          <span className="text-base leading-none">→</span>
        </button>
      </nav>

      {/* Mobile Navigation Drawer — Direct Access, No Dropdowns */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[9998] bg-black/25 backdrop-blur-[2px] lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 320 }}
              className="fixed right-0 top-0 bottom-0 flex flex-col w-full max-w-[min(400px,88vw)] bg-white shadow-2xl"
              style={{
                paddingTop: 'env(safe-area-inset-top)',
                paddingBottom: 'env(safe-area-inset-bottom)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0b0f19]">
                    <span className="text-base font-bold text-white">i</span>
                  </div>
                  <span className="text-lg font-bold text-[#0b0f19]">iFranchise</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all duration-200 hover:bg-slate-200 active:scale-90"
                  aria-label="Close menu"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Scrollable Nav Items */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <nav className="space-y-1">

                  {/* Home */}
                  <a
                    href="/"
                    onClick={(e) => { e.preventDefault(); handleHomeClick(e); }}
                    className={`flex items-center justify-between rounded-xl px-4 py-4 text-base font-semibold transition-all duration-200 active:scale-[0.98] min-h-[52px] ${
                      isHomeActive
                        ? 'bg-[#0b0f19] text-white shadow-md'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span>Home</span>
                    {isHomeActive && <span className="text-white/60 text-sm">→</span>}
                  </a>

                  {/* Franchise Opportunities */}
                  <a
                    href="/franchise-opportunities"
                    onClick={(e) => { e.preventDefault(); navigateTo('/franchise-opportunities'); }}
                    className={`flex items-center justify-between rounded-xl px-4 py-4 text-base font-semibold transition-all duration-200 active:scale-[0.98] min-h-[52px] ${
                      window.location.pathname === '/franchise-opportunities'
                        ? 'bg-[#0b0f19] text-white shadow-md'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span>Franchise Opportunities</span>
                  </a>

                  {/* Services */}
                  <a
                    href="/services"
                    onClick={(e) => { e.preventDefault(); navigateTo('/services'); }}
                    className={`flex items-center justify-between rounded-xl px-4 py-4 text-base font-semibold transition-all duration-200 active:scale-[0.98] min-h-[52px] ${
                      window.location.pathname === '/services'
                        ? 'bg-[#0b0f19] text-white shadow-md'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span>Services</span>
                  </a>

                  {/* About Us */}
                  <a
                    href="/about"
                    onClick={(e) => { e.preventDefault(); navigateTo('/about'); }}
                    className={`flex items-center justify-between rounded-xl px-4 py-4 text-base font-semibold transition-all duration-200 active:scale-[0.98] min-h-[52px] ${
                      isAboutActive
                        ? 'bg-[#0b0f19] text-white shadow-md'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span>About Us</span>
                  </a>

                  {/* Blog */}
                  <a
                    href="/blog"
                    onClick={(e) => { e.preventDefault(); navigateTo('/blog'); }}
                    className={`flex items-center justify-between rounded-xl px-4 py-4 text-base font-semibold transition-all duration-200 active:scale-[0.98] min-h-[52px] ${
                      isBlogActive
                        ? 'bg-[#0b0f19] text-white shadow-md'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span>Blog</span>
                  </a>

                  {/* Careers */}
                  <a
                    href="/careers"
                    onClick={(e) => { e.preventDefault(); navigateTo('/careers'); }}
                    className={`flex items-center justify-between rounded-xl px-4 py-4 text-base font-semibold transition-all duration-200 active:scale-[0.98] min-h-[52px] ${
                      window.location.pathname === '/careers'
                        ? 'bg-[#0b0f19] text-white shadow-md'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span>Careers</span>
                  </a>

                  {/* Contact Us */}
                  <a
                    href="/contact"
                    onClick={(e) => { e.preventDefault(); navigateTo('/contact'); }}
                    className={`flex items-center justify-between rounded-xl px-4 py-4 text-base font-semibold transition-all duration-200 active:scale-[0.98] min-h-[52px] ${
                      isContactActive
                        ? 'bg-[#0b0f19] text-white shadow-md'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span>Contact Us</span>
                  </a>

                </nav>
              </div>

              {/* Book a Call CTA — pinned at bottom */}
              <div className="shrink-0 border-t border-slate-100 bg-white px-4 py-4">
                <button
                  type="button"
                  onClick={() => navigateTo('/contact')}
                  className="group flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#0B1220] px-6 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#111827] hover:shadow-xl active:scale-[0.98] min-h-[52px]"
                >
                  Book a Call
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M8 12h9" />
                    </svg>
                  </span>
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
