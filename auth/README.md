# Auth Service

## Initial Setup

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

## Routes

### /api/users/signup

method: POST
body: {email:string, password:string}
purpose: Sign up for account

### /api/users/signin

method: POST
body: {email:string, password:string}
purpose: Sign in to an existing account

### /api/users/sigout

method: POST
body: {}
purpose: Sign out

### /api/users/currentuser

method: GET
body: -
purpose: Return info about the user