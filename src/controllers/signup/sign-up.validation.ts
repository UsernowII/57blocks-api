import { IValidation } from '../../interfaces';
import { ValidationComposite } from '../../validations';
import {
  RequiredFieldsValidation,
  CompareFieldsValidation,
  EmailValid,
  PasswordValid,
} from '../../validations';
export const makeSignUpValidation = (): ValidationComposite => {
  const requiredFields = [
    'username',
    'email',
    'password',
    'passwordConfirmation',
  ];
  const validations: IValidation[] = [];
  for (const field of requiredFields) {
    validations.push(new RequiredFieldsValidation(field));
  }
  validations.push(new EmailValid('email'));
  validations.push(new PasswordValid('password'));
  validations.push(
    new CompareFieldsValidation('password', 'passwordConfirmation'),
  );
  return new ValidationComposite(validations);
};
