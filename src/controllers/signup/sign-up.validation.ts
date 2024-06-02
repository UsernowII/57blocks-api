import {ValidationComposite} from "../../validations/validators/validation-composite";
import {Validation} from "../../interfaces/validation";
import {RequiredFieldsValidation} from "../../validations/validators/required-fields";
import {CompareFieldsValidation} from "../../validations/validators/compare-fields";
import {EmailValid} from "../../validations/validators/email-valid";
import {PasswordValid} from "../../validations/validators/password-valid";

export const makeSignUpValidation = (): ValidationComposite => {
  const requiredFields = ["name", "email", "password", "passwordConfirmation"];
  const validations: Validation[] = [];
  for (const field of requiredFields) {
    validations.push(new RequiredFieldsValidation(field));
  }
  validations.push(new EmailValid( 'email'));
  validations.push(new PasswordValid('password'));
  validations.push(new CompareFieldsValidation("password", "passwordConfirmation"));
  return new ValidationComposite(validations);
};
