/*
  # Secure submit_contact_request function

  1. Changes
    - Set a fixed search_path to prevent search path injection attacks
    - Revoke EXECUTE from anon and authenticated roles (function is only called
      from the Edge Function via service_role, not via the public REST API)
    - Keep EXECUTE for service_role so the Edge Function can still call it as a fallback

  2. Security
    - Fixes "mutable search_path" warning by adding SET search_path = public
    - Fixes "Public/Signed-In Can Execute SECURITY DEFINER Function" by revoking
      anon and authenticated grants
*/

CREATE OR REPLACE FUNCTION public.submit_contact_request(
  p_name text,
  p_phone text,
  p_details text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

REVOKE EXECUTE ON FUNCTION public.submit_contact_request(text, text, text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.submit_contact_request(text, text, text) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.submit_contact_request(text, text, text) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.submit_contact_request(text, text, text) TO service_role;
