import { Client } from "src/clients/entities/client.entity";
import { Designer } from "src/designers/entities/designer.entity";
import { Media } from "src/media/entities/media.entity";
import { Project } from "src/projects/entities/project.entity";
import { Subcontractor } from "src/subcontractors/entities/subcontractor.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import * as Faker from 'faker';
import { Report } from "src/reports/entities/report.entity";
import { ReportSection } from "src/report-sections/entities/report-section.entity";

// yarn seed:run -s CreateDesigners

export default class CreateDesigners implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const designers = await factory(Designer)().createMany(5);``
    const subcontractors = await factory(Subcontractor)().createMany(30);
    const clients = await factory(Client)().createMany(50);
    for (const client of clients) {
      const { id } = client;
      const projects = await factory(Project)({id, designers, subcontractors}).createMany(Faker.random.number({ min: 1, max: 5 }));
      for (const project of projects) {
        const { id, clientId, name } = project;
        const reports = await factory(Report)({projectId: id, name: name }).createMany(Faker.random.number({ min: 1, max: 5 }));
        const media = await factory(Media)({ projectId: id }).createMany(Faker.random.number({ min: 1, max: 5 }));

        for (const report of reports) {
          const { id } = report;
          const reportSection1 = await factory(ReportSection)({reportId: id, clientId: clientId}).createMany(1);
          const reportSection2 = await factory(ReportSection)({reportId: id}).createMany(Faker.random.number({ min: 1, max: 5 }));
        }
      }
    }
  }
}