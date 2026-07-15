/*
# Add email and message columns to leads table

1. Changes to existing tables
   - `leads`
     - Add `email` (text, NOT NULL) — the email address submitted in the contact form
     - Add `message` (text, NOT NULL DEFAULT '') — the project details/message submitted in the contact form

2. Security
   - Add INSERT policy for `anon` role so the frontend (using the anon key) can insert leads directly via the REST API
   - This is a single-tenant landing-page form with no sign-in, so anon INSERT is intentional

3. Notes
   - The frontend ContactForm.tsx sends { name, email, phone, message } via POST to /rest/v1/leads
   - Previously the table only had name, phone, details columns — email and message were missing, causing inserts to fail
   - Previously only service_role had INSERT permission — the anon-key frontend was blocked by RLS
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'email'
  ) THEN
    ALTER TABLE leads ADD COLUMN email text NOT NULL DEFAULT '';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'message'
  ) THEN
    ALTER TABLE leads ADD COLUMN message text NOT NULL DEFAULT '';
  END IF;
END $$;

DROP POLICY IF EXISTS "Anon can insert leads" ON leads;
CREATE POLICY "Anon can insert leads"
  ON leads FOR INSERT
  TO anon
  WITH CHECK (true);
