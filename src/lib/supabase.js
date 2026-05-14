/**
 * supabase.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Singleton Supabase client.
 * Import this wherever you need database access — never instantiate a second
 * client directly.
 *
 * Usage:
 *   import { supabase } from '@/lib/supabase';
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ── Guard: fail loudly in development if env vars are missing ─────────────────
if (!SUPABASE_URL || SUPABASE_URL === 'https://your-project-id.supabase.co') {
  console.warn(
    '[iFranchise] VITE_SUPABASE_URL is not configured.\n' +
    'Copy .env.example → .env and fill in your Supabase project URL.'
  );
}

if (!SUPABASE_ANON_KEY || SUPABASE_ANON_KEY === 'your-anon-public-key-here') {
  console.warn(
    '[iFranchise] VITE_SUPABASE_ANON_KEY is not configured.\n' +
    'Copy .env.example → .env and fill in your Supabase anon key.'
  );
}

// ── Client options ────────────────────────────────────────────────────────────
const clientOptions = {
  auth: {
    // Disable auto-refresh for a public-facing site with no user auth
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
  global: {
    headers: {
      'x-application-name': 'ifranchise-website',
    },
  },
};

// ── Singleton export ──────────────────────────────────────────────────────────
export const supabase = createClient(
  SUPABASE_URL || 'https://placeholder.supabase.co',
  SUPABASE_ANON_KEY || 'placeholder',
  clientOptions
);

// ── Environment helper ────────────────────────────────────────────────────────
export const isSupabaseConfigured = () =>
  Boolean(
    SUPABASE_URL &&
    SUPABASE_URL !== 'https://your-project-id.supabase.co' &&
    SUPABASE_ANON_KEY &&
    SUPABASE_ANON_KEY !== 'your-anon-public-key-here'
  );
