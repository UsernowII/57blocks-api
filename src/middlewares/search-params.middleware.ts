import { NextFunction, Request, Response } from 'express';
import { IMiddleware } from '../interfaces/IMiddleware';

export class SearchParams implements IMiddleware {
  validate(req: Request, res: Response, next: NextFunction) {
    const { isPublic, limit, page } = req.query;

    const limitNum = Number(limit);
    const offsetNum = Number(page);

    if (limit || page) {
      if (
        isNaN(limitNum) ||
        limitNum <= 0 ||
        isNaN(offsetNum) ||
        offsetNum <= 0
      ) {
        return res.status(400).json({
          error:
            ' To use pagination offset and limit must be numbers greater than 0',
        });
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    req.body.filter = {
      limit,
      page,
      isPublic: isPublic !== 'false',
    };

    next();
  }
}
