---
sidebar_position: 1
slug: /
---

# KRAVE API Documentation

Welcome to the **KRAVE REST API** documentation. KRAVE is a modern e-commerce platform specializing in sports nutrition supplements.

This API handles product management, user authentication, shopping carts, and administrative dashboards.

## Base URL

All requests must be made to the following base URL:

```bash
http://localhost:3000
```

---

## Authentication & Security

KRAVE implements secure, stateful session-based authentication using **JSON Web Tokens (JWT)**. 

### JWT Cookie

Rather than using an `Authorization` header, the server transmits and verifies the JWT token inside an **HTTP-Only cookie** named `token`.
* **Development Mode:** Cookie is set with `SameSite: Lax` to allow secure local cross-origin communications from the frontend running on port `5173`.
* **Production Mode:** Cookie is set with `Secure` and `SameSite: None` over HTTPS.

:::important
Because authentication is cookie-based, standard web browsers will automatically attach the `token` cookie to subsequent API requests. For programmatic API clients (like Postman or curl), you must handle and forward the cookie manually.
:::

---

## Role-Based Access Control (RBAC)

The system features a three-tier role access model to secure endpoints:

| Role ID | Role Name | Description |
| :--- | :--- | :--- |
| **1** | `ADMIN` | Full system control. Access to administrative dashboards, user accounts, and product inventory. |
| **3** | `STAFF` | Product managers. Can create, edit, or delete supplements, but cannot manage other users. |
| **2** | `CUSTOMER` | Regular store users. Can view products, manage their personal shopping cart, and view their profile. |

---

## API Response Format

The API follows a standardized JSON response envelope.

### Success Response

For mutating requests (creates, updates, deletes), the response contains a success status and confirmation message:

```json
{
  "status": "success",
  "message": "Product created successfully"
}
```

For querying requests, the data is typically returned as a JSON array or object directly.

### Error Response

When an error occurs, the server responds with a descriptive message and error flags:

```json
{
  "status": "error",
  "message": "Unauthorized: Invalid or missing token",
  "error": true
}
```
