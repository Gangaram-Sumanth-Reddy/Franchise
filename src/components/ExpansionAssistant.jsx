import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Navigation helper ─────────────────────────────────────────────────────────
const navTo = (path, setIsOpen) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  setIsOpen(false);
};

// ── Shared SVG icons ──────────────────────────────────────────────────────────
const SparkIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2L13.5 8.5L20 7L14.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L9.5 12L4 7L10.5 8.5L12 2Z"
      stroke="rgba(167,139,250,0.9)"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill="rgba(139,92,246,0.15)"
    />
  </svg>
);

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const ArrowLeft = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);

// ── Row icons ─────────────────────────────────────────────────────────────────
const BrandIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const InvestorIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
  </svg>
);

const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const HelpIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

// ── Chip Selector ─────────────────────────────────────────────────────────────
function ChipSelect({ options, value, onChange, multi = false }) {
  const isSelected = (opt) => multi ? (value || []).includes(opt) : value === opt;
  const handleClick = (opt) => {
    if (multi) {
      const current = value || [];
      onChange(current.includes(opt) ? current.filter(o => o !== opt) : [...current, opt]);
    } else {
      onChange(opt);
    }
  };
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => handleClick(opt)}
          style={{
            padding: '6px 12px',
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 500,
            border: isSelected(opt) ? '1px solid rgba(124,58,237,0.4)' : '1px solid rgba(0,0,0,0.1)',
            background: isSelected(opt) ? 'rgba(124,58,237,0.08)' : 'rgba(0,0,0,0.03)',
            color: isSelected(opt) ? 'rgba(109,40,217,1)' : 'rgba(71,85,105,0.8)',
            cursor: 'pointer',
            transition: 'all 0.12s ease',
          }}
          onMouseEnter={e => { if (!isSelected(opt)) e.currentTarget.style.background = 'rgba(0,0,0,0.06)'; }}
          onMouseLeave={e => { if (!isSelected(opt)) e.currentTarget.style.background = 'rgba(0,0,0,0.03)'; }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ── Text Input ────────────────────────────────────────────────────────────────
function TextInput({ placeholder, value, onChange, type = 'text' }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%',
        marginTop: 14,
        padding: '10px 14px',
        borderRadius: 10,
        background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.1)', color: 'rgba(15,23,42,0.9)', fontSize: 13, outline: 'none', boxSizing: 'border-box', transition: 'all 0.15s ease',
      }}
      onFocus={e => {
        e.target.style.border = '1px solid rgba(124,58,237,0.4)'; e.target.style.background = 'rgba(124,58,237,0.03)';
      }}
      onBlur={e => {
        e.target.style.border = '1px solid rgba(0,0,0,0.1)'; e.target.style.background = 'rgba(0,0,0,0.03)';
      }}
    />
  );
}

// ── Progress Bar ──────────────────────────────────────────────────────────────
function ProgressBar({ current, total }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ height: 2, background: 'rgba(0,0,0,0.07)', borderRadius: 99, overflow: 'hidden' }}>
        <motion.div
          style={{ height: '100%', background: 'linear-gradient(90deg,#7c3aed,#818cf8)', borderRadius: 99 }}
          initial={{ width: 0 }}
          animate={{ width: `${(current / total) * 100}%` }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

// ── Continue Button ───────────────────────────────────────────────────────────
function ContinueBtn({ onClick, disabled, label = 'Continue' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%',
        padding: '12px',
        borderRadius: 12,
        background: disabled ? 'rgba(124,58,237,0.2)' : 'linear-gradient(135deg,#7c3aed,#6366f1)',
        color: disabled ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.95)',
        fontSize: 13.5,
        fontWeight: 600,
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: disabled ? 'none' : '0 4px 24px rgba(124,58,237,0.35), 0 1px 0 rgba(255,255,255,0.1) inset',
        transition: 'all 0.18s ease',
        letterSpacing: '-0.015em',
      }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.filter = 'brightness(1.12)'; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
      onMouseLeave={e => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.transform = 'none'; }}
    >
      {label}
    </button>
  );
}

