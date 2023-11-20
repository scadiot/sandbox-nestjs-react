import { Injectable } from '@nestjs/common';
import {
  UsersRepository,
  UserCreateData,
} from '../../infra/database/repositories/users';
import { User } from '../../domain/entities/user';
import { UseCase } from '../use-case';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

export interface SignupUseCaseCommand {
  email: string;
  name: string;
}

@Injectable()
export class SignupUseCase implements UseCase<SignupUseCaseCommand, User> {
  constructor(
    private readonly usersRepository: UsersRepository,
    @InjectQueue('defaultQueue') private defaultQueue: Queue,
  ) {}

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

    await this.defaultQueue.add('USER_CREATED', {
      user,
    });

    return user;
  }
}
