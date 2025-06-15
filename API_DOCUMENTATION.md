User Management API – Documentation

Overview

This API allows for managing user data with full CRUD functionality, along with JWT-based authentication for secure access.Technologies used: Node.js, Express, MongoDB, Mongoose, bcrypt, and JWT.

Base URL: http://localhost:5000/api/users All endpoints except /login require a valid JWT token in the Authorization header.

Authentication

Endpoint: POST /api/users/login

Description: Logs in the user and returns a JWT token.

Request

{
  "email": "example@mail.com",
  "password": "123456"
}

Response

{
  "token": "<jwt_token>",
  "user": {
    "_id": 1,
    "name": "John",
    "email": "example@mail.com",
    "phone": "9998887777",
    "role": "user"
  }
}

Usage Example (cURL)

curl -X POST http://localhost:5000/api/users/login \
-H "Content-Type: application/json" \
-d '{"email":"example@mail.com", "password":"123456"}'

Create User

Endpoint: POST /api/users

Method: POST

Auth: Required (Bearer <token>)

Request

{
  "name": "Alice",
  "email": "alice@mail.com",
  "phone": "9876543210",
  "password": "secret123"
}

Response

{
  "_id": 2,
  "name": "Alice",
  "email": "alice@mail.com",
  "phone": "9876543210",
  "role": "user",
  "createdAt": "2025-06-15T12:00:00Z"
}

Get All Users

Endpoint: GET /api/users

Method: GET

Auth: ❌ Not required (can be changed)

Response

{
  "page": 1,
  "totalPages": 3,
  "totalUsers": 25,
  "users": [
    {
      "_id": 1,
      "name": "John",
      "email": "example@mail.com",
      "phone": "9998887777",
      "role": "user"
    }
  ]
}

Get User By ID

Endpoint: GET /api/users/:id

Method: GET

Auth: Required

Update User

Endpoint: PUT /api/users/:id

Method: PUT

Auth: Required

Request

{
  "name": "Updated Name",
  "email": "new@mail.com",
  "password": "newpass123"
}

Delete User

Endpoint: DELETE /api/users/:id

Method: DELETE

Auth: Required

Error Responses

Status Code

Meaning

400

Bad Request / Validation Error

401

Unauthorized (missing/invalid token)

404

Resource Not Found

500

Server Error



