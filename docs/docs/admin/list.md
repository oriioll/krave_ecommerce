---
sidebar_label: "GET /admin/users"
sidebar_position: 1
---

# List All Users

<span class="api-badge api-badge--get">GET</span> `/admin/users`

Retrieves a list of all registered user accounts with their assigned roles.

:::caution[Access Restricted]

Requires **ADMIN** role privileges.

:::

### Responses

#### `200 OK`

```json
[
  {
    "id": 1,
    "email": "admin@krave.com",
    "name": "Admin User",
    "role_id": 1,
    "role": "ADMIN"
  },
  {
    "id": 5,
    "email": "customer@example.com",
    "name": "John Doe",
    "role_id": 2,
    "role": "CUSTOMER"
  },
  {
    "id": 3,
    "email": "staff@krave.com",
    "name": "Staff Member",
    "role_id": 3,
    "role": "STAFF"
  }
]
```

#### `401 Unauthorized`
Returned if the session is invalid or missing.

```json
{
  "error": true,
  "status": "error",
  "message": "Unauthorized: Invalid or missing token"
}
```

#### `403 Forbidden`
Returned if the authenticated user is not an administrator.

```json
{
  "error": true,
  "status": "error",
  "message": "Forbidden"
}
```
