# Training-Platform-Backend

This API documentation provides a detailed overview of all available endpoints in the Training Platform API, including the required headers, request parameters, and response formats.

## API Endpoints

## Base URL
`http://localhost:4000/v1`


## Authentication APIs

### Register a New User (Public)
- **URL**: `http://localhost:4000/v1/auth/register`
- **Method**: POST
- **Description**: Registers a new user in the platform by creating their account. This endpoint is accessible to anyone.
- **Headers**: Content-Type: application/json
- **Body Parameters**:
    - name: (string, optional): The full name of the user.
    - username (string, required): The username for the new user. It should be unique.
    - email (string, required): The user’s email address, which must be unique.
    - password (string, required): The password for the new account. The password will be hashed before storage.
- **Response**:
    - Status 201 (Created): Returns a success message along with the user’s basic info (excluding sensitive data).
    - Status 400 (Bad Request): Missing required fields or invalid field types.
    - Status 403 (Forbidden): The user's account is banned, preventing register.
    - Status 409 (Conflict): Duplicate email or username exists.
    - Status 422 (Unprocessable Entity): Validation error if the input data doesn’t meet requirements.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Log In an Existing User (Authenticated users only)
- **URL**: `http://localhost:4000/v1/auth/login`
- **Method**: POST
- **Description**: Authenticates an existing user and returns a JWT token to allow access to protected routes.
- **Headers**: Content-Type: application/json
- **Body Parameters**:
    - indentifier (string, required): The user’s email address or user's username.
    - password (string, required): The user’s password.
- **Response**:
    - Status 200 (OK): Successful authentication. Returns a JWT token for access to protected routes and basic user info.
    - Status 400 (Bad Request): Missing required fields.
    - Status 401 (Unauthorized): Invalid email or password.
    - Status 404 (Not Found): User not found.
    - Status 403 (Forbidden): The user's account is banned, preventing login or access to resources.
    - Status 422 (Unprocessable Entity): Validation error if the input data is invalid.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.



## Blog APIs

### Create a Blog Post (Admin or Author Only)
- **URL**: `http://localhost:4000/v1/blog`
- **Method**: POST
- **Description**: Create a new blog post.
- **Headers**: Content-Type: multipart/form-data
- **Authorization**: Required (Admin or Author role)
- **Body Parameters**:
    - title (string, required): Title of the blog post.
    - description (string, required): Short description of the blog.
    - content (string, required): Main content of the blog.
    - categoryId (string, required): ID of the category the blog belongs to.
    - tags (array of strings, optional): Tags associated with the blog.
    - coverImage (file, required): Cover image for the blog.
- **Response**:
    - Status 201 (Created): Blog successfully created.
    - Status 400 (Bad Request): Missing cover image.
    - Status 409 (Conflict): Blog with the same title already exists.
    - Status 404 (Not Found): Category ID is invalid.
    - Status 422 (Unprocessable Entity): Validation error for request fields.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Get All Blog Posts (Public)
- **URL**: `http://localhost:4000/v1/blog`
- **Method**: GET
- **Description**: Retrieve all blog posts.
- **Headers**: Content-Type: multipart/form-data
- **Authorization**: Not required
- **Body Parameters**: No parameters or body required.
- **Response**:
    - Status 200 (OK): Successfully retrieved all blog posts.
    - Status 404 (Not Found): No blogs found.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Get Single Blog Post by blog slug (Public)
- **URL**: `http://localhost:4000/v1/blog/:slug`
- **Method**: GET
- **Description**: Retrieve a single blog post by its slug.
- **Headers**: Content-Type: multipart/form-data
- **Authorization**: Not required
- **Path Parameters**: slug (string): Unique slug for the blog post.
- **Body Parameters**: No parameters or body required.
- **Response**:
    - Status 200 (OK): Blog post retrieved successfully.
    - Status 404 (Not Found): Blog not found.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Edit a Blog Post (Admin or Author Only)
- **URL**: `http://localhost:4000/v1/blog/:blogId`
- **Method**: PUT
- **Description**: Edit an existing blog post. Only fields provided in the request body will be updated.
- **Headers**: Content-Type: multipart/form-data
- **Authorization**: Required (Admin or author role)
- **Path Parameters**: blogId (string): ID of the blog to edit.
- **Body Parameters** (Only fields to be updated):
    - title (string, optional): Updated title of the blog.
    - description (string, optional): Updated description.
    - content (string, optional): Updated content.
    - categoryId (string, optional): Updated category ID.
    - tags (array of strings, optional): Updated tags.
    - coverImage (file, optional): Updated cover image.
