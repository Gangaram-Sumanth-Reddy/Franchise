/**
 * lib/index.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Barrel export for the entire backend infrastructure layer.
 * Import from here instead of individual files to keep imports clean.
 *
 * Usage:
 *   import { submitContactForm, validate, contactFormSchema } from '@/lib';
 * ─────────────────────────────────────────────────────────────────────────────
 */

// Supabase client
export { supabase, isSupabaseConfigured } from './supabase';

// Validation schemas + utility
export {
  contactFormSchema,
  franchiseInquirySchema,
  brandApplicationSchema,
  jobApplicationSchema,
  newsletterSchema,
  chatbotBrandSchema,
  chatbotInvestorSchema,
  validate,
} from './validation';

// Form submission helpers
export {
  submitContactForm,
  submitFranchiseInquiry,
  submitBrandApplication,
  submitJobApplication,
  submitNewsletterSignup,
  submitChatbotBrandSession,
  submitChatbotInvestorSession,
} from './submissions';

// Rate limiting
export {
  checkRateLimit,
  recordSubmission,
  RATE_LIMIT_KEYS,
} from './rateLimiter';

// Realtime subscriptions (admin use only)
export {
  subscribeToNewLeads,
  subscribeToFranchiseInquiries,
  subscribeToBrandApplications,
  subscribeToJobApplications,
  subscribeToChatbotSessions,
  subscribeToAllLeads,
} from './realtime';
