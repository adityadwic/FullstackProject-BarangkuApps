# API Documentation

## Authentication Endpoints

### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "password": "string (required, min 6 characters)",
  "role": "string (optional, default: 'user')"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "role": "user"
  },
  "token": "jwt_token"
}
```

### POST /auth/login
Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "role": "user"
  },
  "token": "jwt_token"
}
```

## Barang (Items) Endpoints

### GET /barang
Get all items with pagination support.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term for item names

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "item_id",
      "nama": "Item Name",
      "deskripsi": "Item Description",
      "harga": 100000,
      "stok": 50,
      "kategori": "Category",
      "gambar": "image_url",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### GET /barang/:id
Get specific item by ID.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "item_id",
    "nama": "Item Name",
    "deskripsi": "Item Description",
    "harga": 100000,
    "stok": 50,
    "kategori": "Category",
    "gambar": "image_url",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### POST /barang
Create new item (Admin only).

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "nama": "string (required)",
  "deskripsi": "string (optional)",
  "harga": "number (required)",
  "stok": "number (required)",
  "kategori": "string (required)",
  "gambar": "string (optional, image URL)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Item created successfully",
  "data": {
    "id": "item_id",
    "nama": "Item Name",
    "deskripsi": "Item Description",
    "harga": 100000,
    "stok": 50,
    "kategori": "Category",
    "gambar": "image_url",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### PUT /barang/:id
Update existing item (Admin only).

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "nama": "string (optional)",
  "deskripsi": "string (optional)",
  "harga": "number (optional)",
  "stok": "number (optional)",
  "kategori": "string (optional)",
  "gambar": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Item updated successfully",
  "data": {
    "id": "item_id",
    "nama": "Updated Item Name",
    "deskripsi": "Updated Description",
    "harga": 150000,
    "stok": 75,
    "kategori": "Updated Category",
    "gambar": "updated_image_url",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### DELETE /barang/:id
Delete item (Admin only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Item deleted successfully"
}
```

## Error Responses

### Authentication Errors
```json
{
  "success": false,
  "message": "Unauthorized access",
  "error": "TOKEN_REQUIRED"
}
```

### Validation Errors
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

### Not Found Errors
```json
{
  "success": false,
  "message": "Item not found",
  "error": "NOT_FOUND"
}
```

### Server Errors
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "INTERNAL_ERROR"
}
```

## Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

## Rate Limiting
- Authentication endpoints: 10 requests per minute
- General API endpoints: 100 requests per minute
- Admin endpoints: 50 requests per minute

## Authentication
All protected endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

Tokens expire after 24 hours and need to be refreshed by logging in again.