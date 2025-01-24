/*
  # Create Food Entries Table

  1. New Tables
    - `food_entries`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `food_name` (text)
      - `calories` (integer)
      - `protein` (integer)
      - `carbs` (integer)
      - `fat` (integer)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `food_entries` table
    - Add policies for authenticated users to manage their own entries
*/

CREATE TABLE IF NOT EXISTS food_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  food_name text NOT NULL,
  calories integer NOT NULL,
  protein integer NOT NULL,
  carbs integer NOT NULL,
  fat integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE food_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own entries"
  ON food_entries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own entries"
  ON food_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own entries"
  ON food_entries
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own entries"
  ON food_entries
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);