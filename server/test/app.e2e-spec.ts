import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'

describe('AppModule', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });
  
  afterAll(async () => {
    await app.close()
  })

  it(`/POST /auth/register, it can register a user`, (done) => { 
    request(app.getHttpServer())
      .post('/auth/register')
      .send({
        firstName: 'Test',
        familyName: 'Test Family',
        email: 'test.test@example.com',
        password: '1234567890',
      })
      .expect(201)
      .expect(result => {
        expect(result.body.id).not.toBeNull()
      })
      .end(done);
  })

  it(`/POST /auth/login, it can log in an existing user`, (done) => { 
    request(app.getHttpServer())
      .post('/auth/register')
      .send({
        firstName: 'Test2',
        familyName: 'Test Family2',
        email: 'test2.tes2t@example.com',
        password: '1234567890',
      })
      .expect(201)
      .expect(result => {
        expect(result.body.id).not.toBeNull()
      })
      .end(() => {
        request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test2.test2@example.com',
            password: '1234567890',
          })
          // .expect(201)
          .expect(result => {
            expect(result.body.jwt).not.toBeNull()
          })
          .end(done);
      })
  })
})