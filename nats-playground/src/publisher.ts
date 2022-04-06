import nats from 'node-nats-streaming';

const stanClient = nats.connect('ticketing', 'nihadPublisher', {
  url: 'https://localhost:4222'
});

stanClient.on('connect', () => {

  console.log('Publisher connected to NATS');

  const data = JSON.stringify({
    id: '123',
    title: 'Concert',
    price: 20
  });
  
  // Simple Publisher (all publishes are async in the node version of the client)
  stanClient.publish('ticket:created', data, (err, guid) => {
    console.log('Event Published');
    if (err) {
      console.log('publish failed: ' + err);
    } else {
      console.log('published message with guid: ' + guid);
    }
  });
});