import { Request, Response } from 'express';
import { MovieService } from '../../services/movie.service';
import { IValidation } from '../../interfaces/IValidation';
import { FilterUnion, MovieUnion, UpdateUnion } from '../../shared/types/types';
import { InvalidParamError } from '../../errors/invalid-param.error';
import { AccessDeniedError } from '../../errors/access-denied.error';
import { REGEX_UUID } from '../../shared/util/constants';

export class MovieController {
  constructor(
    private readonly service: MovieService,
    private readonly validation: IValidation,
  ) {}
  async create(req: Request, res: Response) {
    try {
      const { user_token, ...movieDto } = req.body as MovieUnion;

      const error = this.validation.validate(movieDto);
      if (error) return res.status(400).json({ error: error.message });

      const movie = await this.service.create(movieDto, user_token.id);
      return res.status(201).json(movie);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Internal Server error' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { overview, user_token } = req.body as UpdateUnion;
      const { movieId } = req.params;

      if (!REGEX_UUID.test(movieId)) {
        return res
          .status(400)
          .json({ message: 'movieId should be a valid UUID' });
      }

      const movie = await this.service.update(movieId, user_token.id, overview);
      return res.status(200).json(movie);
    } catch (error) {
      console.log(error);
      if (error instanceof InvalidParamError) {
        return res.status(404).json({ message: error.message });
      }
      if (error instanceof AccessDeniedError) {
        return res.status(403).json({ message: error.message });
      }

      return res.status(500).json({ message: 'Internal Server error' });
    }
  }

  async fetch(req: Request, res: Response) {
    try {
      const { user_token, filter } = req.body as FilterUnion;

      const movies = await this.service.findMovies(filter, user_token.id);
      return res.status(201).json({ total: movies.length, movies });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Internal Server error' });
    }
  }
}
