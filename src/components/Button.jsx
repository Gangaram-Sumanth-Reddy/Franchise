function Button({ children, variant = 'primary', icon = false, className = '', onClick }) {
  const baseClasses =
    'inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-semibold transition duration-300 hover:scale-[1.03] active:scale-[0.97]';

  const variants = {
    primary:
      'bg-[#0b0f19] text-white shadow-soft hover:bg-[#131a2a]',
    secondary:
      'border border-slate-200 bg-white text-[#0b0f19] shadow-soft hover:bg-slate-100',
  };

  return (
    <button type="button" onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
      {icon ? (
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#1e2637] text-base leading-none">
          →
        </span>
      ) : null}
    </button>
  );
}

export default Button;
