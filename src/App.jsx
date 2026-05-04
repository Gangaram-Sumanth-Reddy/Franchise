import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import TeamPage from './components/TeamPage';
import FranchiseDetailsPage from './components/FranchiseDetailsPage';
import FranchiseOpportunitiesPage from './components/FranchiseOpportunitiesPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsConditionsPage from './components/TermsConditionsPage';
import NotFoundPage from './components/NotFoundPage';
import ContactPage from './components/ContactPage';
import BlogPage from './components/BlogPage';
import BlogDetailPage from './components/BlogDetailPage';
import ServicesPage from './components/ServicesPage';
import LicensesPage from './components/LicensesPage';
import CareersPage from './components/CareersPage';
import CareerDetailPage from './components/CareerDetailPage';
import FloatingContactCTA from './components/FloatingContactCTA';
import ForBrandOwnersPage from './components/ForBrandOwnersPage';
import ForInvestorsPage from './components/ForInvestorsPage';
import PreFooterCTA from './components/PreFooterCTA';

const scrollToHashSection = () => {
  const hash = window.location.hash;
  if (!hash) {
    return false;
  }

  const target = document.querySelector(hash);
  if (!target) {
    return false;
  }

  const navbar = document.querySelector('header');
  const navbarOffset = navbar ? navbar.offsetHeight : 80;
  const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarOffset - 12;

  window.scrollTo({
    top: Math.max(targetTop, 0),
    behavior: 'smooth',
  });

  return true;
};

const getPathname = () => {
  const pathname = window.location.pathname;
  if (pathname === '/about-us') {
    return '/about';
  }
  if (pathname === '/meet-the-team') {
    return '/team';
  }
  if (pathname === '/franchise') {
    return '/franchise-details';
  }
  if (pathname === '/featured-opportunities' || pathname === '/opportunities' || pathname === '/franchise-opportunities') {
    return '/franchise-opportunities';
  }
  if (pathname === '/privacy-policy') {
    return '/privacy-policy';
  }
  if (pathname === '/terms-and-conditions' || pathname === '/terms') {
    return '/terms-and-conditions';
  }
  if (pathname === '/licenses') {
    return '/licenses';
  }
  if (pathname === '/contact-us') {
    return '/contact';
  }
  if (pathname === '/blog') {
    return '/blog';
  }
  if (pathname === '/services') {
    return '/services';
  }
  if (pathname === '/careers') {
    return '/careers';
  }
  if (pathname.startsWith('/careers/') && pathname.split('/').filter(Boolean).length === 2) {
    return '/career-detail';
  }
  if (pathname.startsWith('/blog/') && pathname.split('/').filter(Boolean).length >= 2) {
    return '/blog-detail';
  }
  if (pathname === '/for-brand-owners') return '/for-brand-owners';
  if (pathname === '/for-investors') return '/for-investors';
  // Handle dedicated franchise routes
  if (pathname.startsWith('/franchise/') && pathname.length > 12) {
    return '/franchise-details';
  }
  const knownPaths = [
    '/',
    '/about',
    '/team',
    '/franchise-details',
    '/franchise-opportunities',
    '/privacy-policy',
    '/terms-and-conditions',
    '/licenses',
    '/contact',
    '/blog',
    '/services',
    '/careers',
    '/for-brand-owners',
    '/for-investors',
  ];
  if (!knownPaths.includes(pathname)) {
    return '/404';
  }
  return pathname;
};

function App() {
  const [pathname, setPathname] = useState(getPathname);
  const [pagePhase, setPagePhase] = useState('idle');

  useEffect(() => {
    let timerId;

    const onRouteChange = () => {
      const nextPath = getPathname();
      setPagePhase('exit');
      timerId = window.setTimeout(() => {
        setPathname(nextPath);
        setPagePhase('enter');
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            setPagePhase('idle');
          });
        });
        window.setTimeout(() => {
          const didScrollToHash = scrollToHashSection();
          if (!didScrollToHash) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 0);
      }, 170);
    };

    window.addEventListener('popstate', onRouteChange);
    return () => {
      window.removeEventListener('popstate', onRouteChange);
      if (timerId) {
        window.clearTimeout(timerId);
      }
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      scrollToHashSection();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (!revealElements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -6% 0px' }
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  const isAboutPage = pathname === '/about';
  const isTeamPage = pathname === '/team';
  const isFranchiseDetailsPage = pathname === '/franchise-details';
  const isFranchiseOpportunitiesPage = pathname === '/franchise-opportunities';
  const isPrivacyPolicyPage = pathname === '/privacy-policy';
  const isTermsPage = pathname === '/terms-and-conditions';
  const isContactPage = pathname === '/contact';
  const isLicensesPage = pathname === '/licenses';
  const isServicesPage = pathname === '/services';
  const isCareersPage = pathname === '/careers';
  const isCareerDetailPage = pathname === '/career-detail';
  const isNotFoundPage = pathname === '/404';
  const isBlogPage = pathname === '/blog';
  const isBlogDetailPage = pathname === '/blog-detail';
  const isForBrandOwnersPage = pathname === '/for-brand-owners';
  const isForInvestorsPage = pathname === '/for-investors';

  if (isNotFoundPage) {
    return <NotFoundPage />;
  }

  return (
    <div className="relative min-h-screen scroll-smooth bg-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.16]" />
      <Navbar />
      <div
        className={`pt-20 transition-[opacity,transform,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          pagePhase === 'exit'
            ? '-translate-x-4 opacity-0 blur-[1px]'
            : pagePhase === 'enter'
              ? 'translate-x-4 opacity-0 blur-[1px]'
              : 'opacity-100 blur-0'
        }`}
      >
        {isTermsPage ? (
          <TermsConditionsPage />
        ) : isLicensesPage ? (
          <LicensesPage />
        ) : isPrivacyPolicyPage ? (
          <PrivacyPolicyPage />
        ) : isServicesPage ? (
          <ServicesPage />
        ) : isCareersPage ? (
          <CareersPage />
        ) : isCareerDetailPage ? (
          <CareerDetailPage roleId={window.location.pathname.split('/careers/')[1]} />
        ) : isFranchiseOpportunitiesPage ? (
          <FranchiseOpportunitiesPage />
        ) : isFranchiseDetailsPage ? (
          <FranchiseDetailsPage />
        ) : isTeamPage ? (
          <TeamPage />
        ) : isAboutPage ? (
          <AboutPage />
        ) : isContactPage ? (
          <ContactPage />
        ) : isBlogPage ? (
          <BlogPage />
        ) : isBlogDetailPage ? (
          <BlogDetailPage />
        ) : isForBrandOwnersPage ? (
          <ForBrandOwnersPage />
        ) : isForInvestorsPage ? (
          <ForInvestorsPage />
        ) : (
          <Hero />
        )}
      </div>
      <PreFooterCTA />
      <Footer />
      
      {/* Global Floating Contact CTA - Always visible on Franchise Details and Franchise Opportunities pages */}
      {(isFranchiseDetailsPage || isFranchiseOpportunitiesPage) && (
        <FloatingContactCTA franchiseName="franchise opportunities" />
      )}
    </div>
  );
}

export default App;

