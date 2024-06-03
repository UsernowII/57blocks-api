import { Movie } from '../models/movie/movie.entity';
import { MovieDTO } from '../models/movie/movie.dto';

export interface IMovieRepository {
  create: (movie: MovieDTO, userId: string) => Promise<Movie>;
}
