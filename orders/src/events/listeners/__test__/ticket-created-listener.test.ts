import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { TicketUpdatedEvent } from '@ngazicticketingapp/common';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';
import { TicketCreatedListener } from '../ticket-created-listener';

const setup = async () => {
  // Create a listener
  const listener = new TicketCreatedListener(natsWrapper.client);

  // Create a fake data object
  const data: TicketUpdatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    title: 'new concert',
    price: 999,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  // Create a fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  // return all of this stuff
  return { msg, data, listener };
};

describe('ticketCreatedListener', () => {
  it('creates and saves a ticket', async () => {
    const { msg, data, listener } = await setup();

    await listener.onMessage(data, msg);

    // write assertions to make sure a ticket was created!
    const ticket = await Ticket.findById(data.id);

    expect(ticket).toBeDefined();
    expect(ticket!.title).toEqual(data.title);
    expect(ticket!.price).toEqual(data.price);
  });

  it('acks the message', async () => {
    const { msg, data, listener } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
  });
});