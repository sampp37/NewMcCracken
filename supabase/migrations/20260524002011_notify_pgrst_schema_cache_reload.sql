/*
  # Reload PostgREST schema cache

  Notifies PostgREST to reload its schema cache so it recognizes
  the 'details' column that exists in the contact_requests table.
  This fixes the "could not find column 'details' in schema cache" error.
*/

NOTIFY pgrst, 'reload schema';
