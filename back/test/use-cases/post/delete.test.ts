import { PostsRepository } from 'src/infra/database/repositories/posts';
import { CustomLogger } from 'src/infra/services/custom-logger.service';
import { DeletePostUseCase } from 'src/use-cases/post/delete';

const PostsRepositoryMocked: PostsRepository = {
  create: jest.fn(),
  list: jest.fn(),
  delete: jest.fn(),
  get: jest.fn(),
};

const logger = {
  log: jest.fn(),
} as unknown as CustomLogger;

describe('DeletePostUseCase', () => {
  it('should call delete post', async () => {
    const spyDelete = jest.spyOn(PostsRepositoryMocked, 'delete');
    await new DeletePostUseCase(PostsRepositoryMocked, logger).execute({
      userId: 2,
      postId: 10,
    });

    expect(spyDelete).toHaveBeenCalledWith(10);
  });
});
