import { Client } from "src/clients/entities/client.entity";
import { Designer } from "src/designers/entities/designer.entity";
import { Media } from "src/media/entities/media.entity";
import { Project } from "src/projects/entities/project.entity";
import { Subcontractor } from "src/subcontractors/entities/subcontractor.entity";
import { User } from "src/users/entities/user.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import * as Faker from 'faker';
import { Report } from "src/reports/entities/report.entity";
import { ReportSection } from "src/report-sections/entities/report-section.entity";

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(User)().createMany(1);
    const designers = await factory(Designer)().createMany(10);``
    const subcontractors = await factory(Subcontractor)().createMany(50);
    const clients = await factory(Client)().createMany(50);
    for (const client of clients) {
      const { id } = client;
      const projects = await factory(Project)({id, designers, subcontractors}).createMany(Faker.random.number({ min: 1, max: 5 }));
      for (const project of projects) {
        const { id, clientId } = project;
        const reports = await factory(Report)({projectId: id }).createMany(Faker.random.number({ min: 1, max: 5 }));
        const media = await factory(Media)({ projectId: id }).createMany(Faker.random.number({ min: 1, max: 5 }));

        for (const report of reports) {
          const { id } = report;
          const reportSection = await factory(ReportSection)({reportId: id, clientId: clientId}).createMany(Faker.random.number({ min: 1, max: 5 }));
        }
      }
    
    }
  }
}