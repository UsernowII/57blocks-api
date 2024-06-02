import { AuthService } from '../../src/services/auth.service';
import { IHasher } from '../../src/interfaces/IHasher';
import { IUserRepository } from '../../src/interfaces/IUserRepository';
import { UserDTO } from '../../src/models/user/user.dto';
import { User } from '../../src/models/user/user.entity';
import { IAuthService } from '../../src/interfaces/IAuthService';
import { EncryptPayload, IEncryptor } from '../../src/interfaces/IEncryptor';

type SutTypes = {
  sut: IAuthService;
  hasherStub: IHasher;
  repoStub: IUserRepository;
  encryptStub: IEncryptor;
};

const makeRepository = (): IUserRepository => {
  class FakeRepository implements IUserRepository {
    create(user: UserDTO): Promise<User> {
      return Promise.resolve({ id: '123', ...user });
    }

    findOneByEmail(email: string): Promise<User> {
      return Promise.resolve({
        id: '123',
        email: email,
        password: 'password-hashed',
        username: 'any-user',
      });
    }
  }
  return new FakeRepository();
};

const makeHasher = (): IHasher => {
  class HasherStub implements IHasher {
    hash(value: string): string {
      return `${value}.hashed`;
    }

    compare(_value: string, _hash: string): boolean {
      return true;
    }
  }
  return new HasherStub();
};

const makeEncrypt = (): IEncryptor => {
  class EncryptorStub implements IEncryptor {
    decrypt(_token: string): string {
      return 'true';
    }

    encrypt(_payload: EncryptPayload): string {
      return 'valid-token';
    }
  }
  return new EncryptorStub();
};

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher();
  const repoStub = makeRepository();
  const encryptStub = makeEncrypt();
  const sut = new AuthService(repoStub, hasherStub, encryptStub);
  return {
    sut,
    hasherStub,
    repoStub,
    encryptStub,
  };
};

const makeFakePayload = (): UserDTO => ({
  username: 'any-user',
  password: 'any-password',
  email: 'any@email.com',
});

describe('AuthService', () => {
  describe('auth method', () => {
    it('should return data', async () => {
      const { sut } = makeSut();
      const res = await sut.auth(makeFakePayload());
      expect(res).toEqual({ accessToken: 'valid-token' });
    });
  });
});
