import { SignupUseCase } from 'src/domain/use-cases/user/signup';
import { UsersRepository } from 'src/domain/repositories/users';
const resultUser = { id: 1, name: 'Robert', email: 'robert@test.fr' };

const existingUser = {
  id: 1098,
  name: 'Seb',
  email: 'existingUser@test.fr',
};

const UsersRepositoryMocked: UsersRepository = {
  create: async () => resultUser,
  findByEmail: async (email: string) => {
    return email === 'existingUser@test.fr' ? existingUser : null;
  },
};

describe('SignupUseCase', () => {
  it('should create an user', async () => {
    const spyCreate = jest.spyOn(UsersRepositoryMocked, 'create');
    const spyFindByEmail = jest.spyOn(UsersRepositoryMocked, 'findByEmail');

    const result = await new SignupUseCase(UsersRepositoryMocked).execute({
      name: 'Robert',
      email: 'robert@test.fr',
    });

    expect(spyCreate).toHaveBeenCalledWith({
      name: 'Robert',
      email: 'robert@test.fr',
    });

    expect(spyFindByEmail).toHaveBeenCalledWith('robert@test.fr');
    expect(result).toEqual(resultUser);
  });

  it('should throw an error', async () => {
    const result = new SignupUseCase(UsersRepositoryMocked).execute({
      name: 'Robert',
      email: 'existingUser@test.fr',
    });

    expect(result).rejects.toThrow('email already exist');
  });
});
