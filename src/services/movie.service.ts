import { IMovieService } from '../interfaces/IMovieService';
import { Movie } from '../models/movie/movie.entity';
import { MovieDTO } from '../models/movie/movie.dto';
import { IMovieRepository } from '../interfaces/IMovieRepository';
import { QueryParams } from '../shared/types/query-params';

export class MovieService implements IMovieService {
  constructor(private readonly repository: IMovieRepository) {}
  async create(data: MovieDTO, userId: string): Promise<Movie> {
    return this.repository.create(data, userId);
  }

  async findMovies(filter: QueryParams, id: string): Promise<Movie[]> {
    return this.repository.find(filter, id);
  }
}
