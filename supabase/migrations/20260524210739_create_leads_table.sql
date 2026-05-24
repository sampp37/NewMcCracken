/*
  # Create leads table

  1. New Tables
    - `leads`
      - `id` (uuid, primary key, auto-generated)
      - `name` (text, not null)
      - `phone` (text, not null)
      - `details` (text, default empty string)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `leads` table
    - Add policy for service role to insert leads (edge function uses service role key)
    - Public (anon) cannot read or write leads — only the edge function (service role) can insert

  3. Notes
    - This table captures all form submissions from the landing page
    - The edge function uses SUPABASE_SERVICE_ROLE_KEY to bypass RLS for inserts
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  details text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can insert leads"
  ON leads FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can select leads"
  ON leads FOR SELECT
  TO service_role
  USING (true);
