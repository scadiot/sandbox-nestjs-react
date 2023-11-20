import { AuthService } from 'src/infra/http/services/auth';
import { UsersRepository } from 'src/infra/database/repositories/users';
import { JwtService } from '@nestjs/jwt';
import { buildUser } from '../../../utils/builder'

const user = buildUser();

const UsersRepositoryMocked = {
  findByEmail: async () => user,
} as unknown as UsersRepository;

const jwtService = {
  signAsync: () => {
    return 'token';
  },
} as unknown as JwtService;

describe('SignupUseCase', () => {
  it('should create an user', async () => {
    const spySignAsync = jest.spyOn(jwtService, 'signAsync');
    const spyFindByEmail = jest.spyOn(UsersRepositoryMocked, 'findByEmail');

    const result = await new AuthService(
      UsersRepositoryMocked,
      jwtService,
    ).signIn({
      email: user.email,
    });

    expect(spySignAsync).toHaveBeenCalledWith({
      user: { id: user.id, name: user.name },
    });
    expect(spyFindByEmail).toHaveBeenCalledWith(user.email);
    expect(result).toEqual({ access_token: 'token' });
  });
});
