import { Request, Response } from 'express';

import { ILogger } from '../shared/interfaces/ILogger';

export class UserController {
  private readonly logger;

  constructor(dependencies: { logger: ILogger }) {
    this.logger = dependencies.logger;
  }

  run(request: Request, res: Response) {
    this.logger.info('Received request to get user');
    res.status(200).send({ users: 'ok' });
  }
}
