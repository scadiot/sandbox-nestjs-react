import { Module } from '@nestjs/common';
import { CreatePostUseCase } from './use-cases/post/create';
import { GetPostsUseCase } from './use-cases/post/get';
import { SignupUseCase } from './use-cases/user/signup';
import { DatabaseModule } from '../infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CreatePostUseCase, SignupUseCase, GetPostsUseCase],
  exports: [CreatePostUseCase, SignupUseCase, GetPostsUseCase],
})
export class DomainModule {}