// ── Flow Header ───────────────────────────────────────────────────────────────
function FlowHeader({ title, onBack, step, total }) {
  return (
    <div style={{ padding: '13px 14px 12px', borderBottom: '1px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, background: 'rgba(248,249,252,1)' }}>
      <button
        onClick={onBack}
        style={{ width: 30, height: 30, borderRadius: 9, background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(71,85,105,0.7)', cursor: 'pointer', transition: 'all 0.15s ease' }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.07)'; e.currentTarget.style.color = 'rgba(15,23,42,0.8)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.04)'; e.currentTarget.style.color = 'rgba(71,85,105,0.7)'; }}
      >
        <ArrowLeft />
      </button>
      <span style={{ color: 'rgba(15,23,42,0.9)', fontSize: 13.5, fontWeight: 600, letterSpacing: '-0.02em' }}>{title}</span>
      {total ? (
        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, fontWeight: 500, background: 'rgba(255,255,255,0.05)', padding: '3px 8px', borderRadius: 20, border: '1px solid rgba(0,0,0,0.08)' }}>{step}/{total}</span>
      ) : (
        <div style={{ width: 30 }} />
      )}
    </div>
  );
}

// ── Summary Card ──────────────────────────────────────────────────────────────
function SummaryCard({ rows }) {
  return (
    <div style={{ background: 'rgba(124,58,237,0.04)', border: '1px solid rgba(124,58,237,0.12)', borderRadius: 12, padding: 16 }}>
      {rows.map(({ label, value }, i) => value && (
        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 6, paddingBottom: 6, borderBottom: i < rows.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
          <span style={{ color: 'rgba(100,116,139,0.8)', fontSize: 11 }}>{label}</span>
          <span style={{ color: 'rgba(15,23,42,0.88)', fontSize: 12, fontWeight: 500 }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

// ── Home View ─────────────────────────────────────────────────────────────────
const PRIMARY_ROWS = [
  {
    id: 'brands',
    label: 'FOR BRANDS',
    title: 'Scale my brand through franchising',
    iconBg: 'linear-gradient(135deg,rgba(139,92,246,0.3),rgba(99,102,241,0.2))',
    iconColor: 'rgba(167,139,250,0.9)',
    icon: <BrandIcon />,
  },
  {
    id: 'investors',
    label: 'FOR INVESTORS',
    title: 'Discover franchise opportunities',
    iconBg: 'linear-gradient(135deg,rgba(16,185,129,0.25),rgba(5,150,105,0.15))',
    iconColor: 'rgba(52,211,153,0.9)',
    icon: <InvestorIcon />,
  },
  {
    id: 'strategy',
    label: 'STRATEGY CALL',
    title: 'Speak with expansion experts',
    iconBg: 'linear-gradient(135deg,rgba(59,130,246,0.25),rgba(37,99,235,0.15))',
    iconColor: 'rgba(96,165,250,0.9)',
    icon: <PhoneIcon />,
  },
];

const SECONDARY_ROWS = [
  {
    id: 'services',
    path: '/services',
    label: 'SERVICES',
    title: 'How iFranchise works',
    icon: <InfoIcon />,
  },
  {
    id: 'support',
    label: 'SUPPORT',
    title: 'Navigate the platform',
    icon: <HelpIcon />,
  },
];

function ActionRow({ row, onClick, index, secondary = false }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: secondary ? '10px 13px' : '11px 13px',
        borderRadius: 14,
        background: hovered
          ? secondary ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.07)'
          : secondary ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)',
        border: hovered
          ? `1px solid ${secondary ? 'rgba(255,255,255,0.1)' : 'rgba(139,92,246,0.3)'}`
          : `1px solid ${secondary ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.07)'}`,
        cursor: 'pointer',
        textAlign: 'left',
        transform: hovered ? 'translateX(3px)' : 'translateX(0)',
        transition: 'all 0.18s cubic-bezier(0.22,1,0.36,1)',
        boxShadow: hovered && !secondary ? '0 2px 12px rgba(124,58,237,0.08)' : 'none',
      }}
    >
      {/* Icon */}
      <div style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        background: secondary ? 'rgba(0,0,0,0.04)' : row.iconBg,
        border: secondary ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: secondary ? 'rgba(100,116,139,0.7)' : row.iconColor,
        transition: 'transform 0.18s ease',
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
      }}>
        {row.icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 9.5,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: secondary ? 'rgba(148,163,184,0.9)' : 'rgba(124,58,237,0.7)',
          marginBottom: 3,
        }}>
          {row.label}
        </div>
        <div style={{
          fontSize: 13.5,
          fontWeight: 500,
          color: secondary ? 'rgba(71,85,105,0.85)' : 'rgba(15,23,42,0.88)',
          letterSpacing: '-0.015em',
          lineHeight: 1.3,
        }}>
          {row.title}
        </div>
      </div>

      {/* Arrow */}
      <div style={{
        color: hovered ? 'rgba(124,58,237,0.6)' : 'rgba(148,163,184,0.6)',
        flexShrink: 0,
        transition: 'color 0.15s ease, transform 0.18s ease',
        transform: hovered ? 'translateX(2px)' : 'translateX(0)',
      }}>
        <ChevronRight />
      </div>
    </motion.button>
  );
}

