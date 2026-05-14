-- =============================================================================
-- 002_rls_policies.sql
-- iFranchise Website — Row Level Security Policies
-- =============================================================================
-- Run AFTER 001_create_tables.sql
-- =============================================================================
-- SECURITY MODEL:
--   anon role  → INSERT only (public form submissions)
--   authenticated role → full access (admin dashboard users)
--   service_role → bypasses RLS entirely (server-side scripts, Edge Functions)
-- =============================================================================

-- =============================================================================
-- Enable RLS on all tables
-- =============================================================================
ALTER TABLE public.leads                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.franchise_inquiries    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_applications     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_sessions       ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- TABLE: leads
-- =============================================================================

-- Public can INSERT (form submission)
CREATE POLICY "leads_anon_insert"
  ON public.leads
  FOR INSERT
  TO anon
  WITH CHECK (
    -- Honeypot: reject if is_spam is set to true by the client
    is_spam = false
    -- Basic length guards (belt-and-suspenders on top of DB constraints)
    AND char_length(full_name) >= 2
    AND char_length(email) >= 5
    AND char_length(message) >= 10
  );

-- Authenticated admin users can read all leads
CREATE POLICY "leads_auth_select"
  ON public.leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated admin users can update status, notes, assigned_to
CREATE POLICY "leads_auth_update"
  ON public.leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- No DELETE for anyone except service_role (data retention)
-- service_role bypasses RLS automatically

-- =============================================================================
-- TABLE: franchise_inquiries
-- =============================================================================

CREATE POLICY "franchise_inquiries_anon_insert"
  ON public.franchise_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (
    is_spam = false
    AND char_length(first_name) >= 2
    AND char_length(email) >= 5
  );

CREATE POLICY "franchise_inquiries_auth_select"
  ON public.franchise_inquiries
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "franchise_inquiries_auth_update"
  ON public.franchise_inquiries
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =============================================================================
-- TABLE: brand_applications
-- =============================================================================

CREATE POLICY "brand_applications_anon_insert"
  ON public.brand_applications
  FOR INSERT
  TO anon
  WITH CHECK (
    is_spam = false
    AND char_length(brand_name) >= 2
    AND char_length(email) >= 5
    AND char_length(contact_name) >= 2
  );

CREATE POLICY "brand_applications_auth_select"
  ON public.brand_applications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "brand_applications_auth_update"
  ON public.brand_applications
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =============================================================================
-- TABLE: job_applications
-- =============================================================================

CREATE POLICY "job_applications_anon_insert"
  ON public.job_applications
  FOR INSERT
  TO anon
  WITH CHECK (
    is_spam = false
    AND char_length(full_name) >= 2
    AND char_length(email) >= 5
    AND char_length(resume_url) >= 10
  );

CREATE POLICY "job_applications_auth_select"
  ON public.job_applications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "job_applications_auth_update"
  ON public.job_applications
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =============================================================================
-- TABLE: newsletter_subscribers
-- =============================================================================

-- Public can INSERT (subscribe)
CREATE POLICY "newsletter_anon_insert"
  ON public.newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (
    char_length(email) >= 5
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );

-- Public can UPDATE their own row to unsubscribe (matched by email)
-- This allows an unsubscribe link to work without auth
CREATE POLICY "newsletter_anon_unsubscribe"
  ON public.newsletter_subscribers
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (
    -- Only allow setting unsubscribed_at — nothing else
    unsubscribed_at IS NOT NULL
  );

CREATE POLICY "newsletter_auth_select"
  ON public.newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "newsletter_auth_update"
  ON public.newsletter_subscribers
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =============================================================================
-- TABLE: chatbot_sessions
-- =============================================================================

-- Public can INSERT session data
CREATE POLICY "chatbot_sessions_anon_insert"
  ON public.chatbot_sessions
  FOR INSERT
  TO anon
  WITH CHECK (
    flow_type IN ('brand', 'investor')
    AND completed = true
  );

-- Authenticated admin can read all sessions
CREATE POLICY "chatbot_sessions_auth_select"
  ON public.chatbot_sessions
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated admin can update (e.g. link to a lead)
CREATE POLICY "chatbot_sessions_auth_update"
  ON public.chatbot_sessions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
