/*
  # Drop and recreate all RLS policies on contact_requests

  The INSERT policy's WITH CHECK expression may be cached/compiled against
  the old table schema (with email column). Dropping and recreating forces
  Postgres to recompile the policy expression against the current clean schema.
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow contact form submissions" ON public.contact_requests;
DROP POLICY IF EXISTS "Authenticated users can read contact requests" ON public.contact_requests;

-- Brief pause to ensure policy cache is invalidated
SELECT pg_sleep(0.1);

-- Recreate INSERT policy fresh
CREATE POLICY "anon can insert contact requests"
  ON public.contact_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Recreate SELECT policy fresh
CREATE POLICY "authenticated can read contact requests"
  ON public.contact_requests
  FOR SELECT
  TO authenticated
  USING (true);

NOTIFY pgrst, 'reload schema';
