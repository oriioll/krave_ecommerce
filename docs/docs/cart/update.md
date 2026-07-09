---
sidebar_label: "PUT /cart/items/:productId"
sidebar_position: 3
---

# Update Item Quantity in Cart

<span class="api-badge api-badge--put">PUT</span> `/cart/items/:productId`

Sets the quantity of a specific product already in the cart.

### Path Parameters

* `productId` (integer) - The database ID of the product to modify.

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `quantity` | `integer` | **Yes** | The new quantity (must be greater than or equal to 1). |

```json
{
  "quantity": 3
}
```

### Responses

#### `200 OK`

```json
{
  "status": "success",
  "message": "Product quantity modified successfully"
}
```

#### `400 Bad Request`
Returned if path parameters, body values are invalid, or quantity is less than 1.

```json
{
  "status": "error",
  "message": "Lack of data or incorrect",
  "error": true
}
```

#### `404 Not Found`
Returned if the item does not exist inside the cart.

```json
{
  "error": true,
  "message": "Cannot update product in cart",
  "log": "Can't update product into cart (db) - product not found in cart",
  "status": "error",
  "code": 500
}
```
