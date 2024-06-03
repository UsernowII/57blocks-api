import { IValidation } from '../interfaces/IValidation';
import { InvalidParamError } from '../errors/invalid-param.error';
import { REGEX_DATE } from '../shared/util/constants';

export class DateValid implements IValidation {
  constructor(private readonly fieldName: string) {}

  validate(data: Record<string, unknown>): Error | null {
    const isValid = REGEX_DATE.test(data[this.fieldName] as string);
    if (!isValid) return new InvalidParamError(this.fieldName);
    return null;
  }
}
