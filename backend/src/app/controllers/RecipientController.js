import { object, string, number } from 'yup';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = object().shape({
      name: string().required(),
      number: number()
        .required()
        .integer(),
      street: string().required(),
      address_details: string(),
      state: string().required(),
      city: string().required(),
      zip_code: string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { name, street, zip_code } = req.body;

    const recipientExists = await Recipient.findOne({
      where: { name, street, number: req.body.number, zip_code },
    });

    if (recipientExists)
      return res.status(400).json({ error: 'Recipient already exists.' });

    const {
      id,
      address_details,
      number: addressNumber,
      state,
      city,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      addressNumber,
      address_details,
      state,
      city,
      zip_code,
    });
  }

  async index(req, res) {
    const { page, q } = req.query;

    if (q || page) {
      if (!page) {
        const recipients = await Recipient.findAll({
          where: {
            name: {
              [Op.iLike]: `%${q}%`,
            },
          },
          order: ['id'],
        });

        return res.json(recipients);
      }

      const { count, rows: recipients } = await Recipient.findAndCountAll({
        where: {
          name: {
            [Op.iLike]: `%${q}%`,
          },
        },
        order: ['id'],
        limit: 7,
        offset: (page - 1) * 7,
      });

      return res.json({ recipients, count });
    }

    const recipients = await Recipient.findAll({
      order: ['id'],
    });

    return res.json(recipients);
  }

  async show(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    return res.json(recipient);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    const schema = object().shape({
      name: string().required(),
      number: number()
        .required()
        .integer(),
      street: string().required(),
      address_details: string(),
      state: string().required(),
      city: string().required(),
      zip_code: string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient not found' });
    }

    const {
      number: addressNumber,
      street,
      address_details,
      state,
      city,
      zip_code,
    } = await recipient.update(req.body);

    return res.json({
      name,
      addressNumber,
      street,
      address_details,
      state,
      city,
      zip_code,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found.' });
    }

    await recipient.destroy();

    return res.status(204).send();
  }
}

export default new RecipientController();
