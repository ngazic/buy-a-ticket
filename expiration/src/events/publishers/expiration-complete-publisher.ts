import { ExpirationCompletedEvent, Publisher, Subjects } from "@ngazicticketingapp/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompletedEvent> {
  readonly subject: Subjects.ExpirationCompleted = Subjects.ExpirationCompleted;

}