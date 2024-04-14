# Health and Fitness Club Management System: FitnessTrackr

## Getting Started

### Setup Instructions

1. **Database Setup**:

   - Install and set up a PostgreSQL database on your local machine.
   - Create a new database and name it as desired.
   - Use the provided SQL scripts under `/SQL`
     - `db_creation.sql`: This script will create all necessary tables for our application to function properly
     - `db_population.sql`: This script will create sample data to get you started.

2. **Application Setup**:
   - Clone this repository to your local machine.
   - To run the backend:
     - Modify the database connection parameters (URL, username, password) to match your PostgreSQL database configuration. These can be found under `HealthFitnessClubManagement/src/main/resources/application.properties`
     - Open the `HealthFitnessClubManagement` folder in IntelliJ IDEA or any preferred Java IDE, build and run the `HealthFitnessClubManagementApplication.java` file, which is located in `HealthFitnessClubManagement/src/main/java/com/example/HealthFitnessClubManagement`
   - To run the front end:
     - Within your terminal, inside the cloned repository, navigate to the `/client` folder.
     - Run `npm install`
     - Run `npm start`
     - Details on which port your running the UI in will show up in the terminal, click the localhost URL and this will open a browser window with the application.

## Demo Video

[DemoVideo](https://youtu.be/FKszCou2cyc)

### Contributors
- Hajar Assim 101232456
- Hasib Khodayar 101225523

