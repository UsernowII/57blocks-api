import { ValidationComposite } from '../../validations/validation-composite';
import { IValidation } from '../../interfaces/IValidation';
import { RequiredFieldsValidation } from '../../validations/required-fields';
import { CompareFieldsValidation } from '../../validations/compare-fields';
import { EmailValid } from '../../validations/email-valid';
import { PasswordValid } from '../../validations/password-valid';

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
