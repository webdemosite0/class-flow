ALTER TABLE users ADD COLUMN IF NOT EXISTS email_notifications boolean NOT NULL DEFAULT true;
ALTER TABLE users ADD COLUMN IF NOT EXISTS class_reminders boolean NOT NULL DEFAULT true;
ALTER TABLE users ADD COLUMN IF NOT EXISTS preferred_theme text NOT NULL DEFAULT 'light';

ALTER TABLE recordings ADD COLUMN IF NOT EXISTS egress_id text;
ALTER TABLE recordings ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'ready';
ALTER TABLE recordings ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE recordings ADD COLUMN IF NOT EXISTS classroom_id uuid REFERENCES classrooms(id) ON DELETE CASCADE;

CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  classroom_id uuid NOT NULL REFERENCES classrooms(id) ON DELETE CASCADE,
  teacher_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  url text NOT NULL,
  resource_type text NOT NULL DEFAULT 'link',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_resources_classroom ON resources(classroom_id);
