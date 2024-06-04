import { Response, Request } from 'express';
import { IValidation, IAuthService } from '../../interfaces';
import { InvalidParamError } from '../../errors';
import { ILogger } from '../../shared/interfaces/ILogger';

export class LoginController {
  constructor(
    private readonly authentication: IAuthService,
    private readonly validation: IValidation,
    private readonly logger: ILogger,
  ) {}

  async login(req: Request, res: Response): Promise<Response> {
    try {
      this.logger.info('Received login request');
      const error = this.validation.validate(
        req.body as Record<string, unknown>,
      );

      if (error) {
        this.logger.info(error.message);
        return res.status(400).json({ error: error.message });
      }

      const { email, password } = req.body;
      const token = await this.authentication.auth({ email, password });
      this.logger.info('Login validation successful', { email });
      return res.status(201).json(token);
    } catch (error: unknown) {
      this.logger.error(error);
      if (error instanceof InvalidParamError) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
