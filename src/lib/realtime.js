/**
 * realtime.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Supabase Realtime subscription helpers.
 * Used by an admin dashboard to receive live INSERT notifications when new
 * leads, brand applications, or franchise inquiries arrive.
 *
 * These helpers are NOT used by the public-facing website forms.
 * They are ready to be imported by a future admin panel.
 *
 * Usage example:
 *   import { subscribeToNewLeads } from '@/lib/realtime';
 *   const unsub = subscribeToNewLeads((row) => console.log('New lead:', row));
 *   // later: unsub();
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { supabase } from './supabase';

// ── Internal helper ───────────────────────────────────────────────────────────

/**
 * Creates a Supabase Realtime channel that listens for INSERT events on a table.
 * Returns an unsubscribe function.
 *
 * @param {string}   table      - Supabase table name
 * @param {string}   channelId  - Unique channel identifier
 * @param {Function} onInsert   - Callback receiving the new row payload
 * @returns {Function} unsubscribe
 */
function subscribeToInserts(table, channelId, onInsert) {
  const channel = supabase
    .channel(channelId)
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table },
      (payload) => {
        if (typeof onInsert === 'function') {
          onInsert(payload.new);
        }
      }
    )
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.info(`[iFranchise Realtime] Subscribed to ${table} inserts`);
      }
      if (status === 'CHANNEL_ERROR') {
        console.error(`[iFranchise Realtime] Channel error on ${table}`);
      }
    });

  // Return cleanup function
  return () => {
    supabase.removeChannel(channel);
  };
}

// ── Public subscription helpers ───────────────────────────────────────────────

/**
 * Subscribe to new general contact leads.
 * @param {(row: object) => void} onInsert
 * @returns {Function} unsubscribe
 */
export function subscribeToNewLeads(onInsert) {
  return subscribeToInserts('leads', 'realtime:leads', onInsert);
}

/**
 * Subscribe to new franchise inquiry submissions.
 * @param {(row: object) => void} onInsert
 * @returns {Function} unsubscribe
 */
export function subscribeToFranchiseInquiries(onInsert) {
  return subscribeToInserts(
    'franchise_inquiries',
    'realtime:franchise_inquiries',
    onInsert
  );
}

/**
 * Subscribe to new brand applications.
 * @param {(row: object) => void} onInsert
 * @returns {Function} unsubscribe
 */
export function subscribeToBrandApplications(onInsert) {
  return subscribeToInserts(
    'brand_applications',
    'realtime:brand_applications',
    onInsert
  );
}

/**
 * Subscribe to new job applications.
 * @param {(row: object) => void} onInsert
 * @returns {Function} unsubscribe
 */
export function subscribeToJobApplications(onInsert) {
  return subscribeToInserts(
    'job_applications',
    'realtime:job_applications',
    onInsert
  );
}

/**
 * Subscribe to new chatbot sessions.
 * @param {(row: object) => void} onInsert
 * @returns {Function} unsubscribe
 */
export function subscribeToChatbotSessions(onInsert) {
  return subscribeToInserts(
    'chatbot_sessions',
    'realtime:chatbot_sessions',
    onInsert
  );
}

/**
 * Subscribe to ALL high-priority lead tables at once.
 * Useful for a unified admin notification feed.
 *
 * @param {(table: string, row: object) => void} onAnyInsert
 * @returns {Function} unsubscribe (removes all channels)
 */
export function subscribeToAllLeads(onAnyInsert) {
  const unsubs = [
    subscribeToNewLeads((row) => onAnyInsert('leads', row)),
    subscribeToFranchiseInquiries((row) => onAnyInsert('franchise_inquiries', row)),
    subscribeToBrandApplications((row) => onAnyInsert('brand_applications', row)),
  ];

  return () => unsubs.forEach((fn) => fn());
}
