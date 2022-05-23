
import { Designer } from "src/designers/entities/designer.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateDesigners implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Designer)().createMany(10);
  }
}