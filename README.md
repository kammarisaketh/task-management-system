# Task Management System

A full-stack role-based Task Management System built with React, TypeScript, Spring Boot, PostgreSQL, Spring Security, and JWT authentication.

## Features

- User registration and login
- JWT-based authentication
- Role-based access control with ADMIN and EMPLOYEE roles
- Admin dashboard
- Employee dashboard
- Create, edit, delete, and assign tasks
- Update task status
- View assigned tasks
- View all users as admin
- Protected frontend routes with React Router
- PostgreSQL database integration
- Professional responsive UI

## Tech Stack

Frontend:
- React
- TypeScript
- Vite
- React Router
- Axios
- CSS

Backend:
- Java 21
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- PostgreSQL
- Maven

## User Roles

ADMIN users can create, assign, edit, delete, and manage tasks.

EMPLOYEE users can view only their assigned tasks and update task status.

## API Endpoints

Auth:
- POST /api/auth/register
- POST /api/auth/login

Tasks:
- POST /api/tasks
- GET /api/tasks
- GET /api/tasks/my-tasks
- GET /api/tasks/{taskId}
- PUT /api/tasks/{taskId}
- PATCH /api/tasks/{taskId}/status
- DELETE /api/tasks/{taskId}

Admin:
- GET /api/admin/users

## Frontend Routes

- /login
- /register
- /dashboard

## Local Setup

Backend:

```bash
cd backend
./mvnw spring-boot:run
