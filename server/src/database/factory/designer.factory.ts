import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Designer } from 'src/designers/entities/designer.entity';


define(Designer, (faker: typeof Faker) => {
 
  const designer = new Designer();
  designer.companyName = faker.company.companyName();
  designer.firstName = faker.name.firstName();
  designer.lastName = faker.name.lastName();
  designer.gender = faker.random.number({min: 0, max:1});
  designer.email = faker.internet.email();
  designer.gsm = faker.phone.phoneNumber();
  designer.street = faker.address.streetName();
  designer.houseNumber = faker.random.number({min: 1, max: 60});
  designer.city = faker.address.city();
  designer.postalCode = faker.address.zipCode();
  designer.country = "België";
  designer.vatNumber = "BE" + faker.finance.account(10);
  designer.accountNumber = "BE" + faker.finance.account(14);
  return designer;
});