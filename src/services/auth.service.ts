import {
  Auth,
  IAuthService,
  IUserRepository,
  IHasher,
  IEncryptor,
} from '../interfaces';
import { User } from '../models/user/user.entity';
import { UserDTO } from '../models/user/user.dto';
import { InvalidParamError } from '../errors';

export class AuthService implements IAuthService {
  constructor(
    private readonly repository: IUserRepository,
    private readonly hasher: IHasher,

    private readonly encryptor: IEncryptor,
  ) {}

  async auth(data: Omit<UserDTO, 'username'>): Promise<Auth> {
    const { email, password } = data;
    const user = await this.repository.findOneByEmail(email);
    if (!user) throw new InvalidParamError(email);

    const isMatching = this.hasher.compare(password, user.password);
    if (!isMatching) throw new InvalidParamError('password');

    const token = this.encryptor.encrypt({ id: user.id, email });
    return Promise.resolve({ accessToken: token });
  }

  async add(data: UserDTO): Promise<User> {
    const { password } = data;
    const passwordHashed = this.hasher.hash(password);
    return this.repository.create({ ...data, password: passwordHashed });
  }
}
