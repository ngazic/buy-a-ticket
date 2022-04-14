import { OrderCancelledEvent, Publisher, Subjects } from "@ngazicticketingapp/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}