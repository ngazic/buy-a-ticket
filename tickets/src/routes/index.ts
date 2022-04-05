import { NotFoundError } from '@ngazicticketingapp/common';
import express, { NextFunction, Request, Response } from 'express';
import { Ticket } from '../models/ticket';


const router = express.Router();

router.get(
  '/api/tickets/',
  async (req: Request, res: Response, next: NextFunction) => {
    const tickets = await Ticket.find({});

    res.send(tickets);
  });

export { router as indexTicketRouter };
