import { object, string } from 'yup';

import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class DeliveryProblemController {
  async store(req, res) {
    const schema = object().shape({
      description: string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.params;

    const deliveryExists = await Delivery.findByPk(id);

    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery not found.' });
    }

    const { description } = req.body;

    const problem = await DeliveryProblem.create({
      delivery_id: id,
      description,
    });

    return res.json({
      problem,
      delivery: deliveryExists,
    });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const problems = await DeliveryProblem.findAll({
      attributes: ['id', 'description'],
      order: ['delivery_id'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: [
            'id',
            'product',
            'deliveryman_id',
            'recipient_id',
            'canceled_at',
          ],
        },
      ],
    });
    problems.map(p => console.log(p.delivery));

    const notCanceledDelivery = problems.filter(
      p => p.delivery.canceled_at === null
    );

    return res.json(notCanceledDelivery);
  }

  async show(req, res) {
    const { id } = req.params;

    const problems = await DeliveryProblem.findAll({
      where: {
        delivery_id: id,
      },
      attributes: ['id', 'description', 'created_at'],
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['id', 'product', 'deliveryman_id', 'recipient_id'],
        },
      ],
    });

    return res.json(problems);
  }

  async delete(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    delivery.canceled_at = new Date();

    await delivery.save();

    const problems = await DeliveryProblem.findAll({
      where: {
        delivery_id: id,
      },
    });

    if (process.env.NODE_ENV !== 'test') {
      await Queue.add(CancellationMail.key, {
        delivery,
        problem: problems,
      });
    }

    return res.json(delivery);
  }
}

export default new DeliveryProblemController();
