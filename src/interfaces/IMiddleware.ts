import { NextFunction, Request, Response } from 'express';

export interface IMiddleware {
  validate(req: Request, res: Response, next: NextFunction): void;
}
