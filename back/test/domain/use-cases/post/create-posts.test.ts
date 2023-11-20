import { CreatePostUseCase } from 'src/use-cases/post/create';
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

describe('CreatePostUseCase', () => {
  it('should call create a post', async () => {
    const spyCreate = jest.spyOn(PostsRepositoryMocked, 'create');

    const result = await new CreatePostUseCase(PostsRepositoryMocked).execute({
      title: post1.title,
      content: post1.content,
      authorId: 1,
    });

    expect(spyCreate).toHaveBeenCalledWith({
      title: post1.title,
      content: post1.content,
      authorId: 1,
    });
    expect(result).toEqual(post1);
  });
});
