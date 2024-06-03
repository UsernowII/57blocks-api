import { IMovieService, IMovieRepository } from '../interfaces';
import { Movie } from '../models/movie/movie.entity';
import { MovieDTO } from '../models/movie/movie.dto';
import { QueryParams } from '../shared/types/query-params';
import { AccessDeniedError, InvalidParamError } from '../errors';

export class MovieService implements IMovieService {
  constructor(private readonly repository: IMovieRepository) {}
  async create(data: MovieDTO, userId: string): Promise<Movie> {
    return this.repository.create(data, userId);
  }

  async findMovies(filter: QueryParams, id: string): Promise<Movie[]> {
    return this.repository.find(filter, id);
  }

  async update(
    movieId: string,
    userId: string,
    overview: string,
  ): Promise<Movie> {
    const movie = await this.repository.findById(movieId);
    if (!movie) {
      throw new InvalidParamError(`Not Found movie id ${movieId}`);
    }

    if (movie.user_id !== userId || movie.is_public) {
      throw new AccessDeniedError(
        'You do not have permission to modify this movie',
      );
    }
    return this.repository.updateOverview(movieId, overview);
  }
}
