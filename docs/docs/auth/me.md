---
sidebar_label: "GET /auth/me"
sidebar_position: 4
---

# Check Auth Status

<span class="api-badge api-badge--get">GET</span> `/auth/me`

Retrieves information about the currently logged-in user by decoding the `token` cookie.

### Header/Cookie Requirements

* **Cookie:** Must include `token=YOUR_JWT_TOKEN`.

### Responses

#### `200 OK`

```json
{
  "loggedIn": true,
  "message": "User logged in",
  "user": {
    "user_id": 5,
    "mail": "customer@example.com",
    "name": "John Doe",
    "role": "customer"
  }
}
```

#### `401 Unauthorized`
Returned if the token is missing, expired, or invalid.

```json
{
  "status": "error",
  "message": "No authorized - please log in",
  "error": true
}
```
