import { object, number, date } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      start_date: date(),
      end_date: date(),
      signature_id: number(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'validation fails', messages: error.inner });
  }
};
