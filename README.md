# Buy a Ticket app

## Requirements

### Apps: 

- Docker
- Kubernetes
- Ingress-nginx controller (as load balancer service)
- skaffold

### Libraries/ Shared Code: 

Shared code is just another [git project](https://github.com/ngazic/buy-a-ticket-common-submodule) which is added as git submodule and published as NPM public **@ngazicticketingapp/common* [Linke here](https://www.npmjs.com/settings/ngazicticketingapp/packages)

### Change localhost to custom host ticketing.dev
Set your local routing to custom ticketing.dev (this is ingress requirement).
   The host file is on the path "C:\Windows\System32\drivers\etc" (Windows)

### In Chrome type: **thisisunsafe** (to use http)

## Dev

Inside root directory, run:

```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=somesecretpasswordinkubernetes # to create secret JWT token signature in Kubernetes
kubectl get secrets # to check all the secrets
skaffold dev
```

## Description

- Users can list a ticket for an event (concert, sports) for sale
- Other users can purchase this ticket 
- Any users can list tickets for sale and purchase tickets
- When a user tries to purchase, the ticket is "locked" for 15 minutes. The user has 15 minutes to enter their payment info
- While locked, no other user can purchase the ticket. After 15 minutes, the should "unlock"
- Ticket prices can be edited if they are not locked


## Services

We are creating a separate service to manage each type of resource:
1. auth (everything related to user signup/signin/signout)
2. tickets (ticket creation/editing. Knows whether a ticket can be updated)
3. orders (order creation/editing)
4. expiration (watches for orders to be created, cancels them after 15 minutes)
5. payments (handles credit card payments. Cancels orders if payments fails, completes if payment succeeds)

## Events

1. UserCreated
2. UserUpdated
3. OrderCreated
4. OrderCancelled
5. OrderExpired
6. TicketCreated
7. TicketUpdated
8. ChargeCreated

## Common response Structure

1. All error responses that we send out from any server should have this structure:

  ```
  {
    errors: {
      message: string, field?:string
    }[]
  }
  ```
2. The response status should be accordingly to the error 
   
### The error model 

We'll inherit this abstract class for all our custom errors:

```
abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}

```

### Handling async errors

Use **express-async-errors** package


### Sharing all services common secrets inside [Kubernetes](https://kubernetes.io/docs/concepts/configuration/secret/#use-case-as-container-environment-variables)

I.e. create jwt signing key:
```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=jwt_signature_value

## checking the secrets
kubectl get secrets
```

## Appendix 

### Steps to develop microservice with Kubernetes and skaffold

1. Create package.json, install deps
2. Write Dockerfile
3. Create index.ts to run project
4. Build image, push to docker hub
5. Write k8s file for deployment, service
6. Update skaffold.yaml to do file sync for the service
7. Write k8s file for MongoDB Deployment and service
  
**Note: do the final push of all images to docker hub for each service after the development is done!!!**