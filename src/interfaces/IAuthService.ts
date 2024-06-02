import { User } from '../models/user/user.entity';
import { UserDTO } from '../models/user/user.dto';

export type Auth = {
  accessToken: string;
};

export interface IAuthService {
  auth: (data: Omit<UserDTO, 'username'>) => Promise<Auth>;

  add: (body: UserDTO) => Promise<User>;
}
