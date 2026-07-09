---
sidebar_label: "POST /register"
sidebar_position: 1
---

# Register a Customer

<span class="api-badge api-badge--post">POST</span> `/register`

Creates a new customer account, hashes the password using bcrypt, initializes an empty shopping cart, and automatically logs in the user by setting the session cookie.

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `email` | `string` | **Yes** | A valid email address. Must be unique. |
| `pwd` | `string` | **Yes** | Plaintext password. (Will be hashed on the server). |
| `name` | `string` | **Yes** | Full name of the user. |

```json
{
  "email": "customer@example.com",
  "pwd": "SecurePassword123",
  "name": "John Doe"
}
```

### Responses

#### `201 Created`
The user is created successfully. The `token` cookie is set, and the JWT token string is returned in the response payload.

```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "User created successfully successfully"
}
```

#### `500 Internal Server Error`
Returned if user registration fails (e.g., if the email already exists in the system).

```json
{
  "status": "error",
  "message": "User could not be created (maybe email already exists)",
  "error": true
}
```
