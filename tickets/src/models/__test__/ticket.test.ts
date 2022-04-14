import { Ticket } from "../ticket";

describe('', () => {
  it('implements optimistic concurrency control', async () => {
    // NOTE: optimistic concurrency control (OCC) is querying the record 
    // by id and version number (normal does it only by id)

    // Create an instance of a ticket

    const ticket = Ticket.build({
      title: 'test ticket',
      price: 0,
      userId: "123"
    });

    // Save the ticket to the database
    await ticket.save();

    // Fetch the ticket twice
    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);

    // Make two separate changes to the tickets we fetched
    firstInstance!.set({ price: 10 });
    secondInstance!.set({ price: 10 });

    // Save the first fetched instance
    await firstInstance!.save();

    // Save the second fetched instance and expect the error to be thrown

    try {
      await secondInstance!.save();
    } catch (err) {
      return;
    }
    throw new Error('Should not reach this point');

  });

  it('increments the version number on multiple saves', async () => {
    const ticket = Ticket.build({
      title: 'test ticket',
      price: 0,
      userId: "123"
    });

    await ticket.save();
    expect(ticket.version).toEqual(0);
    await ticket.save();
    expect(ticket.version).toEqual(1);
    await ticket.save();
    expect(ticket.version).toEqual(2);
    await ticket.save();
    expect(ticket.version).toEqual(3);
  });

});