/*
  # Create contact requests table

  1. New Tables
    - `contact_requests`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text)
      - `service` (text, required)
      - `message` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `contact_requests` table
    - Add policy to allow anyone to submit contact requests
*/

CREATE TABLE IF NOT EXISTS contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  service text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anyone to submit contact requests"
  ON contact_requests
  FOR INSERT
  WITH CHECK (true);
