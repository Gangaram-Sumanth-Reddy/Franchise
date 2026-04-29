import { useState, useEffect } from 'react';

function Footer() {
  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-[#0B0F1A]">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-dot-grid"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Top CTA Section */}
        <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to scale your franchise?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
              Join founders and investors building predictable, scalable growth systems.
            </p>
            <button
              type="button"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/25"
            >
              Get Started
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
            </button>

            {/* Social Icons */}
            <div className="mt-8 flex justify-center gap-4">
              <a
                href="#"
                className="group flex h-11 w-11 items-center justify-center rounded-full bg-slate-800/50 backdrop-blur-sm transition-all duration-300 hover:bg-slate-700/70 hover:scale-105"
                aria-label="Instagram"
              >
                <svg
                  className="h-5 w-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                </svg>
              </a>
              <a
                href="#"
                className="group flex h-11 w-11 items-center justify-center rounded-full bg-slate-800/50 backdrop-blur-sm transition-all duration-300 hover:bg-slate-700/70 hover:scale-105"
                aria-label="Twitter"
              >
                <svg
                  className="h-5 w-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616v.06a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.085 4.936 4.936 0 0 0 4.604 3.417 9.867 9.867 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0 0 7.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0 0 24 4.59z"/>
                </svg>
              </a>
              <a
                href="#"
                className="group flex h-11 w-11 items-center justify-center rounded-full bg-slate-800/50 backdrop-blur-sm transition-all duration-300 hover:bg-slate-700/70 hover:scale-105"
                aria-label="Facebook"
              >
                <svg
                  className="h-5 w-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#"
                className="group flex h-11 w-11 items-center justify-center rounded-full bg-slate-800/50 backdrop-blur-sm transition-all duration-300 hover:bg-slate-700/70 hover:scale-105"
                aria-label="LinkedIn"
              >
                <svg
                  className="h-5 w-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-12 lg:grid-cols-6">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <div className="group cursor-pointer">
                <h3 className="text-2xl font-bold text-white transition-all duration-300 group-hover:text-blue-400">
                  iFranchise
                </h3>
                <p className="mt-3 text-sm text-slate-400">
                  Trusted Franchise Growth Platform
                </p>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">For Brands</h4>
              <ul className="mt-6 space-y-3">
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Brand Expansion</a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Growth Strategy</a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Partner Network</a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Success Stories</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">For Investors</h4>
              <ul className="mt-6 space-y-3">
                <li>
                  <a 
                    href="/franchise-opportunities"
                    onClick={(e) => {
                      e.preventDefault();
                      window.history.pushState({}, '', '/franchise-opportunities');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }}
                    className="text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    Investment Opportunities
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Due Diligence</a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">ROI Analysis</a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Portfolio</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">Company</h4>
              <ul className="mt-6 space-y-3">
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">About Us</a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Team</a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Careers</a>
                </li>
                <li>
                  <a
                    href="/contact"
                    onClick={(event) => {
                      event.preventDefault();
                      navigateTo('/contact');
                    }}
                    className="text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">Resources</h4>
              <ul className="mt-6 space-y-3">
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Blog</a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Guides</a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Case Studies</a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">FAQ</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">Legal</h4>
              <ul className="mt-6 space-y-3">
                <li>
                  <a
                    href="/privacy-policy"
                    onClick={(event) => {
                      event.preventDefault();
                      navigateTo('/privacy-policy');
                    }}
                    className="text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms-and-conditions"
                    onClick={(event) => {
                      event.preventDefault();
                      navigateTo('/terms-and-conditions');
                    }}
                    className="text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    Terms &amp; Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Cookie Policy</a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Compliance</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-slate-500">
              © 2026 iFranchise. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
