import { AuthService } from '../../src/services';
import { UserDTO } from '../../src/models/user/user.dto';
import { User } from '../../src/models/user/user.entity';
import {
  IAuthService,
  EncryptPayload,
  IEncryptor,
  IUserRepository,
  IHasher,
} from '../../src/interfaces';
import { InvalidParamError } from '../../src/errors';

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
      return `${value}-hashed`;
    }

    compare(_value: string, _hash: string): boolean {
      return true;
    }
  }
  return new HasherStub();
};

const makeEncrypt = (): IEncryptor => {
  class EncryptorStub implements IEncryptor {
    async decrypt<T>(_token: string): Promise<T> {
      return Promise.resolve({ id: '123' } as T);
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
    it('should call repository with correct values', async () => {
      const { repoStub, sut } = makeSut();
      const repoSpy = jest.spyOn(repoStub, 'findOneByEmail');
      await sut.auth(makeFakePayload());
      expect(repoSpy).toHaveBeenCalledWith('any@email.com');
    });

    it('should throw an error if user not found', async () => {
      const { repoStub, sut } = makeSut();
      jest
        .spyOn(repoStub, 'findOneByEmail')
        .mockResolvedValueOnce(null as never);
      const promise = sut.auth(makeFakePayload());
      await expect(promise).rejects.toThrow(
        new InvalidParamError('any@email.com'),
      );
    });

    it('should call hasher with correct values', async () => {
      const { hasherStub, sut } = makeSut();
      const hasherSpy = jest.spyOn(hasherStub, 'compare');
      await sut.auth(makeFakePayload());
      expect(hasherSpy).toHaveBeenCalledWith('any-password', 'password-hashed');
    });

    it('should throw an error if password dont match', async () => {
      const { hasherStub, sut } = makeSut();
      jest.spyOn(hasherStub, 'compare').mockReturnValueOnce(false);
      const promise = sut.auth(makeFakePayload());
      await expect(promise).rejects.toThrow(new InvalidParamError('password'));
    });

    it('should return a token on success', async () => {
      const { sut } = makeSut();
      const res = await sut.auth(makeFakePayload());
      expect(res).toEqual({ accessToken: 'valid-token' });
    });
  });

  describe('add method', () => {
    it('should call hasher with correct values', async () => {
      const { hasherStub, sut } = makeSut();
      const hasherSpy = jest.spyOn(hasherStub, 'hash');
      await sut.add(makeFakePayload());
      expect(hasherSpy).toHaveBeenCalledWith('any-password');
    });

    it('should call repository with correct values', async () => {
      const { repoStub, sut } = makeSut();
      const payload = makeFakePayload();
      const repoSpy = jest.spyOn(repoStub, 'create');
      await sut.add(payload);
      expect(repoSpy).toHaveBeenCalledWith({
        password: 'any-password-hashed',
        username: payload.username,
        email: payload.email,
      });
    });

    it('should return an user on success', async () => {
      const { sut } = makeSut();
      const res = await sut.add(makeFakePayload());
      expect(res).toHaveProperty('id', '123');
    });
  });
});
