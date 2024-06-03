import { ValidationComposite } from '../../validations/validation-composite';
import { RequiredFieldsValidation } from '../../validations/required-fields';
import { IValidation } from '../../interfaces/IValidation';
import { DateValid } from '../../validations/date-valid';

export const makeAddMovieValidation = (): ValidationComposite => {
  const requiredFields = [
    'title',
    'overview',
    'releaseDate',
    'originalLanguage',
    'genre',
    'posterPath',
    'backdropPath',
    'isPublic',
  ];
  const validations: IValidation[] = [];
  for (const field of requiredFields) {
    validations.push(new RequiredFieldsValidation(field));
  }

  validations.push(new DateValid('releaseDate'));
  return new ValidationComposite(validations);
};
