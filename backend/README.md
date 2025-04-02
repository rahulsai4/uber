# Uber Backend Project

This document provides API documentation for the User Registration endpoint.

## User Registration Endpoint

**Endpoint:** `POST /user/register`

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
