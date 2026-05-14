-- =============================================================================
-- 003_realtime.sql
-- iFranchise Website — Realtime Publication Setup
-- =============================================================================
-- Run AFTER 002_rls_policies.sql
--
-- Enables Supabase Realtime for tables that need live admin notifications.
-- The admin dashboard can subscribe to INSERT events to get instant alerts
-- when new leads, brand applications, or franchise inquiries arrive.
-- =============================================================================

-- Supabase uses a Postgres publication called "supabase_realtime".
-- Add the tables that need realtime support.

-- High-priority: new leads need instant admin notification
ALTER PUBLICATION supabase_realtime ADD TABLE public.leads;
ALTER PUBLICATION supabase_realtime ADD TABLE public.franchise_inquiries;
ALTER PUBLICATION supabase_realtime ADD TABLE public.brand_applications;

-- Lower priority: job applications and chatbot sessions (batch review is fine)
ALTER PUBLICATION supabase_realtime ADD TABLE public.job_applications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chatbot_sessions;

-- Newsletter: not realtime (batch analytics only)
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.newsletter_subscribers;

-- =============================================================================
-- NOTE: Realtime respects RLS.
-- Authenticated admin users will receive events for all rows.
-- Anon users will NOT receive any SELECT events (RLS blocks it).
-- =============================================================================
