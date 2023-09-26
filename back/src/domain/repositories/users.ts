import { User } from '../entities/user';

export interface UserCreateData {
  email: string;
  name: string;
}

export abstract class UsersRepository {
  abstract create(userCreateData: UserCreateData): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
}
