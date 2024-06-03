import { Movie } from '../models/movie/movie.entity';
import { MovieDTO } from '../models/movie/movie.dto';

export interface IMovieService {
  create: (data: MovieDTO, userId: string) => Promise<Movie>;
}
