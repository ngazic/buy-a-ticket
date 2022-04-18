# Payments Service

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
docker build -t ngazic/payments .
#docker push user/image_name # for pushing image to docker hub
docker push ngazic/payments # for pushing image to docker hub
```
6. Register service to load balancer (Ingress)
7. Update skaffold.yaml to do file sync for the service 
8. Start/Restart skaffold dev

## Events

### Publishes

-  Payment:Created => emits this event to NATS when the new payment is created

### Listens

- Order:Created
- Order:Cancelled

## Routes

### /api/payments

method: POST
body: {token: string, orderId: string}
purpose: Create a payment


## description


## Tests

Run tests

```
npm run test
```