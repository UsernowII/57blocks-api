import { Router } from 'express';
import { AuthService } from '../../services/auth.service';
import { UserPgRepository } from '../../repositories/user-pg.repository';
import { BcryptAdapter } from '../../adapters/bcrypt-adapter';
import { LoginController } from '../../controllers/login/login';
import { makeLoginValidation } from '../../controllers/login/login.validation';

const validation = makeLoginValidation();
const userRepo = new UserPgRepository();
const bcrypt = new BcryptAdapter();
const auth = new AuthService(userRepo, bcrypt);
const loginController = new LoginController(auth, validation);

export default (router: Router): void => {
  router.post('/login', loginController.login.bind(loginController));
};
