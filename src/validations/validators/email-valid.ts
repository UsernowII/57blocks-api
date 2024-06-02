import {Validation} from "../../interfaces/validation";
import {REGEX_EMAIL} from "../../shared/util/constants";
import {InvalidParamError} from "../../errors/invalid-param.error";

export class EmailValid implements Validation {
  constructor ( private readonly fieldName: string) {}

  validate (data: any): Error | null {
    const isValid =  REGEX_EMAIL.test(data[this.fieldName]);
    if (!isValid) return new InvalidParamError(this.fieldName);
    return null;
  }
}
