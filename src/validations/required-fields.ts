import { IValidation } from '../interfaces/IValidation';
import { MissingParamError } from '../errors/missing-param.error';

export class RequiredFieldsValidation implements IValidation {
  constructor(private readonly fieldName: string) {}

  validate(data: Record<string, unknown>): Error | null {
    const value = data[this.fieldName];
    if (value === undefined || value === null)
      return new MissingParamError(this.fieldName);
    return null;
  }
}
