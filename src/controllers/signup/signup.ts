import { Response, Request } from "express";
import { Validation } from "../../interfaces/validation";
import {ServerError} from "../../errors/server.error";

export class Signup {
  private readonly authentication: unknown;
  private readonly validation: Validation;

  constructor(auth: unknown, validation: Validation) {
    this.authentication = auth;
    this.validation = validation;
  }

  async register(req: Request, res: Response) {
    try {
      const error = this.validation.validate(req.body);
      if (error) return res.status(404).json({ error: error.message});

      // validate if exists in DB

      return res.status(200).json({})
    } catch (error: unknown) {
      const {stack} = error as Error;
      console.log(error);
      return res.status(500).json(new ServerError(stack));
    }
  }

}
