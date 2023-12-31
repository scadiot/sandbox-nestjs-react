import { Injectable } from '@nestjs/common';
import { IndexationService } from 'src/infra/services/indexation.service';
import { Post } from 'src/domain/entities/post';
import { UseCase } from 'src/use-cases/use-case';

export interface SearchPostCommand {
  query: string;
}

@Injectable()
export class SearchPostsUseCase implements UseCase<SearchPostCommand, Post[]> {
  constructor(private readonly indexationService: IndexationService) {}

  async execute(command: SearchPostCommand): Promise<Post[]> {
    return await this.indexationService.search('posts', command.query);
  }
}
