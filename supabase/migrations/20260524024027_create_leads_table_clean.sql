/*
  # Create contact_leads table (clean slate)

  New table with a fresh name to avoid any PostgREST plan cache issues
  from previous iterations. Stores the 3 form fields only.

  ## Tables
  - `contact_leads`: name, phone_number, details

  ## Security
  - RLS enabled
  - anon can INSERT only if name and phone_number are non-empty
  - No SELECT policy for anon (data stays private)
*/

CREATE TABLE IF NOT EXISTS public.contact_leads (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  phone_number text NOT NULL,
  details     text,
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon can insert leads"
  ON public.contact_leads
  FOR INSERT
  TO anon
  WITH CHECK (
    name IS NOT NULL AND trim(name) <> '' AND
    phone_number IS NOT NULL AND trim(phone_number) <> ''
  );

NOTIFY pgrst, 'reload schema';
