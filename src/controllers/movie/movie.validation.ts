import { IValidation } from '../../interfaces';
import {
  ValidationComposite,
  RequiredFieldsValidation,
  DateValid,
} from '../../validations';

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
