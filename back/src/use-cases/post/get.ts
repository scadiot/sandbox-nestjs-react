import { Injectable } from '@nestjs/common';
import { PostsRepository } from '../../infra/database/repositories/posts';
import { Post } from '../../domain/entities/post';
import { UseCase } from '../use-case';

@Injectable()
export class GetPostsUseCase implements UseCase<void, Post[]> {
  constructor(private readonly postsRepository: PostsRepository) {}

  async execute(): Promise<Post[]> {
    return await this.postsRepository.list();
  }
}
