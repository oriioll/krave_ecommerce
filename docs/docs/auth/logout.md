---
sidebar_label: "POST /logout"
sidebar_position: 3
---

# User Logout

<span class="api-badge api-badge--post">POST</span> `/logout`

Terminates the active session by clearing the `token` cookie.

### Responses

#### `200 OK`

```json
{
  "status": "success",
  "message": "Logged out successfully"
}
```
