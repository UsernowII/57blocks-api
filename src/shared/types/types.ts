import { MovieDTO } from '../../models/movie/movie.dto';
import { UserToken } from './user-token';
import { QueryParams } from './query-params';

export type MovieUnion = MovieDTO & { user_token: UserToken };

export type FilterUnion = { user_token: UserToken; filter: QueryParams };

export type UpdateUnion = { user_token: UserToken; overview: string };
