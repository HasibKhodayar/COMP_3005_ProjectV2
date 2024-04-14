CREATE TABLE Members(
	memberID SERIAL PRIMARY KEY,
	first_name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	email varchar(50) UNIQUE,
	phone_number varchar(50),
	pass_word varchar(50) NOT NULL,
	member_type_id INT
);

CREATE TABLE PersonalTrainingSession (
    sessionID SERIAL PRIMARY KEY,
    memberID INT,
    trainerID INT,
    scheduled_date varchar(10),
    scheduled_time varchar(10),
    FOREIGN KEY (memberID) REFERENCES Members(memberID),
    FOREIGN KEY (trainerID) REFERENCES Members(memberID)
);

CREATE TABLE Room (
    roomID SERIAL PRIMARY KEY,
    room_name VARCHAR(100),
    capacity INT
);

CREATE TABLE GroupFitnessClass (
    classID SERIAL PRIMARY KEY,
	class_name varchar(50),
    scheduled_date varchar(10),
    scheduled_time varchar(10),
    roomID INT,
	number_members INT,
	FOREIGN KEY (roomID) REFERENCES Room(roomID)
);

CREATE TABLE TakesClass(
	takesID SERIAL PRIMARY KEY,
	memberID INT NOT NULL,
	classID INT NOT NULL,
	FOREIGN KEY (memberID) REFERENCES Members(memberID),
	FOREIGN KEY (classID) REFERENCES GroupFitnessClass(classID)
)


CREATE TABLE Equipment (
    equipmentID SERIAL PRIMARY KEY,
    equipment_name varchar(100),
    roomID INT,
    last_maintenance_date DATE,
	eq_condition varchar(50),
    FOREIGN KEY (roomID) REFERENCES Room(roomID)
);


CREATE TABLE FitnessGoals(
	goalID SERIAL PRIMARY KEY,
	memberID INT UNIQUE, 
	goal_description TEXT,
	goal_date DATE,
	target_weight DECIMAL,
	target_body_fat DECIMAL,
	target_muscle_mass DECIMAL,
	FOREIGN KEY (memberID) REFERENCES Members(memberID)
);

CREATE TABLE HealthMetrics(
	metricID SERIAL PRIMARY KEY,
	memberID INT,
	metric_date DATE,
	weight DECIMAL,
	height DECIMAL,
	body_fat_perc DECIMAL,
	muscle_mass DECIMAL,
	FOREIGN KEY (memberID) REFERENCES Members(memberID)
);

CREATE TABLE TrainerAvailability(
	availabilityID SERIAL PRIMARY KEY,
	trainerID INT,
	day_available varchar(10),
	time_slot_1 BOOLEAN DEFAULT TRUE,
	time_slot_2 BOOLEAN DEFAULT TRUE,
	time_slot_3 BOOLEAN DEFAULT TRUE,
	time_slot_4 BOOLEAN DEFAULT TRUE,
	time_slot_5 BOOLEAN DEFAULT TRUE,
	time_slot_6 BOOLEAN DEFAULT TRUE,
	time_slot_7 BOOLEAN DEFAULT TRUE,
	time_slot_8 BOOLEAN DEFAULT TRUE,
	FOREIGN KEY (trainerID) REFERENCES Members(memberID)
);

CREATE TABLE ExerciseRoutine(
	routineID SERIAL PRIMARY KEY,
	memberID INT,
	exercise_name TEXT,
	reps INT,
	routine_set INT,
	FOREIGN KEY (memberID) REFERENCES Members(memberID)
);

CREATE TABLE Billing(
	billingID SERIAL PRIMARY KEY,
	member_email varchar(50),
	payment_date DATE,
	amount DECIMAL,
	purchase_type varchar(20),
	FOREIGN KEY (member_email) REFERENCES Members(email)
);