- **Response**:
    - Status 200 (OK): Blog updated successfully.
    - Status 404 (Not Found): Blog or category not found.
    - Status 422 (Unprocessable Entity):  Invalid blog ID or validation error.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.



## Tutorial APIs

### Create a new tutorial with cover upload (Restricted to ADMIN and INSTRUCTOR)
- **URL**: `http://localhost:4000/v1/tutorial/create`
- **Method**: POST
- **Description**: Creates a new tutorial.
- **Headers**: Content-Type: multipart/form-data
- **Authorization**: Required (Admin and instructor only)
- **Path Parameters**: No parameters required.
- **Body Parameters**:
    - title (String, required): The title of the tutorial, should be unique within its category.
    - description (String, required): A brief description of the tutorial content.
    - instructorId (String, required): The ObjectId of the instructor who created the tutorial. This ID links to the instructor’s record in the users collection.
    - categoryId (String, required): The ObjectId of the category this tutorial belongs to, linking to a record in the categories collection.
    - price (Number, optional): The price of the tutorial. Only required if isFree is set to false.
    - isFree (Boolean, optional): A flag to indicate if the tutorial is free. If true, the price is automatically set to 0.
    - status (String, required): The publication status of the tutorial. Expected values are "COMPLETE" or "INCOMPLETE", indicating if the tutorial content is fully available or still under development.
    - onSale (Boolean, optional): A flag to indicate if the tutorial is on sale, which can be used to apply a discount or promotional pricing.
- **Response**:
    - Status 201 (Created): Tutorial created successfully.
    - Status 400 (Bad Request): Missing cover image.
    - Status 422 (Unprocessable Entity): Validation error 
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Retrieve all tutorials (Restricted to ADMIN)
- **URL**: `http://localhost:4000/v1/tutorial`
- **Method**: POST
- **Description**: Retrieves all tutorials with instructor and category details.
- **Headers**: Content-Type: multipart/form-data
- **Authorization**: Required (Admin only)
- **Path Parameters**: No parameters required.
- **Body Parameters**: No body required.
- **Response**:
    - Status 200 (OK): List of tutorials retrieved.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Retrieve all tutorial sections (Restricted to ADMIN)
- **URL**: `http://localhost:4000/v1/tutorial/sections`
- **Method**: GET
- **Description**: Retrieves all sections for tutorials.
- **Headers**: Content-Type: multipart/form-data
- **Authorization**: Required (Admin only)
- **Path Parameters**: No parameters required.
- **Body Parameters**: No body required.
- **Response**:
    - Status 200 (OK): Sections retrieved.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Add a new section to a specific tutorial (Restricted to ADMIN and INSTRUCTOR)
- **URL**: `http://localhost:4000/v1/tutorial/:tutorialId/sections`
- **Method**: POST
- **Description**: Adds a section to a specific tutorial.
- **Headers**: Content-Type: multipart/form-data
- **Authorization**: Required (Admin and instructor only)
- **Path Parameters**: tutorialId (string)
- **Body Parameters**: 
    - title (String, required): The title of the section, should be unique within this tutorial. 
    - duration (Number, required): The length of the video or content in seconds.
    - isFree (Boolean, optional): A flag to indicate if this section is free to view without enrollment.
- **Response**:
    - Status 200 (OK): Section created successfully.
    - Status 422 (Unprocessable Entity): Invalid tutorial ID
    - Status 409 (Conflict): Duplicate section error.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Get details of a specific tutorial section (Public)
- **URL**: `http://localhost:4000/v1/tutorial/:tutorialSlug/sections/:sectionId`
- **Method**: GET
- **Description**: Retrieves information about a specific section in a tutorial.
- **Headers**: Content-Type: multipart/form-data
- **Authorization**: Not required
- **Path Parameters**:
    - tutorialSlug (string)
    - sectionId (string)
- **Body Parameters**: No body required.
- **Response**:
    - Status 200 (OK): Section information retrieved.
    - Status 404 (Not Found): Tutorial or section not found.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Delete a specific section (Restricted to ADMIN)
