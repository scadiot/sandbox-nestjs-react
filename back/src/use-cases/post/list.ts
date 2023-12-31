import { Injectable } from '@nestjs/common';
import { PostsRepository } from 'src/infra/database/repositories/posts';
import { Post } from 'src/domain/entities/post';
import { UseCase } from 'src/use-cases/use-case';

@Injectable()
export class ListPostsUseCase implements UseCase<void, Post[]> {
  constructor(private readonly postsRepository: PostsRepository) {}

  async execute(): Promise<Post[]> {
    return await this.postsRepository.list();
  }
}
