import { Listener, OrderCancelledEvent, OrderStatus, Subjects } from "@ngazicticketingapp/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { queueGroupName } from './queue-group-name';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  readonly queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    // find the order that we need to cancel
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    //if doesn't exists, throw an error
    if (!order) {
      throw new Error('Order not found');
    }

    // Mark the ticket as being reserved by setting its orderId property
    order.set({ status: OrderStatus.Cancelled });

    // Save the Order
    await order.save();

    // ack the message
    msg.ack();
  }

}