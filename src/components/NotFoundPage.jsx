function NotFoundPage() {
  return (
    <main className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-gradient-to-br from-[#1f4ff2] via-[#2b60ff] to-[#1f4ff2] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2)_0%,_rgba(255,255,255,0)_45%)]" />
      <div className="absolute left-1/2 top-12 h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-white/15 blur-[1px]" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col items-center justify-center px-6 pb-16 pt-8 text-center">
        <div className="relative mb-8 h-[260px] w-full max-w-3xl">
          <div className="absolute left-[8%] top-[30%] text-[150px] font-black leading-none text-blue-100/85 drop-shadow-[0_18px_20px_rgba(0,0,0,0.25)] animate-float-left">
            4
          </div>
          <div className="absolute right-[9%] top-[18%] text-[130px] font-black leading-none text-blue-100/85 drop-shadow-[0_18px_20px_rgba(0,0,0,0.25)] animate-float-right">
            4
          </div>
          <div className="absolute left-1/2 top-[56%] h-[130px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-gradient-to-b from-[#2a4eda] to-[#13339f] shadow-[inset_0_20px_40px_rgba(255,255,255,0.18),_0_30px_40px_rgba(0,0,0,0.32)]">
            <div className="absolute bottom-8 left-[62%] h-16 w-1 rounded-full bg-[#d6b173] shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" />
            <div className="absolute bottom-10 left-[56%] h-1 w-16 rotate-[55deg] rounded bg-[#d6b173]" />
            <div className="absolute bottom-[64px] left-[53%] h-1 w-14 rotate-[55deg] rounded bg-[#d6b173]" />
          </div>
        </div>

        <p className="text-4xl font-semibold tracking-[0.14em]">OOPS!</p>
        <p className="mt-4 max-w-lg text-xl font-medium text-blue-50">We can&apos;t find the page that you&apos;re looking for :(</p>

        <button
          type="button"
          onClick={() => {
            window.history.pushState({}, '', '/');
            window.dispatchEvent(new PopStateEvent('popstate'));
          }}
          className="mt-10 rounded-full border border-blue-100/70 bg-white/10 px-8 py-3 text-sm font-semibold tracking-[0.12em] text-white transition hover:bg-white/20"
        >
          BACK TO HOME
        </button>
      </section>
    </main>
  );
}

export default NotFoundPage;
