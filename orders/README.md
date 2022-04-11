# Orders Service

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
docker build -t ngazic/orders .
#docker push user/image_name # for pushing image to docker hub
docker push ngazic/orders # for pushing image to docker hub
```
6. Register service to load balancer (Ingress)
7. Update skaffold.yaml to do file sync for the service 
8. Start/Restart skaffold dev

## Events

### Publishes

- Order:Created => emits this event to NATS when a new order has been created
- Order:Cancelled => emits this event to NATS when the order has been cancelled

## Routes

### /api/orders

method: GET
body: -
purpose: Retrieve all orders

### /api/orders/:id

method: GET
body: -
purpose: Retrieve order with specific ID


### /api/orders

method: POST
body: {ticketId: string;}
purpose: Create an order to purchase the specified ticket

### /api/orders/:id

method: DELETE
body: -
purpose: Cancel the order


## description


## Tests

Run tests

```
npm run test
```