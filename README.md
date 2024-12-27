# Social Network API ![Static Badge](https://img.shields.io/badge/license-MIT-blue)

## Description

The Social Network API is a back-end application designed for social networking platforms. Built with MongoDB and Express.js, this API enables users to create accounts, share thoughts, react to other users' thoughts, and manage friend lists. It leverages the flexibility and scalability of MongoDB to handle large amounts of unstructured data, making it an ideal solution for modern social media applications.

This project provides the foundation for a robust social network, allowing developers to focus on building engaging front-end experiences while relying on this API for data management and operations.

## Features

- User Management

    - Create, update, and delete users with unique usernames and valid email addresses.

    - Automatically track and display the number of friends a user has with a virtual friendCount.

- Thought Sharing

    - Create, update, and delete thoughts with a character limit of 1–280 characters.

    - Associate thoughts with users and track reactions to each thought.

    - Automatically format timestamps for thoughts using getter methods.

- Reactions

    - Add and delete reactions (like comments) to thoughts.

    - Utilize nested documents for storing reactions within the thought model.

- Friendship Management

    - Add and remove friends from a user's friend list.

    - Use self-referencing relationships to manage friend connections.

- API Endpoints

    - Routes for managing users, thoughts, reactions, and friendships are organized for simplicity and efficiency.

    - Test all endpoints via Insomnia or Postman to ensure proper functionality.

- Data Relationships

    - Leverage Mongoose to manage data relationships between users, thoughts, and reactions.

    - Automatically delete associated thoughts when a user is removed (bonus feature).

- NoSQL Implementation

    - Built with MongoDB and Mongoose for seamless handling of large, unstructured datasets.

    - Includes advanced schema settings, such as virtuals for derived fields like reactionCount and friendCount.

## Installation 

You can run this project in your local evironment, follow these steps:
1. Clone the Repository:

```bash
   git clone git@github.com:williamscodigo/social-network-api.git

```

2. Navigate to the Project Directory:

```bash
    cd social-network-api
```

3. Install Dependencies:

```bash
    npm install
```

4. Build the application:

```bash
    npm run build
```

5. Seed the database:

```bash
    npm run seed
```

6. Start the application:

```bash
    npm run start
```


7. Open postman, insomnia or other prefered tool to test api end points and make sure they are working as intended.

## API Routes (to test)

**`/api/users`**

* `GET` all users

* `GET` a single user by its `_id` and populated thought and friend data

* `POST` a new user (note that the examples below are just sample data):

  ```json
  {
    "username": "lernantino",
    "email": "lernantino@gmail.com"
  }
  ```

* `PUT` to update a user by its `_id`

* `DELETE` to remove user by its `_id`

---

**`/api/users/:userId/friends/:friendId`**

* `POST` to add a new friend to a user's friend list

* `DELETE` to remove a friend from a user's friend list

---

**`/api/thoughts`**

* `GET` to get all thoughts

* `GET` to get a single thought by its `_id`

* `POST` to create a new thought. (note that the examples below are just sample data):

  ```json
  {
    "thoughtText": "Here's a cool thought...",
    "username": "lernantino"
  }
  ```

* `PUT` to update a thought by its `_id`

* `DELETE` to remove a thought by its `_id`

---

**`/api/thoughts/:thoughtId/reactions`**

* `POST` to create a reaction stored in a single thought's `reactions` array field

* `DELETE` to pull and remove a reaction by the reaction's `reactionId` value

## Usage

Walkthrough Video Link: [https://drive.google.com/file/d/1dlBrG5a0WRAKfoWQvo23nXNJbYRs6dhP/view?usp=sharing](https://drive.google.com/file/d/1dlBrG5a0WRAKfoWQvo23nXNJbYRs6dhP/view?usp=sharing)

## Technologies Used

- JavaScript
- TypeScript
- Node.js
- Express
- MongoDB
- Mongoose

## License
[https://opensource.org/license/mit](https://opensource.org/license/mit)


## Questions
GitHub Link: [https://github.com/williamscodigo](https://github.com/williamscodigo)