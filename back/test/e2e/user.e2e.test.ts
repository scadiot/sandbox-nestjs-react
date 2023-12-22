import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { clearDb } from '../infra/database/prisma/repository/utils';
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

    await clearDb(prismaService);
  });

  it('/signup (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/signup')
      .set('Content-Type', 'application/json')
      .send('{"email":"test@test.com","name":"robert", "password": "pass"}');

    expect(response.status).toEqual(201);
    expect(response.body).toBeDefined();
    expect(response.body).toEqual(
      expect.objectContaining({
        email: 'test@test.com',
        name: 'robert',
      }),
    );
  });
});
