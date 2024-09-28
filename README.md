# Backend Service API Documentation

This README provides an overview of the backend service API endpoints, their functionalities, and examples of how to use them.

## Getting Started

To use this API, make sure you have the following prerequisites:

1. Node.js installed
2. MongoDB database
3. Necessary environment variables set up (e.g., database connection string, JWT secret)

### Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Set up your environment variables
4. Run `npm run dev` to start the development server with hot-reloading
5. For production, use `npm start` to run the server

### Dependencies

This project uses the following main dependencies:

- Express.js for the web server
- Mongoose for MongoDB object modeling
- Bcrypt for password hashing
- JSON Web Token (JWT) for authentication
- Nodemailer for sending emails
- Stripe for payment processing
- Express Validator for input validation

For a full list of dependencies and their versions, refer to the `package.json` file.

## Authentication

Most endpoints require authentication. Use the login endpoint to obtain a JWT token, and include it in the Authorization header of your requests:

```
Authorization: Bearer <your_token_here>
```

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of requests. Detailed error messages are provided in the response body for easier debugging.

## Table of Contents

1. [Profile Service](#profile-service)
2. [Availability Settings](#availability-settings)
3. [Registration Service](#registration-service)
4. [Authentication](#authentication-1)
5. [Verification](#verification)
6. [Services](#services)
7. [Order Service](#order-service)
8. [Review Service](#review-service)
9. [Credential Management](#credential-management)
10. [Payment](#payment)

## Profile Service

### Update Profile
- **Endpoint**: `PATCH /api/v1/profile/:id`
- **Example**:
  ```json
  {
    "username": "user5"
  }
  ```

### Get Single Profile
- **Endpoint**: `GET /api/v1/profile/:username`
- **Example**: No body required

### Delete Profile
- **Endpoint**: `PATCH /api/v1/profile/:username`
- **Example**: No body required

### Add Social Link
- **Endpoint**: `POST /api/v1/profile/social/`
- **Example**:
  ```json
  {
    "username": "cornell",
    "platform": "medium",
    "url": "www.medium.com"
  }
  ```

### Delete Social Link
- **Endpoint**: `DELETE /api/v1/profile/social/`
- **Example**:
  ```json
  {
    "username": "cornell",
    "platform": "facebook",
    "url": "www.facebook.com"
  }
  ```

## Availability Settings

### Add Availability
- **Endpoint**: `POST /api/v1/profile/availability/:username`
- **Example**:
  ```json
  {
    "duration": "2_weeks",
    "daysAvailability": [
      {
        "day": "Monday",
        "timeSlots": [
          { "start": "09:00", "end": "12:00" },
          { "start": "14:00", "end": "17:00" }
        ]
      },
      {
        "day": "Wednesday",
        "timeSlots": [
          { "start": "10:00", "end": "15:00" }
        ]
      }
    ]
  }
  ```

### Update Availability
- **Endpoint**: `PATCH /api/v1/profile/availability/:username/:availabilityId`
- **Example**:
  ```json
  {
    "duration": "3_weeks",
    "daysAvailability": [
      {
        "day": "Monday",
        "timeSlots": [
          { "start": "10:00", "end": "13:00" },
          { "start": "15:00", "end": "18:00" }
        ]
      }
    ]
  }
  ```

### Get All Availability
- **Endpoint**: `GET /api/v1/profile/availability/:username/`
- **Example**: No body required

## Registration Service

### Create User
- **Endpoint**: `POST /api/v1/register`
- **Example**:
  ```json
  {
    "firstname": "user4",
    "lastname": "m",
    "email": "04@gmail.com",
    "password": "1234"
  }
  ```

### Check Email Uniqueness
- **Endpoint**: `GET /api/v1/register/isEmailAvailable`
- **Example**:
  ```json
  {
    "email": "04@gmail.com"
  }
  ```

### Check Username Availability
- **Endpoint**: `GET /api/v1/register/isUsernameAvailable`
- **Example**:
  ```json
  {
    "username": "ronan"
  }
  ```

## Authentication

### Sign In
- **Endpoint**: `POST /api/v1/auth/login`
- **Example**:
  ```json
  {
    "identifier": "cornell",
    "password": "1234"
  }
  ```

### Get Logged User
- **Endpoint**: `GET /api/v1/auth/logged-user`
- **Example**: No body required (requires authentication token in header)

## Verification

### Send Email Verification
- **Endpoint**: `GET /api/v1/verify/:username`
- **Example**: No body required

### Verify Account
- **Endpoint**: `POST /api/v1/verify/?username=:username&verificationCode=:code`
- **Example**: No body required (parameters in URL)

## Services

### Priority Message Service
#### Create Priority Message
- **Endpoint**: `POST /api/v1/service/text/:username`
- **Example**:
  ```json
  {
    "title": "Final test pm serviceservice",
    "price": "100"
  }
  ```

#### Update Priority Message
- **Endpoint**: `PATCH /api/v1/service/text/?pmserviceId=:id&username=:username`
- **Example**:
  ```json
  {
    "totalBookings": "123"
  }
  ```

### Call Service
#### Create Call Service
- **Endpoint**: `POST /api/v1/service/call/:username`
- **Example**:
  ```json
  {
    "title": "calls",
    "price": "100"
  }
  ```

#### Update Call Service
- **Endpoint**: `PATCH /api/v1/service/call/?callserviceId=:id&username=:username`
- **Example**:
  ```json
  {
    "totalBookings": "123"
  }
  ```

### Digital Document Service
#### Create Digital Document
- **Endpoint**: `POST /api/v1/service/document/:username`
- **Example**:
  ```json
  {
    "title": "Dsa road map for advance learners",
    "price": "2000"
  }
  ```

#### Update Digital Document
- **Endpoint**: `PATCH /api/v1/service/document/?documentserviceId=:id&username=:username`
- **Example**:
  ```json
  {
    "totalBookings": "123"
  }
  ```

## Order Service

### Create Order
- **Endpoint**: `POST /api/v1/order/:username`
- **Example**:
  ```json
  {
    "orderType": "pMessage",
    "username": "cornell",
    "price": "100",
    "orderDate": "1519211809934"
  }
  ```

### Update Order
- **Endpoint**: `PATCH /api/v1/order/?orderId=:id&username=:username`
- **Example**:
  ```json
  {
    "orderType": "pMessage",
    "customerEmail": "customer01@gmail.com"
  }
  ```

## Review Service

### Post Review
- **Endpoint**: `POST /api/v1/review/?orderId=:id&username=:username`
- **Example**:
  ```json
  {
    "reviewerName": "customer 2",
    "rating": 5,
    "reviewDescription": "he is the best"
  }
  ```

## Credential Management

### Change Password (Logged User)
- **Endpoint**: `POST /api/v1/profile/change-password/`
- **Example**:
  ```json
  {
    "password": "1234567"
  }
  ```

### Send Reset Password Email
- **Endpoint**: `POST /api/v1/profile/send-reset-password-email/`
- **Example**:
  ```json
  {
    "identifier": "cornell"
  }
  ```

### Reset Password
- **Endpoint**: `POST /api/v1/profile/reset-password/:token/:id`
- **Example**:
  ```json
  {
    "password": "1234"
  }
  ```

## Payment

### Create Checkout Session
- **Endpoint**: `POST /api/v1/payment/create-checkout-session`
- **Example**:
  ```json
  {
    "orderId": "66f5794354ab4ec7e28f03f6"
  }
  ```

### Cancel Payment
- **Endpoint**: `GET /api/v1/payment/cancelpayment/:orderId`
- **Example**: No body required (orderId in URL)

### Payment Success
- Endpoint not specified, needs to be updated

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.