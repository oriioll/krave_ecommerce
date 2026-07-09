---
sidebar_label: "POST /products"
sidebar_position: 4
---

# Create Product

<span class="api-badge api-badge--post">POST</span> `/products`

Creates a new supplement product.

:::important Authorization Required
Requires either **ADMIN** or **STAFF** role. The user session token must be present in request cookies.
:::

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Yes** | Product name. |
| `description` | `string` | **Yes** | Detailed description. |
| `slug` | `string` | **Yes** | Unique URL slug identifier. |
| `main_image` | `string` | **Yes** | URL of the primary image. |
| `price` | `number` | **Yes** | Selling price (must be greater than 0). |
| `weight` | `number` | **Yes** | Net weight in grams (must be greater than or equal to 0). |
| `hover_image` | `string` | No | URL of the image displayed on card hover. |
| `about_image` | `string` | No | URL of the image for detail sections. |
| `info_image` | `string` | No | URL of the supplement facts / macros panel image. |

```json
{
  "name": "Creatine Monohydrate",
  "description": "Pure micronized creatine monohydrate to improve athletic performance.",
  "slug": "creatine-monohydrate",
  "main_image": "https://example.com/creatine-main.png",
  "price": 24.99,
  "weight": 500,
  "info_image": "https://example.com/creatine-macros.png"
}
```

### Responses

#### `201 Created`

```json
{
  "message": "Product created successfully",
  "status": "success"
}
```

#### `401 Unauthorized`
Returned if the session cookie is missing or invalid.

```json
{
  "error": true,
  "status": "error",
  "message": "Unauthorized: Invalid or missing token"
}
```

#### `403 Forbidden`
Returned if the authenticated user does not have `admin` or `staff` privileges.

```json
{
  "error": true,
  "status": "error",
  "message": "Forbidden"
}
```
