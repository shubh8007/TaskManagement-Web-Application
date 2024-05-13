# TaskManagement-Web-Application

Welcome to the Task Management Application! This application helps you manage your tasks efficiently by providing features for creating, updating, deleting, and fetching tasks.

Features
User Authentication: Register, login, and logout securely.
Task Management: Create, view, update, and delete tasks.
RESTful API: Interact with tasks programmatically using API endpoints.
Setup
To run the Task Management Application locally, follow these steps:

Clone the repository:


Copy code
git clone <repository_url>
Navigate to the project directory:


Copy code
cd task-management
Install dependencies:


Copy code
npm install
Set up the database:

Create a MySQL database named task_management_db.
Update the database configuration in db.config.js if necessary.
Start the server:


Copy code
npm start
Access the application in your web browser at http://localhost:3000.

API Documentation
Authentication Endpoints
POST /api/auth/register: Register a new user.
POST /api/auth/login: Login an existing user.
POST /api/auth/logout: Logout the current user.
Task Endpoints
GET /api/tasks: Fetch all tasks.
GET /api/tasks/:taskId: Fetch a single task by ID.
POST /api/tasks: Create a new task.
PUT /api/tasks/:taskId: Update a task by ID.
DELETE /api/tasks/:taskId: Delete a task by ID.

Technologies Used
Node.js
Express.js
MySQL
HTML
CSS
JavaScript

Contributors
Shubham Suryawanshi


