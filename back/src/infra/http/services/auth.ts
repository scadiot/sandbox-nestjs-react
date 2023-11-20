import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/infra/database/repositories/users';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(params: { email: string }): Promise<any> {
    const { email } = params;
    const user = await this.usersRepository.findByEmail(email);
    //if (user?.password !== pass) {
    //  throw new UnauthorizedException();
    //}

    const payload = { user: { id: user.id, name: user.name } };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
