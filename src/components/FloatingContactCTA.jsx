import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingContactCTA({ franchiseName = 'this opportunity' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    investmentRange: '',
    state: '',
    city: '',
    website: '',
    message: '',
    contactMethod: 'email',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleEscape);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setIsOpen(false);
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        investmentRange: '',
        state: '',
        city: '',
        website: '',
        message: '',
        contactMethod: 'email',
      });
    }, 3000);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSubmitted(false);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Button clicked - opening modal');
    setIsOpen(true);
  };

  // Debug logging + body scroll lock
  useEffect(() => {
    if (isOpen) {
      console.log('Modal is now OPEN');
      document.body.style.overflow = 'hidden';
    } else {
      console.log('Modal is now CLOSED');
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Premium Animated Advisor Button - GLOBAL FIXED */}
      <AnimatePresence>
        {isVisible && !isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: 100 }}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleButtonClick}
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              zIndex: 999999,
              pointerEvents: 'auto',
            }}
            className="group relative flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 shadow-[0_12px_32px_rgba(99,102,241,0.4)] transition-all duration-300 hover:shadow-[0_16px_48px_rgba(99,102,241,0.5)] sm:h-20 sm:w-20"
            aria-label="Talk to Franchise Strategist"
          >
            {/* Animated Background Rings */}
            <motion.span
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-violet-400"
            />
            <motion.span
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute inset-0 rounded-full bg-indigo-400"
            />

            {/* Orbiting Particles */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0"
            >
              <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/60" />
              <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/60" />
            </motion.div>

            {/* Premium Advisor Icon - Human with Headset */}
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10"
            >
              <svg 
                className="h-10 w-10 text-white drop-shadow-lg sm:h-11 sm:w-11" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={2}
              >
                {/* Head */}
                <circle cx="12" cy="7" r="3.5" strokeLinecap="round" />
                {/* Body/Shoulders */}
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" 
                />
                {/* Headset Left */}
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M7 9c-1.5 0-2 1-2 2v2c0 .5.5 1 1 1s1-.5 1-1v-2c0-.5 0-1 0-2z" 
                />
                {/* Headset Right */}
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M17 9c1.5 0 2 1 2 2v2c0 .5-.5 1-1 1s-1-.5-1-1v-2c0-.5 0-1 0-2z" 
                />
                {/* Microphone */}
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M15 13h2" 
                />
              </svg>
            </motion.div>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-400/30 to-purple-600/30 blur-2xl transition-all duration-300 group-hover:blur-3xl" />

            {/* Tooltip on Hover */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-xl lg:block"
            >
              Talk to Franchise Strategist
              <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rotate-45 bg-slate-900" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal Popup - REACT PORTAL TO BODY */}
      {isOpen && createPortal(
        <AnimatePresence>
          <div style={{ position: 'fixed', inset: 0, zIndex: 999999 }}>
            {/* Backdrop - Subtle Dim Only */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/40"
              style={{ zIndex: 999999 }}
            />

            {/* Modal Content - Crystal Clear */}
            <div className="absolute inset-0 flex items-end justify-center p-4 sm:items-center" style={{ zIndex: 1000000 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_rgba(0,0,0,0.25)] sm:max-h-[90vh]"
              >
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-all duration-200 hover:bg-slate-200 hover:text-slate-900"
                  aria-label="Close"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Scrollable Content */}
                <div className="max-h-[85vh] overflow-y-auto p-6 sm:p-8 lg:p-10">
                  {!isSubmitted ? (
                    <>
                      {/* Header */}
                      <div className="mb-8 text-center">
                        <div className="mb-4 inline-flex rounded-full bg-gradient-to-br from-violet-100 to-purple-100 p-4">
                          <svg className="h-10 w-10 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <circle cx="12" cy="7" r="3.5" strokeLinecap="round" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 9c-1.5 0-2 1-2 2v2c0 .5.5 1 1 1s1-.5 1-1v-2c0-.5 0-1 0-2z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 9c1.5 0 2 1 2 2v2c0 .5-.5 1-1 1s-1-.5-1-1v-2c0-.5 0-1 0-2z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13h2" />
                          </svg>
                        </div>
                        <h3 className="text-3xl font-bold tracking-tight text-slate-900">
                          Talk to Franchise Strategist
                        </h3>
                        <p className="mt-3 text-base text-slate-600">
                          Get personalized guidance about {franchiseName}
                        </p>
                      </div>

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <label htmlFor="firstName" className="mb-2 block text-sm font-semibold text-slate-800">
                              First Name <span className="text-red-600">*</span>
                            </label>
                            <input
                              id="firstName"
                              name="firstName"
                              type="text"
                              required
                              value={formData.firstName}
                              onChange={handleInputChange}
                              placeholder="John"
                              className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                            />
                          </div>
                          <div>
                            <label htmlFor="lastName" className="mb-2 block text-sm font-semibold text-slate-800">
                              Last Name <span className="text-red-600">*</span>
                            </label>
                            <input
                              id="lastName"
                              name="lastName"
                              type="text"
                              required
                              value={formData.lastName}
                              onChange={handleInputChange}
                              placeholder="Doe"
                              className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                            />
                          </div>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-slate-800">
                              Phone Number <span className="text-red-600">*</span>
                            </label>
                            <input
                              id="phone"
                              name="phone"
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="+1 (555) 000-0000"
                              className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-800">
                              Email Address <span className="text-red-600">*</span>
                            </label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="john@example.com"
                              className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="investmentRange" className="mb-2 block text-sm font-semibold text-slate-800">
                            Investment Range <span className="text-red-600">*</span>
                          </label>
                          <select
                            id="investmentRange"
                            name="investmentRange"
                            required
                            value={formData.investmentRange}
                            onChange={handleInputChange}
                            className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                          >
                            <option value="">Select investment range</option>
                            <option value="30k-80k">$30K - $80K</option>
                            <option value="80k-150k">$80K - $150K</option>
                            <option value="150k-300k">$150K - $300K</option>
                            <option value="300k+">$300K+</option>
                          </select>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <label htmlFor="state" className="mb-2 block text-sm font-semibold text-slate-800">
                              State <span className="text-red-600">*</span>
                            </label>
                            <input
                              id="state"
                              name="state"
                              type="text"
                              required
                              value={formData.state}
                              onChange={handleInputChange}
                              placeholder="California"
                              className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                            />
                          </div>
                          <div>
                            <label htmlFor="city" className="mb-2 block text-sm font-semibold text-slate-800">
                              City <span className="text-red-600">*</span>
                            </label>
                            <input
                              id="city"
                              name="city"
                              type="text"
                              required
                              value={formData.city}
                              onChange={handleInputChange}
                              placeholder="Los Angeles"
                              className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="website" className="mb-2 block text-sm font-semibold text-slate-800">
                            Website URL <span className="text-slate-500">(Optional)</span>
                          </label>
                          <input
                            id="website"
                            name="website"
                            type="url"
                            value={formData.website}
                            onChange={handleInputChange}
                            placeholder="https://yourwebsite.com"
                            className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                          />
                        </div>

                        <div>
                          <label htmlFor="contactMethod" className="mb-2 block text-sm font-semibold text-slate-800">
                            Preferred Contact Method <span className="text-red-600">*</span>
                          </label>
                          <select
                            id="contactMethod"
                            name="contactMethod"
                            required
                            value={formData.contactMethod}
                            onChange={handleInputChange}
                            className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                          >
                            <option value="email">Email</option>
                            <option value="phone">Phone</option>
                            <option value="both">Both</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="message" className="mb-2 block text-sm font-semibold text-slate-800">
                            Message / Interest
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Tell us about your interest in this franchise opportunity..."
                            className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/30"
                        >
                          Submit Request
                        </button>
                      </form>
                    </>
                  ) : (
                    /* Success State */
                    <div className="py-16 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                        className="mb-6 inline-flex rounded-full bg-emerald-100 p-5"
                      >
                        <svg className="h-14 w-14 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                      <h3 className="text-3xl font-bold text-slate-900">Request Submitted!</h3>
                      <p className="mt-4 text-base text-slate-600">
                        Thank you for your interest. Our franchise strategist will contact you shortly.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
