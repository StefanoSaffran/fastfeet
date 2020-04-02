import { object, number, string } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      name: string(),
      number: number().integer(),
      street: string(),
      address_details: string(),
      state: string(),
      city: string(),
      zip_code: string(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'validation fails', messages: error.inner });
  }
};