function HomeView({ setView, setIsOpen }) {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      {/* Welcome header */}
      <div style={{ padding: '16px 16px 12px', flexShrink: 0 }}>
        <div style={{
          fontSize: 15,
          fontWeight: 650,
          color: 'rgba(15,23,42,0.92)', letterSpacing: '-0.025em',
          lineHeight: 1.3,
          marginBottom: 4,
        }}>
          How can iFranchise help<br />you grow today?
        </div>
        <div style={{ fontSize: 11.5, color: 'rgba(100,116,139,0.8)', letterSpacing: '-0.01em' }}>
          Select an option to get started
        </div>
      </div>

      {/* Action rows */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 10px 14px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {PRIMARY_ROWS.map((row, i) => (
          <ActionRow key={row.id} row={row} onClick={() => setView(row.id)} index={i} />
        ))}

        {/* Thin divider */}
        <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '2px 4px' }} />

        {SECONDARY_ROWS.map((row, i) => (
          <ActionRow
            key={row.id}
            row={row}
            onClick={() => row.path ? navTo(row.path, setIsOpen) : setView(row.id)}
            index={PRIMARY_ROWS.length + 1 + i}
            secondary
          />
        ))}
      </div>
    </motion.div>
  );
}

// ── Brands Flow ───────────────────────────────────────────────────────────────
const BRAND_STEPS = [
  { q: "What's your brand name?", type: 'text', key: 'brandName', placeholder: 'e.g. Chai Point, FitZone...' },
  { q: 'Which industry?', type: 'chips', key: 'industry', options: ['Food & Beverage', 'Health & Wellness', 'Education', 'Retail', 'Technology', 'Home Services', 'Other'] },
  { q: 'How many locations currently?', type: 'chips', key: 'locations', options: ['1', '2–5', '6–15', '15+'] },
  { q: 'Target expansion cities?', type: 'chips', key: 'cities', options: ['3–5', '5–10', '10–20', '20+ (National)'] },
  { q: 'Franchise investment range?', type: 'chips', key: 'investment', options: ['Under ₹25L', '₹25L–₹50L', '₹50L–₹1Cr', '₹1Cr+'] },
  { q: 'Your name & contact?', type: 'contact', key: 'contact' },
];

