---
sidebar_label: "GET /admin/users/:id"
sidebar_position: 2
---

# Get User by ID

<span class="api-badge api-badge--get">GET</span> `/admin/users/:id`

Retrieves detailed account information for a single user by database ID.

:::caution[Access Restricted]

Requires **ADMIN** role privileges.

:::

### Path Parameters

* `id` (integer) - The database ID of the user.

### Responses

#### `200 OK`

```json
{
  "id": 5,
  "email": "customer@example.com",
  "name": "John Doe",
  "role_id": 2,
  "role": "CUSTOMER"
}
```

#### `404 Not Found`
Returned if the user ID does not exist.

```json
{
  "error": true,
  "message": "Cannot get user with id",
  "log": "User 999 Not Found",
  "status": "error",
  "code": 500
}
```
