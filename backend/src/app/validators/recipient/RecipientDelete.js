import { object, number } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      id: number().required(),
    });

    await schema.validate(req.params, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'validation fails', messages: error.inner });
  }
};
