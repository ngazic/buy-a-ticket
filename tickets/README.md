# Ticketing Service

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
docker build -t gaza/tickets .
#docker push user/image_name # for pushing image to docker hub
docker push gaza/tickets # for pushing image to docker hub
```
6. Register service to load balancer (Ingress)
7. Update skaffold.yaml to do file sync for the service 
8. Start/Restart skaffold dev

## Events

### Publishes

- Ticket:Created => emits this event to NATS when the new ticket is created
- Ticket:Updated => emits this event to NATS when the new ticket is updated

## Routes

### /api/tickets

method: GET
body: -
purpose: Retrieve all tickets

### /api/tickets/:id

method: GET
body: -
purpose: Retrieve ticket with specific ID


### /api/tickets

method: POST
body: {title: string, price: string}
purpose: Create a ticket

### /api/tickets/:id

method: PUT
body: {title: string, price: string}
purpose: Update a ticket


## description


## Tests

Run tests

```
npm run test
```