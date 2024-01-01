import { Injectable } from '@nestjs/common';
import { PostsRepository } from 'src/infra/database/repositories/posts';
import { CustomLogger } from 'src/infra/services/custom-logger.service';
import { Post } from 'src/domain/entities/post';
import { UseCase } from 'src/use-cases/use-case';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

export interface CreatePostCommand {
  title: string;
  content: string;
  authorId: number;
}

@Injectable()
export class CreatePostUseCase implements UseCase<CreatePostCommand, Post> {
  constructor(
    private readonly postsRepository: PostsRepository,
    @InjectQueue('defaultQueue') private defaultQueue: Queue,
    private readonly logger: CustomLogger,
  ) {}

  async execute(command: CreatePostCommand): Promise<Post> {
    this.logger.log(`Create post`, command);
    const post = await this.postsRepository.create(command);

    // In real life, indexing would be done synchronously directly within this function.
    // Here, it's a test of sending an asynchronous task.
    await this.defaultQueue.add('INDEX_POST', { postId: post.id });

    return post;
  }
}
