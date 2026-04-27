import { useEffect, useRef, useState } from 'react';

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
  { title: 'View Opportunities', description: 'Explore franchise opportunities.', Icon: TeamIcon },
];

const RIGHT_ITEMS = [
  { title: 'Contact us', path: '/contact' },
  { title: 'Career', badge: '4', path: '/career' },
  { title: 'Privacy Policy', path: '/privacy-policy' },
  { title: 'Terms & Conditions', path: '/terms-and-conditions' },
  { title: '404', path: '/404-preview' },
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
        <div className="flex flex-col">
          <a href="/" onClick={handleHomeClick} className="inline-flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="iFranchise" 
              className="h-10 w-auto"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iIzBiMTIyMCIvPgo8dGV4dCB4PSIyMCIgeT0iMjQiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5pPC90ZXh0Pgo8L3N2Zz4K';
              }}
            />
            <div className="flex flex-col">
              <span className={`text-2xl font-extrabold tracking-tight ${isContactPage ? 'text-white' : 'text-[#0b0f19]'}`}>
                iFranchise
              </span>
              <p className={`text-xs ${isContactPage ? 'text-slate-300' : 'text-slate-500'}`}>India's Trusted Franchise Growth Platform</p>
            </div>
          </a>
        </div>

        {isContactPage ? (
          <ul className="hidden items-center gap-6 text-sm font-medium text-slate-100 md:flex">
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
        <ul className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
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
                <div className="grid grid-cols-2 gap-6 p-6">
                  {/* Company Section */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 mb-3">Company</h3>
                      <div className="space-y-1">
                        {LEFT_ITEMS.map((item) => (
                          <a
                            key={item.title}
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (item.title === 'View Opportunities') {
                                navigateTo('/opportunities');
                              } else if (item.title === 'Services') {
                                navigateTo('/services');
                              } else if (item.title === 'Blog') {
                                navigateTo('/blog');
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
                    </div>
                    
                    {/* CTA Button */}
                    <button
                      type="button"
                      className="group w-full flex items-center justify-center gap-2 rounded-xl bg-[#0B1220] px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1a2332] hover:shadow-lg hover:-translate-y-0.5"
                    >
                      Book A Call
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M8 12h9" />
                        </svg>
                      </span>
                    </button>
                  </div>

                  {/* Pages Section */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">Pages</h3>
                    {RIGHT_ITEMS.map((item) => (
                      <a
                        key={item.title}
                        href={item.path || '#'}
                        onClick={(event) => {
                          event.preventDefault();
                          if (!item.path) return;
                          if (item.path === '/404-preview') {
                            navigateTo('/missing-page');
                            return;
                          }
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
                </div>
              </div>
            ) : null}
          </li>
          <li>
            <a href="/#services" onClick={handleServicesClick} className="inline-flex items-center gap-2 transition duration-200 hover:text-[#0b0f19]">
              Services
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

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition duration-200 md:hidden ${
            isContactPage
              ? 'border border-white/30 text-slate-100 hover:text-white'
              : 'border border-slate-300 text-slate-700 hover:text-[#0b0f19]'
          }`}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          Menu
        </button>

        <button
          type="button"
          onClick={() => navigateTo('/contact')}
          className={`hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 md:inline-flex ${
            isContactPage
              ? 'border border-white/30 bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.28)]'
              : 'bg-[#0B1220] hover:shadow-lg hover:shadow-[#0B1220]/25'
          }`}
        >
          Book a Call
          <span className="text-base leading-none">→</span>
        </button>
      </nav>

      {isMobileMenuOpen ? (
        <div className={`px-4 py-4 text-sm font-medium md:hidden sm:px-6 ${isContactPage ? 'mt-3 border border-white/15 bg-[#061117]/95 text-slate-100 backdrop-blur-xl' : 'border-t border-slate-200/70 bg-white/95 text-slate-700'}`}>
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4">
            {isContactPage ? (
              <>
                <a href="/" onClick={handleHomeClick}>
                  Home
                </a>
                <a href="#integrations" onClick={() => setIsMobileMenuOpen(false)}>
                  Integrations
                </a>
                <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>
                  Pricing
                </a>
                <a
                  href="/blog"
                  onClick={(event) => {
                    event.preventDefault();
                    navigateTo('/blog');
                  }}
                >
                  Blog
                </a>
                <a
                  href="/contact"
                  onClick={(event) => {
                    event.preventDefault();
                    navigateTo('/contact');
                  }}
                  className="text-emerald-200"
                >
                  Contact
                </a>
              </>
            ) : (
              <>
                <a href="/" onClick={handleHomeClick} className={isHomeActive ? 'text-[#0b0f19]' : ''}>
                  Home
                </a>
                <a href="/company" onClick={() => setIsMobileMenuOpen(false)}>
                  Company
                </a>
                <a href="/services" onClick={handleServicesClick}>
                  Services
                </a>
                <a
                  href="/about"
                  onClick={(event) => {
                    event.preventDefault();
                    navigateTo('/about');
                  }}
                  className={isAboutActive ? 'text-[#0b0f19]' : ''}
                >
                  About Us
                </a>
                <a
                  href="/blog"
                  onClick={(event) => {
                    event.preventDefault();
                    navigateTo('/blog');
                  }}
                  className={isBlogActive ? 'text-[#0b0f19]' : ''}
                >
                  Blog
                </a>
                <a
                  href="/contact"
                  onClick={(event) => {
                    event.preventDefault();
                    navigateTo('/contact');
                  }}
                  className={isContactActive ? 'text-[#0b0f19]' : ''}
                >
                  Contact Us
                </a>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}

export default Navbar;
