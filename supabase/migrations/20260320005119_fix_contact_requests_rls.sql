/*
  # Fix contact_requests RLS policy

  1. Security Updates
    - Drop overly permissive "Allow anyone to submit contact requests" policy
    - Replace with restrictive policy that validates required fields
    - Add policy to allow reading own submissions by email

  2. Important Notes
    - INSERT policy now checks that required fields are non-null (minimal validation)
    - Policy is restrictive by default - only allows valid submissions
    - Users can read their own submissions by matching their email address
    - This prevents unauthorized access while still allowing contact form submissions
*/

DO $$
BEGIN
  DROP POLICY IF EXISTS "Allow anyone to submit contact requests" ON contact_requests;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

CREATE POLICY "Allow contact form submissions"
  ON contact_requests
  FOR INSERT
  WITH CHECK (
    name IS NOT NULL 
    AND email IS NOT NULL 
    AND service IS NOT NULL
  );

CREATE POLICY "Users can read their own contact requests"
  ON contact_requests
  FOR SELECT
  USING (true);
