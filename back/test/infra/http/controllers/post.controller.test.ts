import { PostController } from 'src/infra/http/controllers/post.controller';
import { buildPost, buildUser } from '../../../utils/builder';
import { CreatePostUseCase } from 'src/use-cases/post/create';
import { ListPostsUseCase } from 'src/use-cases/post/list';
import { DeletePostUseCase } from 'src/use-cases/post/delete';
import { Post } from 'src/domain/entities/post';
import { SearchPostsUseCase } from 'src/use-cases/post/search';

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
} as unknown as ListPostsUseCase;

const deletePostUseCase = {
  execute: jest.fn(),
} as unknown as DeletePostUseCase;

const searchPostsUseCase = {
  execute: jest.fn(),
} as unknown as SearchPostsUseCase;

describe('PostController', () => {
  describe('createPost', () => {
    const spyCreatePostUseCase = jest.spyOn(createPostUseCase, 'execute');

    const postController = new PostController(
      createPostUseCase,
      getPostUseCase,
      deletePostUseCase,
      searchPostsUseCase,
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
      deletePostUseCase,
      searchPostsUseCase,
    );

    it('should create a posts', async () => {
      const postsList = await postController.list();

      expect(spyGetPostsUseCase).toHaveBeenCalled();

      expect(postsList).toEqual([post1, post2]);
    });
  });

  describe('delete', () => {
    const spyDeletePostUseCase = jest.spyOn(deletePostUseCase, 'execute');

    const postController = new PostController(
      createPostUseCase,
      getPostUseCase,
      deletePostUseCase,
      searchPostsUseCase,
    );

    it('should create a posts', async () => {
      await postController.delete({ user: newUser }, 123);

      expect(spyDeletePostUseCase).toHaveBeenCalledWith({
        postId: 123,
        userId: 1,
      });
    });
  });
});
