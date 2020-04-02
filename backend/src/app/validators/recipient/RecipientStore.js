import { object, number, string } from 'yup';

export default async (req, res, next) => {
  try {
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
    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'validation fails', messages: error.inner });
  }
};
