
# TaskNest (Old Branch - With JWT Auth, Without Email Verification)

TaskNest is a task management web application built using the MERN stack (MongoDB, Express.js, React, Node.js). This branch contains the version **with JWT-based authentication** but **without email verification**. It allows users to register, log in, and manage tasks categorized by 'nests'.

## Features

- ✅ User registration & login with JWT
- ✅ Protected routes for authenticated users
- ✅ Task creation, editing, and deletion
- ✅ Tasks grouped under custom "Nests"
- ✅ Task completion tracking
- ❌ No email verification (available in main branch)

## Technologies Used

### Frontend
- React (Vite)
- React Router
- React Hook Form + Yup (for form validation)
- Tailwind CSS (UI styling)
- Axios

### Backend
- Node.js & Express.js
- MongoDB + Mongoose
- JWT
- bcrypt (for password hashing)
- CORS

## Installation

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> ⚠️ Make sure to configure environment variables in both `server/.env` and `client/.env` for proper API communication.

## Folder Structure

```
/backend
  ├── controllers/
  ├── middleware/
  ├── models/
  ├── routes/
  └── utils/
/frontend
  ├── components/
  ├── pages/
  ├── services/
  └── utils/
```

## Environment Variables

### Backend

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_password
BASE_URL=http://localhost:5173
```

### Frontend

```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Notes

- JWT is handled via local storage.
- Email verification is not implemented in this version.
- For the latest version with email verification, switch to the `main` branch.

## License

This project is licensed under the MIT License.
