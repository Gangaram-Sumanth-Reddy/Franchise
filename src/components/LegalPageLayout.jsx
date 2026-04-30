import { useState } from 'react';

function LegalPageLayout({ translations }) {
  const [language, setLanguage] = useState('en');

  const t = translations[language] || translations.en;

  const languageOptions = [
    { code: 'en', name: 'English' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ar', name: 'العربية' },
  ];

  return (
    <div className="min-h-screen w-full bg-[#f8f9fb]" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[38%_62%]">

          {/* LEFT SIDEBAR - Sticky */}
          <div className="hidden lg:block sticky top-24 self-start h-[calc(100vh-6rem)] overflow-hidden">
            <div className="h-full flex flex-col justify-start bg-white border-r border-slate-200 shadow-sm">
              <div className="p-8 lg:p-12 flex-1">
                {/* Header */}
                <div className="mb-8">
                  <p className="text-sm font-medium text-slate-500 mb-4">
                    {t.updated}
                  </p>
                  <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-4">
                    {t.title}
                  </h1>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {t.summary}
                  </p>
                </div>

                {/* Contact Block */}
                <div className="border-t border-slate-200 pt-8">
                  <h3 className="text-sm font-semibold text-slate-900 mb-6 uppercase tracking-wide">
                    {t.contactTitle}
                  </h3>

                  <div className="space-y-4">
                    <a
                      href="tel:+919876543210"
                      className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-sm font-medium">+91 98765 43210</span>
                    </a>

                    <a
                      href="mailto:legal@ifranchise.in"
                      className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium">legal@ifranchise.in</span>
                    </a>

                    <a
                      href="https://maps.google.com/?q=Bangalore,Karnataka,India"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm font-medium">Bangalore, Karnataka, India</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT - Scrollable */}
          <div className="bg-white">
            {/* Mobile Header */}
            <div className="lg:hidden px-4 sm:px-6 py-10 bg-slate-50 border-b border-slate-200">
              <p className="text-sm font-medium text-slate-500 mb-3">
                {t.updated}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-3">
                {t.title}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {t.summary}
              </p>
            </div>

            {/* Language Selector - Sticky in right column */}
            <div className="sticky top-16 z-20 flex justify-between items-center bg-white/90 backdrop-blur-sm px-4 sm:px-6 lg:px-12 py-3 border-b border-slate-100">
              <span className="text-xs font-medium text-slate-400 lg:hidden">{t.title?.slice(0, 20)}{t.title?.length > 20 ? '…' : ''}</span>
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-3 sm:px-4 py-2 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors duration-200 shadow-sm text-sm font-medium text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {languageOptions.map((option) => (
                    <option key={option.code} value={option.code}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Content Sections */}
            <div className="px-4 sm:px-6 lg:px-12 py-10 lg:py-16">
              <div className="max-w-4xl">
                {t.sections.map((section, i) => (
                  <div key={i} className="mb-10">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 leading-tight">
                      {section.heading}
                    </h2>
                    <div className="prose prose-slate sm:prose-lg max-w-none">
                      <p className="text-base sm:text-lg leading-relaxed text-slate-600">
                        {section.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Contact Section */}
            <div className="lg:hidden px-6 py-12 bg-slate-50 border-t border-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-6 uppercase tracking-wide">
                {t.contactTitle}
              </h3>

              <div className="grid gap-4 sm:grid-cols-3">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm font-medium">+91 98765 43210</span>
                </a>

                <a
                  href="mailto:legal@ifranchise.in"
                  className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium">legal@ifranchise.in</span>
                </a>

                <a
                  href="https://maps.google.com/?q=Bangalore,Karnataka,India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-medium">Bangalore, Karnataka, India</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LegalPageLayout;
