# Training-Platform-Backend

This project implements the backend functionality for a comprehensive training platform, managing resources like users, tutorials, sections, comments, blogs, and newsletters. The API is structured for scalability and adheres to best practices for building RESTful APIs.

## Features
- User Authentication: Secure login and registration.
- Tutorial and Blog Management: CRUD operations for tutorials, sections, and blogs.
- Nested Comments: Enable threaded comments for tutorials and blogs.
- Notifications: Admin can send notifications to users.
- Newsletters: User subscriptions to a newsletter.
- Dynamic Menus and Categories: Configurable categories and menus for tutorials and blogs.
- Global Search: Search across all tutorials.


## Getting Started

### Installation

1- Clone the Repository:
```
git clone https://github.com/yourusername/training-platform-api.git
cd training-platform-api
```

2- Install Dependencies:
```
npm install
```

## Dependencies
```json
"dependencies": {
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "express-rate-limit": "^7.4.1",
    "fastest-validator": "^1.19.0",
    "joi": "^17.13.3",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.7.2",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.15",
    "slugify": "^1.6.6",
    "validator": "^13.12.0"
  }
```
- mongodb: Official MongoDB driver for Node.js. 


### Configuration
Set up Environment Variables: Create a .env file in the root directory based on the .env.example file, including:
```
PORT
MONGODB_URI
JWT_SECRET
```


### Usage
1- Start the Server:
npm run dev
2- Server Running:
By default, the server will run at http://localhost:4000. Test endpoints using tools like Postman or by integrating with your frontend.


### Instructions to Use MongoDB
Make sure MongoDB is installed and running locally or in the cloud (e.g., MongoDB Atlas, MongoDB Compass).
Adjust the `MONGODB_URL` in the `.env` file based on your MongoDB setup.
The database and collections will be automatically created based on the interactions with the system. No manual creation of collections is required.


### API Documentaion
The full API documentation can be found in the `API_DOCUMENTATION.md` file. This file contains details about each endpoint, required parameters, and expected responses.


## Database Structure
Here is an example structure for each collection in your MongoDB database:

Note: In MongoDB, every document in a collection automatically has an _id field, which serves as a unique identifier for that document. If you don't explicitly define an _id, MongoDB will create one for you.


#### users Collection:

```json
{
  "_id": {
    "$oid": "67195a8ee7cd2370bf1b26f7"
  },
  "username": "MissyC123",
  "email": "missycooper@gmail.com",
  "password": "$2b$10$2rt220rOOUCBL/LRtwtO2.S4hfKnieQrVG8fYUp64qVCieD.",
  "role": "ADMIN",
  "status": "ACTIVE",
  "createdAt": {
    "$date": "2024-10-23T20:20:30.621Z"
  },
  "updatedAt": {
    "$date": "2024-10-23T20:20:30.621Z"
  },
  "__v": 0
}
```


#### banusers Collection:
```json
{
  "_id": { "$oid": "64f4a5d7e9e3c9b1a7e3c9a2" },
  "email": "example@gmail.com",
  "bannedBy": { "$oid": "64f1c7d2e8b2a1c7d2e8b2a2" },
  "reason": "Violation of community guidelines",
  "isPermanent": false,
  "banExpiresAt": { "$date": "2024-09-01T10:15:00Z" },
  "createdAt": {
    "$date": "2024-10-23T20:20:30.621Z"
  },
  "updatedAt": {
    "$date": "2024-10-23T20:20:30.621Z"
  },
  "__v": 0
}
```


#### blogs Collection:
```json
{
  "_id": {
    "$oid": "672518a360a5c946af7bfb4c"
  },
  "title": "The Ultimate Guide to JavaScript",
  "description": "An in-depth look at JavaScript, covering everything from basics to advanced concepts.",
  "content": "JavaScript is a versatile programming language used for web development...",
  "authorId": {
    "$oid": "67195a8ee7cd2370bf1b26f7"
  },
  "categoryId": {
    "$oid": "671ce0c804a0f46a0f125d34"
  },
  "tags": [
    "css",
    "frontend"
  ],
  "coverImage": "1729985404569112.jpg",
  "isPublished": false,
  "views": 0,
  "likes": 0,
  "slug": "ultimate-guide-to-javascript",
  "createdAt": {
    "$date": "2024-11-01T18:06:27.303Z"
  },
  "updatedAt": {
    "$date": "2024-11-01T18:06:27.303Z"
  },
  "__v": 0
}
```


#### menus Collection:
```json
{
  "_id": {
    "$oid": "67263cbcde6f6ba36c2dac3f"
  },
  "title": "Desing",
  "path": "desing",
  "order": 1,
  "parentId": null,
  "categoryId": {
    "$oid": "671ce0f6e13ed5a39e6fc04a"
  },
  "createdAt": {
    "$date": "2024-11-02T14:52:44.447Z"
  },
  "updatedAt": {
    "$date": "2024-11-02T14:52:44.447Z"
  },
  "__v": 0
}
```


