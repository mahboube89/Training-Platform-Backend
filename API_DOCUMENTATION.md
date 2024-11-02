# Training-Platform-Backend

This API documentation provides a detailed overview of all available endpoints in the Training Platform API, including the required headers, request parameters, and response formats.

## API Endpoints

## Base URL
`http://localhost:4000/v1`

## Authentication

### Register a New User
- **URL**: http://localhost:4000/v1/auth/register
- **Method**: POST
- **Description**: Registers a new user in the platform by creating their account. This endpoint is accessible to anyone.
- **Headers**: None
- **Body Parameters**:
    - username (string, required): The username for the new user. It should be unique.
    - email (string, required): The user’s email address, which must be unique.
    - password (string, required): The password for the new account. The password will be hashed before storage.
**Response**:
    - Status 201: Returns a success message along with the user’s basic info (excluding sensitive data).
    - Status 409: Conflict if the email or username is already taken.
    - Status 422: Validation error if the input data doesn’t meet requirements.