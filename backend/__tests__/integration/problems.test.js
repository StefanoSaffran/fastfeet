import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';
import getToken from '../getToken';

describe('Problems', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('shound be able to list problems', async () => {
    const { body } = await getToken();

    const { status } = await request(app)
      .get('/delivery/problems')
      .set('Authorization', `bearer ${body.token}`);

    expect(status).toBe(200);
  });

  it('should be able to list problems for expecific delivery', async () => {
    const { status } = await request(app).get(`/delivery/${1}/problems`);

    expect(status).toBe(200);
  });

  it('should be able to registry a new problem', async () => {
    const deliveryFactory = await factory.attrs('Delivery');
    const recipientFactory = await factory.attrs('Recipient');
    const deliverymanFactory = await factory.attrs('Deliveryman');

    const { body } = await getToken();

    const { body: deliveryman } = await request(app)
      .post('/deliveryman')
      .send(deliverymanFactory)
      .set('Authorization', `Bearer ${body.token}`);

    const { body: recipient } = await request(app)
      .post('/recipients')
      .send(recipientFactory)
      .set('Authorization', `Bearer ${body.token}`);

    const { body: delivery } = await request(app)
      .post('/delivery')
      .send({
        ...deliveryFactory,
        recipient_id: recipient.id,
        deliveryman_id: deliveryman.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app)
      .post(`/delivery/${delivery.id}/problems`)
      .send({
        description: 'Recipient was not at home',
      });

    expect(status).toBe(200);
  });

  it('should not be able to registry a new problem if delivery not found', async () => {
    const { status } = await request(app)
      .post(`/delivery/${999999}/problems`)
      .send({
        description: 'Recipient was not at home',
      });

    expect(status).toBe(401);
  });

  it('should be able to cencel a delivery', async () => {
    const deliveryFactory = await factory.attrs('Delivery');
    const recipientFactory = await factory.attrs('Recipient');
    const deliverymanFactory = await factory.attrs('Deliveryman');

    const { body } = await getToken();

    const { body: deliveryman } = await request(app)
      .post('/deliveryman')
      .send(deliverymanFactory)
      .set('Authorization', `Bearer ${body.token}`);

    const { body: recipient } = await request(app)
      .post('/recipients')
      .send(recipientFactory)
      .set('Authorization', `Bearer ${body.token}`);

    const { body: delivery } = await request(app)
      .post('/delivery')
      .send({
        ...deliveryFactory,
        recipient_id: recipient.id,
        deliveryman_id: deliveryman.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app)
      .delete(`/problem/${delivery.id}/cancel-delivery`)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(200);
  });

  it('should not be able to cancel a delivery if not found', async () => {
    const { body } = await getToken();

    const { status } = await request(app)
      .delete(`/problem/${999999}/cancel-delivery`)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(401);
  });
});
