import { ListPostsUseCase } from 'src/use-cases/post/list';
import { PostsRepository } from 'src/infra/database/repositories/posts';
import { Post } from 'src/domain/entities/post';

const post1 = new Post({
  id: 1,
  createdAt: new Date(),
  title: 'title1',
  content: 'content1',
  authorId: 1,
});

const posts: Post[] = [
  post1,
  new Post({
    id: 2,
    createdAt: new Date(),
    title: 'title2',
    content: 'content2',
    authorId: 1,
  }),
];

const PostsRepositoryMocked: PostsRepository = {
  async list(): Promise<Post[]> {
    return posts;
  },
  delete: jest.fn(),
  create: jest.fn(),
  get: jest.fn(),
};

describe('ListPostsUseCase', () => {
  it('should call list posts', async () => {
    const spyList = jest.spyOn(PostsRepositoryMocked, 'list');
    const result = await new ListPostsUseCase(PostsRepositoryMocked).execute();

    expect(spyList).toHaveBeenCalled();
    expect(result).toEqual(posts);
  });
});
