# NATS playground with

This is jsut a basic NATS server test and play

## DEVELOPMENT

```
kubectl get pods # get all pods and look for NATS deployment
kubectl port-forward <nats pod name> <local PORT>: <NATS PORT 4222>
npm run publish # to run publisher instance
npm run listen # to run subscriber instance
# In Terminal stdio, tipe "rs" to restart instance

```