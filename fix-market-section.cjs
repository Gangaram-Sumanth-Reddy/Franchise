const fs = require('fs');
let c = fs.readFileSync('src/components/Hero.jsx', 'utf8');

// ── 1. Replace LiveDashboard to accept city prop ──────────────────────────────
const dashStart = c.indexOf('function LiveDashboard({ active }) {');
const dashEnd   = c.indexOf('\nconst PLATFORM_FEATURES = [');

const newDashboard = `function LiveDashboard({ active, city, onCityChange }) {
  const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayIdx = new Date().getDay();

  const CITY_DATA = {
    Bengaluru: {
      bars:    [55, 70, 62, 82, 74, 66, 50],
      sectors: [
        { label: 'Food & Bev',  base: 88, trend: +3.2, color: '#7c3aed' },
        { label: 'Retail',      base: 74, trend: +1.8, color: '#3b82f6' },
        { label: 'Education',   base: 67, trend: +4.1, color: '#10b981' },
        { label: 'Wellness',    base: 61, trend: +2.5, color: '#f97316' },
        { label: 'QSR',         base: 79, trend: +5.0, color: '#ec4899' },
      ],
      signals: [
        'Retail demand rising in Indiranagar',
        'QSR expansion surge in Whitefield',
        'Cloud kitchen growth accelerating in Koramangala',
        'Education franchises gaining in Electronic City',
        'Wellness brands expanding in Jayanagar',
      ],
    },
    Hyderabad: {
      bars:    [60, 75, 58, 88, 80, 70, 52],
      sectors: [
        { label: 'Food & Bev',  base: 91, trend: +4.5, color: '#7c3aed' },
        { label: 'QSR',         base: 83, trend: +6.2, color: '#ec4899' },
        { label: 'Retail',      base: 69, trend: +2.1, color: '#3b82f6' },
        { label: 'Education',   base: 72, trend: +3.8, color: '#10b981' },
        { label: 'Wellness',    base: 55, trend: +1.2, color: '#f97316' },
      ],
      signals: [
        'QSR franchises expanding in Gachibowli',
        'Education brands entering Kukatpally',
        'Retail demand increasing in Banjara Hills',
        'Food & Bev surge in HITEC City',
        'Wellness studios opening in Jubilee Hills',
      ],
    },
    Mumbai: {
      bars:    [65, 80, 70, 90, 85, 75, 60],
      sectors: [
        { label: 'Retail',      base: 92, trend: +3.0, color: '#3b82f6' },
        { label: 'Food & Bev',  base: 86, trend: +2.8, color: '#7c3aed' },
        { label: 'QSR',         base: 80, trend: +4.2, color: '#ec4899' },
        { label: 'Wellness',    base: 70, trend: +3.5, color: '#f97316' },
        { label: 'Education',   base: 63, trend: +1.9, color: '#10b981' },
      ],
      signals: [
        'Premium retail demand rising in Bandra',
        'F&B brands expanding in Andheri',
        'High-footfall QSR zones in Lower Parel',
        'Wellness studios growing in Juhu',
        'Education franchises rising in Thane',
      ],
    },
    Delhi: {
      bars:    [58, 68, 55, 78, 72, 62, 48],
      sectors: [
        { label: 'Education',   base: 85, trend: +5.1, color: '#10b981' },
        { label: 'Food & Bev',  base: 80, trend: +2.4, color: '#7c3aed' },
        { label: 'Retail',      base: 76, trend: +1.5, color: '#3b82f6' },
        { label: 'QSR',         base: 71, trend: +3.7, color: '#ec4899' },
        { label: 'Wellness',    base: 58, trend: +2.0, color: '#f97316' },
      ],
      signals: [
        'Education franchises booming in Noida',
        'Food & Bev demand up in Connaught Place',
        'Retail interest rising in South Delhi',
        'QSR expansion in Gurugram',
        'Wellness brands entering Dwarka',
      ],
    },
    Chennai: {
      bars:    [52, 65, 58, 76, 70, 60, 45],
      sectors: [
        { label: 'Education',   base: 82, trend: +4.8, color: '#10b981' },
        { label: 'Food & Bev',  base: 77, trend: +3.1, color: '#7c3aed' },
        { label: 'Wellness',    base: 68, trend: +3.9, color: '#f97316' },
        { label: 'Retail',      base: 64, trend: +1.3, color: '#3b82f6' },
        { label: 'QSR',         base: 72, trend: +2.6, color: '#ec4899' },
      ],
      signals: [
        'Education sector growing in Anna Nagar',
        'Food & Bev demand rising in T. Nagar',
        'Wellness brands expanding in Adyar',
        'QSR franchises entering OMR',
        'Retail interest up in Velachery',
      ],
    },
    Pune: {
      bars:    [56, 72, 60, 84, 76, 64, 50],
      sectors: [
        { label: 'Food & Bev',  base: 84, trend: +3.6, color: '#7c3aed' },
        { label: 'Education',   base: 78, trend: +4.4, color: '#10b981' },
        { label: 'QSR',         base: 75, trend: +3.2, color: '#ec4899' },
        { label: 'Retail',      base: 66, trend: +1.7, color: '#3b82f6' },
        { label: 'Wellness',    base: 60, trend: +2.8, color: '#f97316' },
      ],
      signals: [
        'Food & Bev demand rising in Koregaon Park',
        'Education franchises booming in Kothrud',
        'QSR expansion in Hinjewadi',
        'Retail interest up in Viman Nagar',
        'Wellness brands entering Baner',
      ],
    },
  };

  const CITIES = Object.keys(CITY_DATA);
  const [displayedBars, setDisplayedBars] = useState(CITY_DATA[city].bars.map(() => 0));
  const [displayedSectors, setDisplayedSectors] = useState(CITY_DATA[city].sectors.map(s => ({ ...s, current: 0 })));
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Animate in when active or city changes
  useEffect(() => {
    if (!active) {
      setDisplayedBars(CITY_DATA[city].bars.map(() => 0));
      setDisplayedSectors(CITY_DATA[city].sectors.map(s => ({ ...s, current: 0 })));
      return;
    }
    const data = CITY_DATA[city];
    data.bars.forEach((val, i) => {
      setTimeout(() => {
        setDisplayedBars(prev => { const n = [...prev]; n[i] = val; return n; });
      }, i * 70);
    });
    data.sectors.forEach((s, i) => {
      setTimeout(() => {
        setDisplayedSectors(prev => { const n = [...prev]; n[i] = { ...s, current: s.base }; return n; });
      }, 250 + i * 100);
    });
  }, [active, city]);

  const handleCityChange = (e) => {
    const next = e.target.value;
    setIsTransitioning(true);
    setTimeout(() => {
      onCityChange(next);
      setIsTransitioning(false);
    }, 280);
  };

  const signals = CITY_DATA[city].signals;

  return (
    <div
      style={{
        width: '100%',
        height: '540px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0b0f1a 0%, #0e1422 100%)',
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        padding: '20px',
        position: 'relative',
        opacity: isTransitioning ? 0.5 : 1,
        transition: 'opacity 0.28s ease',
      }}
    >
      {/* Grid texture */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.03, backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', zIndex: 10 }}>
        <div>
          <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b', margin: 0 }}>Live Intelligence</p>
          <p style={{ fontSize: '14px', fontWeight: 700, color: 'white', margin: '2px 0 0' }}>Market Activity</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '999px', padding: '3px 10px' }}>
            <span style={{ position: 'relative', display: 'flex', width: '6px', height: '6px' }}>
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#34d399', animation: 'ping 1.5s ease-in-out infinite', opacity: 0.6 }} />
              <span style={{ position: 'relative', width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
            </span>
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#34d399' }}>Live</span>
          </div>
          <select
            value={city}
            onChange={handleCityChange}
            style={{ fontSize: '10px', fontWeight: 600, color: '#94a3b8', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '3px 8px', cursor: 'pointer', outline: 'none' }}
          >
            {CITIES.map(ct => <option key={ct} value={ct} style={{ background: '#0e1422' }}>{ct}</option>)}
          </select>
        </div>
      </div>

      {/* Weekly bar chart */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <p style={{ fontSize: '10px', color: '#64748b', fontWeight: 500, margin: '0 0 8px' }}>Weekly Expansion Index</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', height: '64px' }}>
          {displayedBars.map((h, i) => {
            const isToday = i === todayIdx;
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                <div style={{ width: '100%', height: h + '%', minHeight: active ? '3px' : '0', borderRadius: '3px 3px 0 0', background: isToday ? 'linear-gradient(to top, #7c3aed, #a78bfa)' : 'rgba(148,163,184,0.18)', boxShadow: isToday ? '0 0 8px rgba(124,58,237,0.45)' : 'none', transition: 'height 0.5s cubic-bezier(0.22,1,0.36,1) ' + (i * 0.06) + 's' }} />
                <span style={{ fontSize: '8px', color: isToday ? '#a78bfa' : '#475569', fontWeight: isToday ? 700 : 400 }}>{DAY_LABELS[i]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sector bars */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <p style={{ fontSize: '10px', color: '#64748b', fontWeight: 500, margin: '0 0 8px' }}>Top Sectors</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          {displayedSectors.map((s, i) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '10px', color: '#94a3b8', width: '72px', flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.label}</span>
              <div style={{ flex: 1, height: '5px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: '999px', width: s.current + '%', background: s.color, boxShadow: '0 0 5px ' + s.color + '55', transition: 'width 0.65s cubic-bezier(0.22,1,0.36,1) ' + (0.25 + i * 0.09) + 's' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '60px', justifyContent: 'flex-end', flexShrink: 0 }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#cbd5e1' }}>{s.current}</span>
                <span style={{ fontSize: '9px', fontWeight: 600, color: s.trend >= 0 ? '#34d399' : '#f87171' }}>{s.trend >= 0 ? '+' : ''}{s.trend}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Signals — fixed height */}
      <div style={{ position: 'relative', zIndex: 10, flex: 1, minHeight: 0 }}>
        <p style={{ fontSize: '10px', color: '#64748b', fontWeight: 500, margin: '0 0 6px' }}>Investor Signals</p>
        <div style={{ maxHeight: '140px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {signals.map((text, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px', padding: '6px 10px', opacity: active ? 1 : 0, transform: active ? 'translateX(0)' : 'translateX(-8px)', transition: 'opacity 0.35s ease ' + (i * 0.07) + 's, transform 0.35s ease ' + (i * 0.07) + 's' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', flexShrink: 0 }} />
              <span style={{ fontSize: '10px', color: '#cbd5e1', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: 'relative', zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px' }}>
        <p style={{ fontSize: '9px', color: '#475569', margin: 0, textAlign: 'center' }}>Live · Updating every 60s · India Franchise Market</p>
      </div>
    </div>
  );
}
`;

