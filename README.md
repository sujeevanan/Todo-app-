
# Todo App

A simple Todo App built using the MERN stack.

## Features

- Add new todos
- Delete existing todos
- Update todos
- View all todos

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API Testing**: Postman

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/todo-app.git
   ```
2. Navigate to the project directory:
   ```sh
   cd todo-app
   ```
3. Install backend dependencies:
   ```sh
   cd backend
   npm install
   ```
4. Install frontend dependencies:
   ```sh
   cd ../frontend
   npm install
   ```

### Running the App

1. Start the MongoDB server:
   ```sh
   mongod
   ```
2. Start the backend server:
   ```sh
   cd backend
   npm start
   ```
3. Start the frontend server:
   ```sh
   cd ../frontend
   npm start
   ```

### API Endpoints

- **GET** `/api/todos` - Retrieve all todos
- **POST** `/api/todos` - Add a new todo
- **PUT** `/api/todos/:id` - Update a todo
- **DELETE** `/api/todos/:id` - Delete a todo

### Testing the API

Use Postman to test the API endpoints.

## License

This project is licensed under the MIT License.
```
