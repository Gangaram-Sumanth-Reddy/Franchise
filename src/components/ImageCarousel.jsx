import { useEffect, useMemo, useState } from 'react';

const DEFAULT_FALLBACK =
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1600&q=80';

function Chevron({ direction = 'left' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d={direction === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ImageCarousel({ images, alt, heightClassName = 'h-[360px] sm:h-[430px]' }) {
  const safeImages = useMemo(() => {
    const list = (images || []).filter(Boolean);
    const unique = Array.from(new Set(list));
    return unique.length ? unique : [DEFAULT_FALLBACK];
  }, [images]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [loaded, setLoaded] = useState(() => safeImages.map(() => false));

  useEffect(() => {
    setActiveIdx(0);
    setLoaded(safeImages.map(() => false));
  }, [safeImages]);

  const goPrev = () => setActiveIdx((i) => (i - 1 + safeImages.length) % safeImages.length);
  const goNext = () => setActiveIdx((i) => (i + 1) % safeImages.length);

  return (
    <div className={`relative w-full overflow-hidden ${heightClassName}`}>
      <div className="pointer-events-none absolute inset-0 bg-slate-100" />

      {safeImages.map((src, idx) => (
        <img
          key={`${src}-${idx}`}
          src={src}
          alt={alt}
          loading={idx === 0 ? 'eager' : 'lazy'}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            idx === activeIdx ? (loaded[idx] ? 'opacity-100' : 'opacity-0') : 'opacity-0'
          }`}
          onLoad={(e) => {
            setLoaded((prev) => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = DEFAULT_FALLBACK;
            setLoaded((prev) => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }}
        />
      ))}

      {safeImages.length > 1 ? (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-slate-900 shadow-md transition hover:bg-white"
            aria-label="Previous image"
          >
            <Chevron direction="left" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-slate-900 shadow-md transition hover:bg-white"
            aria-label="Next image"
          >
            <Chevron direction="right" />
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/30 px-3 py-2 backdrop-blur">
            {safeImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`h-2 w-2 rounded-full transition ${
                  idx === activeIdx ? 'bg-white' : 'bg-white/45 hover:bg-white/70'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

