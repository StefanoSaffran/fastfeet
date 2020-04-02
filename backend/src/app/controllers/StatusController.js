import { Op } from 'sequelize';
import { isBefore, parseISO, getHours, startOfDay, endOfDay } from 'date-fns';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
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
      return res.status(401).json({ error: 'Deliveryman not found.' });
    }

    const { page = 1, delivered = false } = req.query;

    const isDelivered = delivered === 'true';

    if (isDelivered) {
      const { count, rows: deliveries } = await Delivery.findAndCountAll({
        where: {
          end_date: {
            [Op.not]: null,
          },
          deliveryman_id: id,
        },
        order: [['created_at', 'ASC']],
        include: {
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

        limit: 3,
        offset: (page - 1) * 3,
      });

      return res.json({ deliveries, count });
    }

    const { count, rows: deliveries } = await Delivery.findAndCountAll({
      where: {
        deliveryman_id: id,
        end_date: null,
        canceled_at: null,
      },
      order: [['created_at', 'ASC']],
      include: {
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
      limit: 3,
      offset: (page - 1) * 3,
    });

    return res.json({ deliveries, deliveryman: deliverymanExists, count });
  }

  async update(req, res) {
    const { id, deliveryId } = req.params;

    const deliverymanExists = await Deliveryman.findByPk(id);

    if (!deliverymanExists) {
      return res.status(401).json({ error: 'Deliveryman not found.' });
    }

    const { start_date, end_date, signature_id } = req.body;

    const delivery = await Delivery.findByPk(deliveryId);

    if (!delivery) {
      return res.status(401).json({ error: 'Delivery not found.' });
    }

    if (start_date) {
      const parsedStartHour = getHours(parseISO(start_date));

      if (parsedStartHour < 8 || parsedStartHour >= 17) {
        return res.status(401).json({
          error: 'You must start a delivery only between 8:00 and 18:00',
        });
      }

      const parsedStartDate = parseISO(start_date);

      if (isBefore(endOfDay(parsedStartDate), new Date())) {
        return res.status(401).json({ error: 'Past dates are not permitted' });
      }

      const { count } = await Delivery.findAndCountAll({
        where: {
          deliveryman_id: id,
          start_date: {
            [Op.between]: [
              startOfDay(parsedStartDate),
              endOfDay(parsedStartDate),
            ],
          },
        },
      });

      if (count >= 5) {
        return res.status(401).json({
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
        return res.status(401).json({
          error: 'Delivery time must be after the withdrawal time.',
        });
      }

      const signature = await File.findByPk(signature_id);

      if (!signature) {
        return res.status(401).json({ error: 'Signature not found.' });
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
