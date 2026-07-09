---
sidebar_label: "DELETE /admin/users/:id"
sidebar_position: 5
---

# Delete User

<span class="api-badge api-badge--delete">DELETE</span> `/admin/users/:id`

Deletes a user account from the system.

:::caution[Access Restricted]

Requires **ADMIN** role privileges.

:::

### Path Parameters

* `id` (integer) - The database ID of the user to delete.

### Responses

#### `200 OK`

```json
{
  "message": "User deleted successfully",
  "status": "success"
}
```

#### `404 Not Found`

```json
{
  "error": true,
  "message": "Cannot delete user",
  "log": "Not Found",
  "status": "error",
  "code": 500
}
```
