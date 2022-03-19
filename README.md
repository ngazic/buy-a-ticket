# Buy a Ticket app

## Requirements

### Apps: 

- Docker
- Kubernetes
- Ingress-nginx controller (as load balancer service)
- skaffold

### Change localhost to custom host ticketing.dev
Set your local routing to custom ticketing.dev (this is ingress requirement).
   The host file is on the path "C:\Windows\System32\drivers\etc" (Windows)

### In Chrome type: **thisisunsafe** (to use http)

## Dev

Inside root directory, run:

```
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
5. payments (handles credit card payments. Canclels orders if payments fails, completes if payment succeeds)

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

All error responses that we send out from any server should have this structure:

```
{
  errors: {
    message: string, field?:string
  }[]
}
```