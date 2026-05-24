/*
  # Force PostgREST schema cache reload

  PostgREST caches the database schema and may still think contact_requests
  has old columns (email, service, message, best_day_to_call, best_time_to_reach).
  This migration sends a NOTIFY to force an immediate reload of the schema cache.
*/

NOTIFY pgrst, 'reload schema';
