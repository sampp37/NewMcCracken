/*
  # Add scheduling preference fields to contact_requests

  ## Changes
  - `best_day_to_call` (text, nullable) - preferred day for callback (Monday–Friday)
  - `best_time_to_reach` (text, nullable) - preferred time slot for callback (morning/afternoon/evening with specific hour)

  No RLS changes needed — existing policies already cover the new columns.
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
