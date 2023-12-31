import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  PostsRepository,
  PostCreateData,
} from 'src/infra/database/repositories/posts';
import { Post } from 'src/domain/entities/post';
import { Post as PrismaPost } from '@prisma/client';

@Injectable()
export class PrismaPostsRepository implements PostsRepository {
  constructor(private prisma: PrismaService) {}

  async create(param: PostCreateData): Promise<Post> {
    const data = postCreateDataToPrisma(param);
    const postPrisma = await this.prisma.post.create({
      data,
    });

    return toDomain(postPrisma);
  }

  async get(id: number): Promise<Post> {
    const post = await this.prisma.post.findFirst({ where: { id } });
    return toDomain(post);
  }

  async list(): Promise<Post[]> {
    const postsPrisma = await this.prisma.post.findMany();

    return postsPrisma.map((p) => toDomain(p));
  }

  async delete(id: number): Promise<void> {
    await this.prisma.post.delete({ where: { id } });
  }
}

function postCreateDataToPrisma(postCreate: PostCreateData) {
  return {
    title: postCreate.title,
    content: postCreate.content,
    author_id: postCreate.authorId,
  };
}

export function toDomain(prismaPost: PrismaPost): Post {
  return new Post({
    id: prismaPost.id,
    createAt: prismaPost.created_at,
    title: prismaPost.title,
    content: prismaPost.content,
    authorId: prismaPost.author_id,
  });
}
