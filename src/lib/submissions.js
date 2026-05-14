/**
 * submissions.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable form submission helpers.
 * Each function handles: validation → rate limit check → Supabase insert →
 * rate limit record → structured response.
 *
 * All functions return a consistent shape:
 *   { success: true,  data: {...} }
 *   { success: false, error: string, errors?: Record<string, string> }
 *
 * NO UI code here. Callers decide what to show the user.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { supabase, isSupabaseConfigured } from './supabase';
import {
  contactFormSchema,
  franchiseInquirySchema,
  brandApplicationSchema,
  jobApplicationSchema,
  newsletterSchema,
  chatbotBrandSchema,
  chatbotInvestorSchema,
  validate,
} from './validation';
import {
  checkRateLimit,
  recordSubmission,
  RATE_LIMIT_KEYS,
} from './rateLimiter';

// ── Internal helper ───────────────────────────────────────────────────────────

/**
 * Strips undefined/empty-string values so Supabase doesn't store empty strings
 * in optional columns.
 */
function cleanPayload(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== '')
  );
}

/**
 * Shared insert wrapper — handles the Supabase call and maps errors.
 */
async function insertRow(table, payload) {
  if (!isSupabaseConfigured()) {
    // Dev mode: log the payload and return a mock success so the UI works
    // without a real Supabase project during development.
    console.info(`[iFranchise DEV] Would insert into "${table}":`, payload);
    return { success: true, data: { id: 'dev-mock-id', ...payload } };
  }

  const { data, error } = await supabase
    .from(table)
    .insert([cleanPayload(payload)])
    .select('id, created_at')
    .single();

  if (error) {
    console.error(`[iFranchise] Supabase insert error (${table}):`, error);
    return {
      success: false,
      error: 'Something went wrong. Please try again or contact us directly.',
    };
  }

  return { success: true, data };
}

// ─────────────────────────────────────────────────────────────────────────────
// SUBMISSION 1 — Contact Page General Inquiry
// Table: leads
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @param {object} formData - Raw form state from ContactPage
 * @returns {Promise<{ success: boolean, data?: object, error?: string, errors?: object }>}
 */
