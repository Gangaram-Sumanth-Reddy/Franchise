import { useRef } from 'react';

const teamMembers = [
  {
    name: 'Arjun Reddy',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Neha Sharma',
    role: 'Head of Franchise Strategy',
    image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Vikram Singh',
    role: 'Investment Advisor',
    image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Sneha Mehta',
    role: 'Partnerships Lead',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Kiran Rao',
    role: 'Market Analyst',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Rahul Verma',
    role: 'Growth & Expansion',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
  },
];

const features = [
  {
    title: 'SMART PLANNING',
    description: 'Structured planning frameworks that align your goals with measurable execution.',
    icon: '◌',
  },
  {
    title: 'EXPERT ADVICE',
    description: 'Actionable guidance from experienced specialists across finance and business growth.',
    icon: '✦',
  },
  {
    title: 'CREATIVE SOLUTIONS',
    description: 'Practical ideas designed to solve real business constraints with speed and clarity.',
    icon: '⬢',
  },
  {
    title: 'BUSINESS GROWTH',
    description: 'Scalable systems that improve efficiency, conversion, and long-term performance.',
    icon: '↗',
  },
];

const customerTestimonials = [
  {
    name: 'Emily Johnson',
    company: 'Johnson Marketing',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
    quote:
      "We've seen measurable growth since using iFranchise solutions. It's intuitive, fast, and integrates seamlessly with our existing workflows.",
    icon: '◎',
  },
  {
    name: 'Sophia Martin',
    company: 'Martin Agency',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    quote:
      'Finally, franchise services designed with users in mind. Everything we need is here: smart automation, insights, and amazing support.',
    icon: '✕',
  },
  {
    name: 'Rohit Verma',
    company: 'ScaleCraft Ventures',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    quote:
      'Working with iFranchise gave our team the clarity and speed we needed for expansion. The process is transparent and data-driven.',
    icon: '◌',
  },
];

