import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { PrismaUsersRepository } from './prisma/repository/users';
import { PrismaPostsRepository } from './prisma/repository/posts';
import { UsersRepository } from 'src/domain/repositories/users';
import { PostsRepository } from 'src/domain/repositories/posts';

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
