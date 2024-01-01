import { Injectable } from '@nestjs/common';
import { CustomLogger } from 'src/infra/services/custom-logger.service';
import { PostsRepository } from 'src/infra/database/repositories/posts';
import { IndexationService } from 'src/infra/services/indexation.service';
import { UseCase } from 'src/use-cases/use-case';

export interface IndexPostCommand {
  postId: number;
}

@Injectable()
export class IndexPostsUseCase implements UseCase<IndexPostCommand, void> {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly indexationService: IndexationService,
    private readonly logger: CustomLogger,
  ) {}

  async execute(command: IndexPostCommand): Promise<void> {
    this.logger.log(`Index post`, command);

    const post = await this.postsRepository.get(command.postId);
    this.indexationService.index('posts', post.id.toString(), post);
  }
}
