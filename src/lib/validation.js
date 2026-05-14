/**
 * validation.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Zod schemas for every form on the iFranchise website.
 * These schemas are the single source of truth for validation — used by both
 * the submission helpers and (optionally) the frontend for inline feedback.
 *
 * No UI code here. Pure data validation only.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { z } from 'zod';

// ── Reusable field primitives ─────────────────────────────────────────────────

const nameField = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must be under 100 characters')
  .trim();

const emailField = z
  .string()
  .email('Please enter a valid email address')
  .max(254, 'Email address is too long')
  .toLowerCase()
  .trim();

const phoneField = z
  .string()
  .min(7, 'Phone number is too short')
  .max(20, 'Phone number is too long')
  .regex(
    /^[\+]?[0-9\s\-\(\)]{7,20}$/,
    'Please enter a valid phone number'
  )
  .trim();

const urlField = z
  .string()
  .max(500, 'URL is too long')
  .refine(
    (v) => !v || v.startsWith('http://') || v.startsWith('https://'),
    'Please enter a valid URL (include https://)'
  )
  .optional()
  .or(z.literal(''));

const messageField = z
  .string()
  .min(10, 'Message must be at least 10 characters')
  .max(2000, 'Message must be under 2000 characters')
  .trim();

// ── Investment range enum (shared across forms) ───────────────────────────────
const investmentRangeEnum = z.enum([
  'under-25l',
  '25l-50l',
  '50l-1cr',
  '1cr-5cr',
  '5cr+',
  // Chatbot / BrandApplicationForm variants
  'Under ₹25L',
  '₹25L–₹50L',
  '₹50L–₹1Cr',
  '₹1Cr–₹5Cr',
  '₹5Cr+',
  '₹1Cr+',
  'Under Rs.25L',
  'Rs.25L - Rs.50L',
  'Rs.50L - Rs.1Cr',
  'Rs.1Cr - Rs.5Cr',
  'Rs.5Cr+',
], { errorMap: () => ({ message: 'Please select an investment range' }) });

// ── Industry enum ─────────────────────────────────────────────────────────────
const industryEnum = z.enum([
  'Food & Beverage',
  'Health & Wellness',
  'Education',
  'Retail',
  'Technology',
  'Home Services',
  'Entertainment',
  'Other',
], { errorMap: () => ({ message: 'Please select an industry' }) });

// ── Franchise model enum ──────────────────────────────────────────────────────
const franchiseModelEnum = z.enum([
  'FOFO - Franchise Owned & Operated',
  'FOCO - Franchise Owned, Company Operated',
  'FICO - Franchise Invested, Company Operated',
  'Not Sure Yet',
], { errorMap: () => ({ message: 'Please select a franchise model' }) });

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA 1 — Contact Page General Inquiry
// Table: leads
// ─────────────────────────────────────────────────────────────────────────────
export const contactFormSchema = z.object({
  fullName:      nameField,
  contactNumber: phoneField,
  email:         emailField,
  website:       urlField,
  company:       z.string().max(200).trim().optional().or(z.literal('')),
  message:       messageField,
});

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA 2 — Floating Franchise Strategist Modal
// Table: franchise_inquiries
// ─────────────────────────────────────────────────────────────────────────────
export const franchiseInquirySchema = z.object({
  firstName:       nameField,
  lastName:        nameField,
  phone:           phoneField,
  email:           emailField,
  investmentRange: investmentRangeEnum,
  state:           z.string().min(2, 'State is required').max(100).trim(),
  city:            z.string().min(2, 'City is required').max(100).trim(),
  website:         urlField,
  message:         z.string().max(2000).trim().optional().or(z.literal('')),
  // Injected by the component — not a user input
  franchiseName:   z.string().max(200).optional(),
});

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA 3 — Brand Application Form (4-step)
// Table: brand_applications
// ─────────────────────────────────────────────────────────────────────────────
export const brandApplicationSchema = z.object({
  // Step 1 — Your Brand
  brandName:  z.string().min(2, 'Brand name is required').max(200).trim(),
  industry:   industryEnum,
  founded:    z
    .string()
    .optional()
    .refine(
      (v) => !v || (/^\d{4}$/.test(v) && +v >= 1900 && +v <= new Date().getFullYear()),
      'Enter a valid 4-digit year'
    ),
  outlets:    z
    .string()
    .optional()
    .refine(
      (v) => !v || (/^\d+$/.test(v) && +v >= 0 && +v <= 100000),
      'Enter a valid number of outlets'
    ),

  // Step 2 — Readiness
  model:    franchiseModelEnum,
  hasSOPs:  z.string().optional(),
  hasDocs:  z.string().optional(),

  // Step 3 — Growth Goals
  cityGoal:  z.string().min(1, 'Please select a city expansion target'),
  timeline:  z.string().min(1, 'Please select an expansion timeline'),
  budget:    z.string().optional(),
  vision:    z.string().max(1000).trim().optional().or(z.literal('')),

  // Step 4 — Contact
  name:    nameField,
  email:   emailField,
  phone:   phoneField,
  company: z.string().max(200).trim().optional().or(z.literal('')),
});

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA 4 — Job Application Form
// Table: job_applications
// ─────────────────────────────────────────────────────────────────────────────
export const jobApplicationSchema = z.object({
  name:      nameField,
  email:     emailField,
  phone:     phoneField,
  portfolio: urlField,
  resume:    z
    .string()
    .url('Please enter a valid Google Drive URL')
    .refine(
      (v) => v.includes('drive.google.com') || v.includes('docs.google.com'),
      'Please use a Google Drive link for your resume'
    ),
  linkedin:  urlField,
  interest:  z
    .string()
    .min(20, 'Please write at least 20 characters about your interest')
    .max(2000, 'Response must be under 2000 characters')
    .trim(),
  // Injected by the component
  roleId:    z.string().optional(),
  roleTitle: z.string().max(200).optional(),
});

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA 5 — Newsletter Subscribe
// Table: newsletter_subscribers
// ─────────────────────────────────────────────────────────────────────────────
export const newsletterSchema = z.object({
  email:  emailField,
  source: z.string().max(100).optional().default('blog'),
});

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA 6 — Chatbot Session (ExpansionAssistant)
// Table: chatbot_sessions
// ─────────────────────────────────────────────────────────────────────────────
export const chatbotBrandSchema = z.object({
  brandName:    z.string().min(1).max(200).trim(),
  industry:     z.string().optional(),
  locations:    z.string().optional(),
  cities:       z.string().optional(),
  investment:   z.string().optional(),
  contactName:  nameField,
  contactPhone: phoneField,
});

export const chatbotInvestorSchema = z.object({
  industries: z.array(z.string()).min(1, 'Select at least one industry'),
  budget:     z.string().optional(),
  cities:     z.string().optional(),
  roi:        z.string().optional(),
  timeline:   z.string().optional(),
});

// ─────────────────────────────────────────────────────────────────────────────
// Utility: parse and return typed errors
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Validates data against a Zod schema.
 * Returns { success: true, data } or { success: false, errors: Record<string, string> }
 *
 * @template T
 * @param {z.ZodSchema<T>} schema
 * @param {unknown} data
 * @returns {{ success: true, data: T } | { success: false, errors: Record<string, string> }}
 */
export function validate(schema, data) {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const errors = {};
  for (const issue of result.error.issues) {
    const key = issue.path.join('.');
    if (!errors[key]) errors[key] = issue.message;
  }
  return { success: false, errors };
}
