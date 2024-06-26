import { Auth, IAuthService } from '../../src/interfaces';
import { User } from '../../src/models/user/user.entity';
import { UserDTO } from '../../src/models/user/user.dto';

export const makeFakeAuthService = (): IAuthService => {
  class FakeAuthService implements IAuthService {
    add(data: Omit<UserDTO, 'username'>): Promise<User> {
      return Promise.resolve(data as User);
    }

    auth(_data: Omit<UserDTO, 'username'>): Promise<Auth> {
      return Promise.resolve({ accessToken: 'valid-token' });
    }
  }
  return new FakeAuthService();
};
