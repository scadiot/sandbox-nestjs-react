import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UsersRepository, UserCreateData } from 'src/domain/repositories/users';
import { User } from 'src/domain/entities/user';
import { User as PrismaUser } from '@prisma/client';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: UserCreateData): Promise<User> {
    const userPrisma = await this.prisma.user.create({
      data,
    });

    return toDomain(userPrisma);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userPrisma = await this.prisma.user.findFirst({
      where: { email },
    });

    if (userPrisma === null) return null;

    return toDomain(userPrisma);
  }
}

export function toDomain(prismaUser: PrismaUser): User {
  return new User({
    id: prismaUser.id,
    email: prismaUser.email,
    name: prismaUser.name,
  });
}
