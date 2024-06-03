export interface MovieDTO {
  isPublic: boolean;
  title: string;
  releaseDate: Date;
  originalLanguage: string;
  genre: string;
  posterPath: string;
  backdropPath: string;
  overview: string;
}

export interface UserToken {
  id: string;
  email?: string;
}

export type MovieUnion = MovieDTO & { user_token: UserToken };
