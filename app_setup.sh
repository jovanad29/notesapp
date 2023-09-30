#!/bin/bash

# Function to set up the backend
setup_backend() {

  cd backend

  npm install

  npm start &
  
  cd ..
}

# Function to set up the frontend
setup_frontend() {

  cd frontend

  npm install

  npm run dev
  
  cd ..
}

# Main function
setup_app() {
  # Set up backend
  setup_backend

  # Set up frontend
  setup_frontend

  echo "App setup complete! You can now access the app at http://localhost:3001"
}

# Call the main function
setup_app