c = c.slice(0, dashStart) + newDashboard + c.slice(dashEnd);

// ── 2. Add city state to MarketIntelligenceSection ────────────────────────────
c = c.replace(
  `function MarketIntelligenceSection() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const [tab, setTab] = useState('Quarterly');
  const [hoveredBar, setHoveredBar] = useState(null);`,
  `function MarketIntelligenceSection() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const [tab, setTab] = useState('Quarterly');
  const [hoveredBar, setHoveredBar] = useState(null);
  const [city, setCity] = useState('Bengaluru');
  const [headerVisible, setHeaderVisible] = useState(true);

  const handleCityChange = (next) => {
    setHeaderVisible(false);
    setTimeout(() => { setCity(next); setHeaderVisible(true); }, 280);
  };`
);

// ── 3. Make section header dynamic ───────────────────────────────────────────
c = c.replace(
  `        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 shadow-sm rounded-full px-4 py-1.5 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">India Franchise Market Intelligence</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold tracking-tight text-[#0b0f19] leading-tight mb-2">
            Inside India&apos;s Franchise Growth Engine
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            Real-time market insights, investor patterns, and expansion trends shaping India&apos;s franchise future.
          </p>
        </div>`,
  `        {/* Header — dynamic per city */}
        <div
          className="text-center mb-8"
          style={{ opacity: headerVisible ? 1 : 0, transition: 'opacity 0.28s ease' }}
        >
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 shadow-sm rounded-full px-4 py-1.5 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">India Franchise Market Intelligence</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold tracking-tight text-[#0b0f19] leading-tight mb-2">
            Live Franchise Activity in {city}
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            Real-time demand signals, sector growth trends, and investor movement across {city}&apos;s franchise ecosystem.
          </p>
        </div>`
);

// ── 4. Pass city + onCityChange to LiveDashboard ─────────────────────────────
c = c.replace(
  '<LiveDashboard active={active} />',
  '<LiveDashboard active={active} city={city} onCityChange={handleCityChange} />'
);

fs.writeFileSync('src/components/Hero.jsx', c);
console.log('Market section fully linked to city state');
