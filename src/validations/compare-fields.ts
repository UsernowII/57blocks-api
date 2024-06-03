import { InvalidParamError } from '../errors/invalid-param.error';
import { IValidation } from '../interfaces/IValidation';

export class CompareFieldsValidation implements IValidation {
  constructor(
    private readonly fieldName: string,
    private readonly compareFieldName: string,
  ) {}

  validate(data: Record<string, unknown>): Error | null {
    if (data[this.fieldName] !== data[this.compareFieldName]) {
      const message = `${this.fieldName} do not match`;
      return new InvalidParamError(message);
    }
    return null;
  }
}
