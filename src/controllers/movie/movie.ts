import { Request, Response } from 'express';
import { MovieService } from '../../services/movie.service';
import { IValidation } from '../../interfaces/IValidation';
import { MovieUnion } from '../../models/movie/movie.dto';

export class MovieController {
  constructor(
    private readonly service: MovieService,
    private readonly validation: IValidation,
  ) {}
  async create(req: Request, res: Response) {
    const { user_token, ...movieDto } = req.body as MovieUnion;

    const error = this.validation.validate(movieDto);
    if (error) return res.status(400).json({ error: error.message });

    const movie = await this.service.create(movieDto, user_token.id);
    return res.status(201).json(movie);
  }

  update() {
    console.log('update movie');
    return null;
  }
}
