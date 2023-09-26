import { Injectable } from '@nestjs/common';
import { PostsRepository } from '../../repositories/posts';
import { Post } from '../../entities/post';
import { UseCase } from '../use-case';

export interface CreatePostCommand {
  title: string;
  content: string;
  authorId: number;
}

@Injectable()
export class CreatePostUseCase implements UseCase<CreatePostCommand, Post> {
  constructor(private readonly postsRepository: PostsRepository) {}

  async execute(request: CreatePostCommand): Promise<Post> {
    return await this.postsRepository.create(request);
  }
}
