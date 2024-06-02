import { Request, Response } from 'express';

export class Health {
  run(request: Request, res: Response) {
    res.status(200).send('health');
  }
}
