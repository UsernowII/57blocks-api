export class Movie {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly overview: string,
    public readonly releaseDate: Date,
    public readonly originalLanguage: string,
    public readonly genre: string,
    public readonly posterPath: string,
    public readonly backdropPath: string,
    public readonly isPublic: boolean,
    public readonly userId: string,
  ) {}
}
