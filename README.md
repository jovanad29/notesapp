# My Notes App - ensolvers Challenge

A simple SPA to create, edit, archive and store notes.

## Prerequisites

Before running the app, make sure you have the following installed on your system:

    1. Node.js (version 18)
    2. PostgreSQL (version 13)

## Frontend

The frontend of the app is built using React + Vite, and requires the following dependencies:

    "axios": "^1.5.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^8.1.2",
    "react-router-dom": "^6.16.0",
    "redux-devtools-extension": "^2.13.9",
    "redux-thunk": "^2.4.2"

## Backend

The backend of the application is developed using Node.js and requires the following:

    "bcrypt": "5.1.1",
    "dotenv": "16.3.1",
    "express": "4.18.2",
    "morgan": "^1.10.0",
    "pg": "8.11.3",
    "sequelize": "6.33.0"

## Database

The application uses PostgreSQL as its database. Make sure you have a running PostgreSQL server with the required permission set up before running the application.

# Installation

Clone the repository:

    git clone https://github.com/ElianaPranzetti/githubjovanad29-ensolvers-challenge.git

Navigate to the project directory:

    cd <project-directory>

Run the script
app_setup.sh

The script will set up the backend (including DB), set up the frontend and start de backend server. You can access the app in the browser at http://localhost:5173

The backend will be accessible at http://localhost:3001

## Manual installation

### Frontend Setup

Navigate to the frontend directory:

    cd frontend

Install frontend dependencies:

    npm install

### Backend Setup

Navigate to the backend directory:

    cd backend

Install backend dependencies:

    npm install

# Running the application

## Frontend

To run the frontend, execute the following command from the frontend directory:

    npm run dev

The front en will be accessible at: http://localhost:5173

## Backend

To run the backend, execute the following command from the backend directory:

    npm start

The backend will be accessible at http://localhost:8000

# Sing In Credentials

-   username: jovanad29
-   password: ensolversChallenge
