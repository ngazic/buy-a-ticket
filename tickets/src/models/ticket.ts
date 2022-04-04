import mongoose from 'mongoose';

// interface that describes the attributes
// for creating a new ticket
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

// An interface that describes the properties
// that a User Document has
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

//interface that describes the properties that
// a User model has. We need to add this because of 
// a custom static property 
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  }
);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };