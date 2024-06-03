import { Movie } from '../../src/models/movie/movie.entity';
import { MovieService } from '../../src/services/movie.service';
import { IMovieRepository } from '../../src/interfaces/IMovieRepository';
import { MovieDTO } from '../../src/models/movie/movie.dto';
import { IMovieService } from '../../src/interfaces/IMovieService';
import { QueryParams } from '../../src/shared/types/query-params';
import { UserToken } from '../../src/shared/types/user-token';

type SutTypes = {
  sut: IMovieService;
  repoStub: IMovieRepository;
};

const makeSut = (): SutTypes => {
  const repoStub = makeRepository();
  const sut = new MovieService(repoStub);
  return {
    sut,
    repoStub,
  };
};

const makeRepository = (): IMovieRepository => {
  class FakeRepository implements IMovieRepository {
    create(_user: MovieDTO): Promise<Movie> {
      return Promise.resolve(makeFakeResponse());
    }

    find(_filter: QueryParams, _id: string): Promise<Movie[]> {
      return Promise.resolve([]);
    }

    findById(
      movieId: string,
    ): Promise<Pick<Movie, 'id' | 'is_public' | 'user_id'>> {
      return Promise.resolve({ id: movieId, is_public: false });
    }

    updateOverview(movieId: string, overview: string): Promise<Movie> {
      return Promise.resolve({ id: movieId, overview } as Movie);
    }
  }
  return new FakeRepository();
};

const makeUserToken = (): UserToken => ({
  id: '123',
  email: 'any@email.com',
});

const makeFakeResponse = (): Movie => ({
  id: '123',
  is_public: false,
  title: 'any-title',
  release_date: new Date('1999-12-31'),
  original_language: 'en',
  genre: 'Science Fiction',
  poster_path: '/any-url.jpg',
  backdrop_path: '/any-url.jpg',
  overview: '',
});

const makeFakePayload = (): MovieDTO => ({
  isPublic: false,
  title: 'any-title',
  releaseDate: new Date('1999-12-31'),
  originalLanguage: 'en',
  genre: 'Science Fiction',
  posterPath: '/any-url.jpg',
  backdropPath: '/any-url.jpg',
  overview: '',
});

describe('MovieService', () => {
  describe('create method', () => {
    it('should return data', async () => {
      const { sut } = makeSut();
      const res = await sut.create(makeFakePayload(), makeUserToken().id);
      expect(res).toEqual(makeFakeResponse());
    });
  });
});
