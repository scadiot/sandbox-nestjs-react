import { User } from '../../../domain/entities/user';

export interface UserCreateData {
  email: string;
  name: string;
  hashedPassword: string;
}

export abstract class UsersRepository {
  abstract create(userCreateData: UserCreateData): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
}
