import { Response, Request } from 'express';
import { IValidation } from '../../interfaces/IValidation';
import { IAuthService } from '../../interfaces/IAuthService';

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

      //const { email, password } = req.body;
      await this.authentication.auth({});
      return res.status(201).json({});
    } catch (error: unknown) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
