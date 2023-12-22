import { User } from 'src/domain/entities/user';
import { Post } from 'src/domain/entities/post';
import { toDomain as prismaUserToDomain } from 'src/infra/database/prisma/repository/users';
import { toDomain as prismaPostToDomain } from 'src/infra/database/prisma/repository/posts';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

export async function insertUser(prismaService: PrismaService): Promise<User> {
  const prismaUser = await prismaService.user.create({
    data: {
      email: 'test@test.fr',
      name: 'robert',
      hashedPassword: 'pass',
    },
  });
  return prismaUserToDomain(prismaUser);
}

export async function insertPost(
  prismaService: PrismaService,
  authorId: number,
): Promise<Post> {
  const prismaPost = await prismaService.post.create({
    data: {
      title: 'title',
      content: 'content',
      author_id: authorId,
    },
  });
  return prismaPostToDomain(prismaPost);
}

export async function clearDb(prismaService: PrismaService): Promise<void> {
  await prismaService.post.deleteMany();
  await prismaService.user.deleteMany();
}
