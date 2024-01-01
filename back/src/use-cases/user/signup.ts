import { Injectable } from '@nestjs/common';
import {
  UsersRepository,
  UserCreateData,
} from 'src/infra/database/repositories/users';
import { User } from 'src/domain/entities/user';
import { UseCase } from 'src/use-cases/use-case';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PasswordService } from 'src/infra/services/password.service';
import { CustomLogger } from 'src/infra/services/custom-logger.service';

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
    private readonly logger: CustomLogger,
  ) {}

  async execute(command: SignupUseCaseCommand): Promise<User> {
    this.logger.log(`Start signup`, command);

    const { email, name, password } = command;

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
    this.logger.log(`User created`, user);

    await this.defaultQueue.add('USER_CREATED', {
      user,
    });

    return user;
  }
}
