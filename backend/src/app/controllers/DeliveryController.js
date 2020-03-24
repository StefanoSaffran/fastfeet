import { resolve } from 'path';
import { promisify } from 'util';
import fs from 'fs';

import { object, string, number } from 'yup';
import aws from 'aws-sdk';
import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

import DetailsMail from '../jobs/DetailsMail';
import Queue from '../../lib/Queue';

const s3 = new aws.S3();

class DeliveryController {
  async store(req, res) {
    const schema = object(req.body).shape({
      recipient_id: number().required(),
      deliveryman_id: number().required(),
      product: string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { deliveryman_id, recipient_id } = req.body;

    const deliverymanExists = await Deliveryman.findOne({
      where: { id: deliveryman_id },
    });

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman not found.' });
    }

    const recipientExists = await Recipient.findOne({
      where: { id: recipient_id },
    });

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient not found.' });
    }

    const delivery = await Delivery.create(req.body);

    if (process.env.NODE_ENV !== 'test') {
      await Queue.add(DetailsMail.key, {
        recipient: recipientExists,
        deliveryman: deliverymanExists,
      });
    }

    return res.json(delivery);
  }

  async index(req, res) {
    const { page, q } = req.query;

    if (q || page) {
      const { count, rows: deliveries } = await Delivery.findAndCountAll({
        where: {
          product: {
            [Op.iLike]: `%${q}%`,
          },
        },
        order: ['id'],
        limit: 7,
        offset: (page - 1) * 7,
        include: [
          {
            model: Deliveryman,
            as: 'deliveryman',
            attributes: ['id', 'name', 'email', 'avatar_id'],
            include: {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          },
          {
            model: Recipient,
            as: 'recipient',
            attributes: [
              'id',
              'name',
              'street',
              'number',
              'address_details',
              'state',
              'city',
              'zip_code',
            ],
          },
          {
            model: File,
            as: 'signature',
            attributes: ['url', 'path', 'name'],
          },
        ],
      });

      return res.json({ deliveries, count });
    }

    const deliveries = await Delivery.findAll({
      order: ['id'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email', 'avatar_id'],
          include: {
            model: File,
            as: 'avatar',
            attributes: ['name', 'path', 'url'],
          },
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'address_details',
            'state',
            'city',
            'zip_code',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'path', 'name'],
        },
      ],
    });

    return res.json(deliveries);
  }

  async show(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name'],
        },
      ],
    });
    return res.json(delivery);
  }

  async update(req, res) {
    const schema = object(req.body).shape({
      recipient_id: number(),
      deliveryman_id: number(),
      product: string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found.' });
    }

    const { deliveryman_id, recipient_id } = req.body;

    if (deliveryman_id) {
      const deliverymanExists = await Deliveryman.findOne({
        where: { id: deliveryman_id },
      });

      if (!deliverymanExists) {
        return res.status(400).json({ error: 'Deliveryman not found.' });
      }
    }

    if (recipient_id) {
      const recipientExists = await Recipient.findOne({
        where: { id: recipient_id },
      });

      if (!recipientExists) {
        return res.status(400).json({ error: 'Recipient not found.' });
      }
    }

    const updatedDelivery = await delivery.update(req.body);

    return res.json(updatedDelivery);
  }

  async delete(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id, {
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found.' });
    }

    if (delivery.signature) {
      if (process.env.STORAGE_TYPE === 's3') {
        s3.deleteObject(
          {
            Bucket: process.env.BUCKET,
            Key: delivery.signature.path,
          },
          async (err, data) => {
            if (err) console.log(err, err.stack);
            else console.log(data);
          }
        );
      } else {
        promisify(fs.unlink)(
          resolve(
            __dirname,
            '..',
            '..',
            '..',
            'tmp',
            'uploads',
            delivery.signature.path
          )
        );
      }

      File.destroy({
        where: {
          id: delivery.signature.id,
        },
      });
    }

    await delivery.destroy();

    return res.status(204).send();
  }
}

export default new DeliveryController();
