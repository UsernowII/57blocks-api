import { IValidation } from '../interfaces/IValidation';
import { REGEX_EMAIL } from '../shared/util/constants';
import { InvalidParamError } from '../errors/invalid-param.error';

export class EmailValid implements IValidation {
  constructor(private readonly fieldName: string) {}

  validate(data: Record<string, unknown>): Error | null {
    const isValid = REGEX_EMAIL.test(data[this.fieldName] as string);
    if (!isValid) return new InvalidParamError(this.fieldName);
    return null;
  }
}
