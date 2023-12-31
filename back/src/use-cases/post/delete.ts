import { Injectable, Logger } from '@nestjs/common';
import { PostsRepository } from '../../infra/database/repositories/posts';
import { UseCase } from '../use-case';

export interface DeletePostCommand {
  postId: number;
  userId: number;
}

@Injectable()
export class DeletePostUseCase implements UseCase<DeletePostCommand, void> {
  private readonly logger = new Logger(DeletePostUseCase.name);

  constructor(private readonly postsRepository: PostsRepository) {}

  async execute(command: DeletePostCommand): Promise<void> {
    this.logger.log(`Delete post`, command);
    await this.postsRepository.delete(command.postId);
  }
}
