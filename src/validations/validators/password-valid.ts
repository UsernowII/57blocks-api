import { Validation } from "../../interfaces/validation";
import { REGEX_PASSWORD } from "../../shared/util/constants";
import {InvalidParamError} from "../../errors/invalid-param.error";

export class PasswordValid implements Validation {

  constructor ( private readonly fieldName: string) {}
  validate (data: any): Error | null {
    const isValid =  REGEX_PASSWORD.test(data[this.fieldName]);
    if (!isValid) {
      const message = `${this.fieldName} min length 10 chars - one lowercase, uppercase, special char: !, @, #, ? or ]`
      return new InvalidParamError(message);
    };
    return null;
  }
}
