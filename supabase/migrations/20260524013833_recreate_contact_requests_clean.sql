/*
  # Recreate contact_requests table from scratch

  ## Problem
  PostgREST's schema cache has a stale view of the contact_requests table
  that still includes dropped columns (email, service, message, etc.) at 
  their original attnum positions. The error "record new has no field email"
  comes from PostgREST validating INSERT payloads against this stale cache,
  which still marks email as NOT NULL.

  ## Solution
  Rename the current table, create a brand-new clean table with only the
  required columns, copy existing data, then drop the old table.
  This gives PostgREST a completely fresh table OID with clean attnum 
  sequence (1,2,3,4,5) and no dropped-column artifacts.

  ## New table columns
  - id (uuid, primary key)
  - name (text, not null)
  - phone_number (text, not null)
  - details (text, nullable)
  - created_at (timestamptz, default now())

  ## Security
  - RLS enabled
  - INSERT policy for anon with name + phone_number check
  - SELECT policy for authenticated users only
*/

-- Step 1: Rename old table to backup
ALTER TABLE IF EXISTS public.contact_requests RENAME TO contact_requests_old;

-- Step 2: Create fresh clean table
CREATE TABLE public.contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone_number text NOT NULL,
  details text,
  created_at timestamptz DEFAULT now()
);

-- Step 3: Copy existing data
INSERT INTO public.contact_requests (id, name, phone_number, details, created_at)
SELECT id, name, COALESCE(phone_number, ''), details, COALESCE(created_at, now())
FROM public.contact_requests_old;

-- Step 4: Enable RLS
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Step 5: Recreate policies
CREATE POLICY "Allow contact form submissions"
  ON public.contact_requests
  FOR INSERT
  TO anon
  WITH CHECK (
    (name IS NOT NULL) AND (phone_number IS NOT NULL)
  );

CREATE POLICY "Authenticated users can read contact requests"
  ON public.contact_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Step 6: Drop old table
DROP TABLE IF EXISTS public.contact_requests_old;

-- Step 7: Notify PostgREST to reload with fresh schema
NOTIFY pgrst, 'reload schema';
