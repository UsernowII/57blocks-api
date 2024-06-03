import { Router } from 'express';
import { MovieController } from '../../controllers/movie/movie';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { JwtAdapter } from '../../adapters/jwt-adapter';
import { env } from '../config/env';

const jwtAdapter = new JwtAdapter({ ...env });
const movieController = new MovieController();
const authMiddleware = new AuthMiddleware(jwtAdapter);

export default (router: Router): void => {
  router.post(
    '/movie',
    [authMiddleware.validate.bind(authMiddleware)],
    movieController.create.bind(movieController),
  );
  router.put('/movie', movieController.update.bind(movieController));
};
