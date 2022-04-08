import nats, { Message, Stan, SubscriptionOptions } from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/ticket-crated-listener';

console.clear();

const clientID = 'nihad-listener' + randomBytes(4).toString('hex');

const stan = nats.connect('ticketing', clientID, {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log(`Listener ${clientID} connected to NATS`);

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });


  // NATS specificity - We need to chain options
  new TicketCreatedListener(stan).listen();


});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());


