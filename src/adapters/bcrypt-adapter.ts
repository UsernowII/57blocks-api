import { hashSync, compareSync } from 'bcryptjs';
import { IHasher } from '../interfaces/IHasher';
import { HashComparer } from '../interfaces/IHashComparer';

export class BcryptAdapter implements IHasher, HashComparer {
  hash(value: string): string {
    return hashSync(value);
  }

  compare(value: string, hashed: string): boolean {
    return compareSync(value, hashed);
  }
}
