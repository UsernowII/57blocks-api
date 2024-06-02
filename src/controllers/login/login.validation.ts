import { ValidationComposite } from '../../validations/validation-composite';
import { IValidation } from '../../interfaces/IValidation';
import { RequiredFieldsValidation } from '../../validations/required-fields';
import { EmailValid } from '../../validations/email-valid';
import { PasswordValid } from '../../validations/password-valid';

export const makeLoginValidation = (): ValidationComposite => {
  const requiredFields = ['email', 'password'];
  const validations: IValidation[] = [];
  for (const field of requiredFields) {
    validations.push(new RequiredFieldsValidation(field));
  }
  validations.push(new EmailValid('email'));
  validations.push(new PasswordValid('password'));
  return new ValidationComposite(validations);
};
