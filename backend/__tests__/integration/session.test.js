import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';
import getToken from '../getToken';

describe('Session', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credentials', async () => {
    const response = await getToken();

    expect(response.status).toBe(200);
  });

  it('should not authenticate with invalid credentials', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123',
      });

    expect(response.status).toBe(401);
  });

  it('should return jwt token when authenticated', async () => {
    const { body } = await getToken();

    expect(body).toHaveProperty('token');
  });

  it('should not be able to access when email or password is not provided', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        password: user.password,
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to access when user does not exist', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'anotheremail@email.com',
        password: user.password,
      });

    expect(response.status).toBe(401);
  });

  it('should be able to access private routes when authenticated', async () => {
    const { body } = await getToken();

    const { status } = await request(app)
      .get('/recipients')
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(200);
  });

  it('should not be able to access private routes without jwt token', async () => {
    const response = await request(app).get('/recipients');

    expect(response.status).toBe(401);
  });

  it('should not be able to access private routes with invalid jwt token', async () => {
    const response = await request(app)
      .get('/students')
      .set('Authorization', 'Bearer 123456');

    expect(response.status).toBe(401);
  });

  it('should not be able to access when email or password is not provided', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        password: user.password,
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to access when user does not exist', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'anotheremail@email.com',
        password: user.password,
      });

    expect(response.status).toBe(401);
  });
});
