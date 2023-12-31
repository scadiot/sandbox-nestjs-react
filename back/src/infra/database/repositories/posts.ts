import { Post } from '../../../domain/entities/post';

export interface PostCreateData {
  title: string;
  content: string;
  authorId: number;
}

export abstract class PostsRepository {
  abstract create(postCreateData: PostCreateData): Promise<Post>;
  abstract list(): Promise<Post[]>;
  abstract delete(id: number): Promise<void>;
  abstract get(id: number): Promise<Post>;
}
