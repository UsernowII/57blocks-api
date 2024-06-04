import { Router } from 'express';
import { MovieController } from '../../controllers/movie/movie';
import { AuthMiddleware } from '../../middlewares';
import { JwtAdapter } from '../../adapters/jwt-adapter';
import { MovieService } from '../../services';
import { MoviePgRepository } from '../../repositories';
import { makeAddMovieValidation } from '../../controllers/movie/movie.validation';
import { SearchParams } from '../../middlewares';
import { env } from '../config/env';
import { ConsoleLogger } from '../../shared/logger/console-logger';

const jwtAdapter = new JwtAdapter({ ...env });
const authMiddleware = new AuthMiddleware(jwtAdapter);

const searchParams = new SearchParams();

const repository = new MoviePgRepository();
const service = new MovieService(repository);

const addValidation = makeAddMovieValidation();
const logger = new ConsoleLogger();
const movieController = new MovieController(service, addValidation, logger);

export default (router: Router): void => {
  router.post(
    '/movie',
    [authMiddleware.validate.bind(authMiddleware)],
    movieController.create.bind(movieController),
  );
  router.get(
    '/movie',
    [
      searchParams.validate.bind(searchParams),
      authMiddleware.validate.bind(authMiddleware),
    ],
    movieController.fetch.bind(movieController),
  );
  router.put(
    '/movie/:movieId',
    [authMiddleware.validate.bind(authMiddleware)],
    movieController.update.bind(movieController),
  );
};
