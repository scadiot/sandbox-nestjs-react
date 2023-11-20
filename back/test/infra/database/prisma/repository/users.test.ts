import { PrismaUsersRepository } from 'src/infra/database/prisma/repository/users';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { insertUser, clearDb } from './utils';

describe('User repository', () => {
  const prismaService = new PrismaService();
  const prismaUsersRepository = new PrismaUsersRepository(prismaService);

  beforeAll(async () => {
    await prismaService.$connect();
  });

  beforeEach(async () => {
    await clearDb(prismaService);
  });

  describe('create', () => {
    it('should create an user', async () => {
      await prismaUsersRepository.create({
        name: 'Robert',
        email: 'robert@test.fr',
      });
      const newUser = prismaService.user.findFirst({
        where: { email: 'robert@test.fr' },
      });
      expect(newUser).not.toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should extract an user', async () => {
      const newUser = await insertUser(prismaService);

      const findedUser = await prismaUsersRepository.findByEmail(newUser.email);
      expect(findedUser).not.toBeNull();
    });

    it('should return null', async () => {
      const findedUser = await prismaUsersRepository.findByEmail(
        'robert3@test.fr',
      );
      expect(findedUser).toBeNull();
    });
  });
});