- **URL**: `http://localhost:4000/v1/tutorial/sections/:sectionId`
- **Method**: DELETE
- **Description**: Deletes a section from a tutorial.
- **Headers**: Content-Type: application/json
- **Authorization**: Required (Admin only)
- **Path Parameters**: sectionId (string)
- **Body Parameters**: No body required.
- **Response**:
    - Status 200 (OK): Section deleted.
    - Status 404 (Not Found):  Section not found.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Enroll in a tutorial (Authenticated users only)
- **URL**: `http://localhost:4000/v1/tutorial/:tutorialId/enroll`
- **Method**: POST
- **Description**: Enrolls the current user in a specific tutorial.
- **Headers**: Content-Type: application/json
- **Authorization**: Not Required
- **Path Parameters**: tutorialId (string)
- **Body Parameters**: No body required.
- **Response**:
    - Status 201 (Created): Enrollment successful.
    - Status 403 (Forbidden): The user's account is banned, preventing register.
    - Status 409 (Conflict): User already enrolled.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Get tutorials by category (Public)
- **URL**: `http://localhost:4000/v1/tutorial/category/:categorySlug`
- **Method**: GET
- **Description**: Retrieves tutorials under a specific category.
- **Headers**: Content-Type: multipart/form-data
- **Authorization**: Not Required
- **Path Parameters**: categorySlug (string)
- **Body Parameters**: No body required.
- **Response**:
    - Status 200 (OK): Successfully tutorials retrieved for category.
    - Status 404 (Not Found): Category not found.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Get detailed information for a specific tutorial (Public)
- **URL**: `http://localhost:4000/v1/tutorial/details/:tutorialSlug`
- **Method**: GET
- **Description**: Retrieves detailed information for a specific tutorial.
- **Headers**: Content-Type: multipart/form-data
- **Authorization**: Not Required
- **Path Parameters**: tutorialSlug (string)
- **Body Parameters**: No body required.
- **Response**:
    - Status 200 (OK): Tutorial details retrieved.
    - Status 404 (Not Found): Tutorial not found.
    - Status 403 (Forbidden): Access denied.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Delete a tutorial (Restricted to ADMIN)
- **URL**: `http://localhost:4000/v1/tutorial/:tutorialId`
- **Method**: DELETE
- **Description**: Deletes a tutorial by ID.
- **Headers**: Content-Type: multipart/form-data
- **Authorization**: Required (Admin only)
- **Path Parameters**: tutorialId (string)
- **Body Parameters**: No body required.
- **Response**:
    - Status 200 (OK): Tutorial deleted.
    - Status 404 (Not Found): Tutorial not found.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### get related tutorials (Public)
- **URL**: `http://localhost:4000/v1/tutorial/:tutorialId`
- **Method**: GET
- **Description**: Retrieves tutorials related to a given tutorial based on category.
- **Headers**: Content-Type: multipart/form-data
- **Authorization**: Not Required
- **Path Parameters**: tutorialId (string)
- **Body Parameters**: No body required.
- **Response**:
    - Status 200 (OK): Related tutorials retrieved.
    - Status 404 (Not Found): Main tutorial not found.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.



## User APIs

### Retrieve all users (Restricted to ADMIN)
- **URL**: `http://localhost:4000/v1/users`
- **Method**: GET
- **Description**: Retrieves a list of all users without their password or other sensitive data.
- **Headers**: Content-Type: application/json
- **Authorization**: Required (Admin only)
- **Path Parameters**: contentId (string): ID of the tutorial to which the comment is added.
- **Body Parameters**: No body required.
- **Response**:
    - Status 200 (OK): Returns an array of user objects with selected fields.
    - Status 404 (Not Found): No user to display.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Update user information (Authenticated users only)
- **URL**: `http://localhost:4000/v1/users`
- **Method**: POST
- **Description**: Adds a comment to a specific tutorial.
- **Headers**: Content-Type: application/json
- **Authorization**: Not Required
- **Path Parameters**: contentId (string): ID of the tutorial to which the comment is added.
- **Body Parameters**:
    - body (string, required): Content of the comment.
    - review (number, optional): Rating given to the tutorial.
    - parentCommentId (string, optional): ID of the parent comment if this comment is a reply.
