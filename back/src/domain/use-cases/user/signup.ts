import { Injectable } from '@nestjs/common';
import { UsersRepository, UserCreateData } from '../../repositories/users';
import { User } from '../../entities/user';
import { UseCase } from '../use-case';

export interface SignupUseCaseCommand {
  email: string;
  name: string;
}

@Injectable()
export class SignupUseCase implements UseCase<SignupUseCaseCommand, User> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(request: SignupUseCaseCommand): Promise<User> {
    const { email, name } = request;

    const existingUser = await this.usersRepository.findByEmail(email);

    if (existingUser) {
      throw Error('email already exist');
    }

    const userCreateData: UserCreateData = {
      email,
      name,
    };

    const user = await this.usersRepository.create(userCreateData);

    return user;
  }
}
