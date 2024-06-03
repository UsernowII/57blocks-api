import { Router } from 'express';
import { MovieController } from '../../controllers/movie/movie';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { JwtAdapter } from '../../adapters/jwt-adapter';
import { env } from '../config/env';
import { MovieService } from '../../services/movie.service';
import { MoviePgRepository } from '../../repositories/movie-pg.repository';
import { makeAddMovieValidation } from '../../controllers/movie/movie.validation';

const jwtAdapter = new JwtAdapter({ ...env });
const authMiddleware = new AuthMiddleware(jwtAdapter);
const repository = new MoviePgRepository();
const service = new MovieService(repository);

const addValidation = makeAddMovieValidation();
const movieController = new MovieController(service, addValidation);

export default (router: Router): void => {
  router.post(
    '/movie',
    [authMiddleware.validate.bind(authMiddleware)],
    movieController.create.bind(movieController),
  );
  router.put('/movie', movieController.update.bind(movieController));
};
