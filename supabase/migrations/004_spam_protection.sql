-- =============================================================================
-- 004_spam_protection.sql
-- iFranchise Website — Server-side Spam & Rate Limiting
-- =============================================================================
-- Run AFTER 003_realtime.sql
--
-- Adds a Postgres function that can be called from an Edge Function or
-- directly to enforce server-side rate limiting per IP / email.
-- =============================================================================

-- =============================================================================
-- Function: check_submission_rate_limit
-- Checks how many submissions a given email has made in the last N minutes.
-- Returns TRUE if the submission is allowed, FALSE if rate limited.
-- =============================================================================
CREATE OR REPLACE FUNCTION public.check_submission_rate_limit(
  p_email     TEXT,
  p_table     TEXT,   -- 'leads' | 'franchise_inquiries' | 'brand_applications' | 'job_applications'
  p_window_minutes INTEGER DEFAULT 60,
  p_max_count      INTEGER DEFAULT 5
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER   -- runs as the function owner, not the caller
AS $$
DECLARE
  v_count INTEGER;
  v_query TEXT;
BEGIN
  -- Whitelist allowed table names to prevent SQL injection
  IF p_table NOT IN ('leads', 'franchise_inquiries', 'brand_applications', 'job_applications') THEN
    RAISE EXCEPTION 'Invalid table name: %', p_table;
  END IF;

  v_query := format(
    'SELECT COUNT(*) FROM public.%I WHERE email = $1 AND created_at > now() - ($2 * interval ''1 minute'')',
    p_table
  );

  EXECUTE v_query INTO v_count USING p_email, p_window_minutes;

  RETURN v_count < p_max_count;
END;
$$;

-- Grant execute to anon so it can be called from the client before insert
-- (optional — you can also call this from an Edge Function only)
GRANT EXECUTE ON FUNCTION public.check_submission_rate_limit TO anon;
GRANT EXECUTE ON FUNCTION public.check_submission_rate_limit TO authenticated;

-- =============================================================================
-- Function: mark_as_spam
-- Admin utility to mark a row as spam across any lead table.
-- =============================================================================
CREATE OR REPLACE FUNCTION public.mark_as_spam(
  p_table TEXT,
  p_id    UUID
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF p_table NOT IN ('leads', 'franchise_inquiries', 'brand_applications', 'job_applications') THEN
    RAISE EXCEPTION 'Invalid table name: %', p_table;
  END IF;

  EXECUTE format(
    'UPDATE public.%I SET is_spam = true, status = ''spam'', updated_at = now() WHERE id = $1',
    p_table
  ) USING p_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.mark_as_spam TO authenticated;

-- =============================================================================
-- View: recent_leads_summary
-- Convenience view for admin dashboard — aggregates all lead types.
-- =============================================================================
CREATE OR REPLACE VIEW public.recent_leads_summary AS
  SELECT
    id,
    created_at,
    'contact'          AS lead_type,
    full_name          AS name,
    email,
    status,
    is_spam
  FROM public.leads

  UNION ALL

  SELECT
    id,
    created_at,
    'franchise_inquiry' AS lead_type,
    first_name || ' ' || last_name AS name,
    email,
    status,
    is_spam
  FROM public.franchise_inquiries

  UNION ALL

  SELECT
    id,
    created_at,
    'brand_application' AS lead_type,
    contact_name        AS name,
    email,
    status,
    is_spam
  FROM public.brand_applications

  ORDER BY created_at DESC;

-- Only authenticated users can query this view
GRANT SELECT ON public.recent_leads_summary TO authenticated;
