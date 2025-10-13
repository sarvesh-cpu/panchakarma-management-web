-- Seed data for Panchakarma Management System
-- Insert dummy data for testing

-- Insert practitioners
INSERT INTO users (name, email, password, role) VALUES
('Dr. Priya Sharma', 'priya.sharma@panchakarma.com', '$2b$10$rOvHPxfzO2.KjB8YrjMjUeX8qF5vN3wL9mP2sT6uR4eW7xC1zV0yK', 'practitioner'),
('Dr. Rajesh Kumar', 'rajesh.kumar@panchakarma.com', '$2b$10$rOvHPxfzO2.KjB8YrjMjUeX8qF5vN3wL9mP2sT6uR4eW7xC1zV0yK', 'practitioner'),
('Dr. Meera Patel', 'meera.patel@panchakarma.com', '$2b$10$rOvHPxfzO2.KjB8YrjMjUeX8qF5vN3wL9mP2sT6uR4eW7xC1zV0yK', 'practitioner');

-- Insert patients
INSERT INTO users (name, email, password, role) VALUES
('Amit Singh', 'amit.singh@email.com', '$2b$10$rOvHPxfzO2.KjB8YrjMjUeX8qF5vN3wL9mP2sT6uR4eW7xC1zV0yK', 'patient'),
('Sunita Devi', 'sunita.devi@email.com', '$2b$10$rOvHPxfzO2.KjB8YrjMjUeX8qF5vN3wL9mP2sT6uR4eW7xC1zV0yK', 'patient'),
('Ravi Gupta', 'ravi.gupta@email.com', '$2b$10$rOvHPxfzO2.KjB8YrjMjUeX8qF5vN3wL9mP2sT6uR4eW7xC1zV0yK', 'patient'),
('Kavita Joshi', 'kavita.joshi@email.com', '$2b$10$rOvHPxfzO2.KjB8YrjMjUeX8qF5vN3wL9mP2sT6uR4eW7xC1zV0yK', 'patient'),
('Manoj Verma', 'manoj.verma@email.com', '$2b$10$rOvHPxfzO2.KjB8YrjMjUeX8qF5vN3wL9mP2sT6uR4eW7xC1zV0yK', 'patient');

-- Insert therapy sessions
INSERT INTO sessions (patient_id, practitioner_id, date, time, type_of_therapy, status, notes) VALUES
(4, 1, '2024-01-15', '09:00:00', 'Abhyanga (Oil Massage)', 'completed', 'Patient responded well to sesame oil treatment'),
(5, 1, '2024-01-16', '10:30:00', 'Shirodhara (Oil Pouring)', 'completed', 'Excellent relaxation response'),
(6, 2, '2024-01-17', '14:00:00', 'Panchakarma Detox', 'scheduled', 'First session of 7-day program'),
(7, 2, '2024-01-18', '11:00:00', 'Udvartana (Herbal Powder Massage)', 'scheduled', 'Weight management program'),
(8, 3, '2024-01-19', '15:30:00', 'Nasya (Nasal Therapy)', 'scheduled', 'Respiratory wellness treatment'),
(4, 1, '2024-01-20', '09:30:00', 'Abhyanga (Oil Massage)', 'scheduled', 'Follow-up session'),
(5, 3, '2024-01-21', '16:00:00', 'Karna Purana (Ear Treatment)', 'scheduled', 'Hearing wellness therapy');

-- Insert feedback for completed sessions
INSERT INTO feedback (patient_id, session_id, feedback_text, rating) VALUES
(4, 1, 'Excellent treatment! I felt very relaxed and the practitioner was very knowledgeable. The oil massage was perfect for my stress relief.', 5),
(5, 2, 'Amazing Shirodhara experience. Dr. Priya explained everything clearly and I felt completely rejuvenated after the session.', 5);

-- Insert notifications
INSERT INTO notifications (user_id, message, type, session_id) VALUES
-- Pre-procedure notifications
(6, 'Reminder: Please avoid heavy meals 3 hours before your Panchakarma Detox session tomorrow at 2:00 PM.', 'pre-procedure', 3),
(7, 'Preparation: Drink warm water and avoid cold beverages before your Udvartana session tomorrow at 11:00 AM.', 'pre-procedure', 4),
(8, 'Important: Please inform us of any nasal congestion before your Nasya therapy session tomorrow at 3:30 PM.', 'pre-procedure', 5),
(4, 'Reminder: Your follow-up Abhyanga session is scheduled for tomorrow at 9:30 AM. Please arrive 15 minutes early.', 'pre-procedure', 6),
(5, 'Preparation: Avoid using ear drops or cleaning ears before your Karna Purana session tomorrow at 4:00 PM.', 'pre-procedure', 7),

-- Post-procedure notifications for completed sessions
(4, 'Post-treatment care: Avoid cold water and maintain warmth for the next 2 hours. Drink warm herbal tea if available.', 'post-procedure', 1),
(5, 'After Shirodhara: Rest for 30 minutes, avoid washing hair for 6 hours, and maintain a calm environment.', 'post-procedure', 2),

-- General notifications
(4, 'Welcome to PBL Panchakarma! Your wellness journey begins with personalized Ayurvedic care.', 'general', NULL),
(5, 'Thank you for choosing our services. Please remember to stay hydrated and follow post-treatment guidelines.', 'general', NULL),
(6, 'Your 7-day Panchakarma program has been customized based on your consultation. Prepare for transformation!', 'general', NULL),
(7, 'Weight management through Ayurveda requires consistency. We are here to support your journey.', 'general', NULL),
(8, 'Respiratory wellness is our priority. Please follow all pre-treatment instructions for best results.', 'general', NULL);
