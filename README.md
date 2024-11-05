# Personal Task Manager API

A backend API built with Node.js to manage personal tasks, featuring CRUD operations, image upload support, and data persistence in JSON files. This project provides a hands-on simulation of managing tasks with a real-world approach, focusing on modularity, maintainability, and basic routing.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Optional: Basic Authentication](#optional-basic-authentication)
- [License](#license)

## Project Overview

This API allows users to create, read, update, and delete tasks, with an option to upload images associated with tasks. Data persistence is managed through JSON files, ensuring that tasks remain saved across server restarts.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete tasks.
- **Image Upload**: Upload an image associated with each task.
- **Persistent Storage**: Data is stored in a JSON file using Node.js' `fs` module.
- **HTTP Server**: Built-in HTTP server handling task routes.
- **Optional Authentication**: Basic login with hardcoded credentials to protect routes.

## Project Structure

```bash
task-manager-api/
├── controllers/
│   ├── taskController.js       # Contains logic for handling tasks
│   └── authController.js       # Handles basic authentication (optional)
├── data/
│   └── tasks.json              # JSON file to store tasks
├── uploads/                    # Stores uploaded images
├── routes/
│   ├── taskRoutes.js           # Routes for task operations
│   └── authRoutes.js           # Routes for authentication (optional)
├── utils/
│   └── fileHandler.js          # Helper functions for file operations
├── views/
│   └── index.html              # Basic front-end UI (optional)
├── app.js                      # Main server setup
└── package.json                # Project metadata and dependencies

Setup and Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api
Install dependencies:

bash
Copy code
npm install
Start the server:

bash
Copy code
node app.js
The server will run at http://localhost:3000.

Usage
Basic Commands
Create a Task: Add details like title, description, status (e.g., pending, completed).
Read Tasks: View all tasks or filter by status.
Update a Task: Modify task details.
Delete a Task: Remove a task using its ID.
Image Upload: Upload an image with each task. Images are stored in the /uploads folder.
Endpoints
POST /tasks - Create a new task.
GET /tasks - Retrieve a list of tasks (with optional status filter).
PUT /tasks/:id - Update a specific task.
DELETE /tasks/:id - Delete a specific task.
Optional: Basic Authentication
To enable basic authentication, hardcoded credentials can be used to secure task routes. Implement the optional authController.js to handle login routes.

License
This project is licensed under the MIT License.