# React Chat App with Socket.IO

This project is a real-time chat application built using **React** for the front end and **Socket.IO** for bi-directional communication between the client and the server. The chat app allows multiple users to join different chat rooms, send messages, and see messages from other users in real time.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)

## Features

- Real-time messaging powered by **Socket.IO**
- Multiple chat rooms with users joining and leaving
- Display of active users in the room
- Notification when a user joins or leaves a room
- Simple and responsive UI built with **React**
- Scalable backend using **Node.js** and **Express**
- Support for emojis in chat messages

## Demo

[Live Demo](https://example.com) (Replace with your live demo link)

## Installation

### Prerequisites

- Node.js and npm installed on your machine

### Clone the repository

```bash
git clone https://github.com/your-username/react-socketio-chat-app.git
```
# Install dependencies for the client
bash```
cd client
npm install
```
# Running the Application
To start both the client and server, follow these steps:

Start the server:

bash```
cd server
npm start
```


Start the React client: Open a new terminal and run:


The app should now be running on http://localhost:3000 with the server running on http://localhost:5000.

# Technologies Used
React: Front-end JavaScript library for building user interfaces.
Socket.IO: Real-time, bi-directional communication between the client and the server.
Node.js: JavaScript runtime for server-side programming.
Express: Web framework for Node.js.
CSS: For styling the chat interface.
MongoDB : Store user profile 

# Folder 
### Backend:

- **`app/`**: Contains the main application logic for handling server-side operations.
- **`routes/`**: Defines the API routes that connect the frontend to the backend.
- **`controller/`**: Manages the business logic of the application, handling requests and responses.
- **`db/`**: Handles database connections and configurations (e.g., connecting to MongoDB).
- **`messageschema/`**: Defines the Mongoose schema for chat messages stored in the database.
- **`schema/`**: Contains other database schemas.

### Frontend (Chat):

- **`public/`**: Holds public assets like the main `index.html` file, icons, and static assets.
- **`src/`**: Contains the source code for the React frontend.
  - **`components/`**: Holds the individual React components used to build the chat UI.
  - **`App.js`**: The main app component that contains the logic for the chat interface.
  - **`index.js`**: The entry point for the React application, where the app is rendered into the DOM.

This structure separates backend and frontend concerns and organizes them for scalability and maintainability.


