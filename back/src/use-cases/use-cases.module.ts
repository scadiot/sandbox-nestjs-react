import { Module } from '@nestjs/common';
import { CreatePostUseCase } from './post/create';
import { ListPostsUseCase } from './post/list';
import { DeletePostUseCase } from './post/delete';
import { IndexPostsUseCase } from './post/index-post';
import { SearchPostsUseCase } from './post/search';
import { SignupUseCase } from './user/signup';
import { DatabaseModule } from '../infra/database/database.module';
import { QueueModule } from 'src/queues/queues.module';
import { ServiceModule } from '../infra/services/service.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [DatabaseModule, QueueModule, ServiceModule, BullModule],
  providers: [
    CreatePostUseCase,
    SignupUseCase,
    ListPostsUseCase,
    DeletePostUseCase,
    IndexPostsUseCase,
    SearchPostsUseCase,
  ],
  exports: [
    CreatePostUseCase,
    SignupUseCase,
    ListPostsUseCase,
    DeletePostUseCase,
    IndexPostsUseCase,
    SearchPostsUseCase,
  ],
})
export class UseCasesModule {}
