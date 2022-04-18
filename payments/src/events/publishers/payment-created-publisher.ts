import { Subjects, Publisher, PaymentCreatedEvent } from '@ngazicticketingapp/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
