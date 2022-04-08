import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();

const stanClient = nats.connect('ticketing', 'nihadPublisher', {
  url: 'https://localhost:4222'
});

stanClient.on('connect', async () => {

  console.log('Publisher connected to NATS');

  const publisher = new TicketCreatedPublisher(stanClient);

  const data = {
    id: '123',
    title: 'Concert',
    price: 20
  };

  try {
    await publisher.publish(data);
  } catch (err) {
    console.log(err);
  }

//   // Simple Publisher (all publishes are async in the node version of the client)
//   stanClient.publish('ticket:created', data, (err, guid) => {
//     console.log('Event Published');
//     if (err) {
//       console.log('publish failed: ' + err);
//     } else {
//       console.log('published message with guid: ' + guid);
//     }
//   });
});