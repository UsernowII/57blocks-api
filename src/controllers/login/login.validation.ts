import { IValidation } from '../../interfaces';
import {
  ValidationComposite,
  RequiredFieldsValidation,
  EmailValid,
  PasswordValid,
} from '../../validations';

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
