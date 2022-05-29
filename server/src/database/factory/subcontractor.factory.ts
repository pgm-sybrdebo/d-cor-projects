import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Subcontractor } from 'src/subcontractors/entities/subcontractor.entity';


const functions = ['Dakwerker', 'Vloerenlegger', 'Elektricien', 'Loodgieter', 'Metselaar']

define(Subcontractor, (faker: typeof Faker) => {
 
  const subcontractor = new Subcontractor();
  subcontractor.companyName = faker.company.companyName();
  subcontractor.firstName = faker.name.firstName();
  subcontractor.lastName = faker.name.lastName();
  subcontractor.gender = faker.random.number({min: 0, max:1});
  subcontractor.function = functions[faker.random.number({min:0, max:4})];
  subcontractor.email = faker.internet.email();
  subcontractor.gsm = faker.phone.phoneNumber('+32#########');
  subcontractor.street = faker.address.streetName();
  subcontractor.houseNumber = faker.random.number({min: 1, max: 60});
  subcontractor.city = faker.address.city();
  subcontractor.postalCode = faker.address.zipCode('####');
  subcontractor.vatNumber = "BE0" + faker.finance.account(9);
  subcontractor.accountNumber = "BE" + faker.finance.account(14);
  return subcontractor;
});