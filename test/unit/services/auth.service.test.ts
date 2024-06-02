import { AuthService } from '../../../src/services/auth.service';
import { IHasher } from '../../../src/interfaces/IHasher';
import { IUserRepository } from '../../../src/interfaces/IUserRepository';
import { UserDTO } from '../../../src/models/user/user.dto';
import { User } from '../../../src/models/user/user.entity';
import { IAuthService } from '../../../src/interfaces/IAuthService';

type SutTypes = {
  sut: IAuthService;
  hasherStub: IHasher;
  repoStub: IUserRepository;
};

const makeRepository = (): IUserRepository => {
  class FakeRepository implements IUserRepository {
    create(user: UserDTO): Promise<User> {
      return Promise.resolve(user);
    }
  }
  return new FakeRepository();
};
const makeHasher = (): IHasher => {
  class HasherStub implements IHasher {
    hash(value: string): string {
      return `${value}.hashed`;
    }
  }
  return new HasherStub();
};

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher();
  const repoStub = makeRepository();
  const sut = new AuthService(repoStub, hasherStub);
  return {
    sut,
    hasherStub,
    repoStub,
  };
};

describe('AuthService', () => {
  describe('auth method', () => {
    it('should return data', async () => {
      const { sut } = makeSut();
      const res = await sut.auth({});
      expect(res).toBe(undefined);
    });
  });
});
