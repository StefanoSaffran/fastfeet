import { object, number, string } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      recipient_id: number().integer('Must be a number'),
      deliveryman_id: number().integer('Must be a number'),
      product: string(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'validation fails', messages: error.inner });
  }
};
