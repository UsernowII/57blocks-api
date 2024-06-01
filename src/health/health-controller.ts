import { Request, Response } from 'express';

export class HealthController {
  run(request: Request, res: Response) {
    res.status(200).send('health');
  }
}
