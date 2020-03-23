import { resolve } from 'path';
import { promisify } from 'util';
import fs from 'fs';
import { Op } from 'sequelize';

import { object, string, number } from 'yup';
import aws from 'aws-sdk';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

const s3 = new aws.S3();

class DeliverymanController {
  async store(req, res) {
    const schema = object().shape({
      name: string().required(),
      email: string()
        .email()
        .required(),
      avatar_id: number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { avatar_id, email } = req.body;

    const deliverymanExists = await Deliveryman.findOne({ where: { email } });

    if (deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman already exists.' });
    }

    if (avatar_id) {
      const file = await File.findOne({
        where: { id: avatar_id },
      });

      if (!file) {
        return res.status(401).json({ error: 'File not found.' });
      }
    }

    const { id, name } = await Deliveryman.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async index(req, res) {
    const { page, q } = req.query;

    if (q || page) {
      if (!page) {
        const deliverymen = await Deliveryman.findAll({
          where: {
            name: {
              [Op.iLike]: `%${q}%`,
            },
          },
          order: ['id'],
          include: {
            model: File,
            as: 'avatar',
            attributes: ['name', 'path', 'url'],
          },
        });

        return res.json(deliverymen);
      }

      const { count, rows: deliverymen } = await Deliveryman.findAndCountAll({
        where: {
          name: {
            [Op.iLike]: `%${q}%`,
          },
        },
        order: ['id'],
        limit: 7,
        offset: (page - 1) * 7,
        include: {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      });

      return res.json({ deliverymen, count });
    }

    const deliverymen = await Deliveryman.findAll({
      order: ['id'],
    });

    return res.json(deliverymen);
  }

  async show(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id, {
      include: {
        model: File,
        as: 'avatar',
        attributes: ['name', 'path', 'url'],
      },
    });
    return res.json(deliveryman);
  }

  async update(req, res) {
    const schema = object().shape({
      name: string(),
      email: string().email(),
      avatar_id: number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, avatar_id } = req.body;

    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'deliveryman does not found.' });
    }

    if (email !== deliveryman.email) {
      const userExists = await Deliveryman.findOne({
        where: { email },
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],
      });

      if (userExists) {
        return res
          .status(400)
          .json({ error: 'Email belongs to another deliveryman' });
      }
    }

    if (deliveryman.avatar && deliveryman.avatar.id && avatar_id) {
      if (avatar_id !== deliveryman.avatar.id) {
        File.destroy({
          where: {
            id: deliveryman.avatar.id,
          },
        });

        if (process.env.STORAGE_TYPE === 's3') {
          s3.deleteObject(
            {
              Bucket: process.env.BUCKET,
              Key: deliveryman.avatar.path,
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
              deliveryman.avatar.path
            )
          );
        }
      }
    }

    const updatedDeliveryman = await deliveryman.update(req.body);

    return res.json(updatedDeliveryman);
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found.' });
    }

    if (deliveryman && deliveryman.avatar) {
      if (process.env.STORAGE_TYPE === 's3') {
        s3.deleteObject(
          {
            Bucket: process.env.BUCKET,
            Key: deliveryman.avatar.path,
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
            deliveryman.avatar.path
          )
        );
      }

      File.destroy({
        where: {
          id: deliveryman.avatar.id,
        },
      });
    }

    await deliveryman.destroy();

    return res.status(204).send();
  }
}

export default new DeliverymanController();
