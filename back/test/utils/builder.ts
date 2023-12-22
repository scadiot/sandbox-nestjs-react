import { Post } from 'src/domain/entities/post';
import { User } from 'src/domain/entities/user';

export function buildUser(): User {
  return {
    id: 1,
    name: 'rober',
    email: 'test@test.fr',
    hashedPassword: 'pass',
  };
}

export function buildPost({ authorId = 1 }): Post {
  return {
    id: 1,
    createdAt: new Date(),
    title: 'test',
    content: 'test',
    authorId,
  };
}
