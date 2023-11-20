import { GetPostsUseCase } from 'src/use-cases/post/get';
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
  async create(): Promise<Post> {
    return post1;
  },
  async list(): Promise<Post[]> {
    return posts;
  },
};

describe('GetPostsUseCase', () => {
  it('should call list posts', async () => {
    const spyList = jest.spyOn(PostsRepositoryMocked, 'list');
    const result = await new GetPostsUseCase(PostsRepositoryMocked).execute();

    expect(spyList).toHaveBeenCalled();
    expect(result).toEqual(posts);
  });
});
