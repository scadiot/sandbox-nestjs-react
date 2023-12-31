import { Injectable, Logger } from '@nestjs/common';
import { PostsRepository } from '../../infra/database/repositories/posts';
import { Post } from '../../domain/entities/post';
import { UseCase } from '../use-case';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

export interface CreatePostCommand {
  title: string;
  content: string;
  authorId: number;
}

@Injectable()
export class CreatePostUseCase implements UseCase<CreatePostCommand, Post> {
  private readonly logger = new Logger(CreatePostUseCase.name);

  constructor(
    private readonly postsRepository: PostsRepository,
    @InjectQueue('defaultQueue') private defaultQueue: Queue,
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
