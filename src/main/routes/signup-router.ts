import { Router } from 'express';
import { SignupController } from '../../controllers/signup/signup';
import { makeSignUpValidation } from '../../controllers/signup/sign-up.validation';
import { AuthService } from '../../services';
import { UserPgRepository } from '../../repositories';
import { BcryptAdapter } from '../../adapters/bcrypt-adapter';
import { JwtAdapter } from '../../adapters/jwt-adapter';
import { env } from '../config/env';
import { ConsoleLogger } from '../../shared/logger/console-logger';

const validation = makeSignUpValidation();
const logger = new ConsoleLogger();
const userRepo = new UserPgRepository();
const bcrypt = new BcryptAdapter();
const jwtAdapter = new JwtAdapter({ ...env });
const auth = new AuthService(userRepo, bcrypt, jwtAdapter);
const signupController = new SignupController(auth, validation, logger);

export default (router: Router): void => {
  router.post('/signup', signupController.register.bind(signupController));
};
