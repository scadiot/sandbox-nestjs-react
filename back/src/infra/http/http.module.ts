import { Module } from '@nestjs/common';
import { AuthService } from './services/auth';
import { DatabaseModule } from 'src/infra/database/database.module';
import { UserController } from 'src/infra/http/controllers/user.controller';
import { PostController } from 'src/infra/http/controllers/post.controller';
import { UseCasesModule } from 'src/use-cases/use-cases.module';
import { JwtModule } from '@nestjs/jwt';
import { ServiceModule } from 'src/infra/services/service.module';

@Module({
  imports: [
    DatabaseModule,
    UseCasesModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
    ServiceModule,
  ],
  providers: [AuthService],
  controllers: [UserController, PostController],
})
export class HttpModule {}
