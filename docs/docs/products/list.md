---
sidebar_label: "GET /products"
sidebar_position: 1
---

# Get All Products

<span class="api-badge api-badge--get">GET</span> `/products`

Returns a list of all products in the database.

### Responses

#### `200 OK`

```json
[
  {
    "id": 1,
    "name": "Whey Protein Chocolate",
    "description": "Premium whey protein powder with rich chocolate flavor. 25g of protein per serving.",
    "price": 39.99,
    "main_image": "https://i.ibb.co/fYX4Pw50/main-Chocolate-Protein.png",
    "hover_image": null,
    "about_image": null,
    "info_image": "https://i.ibb.co/R8Dh7LK/macros-Chocolate-Protein.png",
    "weight": 1000,
    "slug": "whey-protein-chocolate"
  },
  {
    "id": 2,
    "name": "Whey Protein Vanilla",
    "description": "Premium whey protein powder with smooth vanilla flavor.",
    "price": 39.99,
    "main_image": "https://i.ibb.co/4gMxbHbK/main-Vanilla-Protein.png",
    "hover_image": null,
    "about_image": null,
    "info_image": "https://i.ibb.co/tTGWwvFm/macros-Vanilla-Protein.png",
    "weight": 1000,
    "slug": "whey-protein-vanilla"
  }
]
```
