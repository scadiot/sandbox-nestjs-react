import { SignupUseCase } from 'src/use-cases/user/signup';
import { CustomLogger } from 'src/infra/services/custom-logger.service';
import { UsersRepository } from 'src/infra/database/repositories/users';
const resultUser = {
  id: 1,
  name: 'Robert',
  email: 'robert@test.fr',
  hashedPassword: 'hashed_pass',
};

const existingUser = {
  id: 1098,
  name: 'Seb',
  email: 'existingUser@test.fr',
  hashedPassword: 'hashed_pass',
};

const UsersRepositoryMocked: UsersRepository = {
  create: async () => resultUser,
  findByEmail: async (email: string) => {
    return email === 'existingUser@test.fr' ? existingUser : null;
  },
};

const DefaultQueueMocked: any = {
  add: async () => {
    return;
  },
};

const PasswordServiceMocked: any = {
  hashPassword: async () => {
    return 'hashed_pass';
  },
};

const logger = {
  log: jest.fn(),
} as unknown as CustomLogger;

describe('SignupUseCase', () => {
  it('should create an user', async () => {
    const spyCreate = jest.spyOn(UsersRepositoryMocked, 'create');
    const spyFindByEmail = jest.spyOn(UsersRepositoryMocked, 'findByEmail');
    const spyDefaultQueue = jest.spyOn(DefaultQueueMocked, 'add');
    const spyHashPassword = jest.spyOn(PasswordServiceMocked, 'hashPassword');

    const result = await new SignupUseCase(
      UsersRepositoryMocked,
      DefaultQueueMocked,
      PasswordServiceMocked,
      logger,
    ).execute({
      name: 'Robert',
      email: 'robert@test.fr',
      password: 'pass',
    });

    expect(spyHashPassword).toHaveBeenCalledWith('pass');

    expect(spyCreate).toHaveBeenCalledWith({
      name: 'Robert',
      email: 'robert@test.fr',
      hashedPassword: 'hashed_pass',
    });

    expect(spyFindByEmail).toHaveBeenCalledWith('robert@test.fr');

    expect(spyDefaultQueue).toHaveBeenCalledWith('USER_CREATED', {
      user: {
        id: 1,
        name: 'Robert',
        email: 'robert@test.fr',
        hashedPassword: 'hashed_pass',
      },
    });

    expect(result).toEqual(resultUser);
  });

  it('should throw an error', async () => {
    const result = new SignupUseCase(
      UsersRepositoryMocked,
      DefaultQueueMocked,
      PasswordServiceMocked,
      logger,
    ).execute({
      name: 'Robert',
      email: 'existingUser@test.fr',
      password: 'pass',
    });

    expect(result).rejects.toThrow('email already exist');
  });
});
