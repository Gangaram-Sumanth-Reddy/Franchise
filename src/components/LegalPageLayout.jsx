import { useMemo, useState } from 'react';
import { getLegalPageContent, languageOptions } from './legalContent';

function LegalPageLayout({ type = 'privacy' }) {
  const [language, setLanguage] = useState('en');
  const content = useMemo(() => getLegalPageContent(type, language), [type, language]);
  const today = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <main className="bg-slate-50 pb-24 pt-6">
      <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="sticky top-24 z-20 mb-8 flex justify-end">
          <div className="rounded-xl border border-slate-200 bg-white/90 px-3 py-2 shadow-sm backdrop-blur">
            <label className="mr-2 text-xs font-medium uppercase tracking-wide text-slate-500" htmlFor="language-selector">
              {content.dictionary.languageLabel}
            </label>
            <select
              id="language-selector"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-700 outline-none transition focus:border-slate-500"
            >
              {languageOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <article className="rounded-2xl border border-slate-200/80 bg-white px-6 py-8 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_40px_rgba(15,23,42,0.06)] sm:px-10 sm:py-12">
          <header className="mb-10 border-b border-slate-200 pb-8">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.14em] text-slate-500">
              {content.dictionary.updatedOn}: {today}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">{content.title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{content.subtitle}</p>
            <p className="mt-4 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">
              {content.dictionary.legalNotice}
            </p>
          </header>

          <div className="space-y-10">
            {content.sections.map((section) => (
              <section key={section.title} className="scroll-mt-32">
                <h2 className="text-2xl font-semibold text-slate-900">{section.title}</h2>
                <p className="mt-3 text-base leading-8 text-slate-700">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

export default LegalPageLayout;
