import { Response, Request } from 'express';
import { IValidation, IAuthService } from '../../interfaces';
import { InvalidParamError } from '../../errors';

export class LoginController {
  constructor(
    private readonly authentication: IAuthService,
    private readonly validation: IValidation,
  ) {}

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const error = this.validation.validate(
        req.body as Record<string, unknown>,
      );
      if (error) return res.status(400).json({ error: error.message });

      const { email, password } = req.body;
      const token = await this.authentication.auth({ email, password });
      return res.status(201).json(token);
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof InvalidParamError) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
