import {InvalidParamError} from "../../errors/invalid-param.error";
import {Validation} from "../../interfaces/validation";

export class CompareFieldsValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly compareFieldName: string
  ) {}

  validate (data: any): Error | null {
    if (data[this.fieldName] !== data[this.compareFieldName]) {
      const message = `${this.fieldName} do not match`
      return new InvalidParamError(message);
    }
    return null;
  }
}
