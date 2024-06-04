import { Request, Response } from 'express';
import {
  createResponse,
  createRequest,
  MockRequest,
  MockResponse,
} from 'node-mocks-http';
import { Health } from '../../src/controllers/health/health';
import clearAllMocks = jest.clearAllMocks;

describe('HealthController', () => {
  let controller: Health;
  let request: MockRequest<Request>;
  let response: MockResponse<Response>;

  beforeEach(() => {
    controller = new Health();
    response = createResponse();
  });

  afterAll(() => clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /', () => {
    it('should return 200 and API Name + API Version', () => {
      request = createRequest({
        method: 'GET',
        url: 'api/health/',
      });

      controller.run(request, response);
      const result = response._getData();
      expect(response.statusCode).toBe(200);
      expect(result).toBe('health');
    });
  });
});
