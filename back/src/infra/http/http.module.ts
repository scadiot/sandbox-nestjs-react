import { Module } from '@nestjs/common';
import { AuthService } from './services/auth';
import { DatabaseModule } from 'src/infra/database/database.module';
import { UserController } from 'src/infra/http/controllers/user.controller';
import { PostController } from 'src/infra/http/controllers/post.controller';
import { DomainModule } from 'src/domain/domain.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    DomainModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService],
  controllers: [UserController, PostController],
})
export class HttpModule {}
