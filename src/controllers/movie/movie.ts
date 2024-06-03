import { Request, Response } from 'express';
import { MovieService } from '../../services/movie.service';
import { IValidation } from '../../interfaces/IValidation';
import { FilterUnion, MovieUnion } from '../../shared/types/types';

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

  update(req: Request, res: Response) {
    console.log(req.body, res);
    console.log('update movie');
    return null;
  }

  async fetch(req: Request, res: Response) {
    const { user_token, filter } = req.body as FilterUnion;

    const movies = await this.service.findMovies(filter, user_token.id);
    return res.status(201).json({ total: movies.length, movies });
  }
}
