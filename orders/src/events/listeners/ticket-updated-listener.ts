import { Listener, Subjects, TicketUpdatedEvent } from "@ngazicticketingapp/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";


export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject: TicketUpdatedEvent['subject'] = Subjects.TicketUpdated;
  readonly queueGroupName = queueGroupName;
  async onMessage(data: TicketUpdatedEvent['data'], msg: Message): Promise<void> {
    console.log('ticket Updated listener in orders service');
    console.log(data);
    const ticket = await Ticket.findByEvent(data);

    if(!ticket) {
      throw new Error('Ticket not found!!!');
    }

    const {title, price} = data;
    ticket.set({title, price});
    await ticket.save();

    msg.ack();
  }
}