export async function submitContactForm(formData) {
  // 1. Rate limit
  const rl = checkRateLimit(RATE_LIMIT_KEYS.CONTACT, 30_000, 5);
  if (!rl.allowed) return { success: false, error: rl.reason };

  // 2. Validate
  const validation = validate(contactFormSchema, formData);
  if (!validation.success) return { success: false, error: 'Please fix the errors below.', errors: validation.errors };

  // 3. Build payload
  const payload = {
    full_name:      validation.data.fullName,
    contact_number: validation.data.contactNumber,
    email:          validation.data.email,
    website:        validation.data.website || null,
    company:        validation.data.company || null,
    message:        validation.data.message,
    source_page:    'contact',
    status:         'new',
  };

  // 4. Insert
  const result = await insertRow('leads', payload);
  if (result.success) recordSubmission(RATE_LIMIT_KEYS.CONTACT);
  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// SUBMISSION 2 — Floating Franchise Strategist Modal
// Table: franchise_inquiries
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @param {object} formData - Raw form state from FloatingContactCTA
 * @param {string} franchiseName - Passed as prop to the component
 * @returns {Promise<{ success: boolean, data?: object, error?: string, errors?: object }>}
 */
export async function submitFranchiseInquiry(formData, franchiseName = '') {
  const rl = checkRateLimit(RATE_LIMIT_KEYS.FRANCHISE_INQUIRY, 30_000, 5);
  if (!rl.allowed) return { success: false, error: rl.reason };

  const validation = validate(franchiseInquirySchema, { ...formData, franchiseName });
  if (!validation.success) return { success: false, error: 'Please fix the errors below.', errors: validation.errors };

  const payload = {
    first_name:       validation.data.firstName,
    last_name:        validation.data.lastName,
    phone:            validation.data.phone,
    email:            validation.data.email,
    investment_range: validation.data.investmentRange,
    state:            validation.data.state,
    city:             validation.data.city,
    website:          validation.data.website || null,
    message:          validation.data.message || null,
    franchise_name:   franchiseName || null,
    status:           'new',
  };

  const result = await insertRow('franchise_inquiries', payload);
  if (result.success) recordSubmission(RATE_LIMIT_KEYS.FRANCHISE_INQUIRY);
  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// SUBMISSION 3 — Brand Application Form (4-step)
// Table: brand_applications
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @param {object} formState - The full `form` state object from BrandApplicationForm
 * @returns {Promise<{ success: boolean, data?: object, error?: string, errors?: object }>}
 */
export async function submitBrandApplication(formState) {
  const rl = checkRateLimit(RATE_LIMIT_KEYS.BRAND_APPLICATION, 60_000, 3);
  if (!rl.allowed) return { success: false, error: rl.reason };

  const validation = validate(brandApplicationSchema, formState);
  if (!validation.success) return { success: false, error: 'Please complete all required fields.', errors: validation.errors };

  const d = validation.data;
  const payload = {
    brand_name:      d.brandName,
    industry:        d.industry,
    year_founded:    d.founded ? parseInt(d.founded, 10) : null,
    current_outlets: d.outlets ? parseInt(d.outlets, 10) : null,
    franchise_model: d.model,
    has_sops:        d.hasSOPs || null,
    has_docs:        d.hasDocs || null,
    city_goal:       d.cityGoal,
    timeline:        d.timeline,
    budget:          d.budget || null,
    vision:          d.vision || null,
    contact_name:    d.name,
    email:           d.email,
    phone:           d.phone,
    company:         d.company || null,
    status:          'new',
  };

  const result = await insertRow('brand_applications', payload);
  if (result.success) recordSubmission(RATE_LIMIT_KEYS.BRAND_APPLICATION);
  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// SUBMISSION 4 — Job Application
// Table: job_applications
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @param {object} formData - Raw form state from CareerDetailPage ApplicationForm
 * @param {string} roleId   - Role identifier
 * @param {string} roleTitle - Role display name
 * @returns {Promise<{ success: boolean, data?: object, error?: string, errors?: object }>}
 */
export async function submitJobApplication(formData, roleId = '', roleTitle = '') {
  const rl = checkRateLimit(RATE_LIMIT_KEYS.JOB_APPLICATION, 60_000, 3);
  if (!rl.allowed) return { success: false, error: rl.reason };

  const validation = validate(jobApplicationSchema, { ...formData, roleId, roleTitle });
  if (!validation.success) return { success: false, error: 'Please fix the errors below.', errors: validation.errors };

  const d = validation.data;
  const payload = {
    role_id:           d.roleId || null,
    role_title:        d.roleTitle || null,
    full_name:         d.name,
    email:             d.email,
    phone:             d.phone,
    portfolio_url:     d.portfolio || null,
    resume_url:        d.resume,
    linkedin_url:      d.linkedin || null,
    interest_statement: d.interest,
    status:            'new',
  };

  const result = await insertRow('job_applications', payload);
  if (result.success) recordSubmission(RATE_LIMIT_KEYS.JOB_APPLICATION);
  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// SUBMISSION 5 — Newsletter Subscribe
// Table: newsletter_subscribers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @param {string} email
 * @param {string} source - Where the signup came from (e.g. 'blog_detail', 'blog_list')
 * @returns {Promise<{ success: boolean, data?: object, error?: string, errors?: object }>}
 */
export async function submitNewsletterSignup(email, source = 'blog') {
  const rl = checkRateLimit(RATE_LIMIT_KEYS.NEWSLETTER, 60_000, 3);
  if (!rl.allowed) return { success: false, error: rl.reason };

  const validation = validate(newsletterSchema, { email, source });
  if (!validation.success) return { success: false, error: 'Please enter a valid email address.', errors: validation.errors };

  // Upsert — if email already exists, update the source and confirmed status
  if (!isSupabaseConfigured()) {
    console.info('[iFranchise DEV] Would upsert newsletter subscriber:', { email, source });
    return { success: true, data: { id: 'dev-mock-id' } };
  }

  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .upsert(
      [{ email: validation.data.email, source: validation.data.source }],
      { onConflict: 'email', ignoreDuplicates: false }
    )
    .select('id')
    .single();

  if (error) {
    console.error('[iFranchise] Newsletter upsert error:', error);
    return { success: false, error: 'Something went wrong. Please try again.' };
  }

  recordSubmission(RATE_LIMIT_KEYS.NEWSLETTER);
  return { success: true, data };
}

// ─────────────────────────────────────────────────────────────────────────────
// SUBMISSION 6 — Chatbot Session (ExpansionAssistant)
// Table: chatbot_sessions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Submit a completed Brands chatbot flow.
 * @param {object} data - Collected chatbot state
 * @returns {Promise<{ success: boolean, data?: object, error?: string }>}
 */
export async function submitChatbotBrandSession(data) {
  const rl = checkRateLimit(RATE_LIMIT_KEYS.CHATBOT_BRAND, 30_000, 5);
  if (!rl.allowed) return { success: false, error: rl.reason };

  const validation = validate(chatbotBrandSchema, data);
  if (!validation.success) return { success: false, error: 'Incomplete session data.', errors: validation.errors };

  const payload = {
    flow_type:  'brand',
    data_json:  validation.data,
    completed:  true,
  };

  const result = await insertRow('chatbot_sessions', payload);
  if (result.success) recordSubmission(RATE_LIMIT_KEYS.CHATBOT_BRAND);
  return result;
}

/**
 * Submit a completed Investors chatbot flow.
 * @param {object} data - Collected chatbot state
 * @returns {Promise<{ success: boolean, data?: object, error?: string }>}
 */
export async function submitChatbotInvestorSession(data) {
  const rl = checkRateLimit(RATE_LIMIT_KEYS.CHATBOT_INVESTOR, 30_000, 5);
  if (!rl.allowed) return { success: false, error: rl.reason };

  const validation = validate(chatbotInvestorSchema, data);
  if (!validation.success) return { success: false, error: 'Incomplete session data.', errors: validation.errors };

  const payload = {
    flow_type:  'investor',
    data_json:  validation.data,
    completed:  true,
  };

  const result = await insertRow('chatbot_sessions', payload);
  if (result.success) recordSubmission(RATE_LIMIT_KEYS.CHATBOT_INVESTOR);
  return result;
}
