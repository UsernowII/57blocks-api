import { IValidation } from '../interfaces/IValidation';
import { REGEX_PASSWORD } from '../shared/util/constants';
import { InvalidParamError } from '../errors/invalid-param.error';

export class PasswordValid implements IValidation {
  constructor(private readonly fieldName: string) {}
  validate(data: Record<string, unknown>): Error | null {
    const isValid = REGEX_PASSWORD.test(data[this.fieldName] as string);
    if (!isValid) {
      const message = `${this.fieldName} min length 10 chars - one lowercase, uppercase, special char: !, @, #, ? or ]`;
      return new InvalidParamError(message);
    }
    return null;
  }
}
