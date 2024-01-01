import { Injectable } from '@nestjs/common';
import { CustomLogger } from 'src/infra/services/custom-logger.service';
import { PostsRepository } from 'src/infra/database/repositories/posts';
import { UseCase } from '../use-case';

export interface DeletePostCommand {
  postId: number;
  userId: number;
}

@Injectable()
export class DeletePostUseCase implements UseCase<DeletePostCommand, void> {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly logger: CustomLogger,
  ) {}

  async execute(command: DeletePostCommand): Promise<void> {
    this.logger.log(`Delete post`, command);
    await this.postsRepository.delete(command.postId);
  }
}
