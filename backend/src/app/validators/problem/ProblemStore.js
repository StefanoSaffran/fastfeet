import { object, string } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      description: string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'validation fails', messages: error.inner });
  }
};
