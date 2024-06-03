import { Pool } from 'pg';
import { pgClient } from '../db/pg-client';
import { Movie } from '../models/movie/movie.entity';
import { MovieDTO } from '../models/movie/movie.dto';
import { IMovieRepository } from '../interfaces/IMovieRepository';

export class MoviePgRepository implements IMovieRepository {
  private client: Pool;

  constructor() {
    this.client = pgClient();
  }

  async create(data: MovieDTO, userId: string): Promise<Movie> {
    const {
      title,
      overview,
      releaseDate,
      originalLanguage,
      genre,
      posterPath,
      backdropPath,
      isPublic,
    } = data;
    const users = await this.client.query(
      `INSERT INTO movies (title, overview, release_date, original_language, genre, poster_path, backdrop_path, is_public, user_id)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [
        title,
        overview,
        releaseDate,
        originalLanguage,
        genre,
        posterPath,
        backdropPath,
        isPublic,
        userId,
      ],
    );
    return users.rows[0] as Movie;
  }
}
