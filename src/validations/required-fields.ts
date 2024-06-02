import { IValidation } from '../interfaces/IValidation';
import { MissingParamError } from '../errors/missing-param.error';

export class RequiredFieldsValidation implements IValidation {
  constructor(private readonly fieldName: string) {}

  validate(data: Record<string, unknown>): Error | null {
    if (!data[this.fieldName]) return new MissingParamError(this.fieldName);
    return null;
  }
}