function BrandsView({ setView, setIsOpen }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [done, setDone] = useState(false);

  const current = BRAND_STEPS[step];
  const val = data[current?.key];
  const canContinue = current?.type === 'contact'
    ? (data.contactName?.trim() && data.contactPhone?.trim())
    : (Array.isArray(val) ? val.length > 0 : Boolean(val?.trim?.() ?? val));

  const handleContinue = () => {
    if (step < BRAND_STEPS.length - 1) setStep(s => s + 1);
    else setDone(true);
  };

  if (done) {
    return (
      <motion.div
        key="brands-done"
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -12 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <FlowHeader title="Your Summary" onBack={() => { setDone(false); setStep(0); setData({}); setView('home'); }} />
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SummaryCard rows={[
            { label: 'Brand', value: data.brandName },
            { label: 'Industry', value: data.industry },
            { label: 'Locations', value: data.locations },
            { label: 'Target Cities', value: data.cities },
            { label: 'Investment', value: data.investment },
            { label: 'Contact', value: data.contactName },
            { label: 'Phone', value: data.contactPhone },
          ]} />
          <p style={{ color: 'rgba(100,116,139,0.7)', fontSize: 12, textAlign: 'center', margin: 0 }}>
            Our expansion team will reach out within 24 hours.
          </p>
          <ContinueBtn onClick={() => window.open('https://cal.com/ifranchise/30min', '_blank')} label="Schedule Expansion Consultation" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={`brands-${step}`}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <FlowHeader
        title="For Brands"
        onBack={() => step === 0 ? setView('home') : setStep(s => s - 1)}
        step={step + 1}
        total={BRAND_STEPS.length}
      />
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px' }}>
        <ProgressBar current={step + 1} total={BRAND_STEPS.length} />
        <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(15,23,42,0.9)', letterSpacing: '-0.02em', marginBottom: 4 }}>
          {current.q}
        </div>
        {current.type === 'text' && (
          <TextInput placeholder={current.placeholder} value={data[current.key]} onChange={v => setData(d => ({ ...d, [current.key]: v }))} />
        )}
        {current.type === 'chips' && (
          <ChipSelect options={current.options} value={data[current.key]} onChange={v => setData(d => ({ ...d, [current.key]: v }))} />
        )}
        {current.type === 'contact' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <TextInput placeholder="Your full name" value={data.contactName} onChange={v => setData(d => ({ ...d, contactName: v }))} />
            <TextInput placeholder="Phone number" value={data.contactPhone} onChange={v => setData(d => ({ ...d, contactPhone: v }))} type="tel" />
          </div>
        )}
      </div>
      <div style={{ padding: '12px 16px 16px', flexShrink: 0 }}>
        <ContinueBtn
          onClick={handleContinue}
          disabled={!canContinue}
          label={step === BRAND_STEPS.length - 1 ? 'View Summary' : 'Continue'}
        />
      </div>
    </motion.div>
  );
}

