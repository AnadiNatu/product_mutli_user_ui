# OrderFlow Premium - API Documentation

This document lists all the API endpoints required for the OrderFlow Premium application. These endpoints should be implemented in your backend to integrate with the frontend services.

## Base URL
`https://api.yourdomain.com/v1`

---

## 1. Authentication Service (`auth.service.ts`)

### Login
*   **Endpoint:** `POST /auth/login`
*   **Request Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
*   **Response:** `User` object with JWT token.

### Get Current User
*   **Endpoint:** `GET /auth/me`
*   **Headers:** `Authorization: Bearer <token>`
*   **Response:** `User` object.

### Get All Users (Admin Only)
*   **Endpoint:** `GET /users`
*   **Headers:** `Authorization: Bearer <admin_token>`
*   **Response:** `User[]`

---

## 2. Product Service (`product.service.ts`)

### Get All Products
*   **Endpoint:** `GET /products`
*   **Response:** `Product[]`

### Get Product by ID
*   **Endpoint:** `GET /products/:id`
*   **Response:** `Product`

### Add Product (Admin Only)
*   **Endpoint:** `POST /products`
*   **Request Body:** `Product` (without ID)
*   **Response:** `Product` (with generated ID)

### Update Product (Admin Only)
*   **Endpoint:** `PATCH /products/:id`
*   **Request Body:** `Partial<Product>`
*   **Response:** `Product`

### Delete Product (Admin Only)
*   **Endpoint:** `DELETE /products/:id`
*   **Response:** `204 No Content`

### Deduct Stock
*   **Endpoint:** `POST /products/:id/deduct`
*   **Request Body:** `{ "quantity": number }`
*   **Response:** `{ "success": boolean, "newStock": number }`

---

## 3. Order Service (`order.service.ts`)

### Get All Orders (Admin Only)
*   **Endpoint:** `GET /orders`
*   **Response:** `Order[]`

### Get User Orders
*   **Endpoint:** `GET /users/:userId/orders`
*   **Response:** `Order[]`

### Create Order
*   **Endpoint:** `POST /orders`
*   **Request Body:**
    ```json
    {
      "userId": "string",
      "items": [
        { "productId": "string", "quantity": number, "price": number, "name": "string" }
      ],
      "total": number
    }
    ```
*   **Response:** `Order`

### Update Order Status (Admin Only)
*   **Endpoint:** `PATCH /orders/:id/status`
*   **Request Body:** `{ "status": "pending" | "processing" | "shipped" | "delivered" | "cancelled" }`
*   **Response:** `Order`

---

## 4. Admin Service (`admin.service.ts`)

### Get CRM Logs
*   **Endpoint:** `GET /admin/logs`
*   **Response:** `CrmLog[]`

### Add CRM Log
*   **Endpoint:** `POST /admin/logs`
*   **Request Body:** `{ "action": string, "entity": string, "entityId": string, "details": string }`
*   **Response:** `CrmLog`

### Get System Health
*   **Endpoint:** `GET /admin/health`
*   **Response:** `SystemHealth`

---

## Data Models

### User
```typescript
{
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  avatar?: string;
}
```

### Product
```typescript
{
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  brand: string;
  manufacturedDate: string;
  addedDate: string;
}
```

### Order
```typescript
{
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}
```
