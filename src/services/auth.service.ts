import { IAuthService } from '../interfaces/IAuthService';
import { User } from '../models/user/user.entity';
import { IUserRepository } from '../interfaces/IUserRepository';
import { UserDTO } from '../models/user/user.dto';
import { IHasher } from '../interfaces/IHasher';
import { InvalidParamError } from '../errors/invalid-param.error';

export class AuthService implements IAuthService {
  constructor(
    private readonly repository: IUserRepository,
    private readonly hasher: IHasher,
  ) {}

  async auth(data: Omit<UserDTO, 'username'>): Promise<void> {
    const { email, password } = data;
    const user = await this.repository.findOneByEmail(email);
    if (!user) throw new InvalidParamError(email);

    const isMatching = this.hasher.compare(password, user.password);
    if (!isMatching) throw new InvalidParamError('password');

    //handle token

    return Promise.resolve();
  }

  async add(data: UserDTO): Promise<User> {
    const { password } = data;
    const passwordHashed = this.hasher.hash(password);
    return this.repository.create({ ...data, password: passwordHashed });
  }
}
