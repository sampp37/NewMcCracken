/*
  # Grant anon EXECUTE on submit_contact_request

  The submit_contact_request function is SECURITY DEFINER, meaning it runs as
  the function owner (postgres), bypassing RLS and PostgREST's cached INSERT plans.
  
  Granting EXECUTE to anon allows the form to call it via /rest/v1/rpc/
  without hitting the stale PostgREST plan cache that still references
  the old "email" column from before the table was recreated.
*/
GRANT EXECUTE ON FUNCTION public.submit_contact_request(text, text, text) TO anon;
NOTIFY pgrst, 'reload schema';
