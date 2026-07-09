---
sidebar_label: "POST /login"
sidebar_position: 2
---

# User Login

<span class="api-badge api-badge--post">POST</span> `/login`

Authenticates a user and starts a session by setting the `token` cookie.

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `email` | `string` | **Yes** | The user's email address. |
| `pwd` | `string` | **Yes** | The user's password. |

```json
{
  "email": "customer@example.com",
  "pwd": "SecurePassword123"
}
```

### Responses

#### `200 OK`
Login is successful. The `token` cookie is set, and the JWT token is returned in the response payload.

```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "User logged successfully successfully"
}
```

#### `200 OK` with credentials error
If validation or credentials fail, the server returns an error JSON object.

```json
{
  "status": "error",
  "message": "Credencials incorrectes",
  "error": true
}
```
