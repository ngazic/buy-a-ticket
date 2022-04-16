# Expiration Service

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
docker build -t ngazic/tickets .
#docker push user/image_name # for pushing image to docker hub
docker push ngazic/tickets # for pushing image to docker hub
```
6. Register service to load balancer (Ingress)
7. Update skaffold.yaml to do file sync for the service 
8. Start/Restart skaffold dev

## Events

### Publishes

- Expiration:Completed => emits this event to NATS when the predefined time has elapsed
  
### Listens
- Order:Created

## Routes


## description

Expiration Service is used to emit event vie NATS when expiration time (i.e. 15 min ) has elapsed. It relies on the Bull JS npm module and Redis container as the messaging service.

## Tests

Run tests

```
npm run test
```