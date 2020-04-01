import request from 'supertest';
import { resolve } from 'path';

import app from '../src/app';

const uploadFile = async token => {
  const { body } = await request(app)
    .post('/files')
    .attach('file', resolve(__dirname, 'assets', 'jest.png'))
    .set('Authorization', `Bearer ${token}`);

  return body;
};

export default uploadFile;