- **Response**:
    - Status 200 (OK): Comment added successfully.
    - Status 404 (Not Found): Tutorial not found or parent comment not found.
    - Status 403 (Forbidden): User is banned from commenting.
    - Status 422 (Unprocessable Entity): Validation error for the comment.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Remove a specific user (Restricted to ADMIN)
- **URL**: `http://localhost:4000/v1/users/:id`
- **Method**: DELETE
- **Description**: Deletes a user and removes them from the banned users collection if applicable.
- **Headers**: Content-Type: application/json
- **Authorization**: Required (Admin only)
- **Path Parameters**: id (String, required): User ID of the user to delete.
- **Body Parameters**: No body required.
- **Response**:
    - Status 200 (OK): User deleted successfully.
    - Status 404 (Not Found): User not found to delete.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Ban a specific user (Restricted to ADMIN)
- **URL**: `http://localhost:4000/v1/users/ban/:id`
- **Method**: POST
- **Description**: Bans a user by setting their status to BANNED.
- **Headers**: Content-Type: application/json
- **Authorization**: Required (Admin only)
- **Path Parameters**: id (String, required): User ID of the user to ban
- **Body Parameters**:
    - reason (String, required): Reason for banning the user.
    - banExpiresAt (Date, optional): Expiration date of the ban (for temporary bans).
- **Response**:
    - Status 200 (OK): User banned successfully.
    - Status 404 (Not Found): User not found.
    - Status 400 (Bad Request): Reason for ban is required.
    - Status 409 (Conflict): User is already banned.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Change a user's role to "Author" (Restricted to ADMIN)
- **URL**: `http://localhost:4000/v1/users/role`
- **Method**: PUT
- **Description**: Changes a user's role to AUTHOR.
- **Headers**: Content-Type: application/json
- **Authorization**: Required (Admin only)
- **Path Parameters**: id (String, required): User ID of the user to be made an author.
- **Body Parameters**: No body required.
- **Response**:
    - Status 200 (OK): Role changed to author successfully.
    - Status 400 (Bad Request): User ID is required.
    - Status 404 (Not Found): User not found.
    - Status 409 (Conflict): User is banned.
    - Status 422 (Unprocessable Entity): Cannot change role of an admin if the user is an admin.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.



## Category APIs

### Create a new category (Protected, Admin only)
- **URL**: `http://localhost:4000/v1/category`
- **Method**: POST
- **Description**:  Create a new category.
- **Headers**: Content-Type: application/json
- **Authorization**: Required (Admin only)
- **Body Parameters**:
    - title (string, required): Title of the category.
- **Response**:
    - Status 201 (Created): Category successfully created.
    - Status 409 (Conflict):  Category with the same title or slug already exists.
    - Status 422 (Unprocessable Entity): Validation error for request fields.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Retrieve all categories (Public)
- **URL**: `http://localhost:4000/v1/blog`
- **Method**: GET
- **Description**: Retrieve all categories.
- **Headers**: Content-Type: application/json
- **Authorization**: No required
- **Body Parameters**: No parameters or body required.
- **Response**:
    - Status 200 (OK): Successfully retrieved all categories.
    - Status 404 (Not Found): No categories found.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Delete an existing category by ID (Protected, Admin only)
- **URL**: ` http://localhost:4000/v1/category/:id`
- **Method**: DELETE
- **Description**:  Delete an existing category by ID.
- **Headers**: Content-Type: application/json
- **Authorization**: Required (Admin only)
- **Path Parameters**: id (string): ID of the category to delete..
- **Body Parameters**: No body required.
- **Response**:
    - Status 200 (OK): Category deleted successfully.
    - Status 404 (Not Found): No categories found.
     - Status 422 (Unprocessable Entity):  Invalid category ID format.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Update a Category (Protected, Admin only)
- **URL**: `http://localhost:4000/v1/category/:id`
- **Method**: PUT
- **Description**: Update an existing category by ID.
- **Headers**: Content-Type: application/json
- **Authorization**: Required (Admin or Instructor role)
- **Path Parameters**: id (string): ID of the category to update.
- **Body Parameters** (Only fields to be updated):
    - title (string, optional): Updated title of the category.
- **Response**:
    - Status 200 (OK): Category updated successfully.
    - Status 404 (Not Found): Category not found.
    - Status 409 (Conflict): Category with the updated title or slug already exists.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.



