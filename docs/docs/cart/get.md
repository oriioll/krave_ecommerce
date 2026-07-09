---
sidebar_label: "GET /cart"
sidebar_position: 1
---

# Get User Cart

<span class="api-badge api-badge--get">GET</span> `/cart`

Retrieves the active cart ID and details of all items inside the cart for the logged-in user.

### Responses

#### `200 OK`

```json
{
  "status": "success",
  "user_id": 5,
  "cart_id": 8,
  "items": [
    {
      "product_id": 1,
      "quantity": 2
    },
    {
      "product_id": 3,
      "quantity": 1
    }
  ]
}
```

#### `401 Unauthorized`

```json
{
  "status": "error",
  "message": "No authorized - please log in",
  "error": true
}
```
