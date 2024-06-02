import {Validation} from "../../interfaces/validation";
import {MissingParamError} from "../../errors/missing-param.error";

export class RequiredFieldsValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (data: any): Error | null {
    if (!data[this.fieldName]) return new MissingParamError(this.fieldName);
    return null;
  }
}
