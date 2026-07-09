---
sidebar_label: "GET /products/slug/:slug"
sidebar_position: 3
---

# Get Product by Slug

<span class="api-badge api-badge--get">GET</span> `/products/slug/:slug`

Retrieves a single product's details by its unique URL-friendly string identifier (slug).

### Path Parameters

* `slug` (string) - The unique slug representing the product (e.g., `whey-protein-chocolate`).

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
Returned if the slug does not exist.

```json
{
  "error": true,
  "message": "Cannot get product with slug",
  "log": "Product non-existent-slug Not Found",
  "status": "error",
  "code": 500
}
```
