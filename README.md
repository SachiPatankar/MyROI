# EMI Calculator API

This is a simple REST API to calculate EMI, including a prepayment option, built using Node.js and PostgreSQL.

## Setup Instructions

### 1. Database Setup
1. Open a terminal or command prompt.
2. Access PostgreSQL:
   ```bash
   psql -U postgres
3. Create the database
   ```bash
   CREATE DATABASE emi_calculator_db;
4. Connect to the database
   ```bash
   \c emi_calculator_db

### 2. Environmemt Variables
1. Create a .env file in the src directory.
2. Refer to the .env.sample file for the required fields and fill in the necessary values.

### 3. Project setup
1. Open a new terminal in the project folder.
2. Install dependencies
   ```bash
   npm i
3. Start the development server
   ```bash
   npm run dev
   
The server will run on http://localhost:3000.
   