## Comment APIs

### Retrieve all comments (Protected, Admin only)
- **URL**: `http://localhost:4000/v1/comments`
- **Method**: GET
- **Description**: Retrieves all main comments and their associated replies.
- **Headers**: Content-Type: application/json
- **Authorization**: Required (Admin only)
- **Path Parameters**: contentId (string): ID of the tutorial to which the comment is added.
- **Body Parameters**: No body required.
- **Response**:
    - Status 200 (OK): All comments retrieved successfully.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Add a new comment to a tutorial (Authenticated users only)
- **URL**: `http://localhost:4000/v1/comments/:contentId/tutorial/comments`
- **Method**: POST
- **Description**: Adds a comment to a specific tutorial.
- **Headers**: Content-Type: application/json
- **Authorization**: Not Required
- **Path Parameters**: contentId (string): ID of the tutorial to which the comment is added.
- **Body Parameters**:
    - body (string, required): Content of the comment.
    - review (number, optional): Rating given to the tutorial.
    - parentCommentId (string, optional): ID of the parent comment if this comment is a reply.
- **Response**:
    - Status 200 (OK): Comment added successfully.
    - Status 404 (Not Found): Tutorial not found or parent comment not found.
    - Status 403 (Forbidden): User is banned from commenting.
    - Status 422 (Unprocessable Entity): Validation error for the comment.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Add a new comment to a blog (Authenticated users only)
- **URL**: `http://localhost:4000/v1/comments/:contentId/blog/comments`
- **Method**: POST
- **Description**: Adds a comment to a specific blog.
- **Headers**: Content-Type: application/json
- **Authorization**: Not Required
- **Path Parameters**: contentId (string): ID of the blog to which the comment is added.
- **Body Parameters**:
    - body (string, required): Content of the comment.
    - review (number, optional): Rating given to the blog.
    - parentCommentId (string, optional): ID of the parent comment if this comment is a reply.
- **Response**:
    - Status 200 (OK): Comment added successfully.
    - Status 404 (Not Found): Blog not found or parent comment not found.
    - Status 403 (Forbidden): User is banned from commenting.
    - Status 422 (Unprocessable Entity): Validation error for the comment.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Delete an existing comment by comment ID (Protected, Admin only)
- **URL**: `http://localhost:4000/v1/comments/:commentId`
- **Method**: DELETE
- **Description**: Deletes a comment by its ID.
- **Headers**: Content-Type: application/json
- **Authorization**: Required (Admin only)
- **Path Parameters**: commentId (string): ID of the comment to delete.
- **Body Parameters**: No body required.
- **Response**:
    - Status 200 (OK): Comment and its replies deleted successfully.
    - Status 404 (Not Found): Comment not found.
    - Status 422 (Unprocessable Entity): Invalid comment ID format.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Accept a comment (set as approved) by comment ID (Protected, Admin only)
- **URL**: `http://localhost:4000/v1/comments/:commentId/accept`
- **Method**: PATCH
- **Description**: Accepts a comment by marking it as isAccepted.
- **Headers**: Content-Type: application/json
- **Authorization**: Required (Admin only)
- **Path Parameters**: commentId (string): ID of the comment to accept.
- **Body Parameters**: No body required.
- **Response**:
    - Status 200 (OK): Comment accepted successfully.
    - Status 404 (Not Found): Comment not found.
    - Status 422 (Unprocessable Entity): Invalid comment ID format.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Reject a comment (set as not approved) by comment ID (Protected, Admin only)
- **URL**: `http://localhost:4000/v1/comments/:commentId/reject`
- **Method**: PATCH
- **Description**: Rejects a comment by marking it as !isAccepted.
- **Headers**: Content-Type: application/json
- **Authorization**: Required (Admin only)
- **Path Parameters**: commentId (string): ID of the comment to reject.
- **Body Parameters**: No body required.
- **Response**:
    - Status 200 (OK): Comment rejected successfully.
    - Status 404 (Not Found): Comment not found.
    - Status 409 (Conflict): Comment is already rejected.
    - Status 422 (Unprocessable Entity): Invalid comment ID format.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.



## Contact us APIs

