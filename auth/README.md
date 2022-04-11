# Auth Service

## Initial Setup (for creating project from scratch only)

1. Install dependencies:

```
npm i -D typescript ts-node-dev @types/express
npm i express
```

2. Create Start Script in package.json:

```
"start": "ts-node-dev src/index.ts"
```

3. Create tsconfig.json file in package.json:
   
   ```
   npx tsc --init
   ```
4. Create docker file
5. Push docker image to docker hub 

```
# docker build -t user/image_name .
docker build -t ngazic/auth .
#docker push user/image_name # for pushing image to docker hub
docker push ngazic/auth # for pushing image to docker hub
```
6. Register service to load balancer (Ingress)
7. Update skaffold.yaml to do file sync for the service
8. Start/Restart skaffold dev

## Routes

### /api/users/signup

method: POST
body: {email:string, password:string}
purpose: Sign up for account

### /api/users/signin

method: POST
body: {email:string, password:string}
purpose: Sign in to an existing account
validations: npm express-validator package


### /api/users/sigout

method: POST
body: {}
purpose: Sign out

### /api/users/current-user

method: GET
body: -
purpose: Return info about the user
## description

### Sign up 

- Does the user with the email already exists? If yes, respond with error.
- Hash the password the user entered. Can't store it in the DB in plain text.
- Create new User and save to Mongo DB 
- User is now considered to be logged in. Send them JWT token in Cookie

### Sign in

- Does the user with the email already exists? If not, respond with error.
- Compare the provided password with stored password
- If passwords are the same, User is now considered to be logged in 
- Send a JWT token in a cookie

### Current user

- Does this user have JWT token inside session cookie  set? If not or JWT is invalid, respond with error.
- Return user data stored inside JWT token payload

### Authentication strategy

- Other services have logic to inspect is the user authenticated (cookie, JWT token ...)
- if the user is invalidated, Auth service will send event to Event Bus 
- We are using Next js, (server side rendering), it means we store JWT token inside cookie

### Middlewares
- Middleware to extract JWT payload and set in on 'req.currentUser'
- Middleware to reject the request if the user is not logged in

## Tests

### Prerequisites

Run tests

```
npm run test
```