---
sidebar_label: "POST /cart/items"
sidebar_position: 2
---

# Add Product to Cart

<span class="api-badge api-badge--post">POST</span> `/cart/items`

Adds one unit of a product to the user's cart. If the product already exists in the cart, its quantity is incremented by 1.

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `product_id` | `integer` | **Yes** | The database ID of the product to add. |

```json
{
  "product_id": 1
}
```

### Responses

#### `200 OK`

```json
{
  "status": "success",
  "message": "Product added to cart successfully"
}
```

#### `404 Not Found`
Returned if the product could not be found or inserted database-side.

```json
{
  "error": true,
  "message": "Cannot add product to cart",
  "log": "Can't insert product into cart (db)",
  "status": "error",
  "code": 500
}
```
