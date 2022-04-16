import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from "@ngazicticketingapp/common";
import { JobOptions } from "bull";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject: Subjects.OrderCreated = Subjects.OrderCreated;
  readonly queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log(`Waiting ${delay} milliseconds to process the job `);

    await expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay
      } as JobOptions

    );

    msg.ack();

  }

}