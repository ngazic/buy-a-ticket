import { Publisher, Subjects, TicketUpdatedEvent } from '@ngazicticketingapp/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}