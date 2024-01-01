import { PostsRepository } from 'src/infra/database/repositories/posts';
import { CustomLogger } from 'src/infra/services/custom-logger.service';
import { IndexationService } from 'src/infra/services/indexation.service';
import { IndexPostsUseCase } from 'src/use-cases/post/index-post';

const documentInDb = { id: 1234, title: 'test' };

const PostsRepositoryMocked: PostsRepository = {
  get: () => documentInDb,
} as unknown as PostsRepository;

const IndexationServiceMocked: IndexationService = {
  index: jest.fn(),
} as unknown as IndexationService;

const logger = {
  log: jest.fn(),
} as unknown as CustomLogger;

describe('IndexPostUseCase', () => {
  it('should index post in ES', async () => {
    const spyGet = jest.spyOn(PostsRepositoryMocked, 'get');
    const spyIndex = jest.spyOn(IndexationServiceMocked, 'index');

    await new IndexPostsUseCase(
      PostsRepositoryMocked,
      IndexationServiceMocked,
      logger,
    ).execute({
      postId: 1234,
    });

    expect(spyGet).toHaveBeenCalledWith(1234);
    expect(spyIndex).toHaveBeenCalledWith('posts', '1234', documentInDb);
  });
});
