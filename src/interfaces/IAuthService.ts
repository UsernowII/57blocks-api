import { User } from '../models/user/user.entity';
import { UserDTO } from '../models/user/user.dto';

export interface IAuthService {
  auth: (data: Omit<UserDTO, 'username'>) => Promise<void>;

  add: (body: UserDTO) => Promise<User>;
}
