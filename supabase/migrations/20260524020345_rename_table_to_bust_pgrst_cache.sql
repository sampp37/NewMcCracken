/*
  # Rename contact_requests to contact_submissions, then back

  PostgREST caches INSERT plans per table name. Renaming forces it to
  treat the table as new and recompile all plans fresh.
  
  We rename to a new name, update the function, then rename back.
  This is the nuclear option to bust the stale plan cache.
*/

-- Rename to a fresh name
ALTER TABLE public.contact_requests RENAME TO contact_submissions;

-- Update the function to point at the new name
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
  INSERT INTO public.contact_submissions (name, phone_number, details)
  VALUES (trim(p_name), trim(p_phone), NULLIF(trim(p_details), ''));
END;
$$;

GRANT EXECUTE ON FUNCTION public.submit_contact_request(text, text, text) TO anon;
GRANT EXECUTE ON FUNCTION public.submit_contact_request(text, text, text) TO authenticated;

NOTIFY pgrst, 'reload schema';
