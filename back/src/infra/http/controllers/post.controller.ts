import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  CreatePostUseCase,
  CreatePostCommand,
} from 'src/use-cases/post/create';
import { GetPostsUseCase } from 'src/use-cases/post/get';
import { PostDto, CreatePostDto } from '../dtos';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../services/auth.guard';

@Controller('post')
@ApiTags('Post')
export class PostController {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly getPostsUseCase: GetPostsUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
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
    return await this.getPostsUseCase.execute();
  }
}

//@InjectQueue('queueName') private audioQueue: Queue,
//const job = await this.audioQueue.add('sample', {
//  foo: 'bar',
//});
