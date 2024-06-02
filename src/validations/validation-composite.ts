import { IValidation } from '../interfaces/IValidation';

export class ValidationComposite implements IValidation {
  constructor(private readonly validations: IValidation[]) {}
  validate(data: Record<string, unknown>): Error | null {
    for (const validation of this.validations) {
      const error = validation.validate(data);
      if (error) return error;
    }
    return null;
  }
}
