import { PrismaPostsRepository } from 'src/infra/database/prisma/repository/posts';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { insertUser, insertPost, clearDb } from './utils';

describe('User repository', () => {
  const prismaService = new PrismaService();
  const prismaPostsRepository = new PrismaPostsRepository(prismaService);

  beforeAll(async () => {
    await prismaService.$connect();
  });

  beforeEach(async () => {
    await clearDb(prismaService);
  });

  describe('create', () => {
    it('should create an user', async () => {
      const user = await insertUser(prismaService);

      await prismaPostsRepository.create({
        title: 'title',
        content: 'content',
        authorId: user.id,
      });
      const newPost = await prismaService.post.findFirst({
        where: { title: 'title' },
      });
      expect(newPost).not.toBeNull();
    });
  });

  describe('list', () => {
    it('should extract all posts', async () => {
      const user = await insertUser(prismaService);

      const post1 = await insertPost(prismaService, user.id);
      const post2 = await insertPost(prismaService, user.id);

      const posts = [post1, post2];

      const result = await prismaPostsRepository.list();
      expect(result).toEqual(posts);
    });
  });
});
