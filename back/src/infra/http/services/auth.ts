import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/infra/database/repositories/users';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from '../../services/password.service';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  async signIn(params: { email: string; password: string }): Promise<any> {
    const { email } = params;
    const user = await this.usersRepository.findByEmail(email);

    if (user === null) {
      throw new UnauthorizedException();
    }

    const passwordIsValid = await this.passwordService.comparePassword(
      params.password,
      user.hashedPassword,
    );
    if (!passwordIsValid) {
      throw new UnauthorizedException();
    }

    const payload = { user: { id: user.id, name: user.name } };
    return {
      token: await this.jwtService.signAsync(payload),
      user: { id: user.id, name: user.name, email: user.email },
    };
  }
}
