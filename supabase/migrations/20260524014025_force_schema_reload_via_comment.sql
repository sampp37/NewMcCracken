/*
  # Force PostgREST schema reload via DDL event trigger

  The pgrst_ddl_watch event trigger fires on DDL commands and sends
  NOTIFY pgrst, 'reload schema' automatically. Adding a COMMENT on
  the table is a harmless DDL that triggers the reload.
*/
COMMENT ON TABLE public.contact_requests IS 'Contact form submissions - name, phone_number, details only';