// ── Investors Flow ────────────────────────────────────────────────────────────
const INVESTOR_STEPS = [
  { q: 'Preferred industries?', type: 'chips', key: 'industries', multi: true, options: ['Food & Beverage', 'Health & Wellness', 'Education', 'Retail', 'Technology', 'Home Services', 'Other'] },
  { q: 'Investment budget?', type: 'chips', key: 'budget', options: ['Under ₹25L', '₹25L–₹50L', '₹50L–₹1Cr', '₹1Cr–₹5Cr', '₹5Cr+'] },
  { q: 'Target cities?', type: 'chips', key: 'cities', options: ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pan India'] },
  { q: 'Expected ROI?', type: 'chips', key: 'roi', options: ['20–30%', '30–40%', '40%+'] },
  { q: 'Investment timeline?', type: 'chips', key: 'timeline', options: ['Immediate', '3 months', '6 months', '12 months+'] },
];

function InvestorsView({ setView, setIsOpen }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [done, setDone] = useState(false);

  const current = INVESTOR_STEPS[step];
  const val = data[current?.key];
  const canContinue = Array.isArray(val) ? val.length > 0 : Boolean(val);

  const handleContinue = () => {
    if (step < INVESTOR_STEPS.length - 1) setStep(s => s + 1);
    else setDone(true);
  };

  if (done) {
    return (
      <motion.div
        key="investors-done"
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -12 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <FlowHeader title="Matching Opportunities" onBack={() => { setDone(false); setStep(0); setData({}); setView('home'); }} />
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SummaryCard rows={[
            { label: 'Industries', value: Array.isArray(data.industries) ? data.industries.join(', ') : data.industries },
            { label: 'Budget', value: data.budget },
            { label: 'Cities', value: data.cities },
            { label: 'Expected ROI', value: data.roi },
            { label: 'Timeline', value: data.timeline },
          ]} />
          <p style={{ color: 'rgba(100,116,139,0.7)', fontSize: 12, textAlign: 'center', margin: 0 }}>
            We have curated opportunities matching your profile.
          </p>
          <ContinueBtn onClick={() => navTo('/franchise-opportunities', setIsOpen)} label="Browse Matching Opportunities" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={`investors-${step}`}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <FlowHeader
        title="For Investors"
        onBack={() => step === 0 ? setView('home') : setStep(s => s - 1)}
        step={step + 1}
        total={INVESTOR_STEPS.length}
      />
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px' }}>
        <ProgressBar current={step + 1} total={INVESTOR_STEPS.length} />
        <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(15,23,42,0.9)', letterSpacing: '-0.02em', marginBottom: 4 }}>
          {current.q}
        </div>
        <ChipSelect
          options={current.options}
          value={data[current.key]}
          onChange={v => setData(d => ({ ...d, [current.key]: v }))}
          multi={current.multi}
        />
      </div>
      <div style={{ padding: '12px 16px 16px', flexShrink: 0 }}>
        <ContinueBtn
          onClick={handleContinue}
          disabled={!canContinue}
          label={step === INVESTOR_STEPS.length - 1 ? 'View Matches' : 'Continue'}
        />
      </div>
    </motion.div>
  );
}

// ── Strategy Call View ────────────────────────────────────────────────────────
function StrategyView({ setView, setIsOpen }) {
  const features = [
    { label: '30', text: '30-min discovery call with an expansion expert' },
    { label: '→', text: 'Custom expansion roadmap tailored to your brand' },
    { label: '★', text: 'Investor matching preview for your opportunity' },
  ];

  return (
    <motion.div
      key="strategy"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <FlowHeader title="Book Strategy Call" onBack={() => setView('home')} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(37,99,235,0.8)', marginBottom: 10 }}>
            Strategy Consultation
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(15,23,42,0.9)', letterSpacing: '-0.02em', marginBottom: 14 }}>
            Book a Strategy Consultation
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {features.map(({ label, text }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: 7,
                  background: 'rgba(59,130,246,0.15)',
                  border: '1px solid rgba(59,130,246,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 1,
                }}>
                  <span style={{ color: 'rgba(96,165,250,0.9)', fontSize: 9, fontWeight: 700 }}>{label}</span>
                </div>
                <p style={{ color: 'rgba(71,85,105,0.85)', fontSize: 12, lineHeight: 1.5, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 6px rgba(52,211,153,0.6)' }} />
            <span style={{ color: 'rgba(52,211,153,0.9)', fontSize: 11, fontWeight: 500 }}>Response within 24 hours</span>
          </div>
        </div>
        <button
          onClick={() => window.open('https://cal.com/ifranchise/30min', '_blank')} style={{
            width: '100%',
            padding: '11px',
            borderRadius: 10,
            background: 'linear-gradient(135deg,#2563eb,#1d4ed8)',
            color: 'white',
            fontSize: 13,
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(37,99,235,0.3)',
            letterSpacing: '-0.01em',
            transition: 'filter 0.15s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.filter = 'none'; }}
        >
          Schedule Now
        </button>
        <p style={{ color: 'rgba(100,116,139,0.7)', fontSize: 12, textAlign: 'center', margin: 0 }}>
          Or call us directly:{' '}
          <a href="tel:+919876543210" style={{ color: 'rgba(15,23,42,0.7)', textDecoration: 'none', fontWeight: 500 }}>
            +91 98765 43210
          </a>
        </p>
      </div>
    </motion.div>
  );
}

// ── Services View ─────────────────────────────────────────────────────────────
const SERVICES_LIST = [
  {
    title: 'Franchise Onboarding',
    desc: 'End-to-end setup for new franchise partners',
    path: '/services',
    iconBg: 'linear-gradient(135deg,rgba(139,92,246,0.3),rgba(99,102,241,0.2))',
    iconColor: 'rgba(167,139,250,0.9)',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: 'Investor Acquisition',
    desc: 'Connect with qualified franchise investors',
    path: '/franchise-opportunities',
    iconBg: 'linear-gradient(135deg,rgba(16,185,129,0.25),rgba(5,150,105,0.15))',
    iconColor: 'rgba(52,211,153,0.9)',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    title: 'Expansion Strategy',
    desc: 'Data-driven roadmaps for national growth',
    path: '/services',
    iconBg: 'linear-gradient(135deg,rgba(245,158,11,0.25),rgba(217,119,6,0.15))',
    iconColor: 'rgba(251,191,36,0.9)',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: 'Brand Documentation',
    desc: 'FDD, operations manuals, and legal frameworks',
    path: '/services',
    iconBg: 'linear-gradient(135deg,rgba(99,102,241,0.25),rgba(79,70,229,0.15))',
    iconColor: 'rgba(129,140,248,0.9)',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
];

function ServicesView({ setView, setIsOpen }) {
  return (
    <motion.div
      key="services"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <FlowHeader title="Our Services" onBack={() => setView('home')} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {SERVICES_LIST.map((svc, i) => {
          const [hovered, setHovered] = useState(false);
          return (
            <motion.button
              key={svc.title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.2 }}
              onClick={() => navTo(svc.path, setIsOpen)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                borderRadius: 12,
                background: hovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
                border: hovered ? '1px solid rgba(139,92,246,0.2)' : '1px solid rgba(255,255,255,0.05)',
                cursor: 'pointer',
                textAlign: 'left',
                transform: hovered ? 'translateX(2px)' : 'translateX(0)',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ width: 28, height: 28, borderRadius: 8, background: svc.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: svc.iconColor }}>
                {svc.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(15,23,42,0.85)', letterSpacing: '-0.01em' }}>{svc.title}</div>
                <div style={{ fontSize: 11, color: 'rgba(100,116,139,0.7)', marginTop: 2 }}>{svc.desc}</div>
              </div>
              <span style={{ color: 'rgba(148,163,184,0.7)', fontSize: 14, flexShrink: 0 }}>→</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── Support View ──────────────────────────────────────────────────────────────
const SUPPORT_LINKS = [
  {
    title: 'How does iFranchise work?',
    path: '/services',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    title: 'Browse franchise opportunities',
    path: '/franchise-opportunities',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    title: 'List your brand',
    path: '/list-your-brand',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
  },
  {
    title: 'Contact our team',
    path: '/contact',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
      </svg>
    ),
  },
];

function SupportView({ setView, setIsOpen }) {
  return (
    <motion.div
      key="support"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <FlowHeader title="Quick Support" onBack={() => setView('home')} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <p style={{ color: 'rgba(100,116,139,0.7)', fontSize: 12, margin: '4px 2px 8px', letterSpacing: '-0.01em' }}>
          Where would you like to go?
        </p>
        {SUPPORT_LINKS.map((link, i) => {
          const [hovered, setHovered] = useState(false);
          return (
            <motion.button
              key={link.path}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.2 }}
              onClick={() => navTo(link.path, setIsOpen)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                borderRadius: 12,
                background: hovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
                border: hovered ? '1px solid rgba(139,92,246,0.2)' : '1px solid rgba(255,255,255,0.05)',
                cursor: 'pointer',
                textAlign: 'left',
                transform: hovered ? 'translateX(2px)' : 'translateX(0)',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'rgba(100,116,139,0.7)' }}>
                {link.icon}
              </div>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: 'rgba(15,23,42,0.85)', letterSpacing: '-0.01em' }}>{link.title}</span>
              <span style={{ color: 'rgba(148,163,184,0.7)', fontSize: 14, flexShrink: 0 }}>→</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ExpansionAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('home');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setView('home'), 300);
  }, []);

  const handleOpen = useCallback(() => setIsOpen(true), []);

  // Panel styles
  const panelStyle = isMobile
    ? {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '78vh',
        borderRadius: '20px 20px 0 0',
        zIndex: 9999,
        background: 'rgba(255,255,255,0.98)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.06), 0 -20px 60px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }
    : {
        position: 'fixed',
        bottom: 80,
        right: 24,
        width: 360,
        maxHeight: 520,
        borderRadius: 16,
        zIndex: 9999,
        background: 'rgba(255,255,255,0.98)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.06), 0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      };

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(4px)', zIndex: 9998 }}
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            style={panelStyle}
          >
            {/* Header */}
            <div style={{ padding: '14px 16px 13px', borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0, background: 'rgba(248,249,252,1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: 'linear-gradient(135deg,rgba(139,92,246,0.25),rgba(99,102,241,0.12))',
                    border: '1px solid rgba(139,92,246,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 12px rgba(139,92,246,0.15)',
                  }}>
                    <SparkIcon size={13} />
                  </div>
                  <div>
                    <div style={{ color: 'rgba(15,23,42,0.92)', fontSize: 13.5, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                      Expansion Intelligence
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px rgba(52,211,153,0.7)' }} />
                      <span style={{ color: 'rgba(100,116,139,1)', fontSize: 10.5, fontWeight: 500, letterSpacing: '0.01em' }}>iFranchise AI · Online</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 9,
                    background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(71,85,105,0.7)', cursor: 'pointer', transition: 'all 0.15s ease', }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.07)'; e.currentTarget.style.color = 'rgba(15,23,42,0.8)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.04)'; e.currentTarget.style.color = 'rgba(71,85,105,0.7)'; }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* View router */}
            <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
              <AnimatePresence mode="wait">
                {view === 'home' && <HomeView key="home" setView={setView} setIsOpen={setIsOpen} />}
                {view === 'brands' && <BrandsView key="brands" setView={setView} setIsOpen={setIsOpen} />}
                {view === 'investors' && <InvestorsView key="investors" setView={setView} setIsOpen={setIsOpen} />}
                {view === 'strategy' && <StrategyView key="strategy" setView={setView} setIsOpen={setIsOpen} />}
                {view === 'services' && <ServicesView key="services" setView={setView} setIsOpen={setIsOpen} />}
                {view === 'support' && <SupportView key="support" setView={setView} setIsOpen={setIsOpen} />}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher button */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="launcher"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.18 }}
              style={{ position: 'relative' }}
            >
              {/* Ambient glow */}
              <motion.div
                animate={{ opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  inset: -8,
                  borderRadius: 24,
                  background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />
              <motion.button
                onClick={handleOpen}
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open Expansion Assistant"
                style={{
                  position: 'relative',
                  width: 48,
                  height: 48,
                  borderRadius: 16,
                  background: 'linear-gradient(135deg,#0f1629 0%,#1a1040 100%)',
                  border: '1px solid rgba(139,92,246,0.2)',
                  boxShadow: '0 0 0 1px rgba(139,92,246,0.1), 0 8px 32px rgba(0,0,0,0.4), 0 0 40px rgba(139,92,246,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)';
                  e.currentTarget.style.boxShadow = '0 0 0 1px rgba(139,92,246,0.2), 0 8px 32px rgba(0,0,0,0.5), 0 0 60px rgba(139,92,246,0.25)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(139,92,246,0.2)';
                  e.currentTarget.style.boxShadow = '0 0 0 1px rgba(139,92,246,0.1), 0 8px 32px rgba(0,0,0,0.4), 0 0 40px rgba(139,92,246,0.15)';
                }}
              >
                <SparkIcon size={18} />
              </motion.button>
            </motion.div>
          ) : (
            <motion.button
              key="close-fab"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.18 }}
              onClick={handleClose}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Close Expansion Assistant"
              style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                background: 'linear-gradient(135deg,#0f1629 0%,#1a1040 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
