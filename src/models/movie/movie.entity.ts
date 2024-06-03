export class Movie {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly overview: string,
    public readonly release_date: Date,
    public readonly original_language: string,
    public readonly genre: string,
    public readonly poster_path: string,
    public readonly backdrop_path: string,
    public readonly is_public: boolean,
    public readonly user_id?: string,
  ) {}
}
