import { useState } from 'react';

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-slate-600">
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9z" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="m5 8 7 5 7-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-slate-600">
      <path d="M5.5 4.8a2 2 0 0 1 2.6-.2l2.4 1.9c.8.6 1 1.7.5 2.6l-1 1.8a14.2 14.2 0 0 0 3.6 3.6l1.8-1c.9-.5 2-.3 2.6.5l1.9 2.4a2 2 0 0 1-.2 2.6l-1.2 1.2c-.9.9-2.2 1.3-3.5 1-6.2-1.4-11.1-6.3-12.5-12.5-.3-1.3.1-2.6 1-3.5l1.2-1.2z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-slate-600">
      <path d="M12 20c3.7-3.5 6-6.5 6-9a6 6 0 1 0-12 0c0 2.5 2.3 5.5 6 9z" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="11" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

const CONTACT_ITEMS = [
  {
    title: 'Email',
    value: 'partnerships@ifranchise.com',
    Icon: MailIcon,
    href: 'mailto:partnerships@ifranchise.com',
  },
  {
    title: 'Phone',
    value: '+1 (501) 123-4567',
    Icon: PhoneIcon,
    href: 'tel:+15011234567',
  },
  {
    title: 'Location',
    value: 'Crosby Street, New York, US',
    Icon: PinIcon,
    href: 'https://maps.google.com/?q=Crosby+Street,+New+York,+US',
  },
];

const TEAM_MEMBERS = [
  {
    name: 'Aarav Mehta',
    role: 'Franchise Growth Advisor',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Mira Kapoor',
    role: 'Investment Consultant',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Rohan Iyer',
    role: 'Market Expansion Strategist',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Neha Sethi',
    role: 'Franchise Operations Manager',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Kabir Anand',
    role: 'Brand Partnership Lead',
    image:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Sana Verma',
    role: 'Business Analyst',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80',
  },
];

const FAQ_ITEMS = [
  {
    question: 'How do I choose the right franchise?',
    answer:
      'We assess your budget, risk profile, location goals, and preferred industry to shortlist the most suitable models.',
  },
  {
    question: 'What is the typical investment range?',
    answer:
      'Most opportunities on our platform start around $20K and can go beyond $250K depending on brand category and market potential.',
  },
  {
    question: 'How long does it take to break even?',
    answer:
      'Break-even timelines vary by sector, but many franchise models we work with target 12 to 24 months with disciplined execution.',
  },
  {
    question: 'Do I need prior business experience?',
    answer:
      'Not necessarily. Many successful partners are first-time operators and rely on structured onboarding, SOPs, and advisory support.',
  },
  {
    question: 'What support does iFranchise provide?',
    answer:
      'We support brand matching, diligence, financial understanding, launch planning, and ongoing growth guidance after onboarding.',
  },
  {
    question: 'Can I operate multiple franchise units?',
    answer:
      'Yes. Multi-unit expansion is available for many brands after performance milestones and market readiness checks are met.',
  },
  {
    question: 'How are locations selected?',
    answer:
      'Our process combines demographic data, demand mapping, competition analysis, and brand-specific territory requirements.',
  },
  {
    question: 'What are the ongoing fees or royalties?',
    answer:
      'Ongoing fees depend on the brand agreement and typically include royalty, marketing contributions, and technology platform charges.',
  },
  {
    question: 'Do you assist with financing options?',
    answer:
      'Yes. We help you prepare investor-ready information and connect with relevant funding partners based on your profile.',
  },
  {
    question: 'How do I get started with iFranchise?',
    answer:
      'Submit your details through the contact form, and our advisors will schedule a discovery call to map your next steps.',
  },
];

function AnalyticsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-slate-600">
      <path d="M4 18h16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="6" y="10.5" width="2.6" height="5.5" rx="1" fill="currentColor" opacity="0.75" />
      <rect x="10.7" y="8" width="2.6" height="8" rx="1" fill="currentColor" opacity="0.85" />
      <rect x="15.4" y="6.2" width="2.6" height="9.8" rx="1" fill="currentColor" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-slate-600">
      <path d="M5.5 6h13A1.5 1.5 0 0 1 20 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-5.9l-3.6 2.7V16H5.5A1.5 1.5 0 0 1 4 14.5v-7A1.5 1.5 0 0 1 5.5 6z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ContactPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [hubTilt, setHubTilt] = useState({ x: 0, y: 0 });

  const handleHubMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 7;
    const rotateX = (0.5 - py) * 6;
    setHubTilt({ x: rotateX, y: rotateY });
  };

  const handleHubLeave = () => {
    setHubTilt({ x: 0, y: 0 });
  };

  return (
    <main className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(148,163,184,0.16),transparent_42%),radial-gradient(circle_at_85%_20%,rgba(191,219,254,0.24),transparent_40%),radial-gradient(circle_at_75%_80%,rgba(226,232,240,0.28),transparent_44%)]" />
      <div className="pointer-events-none absolute left-8 top-24 h-32 w-32 animate-float-slow rounded-full bg-slate-200/40 blur-2xl" />
      <div className="pointer-events-none absolute right-14 top-40 h-40 w-40 animate-float-slow rounded-full bg-blue-100/40 blur-2xl [animation-delay:1.8s]" />
      <div className="pointer-events-none absolute bottom-20 left-1/2 h-[1px] w-[420px] -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-300/70 to-transparent" />
      <p className="pointer-events-none absolute left-1/2 top-32 -translate-x-1/2 select-none text-[100px] font-extrabold tracking-[0.2em] text-slate-200/35 blur-[2px] sm:text-[160px]">
        CONTACT
      </p>

      <section className="relative mx-auto w-full max-w-[1200px] px-4 pb-20 pt-10 sm:px-6 lg:px-8" data-reveal>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="animate-mega-in space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-[#0b0f19] sm:text-5xl">Get in Touch</h1>
            <p className="max-w-[500px] text-base leading-relaxed text-slate-600">
              We help brands scale with clarity and confidence. Share your goals and our team will get back with the right strategy.
            </p>

            <div className="space-y-4 pt-2">
              {CONTACT_ITEMS.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.title === 'Location' ? '_blank' : undefined}
                  rel={item.title === 'Location' ? 'noreferrer' : undefined}
                  className="interactive-card group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.08)] hover:border-slate-300 hover:shadow-[0_16px_36px_rgba(15,23,42,0.12)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                      <item.Icon />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-600">{item.value}</p>
                    </div>
                  </div>
                  <span className="text-slate-400 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-600">↗</span>
                </a>
              ))}
            </div>

            <div
              className="group/comm relative mt-2 overflow-hidden rounded-3xl border border-slate-200 bg-[radial-gradient(circle_at_50%_0%,#ffffff_0%,#f2f5ff_46%,#edf2f8_100%)] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.1)] transition duration-500 hover:shadow-[0_24px_62px_rgba(15,23,42,0.13)]"
              onMouseMove={handleHubMove}
              onMouseLeave={handleHubLeave}
              style={{ perspective: '1000px' }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_24%,rgba(191,219,254,0.42),transparent_40%),radial-gradient(circle_at_14%_86%,rgba(216,227,245,0.52),transparent_44%)]" />

              <div className="pointer-events-none absolute inset-0 opacity-70">
                <div className="absolute left-1/2 top-[28%] h-[2px] w-[45%] -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-300/80 to-transparent" />
                <div className="absolute left-1/2 top-[50%] h-[2px] w-[68%] -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-300/70 to-transparent" />
                <div className="absolute left-[24%] top-[34%] h-[34%] w-[2px] bg-gradient-to-b from-transparent via-slate-300/70 to-transparent" />
                <div className="absolute right-[22%] top-[34%] h-[34%] w-[2px] bg-gradient-to-b from-transparent via-slate-300/70 to-transparent" />
              </div>

              <div className="pointer-events-none absolute left-[43%] top-[34%] h-[120px] w-[120px] -translate-x-1/2 rounded-full border border-blue-200/50 [animation:phone-pulse_3.5s_ease-out_infinite]" />
              <div className="pointer-events-none absolute left-[43%] top-[34%] h-[140px] w-[140px] -translate-x-1/2 rounded-full border border-slate-300/60 [animation:phone-pulse_3.5s_ease-out_1.2s_infinite]" />

              <div className="relative mx-auto flex min-h-[210px] max-w-[420px] items-center justify-center">
                <div className="absolute left-0 top-4 rounded-2xl border border-slate-200 bg-white/95 px-3 py-2 shadow-[0_12px_26px_rgba(15,23,42,0.1)] [animation:float-soft_5.2s_ease-in-out_infinite]">
                  <MailIcon />
                </div>
                <div className="absolute right-2 top-1 rounded-2xl border border-slate-200 bg-white/95 px-3 py-2 shadow-[0_12px_26px_rgba(15,23,42,0.1)] [animation:float-soft_5.9s_ease-in-out_0.7s_infinite]">
                  <AnalyticsIcon />
                </div>
                <div className="absolute left-8 bottom-2 rounded-2xl border border-slate-200 bg-white/95 px-3 py-2 shadow-[0_12px_26px_rgba(15,23,42,0.1)] [animation:float-soft_5.5s_ease-in-out_1.1s_infinite]">
                  <ChatIcon />
                </div>
                <div className="absolute right-8 bottom-4 rounded-2xl border border-slate-200 bg-white/95 px-3 py-2 shadow-[0_12px_26px_rgba(15,23,42,0.1)] [animation:float-soft_6.1s_ease-in-out_1.5s_infinite]">
                  <PhoneIcon />
                </div>

                <div
                  className="relative [transform-style:preserve-3d] transition-transform duration-500"
                  style={{ transform: `rotateX(${hubTilt.x}deg) rotateY(${hubTilt.y}deg)` }}
                >
                  <div className="absolute left-1/2 top-[140px] h-16 w-44 -translate-x-1/2 rounded-[50%] bg-slate-300/40 blur-xl" />
                  <div className="relative h-16 w-52 rounded-[22px] bg-gradient-to-b from-[#f7f9ff] to-[#dbe6f8] shadow-[0_18px_30px_rgba(102,121,154,0.28)] ring-1 ring-blue-100/70 [transform:translateZ(-16px)]" />
                  <div className="absolute left-1/2 top-7 h-20 w-44 -translate-x-1/2 rounded-[20px] bg-gradient-to-b from-[#ffffff] to-[#eef3ff] shadow-[0_20px_40px_rgba(125,145,178,0.25)] ring-1 ring-slate-200/90 [transform:translateZ(0)]" />

                  <div className="absolute left-1/2 top-[-8px] flex h-40 w-36 -translate-x-1/2 items-end justify-center rounded-[30px] bg-gradient-to-b from-slate-100 via-white to-slate-100 shadow-[0_24px_44px_rgba(15,23,42,0.2)] ring-1 ring-slate-200 [animation:phone-ring_3.9s_ease-in-out_infinite] [transform:translateZ(22px)]">
                    <div className="absolute top-3 h-1.5 w-16 rounded-full bg-slate-300" />
                    <div className="absolute top-8 h-24 w-28 rounded-2xl border border-slate-200 bg-[linear-gradient(145deg,#ffffff,#eaf0ff)] shadow-inner" />
                    <div className="mb-3 h-1.5 w-10 rounded-full bg-slate-300/90" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-mega-in rounded-3xl border border-slate-200/80 bg-slate-50 p-6 shadow-[0_12px_36px_rgba(15,23,42,0.08)] sm:p-8">
            <div className="mb-6 space-y-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                <MailIcon />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-[#0b0f19]">Contact us now</h2>
              <p className="max-w-[500px] text-sm leading-relaxed text-slate-600">
                Get in touch with us and enjoy high-quality services without the high costs!
              </p>
            </div>

            <form className="space-y-4">
              <input type="text" placeholder="Name" className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3.5 text-sm text-slate-900 outline-none transition duration-300 placeholder:text-slate-500 focus:border-[#0B1220]/30 focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,18,32,0.08)]" />
              <input type="email" placeholder="Email" className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3.5 text-sm text-slate-900 outline-none transition duration-300 placeholder:text-slate-500 focus:border-[#0B1220]/30 focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,18,32,0.08)]" />
              <input type="url" placeholder="Website" className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3.5 text-sm text-slate-900 outline-none transition duration-300 placeholder:text-slate-500 focus:border-[#0B1220]/30 focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,18,32,0.08)]" />
              <input type="tel" placeholder="Contact Number" className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3.5 text-sm text-slate-900 outline-none transition duration-300 placeholder:text-slate-500 focus:border-[#0B1220]/30 focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,18,32,0.08)]" />
              <textarea rows={6} placeholder="Message" className="w-full resize-none rounded-xl border border-slate-200 bg-slate-100 px-4 py-3.5 text-sm text-slate-900 outline-none transition duration-300 placeholder:text-slate-500 focus:border-[#0B1220]/30 focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,18,32,0.08)]" />
              <button type="submit" className="button-motion w-full rounded-xl bg-[#0B1220] px-5 py-3.5 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-[#141d2d] hover:shadow-lg hover:shadow-[#0B1220]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1220]/30 focus-visible:ring-offset-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-[1200px] px-4 pb-20 sm:px-6 lg:px-8" data-reveal style={{ '--reveal-delay': '40ms' }}>
        <div className="rounded-[32px] border border-slate-200 bg-slate-50/70 p-6 sm:p-8 lg:p-10">
          <p className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            The Team
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0b0f19] sm:text-4xl">
            The people behind iFranchise growth
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM_MEMBERS.map((member) => (
              <article key={member.name} className="interactive-card group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="image-hover-zoom h-80 w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/32 via-slate-900/8 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-3 bottom-3 translate-y-6 rounded-xl bg-white/95 p-3 opacity-0 shadow-[0_10px_28px_rgba(15,23,42,0.16)] backdrop-blur-sm transition duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm font-bold text-slate-900">{member.name}</p>
                  <p className="text-xs text-slate-600">{member.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-[1200px] px-4 pb-24 sm:px-6 lg:px-8" data-reveal style={{ '--reveal-delay': '80ms' }}>
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] sm:p-8 lg:p-10">
          <p className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            FAQ
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0b0f19] sm:text-4xl">Frequently asked questions</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            Everything you need to know before starting your franchise journey.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <button
                  type="button"
                  key={item.question}
                  onClick={() => setOpenFaq((prev) => (prev === index ? -1 : index))}
                  className="text-left rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 transition duration-300 hover:border-slate-300 hover:bg-white"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="pr-2 text-[15px] font-semibold text-slate-900">{item.question}</p>
                    <span className="mt-0.5 text-lg font-semibold text-slate-500">{isOpen ? '−' : '+'}</span>
                  </div>
                  <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <p className="text-sm leading-relaxed text-slate-600">{item.answer}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;