function AboutPage() {
  const testimonialsLoop = [...customerTestimonials, ...customerTestimonials];
  const teamScrollRef = useRef(null);

  const scrollTeamCards = (direction) => {
    if (!teamScrollRef.current) {
      return;
    }
    teamScrollRef.current.scrollBy({
      left: direction * 320,
      behavior: 'smooth',
    });
  };

  const openTeamPage = () => {
    window.history.pushState({}, '', '/team');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <main className="w-full py-10 lg:py-16">
      <section className="w-full py-[110px]">
        <div className="mx-auto grid w-full max-w-[1280px] items-stretch gap-12 px-6 md:px-12 lg:grid-cols-[1.02fr_0.98fr] lg:px-20">
          <div className="overflow-hidden rounded-[18px] shadow-[0_12px_30px_rgba(15,23,42,0.12)]">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80"
              alt="iFranchise team collaboration"
              className="h-full min-h-[520px] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex min-h-[520px] flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Who we are</p>
            <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-[#0b0f19] sm:text-6xl">About iFranchise</h1>
            <p className="mt-7 text-lg leading-[1.7] text-slate-600">
              iFranchise is built for ambitious investors who want clarity, confidence, and real opportunities in the
              franchise ecosystem. We simplify the process of discovering, evaluating, and scaling franchise brands
              through verified data and structured insights.
            </p>
            <p className="mt-6 text-lg leading-[1.7] text-slate-600">
              Instead of overwhelming you with options, we focus on quality. Every opportunity on iFranchise is
              carefully curated to ensure transparency, credibility, and long-term potential. Our goal is to eliminate
              guesswork and help you make smarter investment decisions.
            </p>
            <p className="mt-6 text-lg leading-[1.7] text-slate-600">
              Whether you&apos;re entering the franchise world for the first time or expanding an existing portfolio,
              iFranchise gives you the tools, insights, and access needed to grow with confidence.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">

      <section className="py-24">
        <div className="grid items-stretch gap-6 rounded-[22px] border border-slate-200 bg-[#f8fafc] p-5 shadow-[0_6px_20px_rgba(15,23,42,0.04)] lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_22px_rgba(15,23,42,0.08)]">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1000&q=80"
              alt="Arjun Reddy founder portrait"
              className="h-full min-h-[560px] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex min-h-[560px] flex-col justify-center rounded-2xl border border-slate-200 bg-white px-7 py-8 text-slate-700">
            <p className="text-sm font-medium text-slate-500">Story</p>
            <h2 className="mt-2 text-5xl font-extrabold leading-[1.05] tracking-tight text-[#0b0f19]">
              Our story
              <br />
              matters.
            </h2>
            <blockquote className="mt-4 border-l-4 border-violet-500 pl-4 text-xl font-semibold italic leading-relaxed text-[#1f2937]">
              Building iFranchise was never about listings - it was about giving investors clarity, confidence, and
              real opportunities they can trust.
            </blockquote>
            <p className="mt-5 text-lg leading-relaxed">
              iFranchise was created to simplify how ambitious investors discover and scale franchise opportunities. We
              believe choosing the right franchise is not just a financial decision - it&apos;s a life decision.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              That&apos;s why we focus on transparency, verified opportunities, and data-driven insights. Our platform
              removes guesswork and empowers investors to move forward with clarity and confidence.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              We don&apos;t just connect investors with brands - we build long-term success stories. Whether you&apos;re
              starting your first venture or expanding your portfolio, iFranchise is designed to support your growth
              journey.
            </p>
            <div className="mt-6">
              <p className="text-2xl italic text-slate-800" style={{ fontFamily: '"Brush Script MT", cursive' }}>Arjun Reddy</p>
              <p className="mt-1 text-sm font-medium text-slate-500">Founder &amp; CEO, iFranchise</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-violet-600">
              <span className="h-2 w-2 rounded-full bg-violet-500" />
              Our Team
            </p>
            <h2 className="mt-3 text-4xl font-extrabold uppercase tracking-tight text-[#0b0f19] sm:text-5xl">
              Meet the Team Behind iFranchise
            </h2>
          </div>
          <button
            type="button"
            onClick={openTeamPage}
            className="group inline-flex items-center gap-3 rounded-full border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-[#0b0f19] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(124,58,237,0.18)]"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-white transition duration-300 group-hover:translate-x-0.5">
              ↗
            </span>
            Meet the team
          </button>
        </div>
        <div ref={teamScrollRef} className="hide-scrollbar mt-12 flex gap-6 overflow-x-auto scroll-smooth pb-2">
          {teamMembers.map((member) => (
            <article
              key={member.name}
              className="group flex min-h-[560px] w-[290px] shrink-0 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_6px_18px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_30px_rgba(15,23,42,0.10)]"
            >
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={member.image}
                  alt={member.name}
                  className="aspect-[4/5] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col pt-4">
                <p className="text-4xl font-semibold leading-none tracking-tight text-[#221B4B]">{member.name}</p>
                <p className="mt-2 line-clamp-2 min-h-[68px] text-[32px] leading-tight text-slate-500">{member.role}</p>
                <div className="mt-4 flex items-center gap-2.5">
                  <a
                    href="#"
                    aria-label={`${member.name} Instagram`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-violet-200 bg-violet-50 text-violet-600 transition duration-200 hover:scale-110 hover:bg-violet-100"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5zm8.95 1.75a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-label={`${member.name} X`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition duration-200 hover:scale-110 hover:bg-slate-100"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                      <path d="M18.9 3h2.92l-6.38 7.3L23 21h-5.88l-4.6-6.01L7.3 21H4.37l6.82-7.8L1 3h6.03l4.15 5.42L18.9 3zm-1.03 16.22h1.62L6.16 4.7H4.42l13.45 14.52z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-label={`${member.name} LinkedIn`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-600 transition duration-200 hover:scale-110 hover:bg-blue-100"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                      <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3A2.02 2.02 0 1 0 5.3 7.04 2.02 2.02 0 0 0 5.25 3zM20.44 13.26c0-3.04-1.62-4.95-4.37-4.95-1.27 0-2.11.7-2.46 1.2v-1h-3.37c.04.66 0 11.49 0 11.49h3.37v-6.42c0-.34.02-.68.12-.92.27-.68.87-1.39 1.88-1.39 1.32 0 1.85 1 1.85 2.48V20H20.44v-6.74z" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => scrollTeamCards(-1)}
            className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-slate-300 bg-white text-2xl text-violet-600 transition duration-200 hover:shadow-[0_8px_20px_rgba(124,58,237,0.16)]"
            aria-label="Previous team members"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollTeamCards(1)}
            className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-slate-300 bg-white text-2xl text-violet-600 transition duration-200 hover:shadow-[0_8px_20px_rgba(124,58,237,0.16)]"
            aria-label="Next team members"
          >
            →
          </button>
        </div>
      </section>

      <section className="grid gap-10 py-24 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">// Why we are</p>
          <h2 className="mt-4 text-4xl font-extrabold uppercase leading-tight tracking-tight text-[#0b0f19] sm:text-5xl">
            Expert Guidance
            <br />
            To Achieve
            <br />
            Business Goals
          </h2>
          <button
            type="button"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#0B1220] px-2 py-2 pr-6 text-xs font-extrabold uppercase tracking-[0.06em] text-white transition duration-200 hover:-translate-y-0.5"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white text-base text-[#0B1220]">
              →
            </span>
            Get Start Today
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <article key={feature.title} className="p-1">
              <span className="inline-flex h-10 w-10 items-center justify-center text-2xl text-slate-700">
                {feature.icon}
              </span>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#0b0f19] sm:text-[28px]">{feature.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 shadow-[0_4px_14px_rgba(15,23,42,0.08)]">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            Customers
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#0b0f19] sm:text-5xl">Our customers love us</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Real feedback from teams and individuals who rely on iFranchise to power growth with practical analytics.
          </p>
        </div>

        <div className="mt-10 overflow-hidden">
          <div className="animate-marquee-left flex w-max items-stretch gap-5 py-2" style={{ animationDuration: '30s' }}>
            {testimonialsLoop.map((testimonial, idx) => (
              <article
                key={`${testimonial.name}-${idx}`}
                className="w-[420px] rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
              >
                <div className="flex items-center gap-3">
                  <img src={testimonial.avatar} alt={testimonial.name} className="h-14 w-14 rounded-xl object-cover" loading="lazy" />
                  <div className="flex-1">
                    <p className="text-2xl font-semibold tracking-tight text-[#0b0f19]">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.company}</p>
                  </div>
                  <span className="text-3xl text-violet-700">{testimonial.icon}</span>
                </div>
                <div className="mt-4 border-t border-slate-200 pt-4">
                  <p className="text-base leading-relaxed text-slate-700">{testimonial.quote}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3 text-sm text-slate-600">
          <div className="flex -space-x-2">
            {[
              'https://i.pravatar.cc/40?img=12',
              'https://i.pravatar.cc/40?img=18',
              'https://i.pravatar.cc/40?img=26',
              'https://i.pravatar.cc/40?img=32',
            ].map((avatar) => (
              <img key={avatar} src={avatar} alt="Reviewer avatar" className="h-8 w-8 rounded-full border-2 border-white object-cover" loading="lazy" />
            ))}
          </div>
          <p>Over 15,725+ people gave us review</p>
        </div>
      </section>
      </div>
    </main>
  );
}

export default AboutPage;
