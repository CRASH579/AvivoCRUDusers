# User Management Backend

A Node.js/Express backend service for managing users with MySQL database integration.

## Features

- RESTful API endpoints for user management
- MySQL database integration
- CORS enabled
- Environment variable configuration
- Error handling

## Tech Stack

- Node.js
- Express.js
- MySQL2
- dotenv for configuration
- CORS middleware

## Prerequisites

- Node.js (Latest LTS version recommended)
- MySQL Server
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd CRUDusers/backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASS=your_mysql_password
DB_NAME=your_database_name
PORT=3000
```

4. Set up the database:
```sql
CREATE DATABASE avivo;
USE avivo;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  companyName VARCHAR(255),
  role VARCHAR(255),
  country VARCHAR(255)
);
```

5. Start the server:
```bash
npm run dev
```

The server will start on port 3000 by default.

## Available Scripts

- `npm run start` - Start production server
- `npm run dev` - Start development server with nodemon

## API Endpoints

### GET /users
- Returns all users
- Response: Array of user objects

### POST /users/create
- Creates a new user
- Request body:
```json
{
  "firstName": "string",
  "lastName": "string",
  "companyName": "string",
  "role": "string",
  "country": "string"
}
```

### DELETE /users/:id
- Deletes a user by ID
- URL parameter: id (number)

## Error Handling

The API includes error handling for:
- Missing required fields
- Database connection issues
- Invalid requests
- Not found resources