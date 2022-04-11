import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';

describe('Create new order', () => {

  it('return 401 on unauthorized request', async () => {
    const ticketId = new mongoose.Types.ObjectId();

    await request(app)
      .post('/api/orders')
      .send({ ticketId })
      .expect(401);
  });

  it('returns an error if the ticket does not exist', async () => {
    const ticketId = new mongoose.Types.ObjectId();

    await request(app)
      .post('/api/orders')
      .set('Cookie', global.signin())
      .send({ ticketId })
      .expect(404);
  });

  it('returns an error if the ticket is already reserved', async () => {
    const ticket = Ticket.build({
      price: 10,
      title: 'new Ticket',
    });
    await ticket.save();

    const order = Order.build({
      ticket,
      userId: 'somerandomstring',
      status: OrderStatus.Created,
      expiresAt: new Date(),
    });
    await order.save();

    await request(app)
      .post('/api/orders')
      .set('Cookie', global.signin())
      .send({ ticketId: ticket.id })
      .expect(400);

  });

  it('reserves a ticket', async () => {
    const ticket = Ticket.build({
      price: 10,
      title: 'new Ticket',
    });
    await ticket.save();

    await request(app)
      .post('/api/orders')
      .set('Cookie', global.signin())
      .send({ ticketId: ticket.id })
      .expect(201);
  });

  it.todo('emits an order created event');
});