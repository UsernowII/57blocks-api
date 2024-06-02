import { IAuthService } from '../interfaces/IAuthService';
import { User } from '../models/user/user.entity';
import { IUserRepository } from '../interfaces/IUserRepository';
import { UserDTO } from '../models/user/user.dto';
import { IHasher } from '../interfaces/IHasher';

export class AuthService implements IAuthService {
  constructor(
    private readonly repository: IUserRepository,
    private readonly hasher: IHasher,
  ) {}

  auth(_data: unknown): Promise<void> {
    return Promise.resolve();
  }

  async add(data: UserDTO): Promise<User> {
    const { password } = data;
    const passwordHashed = this.hasher.hash(password);
    return this.repository.create({ ...data, password: passwordHashed });
  }
}
