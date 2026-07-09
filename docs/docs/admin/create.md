---
sidebar_label: "POST /admin/users"
sidebar_position: 3
---

# Create User

<span class="api-badge api-badge--post">POST</span> `/admin/users`

Creates a new user account with a specified role.

:::caution[Access Restricted]

Requires **ADMIN** role privileges.

:::

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `email` | `string` | **Yes** | A valid unique email address. |
| `name` | `string` | **Yes** | User's full name. |
| `pwd` | `string` | **Yes** | Password (will be hashed on server). |
| `role_id` | `integer` | **Yes** | Numeric role ID (`1` = Admin, `2` = Customer, `3` = Staff). |

```json
{
  "email": "newstaff@krave.com",
  "name": "Alex Smith",
  "pwd": "SecureStaffPwd123",
  "role_id": 3
}
```

### Responses

#### `201 Created`

```json
{
  "message": "User created successfully",
  "status": "success"
}
```

#### `400 Bad Request`
Returned if user validation parameters are missing or incorrect.
