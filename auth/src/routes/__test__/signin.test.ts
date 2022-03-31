import request from 'supertest';
import { app } from '../../app';

describe('signin: ', () => {

  it('fails when a email that doesn\'t exist is supplied', async () => {

    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(400);
  });

  it('fails when an incorrect password is supplied', async () => {

    await global.signin();

    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'wrong password',
      })
      .expect(400);
  });

  it('responds with a cookie when given valid credentials', async () => {

    await request(app);
    await global.signin();

    const response = await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
  });
});