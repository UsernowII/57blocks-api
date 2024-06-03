import { UserDTO } from '../models/user/user.dto';
import { User } from '../models/user/user.entity';

export interface IUserRepository {
  create: (user: UserDTO) => Promise<User>;

  findOneByEmail: (email: string) => Promise<User>;
}
