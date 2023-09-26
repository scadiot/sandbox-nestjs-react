import { Post } from '../entities/post';

export interface PostCreateData {
  title: string;
  content: string;
  authorId: number;
}

export abstract class PostsRepository {
  abstract create(postCreateData: PostCreateData): Promise<Post>;
  abstract list(): Promise<Post[]>;
}