### Retrieve all contact tickets (Protected, Admin only)
- **URL**: `http://localhost:4000/v1/contact`
- **Method**: GET
- **Description**: Retrieves all support tickets.
- **Headers**: Content-Type: application/json
- **Authorization**: Required (Admin only)
- **Path Parameters**: No parameters required.
- **Body Parameters**: No body required.
- **Response**:
    - Status 200 (OK): All tickets retrieved successfully.
    - Status 404 (Not Found):  No tickets found.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Add a new contact ticket (Public)
- **URL**: `http://localhost:4000/v1/contact`
- **Method**: POST
- **Description**: Adds a new support ticket.
- **Headers**: Content-Type: application/json
- **Authorization**: Not Required
- **Path Parameters**: No parameters required.
- **Body Parameters**: 
    - name (string, required): Name of the person creating the ticket.
    - email (string, required): Email of the person.
    - phone (string, optional): Contact phone number.
    - body (string, required): Description of the issue or query.
- **Response**:
    - Status 200 (OK): New ticket created successfully.
    - Status 422 (Unprocessable Entity): Validation errors in request body.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Delete a specific contact ticket by ticket ID (Protected, Admin only)
- **URL**: `http://localhost:4000/v1/contact/:ticketId`
- **Method**: DELETE
- **Description**: Deletes a ticket by ID.
- **Headers**: Content-Type: application/json
- **Authorization**: Required (Admin only)
- **Path Parameters**: ticketId (string): ID of the ticket to be deleted.
- **Body Parameters**: No body required.
- **Response**:
    - Status 200 (OK): Ticket deleted successfully.
    - Status 404 (Not Found): Ticket not found.
    - Status 422 (Unprocessable Entity): Invalid ticket ID format.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Answer Ticket (Protected, Admin only)
- **URL**: `http://localhost:4000/v1/contact/answer`
- **Method**: POST
- **Description**: Sends an email response to a ticket and marks it as responded.
- **Headers**: Content-Type: application/json
- **Authorization**: Required (Admin only)
- **Path Parameters**: No parameters required.
- **Body Parameters**:
    - email (string, required): Email of the user who submitted the ticket.
    - answer (string, required): Response text to be sent to the user.
- **Response**:
    - Status 200 (OK): Email sent and ticket updated
    - Status 404 (Not Found): Ticket not found for the provided email.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.



## Menu APIs

### Create a new menu item (Protected, Admin only)
- **URL**: `http://localhost:4000/v1/menus`
- **Method**: POST
- **Description**:  Creates a new menu or submenu item. If parentId is specified, it becomes a submenu.
- **Headers**: Content-Type: application/json
- **Authorization**: Required (Admin only)
- **Path Parameters**: No parameters required.
- **Body Parameters**:
    - title (string, required): Title of the menu.
    - order (integer, optional): Desired order of the menu. For submenus, if omitted or incorrect, it will be adjusted automatically.
    - parentId (ObjectId, optional): If specified, the menu will be created as a submenu of the specified menu.
    - categoryId (ObjectId, optional): Category associated with the menu.
- **Response**:
    - Status 201 (Created): New menu created successfully.
    - Status 422 (Unprocessable Entity): Validation errors in the request body.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Retrieve all menus with submenus (Protected, Admin only)
- **URL**: `http://localhost:4000/v1/menus`
- **Method**: GET
- **Description**: Retrieves all main menus and their submenus.
- **Headers**: Content-Type: application/json
- **Authorization**: Required (Admin only)
- **Path Parameters**: No parameters required.
- **Body Parameters**: No body required.
- **Response**:
    - Status 200 (OK): All menus retrieved successfully.
    - Status 404 (Not Found): No menus found.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Retrieve a single menu by ID, including its submenus if available (Protected, Admin only)
- **URL**: `http://localhost:4000/v1/menus/:menuId`
- **Method**: GET
- **Description**: Retrieves a single main menu along with its submenus.
- **Headers**: Content-Type: application/json
- **Authorization**: Required (Admin only)
- **Path Parameters**: menuId (string): ID of the main menu.
- **Body Parameters**: No body required.
- **Response**:
    - Status 200 (OK): Menu retrieved successfully.
    - Status 422 (Unprocessable Entity): Invalid menu ID.
    - Status 404 (Not Found): No menus found.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.



## Newsletter APIs

