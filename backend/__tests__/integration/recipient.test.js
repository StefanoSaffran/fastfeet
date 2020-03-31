import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';
import getToken from '../getToken';

describe('Recipient', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('shound be able to list recipients', async () => {
    const { body } = await getToken();

    const { status } = await request(app)
      .get('/recipients')
      .set('Authorization', `bearer ${body.token}`);

    expect(status).toBe(200);
  });

  it('should be able to find recipient by ID', async () => {
    const { body } = await getToken();

    const { status } = await request(app)
      .get(`/recipients/${1}`)
      .set('Authorization', `bearer ${body.token}`);

    expect(status).toBe(200);
  });

  it('should be able to register a new recipient', async () => {
    const recipient = await factory.attrs('Recipient');

    const { body } = await getToken();

    const { status } = await request(app)
      .post('/recipients')
      .send(recipient)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(200);
  });

  it('should not be able to register a new recipient when some field is missing', async () => {
    const recipient = {
      name: 'Recipient test',
      number: 25,
      city: 'São Paulo',
      address_details: 'Ap. 101',
      state: 'SP',
    };

    const { body } = await getToken();

    const { status } = await request(app)
      .post('/recipients')
      .send(recipient)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(400);
  });

  it('should not be able to register recipient with duplicated fields', async () => {
    const recipient = await factory.attrs('Recipient');

    const { body } = await getToken();

    await request(app)
      .post('/recipients')
      .send(recipient)
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app)
      .post('/recipients')
      .send(recipient)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(401);
  });

  it('should be able to update recipient', async () => {
    const recipient = await factory.attrs('Recipient');

    const { body } = await getToken();

    const { body: recipientID } = await request(app)
      .post('/recipients')
      .send(recipient)
      .set('Authorization', `Bearer ${body.token}`);

    const updatedRecipient = await request(app)
      .put(`/recipients/${recipientID.id}`)
      .send({
        name: 'Updated Name',
        number: 25,
        city: 'São Paulo',
        address_details: 'Ap. 101',
        state: 'SP',
        street: 'Rua 1',
        cep: '10000-000',
      })
      .set('Authorization', `bearer ${body.token}`);

    expect(updatedRecipient.body.name).toBe('Updated Name');
  });

  it('should not be able to update recipient if fail validation', async () => {
    const recipient = await factory.attrs('Recipient');

    const { body } = await getToken();

    const { body: recipientID } = await request(app)
      .post('/recipients')
      .send(recipient)
      .set('Authorization', `Bearer ${body.token}`);

    const updatedRecipient = await request(app)
      .put(`/recipients/${recipientID.id}`)
      .send({ number: 'fake' })
      .set('Authorization', `Bearer ${body.token}`);

    expect(updatedRecipient.status).toBe(400);
  });

  it('should not be able to update recipient if it does not exist', async () => {
    const recipient = await factory.attrs('Recipient');

    const { body } = await getToken();

    await request(app)
      .post('/recipients')
      .send(recipient)
      .set('Authorization', `Bearer ${body.token}`);

    const updatedRecipient = await request(app)
      .put('/recipients/999')
      .send(recipient)
      .set('Authorization', `Bearer ${body.token}`);

    expect(updatedRecipient.status).toBe(401);
  });

  it('should be able to delete a recipient', async () => {
    const recipient = await factory.attrs('Recipient');

    const { body } = await getToken();

    const { body: recipientID } = await request(app)
      .post('/recipients')
      .send(recipient)
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app)
      .delete(`/recipients/${recipientID.id}`)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(204);
  });

  it('should not be able to delete a recipient if it does not exist', async () => {
    const { body } = await getToken();

    const { status } = await request(app)
      .delete('/recipients/0')
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(401);
  });
});
