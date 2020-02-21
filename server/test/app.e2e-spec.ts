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

  it(`/POST /api/v1/auth/register, it can register a user`, (done) => { 
    request(app.getHttpServer())
      .post('/api/v1/auth/register')
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

  it(`/POST /api/v1/auth/login, it can log in an existing user`, (done) => { 
    request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send({
        firstName: 'Test2',
        familyName: 'Test Family2',
        email: 'test2.test2@example.com',
        password: '1234567890',
      })
      .expect(201)
      .expect(result => {
        expect(result.body.id).not.toBeNull()
      })
      .end(() => {
        request(app.getHttpServer())
          .post('/api/v1/auth/login')
          .send({
            email: 'test2.test2@example.com',
            password: '1234567890',
          })
          .expect(201)
          .expect(result => {
            expect(result.body.jwt).not.toBeNull()
          })
          .end(done);
      })
  })

  it(`/POST /auth/login, it should fail to log in with wrong user EMAIL credentials`, (done) => { 
    request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send({
        firstName: 'Test3',
        familyName: 'Test Family3',
        email: 'test3.test3@example.com',
        password: '0987654321',
      })
      .expect(201)
      .expect(result => {
        expect(result.body.id).not.toBeNull()
      })
      .end(() => {
        request(app.getHttpServer())
          .post('/api/v1/auth/login')
          .send({
            email: 'modified.test3@example.com',
            password: '0987654321',
          })
          .expect(401)
          .expect(result => {
            expect(result.body.message).toEqual('invalid credentials')
          })
          .end(done);
      })
  })

  it(`/POST /api/v1/auth/login, it should fail to log in with wrong user PASSWORD credentials`, (done) => { 
    request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send({
        firstName: 'Test4',
        familyName: 'Test Family4',
        email: 'test4.test4@example.com',
        password: '0987654321',
      })
      .expect(201)
      .expect(result => {
        expect(result.body.id).not.toBeNull()
      })
      .end(() => {
        request(app.getHttpServer())
          .post('/api/v1/auth/login')
          .send({
            email: 'test4.test4@example.com',
            password: '123456789',
          })
          .expect(401)
          .expect(result => {
            expect(result.body.message).toEqual('invalid credentials')
          })
          .end(done);
      })
  })
})