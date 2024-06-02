import { IUserRepository } from '../interfaces/IUserRepository';
import { pgClient } from '../db/pg-client';
import { Pool } from 'pg';
import { UserDTO } from '../models/user/user.dto';
import { User } from '../models/user/user.entity';

export class UserPgRepository implements IUserRepository {
  private client: Pool;

  constructor() {
    this.client = pgClient();
  }

  async create({ username, email, password }: UserDTO): Promise<User> {
    const users = await this.client.query(
      'INSERT INTO users (username,email,password) VALUES ($1,$2,$3) RETURNING id, username, email',
      [username, email, password],
    );
    return users.rows[0] as User;
  }
}
