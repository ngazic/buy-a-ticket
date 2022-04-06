import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const clientID = 'nihad-listener' + randomBytes(4).toString('hex');

const stan = nats.connect('ticketing', clientID , {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log(`Listener ${clientID} connected to NATS`);

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });


  // NATS specificity - We need to chain options
  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName('accounting-service');

  const subscription = stan.subscribe(
    'ticket:created',
    'queue-group-name',
    options
  );

  subscription.on('message', (msg: Message) => {
    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }

    msg.ack();
  });
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
