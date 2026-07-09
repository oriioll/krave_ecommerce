---
sidebar_label: "DELETE /products/:id"
sidebar_position: 7
---

# Delete Product by ID

<span class="api-badge api-badge--delete">DELETE</span> `/products/:id`

Removes a product from the database by its ID.

:::important Authorization Required
Requires **ADMIN** or **STAFF** role.
:::

### Path Parameters

* `id` (integer) - The database ID of the product.

### Responses

#### `200 OK`

```json
{
  "message": "Product deleted successfully",
  "status": "success"
}
```

#### `404 Not Found`

```json
{
  "error": true,
  "message": "Cannot delete product",
  "log": "Not Found",
  "status": "error",
  "code": 500
}
```
