import { requireAuth } from '@aaticketingdev/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';

const router = express.Router();

router.post('/api/tickets', requireAuth, (req: Request, res: Response) => {
    res.sendStatus(200);
})

export { router as createTicketRouter };
