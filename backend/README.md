# Uber Backend Project

This document provides API documentation for the User Registration, Login, Profile, and Logout endpoints.

---

## User Registration Endpoint

**Endpoint:** `POST /users/register`

### Description

This endpoint registers a new user by validating the incoming data, hashing the password, creating the user record, and generating a JSON Web Token for authentication.

### Request Data

-   **fullname** (object, required)
    -   **firstname** (string, required): Must be at least 3 characters long.
    -   **lastname** (string, optional): If provided, it should be at least 3 characters long.
-   **email** (string, required): Must be a valid email and at least 5 characters long.
-   **password** (string, required): Must be at least 6 characters long.

#### Sample Request Body

```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "yourpassword"
}
```

### Response

#### Success Response

-   **Status Code:** `201 Created`
-   **Body:**

```json
{
    "user": {
        "_id": "userId",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com"
    },
    "token": "jwt_token"
}
```

#### Error Responses

-   **Status Code:** `400 Bad Request`
    -   **Reason:** Validation errors in the request body.
    -   **Body:**
    ```json
    {
        "errors": [
            {
                "msg": "First Name must be at least 3 chars long",
                "param": "fullname.firstname",
                "location": "body"
            }
        ]
    }
    ```
-   **Status Code:** `500 Internal Server Error`
    -   **Reason:** Server-side error.
    -   **Body:**
    ```json
    {
        "error": "Internal Server Error"
    }
    ```

---

## User Login Endpoint

**Endpoint:** `POST /users/login`

### Description

This endpoint allows an existing user to log in by validating their email and password. If the credentials are correct, a JSON Web Token is generated for authentication.

### Request Data

-   **email** (string, required): Must be a valid email.
-   **password** (string, required): Must be at least 6 characters long.

#### Sample Request Body

```json
{
    "email": "john.doe@example.com",
    "password": "yourpassword"
}
```

### Response

#### Success Response

-   **Status Code:** `200 OK`
-   **Body:**

```json
{
    "user": {
        "_id": "userId",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com"
    },
    "token": "jwt_token"
}
```

#### Error Responses

-   **Status Code:** `400 Bad Request`
    -   **Reason:** Validation errors in the request body.
    -   **Body:**
    ```json
    {
        "errors": [
            {
                "msg": "Invalid Email",
                "param": "email",
                "location": "body"
            }
        ]
    }
    ```
-   **Status Code:** `401 Unauthorized`
    -   **Reason:** Invalid email or password.
    -   **Body:**
    ```json
    {
        "message": "Invalid Email or Password"
    }
    ```
-   **Status Code:** `500 Internal Server Error`
    -   **Reason:** Server-side error.
    -   **Body:**
    ```json
    {
        "error": "Internal Server Error"
    }
    ```

---

## User Profile Endpoint

**Endpoint:** `GET /users/profile`

### Description

This endpoint retrieves the profile of the currently authenticated user.

### Request Headers

-   **Authorization**: `Bearer <jwt_token>` (required)

### Response

#### Success Response

-   **Status Code:** `200 OK`
-   **Body:**

```json
{
    "_id": "userId",
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com"
}
```

#### Error Responses

-   **Status Code:** `401 Unauthorized`
    -   **Reason:** Missing or invalid token.
    -   **Body:**
    ```json
    {
        "message": "unauthorized"
    }
    ```

---

## User Logout Endpoint

**Endpoint:** `GET /users/logout`

### Description

This endpoint logs out the currently authenticated user by blacklisting their token.

### Request Headers

-   **Authorization**: `Bearer <jwt_token>` (required)

### Response

#### Success Response

-   **Status Code:** `200 OK`
-   **Body:**

```json
{
    "message": "Logged out"
}
```

#### Error Responses

-   **Status Code:** `401 Unauthorized`
    -   **Reason:** Missing or invalid token.
    -   **Body:**
    ```json
    {
        "message": "unauthorized"
    }
    ```
