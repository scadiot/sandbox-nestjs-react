import { PostsRepository } from 'src/infra/database/repositories/posts';
import { DeletePostUseCase } from 'src/use-cases/post/delete';

const PostsRepositoryMocked: PostsRepository = {
  create: jest.fn(),
  list: jest.fn(),
  delete: jest.fn(),
  get: jest.fn(),
};

describe('DeletePostUseCase', () => {
  it('should call delete post', async () => {
    const spyDelete = jest.spyOn(PostsRepositoryMocked, 'delete');
    await new DeletePostUseCase(PostsRepositoryMocked).execute({
      userId: 2,
      postId: 10,
    });

    expect(spyDelete).toHaveBeenCalledWith(10);
  });
});
