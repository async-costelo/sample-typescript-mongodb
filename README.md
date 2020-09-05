# typescript-mongodb
REST API using NodeJS and MongoDB

## Prerequisites ..

You need to install these things for the app to work: 
* [NodeJS](https://nodejs.org/en/download/) 
* [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/) or install it via npm

### Installing

You must have [NodeJS](https://nodejs.org/en/download/) already installed on your local machine.
Then type the command below to install all of the project's dependencies (even **devDependies**)
```
npm install
```

### Routes

> [GET] localhost:3000/
- This is the root directory of the app, you must have a JWT bearer token in order to access it.

> [GET] localhost:3000/users
- List all users

> [GET] localhost:3000/user/:id
- Find a user via id

> [POST] localhost:3000/user
- Add a user with body { ... }

> [PUT] localhost:3000/user/:id
- Update user contents { ... }

> [DELETE] localhost:3000/user/:id
- Delete a user via id 

> [PUT] localhost:3000/suspend/:id
- Suspend? a user via id

> [POST] localhost:3000/auth
- Authenticate user using user & pass to get JWT


