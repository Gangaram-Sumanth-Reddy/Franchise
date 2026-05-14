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

const SUPABASE_URL     = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ── Startup diagnostics — catch misconfiguration before any request fires ─────
if (!SUPABASE_URL || SUPABASE_URL === 'https://your-project-id.supabase.co') {
  console.warn(
    '[iFranchise] VITE_SUPABASE_URL is not configured.\n' +
    'Copy .env.example → .env and set your Supabase project URL.\n' +
    'Correct format: https://xxxxxxxxxxxxxxxxxxxx.supabase.co  (no /rest/v1/ suffix)'
  );
}

if (SUPABASE_URL && SUPABASE_URL.includes('/rest/v1')) {
  console.error(
    '[iFranchise] VITE_SUPABASE_URL must NOT include /rest/v1/\n' +
    'Correct format: https://xxxxxxxxxxxxxxxxxxxx.supabase.co\n' +
    'Current value:  ' + SUPABASE_URL
  );
}

if (!SUPABASE_ANON_KEY || SUPABASE_ANON_KEY === 'your-anon-public-key-here') {
  console.warn(
    '[iFranchise] VITE_SUPABASE_ANON_KEY is not configured.\n' +
    'Use the "anon public" key from: supabase.com/dashboard → Project Settings → API\n' +
    'It starts with eyJ... (a JWT token), NOT sb_publishable_...'
  );
}

if (SUPABASE_ANON_KEY && SUPABASE_ANON_KEY.startsWith('sb_publishable_')) {
  console.error(
    '[iFranchise] VITE_SUPABASE_ANON_KEY is a publishable key, not the anon JWT.\n' +
    'Go to: supabase.com/dashboard → Project Settings → API → "anon public"\n' +
    'The correct key starts with eyJ...'
  );
}

// ── Client options ────────────────────────────────────────────────────────────
const clientOptions = {
  auth: {
    autoRefreshToken: false,
    persistSession:   false,
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
  SUPABASE_URL     || 'https://placeholder.supabase.co',
  SUPABASE_ANON_KEY || 'placeholder',
  clientOptions
);

// ── Configuration guard ───────────────────────────────────────────────────────
// Returns true only when both values look genuinely usable.
export const isSupabaseConfigured = () => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY)                    return false;
  if (SUPABASE_URL === 'https://your-project-id.supabase.co') return false;
  if (SUPABASE_ANON_KEY === 'your-anon-public-key-here')      return false;
  // Reject the /rest/v1/ suffix mistake
  if (SUPABASE_URL.includes('/rest/v1'))                      return false;
  // Reject the publishable key mistake — needs the JWT anon key
  if (SUPABASE_ANON_KEY.startsWith('sb_publishable_'))        return false;
  return true;
};
