/*
  # Simplify contact_requests table

  ## Summary
  Updates the contact_requests table to match the new single-step form
  that collects only: name, phone_number, and details.

  ## Changes
  ### Policies
  - Drop old INSERT policy that referenced email and service columns
  - Recreate INSERT policy checking only name and phone_number (both required)
  - Drop old overly-permissive SELECT policy (USING true)
  - Recreate SELECT policy restricted to authenticated users only

  ### Columns removed
  - email, service, message, best_day_to_call, best_time_to_reach

  ### Columns renamed
  - phone → phone_number

  ### Columns added
  - details (text, nullable) — "Anything You'd Like to Share?" field

  ## Security
  - RLS remains enabled
  - INSERT allowed for anonymous users when name and phone_number are present
  - SELECT restricted to authenticated users (admin access)
*/

-- Drop old policies that reference columns being removed
DROP POLICY IF EXISTS "Allow contact form submissions" ON contact_requests;
DROP POLICY IF EXISTS "Users can read their own contact requests" ON contact_requests;

-- Drop unused columns
ALTER TABLE contact_requests
  DROP COLUMN IF EXISTS email,
  DROP COLUMN IF EXISTS service,
  DROP COLUMN IF EXISTS message,
  DROP COLUMN IF EXISTS best_day_to_call,
  DROP COLUMN IF EXISTS best_time_to_reach;

-- Rename phone → phone_number
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_requests' AND column_name = 'phone'
  ) THEN
    ALTER TABLE contact_requests RENAME COLUMN phone TO phone_number;
  END IF;
END $$;

-- Add details column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_requests' AND column_name = 'details'
  ) THEN
    ALTER TABLE contact_requests ADD COLUMN details text;
  END IF;
END $$;

-- Recreate INSERT policy: anon users can submit when name + phone_number provided
CREATE POLICY "Allow contact form submissions"
  ON contact_requests
  FOR INSERT
  TO anon
  WITH CHECK (
    (name IS NOT NULL) AND (phone_number IS NOT NULL)
  );

-- Recreate SELECT policy: only authenticated users (admin) can read submissions
CREATE POLICY "Authenticated users can read contact requests"
  ON contact_requests
  FOR SELECT
  TO authenticated
  USING (true);
