/*
  # Create RPC function for contact form submissions

  1. New Function
    - `submit_contact_request(p_name text, p_phone text, p_details text)`
    - Inserts a row into `contact_requests` table
    - Returns void (no data returned)
    - Bypasses PostgREST schema cache issue for the 'details' column

  2. Security
    - Function is accessible by the `anon` role (for public form submissions)
    - Uses SECURITY DEFINER to execute with owner privileges
    - Validates that name and phone are not empty

  3. Notes
    - This is a workaround for a known Supabase/PostgREST stale schema cache bug
      where the 'details' column is not recognized via direct REST API inserts
    - RPC calls do not rely on the table column schema cache
*/

CREATE OR REPLACE FUNCTION public.submit_contact_request(
  p_name text,
  p_phone text,
  p_details text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF p_name IS NULL OR trim(p_name) = '' THEN
    RAISE EXCEPTION 'Name is required';
  END IF;

  IF p_phone IS NULL OR trim(p_phone) = '' THEN
    RAISE EXCEPTION 'Phone number is required';
  END IF;

  INSERT INTO public.contact_requests (name, phone_number, details)
  VALUES (trim(p_name), trim(p_phone), NULLIF(trim(p_details), ''));
END;
$$;

GRANT EXECUTE ON FUNCTION public.submit_contact_request(text, text, text) TO anon;
GRANT EXECUTE ON FUNCTION public.submit_contact_request(text, text, text) TO authenticated;
