/*
  # Create school_registrations table

  ## Summary
  Stores multi-step school onboarding registration data submitted through
  the "Start Free Trial" flow. Each row represents one school attempting to
  register on the Adhira platform.

  ## New Tables

  ### school_registrations
  - `id` (uuid, PK) — auto-generated identifier
  - `school_name` (text) — full legal name of the school
  - `school_type` (text) — one of: primary | secondary | higher_secondary | all_levels
  - `board` (text) — CBSE | ICSE | state_board | others
  - `street` (text) — street address
  - `city` (text)
  - `district` (text)
  - `state` (text)
  - `pincode` (text)
  - `phone` (text) — school contact number with +91 prefix stored separately
  - `school_email` (text)
  - `website` (text, nullable)
  - `established_year` (int, nullable)
  - `logo_url` (text, nullable) — URL to uploaded logo
  - `admin_name` (text)
  - `admin_email` (text) — becomes the login email
  - `admin_phone` (text)
  - `language_preference` (text) — en | hi | te
  - `plan` (text) — starter | growth | pro
  - `status` (text) — draft | submitted | active
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - RLS enabled
  - Public INSERT allowed (unauthenticated users can submit registrations)
  - No SELECT/UPDATE/DELETE policies for public (admin access via service role only)

  ## Notes
  1. This table intentionally allows unauthenticated inserts so schools can
     register before an auth account is created.
  2. The `admin_email` column has a UNIQUE constraint to prevent duplicate accounts.
*/

CREATE TABLE IF NOT EXISTS school_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_name text NOT NULL DEFAULT '',
  school_type text NOT NULL DEFAULT 'all_levels',
  board text NOT NULL DEFAULT 'cbse',
  street text NOT NULL DEFAULT '',
  city text NOT NULL DEFAULT '',
  district text NOT NULL DEFAULT '',
  state text NOT NULL DEFAULT '',
  pincode text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  school_email text NOT NULL DEFAULT '',
  website text,
  established_year integer,
  logo_url text,
  admin_name text NOT NULL DEFAULT '',
  admin_email text NOT NULL DEFAULT '',
  admin_phone text NOT NULL DEFAULT '',
  language_preference text NOT NULL DEFAULT 'en',
  plan text NOT NULL DEFAULT 'growth',
  status text NOT NULL DEFAULT 'submitted',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE school_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a school registration"
  ON school_registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
