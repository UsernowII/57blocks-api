import { Request, Response } from 'express';
import { IMovieService, IValidation } from '../../interfaces';
import { FilterUnion, MovieUnion, UpdateUnion } from '../../shared/types';
import { InvalidParamError, AccessDeniedError } from '../../errors';
import { REGEX_UUID } from '../../shared/util/constants';
import { ILogger } from '../../shared/interfaces/ILogger';

export class MovieController {
  constructor(
    private readonly service: IMovieService,
    private readonly validation: IValidation,
    private readonly logger: ILogger,
  ) {}
  async create(req: Request, res: Response) {
    try {
      const { user_token, ...movieDto } = req.body as MovieUnion;
      this.logger.info('Received movie creation request');

      const error = this.validation.validate(movieDto);
      if (error) {
        this.logger.info(error.message);
        return res.status(400).json({ error: error.message });
      }

      const movie = await this.service.create(movieDto, user_token.id);
      this.logger.info('Successfully created movie:', { movieId: movie.id });
      return res.status(201).json(movie);
    } catch (e) {
      this.logger.error(e);
      return res.status(500).json({ message: 'Internal Server error' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { overview, user_token } = req.body as UpdateUnion;
      const { movieId } = req.params;
      this.logger.info('Received movie update request for movie ID:', {
        movieId,
        overview,
      });

      if (!REGEX_UUID.test(movieId)) {
        this.logger.info('Invalid UUID', { movieId });
        return res
          .status(400)
          .json({ message: 'movieId should be a valid UUID' });
      }

      const movie = await this.service.update(movieId, user_token.id, overview);
      this.logger.info('Movie update successful');
      return res.status(200).json(movie);
    } catch (error) {
      this.logger.error(error);
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
      this.logger.info('Received movie fetch request');
      const { user_token, filter } = req.body as FilterUnion;

      this.logger.info('fetch movies params', { filter });
      const movies = await this.service.findMovies(filter, user_token.id);

      this.logger.info('Successfully fetched movies:', movies.length);
      return res.status(201).json({ total: movies.length, movies });
    } catch (e) {
      this.logger.error(e);
      return res.status(500).json({ message: 'Internal Server error' });
    }
  }
}
