---
sidebar_label: "DELETE /products/slug/:slug"
sidebar_position: 8
---

# Delete Product by Slug

<span class="api-badge api-badge--delete">DELETE</span> `/products/slug/:slug`

Removes a product from the database by its unique slug string.

:::important Authorization Required
Requires **ADMIN** or **STAFF** role.
:::

### Path Parameters

* `slug` (string) - The unique product slug.

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
  "message": "Cannot delete product with slug",
  "log": "Not Found",
  "status": "error",
  "code": 500
}
```
