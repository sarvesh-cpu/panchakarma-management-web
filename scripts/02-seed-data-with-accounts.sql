-- Enhanced seed data with complete dummy patient and practitioner accounts
-- Truncate existing data
TRUNCATE TABLE feedback CASCADE;
TRUNCATE TABLE notifications CASCADE;
TRUNCATE TABLE sessions CASCADE;
TRUNCATE TABLE users CASCADE;

-- Insert Dummy Practitioner Account
INSERT INTO users (name, email, password, role, created_at, updated_at) VALUES
(
  'Dr. Amit Kumar',
  'dr.amit@panchakarma.com',
  '$2b$10$k8v4zJ.8xF3.N4c8K2p0OOv6B7M3Q9L5X6Y7Z8A9B0C1D2E3F4G5H6',
  'practitioner',
  NOW(),
  NOW()
);

-- Insert Dummy Patient Account
INSERT INTO users (name, email, password, role, created_at, updated_at) VALUES
(
  'Rajesh Singh',
  'rajesh.patient@panchakarma.com',
  '$2b$10$k8v4zJ.8xF3.N4c8K2p0OOv6B7M3Q9L5X6Y7Z8A9B0C1D2E3F4G5H6',
  'patient',
  NOW(),
  NOW()
);

-- Get IDs for the inserted users
WITH practitioner AS (
  SELECT id as prac_id FROM users WHERE email = 'dr.amit@panchakarma.com'
),
patient AS (
  SELECT id as pat_id FROM users WHERE email = 'rajesh.patient@panchakarma.com'
)
INSERT INTO sessions (patient_id, practitioner_id, date, time, type_of_therapy, status, notes, created_at, updated_at)
SELECT 
  p.pat_id,
  pr.prac_id,
  CURRENT_DATE + INTERVAL '2 days',
  '14:00'::TIME,
  'Abhyanga',
  'completed',
  'Full body oil massage therapy completed successfully',
  NOW() - INTERVAL '2 days',
  NOW() - INTERVAL '2 days'
FROM patient p, practitioner pr;

-- Insert Notifications
WITH users_info AS (
  SELECT id, email FROM users
)
INSERT INTO notifications (user_id, message, type, is_read, created_at)
SELECT id, 'Your Shirodhara session is scheduled for tomorrow', 'pre-procedure', FALSE, NOW()
FROM users_info WHERE email = 'rajesh.patient@panchakarma.com';

-- Insert Feedback
WITH sess AS (
  SELECT id as sess_id FROM sessions LIMIT 1
),
user_info AS (
  SELECT id as user_id FROM users WHERE email = 'rajesh.patient@panchakarma.com'
)
INSERT INTO feedback (patient_id, session_id, feedback_text, rating, created_at)
SELECT user_info.user_id, sess.sess_id, 'Excellent experience! Very professional and knowledgeable.', 5, NOW() - INTERVAL '1 day'
FROM user_info, sess;
