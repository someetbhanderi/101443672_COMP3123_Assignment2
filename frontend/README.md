# Employee Management System

A full-stack application for managing employees, featuring login/logout functionality, CRUD operations, search functionality, and form validation.

## Features

- **Authentication:**
  - Secure login/logout functionality using tokens.
  - Redirects unauthenticated users to the Login page.
- **Employee Management:**
  - Add, update, delete, and view employees.
  - Search employees by name, position, or department.
- **Form Validation:**
  - Ensures all fields are properly filled with valid data.
- **Professional Design:**
  - Fully styled using Bootstrap for a responsive and user-friendly interface.

---

## Technologies Used

### Frontend

- React.js
- React Router
- Axios
- Bootstrap

### Backend

- Node.js
- Express.js
- MongoDB Atlas (Cloud-based MongoDB)

---

## Setup Instructions

### Backend Setup

1. Navigate to the `backend` directory
   cd backend

2. Install dependencies:
   npm install

3. Create a .env file in the backend directory with the following content:
   MONGO_URI=mongodb+srv://101396990:f4WlSdFNZWdsZOPY@employeedb.qxfp0.mongodb.net/?retryWrites=true&w=majority&appName=EmployeeDB
   PORT=5000

4. Start the backend server:
   node src/index.js

### Frontend Setup

1. Navigate to the `frontend` directory
   cd frontend

2. Install dependencies:
   npm install

3. Start the frontend deployment server:
   npm start

## API Endpoints

## User Authentication

    POST /api/users/login - Login with username and password.

## Employee Management

    POST /api/employees - Create a new employee.
    GET /api/employees - Retrieve all employees.
    GET /api/employees/:id - Retrieve a specific employee by ID.
    PUT /api/employees/:id - Update an employee by ID.
    DELETE /api/employees/:id - Delete an employee by ID.
    GET /api/employees/search?query - Search employees by name, department, or position.