### Retrieve all newsletter subscribers (Protected, Admin only)
- **URL**: `http://localhost:4000/v1/newsletter`
- **Method**: GET
- **Description**: Retrieves a list of all newsletter subscribers.
- **Headers**: Content-Type: application/json
- **Authorization**: Required (Admin only)
- **Path Parameters**: No parameters required.
- **Body Parameters**: No body required.
- **Response**:
    - Status 200 (OK): Successfully retrieved all newsletter subscribers.
    - Status 404 (Not Found): No newsletter subscribers found.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Add a new email subscription to the newsletter (Public)
- **URL**: `http://localhost:4000/v1/newsletter`
- **Method**: POST
- **Description**:  Subscribes a new user to the newsletter with their email address.
- **Headers**: Content-Type: application/json
- **Authorization**: Not Required
- **Path Parameters**: email (string, required): Email address of the user to subscribe.
- **Body Parameters**: No body required.
- **Response**:
    - Status 201 (Created): Successfully subscribed to the newsletter.
    - Status 422 (Unprocessable Entity): Invalid email format.
    - Status 409 (Conflict): Email is already subscribed to the newsletter.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.



## Notification APIs

### Admin sends a notification to a specific user (Protected, Admin only)
- **URL**: `http://localhost:4000/v1/notification/send`
- **Method**: POST
- **Description**: Allows an admin to send a notification to a specific user.
- **Headers**: Content-Type: application/json
- **Authorization**: Required (Admin only)
- **Path Parameters**: No parameters required.
- **Body Parameters**: 
    - recipientId (string, required): ID of the recipient user.
    - title (string, required): Title of the notification.
    - message (string, required): Message body of the notification.
    - type (string, required): Type of notification (e.g., REMINDER, ALERT, etc.).
- **Response**:
    - Status 201 (Created): Successfully sent the notification.
    - Status 422 (Unprocessable Entity): Validation errors in the notification details.
    - Status 404 (Not Found): Recipient user not found
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Get All Notifications (Protected, Admin only)
- **URL**: `http://localhost:4000/v1/notification`
- **Method**: GET
- **Description**: Retrieves a list of all notifications in the system.
- **Headers**: Content-Type: application/json
- **Authorization**: Required (Admin only)
- **Path Parameters**: No parameters required.
- **Body Parameters**: No body required.
- **Response**:
    - Status 200 (OK): Successfully retrieved all notifications.
    - Status 404 (Not Found): No notifications found.
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Get User Notifications (Protected, Admin only)
- **URL**: `http://localhost:4000/v1/notification/user`
- **Method**: GET
- **Description**: Retrieves notifications sent to the logged-in user.
- **Headers**: Content-Type: application/json
- **Authorization**: Required (Admin only)
- **Path Parameters**: No parameters required.
- **Body Parameters**: No body required.
- **Response**:
    - Status 200 (OK): Successfully retrieved the user's notifications.
    - Status 404 (Not Found): No notifications found for the user
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.

### Mark Notification as Read (Protected, Admin only)
- **URL**: `http://localhost:4000/v1/notification/:notificationId/read`
- **Method**: PATCH
- **Description**: Marks a specific notification as read for the logged-in user.
- **Headers**: Content-Type: application/json
- **Authorization**: Required (Admin only)
- **Path Parameters**: notificationId (string, required): ID of the notification to mark as read.
- **Body Parameters**: No body required.
- **Response**:
    - Status 200 (OK): Notification successfully marked as read.
    - Status 404 (Not Found): Notification not found.
    - Status 422 (Unprocessable Entity): Invalid notification ID format
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.



## Search API

### Search for a keyword across tutorials (Public)
- **URL**: `http://localhost:4000/v1/search/:keyword`
- **Method**: GET
- **Description**: Searches for tutorials containing the specified keyword in their title or description.
- **Headers**: Content-Type: application/json
- **Authorization**: Not Required
- **Path Parameters**: keyword (String, required): The keyword to search for. Must be at least 3 characters long.
- **Body Parameters**: No body required.
- **Response**:
    - Status 200 (OK): Returns the search results with matched tutorials’ titles and descriptions.
    - Status 404 (Not Found): If no results are found matching the search criteria
    - Status 400 (Bad Request): If the keyword is not provided or is less than 3 characters long
    - Status 500 (Internal Server Error): Server-side issues or unexpected errors, with specific error messages for debugging.
