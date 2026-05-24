/*
  # Fix security issues on contact_submissions

  ## Changes

  ### 1. Tighten RLS INSERT policy
  Replace the always-true WITH CHECK on the anon INSERT policy with a proper
  check that name and phone_number are non-null and non-empty strings.
  This prevents anon from inserting garbage rows.

  ### 2. Switch submit_contact_request to SECURITY INVOKER
  The function was SECURITY DEFINER (runs as postgres, bypasses RLS).
  Switching to SECURITY INVOKER means it runs as the calling role (anon),
  so the RLS policy is enforced on the INSERT inside the function.

  ### 3. Revoke authenticated EXECUTE
  The authenticated role was granted execute unnecessarily. Revoke it.
  Only anon needs to call this function (public contact form).
*/

-- 1. Drop the always-true INSERT policy and replace with proper validation
DROP POLICY IF EXISTS "anon can insert contact requests" ON public.contact_submissions;

CREATE POLICY "anon can insert contact requests"
  ON public.contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (
    name IS NOT NULL AND trim(name) <> '' AND
    phone_number IS NOT NULL AND trim(phone_number) <> ''
  );

-- 2. Recreate function as SECURITY INVOKER so RLS applies
DROP FUNCTION IF EXISTS public.submit_contact_request(text, text, text);

CREATE OR REPLACE FUNCTION public.submit_contact_request(
  p_name    text,
  p_phone   text,
  p_details text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF p_name IS NULL OR trim(p_name) = '' THEN
    RAISE EXCEPTION 'Name is required';
  END IF;
  IF p_phone IS NULL OR trim(p_phone) = '' THEN
    RAISE EXCEPTION 'Phone number is required';
  END IF;
  INSERT INTO public.contact_submissions (name, phone_number, details)
  VALUES (trim(p_name), trim(p_phone), NULLIF(trim(p_details), ''));
END;
$$;

-- 3. Grant EXECUTE only to anon; revoke from authenticated
GRANT EXECUTE ON FUNCTION public.submit_contact_request(text, text, text) TO anon;
REVOKE EXECUTE ON FUNCTION public.submit_contact_request(text, text, text) FROM authenticated;

NOTIFY pgrst, 'reload schema';
