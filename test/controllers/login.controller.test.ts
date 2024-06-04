import { Request, Response } from 'express';
import {
  createResponse,
  createRequest,
  MockRequest,
  MockResponse,
} from 'node-mocks-http';
import { LoginController } from '../../src/controllers/login/login';
import { IAuthService } from '../../src/interfaces';
import { makeLoginValidation } from '../../src/controllers/login/login.validation';
import { makeFakeAuthService } from '../mocks/auth.service.mock';
import { InvalidParamError } from '../../src/errors';

const makeFakeBody = () => ({
  email: 'any@gmail.com',
  password: 'AnyPasswordValid#',
});

describe('LoginController', () => {
  let controller: LoginController;
  let authService: IAuthService;
  let request: MockRequest<Request>;
  let response: MockResponse<Response>;

  beforeEach(() => {
    const loginValidation = makeLoginValidation();
    authService = makeFakeAuthService();
    controller = new LoginController(authService, loginValidation);
    response = createResponse();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('post/login', () => {
    it('should return 400 if payload is not valid', async () => {
      request = createRequest({
        method: 'POST',
        body: { email: 'any@email.com' },
      });

      await controller.login(request, response);
      const result = response._getJSONData();
      expect(response.statusCode).toBe(400);
      expect(result).toEqual({ error: 'Missing param: password' });
    });

    it('should return 400 if email is not valid', async () => {
      const body = makeFakeBody();
      body.email = 'invalid-email';
      request = createRequest({
        method: 'POST',
        body,
      });

      await controller.login(request, response);
      const result = response._getJSONData();
      expect(response.statusCode).toBe(400);
      expect(result).toEqual({ error: 'Invalid param: email' });
    });

    it('should return 201 and an access token', async () => {
      request = createRequest({
        method: 'POST',
        body: makeFakeBody(),
      });

      await controller.login(request, response);
      const result = response._getJSONData();
      expect(response.statusCode).toBe(201);
      expect(result).toEqual({ accessToken: 'valid-token' });
    });

    it('should return 400 if auth service throws', async () => {
      request = createRequest({
        method: 'POST',
        body: makeFakeBody(),
      });
      jest
        .spyOn(authService, 'auth')
        .mockRejectedValueOnce(new InvalidParamError('bad password'));
      await controller.login(request, response);
      const result = response._getJSONData();
      expect(response.statusCode).toBe(400);
      expect(result).toEqual({ error: 'Invalid param: bad password' });
    });

    it('should return 500 if any throws', async () => {
      request = createRequest({
        method: 'POST',
        body: makeFakeBody(),
      });
      jest
        .spyOn(authService, 'auth')
        .mockRejectedValueOnce(new Error('something went wrong'));
      await controller.login(request, response);
      const result = response._getJSONData();
      expect(response.statusCode).toBe(500);
      expect(result).toEqual({ error: 'Internal Server Error' });
    });
  });
});
