import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import {
  CreatePostUseCase,
  CreatePostCommand,
} from 'src/use-cases/post/create';
import { ListPostsUseCase } from 'src/use-cases/post/list';
import {
  DeletePostUseCase,
  DeletePostCommand,
} from 'src/use-cases/post/delete';
import { SearchPostsUseCase } from 'src/use-cases/post/search';
import { PostDto, CreatePostDto } from '../dtos';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../services/auth.guard';

@Controller('post')
@ApiTags('Post')
export class PostController {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly listPostsUseCase: ListPostsUseCase,
    private readonly deletePostUseCase: DeletePostUseCase,
    private readonly searchPostsUseCase: SearchPostsUseCase,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async createPost(
    @Request() req,
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostDto> {
    const createPostCommand: CreatePostCommand = {
      ...createPostDto,
      authorId: req.user.id,
    };
    return await this.createPostUseCase.execute(createPostCommand);
  }

  @Get()
  async list(): Promise<PostDto[]> {
    return await this.listPostsUseCase.execute();
  }

  @Get('search/:query')
  async search(@Param('query') query: string): Promise<PostDto[]> {
    return await this.searchPostsUseCase.execute({ query });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(
    @Request() req,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<void> {
    const deletePostCommand: DeletePostCommand = {
      postId: id,
      userId: req.user.id,
    };
    return await this.deletePostUseCase.execute(deletePostCommand);
  }
}
