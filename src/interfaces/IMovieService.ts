import { Movie } from '../models/movie/movie.entity';
import { MovieDTO } from '../models/movie/movie.dto';
import { QueryParams } from '../shared/types/query-params';

export interface IMovieService {
  create: (data: MovieDTO, userId: string) => Promise<Movie>;

  findMovies: (filter: QueryParams, id: string) => Promise<Movie[]>;
}
