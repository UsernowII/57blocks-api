import jwt from 'jsonwebtoken';

import { EncryptPayload, IEncryptor } from '../interfaces/IEncryptor';

type Options = {
  jwtSecret: string;
  jwtTime: string;
};

export class JwtAdapter implements IEncryptor {
  constructor(private readonly options: Options) {}

  encrypt(payload: EncryptPayload): string {
    return jwt.sign(payload, this.options.jwtSecret, {
      expiresIn: this.options.jwtTime,
    });
  }

  decrypt(token: string): string {
    return jwt.verify(token, this.options.jwtSecret) as string;
  }
}
