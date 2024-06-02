import {Router} from 'express';
import {Signup} from "../../controllers/signup/signup";
import {makeSignUpValidation} from "../../controllers/signup/sign-up.validation";

const validation =  makeSignUpValidation()
const signupController = new Signup({}, validation);

export default (router: Router): void => {
  router.post("/signup", signupController.register.bind(signupController));
};
