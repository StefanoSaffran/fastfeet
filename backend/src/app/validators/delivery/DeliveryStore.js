import { object, number, string } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      recipient_id: number().required(),
      deliveryman_id: number().required(),
      product: string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'validation fails', messages: error.inner });
  }
};
