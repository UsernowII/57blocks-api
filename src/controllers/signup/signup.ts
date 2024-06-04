import { Response, Request } from 'express';
import { IValidation, IAuthService } from '../../interfaces';
import { UniqueEmailError } from '../../errors';

export class SignupController {
  constructor(
    private readonly authentication: IAuthService,
    private readonly validation: IValidation,
  ) {}

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const error = this.validation.validate(
        req.body as Record<string, unknown>,
      );
      if (error) return res.status(400).json({ error: error.message });

      const { username, email, password } = req.body;

      const user = await this.authentication.add({
        username,
        email,
        password,
      });
      return res.status(201).json(user);
    } catch (error) {
      console.error(error);

      //@ts-expect-error error from database
      if (error.code === '23505') {
        const message = new UniqueEmailError().message;
        return res.status(400).json({ error: message });
      }

      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
