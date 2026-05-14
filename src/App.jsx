import { useEffect, useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingContactCTA from './components/FloatingContactCTA';
import PreFooterCTA from './components/PreFooterCTA';
import ExpansionAssistant from './components/ExpansionAssistant';

// ── Lazy-load all pages — only load what's needed ─────────────────────────────
const Hero                    = lazy(() => import('./components/Hero'));
const AboutPage               = lazy(() => import('./components/AboutPage'));
const TeamPage                = lazy(() => import('./components/TeamPage'));
const FranchiseDetailsPage    = lazy(() => import('./components/FranchiseDetailsPage'));
const FranchiseOpportunitiesPage = lazy(() => import('./components/FranchiseOpportunitiesPage'));
const PrivacyPolicyPage       = lazy(() => import('./components/PrivacyPolicyPage'));
const TermsConditionsPage     = lazy(() => import('./components/TermsConditionsPage'));
const NotFoundPage            = lazy(() => import('./components/NotFoundPage'));
const ContactPage             = lazy(() => import('./components/ContactPage'));
const BlogPage                = lazy(() => import('./components/BlogPage'));
const BlogDetailPage          = lazy(() => import('./components/BlogDetailPage'));
const ServicesPage            = lazy(() => import('./components/ServicesPage'));
const LicensesPage            = lazy(() => import('./components/LicensesPage'));
const CareersPage             = lazy(() => import('./components/CareersPage'));
const CareerDetailPage        = lazy(() => import('./components/CareerDetailPage'));
const ForBrandOwnersPage      = lazy(() => import('./components/ForBrandOwnersPage'));

// ── Minimal page-level skeleton ───────────────────────────────────────────────
function PageSkeleton() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-slate-200 border-t-violet-600 animate-spin" />
        <p className="text-xs text-slate-400 font-medium tracking-widest uppercase">Loading</p>
      </div>
    </div>
  );
}

const scrollToHashSection = () => {
  const hash = window.location.hash;
  if (!hash) return false;
  const target = document.querySelector(hash);
  if (!target) return false;
  const navbar = document.querySelector('header');
  const navbarOffset = navbar ? navbar.offsetHeight : 80;
  const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarOffset - 12;
  if (window.__lenis) {
    window.__lenis.scrollTo(Math.max(targetTop, 0), { duration: 1.2 });
  } else {
    window.scrollTo({ top: Math.max(targetTop, 0), behavior: 'smooth' });
  }
  return true;
};

const getPathname = () => {
  const pathname = window.location.pathname;
  if (pathname === '/about-us') return '/about';
  if (pathname === '/meet-the-team') return '/team';
  if (pathname === '/franchise') return '/franchise-details';
  if (['/featured-opportunities', '/opportunities', '/franchise-opportunities'].includes(pathname)) return '/franchise-opportunities';
  if (pathname === '/privacy-policy') return '/privacy-policy';
  if (pathname === '/terms-and-conditions' || pathname === '/terms') return '/terms-and-conditions';
  if (pathname === '/licenses') return '/licenses';
  if (pathname === '/contact-us') return '/contact';
  if (pathname === '/blog') return '/blog';
  if (pathname === '/services') return '/services';
  if (pathname === '/careers') return '/careers';
  if (['/list-your-brand', '/for-brand-owners', '/brand-owners'].includes(pathname)) return '/list-your-brand';
  if (pathname.startsWith('/careers/') && pathname.split('/').filter(Boolean).length === 2) return '/career-detail';
  if (pathname.startsWith('/blog/') && pathname.split('/').filter(Boolean).length >= 2) return '/blog-detail';
  if (pathname.startsWith('/franchise/') && pathname.length > 12) return '/franchise-details';
  const knownPaths = ['/', '/about', '/team', '/franchise-details', '/franchise-opportunities',
    '/privacy-policy', '/terms-and-conditions', '/licenses', '/contact', '/blog',
    '/services', '/careers', '/list-your-brand'];
  if (!knownPaths.includes(pathname)) return '/404';
  return pathname;
};

