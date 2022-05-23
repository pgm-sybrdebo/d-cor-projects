import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Client } from 'src/clients/entities/client.entity';



define(Client, (faker: typeof Faker) => {
  const client = new Client();
  client.name = faker.company.companyName();
  client.firstName = faker.name.firstName();
  client.lastName = faker.name.lastName();
  client.email = faker.internet.email();
  client.gsm = faker.phone.phoneNumber();
  client.street = faker.address.streetName();
  client.houseNumber = faker.random.number({min: 1, max: 60});
  client.city = faker.address.city();
  client.postalCode = faker.address.zipCode();
  client.country = "België";
  client.vatNumber = "BE" + faker.finance.account(10);
  client.accountNumber = "BE" + faker.finance.account(14);
  return client;
});