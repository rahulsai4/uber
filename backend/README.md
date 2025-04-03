# Uber Backend Project

This document provides API documentation for the User and Captain Registration, Login, Profile, and Logout endpoints.

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

---

## Captain Registration Endpoint

**Endpoint:** `POST /captains/register`

### Description

This endpoint registers a new captain by validating the incoming data, hashing the password, creating the captain record, and generating a JSON Web Token for authentication.

### Request Data

-   **fullname** (object, required)
    -   **firstname** (string, required): Must be at least 3 characters long.
    -   **lastname** (string, optional): If provided, it should be at least 3 characters long.
-   **email** (string, required): Must be a valid email and at least 5 characters long.
-   **password** (string, required): Must be at least 6 characters long.
-   **vehicle** (object, required)
    -   **color** (string, required): Must be at least 3 characters long.
    -   **plate** (string, required): Must be at least 3 characters long.
    -   **capacity** (number, required): Must be at least 1.
    -   **vehicleType** (string, required): Must be one of `car`, `motorcycle`, or `auto`.

#### Sample Request Body

```json
{
    "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "password": "securepassword",
    "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
    }
}
```

### Response

#### Success Response

-   **Status Code:** `201 Created`
-   **Body:**

```json
{
    "captain": {
        "_id": "captainId",
        "fullname": {
            "firstname": "Jane",
            "lastname": "Doe"
        },
        "email": "jane.doe@example.com",
        "vehicle": {
            "color": "Red",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        }
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

## Captain Login Endpoint

**Endpoint:** `POST /captains/login`

### Description

This endpoint allows an existing captain to log in by validating their email and password. If the credentials are correct, a JSON Web Token is generated for authentication.

### Request Data

-   **email** (string, required): Must be a valid email.
-   **password** (string, required): Must be at least 6 characters long.

#### Sample Request Body

```json
{
    "email": "jane.doe@example.com",
    "password": "securepassword"
}
```

### Response

#### Success Response

-   **Status Code:** `200 OK`
-   **Body:**

```json
{
    "captain": {
        "_id": "captainId",
        "fullname": {
            "firstname": "Jane",
            "lastname": "Doe"
        },
        "email": "jane.doe@example.com",
        "vehicle": {
            "color": "Red",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        }
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

## Captain Profile Endpoint

**Endpoint:** `GET /captains/profile`

### Description

This endpoint retrieves the profile of the currently authenticated captain.

### Request Headers

-   **Authorization**: `Bearer <jwt_token>` (required)

### Response

#### Success Response

-   **Status Code:** `200 OK`
-   **Body:**

```json
{
    "_id": "captainId",
    "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
    }
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

## Captain Logout Endpoint

**Endpoint:** `GET /captains/logout`

### Description

This endpoint logs out the currently authenticated captain by blacklisting their token.

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
