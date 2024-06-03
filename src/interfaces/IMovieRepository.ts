import { Movie } from '../models/movie/movie.entity';
import { MovieDTO } from '../models/movie/movie.dto';
import { QueryParams } from '../shared/types/query-params';

export interface IMovieRepository {
  create: (movie: MovieDTO, userId: string) => Promise<Movie>;

  find: (filter: QueryParams, id: string) => Promise<Movie[]>;
}
