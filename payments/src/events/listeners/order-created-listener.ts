import { Listener, OrderCreatedEvent, Subjects } from "@ngazicticketingapp/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject: Subjects.OrderCreated = Subjects.OrderCreated;
  readonly queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // Store the newly created order to the DB
    const order = Order.build({
      id: data.id,
      version: data.version,
      userId: data.userId,
      price: data.ticket.price,
      status: data.status
    });
    await order.save();

    // ack the message
    msg.ack();
  }

}