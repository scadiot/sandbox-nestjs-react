import { PostController } from 'src/infra/http/controllers/post.controller';
import { buildPost, buildUser } from '../../../utils/builder';
import { CreatePostUseCase } from 'src/domain/use-cases/post/create';
import { GetPostsUseCase } from 'src/domain/use-cases/post/get';
import { Post } from 'src/domain/entities/post';

const newUser = buildUser();
const post1 = buildPost({ authorId: newUser.id });
const post2 = buildPost({ authorId: newUser.id });

const createPostUseCase = {
  async execute(): Promise<Post> {
    return post1;
  },
  postsRepository: undefined,
} as unknown as CreatePostUseCase;

const getPostUseCase = {
  async execute() {
    return [post1, post2];
  },
} as unknown as GetPostsUseCase;

describe('PostController', () => {
  describe('createPost', () => {
    const spyCreatePostUseCase = jest.spyOn(createPostUseCase, 'execute');

    const postController = new PostController(
      createPostUseCase,
      getPostUseCase,
    );

    it('should create a posts', async () => {
      const newPost = await postController.createPost(
        { user: newUser },
        { title: 'test', content: 'content' },
      );

      expect(spyCreatePostUseCase).toHaveBeenCalledWith({
        title: 'test',
        content: 'content',
        authorId: 1,
      });

      expect(newPost).toEqual(post1);
    });
  });

  describe('list', () => {
    const spyGetPostsUseCase = jest.spyOn(getPostUseCase, 'execute');

    const postController = new PostController(
      createPostUseCase,
      getPostUseCase,
    );

    it('should create a posts', async () => {
      const postsList = await postController.list();

      expect(spyGetPostsUseCase).toHaveBeenCalled();

      expect(postsList).toEqual([post1, post2]);
    });
  });
});
