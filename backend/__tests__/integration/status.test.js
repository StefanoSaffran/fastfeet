import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';
import getToken from '../getToken';
import uploadFile from '../uploadFile';

describe('Status', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to list delivered deliveries associated to a especific deliveryman', async () => {
    const deliverymanFactory = await factory.attrs('Deliveryman');

    const { body } = await getToken();

    const { body: deliveryman } = await request(app)
      .post('/deliveryman')
      .send(deliverymanFactory)
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app).get(
      `/deliveryman/${deliveryman.id}/deliveries?delivered=true`
    );

    expect(status).toBe(200);
  });

  it('should be able to list deliveries associated to a especific deliveryman', async () => {
    const deliverymanFactory = await factory.attrs('Deliveryman');

    const { body } = await getToken();

    const { body: deliveryman } = await request(app)
      .post('/deliveryman')
      .send(deliverymanFactory)
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app).get(
      `/deliveryman/${deliveryman.id}/deliveries`
    );

    expect(status).toBe(200);
  });

  it('should not be able to list deliveries associated to a especific deliveryman if deliveryman not found', async () => {
    const { status } = await request(app).get(`/deliveryman/${1}/deliveries`);

    expect(status).toBe(401);
  });

  it('should be able to change delivery status to "withdrawal"', async () => {
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
      .put(`/deliveryman/${deliveryman.id}/deliveries/${delivery.id}`)
      .send({ start_date: '2025-01-01 10:30' });

    expect(status).toBe(200);
  });

  it('should not be able to change delivery status if fail validation', async () => {
    const { status } = await request(app)
      .put(`/deliveryman/${11}/deliveries/${11}`)
      .send({ signature_id: 'aaa' });

    expect(status).toBe(400);
  });

  it('should not be able to change delivery status if deliveryman not found', async () => {
    const { status } = await request(app)
      .put(`/deliveryman/${11}/deliveries/${11}`)
      .send({ start_date: '2025-01-01 10:30' });

    expect(status).toBe(401);
  });

  it('should not be able to change delivery status if delivery not found', async () => {
    const deliverymanFactory = await factory.attrs('Deliveryman');

    const { body } = await getToken();

    const { body: deliveryman } = await request(app)
      .post('/deliveryman')
      .send(deliverymanFactory)
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app)
      .put(`/deliveryman/${deliveryman.id}/deliveries/${11}`)
      .send({ start_date: '2025-01-01 10:30' });

    expect(status).toBe(401);
  });

  it('should  not be able to withdraw delivery if it is not at business time', async () => {
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
      .put(`/deliveryman/${deliveryman.id}/deliveries/${delivery.id}`)
      .send({ start_date: '2025-01-01 00:30' });

    expect(status).toBe(401);
  });

  it('should  not be able to withdraw delivery if with past dates', async () => {
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
      .put(`/deliveryman/${deliveryman.id}/deliveries/${delivery.id}`)
      .send({ start_date: '2000-01-01 10:30' });

    expect(status).toBe(401);
  });

  it('should not be able to change delivery status to "withdrawal" more then 5 times in a day', async () => {
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

    const { body: delivery1 } = await request(app)
      .post('/delivery')
      .send({
        ...deliveryFactory,
        recipient_id: recipient.id,
        deliveryman_id: deliveryman.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    const { body: delivery2 } = await request(app)
      .post('/delivery')
      .send({
        ...deliveryFactory,
        recipient_id: recipient.id,
        deliveryman_id: deliveryman.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    const { body: delivery3 } = await request(app)
      .post('/delivery')
      .send({
        ...deliveryFactory,
        recipient_id: recipient.id,
        deliveryman_id: deliveryman.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    const { body: delivery4 } = await request(app)
      .post('/delivery')
      .send({
        ...deliveryFactory,
        recipient_id: recipient.id,
        deliveryman_id: deliveryman.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    const { body: delivery5 } = await request(app)
      .post('/delivery')
      .send({
        ...deliveryFactory,
        recipient_id: recipient.id,
        deliveryman_id: deliveryman.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    const { body: delivery6 } = await request(app)
      .post('/delivery')
      .send({
        ...deliveryFactory,
        recipient_id: recipient.id,
        deliveryman_id: deliveryman.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    await request(app)
      .put(`/deliveryman/${deliveryman.id}/deliveries/${delivery1.id}`)
      .send({ start_date: '2025-01-01 10:30' });

    await request(app)
      .put(`/deliveryman/${deliveryman.id}/deliveries/${delivery2.id}`)
      .send({ start_date: '2025-01-01 10:30' });

    await request(app)
      .put(`/deliveryman/${deliveryman.id}/deliveries/${delivery3.id}`)
      .send({ start_date: '2025-01-01 10:30' });

    await request(app)
      .put(`/deliveryman/${deliveryman.id}/deliveries/${delivery4.id}`)
      .send({ start_date: '2025-01-01 10:30' });

    await request(app)
      .put(`/deliveryman/${deliveryman.id}/deliveries/${delivery5.id}`)
      .send({ start_date: '2025-01-01 10:30' });

    const { status } = await request(app)
      .put(`/deliveryman/${deliveryman.id}/deliveries/${delivery6.id}`)
      .send({ start_date: '2025-01-01 10:30' });

    expect(status).toBe(401);
  });

  it('should be able to change delivery status to "delivered"', async () => {
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

    await request(app)
      .put(`/deliveryman/${deliveryman.id}/deliveries/${delivery.id}`)
      .send({ start_date: '2025-01-01 10:30' });

    const signature = await uploadFile(body.token);

    const { status } = await request(app)
      .put(`/deliveryman/${deliveryman.id}/deliveries/${delivery.id}`)
      .send({ end_date: '2025-01-01 15:30', signature_id: signature.id });

    expect(status).toBe(200);
  });

  it('should not be able to change delivery status to "delivered" if end date is earlier than start date', async () => {
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

    await request(app)
      .put(`/deliveryman/${deliveryman.id}/deliveries/${delivery.id}`)
      .send({ start_date: '2025-01-01 10:30' });

    const signature = await uploadFile(body.token);

    const { status } = await request(app)
      .put(`/deliveryman/${deliveryman.id}/deliveries/${delivery.id}`)
      .send({ end_date: '2025-01-01 08:30', signature_id: signature.id });

    expect(status).toBe(401);
  });

  it('should not be able to change delivery status to "delivered" if signature not found', async () => {
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

    await request(app)
      .put(`/deliveryman/${deliveryman.id}/deliveries/${delivery.id}`)
      .send({ start_date: '2025-01-01 10:30' });

    const { status } = await request(app)
      .put(`/deliveryman/${deliveryman.id}/deliveries/${delivery.id}`)
      .send({ end_date: '2025-01-01 14:30', signature_id: 99999 });

    expect(status).toBe(401);
  });
});
