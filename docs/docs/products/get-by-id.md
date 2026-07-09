---
sidebar_label: "GET /products/:id"
sidebar_position: 2
---

# Get Product by ID

<span class="api-badge api-badge--get">GET</span> `/products/:id`

Retrieves a single product's details by its numeric database ID.

### Path Parameters

* `id` (integer) - The database ID of the product.

### Responses

#### `200 OK`

```json
{
  "id": 1,
  "name": "Whey Protein Chocolate",
  "description": "Premium whey protein powder with rich chocolate flavor.",
  "price": 39.99,
  "main_image": "https://i.ibb.co/fYX4Pw50/main-Chocolate-Protein.png",
  "hover_image": null,
  "about_image": null,
  "info_image": "https://i.ibb.co/R8Dh7LK/macros-Chocolate-Protein.png",
  "weight": 1000,
  "slug": "whey-protein-chocolate"
}
```

#### `404 Not Found`
Returned if the product does not exist in the database.

```json
{
  "error": true,
  "message": "Cannot get product with id",
  "log": "Product 999 Not Found",
  "status": "error",
  "code": 500
}
```
