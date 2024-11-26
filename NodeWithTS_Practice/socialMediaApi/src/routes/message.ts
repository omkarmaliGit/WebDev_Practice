import express, { Request, Response } from 'express';

export const messageRouter = express.Router();

messageRouter.get('/', (req: Request, res: Response) => {
    res.send("Message get Api");
  });
  