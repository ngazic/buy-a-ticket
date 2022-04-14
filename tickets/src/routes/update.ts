import { BadRequestError, NotAuthorizedError, NotFoundError, requireAuth, validateRequest } from '@ngazicticketingapp/common';
import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publisher';
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher';
import { Ticket } from '../models/ticket';
import { natsWrapper } from '../nats-wrapper';


const router = express.Router();

router.put(
  '/api/tickets/:id',
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  requireAuth,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, price } = req.body;

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return next(new NotFoundError());
    }
    // Disable editing of the reserved ticket
    if (ticket.orderId) {
      return next(new BadRequestError('Cannot edit a reserved ticket'));
    }

    if (req.currentUser!.id !== ticket.userId) {
      return next(new NotAuthorizedError());
    }

    ticket.set({
      title, price
    });

    await ticket.save();

    new TicketUpdatedPublisher(natsWrapper.client).publish(
      {
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
        version: ticket.version,
      }
    );

    res.send(ticket);
  });

export { router as updateTicketRouter };
