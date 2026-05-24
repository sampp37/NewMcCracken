/*
  # Recreate submit_contact_request function

  The function's internal INSERT plan was compiled against the old table schema
  (which had an "email" column). Dropping and recreating forces Postgres to
  recompile the plan against the current clean table (name, phone_number, details).
*/

DROP FUNCTION IF EXISTS public.submit_contact_request(text, text, text);

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

GRANT EXECUTE ON FUNCTION public.submit_contact_request(text, text, text) TO anon;
GRANT EXECUTE ON FUNCTION public.submit_contact_request(text, text, text) TO authenticated;

NOTIFY pgrst, 'reload schema';
