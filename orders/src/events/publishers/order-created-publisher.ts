import { OrderCreatedEvent, Publisher, Subjects } from "@ngazicticketingapp/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject: Subjects.OrderCreated = Subjects.OrderCreated;
}