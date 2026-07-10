# Customer Registry System

A full-stack web application designed to manage customer records efficiently. Built to fulfill SkillWallet technical milestones.

## Architecture & Tech Stack
- **Frontend:** Pure HTML5, CSS3 (Modern Flexbox UI), and JavaScript (Fetch API for asynchronous data operations).
- **Backend:** Node.js, Express framework, and RESTful routing architecture.
- **Database:** SQLite3 embedded database managed via `sqlite3` driver.

## Database Schema
The `customers` table contains the following structure:
- `id` (INTEGER, Primary Key, Auto-Increment)
- `firstName` (TEXT, Required)
- `lastName` (TEXT, Required)
- `email` (TEXT, Unique, Required)
- `phoneNumber` (TEXT)
- `createdAt` (DATETIME, Default Current Timestamp)

## Setup & Running Instructions

### 1. Backend Setup
Navigate to the backend folder, install dependencies, and start the server:
```bash
cd backend
npm install
npm start