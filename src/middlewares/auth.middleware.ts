import { NextFunction, Request, Response } from 'express';
import { EncryptPayload, IEncryptor } from '../interfaces/IEncryptor';

export class AuthMiddleware {
  constructor(private readonly encrypt: IEncryptor) {}

  async validate(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header('Authorization');
    if (!authorization)
      return res.status(401).json({ error: 'No token provided' });
    if (!authorization.startsWith('Bearer'))
      return res.status(401).json({ error: 'Invalid Bearer token' });

    const token = authorization.split(' ').at(1) || '';
    console.log(token);

    const payload = await this.encrypt.decrypt<EncryptPayload>(token);

    if (!payload) return res.status(401).json({ error: 'Invalid token' });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    req.body.user_token = {
      id: payload.id,
      email: payload.email,
    };
    next();
  }
}
