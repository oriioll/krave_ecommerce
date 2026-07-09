---
sidebar_label: "PUT /admin/users/:id"
sidebar_position: 4
---

# Update User

<span class="api-badge api-badge--put">PUT</span> `/admin/users/:id`

Modifies an existing user's email, name, and/or role.

:::caution[Access Restricted]

Requires **ADMIN** role privileges.

:::

:::note Password Security
Password updates are **NOT** permitted through this endpoint.
:::

### Path Parameters

* `id` (integer) - The database ID of the user.

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `email` | `string` | **Yes** | The updated email address. |
| `name` | `string` | **Yes** | The updated name. |
| `role_id` | `integer` | **Yes** | The updated role ID. |

```json
{
  "email": "updatedstaff@krave.com",
  "name": "Alex Johnson",
  "role_id": 3
}
```

### Responses

#### `200 OK`

```json
{
  "message": "User updated successfully",
  "status": "success"
}
```

#### `404 Not Found`
Returned if the user ID does not exist.

```json
{
  "error": true,
  "message": "Cannot put user with id",
  "log": "Not Found",
  "status": "error",
  "code": 500
}
```
