INSERT INTO Members (first_name, last_name, email, phone_number, pass_word, member_type_id) VALUES
('Bruce', 'Wayne', 'bruce@example.com', '123-456-7890', 'password123', 1),
('Connor', 'Kent', 'connor@example.com', '987-654-3210', 'password456', 2),
('Wally', 'West', 'west@example.com', '555-555-5555', 'password789', 1);

INSERT INTO PersonalTrainingSession (memberID, trainerID, scheduled_date, scheduled_time) VALUES
(1, 3, '2024-04-12', '10:00'),
(2, 3, '2024-04-13', '15:30'),
(3, 2, '2024-04-14', '09:00');

INSERT INTO Room (room_name, capacity) VALUES
('Studio A', 20),
('Studio B', 15),
('Gym Floor', 50);

INSERT INTO GroupFitnessClass (class_name, scheduled_date, scheduled_time, roomID, number_members) VALUES
('Yoga', '2024-04-15', '08:00', 1, 15),
('Zumba', '2024-04-16', '18:00', 2, 12),
('Pilates', '2024-04-17', '10:00', 1, 18);

INSERT INTO TakesClass (memberID, classID) VALUES
(1, 1),
(2, 2),
(3, 3);

INSERT INTO Equipment (equipment_name, roomID, last_maintenance_date, eq_condition) VALUES
('Treadmill', 3, '2024-04-10', 'Good'),
('Dumbbells', 3, '2024-04-09', 'Excellent'),
('Exercise Bike', 3, '2024-04-11', 'Fair');

INSERT INTO FitnessGoals (memberID, goal_description, goal_date, target_weight, target_body_fat, target_muscle_mass) VALUES
(1, 'Lose weight and build muscle', '2024-05-31', 75.0, 15.0, 50.0),
(2, 'Improve flexibility and endurance', '2024-06-30', NULL, NULL, NULL),
(3, 'Gain strength and improve posture', '2024-06-15', 80.0, 18.0, 55.0);

INSERT INTO HealthMetrics (memberID, metric_date, weight, height, body_fat_perc, muscle_mass) VALUES
(1, '2024-04-10', 85.0, 175.0, 20.0, 45.0),
(2, '2024-04-11', 65.0, 160.0, 25.0, 40.0),
(3, '2024-04-12', 90.0, 180.0, 22.0, 50.0);

INSERT INTO TrainerAvailability (trainerID, day_available, time_slot_1, time_slot_2, time_slot_3) VALUES
(2, 'Monday', TRUE, TRUE, FALSE),
(3, 'Tuesday', TRUE, FALSE, TRUE),
(3, 'Wednesday', FALSE, TRUE, FALSE);

INSERT INTO ExerciseRoutine (memberID, exercise_name, reps, routine_set) VALUES
(1, 'Bench Press', 10, 3),
(2, 'Squats', 12, 4),
(3, 'Deadlifts', 8, 3);
