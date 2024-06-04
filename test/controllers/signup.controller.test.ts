import { Request, Response } from 'express';
import {
  createResponse,
  createRequest,
  MockRequest,
  MockResponse,
} from 'node-mocks-http';
import { SignupController } from '../../src/controllers/signup/signup';
import { IAuthService } from '../../src/interfaces';
import { makeSignUpValidation } from '../../src/controllers/signup/sign-up.validation';
import { makeFakeAuthService } from '../mocks/auth.service.mock';
import { UniqueEmailError } from '../../src/errors';

class CustomError extends Error {
  public code: string;
  constructor() {
    super();
    this.code = '23505';
  }
}

const makeFakeBody = () => ({
  username: 'any-user',
  email: 'any@gmail.com',
  password: 'MyValidPassword#',
  passwordConfirmation: 'MyValidPassword#',
});

describe('SignupController', () => {
  let controller: SignupController;
  let authService: IAuthService;
  let request: MockRequest<Request>;
  let response: MockResponse<Response>;

  beforeEach(() => {
    const loginValidation = makeSignUpValidation();
    authService = makeFakeAuthService();
    controller = new SignupController(authService, loginValidation);
    response = createResponse();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('post/signup', () => {
    it('should return 400 if password dont match', async () => {
      const body = makeFakeBody();
      body.passwordConfirmation = 'different-password';
      request = createRequest({
        method: 'POST',
        body: body,
      });

      await controller.register(request, response);
      const result = response._getJSONData();
      expect(response.statusCode).toBe(400);
      expect(result).toEqual({ error: 'Invalid param: password do not match' });
    });

    it('should return 400 if password is not valid', async () => {
      const body = makeFakeBody();
      body.password = 'invalid';
      request = createRequest({
        method: 'POST',
        body: body,
      });

      await controller.register(request, response);
      const result = response._getJSONData();
      expect(response.statusCode).toBe(400);
      const message =
        'Invalid param: password min length 10 chars - one lowercase, uppercase, special char: !, @, #, ? or ]';
      expect(result).toEqual({ error: message });
    });

    it('should return 400 if email is in use', async () => {
      request = createRequest({
        method: 'POST',
        body: makeFakeBody(),
      });
      jest.spyOn(authService, 'add').mockRejectedValueOnce(new CustomError());
      await controller.register(request, response);
      const result = response._getJSONData();
      expect(response.statusCode).toBe(400);
      expect(result).toEqual({ error: new UniqueEmailError().message });
    });

    it('should return 500 if any throws', async () => {
      request = createRequest({
        method: 'POST',
        body: makeFakeBody(),
      });
      jest
        .spyOn(authService, 'add')
        .mockRejectedValueOnce(new Error('something went wrong'));
      await controller.register(request, response);
      const result = response._getJSONData();
      expect(response.statusCode).toBe(500);
      expect(result).toEqual({ error: 'Internal Server Error' });
    });

    it('should return 201 and an user on success', async () => {
      const body = makeFakeBody();
      request = createRequest({
        method: 'POST',
        body: body,
      });

      await controller.register(request, response);
      const result = response._getJSONData();
      expect(response.statusCode).toBe(201);
      expect(result).toEqual({
        email: 'any@gmail.com',
        password: 'MyValidPassword#',
        username: 'any-user',
      });
    });
  });
});
