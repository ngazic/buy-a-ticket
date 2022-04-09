import {TicketCreatedEvent, Publisher, Subjects} from '@ngazicticketingapp/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}