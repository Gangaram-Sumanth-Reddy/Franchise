-- =============================================================================
-- 001_create_tables.sql
-- iFranchise Website — Core Tables
-- =============================================================================
-- Run this in your Supabase project:
--   Dashboard → SQL Editor → New Query → paste → Run
-- OR use the Supabase CLI:
--   supabase db push
-- =============================================================================

-- Enable UUID generation (already enabled in Supabase by default)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- TABLE 1: leads
-- Source: ContactPage general inquiry form
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.leads (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      TIMESTAMPTZ NOT NULL    DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL    DEFAULT now(),

  -- Contact info
  full_name       TEXT        NOT NULL    CHECK (char_length(full_name) BETWEEN 2 AND 100),
  contact_number  TEXT        NOT NULL    CHECK (char_length(contact_number) BETWEEN 7 AND 20),
  email           TEXT        NOT NULL    CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  website         TEXT                    CHECK (website IS NULL OR char_length(website) <= 500),
  company         TEXT                    CHECK (company IS NULL OR char_length(company) <= 200),
  message         TEXT        NOT NULL    CHECK (char_length(message) BETWEEN 10 AND 2000),

  -- Metadata
  source_page     TEXT        NOT NULL    DEFAULT 'contact',
  status          TEXT        NOT NULL    DEFAULT 'new'
                              CHECK (status IN ('new', 'contacted', 'qualified', 'closed', 'spam')),
  assigned_to     UUID                    REFERENCES auth.users(id) ON DELETE SET NULL,
  notes           TEXT,

  -- Spam / honeypot flag
  is_spam         BOOLEAN     NOT NULL    DEFAULT false
);

-- Index for admin queries
CREATE INDEX IF NOT EXISTS leads_status_idx     ON public.leads (status);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_email_idx      ON public.leads (email);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- TABLE 2: franchise_inquiries
-- Source: FloatingContactCTA modal (franchise details / opportunities pages)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.franchise_inquiries (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at       TIMESTAMPTZ NOT NULL    DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL    DEFAULT now(),

  -- Contact info
  first_name       TEXT        NOT NULL    CHECK (char_length(first_name) BETWEEN 2 AND 100),
  last_name        TEXT        NOT NULL    CHECK (char_length(last_name) BETWEEN 2 AND 100),
  phone            TEXT        NOT NULL    CHECK (char_length(phone) BETWEEN 7 AND 20),
  email            TEXT        NOT NULL    CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),

  -- Investment profile
  investment_range TEXT        NOT NULL,
  state            TEXT        NOT NULL    CHECK (char_length(state) BETWEEN 2 AND 100),
  city             TEXT        NOT NULL    CHECK (char_length(city) BETWEEN 2 AND 100),
  website          TEXT                    CHECK (website IS NULL OR char_length(website) <= 500),
  message          TEXT                    CHECK (message IS NULL OR char_length(message) <= 2000),

  -- Context
  franchise_name   TEXT                    CHECK (franchise_name IS NULL OR char_length(franchise_name) <= 200),
  status           TEXT        NOT NULL    DEFAULT 'new'
                               CHECK (status IN ('new', 'contacted', 'qualified', 'closed', 'spam')),
  assigned_to      UUID                    REFERENCES auth.users(id) ON DELETE SET NULL,
  notes            TEXT,
  is_spam          BOOLEAN     NOT NULL    DEFAULT false
);

CREATE INDEX IF NOT EXISTS franchise_inquiries_status_idx     ON public.franchise_inquiries (status);
CREATE INDEX IF NOT EXISTS franchise_inquiries_created_at_idx ON public.franchise_inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS franchise_inquiries_email_idx      ON public.franchise_inquiries (email);

CREATE TRIGGER franchise_inquiries_updated_at
  BEFORE UPDATE ON public.franchise_inquiries
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- TABLE 3: brand_applications
-- Source: BrandApplicationForm 4-step form (/list-your-brand)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.brand_applications (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at       TIMESTAMPTZ NOT NULL    DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL    DEFAULT now(),

  -- Step 1: Brand info
  brand_name       TEXT        NOT NULL    CHECK (char_length(brand_name) BETWEEN 2 AND 200),
  industry         TEXT        NOT NULL,
  year_founded     SMALLINT                CHECK (year_founded IS NULL OR (year_founded >= 1900 AND year_founded <= 2100)),
  current_outlets  INTEGER                 CHECK (current_outlets IS NULL OR current_outlets >= 0),

  -- Step 2: Readiness
  franchise_model  TEXT        NOT NULL,
  has_sops         TEXT,
  has_docs         TEXT,

  -- Step 3: Growth goals
  city_goal        TEXT        NOT NULL,
  timeline         TEXT        NOT NULL,
  budget           TEXT,
  vision           TEXT                    CHECK (vision IS NULL OR char_length(vision) <= 1000),

  -- Step 4: Contact
  contact_name     TEXT        NOT NULL    CHECK (char_length(contact_name) BETWEEN 2 AND 100),
  email            TEXT        NOT NULL    CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone            TEXT        NOT NULL    CHECK (char_length(phone) BETWEEN 7 AND 20),
  company          TEXT                    CHECK (company IS NULL OR char_length(company) <= 200),

  -- Pipeline
  status           TEXT        NOT NULL    DEFAULT 'new'
                               CHECK (status IN ('new', 'reviewing', 'strategy_call', 'audit', 'proposal', 'onboarded', 'rejected')),
  assigned_to      UUID                    REFERENCES auth.users(id) ON DELETE SET NULL,
  notes            TEXT,
  is_spam          BOOLEAN     NOT NULL    DEFAULT false
);

