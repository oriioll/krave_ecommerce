---
sidebar_label: "PUT /products/slug/:slug"
sidebar_position: 6
---

# Update Product by Slug

<span class="api-badge api-badge--put">PUT</span> `/products/slug/:slug`

Modifies an existing product using its unique slug string.

:::important Authorization Required
Requires **ADMIN** or **STAFF** role.
:::

### Path Parameters

* `slug` (string) - The unique product slug.

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
Returned if the slug does not exist.

```json
{
  "error": true,
  "message": "Cannot put product with slug",
  "log": "Not Found",
  "status": "error",
  "code": 500
}
```
