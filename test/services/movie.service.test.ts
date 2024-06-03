import { Movie } from '../../src/models/movie/movie.entity';
import { MovieService } from '../../src/services/movie.service';
import { IMovieRepository } from '../../src/interfaces/IMovieRepository';
import { MovieDTO } from '../../src/models/movie/movie.dto';
import { IMovieService } from '../../src/interfaces/IMovieService';
import { MovieUnion } from '../../src/shared/types/types';
import { QueryParams } from '../../src/shared/types/query-params';

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
      return Promise.resolve({ id: '123', isPublic: true } as Movie);
    }

    find(_filter: QueryParams, _id: string): Promise<Movie[]> {
      return Promise.resolve([]);
    }
  }
  return new FakeRepository();
};

const makeFakePayload = (): MovieUnion => ({
  user_token: {
    id: '123',
  },
  isPublic: true,
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
      const { user_token, ...movieDTO } = makeFakePayload();
      const res = await sut.create(movieDTO, user_token.id);
      expect(res).toEqual({ id: '123', isPublic: true });
    });
  });
});
