/*
  # Add scheduling fields to contact_requests

  Adds best_day_to_call and best_time_to_reach columns if they don't exist yet.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_requests' AND column_name = 'best_day_to_call'
  ) THEN
    ALTER TABLE contact_requests ADD COLUMN best_day_to_call text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_requests' AND column_name = 'best_time_to_reach'
  ) THEN
    ALTER TABLE contact_requests ADD COLUMN best_time_to_reach text;
  END IF;
END $$;
