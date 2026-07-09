---
sidebar_label: "PUT /products/:id"
sidebar_position: 5
---

# Update Product by ID

<span class="api-badge api-badge--put">PUT</span> `/products/:id`

Modifies an existing product using its numeric database ID.

:::important Authorization Required
Requires **ADMIN** or **STAFF** role.
:::

### Path Parameters

* `id` (integer) - The database ID of the product.

### Request Body
Requires a full product object (same schema as [Create Product](./create)).

### Responses

#### `200 OK`

```json
{
  "message": "Product updated successfully",
  "status": "success"
}
```

#### `404 Not Found`
Returned if the product ID does not exist.

```json
{
  "error": true,
  "message": "Cannot put product with id",
  "log": "Not Found",
  "status": "error",
  "code": 500
}
```
