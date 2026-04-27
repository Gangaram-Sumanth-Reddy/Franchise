const leftFlowIcons = [
  { id: 'l1', label: 'S', style: 'h-10 w-10 bg-[#6366F1] text-white' },
  { id: 'l2', label: '↗', style: 'h-11 w-11 bg-[#EAFB63] text-slate-900' },
  { id: 'l3', label: '◼', style: 'h-12 w-12 bg-[#111827] text-white' },
  { id: 'l4', label: '◎', style: 'h-10 w-10 bg-white text-slate-700' },
  { id: 'l5', label: 'C', style: 'h-11 w-11 bg-white text-slate-600' },
];

const rightFlowIcons = [
  { id: 'r1', label: 'P', style: 'h-11 w-11 bg-[#1F7A4E] text-white' },
  { id: 'r2', label: '〰', style: 'h-11 w-11 bg-[#D6A74B] text-slate-900' },
  { id: 'r3', label: '9', style: 'h-11 w-11 bg-[#EF5B4A] text-white' },
  { id: 'r4', label: 'Carta', style: 'h-10 w-10 bg-white px-1 text-[9px] text-slate-600' },
  { id: 'r5', label: '•', style: 'h-8 w-8 bg-[#E2E8F0] text-slate-500' },
];

function AboutUsSection() {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 py-24 sm:px-6 lg:px-8">
      <section className="rounded-[36px] bg-[#f8fafc] px-6 py-20 text-center sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">About Us</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#111827] sm:text-5xl">
          Connect everything <span className="text-[#2F80ED]">in one place</span>
        </h1>
        <p className="mx-auto mt-4 max-w-[640px] text-sm leading-relaxed text-slate-500 sm:text-base">
          Seamlessly unify all of your franchise and investment data in one place to create a single source of truth.
        </p>

        <div className="connect-flow relative mx-auto mt-12 h-[320px] w-full max-w-[900px]">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 900 300"
            fill="none"
            aria-hidden="true"
          >
            <path d="M90 220C255 118 645 118 810 220" stroke="rgba(148, 163, 184, 0.28)" strokeWidth="2" />
          </svg>

          {leftFlowIcons.map((icon) => (
            <div
              key={icon.id}
              className={`connect-icon connect-icon-left absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 text-sm font-semibold shadow-[0_10px_24px_rgba(15,23,42,0.10)] ${icon.style}`}
              style={{ animationDelay: `calc(var(--stream-gap) * -${leftFlowIcons.findIndex((item) => item.id === icon.id)})` }}
            >
              {icon.label}
            </div>
          ))}

          {rightFlowIcons.map((icon, iconIdx) => (
            <div
              key={icon.id}
              className={`connect-icon connect-icon-right absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 text-sm font-semibold shadow-[0_10px_24px_rgba(15,23,42,0.10)] ${icon.style}`}
              style={{ animationDelay: `calc(var(--stream-gap) * -${iconIdx} - 0.8s)` }}
            >
              {icon.label}
            </div>
          ))}

          <div className="connect-center absolute left-1/2 top-[43.8%] z-20 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#2F80ED] text-4xl font-black text-white ring-8 ring-blue-100/70 shadow-[0_20px_45px_rgba(47,128,237,0.35)]">
            F
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-[470px] text-center">
          <p className="text-base leading-relaxed text-slate-700">
            "iFranchise has amazing integrations with investors, operators, and advisors. Onboarding was fast and smooth.
            Now I can finally see everything in one place."
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <img
              src="https://i.pravatar.cc/60?img=12"
              alt="Ali Haghani"
              className="h-10 w-10 rounded-full object-cover"
              loading="lazy"
            />
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-800">Ali Haghani</p>
              <p className="text-xs text-slate-500">Co-founder at Circleback</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutUsSection;
