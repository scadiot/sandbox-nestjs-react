import { AuthGuard } from 'src/infra/http/services/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { buildUser } from '../../../utils/builder';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

const user = buildUser();

const jwtService = {
  verifyAsync: () => {
    return { user };
  },
} as unknown as JwtService;

const executionContext = {
  switchToHttp: () => ({
    getRequest: () => ({ headers: { authorization: 'Bearer token' } }),
  }),
} as unknown as ExecutionContext;

describe('AuthGuard', () => {
  describe('canActivate', () => {
    it('valid token', async () => {
      const spySignAsync = jest.spyOn(jwtService, 'verifyAsync');

      const result = await new AuthGuard(jwtService).canActivate(
        executionContext,
      );

      expect(spySignAsync).toHaveBeenCalledWith('token');

      expect(result).toEqual(true);
    });

    it('return UnauthorizedException (no token)', async () => {
      const executionContext = {
        switchToHttp: () => ({
          getRequest: () => ({ headers: {} }),
        }),
      } as unknown as ExecutionContext;

      const result = new AuthGuard(jwtService).canActivate(executionContext);

      expect(result).rejects.toThrow();
    });

    it('return UnauthorizedException (bad token)', async () => {
      const jwtService = {
        verifyAsync: () => {
          throw Error();
        },
      } as unknown as JwtService;

      const result = new AuthGuard(jwtService).canActivate(executionContext);

      expect(result).rejects.toThrow();
    });
  });
});
