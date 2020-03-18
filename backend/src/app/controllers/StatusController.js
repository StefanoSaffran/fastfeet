import { object, number, date } from 'yup';

import { Op } from 'sequelize';
import { isBefore, parseISO, getHours, startOfDay, endOfDay } from 'date-fns';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class StatusController {
  async index(req, res) {
    const { id } = req.params;

    const deliverymanExists = await Deliveryman.findByPk(id, {
      include: {
        model: File,
        as: 'avatar',
        attributes: ['name', 'path', 'url'],
      },
    });

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman not found.' });
    }

    const { page = 1, delivered = false } = req.query;

    if (delivered) {
      const deliveries = await Delivery.findAll({
        where: {
          end_date: {
            [Op.not]: null,
          },
          deliveryman_id: id,
        },
        limit: 10,
        offset: (page - 1) * 10,
      });

      return res.json(deliveries);
    }

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        end_date: null,
        canceled_at: null,
      },
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json({ deliveries, deliveryman: deliverymanExists });
  }

  async update(req, res) {
    const schema = object().shape({
      start_date: date(),
      end_date: date(),
      signature_id: number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id, deliveryId } = req.params;

    const deliverymanExists = await Deliveryman.findByPk(id);

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman not found.' });
    }

    const delivery = await Delivery.findByPk(deliveryId);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found.' });
    }

    const { start_date, end_date, signature_id } = req.body;

    if (start_date) {
      const parsedStartHour = getHours(parseISO(start_date));

      if (parsedStartHour < 8 || parsedStartHour >= 17) {
        return res.status(400).json({
          error: 'You must start a delivery only between 8:00 and 18:00',
        });
      }

      const parsedStartDate = parseISO(start_date);

      if (isBefore(endOfDay(parsedStartDate), new Date())) {
        return res.status(400).json({ error: 'Past dates are not permitted' });
      }

      const { count } = await Delivery.findAndCountAll({
        where: {
          start_date: {
            [Op.between]: [startOfDay(new Date()), endOfDay(new Date())],
          },
          deliveryman_id: id,
        },
      });

      if (count >= 5) {
        return res.status(400).json({
          error:
            'Error trying to start a new delivery. You already made 5 out of 5 deliveries today.',
        });
      }

      const updatedDelivery = await delivery.update({
        start_date: parsedStartDate,
      });

      return res.json(updatedDelivery);
    }

    if (end_date) {
      const parsedEndDate = parseISO(end_date);

      if (isBefore(parsedEndDate, delivery.start_date)) {
        return res.status(400).json({
          error: 'Delivery time must be after the withdrawal time.',
        });
      }

      const updatedDelivery = await delivery.update({
        end_date: parsedEndDate,
        signature_id,
      });

      return res.json(updatedDelivery);
    }
  }
}

export default new StatusController();
