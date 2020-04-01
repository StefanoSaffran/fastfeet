import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';
import getToken from '../getToken';
import uploadFile from '../uploadFile';

describe('Delivery', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('shound be able to list delivery', async () => {
    const { body } = await getToken();

    const { status } = await request(app)
      .get('/delivery')
      .set('Authorization', `bearer ${body.token}`);

    expect(status).toBe(200);
  });

  it('should be able to find delivery by ID', async () => {
    const { body } = await getToken();

    const { status } = await request(app)
      .get(`/delivery/${1}`)
      .set('Authorization', `bearer ${body.token}`);

    expect(status).toBe(200);
  });

  it('should be able to register a new delivery', async () => {
    const delivery = await factory.attrs('Delivery');
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

    const { status } = await request(app)
      .post('/delivery')
      .send({
        ...delivery,
        recipient_id: recipient.id,
        deliveryman_id: deliveryman.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(200);
  });

  it('should not be able to register a new delivery when some field is missing', async () => {
    const delivery = {
      product: 'Delivery test',
      deliveryman_id: 1,
    };

    const { body } = await getToken();

    const { status } = await request(app)
      .post('/delivery')
      .send(delivery)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(400);
  });

  it('should not be able to register a new delivery when deliveryman is not found', async () => {
    const delivery = await factory.attrs('Delivery');
    const recipientFactory = await factory.attrs('Recipient');

    const { body } = await getToken();

    const { body: recipient } = await request(app)
      .post('/recipients')
      .send(recipientFactory)
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app)
      .post('/delivery')
      .send({
        ...delivery,
        recipient_id: recipient.id,
        deliveryman_id: 0,
      })
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(401);
  });

  it('should not be able to register a new delivery when recipient is not found', async () => {
    const delivery = await factory.attrs('Delivery');
    const deliverymanFactory = await factory.attrs('Deliveryman');

    const { body } = await getToken();

    const { body: deliveryman } = await request(app)
      .post('/deliveryman')
      .send(deliverymanFactory)
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app)
      .post('/delivery')
      .send({
        ...delivery,
        recipient_id: 0,
        deliveryman_id: deliveryman.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(401);
  });

  it('should be able to update delivery', async () => {
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

    const updatedDelivery = await request(app)
      .put(`/delivery/${delivery.id}`)
      .send({
        product: 'Updated product name',
        recipient_id: recipient.id,
        deliveryman_id: deliveryman.id,
      })
      .set('Authorization', `bearer ${body.token}`);

    expect(updatedDelivery.body.product).toBe('Updated product name');
  });

  it('should not be able to update a delivery if it does not pass validation', async () => {
    const { body } = await getToken();

    const updatedDelivery = await request(app)
      .put(`/delivery/${0}`)
      .send({ deliveryman_id: 'aaaa' })
      .set('Authorization', `bearer ${body.token}`);

    expect(updatedDelivery.status).toBe(400);
  });

  it('should not be able to update delivery if not found', async () => {
    const { body } = await getToken();

    const updatedDelivery = await request(app)
      .put(`/delivery/${0}`)
      .send({
        product: 'Product name',
        recipient_id: 0,
        deliveryman_id: 0,
      })
      .set('Authorization', `bearer ${body.token}`);

    expect(updatedDelivery.status).toBe(401);
  });

  it('should not be able to update delivery if deliveryman not found', async () => {
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

    const updatedDelivery = await request(app)
      .put(`/delivery/${delivery.id}`)
      .send({
        product: 'Product name',
        recipient_id: recipient.id,
        deliveryman_id: 99999,
      })
      .set('Authorization', `bearer ${body.token}`);

    expect(updatedDelivery.status).toBe(401);
  });

  it('should not be able to update delivery if recipient not found', async () => {
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

    const updatedDelivery = await request(app)
      .put(`/delivery/${delivery.id}`)
      .send({
        product: 'Product name',
        recipient_id: 99999,
        deliveryman_id: deliveryman.id,
      })
      .set('Authorization', `bearer ${body.token}`);

    expect(updatedDelivery.status).toBe(401);
  });

  it('should be able to delete a delivery', async () => {
    const deliveryFactory = await factory.attrs('Delivery');
    const recipientFactory = await factory.attrs('Recipient');
    const deliverymanFactory = await factory.attrs('Deliveryman');

    const { body } = await getToken();

    const signature = await uploadFile(body.token);

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
        signature_id: signature.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app)
      .delete(`/delivery/${delivery.id}`)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(204);
  });

  it('should be able to delete a delivery', async () => {
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
      .delete(`/delivery/${999999}`)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(401);
  });
});