#### newsletters Collection:
```json
{
  "_id": {
    "$oid": "6723b63a0b93144fde529426"
  },
  "email": "miom542@gmail.com",
  "createdAt": {
    "$date": "2024-10-31T16:54:18.436Z"
  },
  "updatedAt": {
    "$date": "2024-10-31T16:54:18.436Z"
  },
  "__v": 0
}
```


#### notifications Collection:
```json
{
  "_id": {
    "$oid": "6723e4ab8eff878756fa6023"
  },
  "senderId": {
    "$oid": "67195a8ee7cd2370bf1b26f7"
  },
  "recipientId": {
    "$oid": "67195ae1e7cd2370bf1b26fc"
  },
  "role": "INSTRUCTOR",
  "title": "notification title",
  "message": "Please update the tutorial.",
  "isRead": true,
  "type": "REMINDER",
  "createdAt": {
    "$date": "2024-10-31T20:12:27.672Z"
  },
  "updatedAt": {
    "$date": "2024-10-31T20:21:30.058Z"
  },
  "__v": 0
}
```


#### sections Collection:
```json
{
  "_id": {
    "$oid": "671fbb1d258ead6cdf8c1ba7"
  },
  "title": "section title",
  "video": "1730132764984235.MP4",
  "duration": 1200,
  "isFree": true,
  "tutorialId": {
    "$oid": "671d7b063ae0127f2f38a641"
  },
  "createdAt": {
    "$date": "2024-10-28T16:26:05.066Z"
  },
  "updatedAt": {
    "$date": "2024-10-28T16:26:05.066Z"
  },
  "__v": 0
}
```


#### tutorials Collection:
```json
{
  "_id": {
    "$oid": "671d7b063ae0127f2f38a641"
  },
  "title": "Introduction to Node.js",
  "description": "A beginner-friendly tutorial on getting started with Node.js, covering the basics and core concepts.",
  "cover": "1729985286164684.jpg",
  "categoryId": {
    "$oid": "671ce0f6e13ed5a39e6fc04a"
  },
  "slug": "introduction-to-nodejs",
  "price": 56,
  "isFree": false,
  "status": "COMPLETE",
  "onSale": false,
  "createdBy": {
    "$oid": "67195a8ee7cd2370bf1b26f7"
  },
  "createdAt": {
    "$date": "2024-10-26T23:28:06.211Z"
  },
  "updatedAt": {
    "$date": "2024-10-26T23:28:06.211Z"
  },
  "__v": 0,
  "instructorId": {
    "$oid": "67195ae1e7cd2370bf1b26fc"
  }
}
```


#### usertutorials Collection:
```json
{
  "_id": {
    "$oid": "67210c8dcb659c22b9cb32c8"
  },
  "userId": {
    "$oid": "671a2cb5c0aee1504b45761a"
  },
  "tutorialId": {
    "$oid": "671d7b063ae0127f2f38a641"
  },
  "price": 56,
  "progress": 0,
  "createdAt": {
    "$date": "2024-10-29T16:25:49.367Z"
  },
  "updatedAt": {
    "$date": "2024-10-29T16:25:49.367Z"
  },
  "__v": 0
}
```


#### comments Collection:
```json
{
  "_id": {
    "$oid": "67250eee9aab23191fb8f269"
  },
  "body": "This is a main comment.",
  "referenceType": "BLOG",
  "referenceId": {
    "$oid": "672413173028b452d485b0a1"
  },
  "userId": {
    "$oid": "67195a8ee7cd2370bf1b26f7"
  },
  "isAccepted": false,
  "review": 3,
  "parentCommentId": null,
  "createdAt": {
    "$date": "2024-11-01T17:25:02.960Z"
  },
  "updatedAt": {
    "$date": "2024-11-01T17:25:02.960Z"
  },
  "__v": 0
}

```


#### categories Collection:
```json
{
  "_id": {
    "$oid": "671ce0c804a0f46a0f125d34"
  },
  "title": "frontend",
  "slug": "front-end",
  "createdAt": {
    "$date": "2024-10-26T12:30:00.389Z"
  },
  "updatedAt": {
    "$date": "2024-10-26T12:30:00.389Z"
  },
  "__v": 0
}
```


#### contactus Collection:
```json
{
  "_id": {
    "$oid": "67238506ac51b1c4c62974cb"
  },
  "name": "minoo",
  "email": "minoo@gmail.com",
  "hasResponse": false,
  "body": "I would like more information about the available training programs.",
  "createdAt": {
    "$date": "2024-10-31T13:24:22.288Z"
  },
  "updatedAt": {
    "$date": "2024-10-31T13:24:22.288Z"
  },
  "__v": 0
}
```


## License
This project is licensed under the MIT License. See the LICENSE file for details.
