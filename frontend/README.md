# User Management Frontend

A React-based user management system built with TypeScript, Vite, and Chakra UI.

## Features

- View list of users with their details
- Add new users
- Delete existing users
- Search users by name, company, role, or country
- Import dummy users from external API
- Dark/Light mode support
- Responsive design

## Tech Stack

- React 19
- TypeScript
- Vite
- Chakra UI
- Axios for API calls
- ESLint for code quality

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn
- Backend server running (see backend README)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd CRUDusers/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```
The application will start on `http://localhost:5173` by default.

## Environment Setup

The frontend expects the backend API to be running on `http://localhost:3000`. If your backend is running on a different port, update the API URLs in `src/components/ui/UserList.tsx`.

## Usage

1. The main interface shows a list of existing users
2. Use the search bar to filter users
3. Click "Add User" to open the new user form
4. Click "Show Dummy Json Data" to fetch sample users
5. Use the delete button to remove users