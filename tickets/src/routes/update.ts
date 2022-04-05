import { NotAuthorizedError, NotFoundError, requireAuth, validateRequest } from '@ngazicticketingapp/common';
import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';


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

    if (req.currentUser!.id !== ticket.userId) {
      return next(new NotAuthorizedError());
    }

    ticket.set({
      title, price
    });

    await ticket.save();

    res.send(ticket);
  });

export { router as updateTicketRouter };