CREATE INDEX IF NOT EXISTS brand_applications_status_idx     ON public.brand_applications (status);
CREATE INDEX IF NOT EXISTS brand_applications_created_at_idx ON public.brand_applications (created_at DESC);
CREATE INDEX IF NOT EXISTS brand_applications_email_idx      ON public.brand_applications (email);
CREATE INDEX IF NOT EXISTS brand_applications_industry_idx   ON public.brand_applications (industry);

CREATE TRIGGER brand_applications_updated_at
  BEFORE UPDATE ON public.brand_applications
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- TABLE 4: job_applications
-- Source: CareerDetailPage ApplicationForm (/careers/{roleId})
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.job_applications (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at          TIMESTAMPTZ NOT NULL    DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL    DEFAULT now(),

  -- Role context
  role_id             TEXT,
  role_title          TEXT                    CHECK (role_title IS NULL OR char_length(role_title) <= 200),

  -- Applicant info
  full_name           TEXT        NOT NULL    CHECK (char_length(full_name) BETWEEN 2 AND 100),
  email               TEXT        NOT NULL    CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone               TEXT        NOT NULL    CHECK (char_length(phone) BETWEEN 7 AND 20),
  portfolio_url       TEXT                    CHECK (portfolio_url IS NULL OR char_length(portfolio_url) <= 500),
  resume_url          TEXT        NOT NULL    CHECK (char_length(resume_url) <= 500),
  linkedin_url        TEXT                    CHECK (linkedin_url IS NULL OR char_length(linkedin_url) <= 500),
  interest_statement  TEXT        NOT NULL    CHECK (char_length(interest_statement) BETWEEN 20 AND 2000),

  -- Pipeline
  status              TEXT        NOT NULL    DEFAULT 'new'
                                  CHECK (status IN ('new', 'screening', 'interview', 'offer', 'hired', 'rejected')),
  assigned_to         UUID                    REFERENCES auth.users(id) ON DELETE SET NULL,
  notes               TEXT,
  is_spam             BOOLEAN     NOT NULL    DEFAULT false
);

CREATE INDEX IF NOT EXISTS job_applications_status_idx     ON public.job_applications (status);
CREATE INDEX IF NOT EXISTS job_applications_created_at_idx ON public.job_applications (created_at DESC);
CREATE INDEX IF NOT EXISTS job_applications_role_id_idx    ON public.job_applications (role_id);
CREATE INDEX IF NOT EXISTS job_applications_email_idx      ON public.job_applications (email);

CREATE TRIGGER job_applications_updated_at
  BEFORE UPDATE ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- TABLE 5: newsletter_subscribers
-- Source: BlogDetailPage newsletter form
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      TIMESTAMPTZ NOT NULL    DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL    DEFAULT now(),

  email           TEXT        NOT NULL    UNIQUE
                              CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  source          TEXT        NOT NULL    DEFAULT 'blog',
  confirmed       BOOLEAN     NOT NULL    DEFAULT false,
  unsubscribed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS newsletter_email_idx      ON public.newsletter_subscribers (email);
CREATE INDEX IF NOT EXISTS newsletter_confirmed_idx  ON public.newsletter_subscribers (confirmed);

CREATE TRIGGER newsletter_subscribers_updated_at
  BEFORE UPDATE ON public.newsletter_subscribers
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- TABLE 6: chatbot_sessions
-- Source: ExpansionAssistant widget (brand flow + investor flow)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.chatbot_sessions (
  id                   UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at           TIMESTAMPTZ NOT NULL    DEFAULT now(),

  -- Flow identification
  flow_type            TEXT        NOT NULL    CHECK (flow_type IN ('brand', 'investor')),
  data_json            JSONB       NOT NULL    DEFAULT '{}',
  completed            BOOLEAN     NOT NULL    DEFAULT false,

  -- Optional link to a lead created from this session
  converted_to_lead_id UUID                    REFERENCES public.leads(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS chatbot_sessions_flow_type_idx  ON public.chatbot_sessions (flow_type);
CREATE INDEX IF NOT EXISTS chatbot_sessions_created_at_idx ON public.chatbot_sessions (created_at DESC);
CREATE INDEX IF NOT EXISTS chatbot_sessions_completed_idx  ON public.chatbot_sessions (completed);
-- GIN index for querying inside the JSONB data
CREATE INDEX IF NOT EXISTS chatbot_sessions_data_gin_idx   ON public.chatbot_sessions USING GIN (data_json);
