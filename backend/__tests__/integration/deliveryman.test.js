import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';
import getToken from '../getToken';
import uploadFile from '../uploadFile';

describe('Deliveryman', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('shound be able to list deliverymen', async () => {
    const { body } = await getToken();

    const { status } = await request(app)
      .get('/deliveryman')
      .set('Authorization', `bearer ${body.token}`);

    expect(status).toBe(200);
  });

  it('should be able to find deliveryman by ID', async () => {
    const { body } = await getToken();

    const { status } = await request(app)
      .get(`/deliveryman/${1}`)
      .set('Authorization', `bearer ${body.token}`);

    expect(status).toBe(200);
  });

  it('should be able to register a new deliveryman', async () => {
    const deliveryman = await factory.attrs('Deliveryman');

    const { body } = await getToken();

    const { status } = await request(app)
      .post('/deliveryman')
      .send(deliveryman)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(200);
  });

  it('should not be able to register a new deliveryman when some field is missing', async () => {
    const deliveryman = {
      name: 'Deliveryman test',
    };

    const { body } = await getToken();

    const { status } = await request(app)
      .post('/deliveryman')
      .send(deliveryman)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(400);
  });

  it('should not be able to register deliveryman with duplicated fields', async () => {
    const deliveryman = await factory.attrs('Deliveryman');

    const { body } = await getToken();

    await request(app)
      .post('/deliveryman')
      .send(deliveryman)
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app)
      .post('/deliveryman')
      .send(deliveryman)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(401);
  });

  it('should not be able to register deliveryman if avatar_id does not exist', async () => {
    const deliveryman = await factory.attrs('Deliveryman');

    const { body } = await getToken();

    const { status } = await request(app)
      .post('/deliveryman')
      .send({ ...deliveryman, avatar_id: 999 })
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(401);
  });

  it('should be able to update deliveryman', async () => {
    const deliveryman = await factory.attrs('Deliveryman');

    const { body } = await getToken();

    const { body: deliverymanID } = await request(app)
      .post('/deliveryman')
      .send(deliveryman)
      .set('Authorization', `Bearer ${body.token}`);

    const updatedDeliveryman = await request(app)
      .put(`/deliveryman/${deliverymanID.id}`)
      .send({
        name: 'Updated Name',
        email: 'novo@email.com',
      })
      .set('Authorization', `bearer ${body.token}`);

    expect(updatedDeliveryman.body.name).toBe('Updated Name');
  });

  it('should not be able to update deliveryman if email belongs to another deliveryman', async () => {
    const deliveryman = await factory.attrs('Deliveryman');
    const deliveryman2 = await factory.attrs('Deliveryman');
    const { body } = await getToken();

    const { body: deliverymanID } = await request(app)
      .post('/deliveryman')
      .send(deliveryman)
      .set('Authorization', `Bearer ${body.token}`);

    await request(app)
      .post('/deliveryman')
      .send(deliveryman2)
      .set('Authorization', `Bearer ${body.token}`);

    const updatedDeliveryman = await request(app)
      .put(`/deliveryman/${deliverymanID.id}`)
      .send(deliveryman2)
      .set('Authorization', `bearer ${body.token}`);

    expect(updatedDeliveryman.status).toBe(401);
  });

  it('should not be able to update deliveryman if fail validation', async () => {
    const deliveryman = await factory.attrs('Deliveryman');

    const { body } = await getToken();

    const { body: deliverymanID } = await request(app)
      .post('/deliveryman')
      .send(deliveryman)
      .set('Authorization', `Bearer ${body.token}`);

    const updatedDeliveryman = await request(app)
      .put(`/deliveryman/${deliverymanID.id}`)
      .send({ email: 1 })
      .set('Authorization', `Bearer ${body.token}`);

    expect(updatedDeliveryman.status).toBe(400);
  });

  it('should not be able to update deliveryman if it does not exist', async () => {
    const deliveryman = await factory.attrs('Deliveryman');

    const { body } = await getToken();

    await request(app)
      .post('/deliveryman')
      .send(deliveryman)
      .set('Authorization', `Bearer ${body.token}`);

    const updatedDeliveryman = await request(app)
      .put('/deliveryman/999')
      .send(deliveryman)
      .set('Authorization', `Bearer ${body.token}`);

    expect(updatedDeliveryman.status).toBe(401);
  });

  it('should be able to delete a deliveryman', async () => {
    const deliveryman = await factory.attrs('Deliveryman');

    const { body } = await getToken();

    const avatar = await uploadFile(body.token);

    const response = await request(app)
      .post('/deliveryman')
      .send({ ...deliveryman, avatar_id: avatar.id })
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app)
      .delete(`/deliveryman/${response.body.id}`)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(204);
  });

  it('should not be able to delete a deliveryman if it does not exist', async () => {
    const { body } = await getToken();

    const { status } = await request(app)
      .delete('/deliveryman/0')
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(401);
  });
});
