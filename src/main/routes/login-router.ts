import { Router } from 'express';
import { AuthService } from '../../services/auth.service';
import { UserPgRepository } from '../../repositories/user-pg.repository';
import { BcryptAdapter } from '../../adapters/bcrypt-adapter';
import { LoginController } from '../../controllers/login/login';
import { makeLoginValidation } from '../../controllers/login/login.validation';
import { JwtAdapter } from '../../adapters/jwt-adapter';
import { env } from '../config/env';

const validation = makeLoginValidation();
const userRepo = new UserPgRepository();
const bcryptAdapter = new BcryptAdapter();
const jwtAdapter = new JwtAdapter({ ...env });
const auth = new AuthService(userRepo, bcryptAdapter, jwtAdapter);
const loginController = new LoginController(auth, validation);

export default (router: Router): void => {
  router.post('/login', loginController.login.bind(loginController));
};
