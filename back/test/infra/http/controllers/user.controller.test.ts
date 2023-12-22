import { UserController } from 'src/infra/http/controllers/user.controller';
import { buildUser } from '../../../utils/builder';
import { SignupUseCase } from 'src/use-cases/user/signup';
import { User } from 'src/domain/entities/user';
import { AuthService } from 'src/infra/http/services/auth';

const user = buildUser();

const signupUseCase = {
  async execute(): Promise<User> {
    return user;
  },
  postsRepository: undefined,
} as unknown as SignupUseCase;

const authService = {
  async signIn() {
    return 'token';
  },
} as unknown as AuthService;

describe('UserController', () => {
  describe('signup', () => {
    const spySignupUseCase = jest.spyOn(signupUseCase, 'execute');

    const userController = new UserController(signupUseCase, authService);

    it('should create a posts', async () => {
      const newUser = await userController.signup({
        email: 'test@test.fr',
        name: 'robert',
        password: 'pass',
      });

      expect(spySignupUseCase).toHaveBeenCalledWith({
        email: 'test@test.fr',
        name: 'robert',
        password: 'pass',
      });

      expect(newUser).toEqual(user);
    });
  });

  describe('signin', () => {
    const spyAuthService = jest.spyOn(authService, 'signIn');

    const userController = new UserController(signupUseCase, authService);

    it('should create a posts', async () => {
      const signinResult = await userController.signIn({
        email: 'test@test.fr',
        password: 'test',
      });

      expect(spyAuthService).toHaveBeenCalled();

      expect(signinResult).toEqual('token');
    });
  });

  describe('getProfile', () => {
    const userController = new UserController(signupUseCase, authService);

    it('should create a posts', async () => {
      const profileResult = await userController.getProfile({
        user: 'test',
      });

      expect(profileResult).toEqual('test');
    });
  });
});
