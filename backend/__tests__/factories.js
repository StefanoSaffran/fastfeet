import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Recipient from '../src/app/models/Recipient';
import Deliveryman from '../src/app/models/Deliveryman';
import Delivery from '../src/app/models/Delivery';

factory.define('User', User, () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
}));

factory.define('Recipient', Recipient, () => ({
  name: faker.name.findName(),
  street: faker.address.streetName(),
  number: faker.random.number(999),
  address_details: faker.address.secondaryAddress(),
  state: faker.address.state,
  city: faker.address.city,
  zip_code: faker.address.zipCode(),
}));

factory.define('Deliveryman', Deliveryman, () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
}));

factory.define('Delivery', Delivery, () => ({
  product: faker.random.word(),
}));

export default factory;
