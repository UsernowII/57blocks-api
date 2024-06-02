import { Router } from 'express';
import { SignupController } from '../../controllers/signup/signup';
import { makeSignUpValidation } from '../../controllers/signup/sign-up.validation';
import { AuthService } from '../../services/auth.service';
import { UserPgRepository } from '../../repositories/user-pg.repository';
import { BcryptAdapter } from '../../adapters/bcrypt-adapter';

const validation = makeSignUpValidation();
const userRepo = new UserPgRepository();
const bcrypt = new BcryptAdapter();
const auth = new AuthService(userRepo, bcrypt);
const signupController = new SignupController(auth, validation);

export default (router: Router): void => {
  router.post('/signup', signupController.register.bind(signupController));
};
