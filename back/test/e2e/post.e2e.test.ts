import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import {
  insertUser,
  insertPost,
  clearDb,
} from '../infra/database/prisma/repository/utils';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

describe('AppController (e2e)', () => {
  const prismaService = new PrismaService();

  let app: INestApplication;

  beforeAll(async () => {
    await prismaService.$connect();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/post (GET)', async () => {
    await clearDb(prismaService);
    const user = await insertUser(prismaService);
    const post1 = await insertPost(prismaService, user.id);
    const post2 = await insertPost(prismaService, user.id);

    const response = await request(app.getHttpServer()).get('/post');

    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(response.body).toEqual([post1, post2]);
  });

  it('/post (GET)', async () => {
    await clearDb(prismaService);
    const user = await insertUser(prismaService);
    const post1 = await insertPost(prismaService, user.id);
    const post2 = await insertPost(prismaService, user.id);

    const response = await request(app.getHttpServer()).get('/post');

    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(response.body).toEqual([post1, post2]);
  });
});
