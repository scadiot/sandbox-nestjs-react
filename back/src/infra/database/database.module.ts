import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { PrismaUsersRepository } from './prisma/repository/users';
import { PrismaPostsRepository } from './prisma/repository/posts';
import { UsersRepository } from 'src/infra/database/repositories/users';
import { PostsRepository } from 'src/infra/database/repositories/posts';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    PrismaService,
    {
      provide: PostsRepository,
      useClass: PrismaPostsRepository,
    },
  ],
  exports: [
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: PostsRepository,
      useClass: PrismaPostsRepository,
    },
  ],
})
export class DatabaseModule {}
