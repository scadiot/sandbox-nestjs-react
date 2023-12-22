import { Injectable } from '@nestjs/common';
import {
  UsersRepository,
  UserCreateData,
} from '../../infra/database/repositories/users';
import { User } from '../../domain/entities/user';
import { UseCase } from '../use-case';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PasswordService } from '../../infra/services/password.service';

export interface SignupUseCaseCommand {
  email: string;
  name: string;
  password: string;
}

@Injectable()
export class SignupUseCase implements UseCase<SignupUseCaseCommand, User> {
  constructor(
    private readonly usersRepository: UsersRepository,
    @InjectQueue('defaultQueue') private defaultQueue: Queue,
    private readonly passwordService: PasswordService,
  ) {}

  async execute(request: SignupUseCaseCommand): Promise<User> {
    const { email, name, password } = request;

    const existingUser = await this.usersRepository.findByEmail(email);

    if (existingUser) {
      throw Error('email already exist');
    }

    const hashedPassword = await this.passwordService.hashPassword(password);

    const userCreateData: UserCreateData = {
      email,
      name,
      hashedPassword,
    };

    const user = await this.usersRepository.create(userCreateData);

    await this.defaultQueue.add('USER_CREATED', {
      user,
    });

    return user;
  }
}
