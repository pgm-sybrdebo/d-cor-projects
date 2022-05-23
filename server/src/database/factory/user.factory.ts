import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';


define(User, (faker: typeof Faker) => {
 
  const user = new User();
  user.firstName = "Lieven";
  user.lastName = "De Backere";
  user.email = "lieven@d-corprojects.be";
  // @ts-ignore
  user.password = bcrypt.hash('password', 10);
  user.gsm = "0475 32 54 45";
  return user;
});