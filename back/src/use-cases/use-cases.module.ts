import { Module } from '@nestjs/common';
import { CreatePostUseCase } from './post/create';
import { GetPostsUseCase } from './post/get';
import { SignupUseCase } from './user/signup';
import { DatabaseModule } from '../infra/database/database.module';
import { QueueModule } from 'src/queues/queues.module';

@Module({
  imports: [DatabaseModule, QueueModule],
  providers: [CreatePostUseCase, SignupUseCase, GetPostsUseCase],
  exports: [CreatePostUseCase, SignupUseCase, GetPostsUseCase],
})
export class UseCasesModule {}