function App() {
  const [pathname, setPathname] = useState(getPathname);
  const [pagePhase, setPagePhase] = useState('idle');

  // Save scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (pathname === '/') sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
      else if (pathname === '/careers') sessionStorage.setItem('careersScrollPosition', window.scrollY.toString());
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Route change handler
  useEffect(() => {
    let timerId;
    const onRouteChange = () => {
      const nextPath = getPathname();
      if (pathname === '/') sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
      else if (pathname === '/careers') sessionStorage.setItem('careersScrollPosition', window.scrollY.toString());

      setPagePhase('exit');
      timerId = window.setTimeout(() => {
        setPathname(nextPath);
        setPagePhase('enter');
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => setPagePhase('idle'));
        });
        window.setTimeout(() => {
          const didScrollToHash = scrollToHashSection();
          if (!didScrollToHash) {
            // Always use instant scroll on route change — Lenis handles smoothness within page
            if (nextPath === '/') {
              const saved = sessionStorage.getItem('homeScrollPosition');
              window.scrollTo({ top: saved ? parseInt(saved, 10) : 0, behavior: 'instant' });
            } else if (nextPath === '/careers') {
              const saved = sessionStorage.getItem('careersScrollPosition');
              window.scrollTo({ top: saved ? parseInt(saved, 10) : 0, behavior: 'instant' });
            } else {
              window.scrollTo({ top: 0, behavior: 'instant' });
            }
            // Tell Lenis to sync after instant scroll
            if (window.__lenis) window.__lenis.scrollTo(window.scrollY, { immediate: true });
          }
        }, 0);
      }, 30); // snappy page transitions
    };
    window.addEventListener('popstate', onRouteChange);
    return () => {
      window.removeEventListener('popstate', onRouteChange);
      if (timerId) window.clearTimeout(timerId);
    };
  }, [pathname]);

  // Hash scroll on mount
  useEffect(() => {
    const timer = window.setTimeout(() => scrollToHashSection(), 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  // data-reveal IntersectionObserver
  useEffect(() => {
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (!revealElements.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -4% 0px' }
    );
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const isAboutPage               = pathname === '/about';
  const isTeamPage                = pathname === '/team';
  const isFranchiseDetailsPage    = pathname === '/franchise-details';
  const isFranchiseOpportunitiesPage = pathname === '/franchise-opportunities';
  const isPrivacyPolicyPage       = pathname === '/privacy-policy';
  const isTermsPage               = pathname === '/terms-and-conditions';
  const isContactPage             = pathname === '/contact';
  const isLicensesPage            = pathname === '/licenses';
  const isServicesPage            = pathname === '/services';
  const isCareersPage             = pathname === '/careers';
  const isCareerDetailPage        = pathname === '/career-detail';
  const isNotFoundPage            = pathname === '/404';
  const isBlogPage                = pathname === '/blog';
  const isBlogDetailPage          = pathname === '/blog-detail';
  const isListYourBrandPage       = pathname === '/list-your-brand';

  if (isNotFoundPage) {
    return (
      <Suspense fallback={<PageSkeleton />}>
        <NotFoundPage />
      </Suspense>
    );
  }

  return (
    <div className="relative min-h-screen scroll-smooth bg-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.16]" />
      <Navbar />

      {/* Page transition wrapper */}
      <div
        className={`${isCareerDetailPage ? '' : 'pt-20'}`}
        style={{
          opacity: pagePhase === 'idle' ? 1 : 0,
          transition: pagePhase === 'idle'
            ? 'opacity 0.2s cubic-bezier(0.22,1,0.36,1)'
            : 'opacity 0.08s ease',
        }}
      >
        <Suspense fallback={<PageSkeleton />}>
          {isTermsPage ? <TermsConditionsPage />
          : isLicensesPage ? <LicensesPage />
          : isPrivacyPolicyPage ? <PrivacyPolicyPage />
          : isServicesPage ? <ServicesPage />
          : isCareersPage ? <CareersPage />
          : isCareerDetailPage ? <CareerDetailPage roleId={window.location.pathname.split('/careers/')[1]} />
          : isFranchiseOpportunitiesPage ? <FranchiseOpportunitiesPage />
          : isFranchiseDetailsPage ? <FranchiseDetailsPage />
          : isTeamPage ? <TeamPage />
          : isAboutPage ? <AboutPage />
          : isContactPage ? <ContactPage />
          : isBlogPage ? <BlogPage />
          : isBlogDetailPage ? <BlogDetailPage />
          : isListYourBrandPage ? <ForBrandOwnersPage />
          : <Hero />}
        </Suspense>
      </div>

      <PreFooterCTA />
      <Footer />

      {(isFranchiseDetailsPage || isFranchiseOpportunitiesPage) && (
        <FloatingContactCTA franchiseName="franchise opportunities" />
      )}

      {!isContactPage && !isFranchiseOpportunitiesPage && <ExpansionAssistant />}
    </div>
  );
}

export default App;
