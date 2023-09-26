import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PostDto {
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @IsNotEmpty()
  @ApiProperty()
  authorId: number;
}

export class CreatePostDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  content: string;
}
