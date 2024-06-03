import { Pool } from 'pg';
import { pgClient } from '../db/pg-client';
import { Movie } from '../models/movie/movie.entity';
import { MovieDTO } from '../models/movie/movie.dto';
import { IMovieRepository } from '../interfaces/IMovieRepository';
import { QueryParams } from '../shared/types/query-params';

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

  async find(
    { isPublic, page, limit }: QueryParams,
    id: string,
  ): Promise<Movie[]> {
    const offset = page ? Number(page) - 1 : undefined;

    if (isPublic) {
      const moviePublicQuery = await this.client.query(
        `SElECT * FROM movies
         WHERE is_public = $1 OFFSET $2 LIMIT $3`,
        [isPublic, offset, limit],
      );
      console.log('Retrieving Public Movies');
      return moviePublicQuery.rows as Movie[];
    }

    const movieQuery = await this.client.query(
      `SElECT * FROM movies
        WHERE user_id = $1 AND is_public = $2
       OFFSET $3 LIMIT $4`,
      [id, isPublic, offset, limit],
    );
    console.log('Retrieving Private Movies');
    return movieQuery.rows as Movie[];
  }
}
