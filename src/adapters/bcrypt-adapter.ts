import { hashSync, compareSync } from 'bcryptjs';
import { IHasher } from '../interfaces/IHasher';

export class BcryptAdapter implements IHasher {
  hash(value: string): string {
    return hashSync(value);
  }

  compare(value: string, hashed: string): boolean {
    return compareSync(value, hashed);
  }
}
