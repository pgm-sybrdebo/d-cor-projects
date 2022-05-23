import { define, factory } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Report } from 'src/reports/entities/report.entity';

interface Context {
  projectId: number;
}

let number = 1;

define(Report, (faker: typeof Faker, context: Context) => {
  const { projectId } = context;
  const report = new Report();
  report.projectId = projectId;
  report.number = number;
  report.generalInfo = faker.lorem.paragraph();
  report.pdf = "pdf";
  number++;
  return report;
});
