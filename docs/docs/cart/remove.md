---
sidebar_label: "DELETE /cart/items/:productId"
sidebar_position: 4
---

# Remove Product from Cart

<span class="api-badge api-badge--delete">DELETE</span> `/cart/items/:productId`

Removes a specific product item entirely from the cart, regardless of its quantity.

### Path Parameters

* `productId` (integer) - The database ID of the product to remove.

### Responses

#### `200 OK`

```json
{
  "status": "success",
  "message": "Product product removed from cart successfully"
}
```

#### `404 Not Found`
Returned if the product is not in the cart.

```json
{
  "error": true,
  "message": "Cannot delete product from cart",
  "log": "Can't delete cart item",
  "status": "error",
  "code": 500
}
```
